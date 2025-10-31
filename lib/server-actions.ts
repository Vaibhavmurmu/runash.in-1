"use server"

import { getDb, queryDb } from "./db"

// Products
export async function getProducts(sellerId: string) {
  return queryDb("SELECT * FROM products WHERE seller_id = $1 ORDER BY created_at DESC", [sellerId])
}

export async function getProduct(id: string) {
  return queryDb("SELECT * FROM products WHERE id = $1", [id])
}

export async function createProduct(sellerId: string, data: any) {
  const { name, sku, description, category, price, cost, stock_quantity } = data

  return queryDb(
    `INSERT INTO products 
     (seller_id, name, sku, description, category, price, cost, stock_quantity) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
     RETURNING *`,
    [sellerId, name, sku, description, category, price, cost, stock_quantity],
  )
}

export async function updateProduct(id: string, data: any) {
  const updates: string[] = []
  const values: any[] = []
  let paramCount = 1

  Object.entries(data).forEach(([key, value]) => {
    updates.push(`${key} = $${paramCount}`)
    values.push(value)
    paramCount++
  })

  values.push(id)

  return queryDb(
    `UPDATE products SET ${updates.join(", ")}, updated_at = CURRENT_TIMESTAMP 
     WHERE id = $${paramCount} 
     RETURNING *`,
    values,
  )
}

export async function deleteProduct(id: string) {
  return queryDb("DELETE FROM products WHERE id = $1 RETURNING *", [id])
}

// Orders
export async function getOrders(sellerId: string, status?: string) {
  if (status) {
    return queryDb(
      `SELECT o.*, c.name as customer_name, c.email as customer_email 
       FROM orders o 
       JOIN customers c ON o.customer_id = c.id 
       WHERE o.seller_id = $1 AND o.status = $2 
       ORDER BY o.created_at DESC`,
      [sellerId, status],
    )
  }

  return queryDb(
    `SELECT o.*, c.name as customer_name, c.email as customer_email 
     FROM orders o 
     JOIN customers c ON o.customer_id = c.id 
     WHERE o.seller_id = $1 
     ORDER BY o.created_at DESC`,
    [sellerId],
  )
}

export async function getOrder(id: string) {
  return queryDb(
    `SELECT o.*, c.name as customer_name, c.email as customer_email 
     FROM orders o 
     JOIN customers c ON o.customer_id = c.id 
     WHERE o.id = $1`,
    [id],
  )
}

export async function updateOrderStatus(orderId: string, status: string) {
  return queryDb("UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *", [
    status,
    orderId,
  ])
}

// Customers
export async function getCustomers(sellerId: string) {
  return queryDb("SELECT * FROM customers WHERE seller_id = $1 ORDER BY created_at DESC", [sellerId])
}

export async function getCustomer(id: string) {
  return queryDb("SELECT * FROM customers WHERE id = $1", [id])
}

export async function createCustomer(sellerId: string, data: any) {
  const { email, name, phone, address } = data

  return queryDb(
    `INSERT INTO customers (seller_id, email, name, phone, address) 
     VALUES ($1, $2, $3, $4, $5) 
     RETURNING *`,
    [sellerId, email, name, phone, address],
  )
}

// Dashboard metrics
export async function getDashboardMetrics(sellerId: string) {
  const db = getDb()

  try {
    const results = await Promise.all([
      db(
        "SELECT COUNT(*) as total, SUM(total_amount) as revenue FROM orders WHERE seller_id = $1 AND created_at >= NOW() - INTERVAL '30 days'",
        [sellerId],
      ),
      db(
        "SELECT COUNT(DISTINCT customer_id) as customers FROM orders WHERE seller_id = $1 AND created_at >= NOW() - INTERVAL '30 days'",
        [sellerId],
      ),
      db("SELECT COUNT(*) as products FROM products WHERE seller_id = $1", [sellerId]),
      db("SELECT AVG(total_amount) as avg_order FROM orders WHERE seller_id = $1", [sellerId]),
    ])

    return {
      data: {
        totalOrders: results[0][0]?.total || 0,
        totalRevenue: results[0][0]?.revenue || 0,
        totalCustomers: results[1][0]?.customers || 0,
        totalProducts: results[2][0]?.products || 0,
        avgOrderValue: results[3][0]?.avg_order || 0,
      },
      error: null,
    }
  } catch (error) {
    console.error("[Metrics Error]", error)
    return { data: null, error }
  }
}

// AI Interactions
export async function saveAIInteraction(sellerId: string, data: any) {
  const { interaction_type, query, response, tokens_used, model } = data

  return queryDb(
    `INSERT INTO ai_interactions 
     (seller_id, interaction_type, query, response, tokens_used, model) 
     VALUES ($1, $2, $3, $4, $5, $6) 
     RETURNING *`,
    [sellerId, interaction_type, query, response, tokens_used, model],
  )
}

export async function getAIInteractionHistory(sellerId: string, limit = 20) {
  return queryDb("SELECT * FROM ai_interactions WHERE seller_id = $1 ORDER BY created_at DESC LIMIT $2", [
    sellerId,
    limit,
  ])
}
