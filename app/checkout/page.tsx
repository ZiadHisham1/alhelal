import Link from "next/link";
import { Sheet } from "@/components/section/Sheet";

export default function CheckoutPage() {
  return (
    <main className="relative bg-cream-100 min-h-screen">
      <Sheet layer={10}>
        <div className="max-w-[560px] mx-auto text-center py-16 space-y-6">
          <h1 className="font-lalezar text-3xl text-ink">إتمام الشراء</h1>
          <p className="text-ink/60">
            سيتم تفعيل هذه الصفحة قريباً. تابعنا!
          </p>
          <Link
            href="/cart"
            className="
              inline-block px-8 h-12 leading-[48px]
              rounded-full bg-ink text-white
              font-lalezar text-lg
              hover:bg-ink/90 transition
            "
          >
            الرجوع للسلة
          </Link>
        </div>
      </Sheet>
    </main>
  );
}