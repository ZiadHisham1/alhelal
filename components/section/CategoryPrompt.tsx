import { CategoryCard } from "@/components/ui/CategoryCard";
import { StackedSheet } from "./Sheet";

const products = [
  { title: "انتريه صالة تفصيل", subtitle: "", image: "/img/sofa-brown.jpg", href: "/collection" },
  { title: "ركنة انتريه", subtitle: "", brand: "", image: "/img/sofa-gray.jpg", href: "/collection" },
  { title: "lazy", subtitle: "boy", image: "/img/lazyboy.jpg", href: "/collection" },
  { title: "غرف", subtitle: "نوم", image: "/img/bedroom.jpg", href: "/collection" },
];

export function CategoryPrompt() {
  return (
    <StackedSheet 
      layer={10}
      pin
      topOffset={72}
      className="lg:rounded-t-[28px] shadow-[0px_3px_30px_black] !md:min-h-0"
      overlapClass="-mt-6 lg:-mt-12"
    >
      <h2 className="font-lalezar text-2xl sm:text-3xl lg:text-4xl text-ink text-center mb-8 lg:my-12">
        بتدور علي حاجة معينة ؟
      </h2>

      <div className="space-y-5 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-5 lg:gap-8">
        {products.map((p) => (
          <CategoryCard key={p.href} {...p} />
        ))}
      </div>
    </StackedSheet>
  );
}