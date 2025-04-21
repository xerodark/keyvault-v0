import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { users, portfolios, transactions, fundPerformance } from "@/lib/db/schema"
import { eq, desc } from "drizzle-orm"
import type { ApiResponse } from "@/lib/db/types"

// GET /api/dashboard/:id - Get dashboard data for a specific user
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<ApiResponse<any>>> {
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

    // Get user's recent transactions
    const recentTransactions = await db.query.transactions.findMany({
      where: eq(transactions.userId, userId),
      orderBy: [desc(transactions.createdAt)],
      limit: 5,
    })

    // Get fund performance data
    const fundPerformanceData = await db.query.fundPerformance.findMany({
      orderBy: [desc(fundPerformance.date)],
      limit: 12,
    })

    // Calculate total AUM
    const latestPerformance = fundPerformanceData.length > 0 ? fundPerformanceData[0] : null
    const totalAUM = latestPerformance ? Number.parseFloat(latestPerformance.aum.toString()) : 0

    // Format the response
    const dashboardData = {
      user,
      portfolio: portfolio || null,
      recentTransactions,
      fundPerformance: [...fundPerformanceData].reverse(), // Reverse to get chronological order
      totalAUM,
    }

    return NextResponse.json({ success: true, data: dashboardData })
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch dashboard data" }, { status: 500 })
  }
}
