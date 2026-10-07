"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { cn } from "@/lib/utils";
import { QuantitySelector } from "@/components/ui/QuantitySelector";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeDrawer,
    updateQty,
    removeItem,
    totalPrice,
  } = useCartStore();

  const total = totalPrice();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        aria-hidden
        className={cn(
          "fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm",
          "transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="سلة التسوق"
        className={cn(
          "fixed top-0 right-0 z-[70] h-full w-[88%] max-w-[420px]",
          "bg-cream-100 shadow-2xl flex flex-col",
          "rounded-s-[28px]",
          "transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <header className="flex items-center justify-between p-5 border-b border-ink/10">
          <h2 className="font-lalezar text-xl text-ink">سلة التسوق</h2>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="إغلاق"
            className="w-9 h-9 rounded-full hover:bg-black/5 grid place-items-center text-ink text-2xl leading-none"
          >
            ×
          </button>
        </header>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full grid place-items-center text-center">
              <div>
                <p className="font-lalezar text-lg text-ink/60">
                  السلة فارغة
                </p>
                <Link
                  href="/collection"
                  onClick={closeDrawer}
                  className="
                    mt-4 inline-block px-6 h-11 leading-[44px]
                    rounded-full bg-ink text-white
                    font-lalezar
                    hover:bg-ink/90 transition
                  "
                >
                  ابدأ التسوق
                </Link>
              </div>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 rounded-2xl bg-white/60 p-3 ring-1 ring-ink/10"
              >
                <Link
                  href={item.href}
                  onClick={closeDrawer}
                  className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link
                    href={item.href}
                    onClick={closeDrawer}
                    className="block font-lalezar text-base text-ink truncate"
                  >
                    {item.title}
                    {item.subtitle && ` ${item.subtitle}`}
                  </Link>
                  <p className="text-sm text-ink/60 mt-1">
                    {item.price.toLocaleString("ar-EG")} ج.م
                  </p>

                  <div className="mt-2 flex items-center justify-between gap-2">
                    <QuantitySelector
                      value={item.quantity}
                      onChange={(q) => updateQty(item.id, q)}
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label="إزالة"
                      className="text-xs text-rose-600 hover:text-rose-700 font-lalezar"
                    >
                      إزالة
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <footer className="border-t border-ink/10 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-ink/60 text-sm">الإجمالي</span>
              <span className="font-lalezar text-2xl text-ink">
                {total.toLocaleString("ar-EG")} ج.م
              </span>
            </div>
            <Link
              href="/cart"
              onClick={closeDrawer}
              className="
                block text-center w-full h-13 leading-[52px]
                rounded-full bg-ink text-white
                font-lalezar text-lg
                hover:bg-ink/90 transition
              "
            >
              إتمام الشراء
            </Link>
          </footer>
        )}
      </aside>
    </>
  );
}