import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { db } from "@/lib/db"
import { transactions } from "@/lib/db/schema"
import { eq, desc, sql } from "drizzle-orm"
import { authOptions } from "@/lib/auth"
import { executeQuery } from "@/lib/db"
import type { ApiResponse, Transaction } from "@/lib/types"

// GET /api/transactions/:id - Returns a list of the user's transactions
export async function GET(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions)

    // Check if user is authenticated
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user is requesting their own data
    if (session.user.id !== params.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : 10
    const page = searchParams.get("page") ? Number.parseInt(searchParams.get("page")!) : 1
    const skip = (page - 1) * limit
    const type = searchParams.get("type")

    // Build the query
    let query = db
      .select()
      .from(transactions)
      .where(eq(transactions.userId, Number.parseInt(params.id)))

    // Add type filter if provided
    if (type) {
      query = query.where(eq(transactions.type, type))
    }

    // Execute the query with pagination
    const data = await query.orderBy(desc(transactions.createdAt)).limit(limit).offset(skip)

    // Count total records for pagination
    const countQuery = db
      .select({ count: sql`count(*)` })
      .from(transactions)
      .where(eq(transactions.userId, Number.parseInt(params.id)))

    if (type) {
      countQuery.where(eq(transactions.type, type))
    }

    const [{ count }] = await countQuery

    return NextResponse.json({
      data,
      pagination: {
        total: Number(count),
        page,
        limit,
        totalPages: Math.ceil(Number(count) / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching transactions:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PUT /api/transactions/[id] - Update a transaction status
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<ApiResponse<Transaction>>> {
  try {
    const transactionId = params.id
    const { status } = await request.json()

    // Check if transaction exists
    const existingTransaction = await executeQuery("SELECT * FROM transactions WHERE id = $1", [transactionId])

    if (existingTransaction.length === 0) {
      return NextResponse.json({ success: false, error: "Transaction not found" }, { status: 404 })
    }

    // Update transaction status
    const result = await executeQuery(
      `UPDATE transactions
     SET status = $1
     WHERE id = $2
     RETURNING *`,
      [status, transactionId],
    )

    // If status changed to completed, update portfolio accordingly
    if (status === "completed" && existingTransaction[0].status !== "completed") {
      const { user_id, type, amount, currency } = existingTransaction[0]

      if (type === "deposit") {
        if (currency === "USDC" || currency === "USD") {
          // For deposits, increase USDC balance
          await updatePortfolioAfterStatusChange(user_id, amount, "deposit")
        }
      } else if (type === "withdrawal") {
        if (currency === "USDC" || currency === "USD") {
          // For withdrawals, decrease USDC balance
          await updatePortfolioAfterStatusChange(user_id, amount, "withdrawal")
        }
      } else if (type === "earnings") {
        // For earnings, increase current value and unrealized gains
        await updatePortfolioAfterStatusChange(user_id, amount, "earnings")
      }
    }

    return NextResponse.json({ success: true, data: result[0] })
  } catch (error) {
    console.error("Error updating transaction:", error)
    return NextResponse.json({ success: false, error: "Failed to update transaction" }, { status: 500 })
  }
}

// Helper function to update portfolio after transaction status change
async function updatePortfolioAfterStatusChange(userId: number, amount: number, type: string) {
  // Get user's current portfolio
  const portfolio = await executeQuery("SELECT * FROM portfolios WHERE user_id = $1", [userId])

  if (portfolio.length > 0) {
    const currentBalance = Number.parseFloat(portfolio[0].usdc_balance)
    const currentValue = Number.parseFloat(portfolio[0].current_value)
    const initialInvestment = Number.parseFloat(portfolio[0].initial_investment)

    if (type === "deposit") {
      const newBalance = currentBalance + amount
      const newInitialInvestment = initialInvestment + amount

      await executeQuery(
        `UPDATE portfolios
       SET usdc_balance = $1,
           initial_investment = $2,
           current_value = $1
       WHERE user_id = $3`,
        [newBalance, newInitialInvestment, userId],
      )
    } else if (type === "withdrawal") {
      const newBalance = Math.max(0, currentBalance - amount)

      await executeQuery(
        `UPDATE portfolios
       SET usdc_balance = $1,
           current_value = $1
       WHERE user_id = $2`,
        [newBalance, userId],
      )
    } else if (type === "earnings") {
      const newValue = currentValue + amount
      const newUnrealizedGains = newValue - initialInvestment

      await executeQuery(
        `UPDATE portfolios
       SET current_value = $1,
           unrealized_gains = $2
       WHERE user_id = $3`,
        [newValue, newUnrealizedGains, userId],
      )
    }
  }
}
