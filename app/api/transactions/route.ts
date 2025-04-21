import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import prisma from "@/lib/prisma"
import type { ApiResponse, Transaction } from "@/lib/types"

// GET /api/transactions - Get all transactions with optional filters
export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<Transaction[]>>> {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const type = searchParams.get("type")
    const status = searchParams.get("status")
    const limit = searchParams.get("limit") || "50"

    let query = "SELECT * FROM transactions WHERE 1=1"
    const params: any[] = []

    // Add filters if provided
    if (userId) {
      params.push(userId)
      query += ` AND user_id = ${params.length}`
    }

    if (type) {
      params.push(type)
      query += ` AND type = ${params.length}`
    }

    if (status) {
      params.push(status)
      query += ` AND status = ${params.length}`
    }

    // Add order and limit
    query += " ORDER BY created_at DESC"
    params.push(Number.parseInt(limit as string))
    query += ` LIMIT ${params.length}`

    const transactions = await executeQuery(query, params)

    return NextResponse.json({ success: true, data: transactions })
  } catch (error) {
    console.error("Error fetching transactions:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch transactions" }, { status: 500 })
  }
}

// POST /api/transactions - Create a new transaction
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<Transaction>>> {
  try {
    const { user_id, type, amount, currency, status, description } = await request.json()

    // Validate required fields
    if (!user_id || !type || !amount || !currency) {
      return NextResponse.json(
        { success: false, error: "User ID, type, amount, and currency are required" },
        { status: 400 },
      )
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: {
        id: Number.parseInt(user_id),
      },
    })

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }

    // Create transaction
    const transaction = await prisma.transaction.create({
      data: {
        user_id: Number.parseInt(user_id),
        type,
        amount,
        currency,
        status: status || "pending",
        description: description || null,
      },
    })

    // Update portfolio based on transaction type
    if (type === "deposit" && (status === "completed" || status === undefined)) {
      // For deposits, increase USDC balance and update other portfolio metrics
      if (currency === "USDC") {
        await updatePortfolioAfterDeposit(Number.parseInt(user_id), Number.parseFloat(amount))
      } else if (currency === "USD") {
        // Assuming 1:1 conversion from USD to USDC for simplicity
        await updatePortfolioAfterDeposit(Number.parseInt(user_id), Number.parseFloat(amount))
      }
    } else if (type === "withdrawal" && (status === "completed" || status === undefined)) {
      // For withdrawals, decrease USDC balance and update other portfolio metrics
      if (currency === "USDC") {
        await updatePortfolioAfterWithdrawal(Number.parseInt(user_id), Number.parseFloat(amount))
      }
    } else if (type === "earnings" && (status === "completed" || status === undefined)) {
      // For earnings, increase current value and unrealized gains
      await updatePortfolioAfterEarnings(Number.parseInt(user_id), Number.parseFloat(amount))
    }

    return NextResponse.json({ success: true, data: transaction })
  } catch (error) {
    console.error("Error creating transaction:", error)
    return NextResponse.json({ success: false, error: "Failed to create transaction" }, { status: 500 })
  }
}

// Helper function to update portfolio after deposit
async function updatePortfolioAfterDeposit(userId: number, amount: number) {
  try {
    // Get current fund AUM
    const latestSnapshot = await prisma.fundSnapshot.findFirst({
      orderBy: {
        timestamp: "desc",
      },
    })

    const currentAUM = latestSnapshot ? Number.parseFloat(latestSnapshot.total_aum.toString()) : 0

    // Get user's current portfolio
    const portfolio = await prisma.portfolio.findUnique({
      where: {
        user_id: userId,
      },
    })

    if (!portfolio) {
      // Create new portfolio if it doesn't exist
      await prisma.portfolio.create({
        data: {
          user_id: userId,
          usdc_balance: amount,
          initial_investment: amount,
          current_value: amount,
          fund_share_percent: currentAUM > 0 ? (amount / (currentAUM + amount)) * 100 : 100,
          unrealized_gains: 0,
        },
      })
    } else {
      // Update existing portfolio
      const currentBalance = Number.parseFloat(portfolio.usdc_balance.toString())
      const initialInvestment = Number.parseFloat(portfolio.initial_investment.toString())
      const newBalance = currentBalance + amount
      const newInitialInvestment = initialInvestment + amount

      // Calculate new fund share percentage
      const newTotalAUM = currentAUM + amount

      // Recalculate all portfolios' fund share percentages
      const allPortfolios = await prisma.portfolio.findMany()

      for (const p of allPortfolios) {
        const isCurrentUser = p.user_id === userId
        const portfolioValue = isCurrentUser ? newBalance : Number.parseFloat(p.usdc_balance.toString())
        const newSharePercent = (portfolioValue / newTotalAUM) * 100

        await prisma.portfolio.update({
          where: {
            id: p.id,
          },
          data: {
            fund_share_percent: newSharePercent,
            ...(isCurrentUser && {
              usdc_balance: newBalance,
              initial_investment: newInitialInvestment,
              current_value: newBalance,
            }),
          },
        })
      }
    }

    // Create a new fund snapshot if none exists
    if (!latestSnapshot) {
      await prisma.fundSnapshot.create({
        data: {
          timestamp: new Date(),
          quarter: getCurrentQuarter(),
          total_aum: amount,
          nav: 1.0,
        },
      })
    } else {
      // Update the latest snapshot
      await prisma.fundSnapshot.update({
        where: {
          id: latestSnapshot.id,
        },
        data: {
          total_aum: currentAUM + amount,
        },
      })
    }
  } catch (error) {
    console.error("Error updating portfolio after deposit:", error)
    throw error
  }
}

