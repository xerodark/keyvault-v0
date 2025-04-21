import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema"

// Create a SQL client with the database URL from environment variables
const sql = neon(process.env.DATABASE_URL!)

// Create a drizzle client with the schema
export const db = drizzle(sql, { schema })

// Helper function to execute raw SQL queries (for backward compatibility)
export async function executeQuery(query: string, params: any[] = []) {
  try {
    return await sql.query(query, params)
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}
