export async function GET(
  _req: Request,
  { params }: { params: Promise<{ fileId: string }> }
) {
  const { fileId } = await params;

  const botToken = process.env.TG_BOT_TOKEN;
  if (!botToken) {
    return new Response("Server not configured", { status: 500 });
  }

  // 1. Ask Telegram for the file path
  const metaRes = await fetch(
    `https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`
  );
  const meta = await metaRes.json();
  if (!meta.ok) {
    return new Response("File not found", { status: 404 });
  }

  // 2. Stream the actual image bytes
  const fileRes = await fetch(
    `https://api.telegram.org/file/bot${botToken}/${meta.result.file_path}`
  );
  if (!fileRes.ok || !fileRes.body) {
    return new Response("Failed to fetch file", { status: 502 });
  }

  return new Response(fileRes.body, {
    status: 200,
    headers: {
      "Content-Type": fileRes.headers.get("content-type") ?? "image/jpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}