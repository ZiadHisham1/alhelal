import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "لم يتم استلام صورة" },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "الملف ليس صورة" },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "حجم الصورة أكبر من 5 ميجا" },
        { status: 400 }
      );
    }

    const apiKey = process.env.IMGBB_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "خدمة رفع الصور غير مهيأة" },
        { status: 500 }
      );
    }

    // Convert to base64
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");

    // Upload to imgbb
    const form = new FormData();
    form.append("key", apiKey);
    form.append("image", base64);
    form.append("expiration", "0");

    const res = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: form,
    });

    const data = await res.json();

    if (!data.success) {
      console.error("[upload-receipt] imgbb error:", data);
      return NextResponse.json(
        { error: data.error?.message ?? "فشل رفع الصورة" },
        { status: 500 }
      );
    }

    const url = data.data.display_url || data.data.url;
    return NextResponse.json({ url });
  } catch (e: any) {
    console.error("[upload-receipt] failed:", e);
    return NextResponse.json(
      { error: e?.message ?? "فشل رفع الصورة" },
      { status: 500 }
    );
  }
}