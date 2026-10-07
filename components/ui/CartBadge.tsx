"use client";

import { useCartStore } from "@/lib/cart-store";

export function CartBadge() {
  const count = useCartStore((s) => s.totalItems());

  if (count === 0) return null;

  return (
    <span
      className="
        absolute -top-0.5 -right-0.5
        min-w-[18px] h-[18px] px-1
        flex items-center justify-center
        rounded-full bg-ink text-white
        text-[10px] font-bold leading-none
        pointer-events-none
      "
      aria-label={`${count} منتج في السلة`}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}