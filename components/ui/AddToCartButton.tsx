// src/components/ui/AddToCartButton.tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/lib/cart-store";

interface AddToCartButtonProps {
  variantId: string;
  productId: string;
  title: string;
  subtitle?: string;
  image: string;
  href: string;
  quantity: number;
  disabled?: boolean;
}

type Status = "idle" | "loading" | "added";

export function AddToCartButton({
  variantId,
  productId,
  title,
  subtitle,
  image,
  href,
  quantity,
  disabled,
}: AddToCartButtonProps) {
  const [status, setStatus] = useState<Status>("idle");
  const addItem = useCartStore((s) => s.addItem);

  async function handleClick() {
    if (status !== "idle") return;
    setStatus("loading");
    try {
      await addItem(
        { variantId, productId, title, subtitle, image, href },
        quantity
      );
      setStatus("added");
      setTimeout(() => setStatus("idle"), 1800);
    } catch {
      setStatus("idle");
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || status === "loading"}
      className={cn(
        "w-full h-14 rounded-full font-lalezar text-xl text-white transition-colors duration-300",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        status === "added"
          ? "bg-emerald-600"
          : "bg-ink hover:bg-ink/90 active:scale-[0.99]"
      )}
    >
      {disabled
        ? "غير متوفر حالياً"
        : status === "loading"
        ? "... جاري الإضافة"
        : status === "added"
        ? "✓ تمت الإضافة"
        : "أضف إلى السلة"}
    </button>
  );
}