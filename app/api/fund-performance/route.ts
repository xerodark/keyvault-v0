import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"

import prisma from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

// GET /api/fund-performance - Returns quarterly fund performance data
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions)

    // Check if user is authenticated
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "all" // all, year, quarter, month
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : 12

    // Build the where clause
    const where: any = {}

    if (period !== "all") {
      const today = new Date()
      const startDate = new Date()

      if (period === "year") {
        startDate.setFullYear(today.getFullYear() - 1)
      } else if (period === "quarter") {
        startDate.setMonth(today.getMonth() - 3)
      } else if (period === "month") {
        startDate.setMonth(today.getMonth() - 1)
      }

      where.date = {
        gte: startDate,
      }
    }

    const performance = await prisma.fundPerformance.findMany({
      where,
      orderBy: {
        date: "desc",
      },
      take: limit,
    })

    return NextResponse.json(performance)
  } catch (error) {
    console.error("Error fetching fund performance:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
