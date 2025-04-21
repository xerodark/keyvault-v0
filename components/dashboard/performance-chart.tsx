"use client"

import type { FC } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface PerformanceChartProps {
  data?: any[]
}

export const PerformanceChart: FC<PerformanceChartProps> = ({ data = [] }) => {
  // If no data is provided, use sample data
  const chartData =
    data.length > 0
      ? data
      : [
          { month: "Jan", value: 2400 },
          { month: "Feb", value: 1398 },
          { month: "Mar", value: 9800 },
          { month: "Apr", value: 3908 },
          { month: "May", value: 4800 },
          { month: "Jun", value: 3800 },
          { month: "Jul", value: 4300 },
          { month: "Aug", value: 5300 },
          { month: "Sep", value: 4890 },
          { month: "Oct", value: 8000 },
          { month: "Nov", value: 7300 },
          { month: "Dec", value: 9300 },
        ]

  return (
    <Card className="gradient-border card-hover col-span-full">
      <CardHeader>
        <CardTitle>Quarterly Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="line">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="line">Line</TabsTrigger>
              <TabsTrigger value="bar">Bar</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="line" className="h-[300px]">
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF6600" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#FF6600" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <ChartTooltipContent>
                            <div className="text-sm font-bold">{payload[0].payload.month}</div>
                            <div className="text-xs">${payload[0].value?.toLocaleString()}</div>
                          </ChartTooltipContent>
                        )
                      }
                      return null
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#FF6600"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>

          <TabsContent value="bar" className="h-[300px]">
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <ChartTooltipContent>
                            <div className="text-sm font-bold">{payload[0].payload.month}</div>
                            <div className="text-xs">${payload[0].value?.toLocaleString()}</div>
                          </ChartTooltipContent>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar dataKey="value" fill="#FF6600" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
