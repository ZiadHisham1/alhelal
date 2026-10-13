"use client";

import { useCartStore } from "@/lib/cart-store";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
              "flex items-center justify-between gap-2 lg:gap-6",
              "overflow-hidden",
              "border border-white/30",
              "backdrop-blur-sm backdrop-saturate-150 backdrop-brightness-110",
              "transition-all duration-300",
              scrolled
                ? "shadow-[0_12px_32px_rgba(0,0,0,0.22)]"
                : "shadow-glass"
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
                Mobile:  [menu] ........ [LOGO] ........ [cart]
                Desktop: [cart] [links] ... [LOGO]  (logo on visual right)
            ===================================================== */}

            {/* LOGO — first in DOM, so in RTL it sits visually right on desktop */}
            <Link
              href="/"
              aria-label={siteConfig.name}
              className={cn(
                "relative z-[3] flex items-center justify-center",
                "pointer-events-auto select-none shrink-0",
                // Mobile: absolutely centered
                "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                // Desktop: normal flow, right side
                "lg:static lg:translate-x-0 lg:translate-y-0 lg:left-auto lg:top-auto"
              )}
            >
              <Image
                src="/icons/logo.svg"
                alt={siteConfig.name}
                width={120}
                height={36}
                priority
                className="h-12 lg:h-12 w-auto object-contain"
              />
            </Link>

            {/* DESKTOP: nav links (centered, fill the middle) */}
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

            {/* Cart — visual left on desktop */}
            <div className="relative z-[2] flex items-center gap-0.5 lg:gap-1 shrink-0">
              <div className="relative">
                <IconButton
                  icon="cart"
                  label={siteConfig.nav.cart.label}
                  onClick={openDrawer}
                />
                <CartBadge />
              </div>
            </div>

            {/* Hamburger — mobile only (hidden on desktop) */}
            <div className="relative z-[2] flex items-center gap-2 shrink-0 lg:hidden">
              <IconButton
                icon="menu"
                label={siteConfig.nav.menu.label}
                onClick={() => setMobileOpen((v) => !v)}
              />
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile drawer */}
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

/* Mobile drawer — unchanged */
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
          <Image
            src="/icons/logo.svg"
            alt={siteConfig.name}
            width={100}
            height={30}
            className="h-10 w-auto object-contain"
          />
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
                    isActive ? "bg-ink text-white" : "text-ink hover:bg-white"
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