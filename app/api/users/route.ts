import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { users, portfolios } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import type { ApiResponse, User } from "@/lib/db/types"

// GET /api/users - Get all users
export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<User[]>>> {
  try {
    const allUsers = await db.query.users.findMany({
      orderBy: (users, { desc }) => [desc(users.createdAt)],
    })

    return NextResponse.json({ success: true, data: allUsers })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch users" }, { status: 500 })
  }
}

// POST /api/users - Create a new user
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<User>>> {
  try {
    const { name, email, kycStatus, walletAddress } = await request.json()

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json({ success: false, error: "Name and email are required" }, { status: 400 })
    }

    // Check if email already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    })

    if (existingUser) {
      return NextResponse.json({ success: false, error: "Email already exists" }, { status: 400 })
    }

    // Insert new user
    const [newUser] = await db
      .insert(users)
      .values({
        name,
        email,
        kycStatus: kycStatus || "pending",
        walletAddress: walletAddress || null,
      })
      .returning()

    // Create an empty portfolio for the new user
    if (newUser) {
      await db.insert(portfolios).values({
        userId: newUser.id,
        usdcBalance: 0,
        fundSharePercent: 0,
        initialInvestment: 0,
        currentValue: 0,
        unrealizedGains: 0,
      })
    }

    return NextResponse.json({ success: true, data: newUser })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ success: false, error: "Failed to create user" }, { status: 500 })
  }
}
