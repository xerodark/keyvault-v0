import { type NextRequest, NextResponse } from "next/server"
import { withRoleCheck } from "@/middleware/rbac"
import prisma from "@/lib/prisma"

// GET /api/admin/fund-snapshots - Get all fund snapshots
export async function GET(request: NextRequest): Promise<NextResponse> {
  return withRoleCheck(
    request,
    async () => {
      try {
        const snapshots = await prisma.fundSnapshot.findMany({
          orderBy: {
            timestamp: "desc",
          },
        })

        return NextResponse.json({
          success: true,
          data: snapshots,
        })
      } catch (error) {
        console.error("Error fetching fund snapshots:", error)
        return NextResponse.json({ success: false, error: "Failed to fetch fund snapshots" }, { status: 500 })
      }
    },
    "admin",
  )
}

// POST /api/admin/fund-snapshots - Create a new fund snapshot
export async function POST(request: NextRequest): Promise<NextResponse> {
  return withRoleCheck(
    request,
    async () => {
      try {
        const { quarter } = await request.json()

        if (!quarter) {
          return NextResponse.json({ success: false, error: "Quarter is required" }, { status: 400 })
        }

        // Calculate total AUM from all portfolios
        const portfolios = await prisma.portfolio.findMany()
        const totalAUM = portfolios.reduce((sum, portfolio) => {
          return sum + Number(portfolio.current_value)
        }, 0)

        // Calculate NAV (simplified)
        // In a real implementation, this would be more complex
        const nav = 1.0 + Math.random() * 0.1 // Placeholder

        // Create a new fund snapshot
        const snapshot = await prisma.fundSnapshot.create({
          data: {
            timestamp: new Date(),
            quarter,
            total_aum: totalAUM,
            nav,
          },
        })

        return NextResponse.json({
          success: true,
          data: snapshot,
        })
      } catch (error) {
        console.error("Error creating fund snapshot:", error)
        return NextResponse.json({ success: false, error: "Failed to create fund snapshot" }, { status: 500 })
      }
    },
    "admin",
  )
}
