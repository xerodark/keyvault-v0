import { executeQuery } from "@/lib/db"

// Seed the database with sample data
export async function seedDatabase() {
  try {
    console.log("Seeding database...")

    // Create sample users
    const users = await executeQuery(`
      INSERT INTO users (name, email, kyc_status, wallet_address)
      VALUES 
        ('Alex Johnson', 'alex@example.com', 'verified', '0x1234567890abcdef1234567890abcdef12345678'),
        ('Sarah Williams', 'sarah@example.com', 'verified', '0xabcdef1234567890abcdef1234567890abcdef12'),
        ('Michael Brown', 'michael@example.com', 'pending', NULL)
      ON CONFLICT (email) DO NOTHING
      RETURNING id, name, email
    `)

    console.log("Created users:", users)

    // Create fund performance data
    const currentDate = new Date()
    const performanceData = []

    // Generate 12 months of performance data
    for (let i = 0; i < 12; i++) {
      const date = new Date(currentDate)
      date.setMonth(date.getMonth() - i)

      // Generate some realistic-looking performance data
      const aum = 20000000 + Math.floor(Math.random() * 5000000) // $20-25M AUM
      const nav = 1 + Math.random() * 0.5 // NAV between 1.0 and 1.5
      const quarterlyReturn = Math.random() * 10 - 2 // -2% to 8%
      const ytdReturn = Math.random() * 15 // 0% to 15%
      const inceptionReturn = 10 + Math.random() * 20 // 10% to 30%

      performanceData.push({
        date: date.toISOString().split("T")[0],
        aum,
        nav,
        quarterlyReturn,
        ytdReturn,
        inceptionReturn,
      })
    }

    // Sort by date (oldest first)
    performanceData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    // Insert performance data
    for (const data of performanceData) {
      await executeQuery(
        `
        INSERT INTO fund_performance (date, nav, aum, quarterly_return, ytd_return, inception_return)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (date) DO NOTHING
      `,
        [data.date, data.nav, data.aum, data.quarterlyReturn, data.ytdReturn, data.inceptionReturn],
      )
    }

    console.log("Created fund performance data")

    // Get user IDs
    const userIds = users.map((user: any) => user.id)

    // If no users were created (because they already exist), get existing users
    if (userIds.length === 0) {
      const existingUsers = await executeQuery("SELECT id FROM users LIMIT 3")
      userIds.push(...existingUsers.map((user: any) => user.id))
    }

    // Create portfolios for users
    const latestPerformance = await executeQuery("SELECT * FROM fund_performance ORDER BY date DESC LIMIT 1")

    const currentAUM = latestPerformance.length > 0 ? Number.parseFloat(latestPerformance[0].aum) : 20000000

    // User 1: Alex Johnson - Large investor
    const alexInvestment = 100000 // $100,000
    const alexOwnership = (alexInvestment / currentAUM) * 100
    const alexCurrentValue = 125430 // With some gains

    await executeQuery(
      `
      INSERT INTO portfolios (
        user_id, usdc_balance, fund_ownership_percentage, 
        initial_investment, current_value, unrealized_gains
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (user_id) DO UPDATE SET
        usdc_balance = EXCLUDED.usdc_balance,
        fund_ownership_percentage = EXCLUDED.fund_ownership_percentage,
        initial_investment = EXCLUDED.initial_investment,
        current_value = EXCLUDED.current_value,
        unrealized_gains = EXCLUDED.unrealized_gains
    `,
      [userIds[0], alexInvestment, alexOwnership, alexInvestment, alexCurrentValue, alexCurrentValue - alexInvestment],
    )

    // User 2: Sarah Williams - Medium investor
    const sarahInvestment = 50000 // $50,000
    const sarahOwnership = (sarahInvestment / currentAUM) * 100
    const sarahCurrentValue = 57500 // With some gains

    await executeQuery(
      `
      INSERT INTO portfolios (
        user_id, usdc_balance, fund_ownership_percentage, 
        initial_investment, current_value, unrealized_gains
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (user_id) DO UPDATE SET
        usdc_balance = EXCLUDED.usdc_balance,
        fund_ownership_percentage = EXCLUDED.fund_ownership_percentage,
        initial_investment = EXCLUDED.initial_investment,
        current_value = EXCLUDED.current_value,
        unrealized_gains = EXCLUDED.unrealized_gains
    `,
      [
        userIds[1],
        sarahInvestment,
        sarahOwnership,
        sarahInvestment,
        sarahCurrentValue,
        sarahCurrentValue - sarahInvestment,
      ],
    )

    // User 3: Michael Brown - Small investor
    const michaelInvestment = 10000 // $10,000
    const michaelOwnership = (michaelInvestment / currentAUM) * 100
    const michaelCurrentValue = 11200 // With some gains

    await executeQuery(
      `
      INSERT INTO portfolios (
        user_id, usdc_balance, fund_ownership_percentage, 
        initial_investment, current_value, unrealized_gains
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (user_id) DO UPDATE SET
        usdc_balance = EXCLUDED.usdc_balance,
        fund_ownership_percentage = EXCLUDED.fund_ownership_percentage,
        initial_investment = EXCLUDED.initial_investment,
        current_value = EXCLUDED.current_value,
        unrealized_gains = EXCLUDED.unrealized_gains
    `,
      [
        userIds[2],
        michaelInvestment,
        michaelOwnership,
        michaelInvestment,
        michaelCurrentValue,
        michaelCurrentValue - michaelInvestment,
      ],
    )

    console.log("Created portfolios")

    // Create transactions for users
    // Alex's transactions
    await executeQuery(
      `
      INSERT INTO transactions (user_id, type, amount, currency, status, description)
      VALUES
        ($1, 'deposit', 50000, 'USD', 'completed', 'Initial investment'),
        ($1, 'deposit', 50000, 'USD', 'completed', 'Additional investment'),
        ($1, 'earnings', 15430, 'USDC', 'completed', 'Q2 earnings distribution'),
        ($1, 'withdrawal', 10000, 'USDC', 'completed', 'Partial withdrawal')
    `,
      [userIds[0]],
    )

    // Sarah's transactions
    await executeQuery(
      `
      INSERT INTO transactions (user_id, type, amount, currency, status, description)
      VALUES
        ($1, 'deposit', 50000, 'USD', 'completed', 'Initial investment'),
        ($1, 'earnings', 7500, 'USDC', 'completed', 'Q2 earnings distribution')
    `,
      [userIds[1]],
    )

    // Michael's transactions
    await executeQuery(
      `
      INSERT INTO transactions (user_id, type, amount, currency, status, description)
      VALUES
        ($1, 'deposit', 5000, 'USD', 'completed', 'Initial investment'),
        ($1, 'deposit', 5000, 'USD', 'completed', 'Additional investment'),
        ($1, 'earnings', 1200, 'USDC', 'completed', 'Q2 earnings distribution')
    `,
      [userIds[2]],
    )

    console.log("Created transactions")

    console.log("Database seeded successfully!")
    return { success: true, message: "Database seeded successfully!" }
  } catch (error) {
    console.error("Error seeding database:", error)
    return { success: false, error: `Failed to seed database: ${error}` }
  }
}
