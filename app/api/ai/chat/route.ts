import { generateText } from "ai"
import { queryDb } from "@/lib/db"
import { saveAIInteraction } from "@/lib/server-actions"

export async function POST(req: Request) {
  try {
    const { message, sellerId } = await req.json()

    if (!message || !sellerId) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get seller context
    const { data: sellerData } = await queryDb("SELECT * FROM sellers WHERE id = $1", [sellerId])

    if (!sellerData || sellerData.length === 0) {
      return Response.json({ error: "Seller not found" }, { status: 404 })
    }

    const seller = sellerData[0]

    // Get recent metrics for context
    const { data: metrics } = await queryDb(
      `SELECT 
        COUNT(DISTINCT o.id) as orders,
        SUM(o.total_amount) as revenue,
        COUNT(DISTINCT c.id) as customers,
        COUNT(p.id) as products
       FROM orders o
       LEFT JOIN customers c ON o.customer_id = c.id
       LEFT JOIN products p ON p.seller_id = $1
       WHERE o.seller_id = $1 AND o.created_at >= NOW() - INTERVAL '30 days'`,
      [sellerId],
    )

    const context = `
You are an AI assistant for a seller dashboard. Current business metrics:
- Orders (30 days): ${metrics?.[0]?.orders || 0}
- Revenue (30 days): $${metrics?.[0]?.revenue || 0}
- Customers: ${metrics?.[0]?.customers || 0}
- Products: ${metrics?.[0]?.products || 0}
- Seller: ${seller.company_name || seller.name}

Help the seller with:
1. Business insights and recommendations
2. Product and order management
3. Customer analytics
4. Workflow automation suggestions
5. Sales optimization tips

Be concise, actionable, and professional.
    `

    // Generate AI response
    const { text } = await generateText({
      model: "openai/gpt-4-turbo",
      messages: [
        {
          role: "user",
          content: `${context}\n\nUser query: ${message}`,
        },
      ],
      temperature: 0.7,
      maxTokens: 1000,
    })

    // Save interaction to database
    await saveAIInteraction(sellerId, {
      interaction_type: "chat",
      query: message,
      response: text,
      tokens_used: Math.ceil(message.length / 4 + text.length / 4),
      model: "gpt-4-turbo",
    })

    return Response.json({
      response: text,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[AI Chat Error]", error)
    return Response.json({ error: "Failed to process request" }, { status: 500 })
  }
}
