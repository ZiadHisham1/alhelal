"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav
      aria-label="شريط التنقل الرئيسي"
      className="
        fixed w-full max-w-[720px] h-[52px] mx-auto
        rounded-[10px] px-4
        flex items-center justify-between
        overflow-hidden
        border border-white/25
        backdrop-blur-sm backdrop-saturate-[-10] backdrop-brightness-110
        shadow-[0_8px_24px_rgba(0,0,0,0.35),0_2px_6px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.35),inset_0_-1px_1px_rgba(0,0,0,0.08)]
      "
      style={{
        background:
          "linear-gradient(145deg, rgba(210,190,170,0.45) 0%, rgba(180,160,140,0.35) 40%, rgba(160,140,120,0.25) 100%)",
      }}
    >
      {/* Reflection (top glass highlight) */}
      <span
        aria-hidden
        className="
          pointer-events-none absolute top-0 left-0 right-0 h-[45%] z-[1]
          rounded-t-[10px]
        "
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.05) 60%, transparent 100%)",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        }}
      />

      {/* Depth (soft bottom shadow inside) */}
      <span
        aria-hidden
        className="
          pointer-events-none absolute bottom-0 left-[10%] right-[10%] h-[35%] z-0
        "
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.12) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

      {/* 1. Hamburger Menu (left) */}
      <button
        type="button"
        aria-label="القائمة"
        className="
          relative z-[2] flex items-center justify-center
          w-9 h-9 rounded-full shrink-0
          transition-colors duration-200
          hover:bg-white/10
        "
      >
        <Image
          src="/icons/menu.svg"
          alt="القائمة"
          width={24}
          height={24}
        />
      </button>

      {/* 2. Brand (center) */}
      <div
        className="
          relative z-[2] flex items-center gap-1.5
          font-[family-name:var(--font-lalezar)]
          text-[16px] leading-[25px]
          select-none
        "
      >
        <span
          className="text-black"
          style={{ textShadow: "0 1px 0 rgba(255,255,255,0.25)" }}
        >
          الهلال
        </span>
        <span
          className="text-[#FFDEDE]"
          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.15)" }}
        >
          فيرنتشر
        </span>
      </div>

      {/* 3. Right Group: Cart + Profile */}
      <div className="relative z-[2] flex items-center gap-1.5">
        {/* Cart */}
        <button
          type="button"
          aria-label="سلة التسوق"
          className="
            flex items-center justify-center
            w-9 h-9 rounded-full
            transition-colors duration-200
            hover:bg-white/10
          "
        >
          <Image
            src="/icons/cart.svg"
            alt="سلة التسوق"
            width={24}
            height={24}
          />
        </button>

        {/* Profile */}
        <button
          type="button"
          aria-label="الملف الشخصي"
          className="
            flex items-center justify-center
            w-9 h-9 rounded-full
            transition-colors duration-200
            hover:bg-white/10
          "
        >
         <Image
            src="/icons/profile.svg"
            alt="الملف الشخصي"
            width={24}
            height={24}
          />
        </button>
      </div>
    </nav>
  );
}