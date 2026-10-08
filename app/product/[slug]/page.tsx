// src/app/product/[slug]/page.tsx
import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductDetail } from "@/components/section/ProductDetail";
import { fetchProduct, fetchProducts } from "@/lib/product-server";
import type { Product } from "@/lib/products";

type Params = { slug: string };

/* ---------------- Static params ---------------- */
export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.map((p) => ({ slug: p.handle ?? p.id }));
}

/* ---------------- SEO ---------------- */
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProduct(slug);
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

/* ---------------- Page shell (no params here) ---------------- */
export default function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  return (
    <main className="relative bg-cream-100 min-h-screen">
      <Suspense fallback={<ProductSkeleton />}>
        <ProductContent params={params} />
      </Suspense>
    </main>
  );
}

/* ---------------- Dynamic content (params awaited here) ---------------- */
async function ProductContent({ params }: { params: Promise<Params> }) {
  const { slug } = await params;

  const product = await fetchProduct(slug);
  if (!product) notFound();

  const all = await fetchProducts();
  const related = all
    .filter(
      (p) =>
        p.handle !== product.handle &&
        p.categories.some((c) => product.categories.includes(c))
    )
    .slice(0, 3);

  return <ProductDetail product={product} related={related} />;
}

/* ---------------- Skeleton ---------------- */
function ProductSkeleton() {
  return (
    <div className="max-w-[720px] mx-auto px-4 py-8 space-y-6 animate-pulse">
      {/* Gallery */}
      <div className="w-full aspect-[4/3] rounded-[28px] bg-white/40" />

      {/* Title lines */}
      <div className="space-y-2">
        <div className="h-3 w-24 bg-white/40 rounded-full" />
        <div className="h-8 w-2/3 bg-white/40 rounded-full" />
      </div>

      {/* Price */}
      <div className="h-8 w-1/3 bg-white/40 rounded-full" />

      {/* Description */}
      <div className="space-y-2">
        <div className="h-3 w-full bg-white/40 rounded-full" />
        <div className="h-3 w-5/6 bg-white/40 rounded-full" />
        <div className="h-3 w-4/6 bg-white/40 rounded-full" />
      </div>

      {/* Button */}
      <div className="h-14 w-full rounded-full bg-white/40" />
    </div>
  );
}