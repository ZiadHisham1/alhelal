// components/section/FaqSection.tsx
import FaqList from "@/components/ui/FaqItem";
import type { Faq } from "@/components/ui/FaqItem";

interface FaqSectionProps {
  faqs: Faq[];
}

export default function FaqSection({ faqs }: FaqSectionProps) {
  if (!faqs?.length) return null;

  return (
    <section className="w-full relative z-50 bg-cream-100 pt-10 pb-20 lg:py-24">
      <div className="mx-auto max-w-[720px] lg:max-w-[900px] px-4 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <p className="font-lalezar text-sm text-ink/50">
            الأسئلة الشائعة
          </p>
          <h2 className="mt-3 font-lalezar text-2xl sm:text-3xl lg:text-4xl text-ink">
            عندك سؤال؟{" "}
            <span className="text-[#2B1F17]">عندنا إجابة</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-lalezar text-sm lg:text-base text-ink/60">
            كل اللي محتاج تعرفه قبل ما تبدأ معانا. لو مش لاقي إجابة لسؤالك،
            كلمنا على واتساب وهنرد عليك في أقرب وقت.
          </p>
        </div>

        {/* Accordion */}
        <FaqList faqs={faqs} />
      </div>
    </section>
  );
}