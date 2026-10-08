// src/components/providers/CartInit.tsx
"use client";

import { useEffect, useRef } from "react";
import { createMedusaCart } from "@/app/actions/cart";
import { useCartStore } from "@/lib/cart-store";

export function CartInit() {
  const ranRef = useRef(false);
  const setCartId = useCartStore.setState;
  const initCart = useCartStore((s) => s.initCart);
  const existingCartId = useCartStore((s) => s.cartId);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    // 1. Zustand persist rehydrates cartId from localStorage
    // 2. If we have one, hydrate items from Medusa
    if (existingCartId) {
      initCart();
      return;
    }

    // Fallback: check localStorage directly
    const stored = localStorage.getItem("medusa_cart_id");
    if (stored) {
      setCartId({ cartId: stored });
      initCart();
      return;
    }

    // No cart at all — create one
    (async () => {
      try {
        const cart = await createMedusaCart();
        localStorage.setItem("medusa_cart_id", cart.id);
        setCartId({ cartId: cart.id });
        // eslint-disable-next-line no-console
        console.log("[CartInit] new cart:", cart.id);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("[CartInit] failed:", err);
      }
    })();
  }, [existingCartId, initCart, setCartId]);

  return null;
}