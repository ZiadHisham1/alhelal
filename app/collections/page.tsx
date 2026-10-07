import { Sheet } from "@/components/section/Sheet";
import { CollectionClient } from "@/components/section/CollectionClient";
import { fetchProducts } from "@/lib/product-server";

export default async function CollectionPage() {
  const products = await fetchProducts();

  return (
    <main className="relative bg-cream-100 min-h-screen">
      <Sheet layer={10}>
        <div className="max-w-[720px] mx-auto space-y-6">
          <h1 className="font-lalezar text-2xl sm:text-3xl text-ink text-center">
            مجموعة المنتجات
          </h1>

          <CollectionClient products={products} />
        </div>
      </Sheet>
    </main>
  );
}