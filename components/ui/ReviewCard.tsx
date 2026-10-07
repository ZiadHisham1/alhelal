import Image from "next/image";
import { cn } from "@/lib/utils";

export interface Review {
  name: string;
  role?: string;
  avatar: string;
  rating: number; // 1–5
  text: string;
}

interface ReviewCardProps extends Review {
  className?: string;
}

export function ReviewCard({
  name,
  role,
  avatar,
  rating,
  text,
  className,
}: ReviewCardProps) {
  return (
    <article
      className={cn(
        "w-full bg-white",
        "rounded-[28px]",
        "p-5 sm:p-6",
        "shadow-card",
        className
      )}
      dir="rtl"
    >
      {/* Header: avatar + name + stars */}
      <header className="flex items-center gap-3">
        {/* Avatar */}
        <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-cream-200">
          <Image
            src={avatar}
            alt={name}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>

        {/* Name + role */}
        <div className="flex-1 min-w-0">
          <h3 className="font-lalezar text-lg text-ink leading-tight truncate">
            {name}
          </h3>
          {role && (
            <p className="text-xs text-ink/55 truncate">{role}</p>
          )}
        </div>

        {/* Stars */}
        <Stars value={rating} />
      </header>

      {/* Divider */}
      <div className="my-4 h-px bg-ink/8" />

      {/* Review text */}
      <p className="font-lalezar text-base sm:text-lg text-ink/85 leading-relaxed">
        {text}
      </p>
    </article>
  );
}

/* -------------------- Stars -------------------- */
function Stars({ value }: { value: number }) {
  const clamped = Math.max(0, Math.min(5, Math.round(value)));

  return (
    <div
      className="flex items-center gap-0.5 shrink-0"
      aria-label={`تقييم ${clamped} من 5`}
      role="img"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} filled={i < clamped} />
      ))}
    </div>
  );
}

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className="w-4 h-4"
      fill={filled ? "#E8B23A" : "none"}
      stroke="#E8B23A"
      strokeWidth={1.5}
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M10 2.5l2.35 4.76 5.25.76-3.8 3.7.9 5.23L10 14.47 5.3 16.95l.9-5.23-3.8-3.7 5.25-.76L10 2.5z" />
    </svg>
  );
}