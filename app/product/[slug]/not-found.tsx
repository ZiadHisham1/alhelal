import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="min-h-screen grid place-items-center bg-cream-100 px-6 text-center">
      <div className="max-w-sm">
        <h1 className="font-lalezar text-5xl text-ink">٤٠٤</h1>
        <p className="mt-4 font-lalezar text-xl text-ink/70">
          المنتج غير موجود
        </p>
        <Link
          href="/collections"
          className="
            mt-8 inline-block px-8 h-12 leading-[48px]
            rounded-full bg-ink text-white
            font-lalezar text-lg
            hover:bg-ink/90 transition
          "
        >
          تصفح المجموعة
        </Link>
      </div>
    </main>
  );
}