export const siteConfig = {
  name: "الهلال فيرنتشر",
  brand: {
    primary: "الهلال",
    secondary: "فيرنتشر",
  },
  nav: {
    // Icon buttons
    menu: { label: "القائمة", href: "/menu", icon: "menu" },
    cart: { label: "سلة التسوق", href: "/cart", icon: "cart" },
    profile: { label: "الملف الشخصي", href: "/profile", icon: "profile" },
    search: { label: "البحث", href: "/search", icon: "search" },
    arrow: { label: "المزيد", href: "/more", icon: "arrow" },

    // 👇 NEW — desktop nav links
    links: [
      { label: "الرئيسية", href: "/" },
      { label: "المجموعة", href: "/collection" },
      { label: "من نحن", href: "/about-us" },
      { label: "اتصل بنا", href: "/contact-us" },
    ],
  },
} as const;

export type IconName = keyof typeof siteConfig.nav extends never
  ? never
  : (typeof siteConfig.nav)[keyof typeof siteConfig.nav]["icon"];