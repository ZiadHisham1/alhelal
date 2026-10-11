// src/components/section/CheckoutFlow.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
import { AddressPicker } from "../ui/AddressPicker";
import { WalletPaymentPanel } from "../ui/WalletPaymentPanel";

interface AddressForm {
  first_name: string;
  last_name: string;
  phone: string;
  address_1: string;      // street (auto-filled, editable)
  address_2: string;      // building details (manual)
  landmark: string;       // nearby landmark (chips + manual)
  city: string;
  lat: number | null;
  lng: number | null;
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
  type PaymentChoice = "cod" | "wallet" | null;
  const [paymentChoice, setPaymentChoice] = useState<PaymentChoice>(null);
  const [receiptUrl, setReceiptUrl] = useState<string>("");

  /* ---------- Form state ---------- */
  const [form, setForm] = useState<AddressForm>({
    first_name: "",
    last_name: "",
    phone: "",
    address_1: "",
    address_2: "",
    landmark: "",
    city: "القاهرة",
    lat: null,
    lng: null,
  });

  /* ---------- Remote data ---------- */
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<string | null>(null);
  const [paymentProviders, setPaymentProviders] = useState<PaymentProvider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  /* ---------- UI state ---------- */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);

  /* Redirect if cart empty */
  useEffect(() => {
    if (!cartId || items.length === 0) {
      router.replace("/cart");
    }
  }, [cartId, items.length, router]);

  /* Preload shipping + payment options */
  useEffect(() => {
    if (!cartId) return;
    (async () => {
      try {
        await saveShippingAddress(
          cartId,
          {
            first_name: "Customer",
            last_name: "Name",
            phone: "01000000000",
            address_1: "NA",
            city: "Cairo",
            postal_code: "",
            country_code: "eg",
          },
          ""
        );

        const options = (await getShippingOptions(cartId)) as ShippingOption[];
        if (options.length) {
          setShippingOptions(options);
          setSelectedShipping(options[0].id);
        }

        const cart = await getCart(cartId);
        const providers = (await getPaymentProviders(
          cart.region_id ?? ""
        )) as PaymentProvider[];

        if (providers.length) {
          setPaymentProviders(providers);
          setSelectedProvider(providers[0].id);
          setPaymentChoice("wallet");     // ← default
        }
      } catch (e: any) {
        console.error("[checkout] preload FAILED:", e?.message ?? e);
      }
    })();
  }, [cartId]);

  /* Single submit */
 async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  if (!cartId || !selectedShipping || !selectedProvider) return;
  if (!paymentChoice) {
    setError("من فضلك اختر طريقة الدفع");
    return;
  }
  if (paymentChoice === "wallet" && !receiptUrl) {
    setError("من فضلك ارفع صورة الإيصال");
    return;
  }

  setLoading(true);
  setError(null);

  try {
    const fullAddress2 = [form.address_2, form.landmark]
      .filter(Boolean)
      .join(" | ");

    await saveShippingAddress(
      cartId,
      {
        first_name: form.first_name,
        last_name: form.last_name,
        phone: form.phone,
        address_1: form.address_1,
        address_2: fullAddress2,
        city: form.city,
        postal_code: "",
        country_code: "eg",
      },
      "",
      paymentChoice === "wallet"
        ? {
            payment_method: "wallet",
            payment_status: "awaiting_review",
            receipt_url: receiptUrl,
          }
        : {
            payment_method: "cod",
            payment_status: "on_delivery",
          }
    );

    await addShippingMethod(cartId, selectedShipping);
    await initPaymentSession(cartId, selectedProvider);

    const result = await completeOrder(cartId);

    if (result.type === "order" && result.order) {
      localStorage.removeItem("medusa_cart_id");
      useCartStore.setState({ cartId: null, items: [] });
      router.push(`/order/${result.order.id}`);
    } else {
      throw new Error("لم يتم إنشاء الطلب. حاول مرة أخرى.");
    }
  } catch (e: any) {
    setError(e?.message ?? "حدث خطأ أثناء إتمام الطلب");
    setLoading(false);
  }
}

  const subtotal = totalPrice();
  const shippingAmount =
    shippingOptions.find((o) => o.id === selectedShipping)?.amount ?? 0;
  const shippingCost = shippingAmount / 100;
  const total = subtotal + shippingCost;

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-12">
        {/* ============== LEFT: form ============== */}
        <div className="order-2 lg:order-1 space-y-8 mt-8 lg:mt-0 min-w-0">
          <Section title="ادخل بياناتك" number={1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="الاسم الأول"
                required
                value={form.first_name}
                onChange={(v) => setForm({ ...form, first_name: v })}
                placeholder="محمد"
                autoComplete="given-name"
              />
              <Field
                label="اسم العائلة"
                required
                value={form.last_name}
                onChange={(v) => setForm({ ...form, last_name: v })}
                placeholder="أحمد"
                autoComplete="family-name"
              />
            </div>

            <PhoneField
              value={form.phone}
              onChange={(v) => setForm({ ...form, phone: v })}
            />

            {/* ============ ADDRESS SECTION ============ */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink/60 font-lalezar">
                  العنوان
                </span>
                {form.lat && (
                  <button
                    type="button"
                    onClick={() => setShowMap((v) => !v)}
                    className="text-xs text-ink/60 hover:text-ink underline font-lalezar"
                  >
                    {showMap ? "إخفاء الخريطة" : "عرض الخريطة"}
                  </button>
                )}
              </div>

              {/* Location picker */}
              <AddressPicker
                onAddress={(data) => {
                  setForm((prev) => ({
                    ...prev,
                    address_1: data.address_1,
                    city: data.city || prev.city,
                    lat: data.lat ?? prev.lat,
                    lng: data.lng ?? prev.lng,
                  }));
                }}
              />

              {/* Editable street — always visible */}
              <Field
                label="اسم الشارع (يمكنك تعديله)"
                required
                value={form.address_1}
                onChange={(v) => setForm({ ...form, address_1: v })}
                placeholder="مثال: شارع الخزان"
                autoComplete="address-line1"
              />

              {/* Building details */}
              <Field
                label="تفاصيل المبنى"
                value={form.address_2}
                onChange={(v) => setForm({ ...form, address_2: v })}
                placeholder="عمارة 5، الدور الثالث، شقة 7"
                autoComplete="address-line2"
              />

              {/* Landmark chips + free text */}
              <LandmarkPicker
                value={form.landmark}
                onChange={(v) => setForm({ ...form, landmark: v })}
              />

              {/* City */}
              <CityField
                value={form.city}
                onChange={(v) => setForm({ ...form, city: v })}
              />

              {/* Map preview */}
              {showMap && form.lat && form.lng && (
                <div className="space-y-2">
                  <div className="w-full aspect-[16/9] rounded-[10px] overflow-hidden ring-1 ring-ink/10">
                    <iframe
                      title="موقع التوصيل"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                        form.lng - 0.003
                      }%2C${form.lat - 0.002}%2C${form.lng + 0.003}%2C${
                        form.lat + 0.002
                      }&layer=mapnik&marker=${form.lat}%2C${form.lng}`}
                    />
                  </div>

                  <a
                    href={`https://www.google.com/maps?q=${form.lat},${form.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center text-xs text-ink/60 underline hover:text-ink font-lalezar"
                  >
                    افتح الموقع في خرائط جوجل
                  </a>
                </div>
              )}
            </div>
          </Section>

          {/* SHIPPING */}
          <Section title="طريقة الشحن" number={2}>
            {shippingOptions.length === 0 ? (
              <p className="text-sm text-ink/50 font-lalezar">
                جاري تحميل طرق الشحن...
              </p>
            ) : (
              <div className="space-y-3">
                {shippingOptions.map((opt) => {
                  const active = selectedShipping === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedShipping(opt.id)}
                      className={cn(
                        "w-full text-right rounded-2xl p-4 transition flex items-center justify-between gap-4",
                        active
                          ? "ring-2 ring-ink bg-white"
                          : "ring-1 ring-ink/10 bg-white/60 hover:bg-white"
                      )}
                    >
                      <span className="font-lalezar text-base text-ink">
                        {opt.name}
                      </span>
                      <span className="font-lalezar text-base text-ink shrink-0">
                        {(opt.amount / 100).toLocaleString("ar-EG")} ج.م
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </Section>

          {/* PAYMENT */}
          <Section title="طريقة الدفع" number={3}>
            {/* COD */}
            <button
              type="button"
              onClick={() => setPaymentChoice("cod")}
              className={cn(
                "w-full disabled:bg-amber-50 disabled:text-ink/30 text-right rounded-2xl p-4 transition flex items-center gap-3",
                paymentChoice === "cod"
                  ? "ring-2 ring-ink bg-white"
                  : "ring-1 ring-ink/10 bg-white/60 hover:bg-white"
              )}
              disabled={true}
            >
              <span
                className={cn(
                  "w-5 h-5 rounded-full border-2 shrink-0 grid place-items-center transition",
                  paymentChoice === "cod" ? "border-ink" : "border-ink/30"
                )}
              >
                {paymentChoice === "cod" && (
                  <span className="w-2.5 h-2.5 rounded-full bg-ink" />
                )}
              </span>
              <span className="flex-1 font-lalezar text-base text-ink">
                الدفع عند الاستلام
              </span>
              <span className="flex-1 font-lalezar text-base text-ink/40">
                (هذه الميزة خارج الخدمة حالياً.)
              </span>
              <span className="text-xs text-ink/50 font-lalezar shrink-0">
                تدفع لما يوصلك
              </span>
            </button>

            {/* Wallet */}
            <button
              type="button"
              onClick={() => setPaymentChoice("wallet")}
              className={cn(
                "w-full text-right rounded-2xl p-4 transition flex items-center gap-3",
                paymentChoice === "wallet"
                  ? "ring-2 ring-ink bg-white"
                  : "ring-1 ring-ink/10 bg-white/60 hover:bg-white"
              )}
            >
              <span
                className={cn(
                  "w-5 h-5 rounded-full border-2 shrink-0 grid place-items-center transition",
                  paymentChoice === "wallet" ? "border-ink" : "border-ink/30"
                )}
              >
                {paymentChoice === "wallet" && (
                  <span className="w-2.5 h-2.5 rounded-full bg-ink" />
                )}
              </span>
              <span className="flex-1 font-lalezar text-base text-ink">
                فودافون كاش / إنستاباي / فوري
              </span>
              <span className="text-xs text-ink/50 font-lalezar shrink-0">
                ارفع صورة التحويل
              </span>
            </button>

            {/* Wallet panel — visible when selected */}
            {paymentChoice === "wallet" && cartId && (
              <div className="pt-2">
                <WalletPaymentPanel
                  cartId={cartId}
                  total={total}
                  onReceiptUploaded={setReceiptUrl}
                />
              </div>
            )}
          </Section>

          {/* ERROR */}
          {error && (
            <div className="rounded-2xl bg-rose-50 text-rose-700 px-4 py-3 text-sm font-lalezar">
              {error}
            </div>
          )}

          {/* SUBMIT */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={
              loading ||
              !selectedShipping ||
              !selectedProvider ||
              items.length === 0 ||
              !paymentChoice ||
              (paymentChoice === "wallet" && !receiptUrl)
            }
              className="
                w-full h-14 rounded-full
                bg-ink text-white font-lalezar text-lg
                hover:bg-ink/90 active:scale-[0.99]
                disabled:opacity-50 disabled:cursor-not-allowed
                transition
                flex items-center justify-center gap-2
              "
            >
              {loading ? (
                <>
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full" />
                  <span>جاري تأكيد الطلب...</span>
                </>
              ) : (
                <>
                  <span>إتمام الطلب</span>
                  <span className="text-white/70">
                    · {(total * 0.5).toLocaleString("ar-EG")} ج.م
                  </span>
                </>
              )}
            </button>

            <p className="text-center text-xs text-ink/50 mt-3 font-lalezar">
              بالمتابعة أنت توافق على{" "}
              <Link href="/terms" className="underline hover:text-ink">
                الشروط والأحكام
              </Link>
            </p>
          </div>
        </div>

        {/* ============== RIGHT: summary ============== */}
        <div className="order-1 lg:order-2 min-w-0">
          <div className="lg:sticky lg:top-[100px]">
            <div className="rounded-[24px] bg-white/60 ring-1 ring-ink/5 p-5 lg:p-6 space-y-4">
              <h2 className="font-lalezar text-lg text-ink text-right">
                ملخص الطلب
              </h2>

              <ul className="divide-y divide-ink/5">
                {items.map((i) => (
                  <li key={i.id} className="flex items-center gap-3 py-3">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-cream-100 shrink-0">
                      <Image
                        src={i.image}
                        alt={i.title}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                      <span
                        className="
                          absolute -top-1.5 -right-1.5
                          min-w-[20px] h-5 px-1
                          flex items-center justify-center
                          rounded-full bg-ink text-white
                          text-[10px] font-bold
                        "
                      >
                        {i.quantity}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0 text-right">
                      <p className="font-lalezar text-sm text-ink truncate">
                        {i.title}
                        {i.subtitle ? ` ${i.subtitle}` : ""}
                      </p>
                    </div>

                    <span className="font-lalezar text-sm text-ink shrink-0">
                      {(i.unitPrice * i.quantity).toLocaleString("ar-EG")} ج.م
                    </span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-ink/10 pt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink/60 font-lalezar">
                    المجموع الفرعي
                  </span>
                  <span className="font-lalezar text-ink">
                    {subtotal.toLocaleString("ar-EG")} ج.م
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink/60 font-lalezar">الشحن</span>
                  <span className="font-lalezar text-ink">
                    {shippingCost > 0
                      ? `${shippingCost.toLocaleString("ar-EG")} ج.م`
                      : "—"}
                  </span>
                </div>

                <div className="border-t border-ink/10 pt-3 flex items-center justify-between">
                  <span className="font-lalezar text-lg text-ink">
                    الإجمالي
                  </span>
                  <span className="font-lalezar text-2xl text-ink">
                    {total.toLocaleString("ar-EG")} ج.م
                  </span>
                </div>
              </div>

              <p className="text-xs text-ink/50 font-lalezar text-center pt-2 border-t border-ink/10">
                🔒 دفع آمن · ضمان استرجاع 14 علي المنتجات غير العمولة
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

/* ============================================================
   Section
   ============================================================ */
function Section({
  title,
  number,
  children,
}: {
  title: string;
  number: number;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="flex items-center gap-3 font-lalezar text-lg lg:text-xl text-ink">
        <span
          className="
            w-7 h-7 grid place-items-center rounded-full
            bg-ink text-white text-sm shrink-0
          "
        >
          {number}
        </span>
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

/* ============================================================
   Field
   ============================================================ */
function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div className="w-full">
      <label className="block w-full">
        <span className="block mb-1.5 text-sm text-ink/60 font-lalezar">
          {label}
        </span>
        <input
          type={type}
          required={required}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          className="
            block w-full h-12 rounded-[10px] px-4
            bg-white ring-1 ring-ink/10
            font-lalezar text-base text-ink
            focus:outline-none focus:ring-2 focus:ring-ink/30
            transition
          "
          style={{ minWidth: "100%", maxWidth: "100%" }}
          dir={type === "tel" || type === "email" ? "ltr" : undefined}
        />
      </label>
    </div>
  );
}

/* ============================================================
   LandmarkPicker — quick chips + free text
   ============================================================ */
const LANDMARKS = [
  "مسجد",
  "صيدلية",
  "سوبر ماركت",
  "بنك",
  "مدرسة",
  "مستشفى",
  "كافيه",
  "مطعم",
  "مول",
];

function LandmarkPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm text-ink/60 font-lalezar text-right">
        علامة مميزة قريبة (اختياري)
      </label>

      <div className="flex flex-wrap gap-2">
        {LANDMARKS.map((lm) => {
          const chipValue = `بجوار ${lm}`;
          const active = value === chipValue;
          return (
            <button
              key={lm}
              type="button"
              onClick={() => onChange(active ? "" : chipValue)}
              className={cn(
                "px-3.5 h-9 rounded-full",
                "font-lalezar text-sm transition",
                active
                  ? "bg-ink text-white"
                  : "bg-white ring-1 ring-ink/10 text-ink hover:bg-cream-50"
              )}
            >
              {lm}
            </button>
          );
        })}
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="أو اكتب علامة مميزة بنفسك..."
        className="
          block w-full h-11 rounded-[10px] px-4
          bg-white ring-1 ring-ink/10
          font-lalezar text-sm text-ink
          focus:outline-none focus:ring-2 focus:ring-ink/30
          transition
        "
        style={{ minWidth: "100%", maxWidth: "100%" }}
      />
    </div>
  );
}

/* ============================================================
   CityField
   ============================================================ */
const EGYPTIAN_CITIES = [
  "القاهرة",
  "الجيزة",
  "الإسكندرية",
  "المنصورة",
  "طنطا",
  "الزقازيق",
  "بورسعيد",
  "السويس",
  "الأقصر",
  "أسوان",
  "أسيوط",
  "سوهاج",
  "قنا",
  "المنيا",
  "بني سويف",
  "الفيوم",
  "شبين الكوم",
  "دمنهور",
  "كفر الشيخ",
  "دمياط",
  "العريش",
  "الطور",
  "الغردقة",
  "شرم الشيخ",
  "مرسى مطروح",
  "الإسماعيلية",
  "بنها",
];

function CityField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="w-full">
      <label className="block w-full">
        <span className="block mb-1.5 text-sm text-ink/60 font-lalezar">
          المدينة
        </span>

        <input
          type="text"
          required
          list="egypt-cities"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="اكتب اسم المدينة..."
          autoComplete="address-level2"
          className="
            block w-full h-12 rounded-[10px] px-4
            bg-white ring-1 ring-ink/10
            font-lalezar text-base text-ink
            focus:outline-none focus:ring-2 focus:ring-ink/30
            transition
          "
          style={{ minWidth: "100%", maxWidth: "100%" }}
        />
        <datalist id="egypt-cities">
          {EGYPTIAN_CITIES.map((city) => (
            <option key={city} value={city} />
          ))}
        </datalist>
      </label>

      <div className="flex flex-wrap gap-2 mt-3">
        {["القاهرة", "الجيزة", "الإسكندرية", "المنصورة"].map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => onChange(city)}
            className={cn(
              "px-4 h-9 rounded-full",
              "font-lalezar text-sm transition",
              value === city
                ? "bg-ink text-white"
                : "bg-white ring-1 ring-ink/10 text-ink hover:bg-cream-50"
            )}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   PhoneField
   ============================================================ */
function PhoneField({
  label = "رقم الهاتف",
  value,
  onChange,
  required = true,
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  const digits = value.replace(/\D/g, "").slice(0, 10);

  const formatted = useMemo(() => {
    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
    return `${digits.slice(0, 2)} ${digits.slice(2, 6)} ${digits.slice(6)}`;
  }, [digits]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 10);
    onChange(raw);
  }

  return (
    <div className="w-full">
      <label className="block w-full">
        <span className="block mb-1.5 text-sm text-ink/60 font-lalezar">
          {label}
        </span>

        <div
          className="
            flex items-center gap-0
            w-full h-12 rounded-[10px]
            bg-white ring-1 ring-ink/10
            focus-within:ring-2 focus-within:ring-ink/30
            transition
            overflow-hidden
          "
          dir="ltr"
        >
          <span
            className="
              flex items-center justify-center
              h-full px-4
              bg-cream-50
              font-lalezar text-ink
              border-r border-ink/10
              shrink-0
              select-none
            "
          >
            🇪🇬 +20
          </span>

          <input
            type="tel"
            inputMode="numeric"
            value={formatted}
            onChange={handleChange}
            placeholder="11 2222 3333"
            required={required}
            autoComplete="tel-national"
            className="
              flex-1 min-w-0 h-full px-4
              bg-transparent
              font-lalezar text-base text-ink
              focus:outline-none
              tracking-wider
            "
            style={{ minWidth: 0 }}
          />
        </div>

        <span className="block mt-1.5 text-xs text-ink/45 font-lalezar">
          أدخل الرقم بدون كود الدولة
        </span>
      </label>
    </div>
  );
}