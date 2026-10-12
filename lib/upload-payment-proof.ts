export async function uploadPaymentProof(
  file: File,
  meta?: {
    orderId?: string
    customerName?: string
    amount?: number
    currency?: string
  }
) {
  const fd = new FormData()
  fd.append("file", file)
  if (meta?.orderId) fd.append("order_id", meta.orderId)
  if (meta?.customerName) fd.append("customer_name", meta.customerName)
  if (meta?.amount != null) fd.append("amount", String(meta.amount))
  if (meta?.currency) fd.append("currency", meta.currency)

  const res = await fetch("/api/upload-receipt", { method: "POST", body: fd })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error ?? "فشل رفع الصورة")
  }
  return res.json() as Promise<{ url: string; file_id: string; message_id: number }>
}