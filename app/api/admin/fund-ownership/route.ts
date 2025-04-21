import { type NextRequest, NextResponse } from "next/server"
import { withRoleCheck } from "@/middleware/rbac"
import prisma from "@/lib/prisma"

// GET /api/admin/fund-ownership - Get all users and their fund ownership percentages
export async function GET(request: NextRequest): Promise<NextResponse> {
  return withRoleCheck(
    request,
    async () => {
      try {
        const portfolios = await prisma.portfolio.findMany({
          select: {
            user_id: true,
            fund_share_percent: true,
            initial_investment: true,
            current_value: true,
            user: {
              select: {
                name: true,
                email: true,
                kyc_status: true,
              },
            },
          },
          orderBy: {
            fund_share_percent: "desc",
          },
        })

        // Calculate total fund value
        const fundSnapshot = await prisma.fundSnapshot.findFirst({
          orderBy: {
            timestamp: "desc",
          },
        })

        return NextResponse.json({
          success: true,
          data: {
            portfolios,
            totalFundValue: fundSnapshot?.total_aum || 0,
          },
        })
      } catch (error) {
        console.error("Error fetching fund ownership data:", error)
        return NextResponse.json({ success: false, error: "Failed to fetch fund ownership data" }, { status: 500 })
      }
    },
    "admin",
  )
}
