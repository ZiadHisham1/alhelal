import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface CategoryCardProps {
  title: string;
  subtitle?: string;
  brand?: string;
  image: string;
  href: string;
  className?: string;
}

export function CategoryCard({
  title,
  subtitle,
  brand,
  image,
  href,
  className,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative block w-full h-[180px] overflow-hidden",
        "rounded-[28px]",
        "aspect-[4/3] sm:aspect-[16/10]",
        "shadow-card",
        "transition-transform duration-300 active:scale-[0.99]",
        className
      )}
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 720px"
        className="
          object-cover
          transition-transform duration-700 ease-out
          group-hover:scale-[1.04]
        "
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <h3 className="font-lalezar text-4xl text-white leading-[1.05] drop-shadow-sm">
          {title}
        </h3>
        {subtitle && (
          <p className="font-lalezar text-4xl text-white leading-[1.05] -mt-1 drop-shadow-sm">
            {subtitle}
          </p>
        )}
        {brand && (
          <p className="mt-3 text-white/85 text-xs sm:text-sm tracking-[0.2em] uppercase">
            {brand}
          </p>
        )}
      </div>
    </Link>
  );
}