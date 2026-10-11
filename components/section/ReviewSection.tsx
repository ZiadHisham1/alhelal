import { Sheet } from "./Sheet";
import { ReviewCard, type Review } from "@/components/ui/ReviewCard";

const reviews: Review[] = [
  {
    name: "سارة أحمد",
    role: "عميلة دائمة",
    avatar: "/images/avatars/sara.jpg",
    rating: 5,
    text: "الجودة فوق الوصف، الكنبة وصلت أسرع من المتوقع واللون زي الصور بالظبط. تجربة شراء مريحة جداً وأنصح بيهم أي حد بيدور على أثاث محترم.",
  },
  {
    name: "محمد عبد الله",
    role: "تم الشراء منذ أسبوع",
    avatar: "/images/avatars/mohamed.jpg",
    rating: 4,
    text: "خدمة العملاء متعاونة جداً، ساعدوني اختار المقاس المناسب للصالون. التركيب كان سريع والتغليف ممتاز.",
  },
  {
    name: "منى خالد",
    role: "عرسان جديدة",
    avatar: "/images/avatars/mona.jpg",
    rating: 5,
    text: "اشتريت عرض العرسان وكان اختيار موفق بجد. كل حاجة في البيت بقت منسقة والأسعار كانت أفضل من محلات تانية.",
  },
  {
    name: "أحمد سمير",
    role: "عميل",
    avatar: "/images/avatars/ahmed.jpg",
    rating: 5,
    text: "أثاث متين وخامات نضيفة. تعاملت معاهم مرتين وكل مرة الخدمة تكون بنفس المستوى. يستحقوا التقييم الكامل.",
  },
];

export function ReviewsSection() {
  return (
    <Sheet layer={20} pin={false}>
      <h2 className="font-lalezar text-2xl sm:text-3xl text-ink text-center mb-8">
        آراء عملائنا
      </h2>

      {/* Mobile: horizontal snap scroll — desktop: vertical stack or grid */}
      <div
        className="
          flex gap-4 overflow-x-auto snap-x snap-mandatory
          pb-4 -mx-4 px-4
          sm:mx-0 sm:px-0
          sm:grid sm:grid-cols-1 lg:grid-cols-2 sm:gap-5
          sm:overflow-visible
          scrollbar-hide
        "
      >
        {reviews.map((r) => (
          <ReviewCard
            key={r.name}
            {...r}
            className="snap-start shrink-0 w-[85%] sm:w-auto"
          />
        ))}
      </div>
    </Sheet>
  );
}

export const ReviewSection = ReviewsSection;