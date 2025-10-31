import { getOrders } from "@/lib/server-actions"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const sellerId = searchParams.get("sellerId")
    const status = searchParams.get("status")

    if (!sellerId) {
      return Response.json({ error: "Missing sellerId" }, { status: 400 })
    }

    const { data, error } = await getOrders(sellerId, status || undefined)

    if (error) {
      return Response.json({ error: "Failed to fetch orders" }, { status: 500 })
    }

    return Response.json({ data })
  } catch (error) {
    console.error("[Orders API Error]", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
