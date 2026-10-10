// app/contact/page.tsx
import { ContactContent } from "@/components/section/ContactContent";
import { PageHeader } from "@/components/ui/PageHeader";

export default function ContactPage() {
  return (
    <main className="relative bg-cream-100 min-h-screen">
      <div className="py-6 mx-5">
          <PageHeader />
      </div>
      <div>
          <ContactContent />
      </div>
    </main>
  );
}