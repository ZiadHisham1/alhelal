export const siteConfig = {
  name: "الهلال فيرنتشر",
  brand: {
    primary: "الهلال",
    secondary: "فيرنتشر",
  },
  nav: {
    menu: { label: "القائمة", href: "/menu", icon: "menu" },
    cart: { label: "سلة التسوق", href: "/cart", icon: "cart" },
    profile: { label: "الملف الشخصي", href: "/profile", icon: "profile" },
    search: { label: "البحث", href: "/search", icon: "search" },
    arrow: { label: "المزيد", href: "/more", icon: "arrow" },

    links: [
      { label: "الرئيسية", href: "/" },
      { label: "المجموعة", href: "/collection" },
      { label: "من نحن", href: "/about-us" },
      { label: "اتصل بنا", href: "/contact-us" },
    ],
  },
} as const;

const iconNavKeys = ["menu", "cart", "profile", "search", "arrow"] as const;

export type IconName =
  (typeof siteConfig.nav)[(typeof iconNavKeys)[number]]["icon"];