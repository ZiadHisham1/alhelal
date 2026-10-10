// components/section/SearchSection.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Sheet, StackedSheet } from "./Sheet";
import { SearchInput } from "@/components/ui/SearchInput";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { InstantSearchResults } from "@/components/ui/InstantSearchResults";
import type { Product } from "@/lib/products";

const DEFAULT_FEATURE = {
  title: "اتريه رمادي فخم",
  image: "/img/feature-sofa.jpg",
  href: "/product/luxury-gray-sofa",
};

interface SearchSectionProps {
  title?: string;
  feature?: { title: string; image: string; href: string };
  ctaLabel?: string;
  ctaHref?: string;
  /** All products to search through — pass from server */
  products?: Product[];
}

export function SearchSection({
  title = "اعمل سيرش علي اي منتج",
  feature = DEFAULT_FEATURE,
  ctaLabel = "ابحث عن المزيد",
  ctaHref = "/search",
  products = [],
}: SearchSectionProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  /* ---------- Live filter ---------- */
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter((p) =>
      `${p.title ?? ""} ${p.subtitle ?? ""} ${p.brand ?? ""}`
        .toLowerCase()
        .includes(q)
    );
  }, [query, products]);

  /* ---------- Close on outside click ---------- */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  /* ---------- Navigate to full results page ---------- */
  const handleSearch = (value?: string) => {
    const q = (value ?? query).trim();
    if (!q) return;
    router.push(`${ctaHref}?q=${encodeURIComponent(q)}`);
  };

  return (
    <StackedSheet layer={20} pin topOffset={72}>
      <div className="max-w-[560px] mx-auto space-y-6">
        <h2 className="font-lalezar text-2xl sm:text-3xl text-ink text-center">
          {title}
        </h2>

        {/* Search wrapper — relative so dropdown positions under input */}
        <div ref={containerRef} className="relative">
          <SearchInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onSearch={handleSearch}
            onFocus={() => setIsFocused(true)}
            placeholder="ابحث عن كنبة، سرير، أثاث..."
          />

          {/* Live results dropdown */}
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

        <FeatureCard {...feature} />

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