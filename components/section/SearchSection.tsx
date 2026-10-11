// components/section/SearchSection.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { StackedSheet } from "./Sheet";
import { SearchInput } from "@/components/ui/SearchInput";
import { InstantSearchResults } from "@/components/ui/InstantSearchResults";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/products";

interface SearchSectionProps {
  title?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** All products to search & display — always from Medusa */
  products?: Product[];
  /** How many products to show in the desktop grid */
  limit?: number;
}

export function SearchSection({
  title = "اعمل سيرش علي اي منتج او اعمله عمولة",
  ctaLabel = "ابحث عن المزيد",
  ctaHref = "/search",
  products = [],
  limit = 4,
}: SearchSectionProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  /* Live filter */
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter((p) =>
      `${p.title ?? ""} ${p.subtitle ?? ""} ${p.brand ?? ""}`
        .toLowerCase()
        .includes(q)
    );
  }, [query, products]);

  /* Close dropdown on outside click */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearch = (value?: string) => {
    const q = (value ?? query).trim();
    if (!q) return;
    router.push(`${ctaHref}?q=${encodeURIComponent(q)}`);
  };

  /* Only Medusa products — no hardcoded feature */
  const visibleProducts = products.slice(0, limit);

  /* If Medusa returned nothing, hide the card row entirely */
  const hasProducts = visibleProducts.length > 0;

  return (
    <StackedSheet layer={40} pin topOffset={72} className="!min-h-0">
      <div className="max-w-[560px] lg:max-w-[1200px] mx-auto space-y-6 lg:space-y-8">
        {/* Title */}
        <h2 className="font-lalezar text-2xl sm:text-3xl lg:text-4xl text-ink text-center">
          {title}
        </h2>

        {/* Search input */}
        <div ref={containerRef} className="relative max-w-[560px] mx-auto">
          <SearchInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onSearch={handleSearch}
            onFocus={() => setIsFocused(true)}
            placeholder="ابحث عن كنبة، سرير، أثاث..."
          />
          <InstantSearchResults
            results={results}
            query={query}
            visible={isFocused && query.trim().length > 0}
            onSelect={() => {
              setIsFocused(false);
              setQuery("");
            }}
          />
        </div>

        {/* ============ Product row (Medusa only) ============ */}
        {hasProducts && (
          <div
            className="
              flex gap-4 overflow-x-auto pb-3
              snap-x snap-mandatory
              -mx-4 px-4
              sm:mx-0 sm:px-0
              lg:grid lg:grid-cols-4 lg:gap-5
              lg:overflow-visible lg:snap-none lg:pb-0
              scrollbar-hide
            "
          >
            {visibleProducts.map((p) => (
              <div
                key={p.id}
                className="
                  shrink-0 w-[68%] sm:w-[220px]
                  lg:w-auto
                  snap-start
                "
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <button
          type="button"
          onClick={() => handleSearch()}
          className="
            w-full h-14 rounded-full
            bg-[#2B1F17] text-white
            font-lalezar text-xl
            hover:bg-[#3a291f] active:scale-[0.99]
            transition
          "
        >
          {ctaLabel}
        </button>
      </div>
    </StackedSheet>
  );
}

/* ============================================================
   Product card — uniform design
   ============================================================ */
function ProductCard({ product }: { product: Product }) {
  const hasPrice =
    typeof product.price === "number" && product.price > 0;

  return (
    <Link
      href={product.href}
      className={cn(
        "group block w-full overflow-hidden",
        "rounded-[24px]",
        "bg-white",
        "shadow-[0_4px_20px_rgba(0,0,0,0.08)]",
        "transition-all duration-300",
        "active:scale-[0.99]",
        "lg:hover:-translate-y-1 lg:hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)]"
      )}
    >
      {/* Image */}
      <div className="relative w-full aspect-square lg:aspect-[4/5] overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 70vw, (max-width: 1024px) 220px, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Dark footer bar */}
      <div className="flex items-center justify-between gap-3 px-3.5 py-3 lg:px-4 lg:py-3.5 bg-[#2B1F17]">
        <div className="flex-1 min-w-0 text-right">
          <h3 className="font-lalezar text-white text-sm lg:text-base leading-tight truncate">
            {product.title}
          </h3>
          {hasPrice && (
            <p className="text-white/65 text-xs lg:text-sm mt-0.5 font-lalezar">
              {product.price.toLocaleString("ar-EG")} ج.م
            </p>
          )}
        </div>

        {/* Arrow button */}
        <span
          className="
            flex items-center justify-center shrink-0
            w-8 h-8 lg:w-9 lg:h-9 rounded-full
            bg-white/95 text-ink
            transition-transform duration-300
            group-hover:-translate-x-1
          "
          aria-hidden
        >
          <svg
            viewBox="0 0 20 20"
            className="w-3.5 h-3.5 rotate-180"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5l-5 5 5 5" />
          </svg>
        </span>
      </div>
    </Link>
  );
}