// components/ui/FilterSidebar.tsx
import { FilterBar, type FilterState } from "@/components/ui/FilterBar";

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (next: FilterState) => void;
  priceBounds: { min: number; max: number };
  resultCount: number;
}

export function FilterSidebar({
  filters,
  onFiltersChange,
  priceBounds,
  resultCount,
}: FilterSidebarProps) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-[100px]">
        <div
          className="
            rounded-[24px] bg-white
            ring-1 ring-ink/5
            shadow-[0_4px_20px_rgba(0,0,0,0.06)]
            p-6
          "
        >
          <h2 className="font-lalezar text-lg text-ink mb-5 text-right">
            الفلاتر
          </h2>

          <FilterBar
            filters={filters}
            onFiltersChange={onFiltersChange}
            priceBounds={priceBounds}
            resultCount={resultCount}
            orientation="vertical"
          />
        </div>
      </div>
    </aside>
  );
}