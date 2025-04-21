"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle, Database, Loader2 } from "lucide-react"

export default function SeedPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message?: string; error?: string } | null>(null)

  const handleSeed = async () => {
    try {
      setLoading(true)
      setResult(null)

      const response = await fetch("/api/seed", {
        method: "POST",
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Error seeding database:", error)
      setResult({ success: false, error: "Failed to seed database" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6 space-y-6 animate-fade-in">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Database Seed</h1>
          <p className="text-muted-foreground">Populate your database with sample data.</p>
        </div>

        <div className="max-w-2xl mx-auto w-full">
          <Card className="gradient-border overflow-hidden">
            <CardHeader>
              <CardTitle>Seed Database</CardTitle>
              <CardDescription>
                This will populate your database with sample users, transactions, and fund performance data.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-secondary p-4">
                <div className="flex items-start gap-3">
                  <Database className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">What will be created:</h4>
                    <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                      <li>3 sample users with different KYC statuses</li>
                      <li>12 months of fund performance data</li>
                      <li>Portfolios for each user with realistic values</li>
                      <li>Sample transactions (deposits, withdrawals, earnings)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {result && (
                <div
                  className={`rounded-lg p-4 flex items-start gap-3 ${
                    result.success
                      ? "bg-green-500/10 border border-green-500/20"
                      : "bg-red-500/10 border border-red-500/20"
                  }`}
                >
                  {result.success ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  )}
                  <div>
                    <h4 className="font-medium">{result.success ? "Success!" : "Error"}</h4>
                    <p className="text-sm mt-1">{result.message || result.error}</p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleSeed} disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Seeding Database...
                  </>
                ) : (
                  "Seed Database"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
