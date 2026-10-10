// components/ui/InstantSearchResults.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/products";

interface InstantSearchResultsProps {
  results: Product[];
  query: string;
  onSelect: () => void;
  visible: boolean;
}

export function InstantSearchResults({
  results,
  query,
  onSelect,
  visible,
}: InstantSearchResultsProps) {
  if (!visible || !query.trim()) return null;

  if (results.length === 0) {
    return (
      <div
        className="
          absolute left-0 right-0 top-full mt-2 z-40
          rounded-3xl bg-white
          ring-1 ring-ink/10
          shadow-[0_12px_32px_rgba(0,0,0,0.12)]
          p-5 text-center
        "
      >
        <p className="font-lalezar text-ink/70">
          لا توجد نتائج لـ &quot;{query}&quot;
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        absolute left-0 right-0 top-full mt-2 z-40
        max-h-[380px] overflow-y-auto
        rounded-3xl bg-white
        ring-1 ring-ink/10
        shadow-[0_12px_32px_rgba(0,0,0,0.12)]
        p-2
      "
      role="listbox"
      aria-label="نتائج البحث"
    >
      {results.slice(0, 6).map((p) => (
        <Link
          key={p.id}
          href={p.href}
          onClick={onSelect}
          role="option"
          className="
            flex items-center gap-3
            rounded-2xl p-2
            hover:bg-cream-100 transition
          "
        >
          {/* Thumbnail */}
          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-cream-100 shrink-0">
            <Image
              src={p.image}
              alt={p.title}
              fill
              sizes="56px"
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0 text-right">
            <p className="font-lalezar text-base text-ink truncate">
              {p.title}
              {p.subtitle ? ` ${p.subtitle}` : ""}
            </p>
            <p className="text-sm text-ink/60 mt-0.5">
              {p.price.toLocaleString("ar-EG")} ج.م
            </p>
          </div>

          {/* Arrow */}
          <svg
            viewBox="0 0 20 20"
            className="w-4 h-4 shrink-0 text-ink/30"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M12 5l-5 5 5 5" />
          </svg>
        </Link>
      ))}

      {/* Footer */}
      {results.length > 6 && (
        <Link
          href={`/search?q=${encodeURIComponent(query)}`}
          onClick={onSelect}
          className="
            block text-center py-3 mt-1
            font-lalezar text-ink/70 hover:text-ink
            border-t border-ink/5
            transition
          "
        >
          عرض كل النتائج ({results.length})
        </Link>
      )}
    </div>
  );
}