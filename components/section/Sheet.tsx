import { cn } from "@/lib/utils";

const LAYER_MAP = {
  10: "z-10",
  20: "z-20",
  30: "z-30",
  40: "z-40",
} as const;

type Layer = keyof typeof LAYER_MAP;

/* =========================================================================
   StackedSheet — pins to top; content flows; NEXT sheet rises only after
   user has scrolled through ALL of this sheet's content.
   ========================================================================= */
interface StackedSheetProps {
  children: React.ReactNode;
  className?: string;
  layer?: Layer;
  overlapClass?: string;
  bgClass?: string;
  /** Accepted but ignored — StackedSheet always pins via its sticky wrapper */
  pin?: boolean;
  /** Accepted but ignored — position is controlled by the sticky wrapper */
  topOffset?: number | string;
}

interface SheetProps {
  children: React.ReactNode;
  className?: string;
  layer?: Layer;
  overlapClass?: string;
  bgClass?: string;
  /** Accepted for API parity. If true, wraps the sheet in a sticky div. */
  pin?: boolean;
  /** Distance from viewport top when `pin` is true. Default 0. */
  topOffset?: number | string;
}

export function StackedSheet({
  children,
  className,
  layer = 10,
  overlapClass = "-mt-6",
  bgClass = "bg-cream-100",
}: StackedSheetProps) {
  return (
    /* Sticky wrapper: sticks to top while the whole sheet scrolls */
    <div className={cn("sticky top-0", LAYER_MAP[layer])}>
      <section
        className={cn(
          /* Full viewport minimum — content can be taller */
          "relative min-h-screen w-full",
          /* Visuals */
          bgClass,
          "rounded-t-[28px]",
          overlapClass,
          "pt-8 pb-16 px-4",
          "shadow-[0_-8px_24px_rgba(0,0,0,0.08)]",
          className
        )}
      >
        <div className="mx-auto w-full max-w-[720px]">
          {children}
        </div>
      </section>
    </div>
  );
}



export function Sheet({
  children,
  className,
  layer = 10,
  overlapClass = "-mt-6",
  bgClass = "bg-cream-100",
  pin = true,
  topOffset = 0,
}: SheetProps) {
  const inner = (
    <section className={cn("relative w-full", bgClass, "rounded-t-[28px]", "pt-8 pb-16 px-4", "shadow-[0_-8px_24px_rgba(0,0,0,0.08)]", className)}>
      <div className="mx-auto w-full max-w-[720px]">{children}</div>
    </section>
  );

  return (
    <div className={cn("relative", LAYER_MAP[layer], overlapClass)}>
      {pin ? (
        <div
          className="sticky"
          style={{ top: typeof topOffset === "number" ? `${topOffset}px` : topOffset }}
        >
          {inner}
        </div>
      ) : (
        inner
      )}
    </div>
  );
}