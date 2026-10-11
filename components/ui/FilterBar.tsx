// components/ui/FilterBar.tsx
"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type SortKey = "featured" | "newest" | "price-asc" | "price-desc";
export type DateFilter = "all" | "week" | "month" | "three-months";
export type StockFilter = "all" | "in-stock" | "out-of-stock";

export interface FilterState {
  priceMin: number | null;
  priceMax: number | null;
  stock: StockFilter;
  date: DateFilter;
  sort: SortKey;
}

export const DEFAULT_FILTERS: FilterState = {
  priceMin: null,
  priceMax: null,
  stock: "all",
  date: "all",
  sort: "featured",
};

interface FilterBarProps {
  filters: FilterState;
  onFiltersChange: (next: FilterState) => void;
  /** Min and max price present in the product set (for slider bounds + placeholder) */
  priceBounds: { min: number; max: number };
  resultCount: number;
  /** "horizontal" for mobile drawer, "vertical" for desktop sidebar */
  orientation?: "horizontal" | "vertical";
}

const sortOptions: { id: SortKey; label: string }[] = [
  { id: "featured", label: "الأكثر رواجاً" },
  { id: "newest", label: "الأحدث أولاً" },
  { id: "price-asc", label: "السعر: من الأقل للأعلى" },
  { id: "price-desc", label: "السعر: من الأعلى للأقل" },
];

const dateOptions: { id: DateFilter; label: string }[] = [
  { id: "all", label: "الكل" },
  { id: "week", label: "آخر أسبوع" },
  { id: "month", label: "آخر شهر" },
  { id: "three-months", label: "آخر 3 شهور" },
];

export function FilterBar({
  filters,
  onFiltersChange,
  priceBounds,
  resultCount,
  orientation = "horizontal",
}: FilterBarProps) {
  const isVertical = orientation === "vertical";

  /* Local state for the price inputs so typing doesn't re-filter on every keystroke */
  const [priceMinLocal, setPriceMinLocal] = useState<string>(
    filters.priceMin?.toString() ?? ""
  );
  const [priceMaxLocal, setPriceMaxLocal] = useState<string>(
    filters.priceMax?.toString() ?? ""
  );

  /* Sync local state if parent resets */
  useEffect(() => {
    setPriceMinLocal(filters.priceMin?.toString() ?? "");
    setPriceMaxLocal(filters.priceMax?.toString() ?? "");
  }, [filters.priceMin, filters.priceMax]);

  const update = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const applyPrice = () => {
    const min = priceMinLocal ? Number(priceMinLocal) : null;
    const max = priceMaxLocal ? Number(priceMaxLocal) : null;
    onFiltersChange({ ...filters, priceMin: min, priceMax: max });
  };

  const clearPrice = () => {
    setPriceMinLocal("");
    setPriceMaxLocal("");
    onFiltersChange({ ...filters, priceMin: null, priceMax: null });
  };

  const resetAll = () => onFiltersChange(DEFAULT_FILTERS);

  const hasActiveFilters =
    filters.priceMin !== null ||
    filters.priceMax !== null ||
    filters.stock !== "all" ||
    filters.date !== "all" ||
    filters.sort !== "featured";

  return (
    <div className={cn("space-y-6", !isVertical && "space-y-5")}>
      {/* ---------- SORT ---------- */}
      <Section title="ترتيب حسب">
        <select
          value={filters.sort}
          onChange={(e) => update("sort", e.target.value as SortKey)}
          className={cn(
            "w-full rounded-full bg-white ring-1 ring-ink/10",
            "font-lalezar text-ink px-4",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30",
            "appearance-none cursor-pointer",
            isVertical ? "h-11 text-base" : "h-10 text-sm"
          )}
        >
          {sortOptions.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
      </Section>

      {/* ---------- PRICE ---------- */}
      <Section title="السعر">
        <div className="flex items-center gap-2">
          <input
            type="number"
            inputMode="numeric"
            placeholder={`${priceBounds.min}`}
            value={priceMinLocal}
            onChange={(e) => setPriceMinLocal(e.target.value)}
            onBlur={applyPrice}
            onKeyDown={(e) => e.key === "Enter" && applyPrice()}
            className={cn(
              "flex-1 min-w-0 h-10 rounded-full px-3",
              "bg-white ring-1 ring-ink/10",
              "font-lalezar text-ink text-sm text-center",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30",
              "placeholder:text-ink/40"
            )}
          />
          <span className="text-ink/40 font-lalezar text-sm shrink-0">إلى</span>
          <input
            type="number"
            inputMode="numeric"
            placeholder={`${priceBounds.max}`}
            value={priceMaxLocal}
            onChange={(e) => setPriceMaxLocal(e.target.value)}
            onBlur={applyPrice}
            onKeyDown={(e) => e.key === "Enter" && applyPrice()}
            className={cn(
              "flex-1 min-w-0 h-10 rounded-full px-3",
              "bg-white ring-1 ring-ink/10",
              "font-lalezar text-ink text-sm text-center",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30",
              "placeholder:text-ink/40"
            )}
          />
        </div>

        {(filters.priceMin !== null || filters.priceMax !== null) && (
          <button
            type="button"
            onClick={clearPrice}
            className="text-xs text-rose-600 hover:text-rose-700 font-lalezar mt-2"
          >
            إزالة فلتر السعر
          </button>
        )}
      </Section>

      {/* ---------- AVAILABILITY ---------- */}
      <Section title="التوفر">
        <div className="space-y-2">
          {[
            { id: "all" as StockFilter, label: "الكل" },
            { id: "in-stock" as StockFilter, label: "متوفر" },
            { id: "out-of-stock" as StockFilter, label: "غير متوفر" },
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => update("stock", opt.id)}
              className={cn(
                "w-full flex items-center gap-3 text-right",
                "px-3 py-2 rounded-xl",
                "font-lalezar text-base transition-colors",
                filters.stock === opt.id
                  ? "bg-ink text-white"
                  : "text-ink hover:bg-white"
              )}
            >
              <span
                className={cn(
                  "w-4 h-4 rounded-full border-2 shrink-0 grid place-items-center transition-colors",
                  filters.stock === opt.id
                    ? "border-white bg-white"
                    : "border-ink/30"
                )}
              >
                {filters.stock === opt.id && (
                  <span className="w-2 h-2 rounded-full bg-ink" />
                )}
              </span>
              {opt.label}
            </button>
          ))}
        </div>
      </Section>

      {/* ---------- DATE ADDED ---------- */}
      <Section title="أضيف حديثاً">
        <select
          value={filters.date}
          onChange={(e) => update("date", e.target.value as DateFilter)}
          className={cn(
            "w-full rounded-full bg-white ring-1 ring-ink/10",
            "font-lalezar text-ink px-4",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30",
            "appearance-none cursor-pointer",
            isVertical ? "h-11 text-base" : "h-10 text-sm"
          )}
        >
          {dateOptions.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
      </Section>

      {/* ---------- RESULT COUNT + RESET ---------- */}
      <div
        className={cn(
          "pt-4 border-t border-ink/10 space-y-3",
          !isVertical && "hidden"
        )}
      >
        <p className="font-lalezar text-sm text-ink/60 text-right">
          {resultCount} منتج
        </p>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetAll}
            className="
              w-full h-10 rounded-full
              bg-rose-50 text-rose-700
              font-lalezar text-sm
              hover:bg-rose-100 transition
            "
          >
            إزالة كل الفلاتر
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------- Section wrapper ---------- */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-lalezar text-base text-ink mb-3 text-right">
        {title}
      </h3>
      {children}
    </div>
  );
}