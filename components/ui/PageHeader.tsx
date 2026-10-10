// components/ui/PageHeader.tsx
"use client";

import { useRouter } from "next/navigation";

interface PageHeaderProps {
  /** Optional page title shown below the back button */
  title?: string;
  /** Where to go if there's no history (default: home) */
  fallbackHref?: string;
  /** Optional extra actions on the left side */
  children?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  fallbackHref = "/",
  children,
  className,
}: PageHeaderProps) {
  const router = useRouter();

  function handleBack() {
    // If the user came from another page, go back.
    // Otherwise, fall back to a known route.
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  }

  return (
    <header className={className ?? "mb-6"}>
      <div className="flex items-center justify-between gap-3">
        {/* Back button — RTL: arrow points right (forward in Arabic) */}
        <button
          type="button"
          onClick={handleBack}
          aria-label="رجوع"
          className="
            inline-flex items-center gap-1.5
            h-10 px-4 rounded-full
            bg-white/70 hover:bg-white
            ring-1 ring-ink/10
            font-lalezar text-sm text-ink
            transition
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30
          "
        >
          <svg
            viewBox="0 0 20 20"
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            {/* Chevron pointing right (RTL "back") */}
            <path d="M12 5l-5 5 5 5" />
          </svg>
          <span>رجوع</span>
        </button>

        {/* Slot for extra actions (e.g., filters, share) */}
        <div className="flex items-center gap-2">{children}</div>
      </div>

      {/* Optional page title */}
      {title && (
        <h1 className="mt-5 font-lalezar text-2xl sm:text-3xl text-ink text-center">
          {title}
        </h1>
      )}
    </header>
  );
}