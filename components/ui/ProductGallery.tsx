"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  alt: string;
  className?: string;
}

export function ProductGallery({
  images,
  alt,
  className,
}: ProductGalleryProps) {
  const gallery = images.length > 0 ? images : ["/img/placeholder.jpg"];
  const [active, setActive] = useState(0);

  return (
    <div className={cn("space-y-3", className)}>
      {/* Main image */}
      <div className="relative w-full aspect-[4/3] rounded-[28px] overflow-hidden bg-white/40">
        <Image
          src={gallery[active]}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 720px"
          className="object-cover"
        />
      </div>

      {/* Thumbnails (only if 2+) */}
      {gallery.length > 1 && (
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
          {gallery.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`صورة ${i + 1}`}
              aria-pressed={i === active}
              className={cn(
                "relative shrink-0 w-20 h-20 rounded-2xl overflow-hidden",
                "ring-2 transition",
                i === active
                  ? "ring-ink"
                  : "ring-transparent hover:ring-ink/30"
              )}
            >
              <Image
                src={img}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}