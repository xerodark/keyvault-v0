"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, BanknoteIcon, CreditCard, DollarSign, Info } from "lucide-react"
import { KycStatus } from "@/components/kyc-status"
import { useApi } from "@/hooks/use-api"

export default function DepositPage() {
  const [amount, setAmount] = useState("")
  const [step, setStep] = useState(1)
  const { data: userData } = useApi("/api/users/1")

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and decimals
    const value = e.target.value.replace(/[^0-9.]/g, "")
    setAmount(value)
  }

  const handleContinue = () => {
    setStep(2)
  }

  const handleConfirm = async () => {
    try {
      // Create a deposit transaction
      await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: 1, // In a real app, this would come from authentication
          type: "deposit",
          amount: Number.parseFloat(amount),
          currency: "USD",
          status: "pending",
          description: "Deposit via bank transfer",
        }),
      })

      alert(`Deposit of $${amount} initiated successfully!`)
      setStep(1)
      setAmount("")
    } catch (error) {
      console.error("Error creating deposit:", error)
      alert("Failed to process deposit. Please try again.")
    }
  }

  const estimatedShares = (Number.parseFloat(amount) / 125430) * 0.51
  const formattedShares = isNaN(estimatedShares) ? "0" : estimatedShares.toFixed(4)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6 space-y-6 animate-fade-in">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Deposit</h1>
          <p className="text-muted-foreground">Add funds to your Key Vault account.</p>
        </div>

        <KycStatus status={userData?.kyc_status || "pending"} />

        <div className="max-w-2xl mx-auto w-full">
          <Card className="gradient-border overflow-hidden">
            <CardHeader>
              <CardTitle>Deposit Funds</CardTitle>
              <CardDescription>Choose your preferred deposit method and amount.</CardDescription>
            </CardHeader>
            <CardContent>
              {step === 1 ? (
                <div className="space-y-6">
                  <Tabs defaultValue="bank" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="bank">
                        <BanknoteIcon className="mr-2 h-4 w-4" />
                        Bank Transfer
                      </TabsTrigger>
                      <TabsTrigger value="card">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Credit Card
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="bank" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount (USD)</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="amount"
                            placeholder="0.00"
                            className="pl-10"
                            value={amount}
                            onChange={handleAmountChange}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">Minimum deposit: $1,000</p>
                      </div>
                      <div className="rounded-lg bg-secondary p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Info className="h-4 w-4 text-primary" />
                          <span className="font-medium">Deposit Summary</span>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Amount:</span>
                            <span>${amount || "0"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Fee:</span>
                            <span>$0.00</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Estimated USDC:</span>
                            <span>{amount || "0"} USDC</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Estimated Fund Share:</span>
                            <span>{formattedShares}%</span>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="card" className="pt-4">
                      <div className="rounded-lg bg-secondary p-4 text-center">
                        <CreditCard className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <p>Credit card deposits coming soon.</p>
                        <p className="text-sm text-muted-foreground mt-1">Please use bank transfer for now.</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              ) : (
                <div className="space-y-6 animated-gradient p-6 rounded-lg">
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-bold">Confirm Your Deposit</h3>
                    <p className="text-muted-foreground">Please review the details below before confirming.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="font-medium">Amount:</span>
                      <span className="font-bold">${amount} USD</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="font-medium">Conversion:</span>
                      <span>{amount} USDC</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="font-medium">Method:</span>
                      <span>Bank Transfer</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="font-medium">Estimated Fund Share:</span>
                      <span>{formattedShares}%</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="font-medium">Processing Time:</span>
                      <span>1-2 Business Days</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {step === 2 && (
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
              )}
              <Button
                className={step === 2 ? "" : "ml-auto"}
                onClick={step === 1 ? handleContinue : handleConfirm}
                disabled={!amount || Number.parseFloat(amount) < 1000}
              >
                {step === 1 ? (
                  <>
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  "Confirm Deposit"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
