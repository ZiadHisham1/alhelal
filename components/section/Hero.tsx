import Image from "next/image";
import { cn } from "@/lib/utils";

interface HeroProps {
  image: string;
  alt: string;
  title: string;
  subtitle?: string;
  /** Optional CTA buttons */
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  /** Responsive height — mobile → desktop */
  heightClass?: string;
  className?: string;
}

export function Hero({
  image,
  alt,
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  heightClass = "h-[45vh] sm:h-[30vh] lg:h-[80vh]",
  className,
}: HeroProps) {
  return (
    <section
      className={cn(
        "sticky top-0 z-0 w-full",
        heightClass,
        className
      )}
    >
      {/* Background image */}
      <div className="relative w-full h-full">
        <Image
          src={image}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Legibility gradient — stronger at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Optional soft vignette on the edges (premium feel) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.25) 100%)",
        }}
      />

      {/* Content container */}
      <div
        className={cn(
          "absolute inset-0 flex flex-col justify-end",
          "px-5 sm:px-8 lg:px-12",
          "pb-10 sm:pb-14 lg:pb-20",
          "max-w-[720px] lg:max-w-[1100px] mx-auto w-full"
        )}
      >
        <div className="text-right sm:text-right">
          {/* Title */}
          <h1
            className={cn(
              "font-lalezar text-white drop-shadow-md",
              "text-3xl sm:text-4xl lg:text-5xl",
              "leading-[1.15] lg:leading-[1.05]",
              "tracking-tight"
            )}
          >
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <h2
              className={cn(
                "font-lalezar text-white drop-shadow-md",
                "text-5xl sm:text-6xl lg:text-7xl",
                "leading-[1.05]",
                "-mt-1 sm:-mt-2"
              )}
            >
              {subtitle}
            </h2>
          )}

          {/* Optional CTA buttons */}
          {(ctaPrimary || ctaSecondary) && (
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-end">
              {ctaPrimary && (
                <a
                  href={ctaPrimary.href}
                  className={cn(
                    "inline-flex items-center justify-center",
                    "h-12 sm:h-14 px-6 sm:px-8 rounded-full",
                    "bg-ink text-white font-lalezar text-base sm:text-lg",
                    "hover:bg-ink/90 active:scale-[0.98]",
                    "transition-all duration-200",
                    "shadow-[0_8px_24px_rgba(0,0,0,0.3)]",
                    "w-full sm:w-auto"
                  )}
                >
                  {ctaPrimary.label}
                </a>
              )}
              {ctaSecondary && (
                <a
                  href={ctaSecondary.href}
                  className={cn(
                    "inline-flex items-center justify-center",
                    "h-12 sm:h-14 px-6 sm:px-8 rounded-full",
                    "bg-white/95 backdrop-blur-sm text-ink font-lalezar text-base sm:text-lg",
                    "ring-1 ring-white/50",
                    "hover:bg-white active:scale-[0.98]",
                    "transition-all duration-200",
                    "shadow-[0_8px_24px_rgba(0,0,0,0.2)]",
                    "w-full sm:w-auto"
                  )}
                >
                  {ctaSecondary.label}
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Subtle scroll hint at the very bottom (mobile only) */}
      {/* <div
        aria-hidden
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 sm:hidden"
      >
        <div className="w-1 h-6 rounded-full bg-white/40 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/80 rounded-full animate-[scrollHint_1.8s_ease-in-out_infinite]" />
        </div>
      </div> */}
    </section>
  );
}

/* Alias used by other files */
export const StickyHero = Hero;

/* Default export for `import Hero from "../section/Hero"` */
export default Hero;