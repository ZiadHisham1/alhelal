"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sheet } from "@/components/section/Sheet";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { useCartStore } from "@/lib/cart-store";

export default function CartPage() {
  const router = useRouter();
  const { items, updateQty, removeItem, clear, totalPrice, totalItems } =
    useCartStore();

  const total = totalPrice();
  const count = totalItems();

  /* Deposit breakdown — 50 / 25 / 25 */
  const deposit = total * 0.5;
  const preDelivery = total * 0.25;
  const onDelivery = total * 0.25;

  return (
    <main className="relative bg-cream-100 min-h-screen">
      <Sheet layer={10}>
        <div className="max-w-[720px] mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="font-lalezar text-2xl sm:text-3xl text-ink">
              سلة التسوق
            </h1>
            {items.length > 0 && (
              <button
                type="button"
                onClick={clear}
                className="text-sm text-rose-600 hover:text-rose-700 font-lalezar"
              >
                تفريغ السلة
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-lalezar text-xl text-ink/60">
                سلتك فارغة حالياً
              </p>
              <Link
                href="/collection"
                className="
                  mt-6 inline-block px-8 h-12 leading-[48px]
                  rounded-full bg-ink text-white
                  font-lalezar text-lg
                  hover:bg-ink/90 transition
                "
              >
                ابدأ التسوق
              </Link>
            </div>
          ) : (
            <>
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex gap-4 rounded-[28px] bg-white/60 p-4 ring-1 ring-ink/10"
                  >
                    <Link
                      href={item.href}
                      className="relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden"
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <Link
                        href={item.href}
                        className="block font-lalezar text-lg text-ink truncate"
                      >
                        {item.title}
                        {item.subtitle && ` ${item.subtitle}`}
                      </Link>
                      <p className="text-sm text-ink/60 mt-1">
                        {(item.unitPrice ?? 0).toLocaleString("ar-EG")} ج.م ×{" "}
                        {item.quantity}
                      </p>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <QuantitySelector
                          value={item.quantity}
                          onChange={(q) => updateQty(item.id, q)}
                        />
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-xs text-rose-600 hover:text-rose-700 font-lalezar"
                        >
                          إزالة
                        </button>
                      </div>
                    </div>

                    <div className="text-left shrink-0">
                      <p className="font-lalezar text-lg text-ink">
                        {((item.unitPrice ?? 0) * item.quantity).toLocaleString(
                          "ar-EG"
                        )}
                      </p>
                      <p className="text-xs text-ink/50">ج.م</p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* ============ Summary ============ */}
              <div className="rounded-[28px] bg-white/70 p-5 ring-1 ring-ink/10 space-y-3">
                <div className="flex items-center justify-between text-sm text-ink/60">
                  <span>عدد المنتجات</span>
                  <span>{count}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-ink/60">
                  <span>الشحن</span>
                  <span>يُحدد عند الدفع</span>
                </div>
                <div className="border-t border-ink/10 pt-3 flex items-center justify-between">
                  <span className="font-lalezar text-lg text-ink">
                    الإجمالي
                  </span>
                  <span className="font-lalezar text-2xl text-ink">
                    {total.toLocaleString("ar-EG")} ج.م
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => router.push("/checkout")}
                  className="
                    w-full h-14 rounded-full
                    bg-ink text-white
                    font-lalezar text-xl
                    hover:bg-ink/90 active:scale-[0.99]
                    transition
                  "
                >
                  إتمام الشراء
                </button>
              </div>

              {/* ============ Payment Process Explanation ============ */}
              <PaymentProcess total={total} />
            </>
          )}
        </div>
      </Sheet>
    </main>
  );
}

/* ============================================================
   Payment Process — the 50 / 25 / 25 breakdown
   ============================================================ */
