// src/components/providers/CartInit.tsx
"use client";

import { useEffect } from "react";
import { useCartStore } from "@/lib/cart-store";

export function CartInit() {
  const initCart = useCartStore((s) => s.initCart);
  const cartId = useCartStore((s) => s.cartId);

  useEffect(() => {
    if (!cartId) initCart();
  }, [cartId, initCart]);

  return null;
}