"use server";

export async function lookupOrder(query: string) {
  const trimmed = query.trim();
  if (!trimmed) return null;

  const baseUrl = process.env.NEXT_PUBLIC_MEDUSA_URL;
  const pk = process.env.NEXT_PUBLIC_MEDUSA_KEY;

  if (!baseUrl || !pk) {
    console.error("[lookupOrder] missing env vars");
    return null;
  }

  try {
    const res = await fetch(
      `${baseUrl}/store/order-lookup?q=${encodeURIComponent(trimmed)}`,
      {
        headers: { "x-publishable-api-key": pk },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      // 404 = not found, other errors = log
      if (res.status !== 404) {
        const txt = await res.text();
        console.error("[lookupOrder] failed:", res.status, txt);
      }
      return null;
    }

    const data = await res.json();
    return data.order ?? null;
  } catch (e) {
    console.error("[lookupOrder] fetch failed:", e);
    return null;
  }
}