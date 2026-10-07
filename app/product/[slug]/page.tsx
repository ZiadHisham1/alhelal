import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductDetail } from "@/components/section/ProductDetail";
import { allProducts, getProductBySlug, getRelatedProducts } from "@/lib/products";

type Params = { slug: string };

/** Pre-render each product page as static HTML at build time */
export function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.id }));
}

/** SEO metadata per product */
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "منتج غير موجود" };

  const title = `${product.title}${product.subtitle ? " " + product.subtitle : ""}`;
  return {
    title,
    description: product.description ?? title,
    openGraph: {
      title,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const related = getRelatedProducts(slug, 3);

  return (
    <main className="relative bg-cream-100 min-h-screen">
      <ProductDetail product={product} related={related} />
    </main>
  );
}