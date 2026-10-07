import Image from "next/image";
import { cn } from "@/lib/utils";

interface HeroProps {
  image: string;
  alt: string;
  title: string;
  subtitle?: string;
  heightClass?: string;
  className?: string;
}

export function Hero({
  image,
  alt,
  title,
  subtitle,
  heightClass = "h-[40vh]",
  className,
}: HeroProps) {
  return (
    <section
      className={cn(
        "sticky top-0 z-0 w-full overflow-hidden",
        heightClass,
        className
      )}
    >
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

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      <div className="absolute min-h-28 bottom-8 right-6 left-6 text-right">
        <h1 className="font-lalezar text-3xl sm:text-4xl text-white leading-tight drop-shadow-md">
          {title}
        </h1>
        {subtitle && (
          <h2 className="font-lalezar text-4xl sm:text-5xl text-white leading-tight drop-shadow-md">
            {subtitle}
          </h2>
        )}
      </div>
    </section>
  );
}

/* Alias used by other files */
export const StickyHero = Hero;

/* Default export so `import Hero from "../section/Hero"` works */
export default Hero;