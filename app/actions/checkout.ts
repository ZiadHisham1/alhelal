"use server";

import { medusa } from "@/lib/medusa";

export async function saveShippingAddress(
  cartId: string,
  address: {
    first_name: string;
    last_name: string;
    phone: string;
    address_1: string;
    address_2?: string;
    city: string;
    postal_code?: string;
    country_code: string;
  },
  email?: string,
  metadata?: Record<string, any>
) {
  const payload: any = {
    shipping_address: {
      first_name: address.first_name,
      last_name: address.last_name,
      phone: address.phone,
      address_1: address.address_1,
      address_2: address.address_2 || "",
      city: address.city,
      postal_code: address.postal_code || "",
      country_code: address.country_code,
    },
  };

  if (email && email.trim()) {
    payload.email = email;
  }

  const { cart } = await medusa.store.cart.update(cartId, payload);

  if (metadata && Object.keys(metadata).length > 0) {
    try {
      await medusa.store.cart.update(cartId, {
        metadata: { ...(cart.metadata ?? {}), ...metadata },
      });
    } catch (e) {
      console.warn("[saveShippingAddress] metadata update failed:", e);
    }
  }

  return cart;
}

export async function getShippingOptions(cartId: string) {
  const { shipping_options } = await medusa.store.fulfillment.listCartOptions({
    cart_id: cartId,
  });
  return shipping_options;
}

export async function addShippingMethod(cartId: string, optionId: string) {
  const { cart } = await medusa.store.cart.addShippingMethod(cartId, {
    option_id: optionId,
  });
  return cart;
}

export async function getPaymentProviders(regionId: string) {
  const { payment_providers } =
    await medusa.store.payment.listPaymentProviders({
      region_id: regionId,
    });
  return payment_providers;
}

export async function getCart(cartId: string) {
  const { cart } = await medusa.store.cart.retrieve(cartId);
  return cart;
}

export async function initPaymentSession(
  cartId: string,
  providerId: string
) {
  const { payment_collection } =
    await medusa.store.payment.initiatePaymentSession(
      { id: cartId } as any,
      { provider_id: providerId }
    );
  return payment_collection;
}

export async function completeOrder(cartId: string) {
  const result = await medusa.store.cart.complete(cartId);
  return result;
}