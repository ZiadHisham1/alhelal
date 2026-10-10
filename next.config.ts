import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,

 images: {
  remotePatterns: [
    // Unsplash
    {
      protocol: "https",
      hostname: "images.unsplash.com",
      pathname: "/**",
    },
    // Medusa Cloud (production)
    {
      protocol: "https",
      hostname: "**.medusajs.com",
      pathname: "/**",
    },
    // S3 / object storage
    {
      protocol: "https",
      hostname: "**.amazonaws.com",
      pathname: "/**",
    },
    // Local Medusa — your machine
    {
      protocol: "http",
      hostname: "localhost",
      port: "9000",
      pathname: "/**",           // ← must be /**, not /uploads/**
    },
    // Local Medusa — phone on LAN
    {
      protocol: "http",
      hostname: "192.168.100.12",
      port: "9000",
      pathname: "/**",
    },
  ],
  // unoptimized: true, // 🔌 Disable Next.js image optimization for Medusa images
},
};

export default nextConfig;