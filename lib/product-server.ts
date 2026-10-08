// src/lib/product-server.ts
import { cacheLife, cacheTag } from "next/cache";
import { medusa } from "./medusa";
import { getDefaultRegion } from "./medusa-server";
import type { Product } from "./products";

export async function fetchProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  const region = await getDefaultRegion();

  const { products } = await medusa.store.product.list({
    limit: 100,
    region_id: region.id,
    fields:
      "+variants.calculated_price,+variants.inventory_quantity,+variants.id,+variants.title",
  });

  return products.map(mapProduct);
}

export async function fetchProduct(slug: string): Promise<Product | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("products", `product-${slug}`);

  const region = await getDefaultRegion();

  // 🔑 Query by handle — the exact same value in the URL
  const { products } = await medusa.store.product.list({
    handle: slug,
    region_id: region.id,
    fields:
      "+variants.calculated_price,+variants.inventory_quantity,+variants.id,+variants.title",
  });

  const p = products[0];
  return p ? mapProduct(p) : null;
}

function mapProduct(p: any): Product {
  const variant = p.variants?.[0];
  const amount =
    variant?.calculated_price?.calculated_amount ??
    variant?.prices?.[0]?.amount ??
    0;

  return {
    id: p.id,
    handle: p.handle,                    // ✅ critical
    variantId: variant?.id,              // ✅ critical
    title: p.title,
    subtitle: p.subtitle ?? "",
    brand: p.collection?.title ?? undefined,
    image: p.thumbnail ?? p.images?.[0]?.url ?? "/img/placeholder.jpg",
    href: `/product/${p.handle}`,        // ✅ uses handle
    categories: (p.categories ?? []).map((c: any) => c.handle),
    price: amount / 100,
    inStock: (variant?.inventory_quantity ?? 0) > 0,
    description: p.description ?? undefined,
  };
}