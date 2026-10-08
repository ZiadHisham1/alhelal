"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sheet } from "@/components/section/Sheet";
import { lookupOrder } from "@/app/actions/order";

export default function OrderLookupPage() {
  const router = useRouter();
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await lookupOrder(orderId.trim(), email.trim());
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
    <main className="relative bg-cream-100 min-h-screen">
      <Sheet layer={10}>
        <div className="max-w-[480px] mx-auto space-y-6">
          <h1 className="font-lalezar text-3xl text-ink text-center">
            تتبع طلبك
          </h1>
          <p className="text-center text-ink/60 text-sm">
            أدخل رقم الطلب والبريد الإلكتروني لعرض تفاصيل الطلب.
          </p>

          {error && (
            <div className="rounded-2xl bg-rose-50 text-rose-700 px-4 py-3 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="block mb-1.5 text-sm text-ink/60 font-lalezar">
                رقم الطلب
              </span>
              <input
                required
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="1234 أو ord_..."
                className="w-full h-12 rounded-full px-4 bg-white ring-1 ring-ink/10 font-lalezar text-base text-ink focus:outline-none focus:ring-2 focus:ring-ink/30"
              />
            </label>

            <label className="block">
              <span className="block mb-1.5 text-sm text-ink/60 font-lalezar">
                البريد الإلكتروني
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 rounded-full px-4 bg-white ring-1 ring-ink/10 font-lalezar text-base text-ink focus:outline-none focus:ring-2 focus:ring-ink/30"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full h-14 rounded-full
                bg-ink text-white font-lalezar text-lg
                hover:bg-ink/90 active:scale-[0.99]
                disabled:opacity-50
                transition
              "
            >
              {loading ? "..." : "ابحث"}
            </button>
          </form>
        </div>
      </Sheet>
    </main>
  );
}