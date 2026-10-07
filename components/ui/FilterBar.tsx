"use client";

import { cn } from "@/lib/utils";
import { categories, type CategoryId } from "@/lib/products";

export type SortKey = "featured" | "price-asc" | "price-desc" | "newest";

const sortOptions: { id: SortKey; label: string }[] = [
  { id: "featured", label: "الأكثر رواجاً" },
  { id: "newest", label: "الأحدث" },
  { id: "price-asc", label: "السعر: من الأقل" },
  { id: "price-desc", label: "السعر: من الأعلى" },
];

interface FilterBarProps {
  activeCategory: CategoryId;
  onCategoryChange: (id: CategoryId) => void;
  activeSort: SortKey;
  onSortChange: (id: SortKey) => void;
  resultCount: number;
}

export function FilterBar({
  activeCategory,
  onCategoryChange,
  activeSort,
  onSortChange,
  resultCount,
}: FilterBarProps) {
  return (
    <div className="space-y-4">
      {/* Category chips */}
      <div
        className="
          flex gap-2 overflow-x-auto pb-1
          -mx-4 px-4
          sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center
          scrollbar-hide
        "
      >
        {categories.map((c) => {
          const active = c.id === activeCategory;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onCategoryChange(c.id)}
              aria-pressed={active}
              className={cn(
                "shrink-0 px-4 h-10 rounded-full",
                "font-lalezar text-base whitespace-nowrap",
                "transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30",
                active
                  ? "bg-ink text-white"
                  : "bg-white/60 text-ink hover:bg-white"
              )}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {/* Sort + count row */}
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs text-ink/50">
          {resultCount} منتج
        </span>

        <div className="flex items-center gap-2">
          <label
            htmlFor="sort"
            className="text-xs text-ink/50 font-lalezar"
          >
            ترتيب حسب
          </label>
          <select
            id="sort"
            value={activeSort}
            onChange={(e) => onSortChange(e.target.value as SortKey)}
            className="
              h-9 pr-3 pl-8 rounded-full
              bg-white/70 hover:bg-white
              border border-ink/10
              font-lalezar text-sm text-ink
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30
              appearance-none
              bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 12 12%22><path d=%22M3 5l3 3 3-3%22 fill=%22none%22 stroke=%22%23171717%22 stroke-width=%221.5%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/></svg>')]
              bg-no-repeat bg-[length:12px_12px] bg-[position:left_10px_center]
            "
          >
            {sortOptions.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}