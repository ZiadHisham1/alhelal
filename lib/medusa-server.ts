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

// lib/medusa-server.ts
export async function getDefaultRegion() {
  "use cache";
  cacheLife("days");

  const { regions } = await medusa.store.region.list();

  if (!regions.length) {
    throw new Error("No regions configured in Medusa");
  }

  // 🔑 Priority: find a region whose country list includes Egypt
  const egyptRegion = regions.find((r) =>
    r.countries?.some((c) => c.iso_2 === "eg")
  );

  if (egyptRegion) return egyptRegion;

  // Fallback: any region with EGP currency
  const egpRegion = regions.find((r) => r.currency_code === "egp");
  if (egpRegion) return egpRegion;

  // Last resort: first region (log a warning)
  console.warn(
    "[getDefaultRegion] No Egypt region found. Using:", regions[0].name
  );
  return regions[0];
}