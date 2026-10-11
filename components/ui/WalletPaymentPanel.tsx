"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface WalletPaymentPanelProps {
  cartId: string;
  total: number;
  onReceiptUploaded: (url: string) => void;
}

export function WalletPaymentPanel({
  cartId,
  total,
  onReceiptUploaded,
}: WalletPaymentPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);

    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("cartId", cartId);

      const res = await fetch("/api/upload-receipt", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "فشل الرفع");

      setReceiptUrl(data.url);
      onReceiptUploaded(data.url);
    } catch (e: any) {
      setError(e?.message ?? "فشل رفع الصورة");
    } finally {
      setUploading(false);
    }
  }

  async function handleRemove() {
    setReceiptUrl(null);
    onReceiptUploaded("");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="rounded-2xl bg-cream-50 ring-1 ring-ink/10 p-5 space-y-5">
      <div className="text-right space-y-1">
        <h3 className="font-lalezar text-lg text-ink">
          ادفع بإحدى المحافظ الإلكترونية
        </h3>
        <p className="text-sm text-ink/60 font-lalezar">
          حوّل المبلغ ثم ارفع صورة الإيصال من التطبيق
        </p>
      </div>

      {/* Amount */}
      <div className="rounded-xl bg-white ring-1 ring-ink/10 p-4 text-center">
        <p className="text-xs text-ink/50 font-lalezar"> المبلغ المطلوب 
        <span className="mx-1 ">
            (50% deposite) 
        </span></p>
        <p className="font-lalezar text-3xl text-ink mt-1">
          {(total * 0.5 ).toLocaleString("ar-EG")} ج.م
        </p>
      </div>

      {/* Channels */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <ChannelCard
          name="فودافون كاش"
          number="01009497841"
          color="#E60000"
          icon="📱"
        />
        <ChannelCard
          name="إنستاباي"
          number="mohamedhelal7@instapay"
          color="#8B0D2D"
          icon="⚡"
        />
      </div>

      <ol className="text-sm text-ink/70 font-lalezar space-y-1.5 pr-5 list-decimal text-right">
        <li>افتح تطبيق المحفظة أو فوري</li>
        <li>حوّل مبلغ {(total * 0.5).toLocaleString("ar-EG")} ج.م على الرقم أعلاه</li>
        <li>خُذ Screenshot من إيصال التحويل</li>
        <li>ارفع الصورة هنا</li>
      </ol>

      {/* Upload */}
      <div className="space-y-3">
        {!receiptUrl && (
          <div>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
              }}
              disabled={uploading}
              className="sr-only"
              id="receipt-upload"
            />
            <label
              htmlFor="receipt-upload"
              className={cn(
                "flex flex-col items-center justify-center",
                "w-full h-32 rounded-2xl",
                "border-2 border-dashed border-ink/20",
                "bg-white hover:bg-cream-50 hover:border-ink/40",
                "cursor-pointer transition",
                uploading && "opacity-50 pointer-events-none"
              )}
            >
              {uploading ? (
                <>
                  <span className="animate-spin inline-block w-8 h-8 border-[3px] border-ink/20 border-t-ink rounded-full mb-2" />
                  <span className="text-sm text-ink/60 font-lalezar">
                    جاري رفع الصورة...
                  </span>
                </>
              ) : (
                <>
                  <svg
                    className="w-10 h-10 text-ink/40 mb-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  <span className="font-lalezar text-base text-ink">
                    اضغط لرفع صورة الإيصال
                  </span>
                  <span className="text-xs text-ink/50 font-lalezar mt-1">
                    PNG أو JPG، الحد الأقصى 5 ميجا
                  </span>
                </>
              )}
            </label>
          </div>
        )}

        {receiptUrl && (
          <div className="space-y-2">
            <div className="relative w-full aspect-[3/4] sm:aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-ink/10 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={receiptUrl}
                alt="إيصال التحويل"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-emerald-700 font-lalezar flex items-center gap-1.5">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    d="M4 10l4 4 8-8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                تم رفع الصورة بنجاح
              </p>

              <button
                type="button"
                onClick={handleRemove}
                className="text-xs text-rose-600 hover:text-rose-700 font-lalezar"
              >
                استبدال الصورة
              </button>
            </div>
          </div>
        )}

        {error && (
          <p className="text-sm text-rose-600 font-lalezar text-center">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

function ChannelCard({
  name,
  number,
  color,
  icon,
}: {
  name: string;
  number: string;
  color: string;
  icon: string;
}) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(number);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="
        relative w-full rounded-2xl bg-white ring-1 ring-ink/10
        p-3 text-right hover:bg-cream-50 transition group
      "
    >
      <span
        className="absolute top-3 left-3 w-2.5 h-2.5 rounded-full"
        style={{ background: color }}
      />
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{icon}</span>
        <span className="font-lalezar text-sm text-ink">{name}</span>
      </div>
      <p
        className="font-lalezar text-xs text-ink/70 break-all"
        dir="ltr"
        style={{ textAlign: "left" }}
      >
        {number}
      </p>
      <span className="text-[10px] text-ink/40 font-lalezar mt-1 block">
        {copied ? "✓ تم النسخ" : "اضغط للنسخ"}
      </span>
    </button>
  );
}