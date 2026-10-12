import { NextResponse } from "next/server";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    // Extract all optional fields ONCE — nothing else references these names
    const orderId = (formData.get("order_id") as string) ?? "غير معروف";
    const customerName = (formData.get("customer_name") as string) ?? "عميل";
    const amount = (formData.get("amount") as string) ?? "?";
    const currency = (formData.get("currency") as string) ?? "ج.م";
    const phone = (formData.get("phone") as string) ?? "";
    const city = (formData.get("city") as string) ?? "";
    const address = (formData.get("address") as string) ?? "";

    if (!file) {
      return NextResponse.json(
        { error: "لم يتم استلام صورة" },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "الملف ليس صورة" }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "حجم الصورة أكبر من 5 ميجا" },
        { status: 400 }
      );
    }

    const botToken = process.env.TG_BOT_TOKEN;
    const chatId = process.env.TG_ADMIN_CHAT_ID;

    if (!botToken || !chatId) {
      return NextResponse.json(
        { error: "خدمة رفع الصور غير مهيأة" },
        { status: 500 }
      );
    }

    const caption =
      `💳 <b>إيصال دفع جديد</b>\n` +
      `🧾 الطلب: <code>${escapeHtml(String(orderId))}</code>\n` +
      `👤 ${escapeHtml(customerName)}\n` +
      (phone ? `📞 ${escapeHtml(phone)}\n` : "") +
      (city || address
        ? `📍 ${escapeHtml([address, city].filter(Boolean).join("، "))}\n`
        : "") +
      `💰 ${escapeHtml(`${amount} ${currency}`)}`;

    const tgForm = new FormData();
    tgForm.append("chat_id", chatId);
    tgForm.append("caption", caption);
    tgForm.append("parse_mode", "HTML");
    tgForm.append("photo", file, file.name || "receipt.jpg");

    const tgRes = await fetch(
      `https://api.telegram.org/bot${botToken}/sendPhoto`,
      { method: "POST", body: tgForm }
    );
    const tgData = await tgRes.json();

    if (!tgData.ok) {
      console.error("[upload-receipt] telegram error:", tgData);
      return NextResponse.json(
        { error: tgData.description ?? "فشل رفع الصورة" },
        { status: 500 }
      );
    }

    const photos = tgData.result.photo as Array<{ file_id: string }>;
    const fileId = photos[photos.length - 1].file_id;

    return NextResponse.json({
      url: `/api/receipt/${fileId}`,
      file_id: fileId,
      message_id: tgData.result.message_id,
    });
  } catch (e: any) {
    console.error("[upload-receipt] failed:", {
      message: e?.message,
      cause: e?.cause,
      code: e?.code,
      stack: e?.stack,
    });
    return NextResponse.json(
      { error: e?.cause?.message ?? e?.message ?? "فشل رفع الصورة" },
      { status: 500 }
    );
  }
}