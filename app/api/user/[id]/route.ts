import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { authOptions } from "@/lib/auth"

// This file already uses [id], so it's consistent
// GET /api/user/:id - Returns user profile, KYC status, and wallet address
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

    const user = await db.query.users.findFirst({
      where: eq(users.id, Number.parseInt(params.id)),
      columns: {
        id: true,
        name: true,
        email: true,
        kycStatus: true,
        walletAddress: true,
        walletVerifiedAt: true,
        bankConnectionStatus: true,
        role: isAdmin ? true : undefined, // Only include role if admin
        reportingFrequency: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PUT /api/user/:id - Update user profile
export async function PUT(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
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

    // Check if user is updating their own data or is an admin
    const isAdmin = requestingUser.role === "admin"
    const isOwnData = session.user.id === params.id

    if (!isOwnData && !isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { name, email, reportingFrequency, role } = await request.json()

    // Only admins can update role
    if (role && !isAdmin) {
      return NextResponse.json({ error: "Forbidden: Cannot update role" }, { status: 403 })
    }

    // Update user
    const [updatedUser] = await db
      .update(users)
      .set({
        name,
        email,
        reportingFrequency,
        ...(isAdmin && role ? { role } : {}), // Only include role if admin
        updatedAt: new Date(),
      })
      .where(eq(users.id, Number.parseInt(params.id)))
      .returning()

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
