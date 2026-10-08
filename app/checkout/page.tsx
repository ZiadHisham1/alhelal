// src/app/checkout/page.tsx
import { Sheet } from "@/components/section/Sheet";
import { CheckoutFlow } from "@/components/section/CheckoutFlow";

export default function CheckoutPage() {
  return (
    <main className="relative bg-cream-100 min-h-screen">
      <Sheet layer={10}>
        <div className="max-w-[560px] mx-auto space-y-8">
          <h1 className="font-lalezar text-3xl text-ink text-center">
            إتمام الشراء
          </h1>
          <CheckoutFlow />
        </div>
      </Sheet>
    </main>
  );
}