export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  title: string;
  subtitle?: string;
  brand?: string;
  image: string;
  /** Multiple images for the gallery */
  images?: string[];
  href: string;
  categories: string[];
  price: number;
  /** Old price for "was/now" display */
  oldPrice?: number;
  isNew?: boolean;
  onSale?: boolean;
  /** Short marketing description */
  description?: string;
  /** Detail bullet list */
  specs?: ProductSpec[];
  /** Highlights row (icons + text) */
  highlights?: string[];
  /** Optional stock — undefined = available */
  inStock?: boolean;
}

export const allProducts: Product[] = [
  {
    id: "brown-sofa",
    title: "كنبة",
    subtitle: "اتركيه",
    brand: "Al-Hilal Originals",
    image: "/img/sofa-brown.jpg",
    images: [
      "/img/sofa-brown.jpg",
      "/img/sofa-brown-2.jpg",
      "/img/sofa-brown-3.jpg",
    ],
    href: "/product/brown-sofa",
    categories: ["sofas", "living"],
    price: 8500,
    oldPrice: 10500,
    isNew: true,
    onSale: true,
    inStock: true,
    description:
      "كنبة بثلاث مقاعد بقماش مخملي فاخر، هيكل خشبي متين، وإسفنج عالي الكثافة يحافظ على شكله مع الاستخدام اليومي. مثالية لغرفة المعيشة العصرية.",
    highlights: [
      "قماش مقاوم للبقع",
      "هيكل خشب زان طبيعي",
      "ضمان 3 سنوات",
      "توصيل وتركيب مجاني",
    ],
    specs: [
      { label: "الأبعاد", value: "220 × 95 × 85 سم" },
      { label: "المادة", value: "خشب زان + قماش مخمل" },
      { label: "اللون", value: "بني كرمل" },
      { label: "الوزن", value: "68 كجم" },
      { label: "بلد المنشأ", value: "مصر" },
    ],
  },
  {
    id: "dakar-xl",
    title: "كنبة",
    subtitle: "سرير",
    brand: "DAKAR XL · sofa",
    image: "/img/sofa-gray.jpg",
    images: ["/img/sofa-gray.jpg", "/img/sofa-gray-2.jpg"],
    href: "/product/dakar-xl",
    categories: ["sofas", "living"],
    price: 12500,
    inStock: true,
    description:
      "كنبة DAKAR XL بتصميم مودرن واسع، تتحول لسرير للنوم، مثالية للاستخدام اليومي وللاستقبال.",
    highlights: ["سرير قابل للسحب", "قماش كتان", "هيكل معدني مقوى"],
    specs: [
      { label: "الأبعاد", value: "260 × 110 × 85 سم" },
      { label: "المادة", value: "قماش كتان + معدن" },
      { label: "اللون", value: "رمادي فاتح" },
    ],
  },
  {
    id: "lazy-boy",
    title: "lazy",
    subtitle: "boy",
    brand: "Comfort Line",
    image: "/img/lazyboy.jpg",
    images: ["/img/lazyboy.jpg", "/img/lazyboy-2.jpg"],
    href: "/product/lazy-boy",
    categories: ["recliners", "living"],
    price: 6800,
    onSale: true,
    inStock: true,
    description:
      "كرسي استرخاء بآلية تمدد يدوية، مسند رأس قابل للتعديل، وحشوة ناعمة للاسترخاء.",
    highlights: ["وضع استرخاء 3 درجات", "مسند رأس متحرك", "قماش قابل للفك والغسل"],
    specs: [
      { label: "الأبعاد", value: "95 × 90 × 105 سم" },
      { label: "المادة", value: "جلد صناعي عالي الجودة" },
      { label: "اللون", value: "رمادي داكن" },
    ],
  },
  {
    id: "bedroom-classic",
    title: "غرف",
    subtitle: "نوم",
    brand: "Nile Collection",
    image: "/img/bedroom.jpg",
    images: ["/img/bedroom.jpg", "/img/bedroom-2.jpg"],
    href: "/product/bedroom",
    categories: ["bedrooms"],
    price: 15000,
    inStock: true,
    description:
      "غرفة نوم كاملة بتصميم كلاسيكي راقٍ، تشمل سرير ودولاب وتسريحة، بخامات خشبية عالية الجودة.",
    highlights: ["غرفة كاملة 5 قطع", "خشب MDF درجة أولى", "دهان صديق للبيئة"],
    specs: [
      { label: "مقاس السرير", value: "180 × 200 سم" },
      { label: "عدد القطع", value: "5 قطع" },
      { label: "المادة", value: "خشب MDF + قشرة خشبية" },
    ],
  },
  {
    id: "modern-sofa",
    title: "كنبة",
    subtitle: "مودرن",
    brand: "Al-Hilal Originals",
    image: "/img/sofa-beige.jpg",
    images: ["/img/sofa-beige.jpg", "/img/sofa-beige-2.jpg"],
    href: "/product/modern-sofa",
    categories: ["sofas", "living"],
    price: 9200,
    isNew: true,
    inStock: true,
    description:
      "كنبة مودرن بألوان هادئة، خطوط نظيفة، وتفاصيل مخملية ناعمة تناسب المساحات العصرية.",
    highlights: ["تصميم إسكندنافي", "قماش بوكليه", "أرجل خشبية"],
    specs: [
      { label: "الأبعاد", value: "210 × 90 × 80 سم" },
      { label: "المادة", value: "قماش بوكليه" },
      { label: "اللون", value: "بيج" },
    ],
  },
  {
    id: "recliner-luxury",
    title: "كرسي",
    subtitle: "استرخاء",
    brand: "Comfort Line",
    image: "/img/recliner.jpg",
    images: ["/img/recliner.jpg"],
    href: "/product/recliner-luxury",
    categories: ["recliners", "living"],
    price: 5400,
    inStock: false,
    description:
      "كرسي استرخاء فاخر بآلية كهربائية، تحكم في الوضعيات، وإضاءة LED خفيفة أسفل الكرسي.",
    highlights: ["آلية كهربائية", "شحن USB مدمج", "جلد طبيعي"],
    specs: [
      { label: "الأبعاد", value: "100 × 95 × 108 سم" },
      { label: "المادة", value: "جلد طبيعي" },
      { label: "اللون", value: "بني" },
    ],
  },
];

/** Helper: get a product by slug, safely */
export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.id === slug);
}

/** Helper: related products (same category, exclude current) */
export function getRelatedProducts(slug: string, limit = 3): Product[] {
  const current = getProductBySlug(slug);
  if (!current) return [];
  return allProducts
    .filter(
      (p) =>
        p.id !== current.id &&
        p.categories.some((c) => current.categories.includes(c))
    )
    .slice(0, limit);
}

export const categories = [
  { id: "all", label: "الكل" },
  { id: "sofas", label: "كنب" },
  { id: "bedrooms", label: "غرف نوم" },
  { id: "living", label: "غرف معيشة" },
  { id: "recliners", label: "كراسي استرخاء" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];