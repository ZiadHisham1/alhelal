"use client";

import Link from "next/link";
import { cn } from "./../../lib/utils";
import { SvgIcon } from "./SvgIcon";

type IconName = "menu" | "cart" | "profile" | "search" | "arrow";

interface IconButtonProps {
  icon: IconName;
  label: string;
  href?: string;
  onClick?: () => void;
  badge?: number;
  size?: number;
  className?: string;
}

export function IconButton({
  icon,
  label,
  href,
  onClick,
  badge,
  size = 26,
  className,
}: IconButtonProps) {
  const buttonClasses = cn(
    "relative flex items-center justify-center",
    "w-10 h-10 rounded-full shrink-0",
    "transition-colors duration-200",
    "hover:bg-white/15 active:bg-white/25",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60",
    className
  );

  const content = (
    <>
      <SvgIcon name={icon} size={size} />
      {typeof badge === "number" && badge > 0 && (
        <span
          className="
            absolute -top-0.5 -right-0.5
            min-w-[18px] h-[18px] px-1
            flex items-center justify-center
            rounded-full bg-ink text-white
            text-[10px] font-bold leading-none
          "
        >
          {badge > 99 ? "99+" : badge}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} aria-label={label} className={buttonClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={buttonClasses}
    >
      {content}
    </button>
  );
}