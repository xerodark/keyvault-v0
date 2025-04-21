import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { users, portfolios } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import type { ApiResponse, Portfolio } from "@/lib/db/types"

// GET /api/users/[id]/portfolio - Get a user's portfolio
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<ApiResponse<Portfolio>>> {
  try {
    const userId = Number.parseInt(params.id)

    // Check if user exists
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    })

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }

    // Get user's portfolio
    const portfolio = await db.query.portfolios.findFirst({
      where: eq(portfolios.userId, userId),
    })

    if (!portfolio) {
      return NextResponse.json({ success: false, error: "Portfolio not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: portfolio })
  } catch (error) {
    console.error("Error fetching portfolio:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch portfolio" }, { status: 500 })
  }
}

// PUT /api/users/[id]/portfolio - Update a user's portfolio
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<ApiResponse<Portfolio>>> {
  try {
    const userId = Number.parseInt(params.id)
    const { usdcBalance, fundSharePercent, initialInvestment, currentValue, unrealizedGains } = await request.json()

    // Check if user exists
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    })

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }

    // Get existing portfolio
    const existingPortfolio = await db.query.portfolios.findFirst({
      where: eq(portfolios.userId, userId),
    })

    if (!existingPortfolio) {
      // Create portfolio if it doesn't exist
      const [newPortfolio] = await db
        .insert(portfolios)
        .values({
          userId,
          usdcBalance: usdcBalance || 0,
          fundSharePercent: fundSharePercent || 0,
          initialInvestment: initialInvestment || 0,
          currentValue: currentValue || 0,
          unrealizedGains: unrealizedGains || 0,
        })
        .returning()

      return NextResponse.json({ success: true, data: newPortfolio })
    }

    // Update existing portfolio
    const [updatedPortfolio] = await db
      .update(portfolios)
      .set({
        usdcBalance: usdcBalance !== undefined ? usdcBalance : existingPortfolio.usdcBalance,
        fundSharePercent: fundSharePercent !== undefined ? fundSharePercent : existingPortfolio.fundSharePercent,
        initialInvestment: initialInvestment !== undefined ? initialInvestment : existingPortfolio.initialInvestment,
        currentValue: currentValue !== undefined ? currentValue : existingPortfolio.currentValue,
        unrealizedGains: unrealizedGains !== undefined ? unrealizedGains : existingPortfolio.unrealizedGains,
        updatedAt: new Date(),
      })
      .where(eq(portfolios.userId, userId))
      .returning()

    return NextResponse.json({ success: true, data: updatedPortfolio })
  } catch (error) {
    console.error("Error updating portfolio:", error)
    return NextResponse.json({ success: false, error: "Failed to update portfolio" }, { status: 500 })
  }
}
