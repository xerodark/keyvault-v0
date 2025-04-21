"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { BarChart3, DollarSign } from "lucide-react"
import { StatsCard } from "@/components/dashboard/stats-card"
import { PerformanceChart } from "@/components/dashboard/performance-chart"
import { KycStatus } from "@/components/kyc-status"
import { useApi } from "@/hooks/use-api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function UserDashboard() {
  const { data: session } = useSession()
  const userId = session?.user.id

  // Update API endpoint paths to use consistent parameter names
  const { data: userData } = useApi(userId ? `/api/user/${userId}` : null)
  const { data: portfolioData } = useApi(userId ? `/api/portfolio/${userId}` : null)
  const { data: performanceReportsData } = useApi(userId ? `/api/performance-reports/${userId}` : null)

  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    if (performanceReportsData?.data) {
      // Format the performance data for the chart
      const formattedData = performanceReportsData.data.map((item: any) => {
        return {
          period: item.period,
          value: Number.parseFloat(item.gainLoss),
        }
      })
      setChartData(formattedData)
    }
  }, [performanceReportsData])

  if (!session) {
    return <div className="text-center py-10">Please sign in to view your dashboard</div>
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {userData?.name || session.user.name}.</p>
      </div>

      <KycStatus status={userData?.kycStatus || "pending"} />

      <div className="grid gap-4 md:grid-cols-2">
        <StatsCard
          title="Initial Contribution"
          value={`$${portfolioData ? Number.parseFloat(portfolioData.initialInvestment).toLocaleString() : "0"}`}
          icon={<DollarSign />}
          description="Total amount deposited"
          className="animate-slide-up"
        />
        <StatsCard
          title="Current Value"
          value={`$${portfolioData ? Number.parseFloat(portfolioData.currentValue).toLocaleString() : "0"}`}
          icon={<BarChart3 />}
          description="Current portfolio value"
          trend={{
            value: portfolioData
              ? Number.parseFloat(
                  (
                    ((portfolioData.currentValue - portfolioData.initialInvestment) / portfolioData.initialInvestment) *
                    100
                  ).toFixed(1),
                )
              : 0,
            isPositive: portfolioData ? portfolioData.currentValue >= portfolioData.initialInvestment : true,
          }}
          className="animate-slide-up [animation-delay:100ms]"
        />
      </div>

      <Card className="gradient-border">
        <CardHeader>
          <CardTitle>Quarterly Performance</CardTitle>
          <CardDescription>Your investment performance over time</CardDescription>
        </CardHeader>
        <CardContent>
          {chartData.length > 0 ? (
            <div className="h-[300px]">
              <PerformanceChart data={chartData} />
            </div>
          ) : (
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">No performance data available yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="gradient-border">
        <CardHeader>
          <CardTitle>Performance History</CardTitle>
          <CardDescription>Your quarterly performance reports</CardDescription>
        </CardHeader>
        <CardContent>
          {performanceReportsData?.data && performanceReportsData.data.length > 0 ? (
            <div className="rounded-lg border overflow-hidden">
              <div className="grid grid-cols-3 bg-secondary p-3">
                <div className="font-medium">Period</div>
                <div className="font-medium">Gain/Loss</div>
                <div className="font-medium">Date</div>
              </div>
              <div className="divide-y divide-border">
                {performanceReportsData.data.map((report: any) => (
                  <div key={report.id} className="grid grid-cols-3 p-3 hover:bg-secondary/50">
                    <div>{report.period}</div>
                    <div className={Number(report.gainLoss) >= 0 ? "text-green-500" : "text-red-500"}>
                      {Number(report.gainLoss) >= 0 ? "+" : ""}${Number.parseFloat(report.gainLoss).toLocaleString()}
                    </div>
                    <div>{new Date(report.createdAt).toLocaleDateString()}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">No performance reports available yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
