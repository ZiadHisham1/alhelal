// components/ui/FaqList.tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface Faq {
  _id: string;
  question: string;
  answer: string;
}

interface FaqListProps {
  faqs: Faq[];
}

export default function FaqList({ faqs }: FaqListProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?._id ?? null);

  const toggle = (id: string) =>
    setOpenId((cur) => (cur === id ? null : id));

  return (
    <div
      className="
        mt-10 lg:mt-14
        divide-y divide-ink/5
        overflow-hidden rounded-[22px]
        bg-white
        shadow-[0_4px_20px_rgba(0,0,0,0.06)]
        ring-1 ring-ink/5
      "
    >
      {faqs.map((faq) => {
        const isOpen = openId === faq._id;

        return (
          <div key={faq._id}>
            {/* Question row */}
            <button
              type="button"
              onClick={() => toggle(faq._id)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${faq._id}`}
              id={`faq-${faq._id}`}
              className={cn(
                "flex w-full items-center justify-between gap-4",
                "px-5 py-4 text-right lg:px-8 lg:py-6",
                "transition-colors duration-200",
                "hover:bg-cream-100/60",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-inset",
                isOpen ? "bg-cream-100/40" : ""
              )}
            >
              {/* Question text */}
              <span
                className={cn(
                  "flex-1 font-lalezar text-base lg:text-lg leading-snug",
                  isOpen ? "text-ink" : "text-ink/85"
                )}
              >
                {faq.question}
              </span>

              {/* Plus / rotate icon */}
              <span
                aria-hidden
                className={cn(
                  "flex h-8 w-8 lg:h-9 lg:w-9 shrink-0 items-center justify-center",
                  "rounded-full",
                  "bg-[#2B1F17] text-white",
                  "transition-transform duration-300 ease-out",
                  isOpen ? "rotate-45" : "rotate-0"
                )}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>

            {/* Answer panel — animated height */}
            <div
              id={`faq-panel-${faq._id}`}
              role="region"
              aria-labelledby={`faq-${faq._id}`}
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p
                  className="
                    px-5 pb-5 lg:px-8 lg:pb-7
                    font-lalezar text-sm lg:text-base
                    text-ink/70 leading-relaxed
                  "
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}