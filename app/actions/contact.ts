// app/actions/contact.ts
"use server";

interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export async function submitContact(form: ContactForm) {
  // Basic validation
  if (!form.name?.trim() || !form.email?.trim() || !form.message?.trim()) {
    throw new Error("جميع الحقول المطلوبة يجب أن تُملأ.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    throw new Error("البريد الإلكتروني غير صالح.");
  }

  // 🔌 Replace this with your real destination:
  // - Send via Resend / SendGrid / Postmark
  // - Save to Medusa custom module
  // - Post to a Discord/Slack webhook
  // - Save to a Google Sheet via Apps Script
  //
  // For now: log it (visible in Vercel/Render logs)
  console.log("[contact form]", form);

  // Simulate network delay
  await new Promise((r) => setTimeout(r, 500));

  return { ok: true };
}