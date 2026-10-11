// app/components/section/ContactContent.tsx
"use client";

import { useState } from "react";
import { Sheet } from "./Sheet";
import { submitContact } from "@/app/actions/contact";

type Status = "idle" | "loading" | "success" | "error";

export function ContactContent() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "استفسار عن منتج",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      await submitContact(form);
      setStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "استفسار عن منتج",
        message: "",
      });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err: any) {
      setError(err?.message ?? "حدث خطأ، حاول مرة أخرى.");
      setStatus("error");
    }
  }

  return (
    <>
      {/* ============ 1. HEADER ============ */}
      <Sheet layer={10}>
        <div className="max-w-[720px] mx-auto space-y-4 text-center">
          <h1 className="font-lalezar text-3xl sm:text-4xl text-ink">
            لمعرفة العروض تواصل معنا
          </h1>
          <p className="text-ink/70 leading-relaxed max-w-[520px] mx-auto">
            عندك سؤال عن منتج؟ محتاج مساعدة في اختيار؟ أو حابب تزور معرضنا؟
            فريقنا جاهز يساعدك في أي وقت.
          </p>
        </div>
      </Sheet>

      {/* ============ 2. QUICK CONTACT METHODS ============ */}
      <Sheet layer={20}>
        <div className="max-w-[720px] mx-auto">
          <div className="grid gap-4 sm:grid-cols-3">
            <ContactMethod
              icon="phone"
              label="اتصل بنا"
              value="+20 12 1430 8629"
              href="tel:+201214308629"
            />
            <ContactMethod
              icon="whatsapp"
              label="واتساب"
              value="ابدأ محادثة"
              href="https://wa.me/201214308629"
              external
            />
            <ContactMethod
              icon="mail"
              label="البريد الإلكتروني"
              value="alhelal.furniture@gmail.com"
              href="mailto:alhelal.furniture@gmail.com"
            />
          </div>
        </div>
      </Sheet>

      {/* ============ 3. FORM ============ */}
      <Sheet layer={30}>
        <div className="max-w-[560px] mx-auto space-y-6">
          <h2 className="font-lalezar text-2xl sm:text-3xl text-ink text-center">
            أرسل رسالة
          </h2>

          {status === "success" && (
            <div className="rounded-2xl bg-emerald-50 text-emerald-700 px-4 py-3 text-sm text-center">
              ✓ تم إرسال رسالتك بنجاح. سنعاود التواصل معك قريباً.
            </div>
          )}

          {status === "error" && error && (
            <div className="rounded-2xl bg-rose-50 text-rose-700 px-4 py-3 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Field
              label="الاسم الكامل"
              required
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="البريد الإلكتروني"
                type="email"
                required
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
              />
              <Field
                label="رقم الهاتف (اختياري)"
                type="tel"
                value={form.phone}
                onChange={(v) => setForm({ ...form, phone: v })}
                placeholder="01xxxxxxxxx"
              />
            </div>

            <label className="block">
              <span className="block mb-1.5 text-sm text-ink/60 font-lalezar">
                الموضوع
              </span>
              <select
                value={form.subject}
                onChange={(e) =>
                  setForm({ ...form, subject: e.target.value })
                }
                className="
                  w-full h-12 rounded-full px-4
                  bg-white ring-1 ring-ink/10
                  font-lalezar text-base text-ink
                  focus:outline-none focus:ring-2 focus:ring-ink/30
                  appearance-none
                "
              >
                <option>استفسار عن منتج</option>
                <option>متابعة طلب</option>
                <option>شكوى</option>
                <option>اقتراح</option>
                <option>أخرى</option>
              </select>
            </label>

            <label className="block">
              <span className="block mb-1.5 text-sm text-ink/60 font-lalezar">
                الرسالة
              </span>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                className="
                  w-full rounded-3xl px-4 py-3
                  bg-white ring-1 ring-ink/10
                  font-lalezar text-base text-ink
                  focus:outline-none focus:ring-2 focus:ring-ink/30
                  resize-none
                "
              />
            </label>

            <button
              type="submit"
              disabled={status === "loading"}
              className="
                w-full h-14 rounded-full
                bg-ink text-white font-lalezar text-lg
                hover:bg-ink/90 active:scale-[0.99]
                disabled:opacity-50 disabled:cursor-not-allowed
                transition
              "
            >
              {status === "loading" ? "..." : "إرسال الرسالة"}
            </button>
          </form>
        </div>
      </Sheet>

      {/* ============ 4. LOCATION / HOURS ============ */}
      <Sheet layer={40}>
        <div className="max-w-[720px] mx-auto space-y-6">
          <h2 className="font-lalezar text-2xl sm:text-3xl text-ink text-center">
            زور معرضنا
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[28px] bg-white/60 ring-1 ring-ink/10 p-5 space-y-2 text-right">
              <h3 className="font-lalezar text-lg text-ink">العنوان</h3>
              <p className="text-sm text-ink/70 leading-relaxed">
                مكتبة الهواري 4ش117من شارع العشرين خلف حديقة بدر، 4ش 117من شارع العشرين خلف حديقة بدر, Gesr Al Suez
                <br />
                {/* مول المحور، الدور الثاني */}
                <br />
                مصر
              </p>
            </div>

            <div className="rounded-[28px] bg-white/60 ring-1 ring-ink/10 p-5 space-y-2 text-right">
              <h3 className="font-lalezar text-lg text-ink">ساعات العمل</h3>
              <ul className="text-sm text-ink/70 space-y-1">
                <li>السبت – الخميس: 10 ص – 10 م</li>
                <li>الجمعة: 2 م – 10 م</li>
              </ul>
            </div>
          </div>

          {/* Map placeholder — swap with an embed if you want */}
          <div className="relative w-full aspect-[16/9] rounded-[28px] overflow-hidden bg-white/40 ring-1 ring-ink/10 grid place-items-center">
            <div className="text-center space-y-2 px-6">
              <p className="font-lalezar text-ink text-lg">
                📍 القاهرة الجديدة
              </p>
              <a
                href="https://www.google.com/maps/place/30%C2%B008'17.2%22N+31%C2%B021'59.8%22E/@30.1381186,31.3640425,17z/data=!3m1!4b1!4m4!3m3!8m2!3d30.1381186!4d31.3666174?hl=en&entry=ttu&g_ep=EgoyMDI2MTAwNy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-block px-6 h-11 leading-[44px]
                  rounded-full bg-ink text-white
                  font-lalezar text-sm
                  hover:bg-ink/90 transition
                "
              >
                افتح في خرائط جوجل
              </a>
            </div>
          </div>
        </div>
      </Sheet>
    </>
  );
}

/* ============ Small pieces ============ */

function ContactMethod({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: "phone" | "whatsapp" | "mail";
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="
        group rounded-[28px] bg-white/60 ring-1 ring-ink/10
        p-5 flex flex-col items-center text-center gap-3
        hover:bg-white transition
      "
    >
      <span className="w-12 h-12 grid place-items-center rounded-full bg-ink text-white">
        <ContactIcon name={icon} />
      </span>
      <span className="font-lalezar text-ink text-base">{label}</span>
      <span
        dir="ltr"
        className="text-sm text-ink/60 group-hover:text-ink transition"
      >
        {value}
      </span>
    </a>
  );
}

function ContactIcon({ name }: { name: "phone" | "whatsapp" | "mail" }) {
  const common = {
    viewBox: "0 0 24 24",
    className: "w-5 h-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (name === "phone") {
    return (
      <svg {...common}>
        <path d="M5 4h3l1.5 4-2 1.5a11 11 0 0 0 7 7l1.5-2 4 1.5V19a2 2 0 0 1-2.2 2A15 15 0 0 1 3 6.2 2 2 0 0 1 5 4z" />
      </svg>
    );
  }
  if (name === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4 0-.6.1-.8s.3-.3.4-.5.1-.3 0-.5l-.7-1.7c-.2-.5-.4-.4-.6-.4h-.5a1.1 1.1 0 0 0-.8.4 3.3 3.3 0 0 0-1 2.4 5.8 5.8 0 0 0 1.2 3 12 12 0 0 0 4.6 4.1c1.6.7 2.2.7 3 .6.5-.1 1.5-.6 1.7-1.2s.2-1.1.1-1.2z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block mb-1.5 text-sm text-ink/60 font-lalezar">
        {label}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full h-12 rounded-full px-4
          bg-white ring-1 ring-ink/10
          font-lalezar text-base text-ink
          focus:outline-none focus:ring-2 focus:ring-ink/30
        "
        dir={type === "tel" ? "ltr" : undefined}
      />
    </label>
  );
}