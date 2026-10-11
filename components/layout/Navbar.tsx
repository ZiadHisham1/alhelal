"use client";

import { useCartStore } from "@/lib/cart-store";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/utils";
import { CartBadge } from "../ui/CartBadge";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const openDrawer = useCartStore((s) => s.openDrawer);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="fixed top-3 inset-x-0 z-60 px-3 sm:px-6 pointer-events-none">
        <div className="mx-auto w-full max-w-[720px] lg:max-w-[1100px] pointer-events-auto">
          <nav
            aria-label="شريط التنقل الرئيسي"
            className={cn(
              "relative h-[52px] lg:h-[60px]",
              "rounded-2xl lg:rounded-glass",
              "px-3 sm:px-4 lg:px-6",
              "flex items-center justify-between lg:justify-start gap-2 lg:gap-6",
              "overflow-hidden",
              "border border-white/30",
              "backdrop-blur-sm backdrop-saturate-150 backdrop-brightness-110",
              "transition-all duration-300",
              scrolled ? "shadow-[0_12px_32px_rgba(0,0,0,0.22)]" : "shadow-glass"
            )}
            style={{
              background:
                "linear-gradient(145deg, rgba(210,190,170,0.55) 0%, rgba(180,160,140,0.42) 40%, rgba(160,140,120,0.32) 100%)",
            }}
          >
            {/* Glass reflections */}
            <span
              aria-hidden
              className="pointer-events-none absolute top-0 left-0 right-0 h-[45%] z-[1] rounded-t-glass"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.05) 60%, transparent 100%)",
              }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-0 left-[10%] right-[10%] h-[35%] z-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(0,0,0,0.14) 0%, transparent 70%)",
                borderRadius: "50%",
              }}
            />

            {/* =====================================================
                RTL LAYOUT
                Visual:        [icons] ......... [links] ......... [brand] [menu]
                DOM order (RTL reverses):  icons → links → brand+menu
                In RTL, the FIRST DOM element appears on the RIGHT.
            ===================================================== */}

            {/* RIGHT (visually) — brand + hamburger */}
            <div className="relative z-[2] flex items-center gap-2 lg:gap-3 shrink-0">
              {/* Hamburger — mobile only */}
              <IconButton
                icon="menu"
                label={siteConfig.nav.menu.label}
                onClick={() => setMobileOpen((v) => !v)}
                className="lg:hidden"
              />

              {/* Brand */}
              <Link
                href="/"
                aria-label={siteConfig.name}
                className="
                  relative flex items-center gap-1.5
                  font-lalezar text-[16px] lg:text-[18px]
                  leading-[25px]
                  select-none shrink-0
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
            </div>

            {/* CENTER — desktop nav links */}
            <ul className="hidden lg:flex flex-1 items-center justify-center gap-1">
              {siteConfig.nav.links?.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "relative px-4 py-2 rounded-full whitespace-nowrap",
                        "font-lalezar text-[15px]",
                        "transition-all duration-200",
                        isActive
                          ? "text-ink bg-white/40 shadow-inner"
                          : "text-ink/75 hover:text-ink hover:bg-white/25"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* LEFT (visually) — cart + profile */}
            <div className="relative z-[2] flex items-center gap-0.5 lg:gap-1 shrink-0 lg:flex-1 lg:justify-end">
              <div className="relative">
                <IconButton
                  icon="cart"
                  label={siteConfig.nav.cart.label}
                  onClick={openDrawer}
                />
                <CartBadge />
              </div>
              {/* <IconButton
                icon="profile"
                label={siteConfig.nav.profile.label}
                href={siteConfig.nav.profile.href}
              /> */}
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile drawer */}
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

/* ============================================================
   Mobile drawer
   ============================================================ */
function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  const items = [
    { label: "الرئيسية", href: "/" },
    { label: "الأقسام", href: "/collection" },
    { label: "من نحن", href: "/about-us" },
    { label: "تواصل معنا", href: "/contact-us" },
    { label: "تتبع طلبك", href: "/orders/lookup" },
  ];

  return (
    <>
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden",
          "transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={cn(
          "fixed top-0 right-0 z-65 h-full w-[80%] max-w-[340px] lg:hidden",
          "bg-cream-50 shadow-2xl flex flex-col",
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

        <ul className="flex-1 p-3 space-y-1 overflow-y-auto">
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "block px-4 py-3 rounded-xl",
                    "font-lalezar text-lg transition-colors",
                    isActive
                      ? "bg-ink text-white"
                      : "text-ink hover:bg-white"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="p-5 border-t border-black/5">
          <p className="text-xs text-ink/50 text-center font-lalezar">
            © 2026 {siteConfig.name}
          </p>
        </div>
      </aside>
    </>
  );
} 