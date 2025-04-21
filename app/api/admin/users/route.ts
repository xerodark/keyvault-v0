import { type NextRequest, NextResponse } from "next/server"
import { withRoleCheck } from "@/middleware/rbac"
import prisma from "@/lib/prisma"


// GET /api/admin/users - Get all users with their portfolio data
export async function GET(request: NextRequest): Promise<NextResponse> {
  return withRoleCheck(
    request,
    async () => {
      try {
        const users = await prisma.user.findMany({
          include: {
            portfolio: {
              select: {
                usdc_balance: true,
                fund_share_percent: true,
                initial_investment: true,
                current_value: true,
                unrealized_gains: true,
              },
            },
          },
          orderBy: {
            created_at: "desc",
          },
        })

        return NextResponse.json({
          success: true,
          data: users,
        })
      } catch (error) {
        console.error("Error fetching users:", error)
        return NextResponse.json({ success: false, error: "Failed to fetch users" }, { status: 500 })
      }
    },
    "admin",
  )
}

// POST /api/admin/users - Update user role
export async function POST(request: NextRequest): Promise<NextResponse> {
  return withRoleCheck(
    request,
    async () => {
      try {
        const { userId, role } = await request.json()

        if (!userId || !role) {
          return NextResponse.json({ success: false, error: "User ID and role are required" }, { status: 400 })
        }

        // Validate role
        if (role !== "user" && role !== "admin") {
          return NextResponse.json({ success: false, error: "Invalid role" }, { status: 400 })
        }

        const updatedUser = await prisma.user.update({
          where: {
            id: Number.parseInt(userId),
          },
          data: {
            role,
          },
        })

        return NextResponse.json({
          success: true,
          data: updatedUser,
        })
      } catch (error) {
        console.error("Error updating user role:", error)
        return NextResponse.json({ success: false, error: "Failed to update user role" }, { status: 500 })
      }
    },
    "admin",
  )
}
