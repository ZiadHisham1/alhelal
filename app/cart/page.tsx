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
                        {(item.unitPrice ?? 0).toLocaleString("ar-EG")} ج.م × {item.quantity}
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
                        {((item.unitPrice ?? 0) * item.quantity).toLocaleString("ar-EG")}
                      </p>
                      <p className="text-xs text-ink/50">ج.م</p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Summary */}
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
                  <span className="font-lalezar text-lg text-ink">الإجمالي</span>
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
            </>
          )}
        </div>
      </Sheet>
    </main>
  );
}