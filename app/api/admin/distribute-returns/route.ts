import { type NextRequest, NextResponse } from "next/server"
import { withRoleCheck } from "@/middleware/rbac"
import prisma from "@/lib/prisma"

// POST /api/admin/distribute-returns - Calculate and distribute returns for a specific period
export async function POST(request: NextRequest): Promise<NextResponse> {
  return withRoleCheck(
    request,
    async () => {
      try {
        const { period } = await request.json()

        if (!period) {
          return NextResponse.json({ success: false, error: "Period is required" }, { status: 400 })
        }

        // Get the two most recent snapshots for the specified period
        const snapshots = await prisma.fundSnapshot.findMany({
          where: {
            quarter: period,
          },
          orderBy: {
            timestamp: "desc",
          },
          take: 1,
        })

        if (snapshots.length === 0) {
          return NextResponse.json(
            { success: false, error: "No fund snapshot found for the specified period" },
            { status: 404 },
          )
        }

        const currentSnapshot = snapshots[0]

        // Get the previous snapshot
        const previousPeriod = getPreviousPeriod(period)
        const previousSnapshot = await prisma.fundSnapshot.findFirst({
          where: {
            quarter: previousPeriod,
          },
          orderBy: {
            timestamp: "desc",
          },
        })

        if (!previousSnapshot) {
          return NextResponse.json(
            { success: false, error: "No previous snapshot found for comparison" },
            { status: 404 },
          )
        }

        // Calculate fund performance
        const fundPerformance = Number(currentSnapshot.total_aum) - Number(previousSnapshot.total_aum)
        const performancePercent = (Number(fundPerformance) / Number(previousSnapshot.total_aum)) * 100

        // Get all portfolios
        const portfolios = await prisma.portfolio.findMany({
          include: {
            user: true,
          },
        })

        // Calculate and create performance reports for each user
        const reports = []
        for (const portfolio of portfolios) {
          // Only create reports for users with the right reporting frequency
          const shouldReport =
            (portfolio.user.reporting_frequency === "quarterly" && period.includes("Q")) ||
            (portfolio.user.reporting_frequency === "annual" && period.includes("Annual"))

          if (shouldReport) {
            // Calculate user's gain/loss based on their fund share
            const userGainLoss = (Number(fundPerformance) * Number(portfolio.fund_share_percent)) / 100

            // Create performance report
            const report = await prisma.performanceReport.create({
              data: {
                user_id: portfolio.user_id,
                period,
                gain_loss: userGainLoss,
              },
            })

            reports.push(report)
          }
        }

        return NextResponse.json({
          success: true,
          data: {
            period,
            fundPerformance,
            performancePercent,
            reportsCreated: reports.length,
          },
        })
      } catch (error) {
        console.error("Error distributing returns:", error)
        return NextResponse.json({ success: false, error: "Failed to distribute returns" }, { status: 500 })
      }
    },
    "admin",
  )
}

// Helper function to get the previous period
function getPreviousPeriod(period: string): string {
  // Example: "2025-Q2" -> "2025-Q1" or "2024-Q4"
  const [year, quarter] = period.split("-")

  if (quarter === "Q1") {
    return `${Number(year) - 1}-Q4`
  } else if (quarter === "Q2") {
    return `${year}-Q1`
  } else if (quarter === "Q3") {
    return `${year}-Q2`
  } else if (quarter === "Q4") {
    return `${year}-Q3`
  } else if (quarter === "Annual") {
    return `${Number(year) - 1}-Annual`
  }

  return period
}
