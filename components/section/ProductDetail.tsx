"use client";

import { useState } from "react";
import Link from "next/link";
import { Sheet } from "./Sheet";
import { ProductGallery } from "@/components/ui/ProductGallery";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { AddToCartButton } from "@/components/ui/AddToCartButton";
import { SpecList } from "@/components/ui/SpecList";
import { BackButton } from "@/components/ui/BackButton";
import { ProductGrid } from "./ProductGrid";
import type { Product } from "@/lib/products";

interface ProductDetailProps {
  product: Product;
  related: Product[];
}

export function ProductDetail({ product, related }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);

  const onSale =
    product.oldPrice != null && product.oldPrice > product.price;
  const discount = onSale
    ? Math.round(
        ((product.oldPrice! - product.price) / product.oldPrice!) * 100
      )
    : 0;

  const gallery = product.images?.length
    ? product.images
    : [product.image];

  return (
    <>
      <Sheet layer={10}>
        <div className="max-w-[720px] mx-auto space-y-6">
          <BackButton />

          {/* Gallery */}
          <ProductGallery images={gallery} alt={product.title} />

          {/* Title + brand */}
          <div className="text-right">
            {product.brand && (
              <p className="text-xs tracking-[0.2em] uppercase text-ink/50">
                {product.brand}
              </p>
            )}
            <h1 className="mt-2 font-lalezar text-3xl sm:text-4xl text-ink leading-tight">
              {product.title}
              {product.subtitle && (
                <span className="text-ink/80"> {product.subtitle}</span>
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
            {product.inStock === false && (
              <span className="inline-flex items-center h-7 px-3 rounded-full bg-ink/10 text-ink/70 font-lalezar text-xs">
                غير متوفر
              </span>
            )}
          </div>

          {/* Price block */}
          <div className="flex items-baseline gap-3 flex-row-reverse justify-end">
            <span className="font-lalezar text-3xl text-ink">
              {product.price.toLocaleString("ar-EG")} ج.م
            </span>
            {onSale && (
              <span className="font-lalezar text-lg text-ink/40 line-through">
                {product.oldPrice!.toLocaleString("ar-EG")} ج.م
              </span>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <p className="text-ink/75 leading-relaxed text-right">
              {product.description}
            </p>
          )}

          {/* Highlights */}
          {product.highlights && product.highlights.length > 0 && (
            <ul className="grid grid-cols-2 gap-2 text-right">
              {product.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-center gap-2 rounded-2xl bg-white/60 ring-1 ring-ink/10 px-3 py-2"
                >
                  <span className="shrink-0 w-6 h-6 grid place-items-center rounded-full bg-ink/5 text-ink">
                    <svg
                      viewBox="0 0 20 20"
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M4 10l4 4 8-8" />
                    </svg>
                  </span>
                  <span className="text-sm text-ink/85">{h}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Quantity + Add to cart */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <QuantitySelector
              value={quantity}
              onChange={setQuantity}
              disabled={product.inStock === false}
            />
            <span className="text-sm text-ink/55 text-right flex-1">
              الكمية المتاحة:{" "}
              <span className="font-lalezar text-ink">متوفر</span>
            </span>
          </div>

          <AddToCartButton
            variantId={product.variants[0].id}   // ← Medusa variant
            productId={product.id}
            title={product.title}
            subtitle={product.subtitle}
            image={product.image}
            href={product.href}
            quantity={quantity}
            disabled={product.inStock === false}
          />

          {/* Specs */}
          {product.specs && product.specs.length > 0 && (
            <section className="pt-2">
              <h2 className="font-lalezar text-xl text-ink mb-3 text-right">
                المواصفات
              </h2>
              <SpecList specs={product.specs} />
            </section>
          )}
        </div>
      </Sheet>

      {/* Related products */}
      {related.length > 0 && (
        <Sheet layer={20}>
          <div className="max-w-[720px] mx-auto space-y-6">
            <h2 className="font-lalezar text-2xl text-ink text-center">
              قد يعجبك أيضاً
            </h2>
            <ProductGrid products={related} />
          </div>
        </Sheet>
      )}
    </>
  );
}