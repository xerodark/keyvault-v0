import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { KycStatus } from "@/components/kyc-status"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, Clock, Coins, DollarSign } from "lucide-react"

export default function PortfolioPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6 space-y-6 animate-fade-in">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>
          <p className="text-muted-foreground">Track your investments and performance.</p>
        </div>

        <KycStatus status="verified" />

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="allocations">Allocations</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 pt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="gradient-border card-hover">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Initial Investment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline">
                    <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
                    <span className="text-2xl font-bold">100,000</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">First deposit: Apr 5, 2023</p>
                </CardContent>
              </Card>

              <Card className="gradient-border card-hover">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Current Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline">
                    <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
                    <span className="text-2xl font-bold">125,430</span>
                  </div>
                  <div className="flex items-center text-xs text-green-500 mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    <span>+25.43% all time</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="gradient-border card-hover">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Earnings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline">
                    <DollarSign className="h-4 w-4 text-primary mr-1" />
                    <span className="text-2xl font-bold">25,430</span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Last distribution: 3 days ago</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="gradient-border">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Your investment performance over time.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Annual Return</p>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold">18.2%</span>
                      <span className="ml-2 text-xs text-green-500">+2.4%</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Volatility</p>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold">5.7%</span>
                      <span className="ml-2 text-xs text-green-500">-0.8%</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Sharpe Ratio</p>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold">2.1</span>
                      <span className="ml-2 text-xs text-green-500">+0.3</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 h-[200px] rounded-lg bg-muted/50 flex items-center justify-center">
                  <p className="text-muted-foreground">Performance chart placeholder</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="allocations" className="space-y-4 pt-4">
            <Card className="gradient-border">
              <CardHeader>
                <CardTitle>Asset Allocations</CardTitle>
                <CardDescription>Current distribution of fund assets.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] rounded-lg bg-muted/50 flex items-center justify-center">
                  <p className="text-muted-foreground">Allocation chart placeholder</p>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="font-medium">Top Holdings</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Coins className="h-4 w-4 text-primary" />
                          <span>Bitcoin (BTC)</span>
                        </div>
                        <span>32%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Coins className="h-4 w-4 text-primary" />
                          <span>Ethereum (ETH)</span>
                        </div>
                        <span>28%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Coins className="h-4 w-4 text-primary" />
                          <span>Solana (SOL)</span>
                        </div>
                        <span>15%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Strategy Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Long-term Holdings</span>
                        <span>60%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Yield Farming</span>
                        <span>25%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Liquid Staking</span>
                        <span>15%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4 pt-4">
            <Card className="gradient-border">
              <CardHeader>
                <CardTitle>Investment History</CardTitle>
                <CardDescription>Track your deposits, withdrawals, and earnings.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden">
                  <div className="grid grid-cols-4 bg-secondary p-3">
                    <div className="font-medium">Date</div>
                    <div className="font-medium">Type</div>
                    <div className="font-medium">Amount</div>
                    <div className="font-medium">Status</div>
                  </div>
                  <div className="divide-y divide-border">
                    {[
                      { date: "Apr 12, 2023", type: "Deposit", amount: "$5,000", status: "Completed" },
                      { date: "Apr 10, 2023", type: "Earnings", amount: "$750", status: "Distributed" },
                      { date: "Apr 5, 2023", type: "Withdrawal", amount: "$2,000", status: "Completed" },
                      { date: "Mar 28, 2023", type: "Deposit", amount: "$10,000", status: "Completed" },
                      { date: "Mar 20, 2023", type: "Earnings", amount: "$1,200", status: "Distributed" },
                      { date: "Mar 15, 2023", type: "Deposit", amount: "$15,000", status: "Completed" },
                      { date: "Feb 28, 2023", type: "Earnings", amount: "$980", status: "Distributed" },
                      { date: "Feb 10, 2023", type: "Deposit", amount: "$20,000", status: "Completed" },
                    ].map((item, index) => (
                      <div key={index} className="grid grid-cols-4 p-3 hover:bg-secondary/50">
                        <div>{item.date}</div>
                        <div>{item.type}</div>
                        <div>{item.amount}</div>
                        <div>{item.status}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
