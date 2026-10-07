"use client";

import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      aria-label="رجوع"
      className="
        inline-flex items-center gap-1
        h-10 px-3 rounded-full
        bg-white/70 hover:bg-white
        ring-1 ring-ink/10
        font-lalezar text-sm text-ink
        transition
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
        <path d="M8 5l5 5-5 5" />
      </svg>
      <span>رجوع</span>
    </button>
  );
}