// components/section/CollectionClient.tsx
"use client";

import { useMemo, useState } from "react";
import { ProductGrid } from "@/components/section/ProductGrid";
import { SearchInput } from "@/components/ui/SearchInput";
import { FilterSidebar } from "@/components/ui/FilterSidebar";
import { FilterDrawer } from "@/components/section/FilterDrawer";
import {
  DEFAULT_FILTERS,
  type FilterState,
} from "@/components/ui/FilterBar";

interface CollectionClientProps {
  products: any[];
}

export function CollectionClient({ products }: CollectionClientProps) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [query, setQuery] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  /* Compute min/max price once — for slider bounds and placeholders */
  const priceBounds = useMemo(() => {
    if (!products.length) return { min: 0, max: 0 };
    const prices = products
      .map((p: any) => p.price ?? 0)
      .filter((n: number) => n > 0);
    return {
      min: prices.length ? Math.floor(Math.min(...prices)) : 0,
      max: prices.length ? Math.ceil(Math.max(...prices)) : 0,
    };
  }, [products]);

  /* Filtering + sorting */
  const filtered = useMemo(() => {
    let list = [...products];

    /* Price */
    if (filters.priceMin !== null) {
      list = list.filter((p: any) => (p.price ?? 0) >= filters.priceMin!);
    }
    if (filters.priceMax !== null) {
      list = list.filter((p: any) => (p.price ?? 0) <= filters.priceMax!);
    }

    /* Stock */
    if (filters.stock === "in-stock") {
      list = list.filter((p: any) => p.inStock === true);
    } else if (filters.stock === "out-of-stock") {
      list = list.filter((p: any) => p.inStock === false);
    }

    /* Date added */
    if (filters.date !== "all") {
      const now = Date.now();
      const days = filters.date === "week" ? 7 : filters.date === "month" ? 30 : 90;
      const cutoff = now - days * 24 * 60 * 60 * 1000;
      list = list.filter((p: any) => {
        if (!p.created_at) return false;
        return new Date(p.created_at).getTime() >= cutoff;
      });
    }

    /* Search */
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((p: any) =>
        `${p.title ?? ""} ${p.subtitle ?? ""} ${p.brand ?? ""}`
          .toLowerCase()
          .includes(q)
      );
    }

    /* Sort */
    switch (filters.sort) {
      case "price-asc":
        list.sort((a: any, b: any) => (a.price ?? 0) - (b.price ?? 0));
        break;
      case "price-desc":
        list.sort((a: any, b: any) => (b.price ?? 0) - (a.price ?? 0));
        break;
      case "newest":
        list.sort(
          (a: any, b: any) =>
            new Date(b.created_at ?? 0).getTime() -
            new Date(a.created_at ?? 0).getTime()
        );
        break;
      /* featured → keep original order */
    }

    return list;
  }, [products, filters, query]);

  return (
    <>
      {/* Top toolbar */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <SearchInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث في المجموعة"
          />
        </div>

        {/* Mobile filter button */}
        <button
          type="button"
          onClick={() => setMobileFiltersOpen(true)}
          className="
            lg:hidden
            inline-flex items-center justify-center gap-2
            h-12 px-5 rounded-full
            bg-white ring-1 ring-ink/10
            font-lalezar text-base text-ink
            hover:bg-cream-50 active:scale-[0.98]
            transition shrink-0
          "
          aria-label="فتح الفلاتر"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
            <circle cx="9" cy="6" r="2" fill="currentColor" />
            <circle cx="15" cy="12" r="2" fill="currentColor" />
            <circle cx="9" cy="18" r="2" fill="currentColor" />
          </svg>
          <span>الفلاتر</span>
        </button>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] lg:gap-8 mt-6">
        {/* Grid — visually left in RTL */}
        <div className="order-2 lg:order-1">
          <ProductGrid
            products={filtered}
            emptyMessage={
              query
                ? `لا توجد نتائج لـ "${query}"`
                : "لا توجد منتجات مطابقة للفلاتر"
            }
          />
        </div>

        {/* Sidebar — visually right in RTL */}
        <div className="order-1 lg:order-2">
          <FilterSidebar
            filters={filters}
            onFiltersChange={setFilters}
            priceBounds={priceBounds}
            resultCount={filtered.length}
          />
        </div>
      </div>

      {/* Mobile drawer */}
      <FilterDrawer
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
        priceBounds={priceBounds}
        resultCount={filtered.length}
      />
    </>
  );
} 