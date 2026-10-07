// src/app/actions/cart.ts
"use server";

import { medusa } from "@/lib/medusa";
import { getDefaultRegion } from "@/lib/medusa-server";

export async function createMedusaCart() {
  const region = await getDefaultRegion();
  const { cart } = await medusa.store.cart.create({
    region_id: region.id,
  });
  return cart;
}