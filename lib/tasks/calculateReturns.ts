import { db } from "@/lib/db"
import { fundSnapshots, performanceReports } from "@/lib/db/schema"
import { eq, desc } from "drizzle-orm"

// This file contains code for calculating user returns based on fund performance
// It will be run as a scheduled job (e.g., via cron, serverless function, or background worker)

export async function calculateReturns() {
  console.log("Calculating user returns...")

  try {
    // Get the current date and determine the period
    const now = new Date()
    const currentPeriod = getCurrentPeriod(now)

    // Check if we already have a snapshot for this period
    const existingSnapshot = await db.query.fundSnapshots.findFirst({
      where: eq(fundSnapshots.quarter, currentPeriod),
    })

    if (existingSnapshot) {
      console.log(`Snapshot for ${currentPeriod} already exists, skipping calculation`)
      return
    }

    // Get the latest snapshot
    const latestSnapshot = await db.query.fundSnapshots.findFirst({
      orderBy: [desc(fundSnapshots.timestamp)],
    })

    if (!latestSnapshot) {
      console.log("No previous snapshot found, creating initial snapshot")

      // Calculate total AUM from all portfolios
      const allPortfolios = await db.query.portfolios.findMany()
      const totalAUM = allPortfolios.reduce((sum, portfolio) => {
        return sum + Number(portfolio.currentValue)
      }, 0)

      // Create initial snapshot
      await db.insert(fundSnapshots).values({
        timestamp: now,
        quarter: currentPeriod,
        totalAum: totalAUM,
        nav: 1.0,
      })

      return
    }

    // Determine which users need reports this period
    const allUsers = await db.query.users.findMany({
      with: {
        portfolio: true,
      },
    })

    // Filter users based on reporting frequency
    const usersForReporting = allUsers.filter((user) => {
      if (currentPeriod.includes("Q") && user.reportingFrequency === "quarterly") {
        return true
      }
      if (currentPeriod.includes("Annual") && user.reportingFrequency === "annual") {
        return true
      }
      return false
    })

    if (usersForReporting.length === 0) {
      console.log("No users due for reporting this period")
      return
    }

    // Calculate fund performance
    const previousPeriod = getPreviousPeriod(currentPeriod)
    const previousSnapshot = await db.query.fundSnapshots.findFirst({
      where: eq(fundSnapshots.quarter, previousPeriod),
      orderBy: [desc(fundSnapshots.timestamp)],
    })

    if (!previousSnapshot) {
      console.log("No previous snapshot found for comparison, using latest snapshot")

      // Create a new snapshot with current data
      const allPortfolios = await db.query.portfolios.findMany()
      const totalAUM = allPortfolios.reduce((sum, portfolio) => {
        return sum + Number(portfolio.currentValue)
      }, 0)

      // Create a new snapshot with current data
      await db.insert(fundSnapshots).values({
        timestamp: now,
        quarter: currentPeriod,
        totalAum: totalAUM,
        nav: Number(latestSnapshot.nav), // Use the same NAV as the latest snapshot for now
      })

      return
    }

    // Calculate fund performance
    const fundPerformance = Number(latestSnapshot.totalAum) - Number(previousSnapshot.totalAum)
    const performancePercent = (Number(fundPerformance) / Number(previousSnapshot.totalAum)) * 100

    console.log(`Fund performance for ${currentPeriod}: ${performancePercent.toFixed(2)}%`)

    // Create performance reports for each user
    for (const user of usersForReporting) {
      if (user.portfolio) {
        // Calculate user's gain/loss based on their fund share
        const userGainLoss = (Number(fundPerformance) * Number(user.portfolio.fundSharePercent)) / 100

        // Create performance report
        await db.insert(performanceReports).values({
          userId: user.id,
          period: currentPeriod,
          gainLoss: userGainLoss,
        })

        console.log(`Created performance report for user ${user.id} with gain/loss of ${userGainLoss}`)
      }
    }

    // Create a new snapshot for the current period
    await db.insert(fundSnapshots).values({
      timestamp: now,
      quarter: currentPeriod,
      totalAum: Number(latestSnapshot.totalAum),
      nav: Number(latestSnapshot.nav) * (1 + performancePercent / 100), // Update NAV based on performance
    })

    console.log(`Created new fund snapshot for ${currentPeriod}`)
    console.log("Returns calculation completed successfully")
  } catch (error) {
    console.error("Error calculating returns:", error)
  }
}

// Helper function to get the current period (quarter or year)
function getCurrentPeriod(date: Date): string {
  const year = date.getFullYear()
  const month = date.getMonth() + 1

  // Determine if we should generate quarterly or annual report
  const isEndOfYear = month === 12

  if (isEndOfYear) {
    return `${year}-Annual`
  } else {
    let quarter
    if (month <= 3) quarter = "Q1"
    else if (month <= 6) quarter = "Q2"
    else if (month <= 9) quarter = "Q3"
    else quarter = "Q4"

    return `${year}-${quarter}`
  }
}

// Helper function to get the previous period
function getPreviousPeriod(period: string): string {
  // Example: "2025-Q2" -> "2025-Q1" or "2024-Q4"
  const [year, quarter] = period.split("-")

  if (quarter === "Q1") {
    return `${Number(year) - 1}-Q4`
  } else if (quarter === "Q2") {
    return `${year}-Q1`
  } else if (quarter === "Q3") {
    return `${year}-Q2`
  } else if (quarter === "Q4") {
    return `${year}-Q3`
  } else if (quarter === "Annual") {
    return `${Number(year) - 1}-Annual`
  }

  return period
}
