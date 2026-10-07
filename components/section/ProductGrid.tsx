import { ProductCard } from "@/components/ui/ProductCard";
import type { Product } from "@/lib/products";

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
  className?: string;
}

export function ProductGrid({
  products,
  emptyMessage = "لا توجد منتجات حالياً",
  className,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="text-center text-ink/60 py-12 font-lalezar text-xl">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className={className ?? "space-y-5"}>
      {products.map((p) => (
        <ProductCard
          key={p.id}
          title={p.title}
          subtitle={p.subtitle}
          brand={p.brand}
          image={p.image}
          href={p.href}
        />
      ))}
    </div>
  );
}