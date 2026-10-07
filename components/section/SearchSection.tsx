"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sheet, StackedSheet } from "./Sheet";
import { SearchInput } from "@/components/ui/SearchInput";
import { FeatureCard } from "@/components/ui/FeatureCard";

const DEFAULT_FEATURE = {
  title: "اتريه رمادي فخم",
  image: "/img/feature-sofa.jpg",
  href: "/product/luxury-gray-sofa",
};

export function SearchSection({
  title = "اعمل سيرش علي اي منتج",
  feature = DEFAULT_FEATURE,
  ctaLabel = "ابحث عن المزيد",
  ctaHref = "/search",
}: {
  title?: string;
  feature?: { title: string; image: string; href: string };
  ctaLabel?: string;
  ctaHref?: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");

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

        <SearchInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onSearch={handleSearch}
        />

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