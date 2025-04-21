import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { db } from "@/lib/db"
import { performanceReports, users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { authOptions } from "@/lib/auth"

// GET /api/performance-reports/:id - Returns performance reports for a user
export async function GET(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions)

    // Check if user is authenticated
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get the requesting user to check role
    const requestingUser = await db.query.users.findFirst({
      where: eq(users.id, Number.parseInt(session.user.id)),
      columns: {
        id: true,
        role: true,
      },
    })

    if (!requestingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Check if user is requesting their own data or is an admin
    const isAdmin = requestingUser.role === "admin"
    const isOwnData = session.user.id === params.id

    if (!isOwnData && !isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const reports = await db.query.performanceReports.findMany({
      where: eq(performanceReports.userId, Number.parseInt(params.id)),
      orderBy: (performanceReports, { desc }) => [desc(performanceReports.createdAt)],
    })

    return NextResponse.json({
      success: true,
      data: reports,
    })
  } catch (error) {
    console.error("Error fetching performance reports:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
