"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { medusa } from "./medusa";
import { createMedusaCart } from "@/app/actions/cart";

export interface CartLine {
  id: string;
  variantId: string;
  productId: string;
  title: string;
  subtitle?: string;
  image: string;
  href: string;
  unitPrice: number;
  quantity: number;
}

interface CartState {
  cartId: string | null;
  items: CartLine[];
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;

  initCart: () => Promise<void>;
  addItem: (
    input: {
      variantId: string;
      productId: string;
      title: string;
      subtitle?: string;
      image: string;
      href: string;
    },
    qty?: number
  ) => Promise<void>;
  updateQty: (lineId: string, qty: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  clear: () => Promise<void>;

  openDrawer: () => void;
  closeDrawer: () => void;

  totalItems: () => number;
  totalPrice: () => number;
}

function mapLineItem(li: any): CartLine {
  return {
    id: li.id,
    variantId: li.variant_id,
    productId: li.product_id,
    title: li.product_title ?? li.title ?? "",
    subtitle: li.variant_title ?? undefined,
    image: li.thumbnail ?? "/img/placeholder.jpg",
    href: `/product/${li.product_handle ?? li.variant?.product?.handle ?? ""}`,
    unitPrice: (li.unit_price ?? 0) / 100,
    quantity: li.quantity,
  };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartId: null,
      items: [],
      isOpen: false,
      isLoading: false,
      error: null,

      initCart: async () => {
        set({ isLoading: true, error: null });
        try {
          const storedId = get().cartId;

          if (storedId) {
            try {
              const { cart } = await medusa.store.cart.retrieve(storedId);
              set({
                cartId: cart.id,
                items: (cart.items ?? []).map(mapLineItem),
                isLoading: false,
              });
              return;
            } catch {
              // Fall through to creating a fresh cart
            }
          }

          // Server action creates the cart with the correct region
          const cart = await createMedusaCart();
          set({
            cartId: cart.id,
            items: (cart.items ?? []).map(mapLineItem),
            isLoading: false,
          });
        } catch (e: any) {
          set({ isLoading: false, error: e?.message ?? "Cart init failed" });
        }
      },

      addItem: async (input, qty = 1) => {
        set({ isLoading: true, error: null });
        try {
          let cartId = get().cartId;
          if (!cartId) {
            await get().initCart();
            cartId = get().cartId;
          }
          if (!cartId) throw new Error("No cart available");

          const { cart } = await medusa.store.cart.createLineItem(cartId, {
            variant_id: input.variantId,
            quantity: qty,
          });

          set({
            items: (cart.items ?? []).map(mapLineItem),
            isLoading: false,
            isOpen: true,
          });
        } catch (e: any) {
          set({ isLoading: false, error: e?.message ?? "Add failed" });
        }
      },

      updateQty: async (lineId, qty) => {
        const cartId = get().cartId;
        if (!cartId) return;
        const clamped = Math.max(1, Math.min(99, qty));

        set({ isLoading: true, error: null });
        try {
          const { cart } = await medusa.store.cart.updateLineItem(
            cartId,
            lineId,
            { quantity: clamped }
          );
          set({
            items: (cart.items ?? []).map(mapLineItem),
            isLoading: false,
          });
        } catch (e: any) {
          set({ isLoading: false, error: e?.message ?? "Update failed" });
        }
      },

      removeItem: async (lineId) => {
        const cartId = get().cartId;
        if (!cartId) return;

        set({ isLoading: true, error: null });
        try {
          const { cart } = await medusa.store.cart.deleteLineItem(
            cartId,
            lineId
          );
          set({
            items: (cart.items ?? []).map(mapLineItem),
            isLoading: false,
          });
        } catch (e: any) {
          set({ isLoading: false, error: e?.message ?? "Remove failed" });
        }
      },

      clear: async () => {
        set({ isLoading: true, error: null });
        try {
          const cart = await createMedusaCart();
          set({
            cartId: cart.id,
            items: [],
            isLoading: false,
          });
        } catch (e: any) {
          set({ isLoading: false, error: e?.message ?? "Clear failed" });
        }
      },

      openDrawer: () => set({ isOpen: true }),
      closeDrawer: () => set({ isOpen: false }),

      totalItems: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce(
          (sum, i) => sum + i.unitPrice * i.quantity,
          0
        ),
    }),
    {
      name: "alhelal-cart",
      partialize: (state) => ({ cartId: state.cartId }),
    }
  )
);