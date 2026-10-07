// src/lib/medusa-server.ts
import "server-only";
import { cacheLife } from "next/cache";
import { medusa } from "./medusa";

export async function getRegions() {
  "use cache";
  cacheLife("days");

  const { regions } = await medusa.store.region.list();
  return regions;
}

export async function getDefaultRegion() {
  "use cache";
  cacheLife("days");

  const { regions } = await medusa.store.region.list();
  if (!regions.length) {
    throw new Error("No regions configured in Medusa");
  }
  return (
    regions.find((r) => r.currency_code === "egp") ??
    regions.find((r) =>
      r.countries?.some((c: { iso_2: string }) => c.iso_2 === "eg")
    ) ??
    regions[0]
  );
}