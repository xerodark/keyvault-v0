import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getServerSession } from "next-auth/next"
import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { authOptions } from "@/lib/auth"

export async function withRoleCheck(
  request: NextRequest,
  handler: (req: NextRequest) => Promise<NextResponse>,
  requiredRole: "admin" | "user" = "user",
): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions)

    // Check if user is authenticated
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user from database to check role
    const user = await db.query.users.findFirst({
      where: eq(users.id, Number.parseInt(session.user.id)),
      columns: {
        id: true,
        role: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Check if user has required role
    if (requiredRole === "admin" && user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 })
    }

    // User has required role, proceed with handler
    return handler(request)
  } catch (error) {
    console.error("Error in RBAC middleware:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
