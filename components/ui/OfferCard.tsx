import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface OfferCardProps {
  /** Title — use "\n" for line breaks, e.g. "عرض القطعتين\n+ كرسي هدية" */
  title: string;
  image: string;
  href: string;
  className?: string;
}

export function OfferCard({ title, image, href, className }: OfferCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative block w-full overflow-hidden",
        "rounded-[28px]",
        "aspect-[16/10]",
        "shadow-card",
        "transition-transform duration-300 active:scale-[0.99]",
        className
      )}
    >
      {/* Relative wrapper — required for next/image fill */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title.replace(/\n/g, " ")}
          fill
          sizes="(max-width: 768px) 100vw, 720px"
          className="
            object-cover
            transition-transform duration-700 ease-out
            group-hover:scale-[1.04]
          "
        />
      </div>

      {/* Soft dimming so white text is readable on any image */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Centered title (both axes) */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <h3
          className="
            font-lalezar
            text-3xl sm:text-4xl
            text-white leading-[1.15]
            text-center
            drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]
            whitespace-pre-line
          "
        >
          {title}
        </h3>
      </div>
    </Link>
  );
}