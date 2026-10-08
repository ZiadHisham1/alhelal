"use client";



import { useCartStore } from "@/lib/cart-store";
import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/utils";
import { CartBadge } from "../ui/CartBadge";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  // inside the component:
  const openDrawer = useCartStore((s) => s.openDrawer);
  
  return (
    <>
      <nav
        aria-label="شريط التنقل الرئيسي"
        className={cn(
          "relative w-full max-w-[720px] mx-auto h-[52px]",
          "rounded-glass px-3 sm:px-4",
          "flex items-center justify-between gap-2",
          "overflow-hidden",
          "border border-white/30",
          "backdrop-blur-sm backdrop-saturate-150 backdrop-brightness-110",
          "shadow-glass",
          "rounded-lg"
        )}
        style={{
          background:
            "linear-gradient(145deg, rgba(210,190,170,0.55) 0%, rgba(180,160,140,0.42) 40%, rgba(160,140,120,0.32) 100%)",
        }}
      >
        {/* Top glass reflection */}
        <span
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 right-0 h-[45%] z-[1] rounded-t-glass"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.05) 60%, transparent 100%)",
          }}
        />

        {/* Bottom depth glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-[10%] right-[10%] h-[35%] z-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.14) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* LEFT: hamburger */}
        <IconButton
          icon="menu"
          label={siteConfig.nav.menu.label}
          onClick={() => setMobileOpen((v) => !v)}
          className="relative z-[2]"
        />

        {/* CENTER: brand */}
        <Link
          href="/"
          aria-label={siteConfig.name}
          className="
            relative z-[2] flex items-center gap-1.5
            font-lalezar text-[16px] leading-[25px]
            select-none
          "
        >
          <span
            className="text-ink"
            style={{ textShadow: "0 1px 0 rgba(255,255,255,0.3)" }}
          >
            {siteConfig.brand.primary}
          </span>
          <span
            className="text-[#FFDEDE]"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}
          >
            {siteConfig.brand.secondary}
          </span>
        </Link>

        {/* RIGHT: cart + profile */}
        <div className="relative z-[2] flex items-center gap-0.5">
          <div className="relative">
            <IconButton
              icon="cart"
              label={siteConfig.nav.cart.label}
              onClick={openDrawer}  
            />
            <CartBadge />
          </div>
          <IconButton
            icon="profile"
            label={siteConfig.nav.profile.label}
            href={siteConfig.nav.profile.href}
          />
        </div>
      </nav>

      {/* Mobile menu drawer — functional! */}
      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}

/* --- Mobile drawer --- */
function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const items = [
    { label: "الرئيسية", href: "/" },
    { label: "الأقسام", href: "/collection" },
    { label: "من نحن", href: "/about-us" },
    { label: "تواصل معنا", href: "/contact-us" },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm",
          "transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-[78%] max-w-[320px]",
          "bg-cream-50 shadow-2xl",
          "transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-5 border-b border-black/5">
          <span className="font-lalezar text-xl text-ink">
            {siteConfig.name}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق القائمة"
            className="w-9 h-9 rounded-full hover:bg-black/5 grid place-items-center text-ink text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <ul className="p-3 space-y-1">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onClose}
                className="
                  block px-4 py-3 rounded-xl
                  font-lalezar text-lg text-ink
                  hover:bg-white transition-colors
                "
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}