"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sheet } from "@/components/section/Sheet";
import { lookupOrder } from "@/app/actions/order";
import { tr } from "framer-motion/client";
import { Link } from "lucide-react";

export default function OrderLookupPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;

    setLoading(true);
    setError(null);

    try {
      const result = await lookupOrder(q);

      if (result) {
        router.push(`/order/${result.id}`);
      } else {
        setError("لم يتم العثور على طلب بهذه البيانات.");
      }
    } catch (e: any) {
      setError(e?.message ?? "حدث خطأ، حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative pt-20 bg-cream-100 min-h-screen">
      <Sheet layer={10}>
        <div className="max-w-[480px] mx-auto space-y-6">
          <h1 className="font-lalezar text-3xl text-ink text-center">
            تتبع طلبك
          </h1>

          <p className="text-center text-ink/60 text-sm font-lalezar">
            أدخل رقم الطلب أو رقم الموبايل لعرض تفاصيل الطلب
          </p>

          {error && (
            <div className="rounded-2xl bg-rose-50 text-rose-700 px-4 py-3 text-sm text-center font-lalezar">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="block mb-1.5 text-sm text-ink/60 font-lalezar">
                رقم الطلب أو رقم الموبايل
              </span>
              <input
                required
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="مثال: 1234 أو 01012345678"
                className="
                  w-full h-12 rounded-full px-4
                  bg-white ring-1 ring-ink/10
                  font-lalezar text-base text-ink
                  focus:outline-none focus:ring-2 focus:ring-ink/30
                  transition
                "
                disabled={true}
                dir="auto"
              />
            </label>

            <button
              type="submit"
              disabled={true}
              className="
                w-full h-14 rounded-full
                bg-ink text-white font-lalezar text-lg
                hover:bg-ink/90 active:scale-[0.99]
                disabled:opacity-50 disabled:cursor-not-allowed
                transition
              "
            >
              {loading ? "..." : "ابحث"}
            </button>
          </form>

          {/* Hint */}
          <div className="rounded-2xl bg-cream-50 ring-1 ring-ink/5 p-4 text-center">
            <p className="text-xs text-ink/50 font-lalezar leading-relaxed">
                الخدمة قيد التطوير, يمكنك تتبع حالة طلبك عبر
               <span className="text-black px-2">
                 <a href="/contact-us"> التواصل معنا </a>
               </span>
            </p>
          </div>
        </div>
      </Sheet>
    </main>
  );
}