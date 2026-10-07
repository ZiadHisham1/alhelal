"use client";

import { useMemo, useState } from "react";
import { ProductGrid } from "@/components/section/ProductGrid";
import { FilterBar, type SortKey } from "@/components/ui/FilterBar";
import { SearchInput } from "@/components/ui/SearchInput";
import type { CategoryId } from "@/lib/products";

interface CollectionClientProps {
  products: any[]; // 🔌 Replace `any` with your Medusa product type
}

export function CollectionClient({ products }: CollectionClientProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [activeSort, setActiveSort] = useState<SortKey>("featured");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = [...products];

    // Category filter — adjust to your Medusa shape
    if (activeCategory !== "all") {
      list = list.filter((p: any) =>
        (p.categories ?? []).some(
          (c: any) => c.handle === activeCategory || c.id === activeCategory
        )
      );
    }

    // Search
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((p: any) =>
        `${p.title ?? ""} ${p.subtitle ?? ""}`
          .toLowerCase()
          .includes(q)
      );
    }

    // Sort
    switch (activeSort) {
      case "price-asc":
        list.sort(
          (a: any, b: any) => (a.price ?? 0) - (b.price ?? 0)
        );
        break;
      case "price-desc":
        list.sort(
          (a: any, b: any) => (b.price ?? 0) - (a.price ?? 0)
        );
        break;
      case "newest":
        list.sort(
          (a: any, b: any) =>
            new Date(b.created_at ?? 0).getTime() -
            new Date(a.created_at ?? 0).getTime()
        );
        break;
      // featured → keep original order
    }

    return list;
  }, [products, activeCategory, activeSort, query]);

  return (
    <>
      {/* Search */}
      <SearchInput
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="ابحث في المجموعة"
      />

      {/* Filters */}
      <FilterBar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        activeSort={activeSort}
        onSortChange={setActiveSort}
        resultCount={filtered.length}
      />

      {/* Grid */}
      <ProductGrid
        products={filtered}
        emptyMessage={
          query
            ? `لا توجد نتائج لـ "${query}"`
            : "لا توجد منتجات في هذه الفئة"
        }
      />
    </>
  );
}