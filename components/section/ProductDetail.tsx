"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Sheet } from "./Sheet";
import { ProductGallery } from "@/components/ui/ProductGallery";
import { AddToCartButton } from "@/components/ui/AddToCartButton";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/products";

interface ProductDetailProps {
  product: Product;
  related: Product[];
}

export function ProductDetail({ product, related }: ProductDetailProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const onSale =
    product.oldPrice != null && product.oldPrice > product.price;
  const discount = onSale
    ? Math.round(
        ((product.oldPrice! - product.price) / product.oldPrice!) * 100
      )
    : 0;

  const gallery = product.images?.length ? product.images : [product.image];

  const isOutOfStock = product.inStock === false;

  return (
    <>
      <Sheet layer={10}>
        <div className="max-w-[720px] lg:max-w-[1200px] mx-auto">
          {/* Breadcrumb */}
          <nav
            aria-label="مسار التنقل"
            className="
              flex items-center gap-2 mb-6 lg:mb-8
              font-lalezar text-sm text-ink/50
            "
          >
            <Link href="/" className="hover:text-ink transition">
              الرئيسية
            </Link>
            <span>/</span>
            <Link href="/collection" className="hover:text-ink transition">
              المجموعة
            </Link>
            <span>/</span>
            <span className="text-ink truncate max-w-[180px]">
              {product.title}
            </span>
          </nav>

          {/* ================= Main grid ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            {/* ---------- LEFT: Gallery ---------- */}
            <div className="lg:sticky lg:top-[100px] lg:self-start">
              <ProductGallery images={gallery} alt={product.title} />
            </div>

            {/* ---------- RIGHT: Info ---------- */}
            <div className="space-y-6 lg:space-y-7 mt-8 lg:mt-0">
              {/* Title */}
              <div className="text-right">
                {product.brand && (
                  <p className="text-xs tracking-[0.2em] uppercase text-ink/50 mb-2">
                    {product.brand}
                  </p>
                )}
                <h1 className="font-lalezar text-3xl lg:text-4xl xl:text-5xl text-ink leading-tight">
                  {product.title}
                  {product.subtitle && (
                    <span className="text-ink/70"> {product.subtitle}</span>
                  )}
                </h1>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                {product.isNew && (
                  <span className="inline-flex items-center h-7 px-3 rounded-full bg-ink text-white font-lalezar text-xs">
                    جديد
                  </span>
                )}
                {onSale && (
                  <span className="inline-flex items-center h-7 px-3 rounded-full bg-rose-600 text-white font-lalezar text-xs">
                    خصم {discount}%
                  </span>
                )}
                {isOutOfStock && (
                  <span className="inline-flex items-center h-7 px-3 rounded-full bg-ink/10 text-ink/70 font-lalezar text-xs">
                    غير متوفر
                  </span>
                )}
              </div>

              {/* Price block */}
              <div className="flex items-baseline gap-3 flex-row-reverse justify-end">
                {onSale && (
                  <span className="font-lalezar text-lg text-ink/40 line-through">
                    {product.oldPrice!.toLocaleString("ar-EG")} ج.م
                  </span>
                )}
                <span
                  className={cn(
                    "font-lalezar text-3xl lg:text-4xl",
                    onSale ? "text-rose-600" : "text-ink"
                  )}
                >
                  {product.price.toLocaleString("ar-EG")} ج.م
                </span>
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-ink/75 leading-relaxed text-right text-sm lg:text-base">
                  {product.description}
                </p>
              )}

              {/* Highlights */}
              {product.highlights && product.highlights.length > 0 && (
                <ul className="space-y-1.5 text-right">
                  {product.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-center gap-2 text-sm text-ink/75"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-ink/40 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* ---------- Quantity ---------- */}
              <div className="space-y-2">
                <label className="block font-lalezar text-sm text-ink/70 text-right">
                  الكمية
                </label>
                <div
                  className={cn(
                    "flex items-center justify-between",
                    "w-full lg:w-[200px] h-14",
                    "rounded-full border border-ink/15 bg-white",
                    "px-2"
                  )}
                  dir="ltr"
                >
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1 || isOutOfStock}
                    aria-label="تقليل الكمية"
                    className="
                      w-10 h-10 grid place-items-center rounded-full
                      text-ink text-xl font-bold
                      hover:bg-cream-50 disabled:opacity-30
                      disabled:cursor-not-allowed transition
                    "
                  >
                    −
                  </button>
                  <span
                    aria-live="polite"
                    className="font-lalezar text-lg text-ink select-none"
                  >
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                    disabled={quantity >= 99 || isOutOfStock}
                    aria-label="زيادة الكمية"
                    className="
                      w-10 h-10 grid place-items-center rounded-full
                      text-ink text-xl font-bold
                      hover:bg-cream-50 disabled:opacity-30
                      disabled:cursor-not-allowed transition
                    "
                  >
                    +
                  </button>
                </div>
              </div>

              {/* ---------- Actions ---------- */}
              <div className="space-y-3 pt-2">
                {/* Add to cart */}
                <AddToCartButton
                  variantId={product.variantId ?? ""}
                  productId={product.id}
                  title={product.title}
                  subtitle={product.subtitle}
                  image={product.image}
                  href={product.href}
                  quantity={quantity}
                  disabled={isOutOfStock || !product.variantId}
                />

                {/* Buy it now */}
                <button
                  type="button"
                  onClick={() => {
                    if (!product.variantId) return;
                    router.push("/checkout");
                  }}
                  disabled={isOutOfStock || !product.variantId}
                  className="
                    w-full h-14 rounded-full
                    bg-[#2B1F17] text-white
                    font-lalezar text-lg
                    hover:bg-[#3a291f] active:scale-[0.99]
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition
                  "
                >
                  {isOutOfStock ? "غير متوفر" : "اشترِ الآن"}
                </button>
              </div>

              {/* ---------- Specs ---------- */}
              {product.specs && product.specs.length > 0 && (
                <div className="pt-4 border-t border-ink/10">
                  <h2 className="font-lalezar text-lg text-ink mb-3 text-right">
                    المواصفات
                  </h2>
                  <dl className="divide-y divide-ink/5">
                    {product.specs.map((s) => (
                      <div
                        key={s.label}
                        className="flex items-center justify-between gap-4 py-2.5 text-right"
                      >
                        <dt className="text-sm text-ink/60">{s.label}</dt>
                        <dd className="font-lalezar text-base text-ink">
                          {s.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          </div>
        </div>
      </Sheet>

      {/* ============================================================
          Related products — horizontal scroll row
          ============================================================ */}
      {related.length > 0 && (
        <Sheet layer={20}>
          <div className="max-w-[720px] lg:max-w-[1200px] mx-auto">
            <h2 className="font-lalezar text-2xl lg:text-3xl text-ink text-center mb-6 lg:mb-8">
              قد يعجبك أيضاً
            </h2>

            <div
              className="
                flex gap-4 overflow-x-auto pb-3
                snap-x snap-mandatory
                -mx-4 px-4
                sm:mx-0 sm:px-0
                lg:grid lg:grid-cols-4 lg:gap-5
                lg:overflow-visible lg:snap-none lg:pb-0
                scrollbar-hide
              "
            >
              {related.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  className="
                    shrink-0 w-[68%] sm:w-[220px]
                    lg:w-auto
                    snap-start
                  "
                >
                  <RelatedProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </Sheet>
      )}
    </>
  );
}

/* ============================================================
   Related product card — smaller, cleaner than main product
   ============================================================ */
function RelatedProductCard({ product }: { product: Product }) {
  const onSale =
    product.oldPrice != null && product.oldPrice > product.price;
  const hasPrice =
    typeof product.price === "number" && product.price > 0;

  return (
    <Link
      href={product.href}
      className={cn(
        "group block w-full overflow-hidden",
        "rounded-[24px]",
        "bg-white",
        "shadow-[0_4px_20px_rgba(0,0,0,0.08)]",
        "transition-all duration-300",
        "active:scale-[0.99]",
        "lg:hover:-translate-y-1 lg:hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)]"
      )}
    >
      {/* Image */}
      <div className="relative w-full aspect-square lg:aspect-[4/5] overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 70vw, (max-width: 1024px) 220px, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Sale badge */}
        {onSale && (
          <span
            className="
              absolute top-3 right-3
              inline-flex items-center h-6 px-2.5 rounded-full
              bg-rose-600 text-white
              font-lalezar text-[11px]
            "
          >
            خصم
          </span>
        )}

        {/* Out of stock badge */}
        {product.inStock === false && (
          <span
            className="
              absolute top-3 left-3
              inline-flex items-center h-6 px-2.5 rounded-full
              bg-ink/85 text-white
              font-lalezar text-[11px]
            "
          >
            غير متوفر
          </span>
        )}
      </div>

      {/* Info block */}
      <div className="p-3.5 lg:p-4 text-right space-y-1">
        <h3 className="font-lalezar text-ink text-sm lg:text-base leading-tight truncate">
          {product.title}
          {product.subtitle ? ` ${product.subtitle}` : ""}
        </h3>

        {hasPrice && (
          <div className="flex items-baseline gap-2 flex-row-reverse justify-end">
            {onSale && (
              <span className="font-lalezar text-xs text-ink/40 line-through">
                {product.oldPrice!.toLocaleString("ar-EG")} ج.م
              </span>
            )}
            <span
              className={cn(
                "font-lalezar text-sm lg:text-base",
                onSale ? "text-rose-600" : "text-ink"
              )}
            >
              {product.price.toLocaleString("ar-EG")} ج.م
            </span>
          </div>
        )}
      </div>
    </Link>
  );
} 