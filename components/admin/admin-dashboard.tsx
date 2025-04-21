"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { BarChart3, DollarSign, Percent, Users } from "lucide-react"
import { StatsCard } from "@/components/dashboard/stats-card"
import { useApi } from "@/hooks/use-api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AdminUserTable } from "@/components/admin/admin-user-table"
import { AdminFundSnapshots } from "@/components/admin/admin-fund-snapshots"

export function AdminDashboard() {
  const { data: session } = useSession()
  const { data: fundOwnershipData } = useApi("/api/admin/fund-ownership")
  const { data: usersData } = useApi("/api/admin/users")
  const { data: snapshotsData } = useApi("/api/admin/fund-snapshots")

  const [distributePeriod, setDistributePeriod] = useState("")
  const [createSnapshotPeriod, setCreateSnapshotPeriod] = useState("")
  const [isDistributing, setIsDistributing] = useState(false)
  const [isCreatingSnapshot, setIsCreatingSnapshot] = useState(false)
  const [actionResult, setActionResult] = useState<{ success: boolean; message: string } | null>(null)

  // Calculate total fund value
  const totalFundValue = fundOwnershipData?.data?.totalFundValue || 0
  const totalUsers = usersData?.data?.length || 0
  const latestSnapshot = snapshotsData?.data?.[0]
  const latestNav = latestSnapshot?.nav || 1.0

  const handleDistributeReturns = async () => {
    if (!distributePeriod) return

    setIsDistributing(true)
    setActionResult(null)

    try {
      const response = await fetch("/api/admin/distribute-returns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          period: distributePeriod,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setActionResult({
          success: true,
          message: `Successfully distributed returns for ${distributePeriod}. Created ${data.data.reportsCreated} reports.`,
        })
        setDistributePeriod("")
      } else {
        setActionResult({
          success: false,
          message: data.error || "Failed to distribute returns",
        })
      }
    } catch (error) {
      setActionResult({
        success: false,
        message: "An error occurred while distributing returns",
      })
    } finally {
      setIsDistributing(false)
    }
  }

  const handleCreateSnapshot = async () => {
    if (!createSnapshotPeriod) return

    setIsCreatingSnapshot(true)
    setActionResult(null)

    try {
      const response = await fetch("/api/admin/fund-snapshots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quarter: createSnapshotPeriod,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setActionResult({
          success: true,
          message: `Successfully created fund snapshot for ${createSnapshotPeriod}`,
        })
        setCreateSnapshotPeriod("")
      } else {
        setActionResult({
          success: false,
          message: data.error || "Failed to create fund snapshot",
        })
      }
    } catch (error) {
      setActionResult({
        success: false,
        message: "An error occurred while creating fund snapshot",
      })
    } finally {
      setIsCreatingSnapshot(false)
    }
  }

  if (!session) {
    return <div className="text-center py-10">Please sign in to view the admin dashboard</div>
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage fund performance and user accounts</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Fund Value"
          value={`$${Number(totalFundValue).toLocaleString()}`}
          icon={<DollarSign />}
          description="Assets under management"
          className="animate-slide-up"
        />
        <StatsCard
          title="Net Asset Value"
          value={Number(latestNav).toFixed(4)}
          icon={<BarChart3 />}
          description="Current NAV per share"
          className="animate-slide-up [animation-delay:100ms]"
        />
        <StatsCard
          title="Total Users"
          value={totalUsers.toString()}
          icon={<Users />}
          description="Registered investors"
          className="animate-slide-up [animation-delay:200ms]"
        />
        <StatsCard
          title="Latest Period"
          value={latestSnapshot?.quarter || "N/A"}
          icon={<Percent />}
          description="Most recent snapshot"
          className="animate-slide-up [animation-delay:300ms]"
        />
      </div>

      {actionResult && (
        <div
          className={`rounded-lg p-4 ${
            actionResult.success
              ? "bg-green-500/10 border border-green-500/20"
              : "bg-red-500/10 border border-red-500/20"
          }`}
        >
          <p className={actionResult.success ? "text-green-500" : "text-red-500"}>{actionResult.message}</p>
        </div>
      )}

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="snapshots">Fund Snapshots</TabsTrigger>
          <TabsTrigger value="actions">Admin Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4 pt-4">
          <AdminUserTable users={usersData?.data || []} />
        </TabsContent>

        <TabsContent value="snapshots" className="space-y-4 pt-4">
          <AdminFundSnapshots snapshots={snapshotsData?.data || []} />
        </TabsContent>

        <TabsContent value="actions" className="space-y-4 pt-4">
          <Card className="gradient-border">
            <CardHeader>
              <CardTitle>Distribute Returns</CardTitle>
              <CardDescription>Calculate and distribute returns for a specific period</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="distributePeriod">Period (e.g., 2025-Q2)</Label>
                  <Input
                    id="distributePeriod"
                    value={distributePeriod}
                    onChange={(e) => setDistributePeriod(e.target.value)}
                    placeholder="YYYY-QN"
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={handleDistributeReturns}
                    disabled={!distributePeriod || isDistributing}
                    className="w-full"
                  >
                    {isDistributing ? "Processing..." : "Distribute Returns"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-border">
            <CardHeader>
              <CardTitle>Create Fund Snapshot</CardTitle>
              <CardDescription>Create a new snapshot of the fund's current state</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="createSnapshotPeriod">Period (e.g., 2025-Q2)</Label>
                  <Input
                    id="createSnapshotPeriod"
                    value={createSnapshotPeriod}
                    onChange={(e) => setCreateSnapshotPeriod(e.target.value)}
                    placeholder="YYYY-QN"
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={handleCreateSnapshot}
                    disabled={!createSnapshotPeriod || isCreatingSnapshot}
                    className="w-full"
                  >
                    {isCreatingSnapshot ? "Creating..." : "Create Snapshot"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
