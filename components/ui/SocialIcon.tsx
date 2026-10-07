import Link from "next/link";
import { cn } from "@/lib/utils";
import type { SocialLink } from "@/config/footer";

interface SocialIconProps extends SocialLink {
  size?: number;
  className?: string;
}

export function SocialIcon({
  icon,
  label,
  href,
  color,
  size = 44,
  className,
}: SocialIconProps) {
  const isExternal = /^https?:\/\//.test(href);

  const content = (
    <span className="relative w-full h-full flex items-center justify-center">
      {/* Glow */}
      <span
        aria-hidden
        className="
          absolute inset-0 rounded-full
          opacity-0 group-hover:opacity-70
          transition-opacity duration-300
          blur-md
        "
        style={{ background: color }}
      />
      {/* Icon */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/icons/${icon}.svg`}
        alt=""
        width={size}
        height={size}
        draggable={false}
        aria-hidden
        className="relative w-full h-full object-contain pointer-events-none select-none"
      />
    </span>
  );

  const classes = cn(
    "group relative inline-flex items-center justify-center",
    "rounded-full bg-white/5 ring-1 ring-white/10",
    "p-2.5",
    "transition-transform duration-200",
    "hover:scale-105 active:scale-95",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
    className
  );

  const style = { width: size, height: size };

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={classes}
        style={style}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={label} className={classes} style={style}>
      {content}
    </Link>
  );
}