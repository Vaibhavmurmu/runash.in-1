import { neon } from "@neondatabase/serverless"

let sql: any = null

export function getDb() {
  if (!sql) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is not set")
    }
    sql = neon(process.env.DATABASE_URL)
  }
  return sql
}

export async function queryDb(query: string, params?: any[]) {
  try {
    const db = getDb()
    const result = await db(query, params)
    return { data: result, error: null }
  } catch (error) {
    console.error("[DB Error]", error)
    return { data: null, error }
  }
}
