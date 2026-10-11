// app/about/page.tsx
import { AboutContent } from "@/components/section/AboutContent";
import { PageHeader } from "@/components/ui/PageHeader";

export default function AboutPage() {
  return (
    <main className="relative bg-cream-100 pt-15 min-h-screen">
    <div className="py-6 mx-5">
      <PageHeader />
    </div>
      <AboutContent />
    </main>
  );
}