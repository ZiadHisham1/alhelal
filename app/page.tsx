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

export default async function HomePage() {
 const products = await fetchProducts();

  return (
    <main className="relative bg-cream-100">
      {/* Fixed navbar above everything */}
      {/* <Navbar /> */}
 
      {/* Layer 0 — sticky hero */}
      <Hero
        image="/img/hero-sofa.jpg"
        alt="أثاث البيت"
        title="اثاث البيت"
        subtitle="اساس البيت"
      />

      {/* Layer 10 — category sheet rises over hero */}
      <CategoryPrompt />

      <ReviewsSection />

      <OffersSection />

      {/* Layer 20 — search sheet rises over category */}
      <SearchSection
        products={products}
        title="اعمل سيرش علي اي منتج او اعمله عمولة"
        ctaLabel="ابحث عن المزيد"
      />

      <FaqSection faqs={faqs} />

      {/* <Footer /> */}
    </main>
  );
}