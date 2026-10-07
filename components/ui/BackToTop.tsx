"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="الرجوع إلى الأعلى"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "flex items-center justify-center",
        "w-10 h-10 rounded-full",
        "bg-white/5 ring-1 ring-white/10 text-white/80",
        "hover:bg-white/10 hover:text-white",
        "transition-all duration-300",
        visible ? "opacity-100 scale-100" : "opacity-40 scale-95"
      )}
    >
      <svg
        viewBox="0 0 20 20"
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M6 12l4-4 4 4" />
      </svg>
    </button>
  );
}