import prisma from "@/lib/prisma"

// This file contains placeholder code for calculating fund performance
// and updating the fund_performance table on a quarterly basis

export async function calculateFundPerformance() {
  console.log("Calculating fund performance...")

  try {
    // Get the latest fund performance record
    const latestPerformance = await prisma.fundPerformance.findFirst({
      orderBy: {
        date: "desc",
      },
    })

    // Calculate the current date
    const currentDate = new Date()

    // Format as YYYY-MM-DD
    const formattedDate = currentDate.toISOString().split("T")[0]

    // Calculate the current AUM
    const portfolios = await prisma.portfolio.findMany()
    const totalAUM = portfolios.reduce((sum, portfolio) => {
      return sum + Number(portfolio.current_value)
    }, 0)

    // Calculate the NAV (simplified)
    // In a real implementation, this would be more complex
    const nav = latestPerformance ? Number(latestPerformance.nav) * 1.01 : 1.0

    // Calculate returns
    const quarterlyReturn = latestPerformance ? (nav / Number(latestPerformance.nav) - 1) * 100 : 0
    const ytdReturn = 8.5 // Placeholder
    const inceptionReturn = 25.0 // Placeholder

    // Create a new fund performance record
    await prisma.fundPerformance.create({
      data: {
        date: new Date(formattedDate),
        nav,
        aum: totalAUM,
        quarterly_return: quarterlyReturn,
        ytd_return: ytdReturn,
        inception_return: inceptionReturn,
      },
    })

    console.log("Fund performance calculated and saved")
  } catch (error) {
    console.error("Error calculating fund performance:", error)
  }
}
