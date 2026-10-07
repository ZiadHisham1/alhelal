export interface SocialLink {
  icon: "facebook" | "instagram" | "tiktok" | "whatsapp";
  label: string;
  href: string;
  /** Brand color used for hover glow */
  color: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface ContactItem {
  icon: "phone" | "mail" | "pin";
  label: string;
  value: string;
  href?: string;
}

export const footerConfig = {
  brand: {
    primary: "الهلال",
    secondary: "فيرنتشر",
    tagline: "أثاث البيت أساس البيت — جودة تدوم، تصميم يليق بيك.",
  },

  newsletter: {
    title: "اشترك في النشرة",
    subtitle: "كن أول من يعرف عن العروض والمنتجات الجديدة.",
    placeholder: "بريدك الإلكتروني",
    cta: "اشترك",
    successMessage: "تم الاشتراك بنجاح ✓",
    errorMessage: "حدث خطأ، حاول مرة أخرى",
  },

  contact: {
    title: "تواصل معنا",
    items: [
      {
        icon: "phone",
        label: "الهاتف",
        value: "+20 100 000 0000",
        href: "tel:+201000000000",
      },
      {
        icon: "mail",
        label: "البريد",
        value: "hello@hilal-venture.com",
        href: "mailto:hello@hilal-venture.com",
      },
      {
        icon: "pin",
        label: "العنوان",
        value: "القاهرة الجديدة، مصر",
        href: "https://maps.google.com/?q=New+Cairo+Egypt",
      },
    ] satisfies ContactItem[],
  },

  columns: [
    {
      title: "تسوق",
      links: [
        { label: "كل المنتجات", href: "/shop" },
        { label: "كنب وصوفا", href: "/category/sofas" },
        { label: "غرف نوم", href: "/category/bedrooms" },
        { label: "غرف معيشة", href: "/category/living" },
        { label: "العروض", href: "/offers" },
      ],
    },
    {
      title: "الشركة",
      links: [
        { label: "من نحن", href: "/about" },
        { label: "المدونة", href: "/blog" },
        { label: "الوظائف", href: "/careers" },
        { label: "الشركاء", href: "/partners" },
      ],
    },
    {
      title: "المساعدة",
      links: [
        { label: "اتصل بنا", href: "/contact" },
        { label: "الشحن والتوصيل", href: "/shipping" },
        { label: "الإرجاع والاستبدال", href: "/returns" },
        { label: "الأسئلة الشائعة", href: "/faq" },
        { label: "سياسة الخصوصية", href: "/privacy" },
      ],
    },
  ] satisfies FooterColumn[],

  socials: [
    {
      icon: "facebook",
      label: "فيسبوك",
      href: "https://facebook.com/",
      color: "#1877F2",
    },
    {
      icon: "instagram",
      label: "إنستجرام",
      href: "https://instagram.com/",
      color: "#E1306C",
    },
    {
      icon: "tiktok",
      label: "تيك توك",
      href: "https://tiktok.com/",
      color: "#25F4EE",
    },
    {
      icon: "whatsapp",
      label: "واتساب",
      href: "https://wa.me/201000000000",
      color: "#25D366",
    },
  ] satisfies SocialLink[],

  payments: [
    { label: "Visa", brand: "visa" as const },
    { label: "Mastercard", brand: "mastercard" as const },
    { label: "Meeza", brand: "meeza" as const },
    { label: "الدفع عند الاستلام", brand: "cod" as const },
  ],

  bottomLinks: [
    { label: "الشروط", href: "/terms" },
    { label: "الخصوصية", href: "/privacy" },
    { label: "الكوكيز", href: "/cookies" },
  ],

  copyright: `© ${new Date().getFullYear()} الهلال فيرنتشر. جميع الحقوق محفوظة.`,
};