import { Sheet } from "@/components/section/Sheet";
import { CollectionClient } from "@/components/section/CollectionClient";
import { fetchProducts } from "@/lib/product-server";
import { PageHeader } from "@/components/ui/PageHeader";

export default async function CollectionPage() {
  const products = await fetchProducts();

  return (
    <main className="relative bg-cream-100 pt-17 min-h-screen">
      <Sheet layer={10}>
        <div className="max-w-[720px] lg:max-w-[1200px] mx-auto space-y-6">
          <PageHeader />

          <h1 className="font-lalezar text-2xl sm:text-3xl lg:text-4xl text-ink text-center">
            مجموعة المنتجات
          </h1>

          <CollectionClient products={products} />
        </div>
      </Sheet>
    </main>
  );
}   