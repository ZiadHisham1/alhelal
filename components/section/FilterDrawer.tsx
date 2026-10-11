// components/section/FilterDrawer.tsx
"use client";

import { cn } from "@/lib/utils";
import { FilterBar, type FilterState } from "@/components/ui/FilterBar";

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  filters: FilterState;
  onFiltersChange: (next: FilterState) => void;
  priceBounds: { min: number; max: number };
  resultCount: number;
}

export function FilterDrawer({
  open,
  onClose,
  filters,
  onFiltersChange,
  priceBounds,
  resultCount,
}: FilterDrawerProps) {
  return (
    <>
      <div
        onClick={onClose}
        aria-hidden
        className={cn(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden",
          "transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        aria-label="الفلاتر"
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-[88%] max-w-[400px] lg:hidden",
          "bg-cream-50 shadow-2xl flex flex-col",
          "transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-5 border-b border-black/5">
          <h2 className="font-lalezar text-xl text-ink">الفلاتر</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق الفلاتر"
            className="w-9 h-9 rounded-full hover:bg-black/5 grid place-items-center text-ink text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <FilterBar
            filters={filters}
            onFiltersChange={onFiltersChange}
            priceBounds={priceBounds}
            resultCount={resultCount}
            orientation="horizontal"
          />
        </div>

        <div className="p-5 border-t border-black/5">
          <button
            type="button"
            onClick={onClose}
            className="
              w-full h-12 rounded-full
              bg-ink text-white font-lalezar text-base
              hover:bg-ink/90 active:scale-[0.99] transition
            "
          >
            عرض {resultCount} منتج
          </button>
        </div>
      </aside>
    </>
  );
}