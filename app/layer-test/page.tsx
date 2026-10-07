// app/layer-test/page.tsx
// No Tailwind config changes needed. Pure utility classes.
// Visit /layer-test and scroll. You should see 4 distinct layers.

export default function LayerTestPage() {
  return (
    <main className="relative bg-cream-100">
      {/* ===== Layer 0 — sticky hero ===== */}
      <section className="sticky top-0 z-0 h-[40vh] w-full bg-red-500">
        <div className="grid h-full place-items-center text-white text-4xl font-bold">
          HERO (pins)
        </div>
      </section>

      {/* ===== Layer 1 — sticky sheet, pins, gets covered ===== */}
      <div className="relative z-10 -mt-6">
        <div className="sticky top-0">
          <section className="min-h-screen w-full rounded-t-[28px] bg-amber-300 pt-12 px-6">
            <h1 className="text-4xl font-bold text-center mb-8">
              LAYER 1 (pins)
            </h1>
            <p className="text-center mb-8">
              Keep scrolling. This section should stay pinned while the next one
              slides up over it.
            </p>
            <div className="space-y-6 max-w-md mx-auto">
              <div className="h-40 rounded-2xl bg-white/60" />
              <div className="h-40 rounded-2xl bg-white/60" />
              <div className="h-40 rounded-2xl bg-white/60" />
              <div className="h-40 rounded-2xl bg-white/60" />
            </div>
          </section>
        </div>
      </div>

      {/* ===== Layer 2 — sticky sheet, pins, gets covered ===== */}
      <div className="relative z-20 -mt-6">
        <div className="sticky top-0">
          <section className="min-h-screen w-full rounded-t-[28px] bg-emerald-300 pt-12 px-6">
            <h1 className="text-4xl font-bold text-center mb-8">
              LAYER 2 (pins)
            </h1>
            <p className="text-center mb-8">
              Same behavior — this pins, then the next layer covers it.
            </p>
            <div className="space-y-6 max-w-md mx-auto">
              <div className="h-40 rounded-2xl bg-white/60" />
              <div className="h-40 rounded-2xl bg-white/60" />
              <div className="h-40 rounded-2xl bg-white/60" />
            </div>
          </section>
        </div>
      </div>

      {/* ===== Layer 3 — relative, scrolls freely (last layer) ===== */}
      <section className="relative z-30 -mt-6 rounded-t-[28px] bg-sky-300 pt-12 pb-16 px-6">
        <h1 className="text-4xl font-bold text-center mb-8">
          LAYER 3 (scrolls freely)
        </h1>
        <p className="text-center mb-8">
          This is the final layer. It just scrolls normally.
        </p>
        <div className="space-y-6 max-w-md mx-auto">
          <div className="h-40 rounded-2xl bg-white/60" />
          <div className="h-40 rounded-2xl bg-white/60" />
          <div className="h-40 rounded-2xl bg-white/60" />
        </div>
      </section>
    </main>
  );
}