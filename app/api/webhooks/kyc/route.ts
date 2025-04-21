import { type NextRequest, NextResponse } from "next/server"

import prisma from "@/lib/prisma"

// Webhook to receive KYC status updates from provider
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // In a real implementation, you would verify the webhook signature

    const { userId, status, verificationId } = await request.json()

    // Validate input
    if (!userId || !status || !verificationId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Update user's KYC status
    await prisma.user.update({
      where: {
        id: Number.parseInt(userId),
      },
      data: {
        kyc_status: status,
      },
    })

    return NextResponse.json({
      success: true,
      message: "KYC status updated",
    })
  } catch (error) {
    console.error("Error processing KYC webhook:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
