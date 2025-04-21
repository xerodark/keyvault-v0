import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { randomBytes } from "crypto"
import { authOptions } from "@/lib/auth"

// Generate a nonce for wallet signature
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions)

    // Check if user is authenticated
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Generate a random nonce
    const nonce = randomBytes(32).toString("hex")

    // Store the nonce in the session or a temporary storage
    // In a real implementation, you would store this in a database or Redis
    // For now, we'll just return it

    return NextResponse.json({ nonce })
  } catch (error) {
    console.error("Error generating nonce:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
