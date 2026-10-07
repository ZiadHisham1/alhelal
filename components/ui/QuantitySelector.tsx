"use client";

import { cn } from "@/lib/utils";

// src/components/ui/QuantitySelector.tsx
interface QuantitySelectorProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;      // ← add this
  className?: string;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  disabled,
  className,
}: QuantitySelectorProps) {
  const dec = () => !disabled && onChange(Math.max(min, value - 1));
  const inc = () => !disabled && onChange(Math.min(max, value + 1));

  return (
    <div
      className={cn(
        "inline-flex items-center",
        "rounded-full bg-white/70 ring-1 ring-ink/10",
        "h-12",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      dir="ltr"
    >
      <button
        type="button"
        onClick={dec}
        disabled={disabled || value <= min}
        aria-label="تقليل الكمية"
        className="w-12 h-12 grid place-items-center rounded-full text-ink text-xl font-bold hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        −
      </button>
      <span
        aria-live="polite"
        className="w-10 text-center font-lalezar text-lg text-ink select-none"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={inc}
        disabled={disabled || value >= max}
        aria-label="زيادة الكمية"
        className="w-12 h-12 grid place-items-center rounded-full text-ink text-xl font-bold hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        +
      </button>
    </div>
  );
}