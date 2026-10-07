import type { ProductSpec } from "@/lib/products";

export function SpecList({ specs }: { specs: ProductSpec[] }) {
  if (specs.length === 0) return null;
  return (
    <dl className="divide-y divide-ink/10 rounded-2xl bg-white/60 ring-1 ring-ink/10 overflow-hidden">
      {specs.map((s) => (
        <div key={s.label} className="flex items-center justify-between gap-4 px-4 py-3">
          <dt className="text-sm text-ink/55">{s.label}</dt>
          <dd className="font-lalezar text-base text-ink">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}