// Helper function to update portfolio after withdrawal
async function updatePortfolioAfterWithdrawal(userId: number, amount: number) {
  try {
    // Get current fund AUM
    const latestSnapshot = await prisma.fundSnapshot.findFirst({
      orderBy: {
        timestamp: "desc",
      },
    })

    const currentAUM = latestSnapshot ? Number.parseFloat(latestSnapshot.total_aum.toString()) : 0

    // Get user's current portfolio
    const portfolio = await prisma.portfolio.findUnique({
      where: {
        user_id: userId,
      },
    })

    if (portfolio) {
      const currentBalance = Number.parseFloat(portfolio.usdc_balance.toString())

      // Ensure user has enough balance
      if (currentBalance >= amount) {
        const newBalance = currentBalance - amount
        const newTotalAUM = currentAUM - amount

        // Recalculate all portfolios' fund share percentages
        const allPortfolios = await prisma.portfolio.findMany()

        for (const p of allPortfolios) {
          const isCurrentUser = p.user_id === userId
          const portfolioValue = isCurrentUser ? newBalance : Number.parseFloat(p.usdc_balance.toString())
          const newSharePercent = newTotalAUM > 0 ? (portfolioValue / newTotalAUM) * 100 : 0

          await prisma.portfolio.update({
            where: {
              id: p.id,
            },
            data: {
              fund_share_percent: newSharePercent,
              ...(isCurrentUser && {
                usdc_balance: newBalance,
                current_value: newBalance,
              }),
            },
          })
        }

        // Update the latest snapshot
        if (latestSnapshot) {
          await prisma.fundSnapshot.update({
            where: {
              id: latestSnapshot.id,
            },
            data: {
              total_aum: Math.max(0, currentAUM - amount),
            },
          })
        }
      }
    }
  } catch (error) {
    console.error("Error updating portfolio after withdrawal:", error)
    throw error
  }
}

// Helper function to update portfolio after earnings
async function updatePortfolioAfterEarnings(userId: number, amount: number) {
  try {
    // Get user's current portfolio
    const portfolio = await prisma.portfolio.findUnique({
      where: {
        user_id: userId,
      },
    })

    if (portfolio) {
      const currentValue = Number.parseFloat(portfolio.current_value.toString())
      const initialInvestment = Number.parseFloat(portfolio.initial_investment.toString())
      const newValue = currentValue + amount
      const newUnrealizedGains = newValue - initialInvestment

      await prisma.portfolio.update({
        where: {
          user_id: userId,
        },
        data: {
          current_value: newValue,
          unrealized_gains: newUnrealizedGains,
        },
      })

      // Update the latest snapshot
      const latestSnapshot = await prisma.fundSnapshot.findFirst({
        orderBy: {
          timestamp: "desc",
        },
      })

      if (latestSnapshot) {
        const currentAUM = Number.parseFloat(latestSnapshot.total_aum.toString())

        await prisma.fundSnapshot.update({
          where: {
            id: latestSnapshot.id,
          },
          data: {
            total_aum: currentAUM + amount,
          },
        })
      }
    }
  } catch (error) {
    console.error("Error updating portfolio after earnings:", error)
    throw error
  }
}

// Helper function to get the current quarter
function getCurrentQuarter(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  let quarter

  if (month <= 3) quarter = "Q1"
  else if (month <= 6) quarter = "Q2"
  else if (month <= 9) quarter = "Q3"
  else quarter = "Q4"

  return `${year}-${quarter}`
}
