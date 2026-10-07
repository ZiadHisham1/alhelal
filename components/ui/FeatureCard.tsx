import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SvgIcon } from "./SvgIcon";

interface FeatureCardProps {
  title: string;
  image: string;
  href: string;
  className?: string;
}

export function FeatureCard({
  title,
  image,
  href,
  className,
}: FeatureCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group block w-full overflow-hidden",
        "rounded-[28px] bg-white",
        "shadow-[0_4px_20px_rgba(0,0,0,0.08)]",
        "transition-transform duration-300 active:scale-[0.99]",
        className
      )}
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/5] overflow-hidden">
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
      </div>

      {/* Dark footer bar */}
      <div
        className="
          relative
          bg-[#2B1F17]
          flex items-center justify-between
          gap-4 px-4 py-4
        "
      >
        {/* Title (right-aligned in RTL, centered vertically) */}
        <h3 className="flex-1 font-lalezar text-xl text-white text-right leading-tight">
          {title}
        </h3>

        {/* Arrow button (left side in RTL) */}
        <span
          className="
            flex items-center justify-center
            w-10 h-10 rounded-full shrink-0
            bg-black text-ink
            transition-transform duration-300
            group-hover:-translate-x-1
          "
          aria-hidden
        >
          {/* Using your arrow.svg — but rotated for RTL so it points left */}
          <span className="rotate-180 flex items-center justify-center">
            <SvgIcon className="bg-black" name="arrow" size={18} />
          </span>
        </span>
      </div>
    </Link>
  );
}