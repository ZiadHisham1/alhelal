import { cn } from "./../../lib/utils";

type IconName = "menu" | "cart" | "profile" | "search" | "arrow";

interface SvgIconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export function SvgIcon({ name, size = 26, className }: SvgIconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/icons/${name}.svg`}
      alt=""
      width={size}
      height={size}
      draggable={false}
      className={cn("select-none pointer-events-none", className)}
      aria-hidden="true"
    />
  );
}