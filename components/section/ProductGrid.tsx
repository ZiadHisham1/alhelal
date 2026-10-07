import { ProductCard } from "@/components/ui/ProductCard";
import { Sheet } from "./Sheet";

export interface Product {
  title: string;
  subtitle?: string;
  brand?: string;
  image: string;
  href: string;
}

interface ProductGridProps {
  title?: string;
  products: Product[];
  emptyMessage?: string;
}

export function ProductGrid({
  title,
  products,
  emptyMessage = "لا توجد منتجات حالياً",
}: ProductGridProps) {
  return (
    <Sheet>
      {title && (
        <h2 className="font-lalezar text-2xl sm:text-3xl text-ink text-center mb-8">
          {title}
        </h2>
      )}

      {products.length === 0 ? (
        <p className="text-center text-ink/60 py-12 font-lalezar text-xl">
          {emptyMessage}
        </p>
      ) : (
        <div className="max-w-[720px] mx-auto space-y-5">
          {products.map((p) => (
            <ProductCard key={p.href} {...p} />
          ))}
        </div>
      )}
    </Sheet>
  );
}