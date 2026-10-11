// components/section/Sheet.tsx
import { cn } from "@/lib/utils";

const LAYER_MAP = {
  10: "z-10",
  20: "z-20",
  30: "z-30",
  40: "z-40",
} as const;

type Layer = keyof typeof LAYER_MAP;

interface StackedSheetProps {
  children: React.ReactNode;
  className?: string;
  layer?: Layer;
  overlapClass?: string;
  bgClass?: string;
  pin?: boolean;
  topOffset?: number | string;
}

export function StackedSheet({
  children,
  className,
  layer = 10,
  overlapClass = "-mt-6",
  bgClass = "bg-cream-100",
  topOffset = 72,
}: StackedSheetProps) {
  return (
    <div className={cn("relative", LAYER_MAP[layer], overlapClass)}>
      <div
        className="sticky lg:static"
        style={{
          top: typeof topOffset === "number" ? `${topOffset}px` : topOffset,
        }}
      >
        <section
          className={cn(
            "relative w-full min-h-screen lg:min-h-0",
            bgClass,
            "rounded-t-[28px] lg:rounded-none",
            "pt-8 pb-16 px-4",
            "shadow-[0_-8px_24px_rgba(0,0,0,0.08)] lg:shadow-none",
            className
          )}
        >
          <div className="mx-auto w-full max-w-[720px] lg:max-w-[1200px]">
            {children}
          </div>
        </section>
      </div>
    </div>
  );
}

interface SheetProps {
  children: React.ReactNode;
  className?: string;
  layer?: Layer;
  overlapClass?: string;
  bgClass?: string;
  pin?: boolean;
  topOffset?: number | string;
}

export function Sheet({
  children,
  className,
  layer = 40,
  overlapClass = "-mt-6",
  bgClass = "bg-cream-100",
}: SheetProps) {
  return (
    <section
      className={cn(
        "relative w-full",
        LAYER_MAP[layer],
        bgClass,
        "rounded-t-[28px] lg:rounded-none",
        overlapClass,
        "lg:mt-0",
        "pt-8 pb-16 px-4",
        "shadow-[0_-8px_24px_rgba(0,0,0,0.08)] lg:shadow-none",
        className
      )}
    >
      <div className="mx-auto w-full max-w-[720px] lg:max-w-[1200px]">
        {children}
      </div>
    </section>
  );
}

export default Sheet;