// src/app/layout.tsx
import type { Metadata } from "next";
import { Lalezar } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";
import { CartInit } from "@/components/providers/CartInit";
import { CartDrawer } from "@/components/section/CartDrawer";
import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const lalezar = Lalezar({
  weight: "400",
  subsets: ["arabic", "latin"],
  variable: "--font-lalezar",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: "أثاث البيت أساس البيت",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={lalezar.variable}>
      <body className="min-h-screen bg-cream-50 text-ink antialiased">
        <Navbar />
        {children}
        <CartDrawer />
        <CartInit />
        <Footer />
      </body>
    </html>
  );
}