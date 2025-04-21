import { type NextRequest, NextResponse } from "next/server"
import { hash } from "bcryptjs"

import prisma from "@/lib/prisma"
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashed_password: hashedPassword,
        kyc_status: "pending",
        bank_connection_status: false,
      },
    })

    // Create empty portfolio for the user
    await prisma.portfolio.create({
      data: {
        user_id: user.id,
      },
    })

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
    })
  } catch (error) {
    console.error("Error registering user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
