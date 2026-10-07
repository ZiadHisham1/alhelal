"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { SvgIcon } from "./SvgIcon";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
  containerClassName?: string;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(
    { onSearch, className, containerClassName, ...props },
    ref
  ) {
    return (
      <div
        className={cn(
          "relative w-full",
          "bg-white rounded-full",
          "shadow-[0_2px_10px_rgba(0,0,0,0.06)]",
          containerClassName
        )}
        dir="rtl"
      >
        {/* Search icon (right side in RTL) */}
        <span className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
          <SvgIcon name="search" size={20} className="opacity-80" />
        </span>

        <input
          ref={ref}
          type="search"
          placeholder="ابحث"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch?.((e.target as HTMLInputElement).value);
            }
          }}
          className={cn(
            "w-full h-12 sm:h-14",
            "bg-transparent rounded-full",
            "pr-14 pl-5",
            "font-lalezar text-lg text-ink placeholder:text-ink/50",
            "text-center sm:text-right",
            "outline-none focus-visible:ring-2 focus-visible:ring-ink/20",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);