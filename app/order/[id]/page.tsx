// app/order/[id]/page.tsx
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { medusa } from "@/lib/medusa";
import { Sheet } from "@/components/section/Sheet";

type Params = { id: string };

/* ---------------- Page shell (no params awaited here) ---------------- */
export default function OrderPage({ params }: { params: Promise<Params> }) {
  return (
    <main className="relative bg-cream-100 min-h-screen">
      <Sheet layer={10}>
        <div className="max-w-[560px] mx-auto">
          <Suspense fallback={<OrderSkeleton />}>
            <OrderContent params={params} />
          </Suspense>
        </div>
      </Sheet>
    </main>
  );
}

/* ---------------- Dynamic content (params awaited here) ---------------- */
async function OrderContent({ params }: { params: Promise<Params> }) {
  const { id } = await params;

  let order: any = null;
  try {
    const res = await medusa.store.order.retrieve(id);
    order = res.order;
  } catch {
    order = null;
  }

  if (!order) notFound();

  return (
    <div className="space-y-6">
      {/* Success header */}
      <div className="text-center space-y-3 py-6">
        <div className="mx-auto w-16 h-16 grid place-items-center rounded-full bg-emerald-100 text-emerald-700">
          <svg
            viewBox="0 0 24 24"
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M5 12l5 5L20 7" />
          </svg>
        </div>
        <h1 className="font-lalezar text-3xl text-ink">
          شكراً لك على طلبك
        </h1>
        <p className="text-ink/60">
          رقم الطلب:{" "}
          <span className="font-mono text-ink">{order.display_id}</span>
        </p>
      </div>

      {/* Items */}
      <div className="rounded-2xl bg-white/70 ring-1 ring-ink/10 p-5 space-y-3">
        <h2 className="font-lalezar text-lg text-ink">ملخص الطلب</h2>
        {order.items?.map((item: any) => (
          <div
            key={item.id}
            className="flex items-center justify-between text-sm text-ink/70"
          >
            <span>
              {item.title} × {item.quantity}
            </span>
            <span>
              {((item.unit_price ?? 0) / 100).toLocaleString("ar-EG")} ج.م
            </span>
          </div>
        ))}
        <div className="border-t border-ink/10 pt-2 flex justify-between">
          <span className="font-lalezar">الإجمالي</span>
          <span className="font-lalezar text-xl">
            {((order.total ?? 0) / 100).toLocaleString("ar-EG")} ج.م
          </span>
        </div>
      </div>

      <Link
        href="/collection"
        className="
          block text-center w-full h-14 leading-[56px]
          rounded-full bg-ink text-white font-lalezar text-lg
          hover:bg-ink/90 transition
        "
      >
        تسوق المزيد
      </Link>
    </div>
  );
}

/* ---------------- Skeleton ---------------- */
function OrderSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Check icon */}
      <div className="text-center space-y-3 py-6">
        <div className="mx-auto w-16 h-16 rounded-full bg-white/40" />
        <div className="h-8 w-2/3 mx-auto bg-white/40 rounded-full" />
        <div className="h-4 w-1/3 mx-auto bg-white/40 rounded-full" />
      </div>

      {/* Summary card */}
      <div className="rounded-2xl bg-white/40 p-5 space-y-3">
        <div className="h-5 w-1/3 bg-white/60 rounded-full" />
        <div className="h-4 w-full bg-white/60 rounded-full" />
        <div className="h-4 w-5/6 bg-white/60 rounded-full" />
      </div>

      {/* Button */}
      <div className="h-14 w-full rounded-full bg-white/40" />
    </div>
  );
}