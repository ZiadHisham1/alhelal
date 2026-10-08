"use server";

import { medusa } from "@/lib/medusa";

export async function lookupOrder(orderId: string, email: string) {
  try {
    const { order } = await medusa.store.order.retrieve(orderId);

    // Verify email matches — order.email is set at checkout
    if (!order || order.email?.toLowerCase() !== email.toLowerCase()) {
      return null;
    }

    return { id: order.id };
  } catch {
    return null;
  }
}