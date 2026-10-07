import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lalezar: ["var(--font-lalezar)", "sans-serif"],
      },
      colors: {
        cream: { 50: "#FDF8EE", 100: "#FBF1DC", 200: "#F5E3BC" },
        sand: { 400: "#C9A87C", 500: "#A8845A", 600: "#8A6B45" },
        ink: { DEFAULT: "#171717", soft: "#2B2B2B" },
      },
      boxShadow: {
        glass:
          "0 8px 24px rgba(0,0,0,0.35), 0 2px 6px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.35), inset 0 -1px 1px rgba(0,0,0,0.08)",
        card: "0 4px 20px rgba(0,0,0,0.08)",
      },
      borderRadius: { glass: "10px" },
    },
  },
  plugins: [],
} satisfies Config;