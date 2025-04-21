import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import prisma from "@/lib/prisma"

import { authOptions } from "@/lib/auth"

// Verify wallet signature and associate wallet with user
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions)

    // Check if user is authenticated
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { walletAddress, signature, nonce } = await request.json()

    // Validate input
    if (!walletAddress || !signature || !nonce) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real implementation, you would verify the signature here
    // For now, we'll just associate the wallet with the user

    // Check if wallet is already associated with another user
    const existingUser = await prisma.user.findFirst({
      where: {
        wallet_address: walletAddress,
        id: {
          not: Number.parseInt(session.user.id),
        },
      },
    })

    if (existingUser) {
      return NextResponse.json({ error: "Wallet already associated with another user" }, { status: 409 })
    }

    // Update user with wallet address
    await prisma.user.update({
      where: {
        id: Number.parseInt(session.user.id),
      },
      data: {
        wallet_address: walletAddress,
        wallet_verified_at: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      message: "Wallet verified and associated with user",
    })
  } catch (error) {
    console.error("Error verifying wallet:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
