import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/section/Hero";
import { CategoryPrompt } from "@/components/section/CategoryPrompt";
import { SearchSection } from "@/components/section/SearchSection";
import { OffersSection } from "@/components/section/OffersSection";
import { ReviewsSection } from "@/components/section/ReviewSection";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <main className="relative bg-cream-100">
      {/* Fixed navbar above everything */}
      <div className="fixed top-3 inset-x-0 z-50 px-3 pointer-events-none">
        <div className="pointer-events-auto">
          <Navbar />
        </div>
      </div>

      {/* Layer 0 — sticky hero */}
      <Hero
        image="/img/hero-sofa.jpg"
        alt="أثاث البيت"
        title="اثاث البيت"
        subtitle="اساس البيت"
      />

      {/* Layer 10 — category sheet rises over hero */}
      <CategoryPrompt />

      {/* Layer 20 — search sheet rises over category */}
      <SearchSection
        title="اعمل سيرش علي اي منتج"
        ctaLabel="ابحث عن المزيد"
      />

      <OffersSection />

      <ReviewsSection />

      <Footer />
    </main>
  );
}