"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { footerConfig } from "@/config/footer";

const { newsletter } = footerConfig;

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      // 🔌 replace with: await fetch("/api/newsletter", { method: "POST", body: JSON.stringify({ email }) })
      await new Promise((r) => setTimeout(r, 700));
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2500);
    }
  }

  return (
    <div className={cn("w-full", className)}>
      <h3 className="font-lalezar text-lg text-white text-right">
        {newsletter.title}
      </h3>
      <p className="mt-1 text-sm text-white/55 text-right">
        {newsletter.subtitle}
      </p>

      <form
        onSubmit={onSubmit}
        className="
          mt-4 flex items-center gap-2
          bg-white/5 ring-1 ring-white/10
          rounded-full p-1 pr-4
          focus-within:ring-white/25
          transition
        "
        dir="rtl"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={newsletter.placeholder}
          disabled={status === "loading"}
          className="
            flex-1 bg-transparent outline-none
            font-lalezar text-base text-white
            placeholder:text-white/40
            py-2.5
          "
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="
            shrink-0 h-10 px-5 rounded-full
            bg-white text-black font-lalezar text-base
            hover:bg-white/90 active:scale-[0.98]
            disabled:opacity-60 disabled:cursor-not-allowed
            transition
          "
        >
          {status === "loading" ? "..." : newsletter.cta}
        </button>
      </form>

      {/* Feedback */}
      <p
        aria-live="polite"
        className={cn(
          "mt-2 text-xs text-right h-4 transition-opacity",
          status === "success" && "text-emerald-400 opacity-100",
          status === "error" && "text-red-400 opacity-100",
          (status === "idle" || status === "loading") && "opacity-0"
        )}
      >
        {status === "success"
          ? newsletter.successMessage
          : status === "error"
          ? newsletter.errorMessage
          : ""}
      </p>
    </div>
  );
}