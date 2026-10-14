import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/section/Hero";
import { CategoryPrompt } from "@/components/section/CategoryPrompt";
import { SearchSection } from "@/components/section/SearchSection";
import { OffersSection } from "@/components/section/OffersSection";
import { ReviewsSection } from "@/components/section/ReviewSection";
import { Footer } from "@/components/layout/Footer";
import { fetchProducts } from "@/lib/product-server";
import FaqSection from "@/components/section/FaqSection";
import { faqs } from "@/data/faq";

/**
 * The dynamic part — fetches products on every request.
 * Wrapped in <Suspense> below so the rest of the page renders instantly.
 */
async function SearchSheet() {
  const products = await fetchProducts();

  return (
    <SearchSection
      products={products}
      title="اعمل سيرش علي اي منتج او اعمله عمولة"
      ctaLabel="ابحث عن المزيد"
    />
  );
}

/**
 * Static shell. Renders immediately on the CDN;
 * the products stream in via <Suspense>.
 */
export default function HomePage() {
  return (
    <main className="relative bg-cream-100">
      {/* Fixed navbar above everything */}
      {/* <Navbar /> */}

      {/* Layer 0 — sticky hero */}
      <Hero
          video="/videos/hero.mp4"
          image="/img/hero-sofa.jpg"    // poster + fallback
          alt="أثاث البيت"
          title="اثاث البيت"
          subtitle="اساس البيت"
      />

      {/* Layer 10 — category sheet rises over hero */}
      <CategoryPrompt />

      <ReviewsSection />

      <OffersSection />

      {/* Layer 20 — search sheet, fresh products every visit */}
      <Suspense
        fallback={
          <div className="py-12 text-center text-ink/50 font-lalezar">
            جاري تحميل المنتجات...
          </div>
        }
      >
        <SearchSheet />
      </Suspense>

      <FaqSection faqs={faqs} />

      {/* <Footer /> */}
    </main>
  );
}