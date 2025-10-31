import { getProducts, createProduct } from "@/lib/server-actions"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const sellerId = searchParams.get("sellerId")

    if (!sellerId) {
      return Response.json({ error: "Missing sellerId" }, { status: 400 })
    }

    const { data, error } = await getProducts(sellerId)

    if (error) {
      return Response.json({ error: "Failed to fetch products" }, { status: 500 })
    }

    return Response.json({ data })
  } catch (error) {
    console.error("[Products API Error]", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { sellerId, ...productData } = await req.json()

    if (!sellerId) {
      return Response.json({ error: "Missing sellerId" }, { status: 400 })
    }

    const { data, error } = await createProduct(sellerId, productData)

    if (error) {
      return Response.json({ error: "Failed to create product" }, { status: 500 })
    }

    return Response.json({ data: data?.[0] }, { status: 201 })
  } catch (error) {
    console.error("[Create Product Error]", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
