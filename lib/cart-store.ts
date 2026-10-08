// src/lib/cart-store.ts
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { medusa } from "./medusa";

/**
 * A simplified line item — only fields we render.
 */
export interface CartLine {
  id: string;             // Medusa line item id (used for update/remove)
  variantId: string;      // Medusa variant id
  productId: string;
  title: string;
  subtitle?: string;
  image: string;
  href: string;
  unitPrice: number;      // in major units (already /100)
  quantity: number;
}

interface CartState {
  cartId: string | null;
  items: CartLine[];
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
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
  refresh: () => Promise<void>;

  // Drawer
  openDrawer: () => void;
  closeDrawer: () => void;

  // Derived
  totalItems: () => number;
  totalPrice: () => number;
}

/** Medusa line item → our simplified shape */
function mapLineItem(li: any): CartLine {
  const product = li.variant?.product ?? {};
  return {
    id: li.id,
    variantId: li.variant_id,
    productId: li.product_id ?? product.id,
    title: li.product_title ?? product.title ?? "",
    subtitle: li.variant_title ?? li.variant?.title ?? undefined,
    image:
      li.thumbnail ??
      product.thumbnail ??
      "/img/placeholder.jpg",
    href: `/product/${product.handle ?? ""}`,
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

      /* ---------- INIT (rehydrate existing cart from Medusa) ---------- */
      initCart: async () => {
        const id = get().cartId;
        if (!id) return;

        set({ isLoading: true, error: null });
        try {
          const { cart } = await medusa.store.cart.retrieve(id, {
            fields:
              "+items.thumbnail,+items.product_title,+items.product_handle,+items.variant_title,+items.variant.product.handle",
          });
          set({
            items: (cart.items ?? []).map(mapLineItem),
            isLoading: false,
          });
        } catch (e: any) {
          // Cart expired or invalid — clear it so CartInit recreates
          localStorage.removeItem("medusa_cart_id");
          set({ cartId: null, items: [], isLoading: false, error: null });
        }
      },

      /* ---------- ADD ---------- */
      addItem: async (input, qty = 1) => {
        // Ensure we have a cart id — if not, read from localStorage
        let cartId = get().cartId;
        if (!cartId) {
          cartId = localStorage.getItem("medusa_cart_id");
          if (cartId) set({ cartId });
        }
        if (!cartId) {
          set({ error: "Cart not initialized yet" });
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const { cart } = await medusa.store.cart.createLineItem(cartId, {
            variant_id: input.variantId,
            quantity: qty,
          });

          set({
            items: (cart.items ?? []).map(mapLineItem),
            isLoading: false,
            isOpen: true, // auto-open drawer on add
          });
        } catch (e: any) {
          set({ isLoading: false, error: e?.message ?? "Add failed" });
        }
      },

      /* ---------- UPDATE QTY ---------- */
      updateQty: async (lineId, qty) => {
        const cartId = get().cartId;
        if (!cartId) return;
        const clamped = Math.max(1, Math.min(99, qty));

        set({ isLoading: true, error: null });
        try {
          const res: any = await medusa.store.cart.updateLineItem(cartId, lineId, {
            quantity: clamped,
          });

          const updatedItems =
            res?.cart?.items ??
            res?.parent?.items ??
            [];

          set({
            items: updatedItems.map(mapLineItem),
            isLoading: false,
          });
        } catch (e: any) {
          set({ isLoading: false, error: e?.message ?? "Update failed" });
        }
      },

      /* ---------- REMOVE ---------- */
      removeItem: async (lineId) => {
        const cartId = get().cartId;
        if (!cartId) return;

        set({ isLoading: true, error: null });
        try {
          // Medusa returns { deleted, parent: { items: [...] } } on DELETE,
          // NOT { cart: { items: [...] } } like create/update.
          const res: any = await medusa.store.cart.deleteLineItem(cartId, lineId);

          // Handle both possible shapes safely
          const updatedItems =
            res?.parent?.items ??
            res?.cart?.items ??
            [];

          set({
            items: updatedItems.map(mapLineItem),
            isLoading: false,
          });
        } catch (e: any) {
          set({ isLoading: false, error: e?.message ?? "Remove failed" });
        }
      },

      clear: async () => {
        const cartId = get().cartId;
        if (!cartId) return;

        set({ isLoading: true, error: null });
        try {
          // Delete each line item. Medusa returns { deleted: true, parent: ... } — 
          // we don't need the response, we know we're emptying everything.
          const current = get().items;
          await Promise.all(
            current.map((item) =>
              medusa.store.cart.deleteLineItem(cartId, item.id)
            )
          );
          set({ items: [], isLoading: false });
        } catch (e: any) {
          set({ isLoading: false, error: e?.message ?? "Clear failed" });
        }
      },

      /* ---------- REFRESH ---------- */
      refresh: async () => {
        await get().initCart();
      },

      /* ---------- DRAWER ---------- */
      openDrawer: () => set({ isOpen: true }),
      closeDrawer: () => set({ isOpen: false }),

      /* ---------- DERIVED ---------- */
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
      // Persist ONLY the cartId — Medusa owns the data
      partialize: (state) => ({ cartId: state.cartId }),
    }
  )
);