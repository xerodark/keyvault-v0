import { NextResponse } from "next/server"
import { seedDatabase } from "@/scripts/seed-data"

// POST /api/seed - Seed the database with sample data
export async function POST() {
  try {
    const result = await seedDatabase()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json({ success: false, error: "Failed to seed database" }, { status: 500 })
  }
}

// GET /api/seed - Also allow seeding via GET for easier testing
export async function GET() {
  try {
    const result = await seedDatabase()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json({ success: false, error: "Failed to seed database" }, { status: 500 })
  }
}