function PaymentProcess({ total }: { total: number }) {
  const stages = [
    {
      step: "1",
      label: "دفعة مقدمة",
      percent: 50,
      amount: total * 0.5,
      timing: "عند تأكيد الطلب",
      note: "تُدفع الآن لتأكيد الحجز وبدء التنفيذ",
      color: "bg-ink text-white",
      accent: "text-ink",
    },
    {
      step: "2",
      label: "دفعة قبل التسليم",
      percent: 25,
      amount: total * 0.25,
      timing: "عند جاهزية المنتج",
      note: "سنرسل لك رابط دفع عبر واتساب حين يجهز طلبك",
      color: "bg-[#2B1F17] text-white",
      accent: "text-[#2B1F17]",
    },
    {
      step: "3",
      label: "دفعة عند التسليم",
      percent: 25,
      amount: total * 0.25,
      timing: "يوم التسليم",
      note: "تدفع للمندوب عند استلام المنتج",
      color: "bg-[#4A3424] text-white",
      accent: "text-[#4A3424]",
    },
  ];

  return (
    <div className="rounded-[28px] bg-white/70 ring-1 ring-ink/10 p-6 space-y-5">
      {/* Header */}
      <div className="text-right space-y-1">
        <h2 className="font-lalezar text-xl lg:text-2xl text-ink">
          طريقة الدفع على 3 مراحل
        </h2>
        <p className="text-sm text-ink/60 font-lalezar">
          لأننا نصنع قطعاً مخصصة، نتبع نظام دفعات مرنة لحماية الطرفين
        </p>
      </div>

      {/* Stages */}
      <div className="space-y-3">
        {stages.map((s, i) => (
          <div
            key={s.step}
            className="flex items-start gap-4 rounded-2xl bg-cream-50/50 ring-1 ring-ink/5 p-4"
          >
            {/* Number badge */}
            <div
              className={`
                shrink-0 w-10 h-10 rounded-full
                grid place-items-center
                font-lalezar text-lg
                ${s.color}
              `}
            >
              {s.step}
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0 text-right space-y-1">
              <div className="flex items-baseline justify-between gap-2 flex-row-reverse">
                <h3 className={`font-lalezar text-base lg:text-lg ${s.accent}`}>
                  {s.label}
                </h3>
                <span className="font-lalezar text-xl lg:text-2xl text-ink shrink-0">
                  {s.amount.toLocaleString("ar-EG")} ج.م
                </span>
              </div>

              <div className="flex items-baseline justify-between gap-2 flex-row-reverse">
                <p className="text-xs text-ink/50 font-lalezar">
                  {s.timing}
                </p>
                <span className="text-xs font-lalezar text-ink/70 shrink-0">
                  {s.percent}%
                </span>
              </div>

              <p className="text-xs text-ink/60 font-lalezar leading-relaxed pt-1">
                {s.note}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Total confirmation */}
      <div className="border-t border-ink/10 pt-4 flex items-center justify-between flex-row-reverse">
        <span className="font-lalezar text-base text-ink">
          إجمالي المبالغ المدفوعة
        </span>
        <span className="font-lalezar text-xl text-ink">
          {total.toLocaleString("ar-EG")} ج.م
        </span>
      </div>

      {/* Trust row */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-xs text-ink/55 font-lalezar">
        <span className="flex items-center gap-1.5">
          <svg
            className="w-4 h-4 text-emerald-600"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              d="M4 10l4 4 8-8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          إيصال رسمي لكل دفعة
        </span>

        <span className="flex items-center gap-1.5">
          <svg
            className="w-4 h-4 text-emerald-600"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              d="M4 10l4 4 8-8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          إمكانية الإلغاء قبل مرحلة التنفيذ
        </span>

        <span className="flex items-center gap-1.5">
          <svg
            className="w-4 h-4 text-emerald-600"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              d="M4 10l4 4 8-8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          ضمان 3 سنوات على الهيكل
        </span>
      </div>

      {/* FAQ link */}
      <div className="pt-3 border-t border-ink/5">
        <Link
          href="/faq"
          className="
            block text-center text-sm font-lalezar text-ink/60
            hover:text-ink transition
          "
        >
          عندك سؤال عن طريقة الدفع؟ اعرف المزيد ←
        </Link>
      </div>
    </div>
  );
}