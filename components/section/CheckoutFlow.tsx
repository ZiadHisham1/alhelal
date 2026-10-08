// src/components/section/CheckoutFlow.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/lib/cart-store";
import {
  saveShippingAddress,
  getShippingOptions,
  addShippingMethod,
  getPaymentProviders,
  getCart,
  initPaymentSession,
  completeOrder,
} from "@/app/actions/checkout";

type Step = "address" | "shipping" | "payment";

interface AddressForm {
  first_name: string;
  last_name: string;
  phone: string;
  address_1: string;
  city: string;
  postal_code: string;
}

interface ShippingOption {
  id: string;
  name: string;
  amount: number;
}

interface PaymentProvider {
  id: string;
}

export function CheckoutFlow() {
  const router = useRouter();
  const cartId = useCartStore((s) => s.cartId);
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice);

  const [step, setStep] = useState<Step>("address");
  const [email, setEmail] = useState("");
  const [form, setForm] = useState<AddressForm>({
    first_name: "",
    last_name: "",
    phone: "",
    address_1: "",
    city: "",
    postal_code: "",
  });

  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<string | null>(null);
  const [paymentProviders, setPaymentProviders] = useState<PaymentProvider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* Redirect if cart empty */
  useEffect(() => {
    if (!cartId || items.length === 0) {
      router.replace("/cart");
    }
  }, [cartId, items.length, router]);

  /* Step 1: address */
  async function handleAddressSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!cartId) return;

    setLoading(true);
    setError(null);
    try {
      await saveShippingAddress(
        cartId,
        { ...form, country_code: "eg" },
        email
      );

      const options = (await getShippingOptions(cartId)) as ShippingOption[];
      if (!options.length) {
        throw new Error(
          "لا توجد طرق شحن متاحة. تأكد من إعدادها في Medusa admin."
        );
      }
      setShippingOptions(options);
      setStep("shipping");
    } catch (e: any) {
      setError(e?.message ?? "حدث خطأ");
    } finally {
      setLoading(false);
    }
  }

  /* Step 2: shipping */
  async function handleShippingSubmit() {
    if (!cartId || !selectedShipping) return;

    setLoading(true);
    setError(null);
    try {
      await addShippingMethod(cartId, selectedShipping);

      // Need region id → payment providers
      const cart = await getCart(cartId);
      const providers = (await getPaymentProviders(
        cart.region_id
      )) as PaymentProvider[];

      if (!providers.length) {
        throw new Error(
          "لا توجد طرق دفع متاحة. فعّل Cash on Delivery في Medusa admin."
        );
      }
      setPaymentProviders(providers);
      setSelectedProvider(providers[0].id);
      setStep("payment");
    } catch (e: any) {
      setError(e?.message ?? "حدث خطأ");
    } finally {
      setLoading(false);
    }
  }

  /* Step 3: payment + complete */
  async function handleCompleteOrder() {
    if (!cartId || !selectedProvider) return;

    setLoading(true);
    setError(null);
    try {
      await initPaymentSession(cartId, selectedProvider);
      const result = await completeOrder(cartId);

      if (result.type === "order" && result.order) {
        localStorage.removeItem("medusa_cart_id");
        useCartStore.setState({ cartId: null, items: [] });
        router.push(`/order/${result.order.id}`);
      } else if (result.type === "cart") {
        // Payment requires additional action (e.g., 3D Secure)
        throw new Error(
          "الدفع يحتاج خطوة إضافية غير مدعومة حالياً."
        );
      } else {
        throw new Error("لم يتم إنشاء الطلب. حاول مرة أخرى.");
      }
    } catch (e: any) {
      setError(e?.message ?? "حدث خطأ أثناء إتمام الطلب");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Stepper step={step} />

      {error && (
        <div className="rounded-2xl bg-rose-50 text-rose-700 px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {/* ---------- Step 1 ---------- */}
      {step === "address" && (
        <form onSubmit={handleAddressSubmit} className="space-y-4">
          <Field
            label="البريد الإلكتروني"
            type="email"
            required
            value={email}
            onChange={setEmail}
          />
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="الاسم الأول"
              required
              value={form.first_name}
              onChange={(v) => setForm({ ...form, first_name: v })}
            />
            <Field
              label="الاسم الأخير"
              required
              value={form.last_name}
              onChange={(v) => setForm({ ...form, last_name: v })}
            />
          </div>
          <Field
            label="رقم الهاتف"
            type="tel"
            required
            value={form.phone}
            onChange={(v) => setForm({ ...form, phone: v })}
            placeholder="01xxxxxxxxx"
          />
          <Field
            label="العنوان"
            required
            value={form.address_1}
            onChange={(v) => setForm({ ...form, address_1: v })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="المدينة"
              required
              value={form.city}
              onChange={(v) => setForm({ ...form, city: v })}
            />
            <Field
              label="الرمز البريدي"
              required
              value={form.postal_code}
              onChange={(v) => setForm({ ...form, postal_code: v })}
            />
          </div>

          <PrimaryButton loading={loading} type="submit">
            متابعة إلى الشحن
          </PrimaryButton>
        </form>
      )}

      {/* ---------- Step 2 ---------- */}
      {step === "shipping" && (
        <div className="space-y-4">
          {shippingOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSelectedShipping(opt.id)}
              className={cn(
                "w-full text-right rounded-2xl p-4 ring-1 transition",
                selectedShipping === opt.id
                  ? "ring-ink bg-white"
                  : "ring-ink/10 bg-white/60 hover:bg-white"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-lalezar text-lg text-ink">
                  {opt.name}
                </span>
                <span className="font-lalezar text-lg text-ink">
                  {(opt.amount / 100).toLocaleString("ar-EG")} ج.م
                </span>
              </div>
            </button>
          ))}

          <div className="flex gap-3">
            <SecondaryButton onClick={() => setStep("address")}>
              رجوع
            </SecondaryButton>
            <PrimaryButton
              loading={loading}
              onClick={handleShippingSubmit}
              disabled={!selectedShipping}
            >
              متابعة إلى الدفع
            </PrimaryButton>
          </div>
        </div>
      )}

      {/* ---------- Step 3 ---------- */}
      {step === "payment" && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-white/60 ring-1 ring-ink/10 p-5 space-y-2">
            <h3 className="font-lalezar text-lg text-ink">ملخص الطلب</h3>
            {items.map((i) => (
              <div
                key={i.id}
                className="flex items-center justify-between text-sm text-ink/70"
              >
                <span>
                  {i.title} × {i.quantity}
                </span>
                <span>
                  {(i.unitPrice * i.quantity).toLocaleString("ar-EG")} ج.م
                </span>
              </div>
            ))}
            <div className="border-t border-ink/10 pt-2 flex items-center justify-between">
              <span className="font-lalezar">الإجمالي</span>
              <span className="font-lalezar text-xl">
                {totalPrice().toLocaleString("ar-EG")} ج.م
              </span>
            </div>
          </div>

          <div className="space-y-2">
            {paymentProviders.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedProvider(p.id)}
                className={cn(
                  "w-full text-right rounded-2xl p-4 ring-1 transition",
                  selectedProvider === p.id
                    ? "ring-ink bg-white"
                    : "ring-ink/10 bg-white/60 hover:bg-white"
                )}
              >
                <span className="font-lalezar text-lg text-ink">
                  الدفع عند الاستلام
                </span>
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <SecondaryButton onClick={() => setStep("shipping")}>
              رجوع
            </SecondaryButton>
            <PrimaryButton
              loading={loading}
              onClick={handleCompleteOrder}
              disabled={!selectedProvider}
            >
              تأكيد الطلب
            </PrimaryButton>
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------- Helpers -------------------- */

function Stepper({ step }: { step: Step }) {
  const steps: { id: Step; label: string }[] = [
    { id: "address", label: "العنوان" },
    { id: "shipping", label: "الشحن" },
    { id: "payment", label: "الدفع" },
  ];
  const activeIndex = steps.findIndex((s) => s.id === step);

  return (
    <div className="flex items-center justify-center gap-3">
      {steps.map((s, i) => (
        <div key={s.id} className="flex items-center gap-2">
          <span
            className={cn(
              "w-8 h-8 grid place-items-center rounded-full text-sm font-lalezar transition",
              i <= activeIndex
                ? "bg-ink text-white"
                : "bg-white/60 text-ink/40"
            )}
          >
            {i + 1}
          </span>
          <span
            className={cn(
              "font-lalezar text-sm",
              i <= activeIndex ? "text-ink" : "text-ink/40"
            )}
          >
            {s.label}
          </span>
          {i < steps.length - 1 && (
            <span className="w-6 h-px bg-ink/20" aria-hidden />
          )}
        </div>
      ))}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block mb-1.5 text-sm text-ink/60 font-lalezar">
        {label}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full h-12 rounded-full px-4
          bg-white ring-1 ring-ink/10
          font-lalezar text-base text-ink
          focus:outline-none focus:ring-2 focus:ring-ink/30
        "
        dir={type === "tel" ? "ltr" : undefined}
      />
    </label>
  );
}

function PrimaryButton({
  children,
  loading,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <button
      {...rest}
      disabled={loading || rest.disabled}
      className="
        flex-1 w-full h-14 rounded-full
        bg-ink text-white font-lalezar text-lg
        hover:bg-ink/90 active:scale-[0.99]
        disabled:opacity-50 disabled:cursor-not-allowed
        transition
      "
    >
      {loading ? "..." : children}
    </button>
  );
}

function SecondaryButton({
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      type="button"
      className="
        h-14 px-6 rounded-full
        bg-white text-ink font-lalezar text-lg
        ring-1 ring-ink/10 hover:bg-white/80
        transition
      "
    >
      {children}
    </button>
  );
}