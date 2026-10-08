import { CategoryCard } from "@/components/ui/CategoryCard";
import { StackedSheet } from "./Sheet";

const products = [
  { title: "كنبة", subtitle: "اتركيه", image: "/img/sofa-brown.jpg", href: "/collection" },
  { title: "كنبة", subtitle: "سرير", brand: "DAKAR XL · sofa", image: "/img/sofa-gray.jpg", href: "/collection" },
  { title: "lazy", subtitle: "boy", image: "/img/lazyboy.jpg", href: "/collection" },
  { title: "غرف", subtitle: "نوم", image: "/img/bedroom.jpg", href: "/collection" },
];

export function CategoryPrompt() {
  return (
    <StackedSheet layer={10} pin topOffset={72}>
      <h2 className="font-lalezar text-2xl sm:text-3xl text-ink text-center mb-8">
        بتدور علي حاجة معينة ؟
      </h2>

      <div className="space-y-5">
        {products.map((p) => (
          <CategoryCard key={p.href} {...p} />
        ))}
      </div>
    </StackedSheet>
  );
}