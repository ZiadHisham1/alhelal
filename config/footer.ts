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
        value: "+20 100 949 7841",
        href: "tel:+201009497841",
      },
      {
        icon: "mail",
        label: "البريد",
        value: "alhelal.furniture@gmail.com",
        href: "mailto:alhelal.furniture@gmail.com",
      },
      {
        icon: "pin",
        label: "العنوان",
        value: "القاهرة الجديدة، مصر",
        href: "https://www.google.com/maps/place/30%C2%B008'17.2%22N+31%C2%B021'59.8%22E/@30.1381186,31.3640425,17z/data=!3m1!4b1!4m4!3m3!8m2!3d30.1381186!4d31.3666174?hl=en&entry=ttu&g_ep=EgoyMDI2MTAwNy4wIKXMDSoASAFQAw%3D%3Dt",
      },
    ] satisfies ContactItem[],
  },

  columns: [
    {
      title: "تسوق",
      links: [
        { label: "كل المنتجات", href: "/collection" },
        { label: "كنب وصوفا", href: "/collection" },
        { label: "غرف نوم", href: "/collection" },
        { label: "غرف معيشة", href: "/collection" },
        { label: "العروض", href: "/contact-us" },
      ],
    },
    {
      title: "الشركة",
      links: [
        { label: "من نحن", href: "/about-us" },
        { label: "تواصل نعنا", href: "/contact-us" },
        // { label: "الوظائف", href: "/careers" },
        // { label: "الشركاء", href: "/partners" },
      ],
    },
    {
      title: "المساعدة",
      links: [
        { label: "اتصل بنا", href: "/contact-us" },
        // { label: "الشحن والتوصيل", href: "/shipping" },
        // { label: "الإرجاع والاستبدال", href: "/returns" },
        { label: "الأسئلة الشائعة", href: "/faq" },
        // { label: "سياسة الخصوصية", href: "/privacy" },
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
      href: "https://wa.me/201009497841",
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