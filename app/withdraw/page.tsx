"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ArrowRight, Coins, Info } from "lucide-react"
import { KycStatus } from "@/components/kyc-status"
import { Slider } from "@/components/ui/slider"
import { useApi } from "@/hooks/use-api"

export default function WithdrawPage() {
  const [amount, setAmount] = useState("")
  const [percentage, setPercentage] = useState(0)
  const [step, setStep] = useState(1)
  const { data: userData } = useApi("/api/users/1")
  const { data: portfolioData } = useApi("/api/users/1/portfolio")

  const maxWithdrawal = portfolioData ? Number.parseFloat(portfolioData.usdc_balance) : 125430 // Default if API fails

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and decimals
    const value = e.target.value.replace(/[^0-9.]/g, "")
    setAmount(value)

    // Update percentage slider
    const newPercentage = (Number.parseFloat(value) / maxWithdrawal) * 100
    setPercentage(isNaN(newPercentage) ? 0 : Math.min(newPercentage, 100))
  }

  const handleSliderChange = (value: number[]) => {
    const newPercentage = value[0]
    setPercentage(newPercentage)

    // Update amount input
    const newAmount = ((maxWithdrawal * newPercentage) / 100).toFixed(2)
    setAmount(newAmount)
  }

  const handleContinue = () => {
    setStep(2)
  }

  const handleConfirm = async () => {
    try {
      // Create a withdrawal transaction
      await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: 1, // In a real app, this would come from authentication
          type: "withdrawal",
          amount: Number.parseFloat(amount),
          currency: "USDC",
          status: "pending",
          description: "Withdrawal to bank account",
        }),
      })

      alert(`Withdrawal of ${amount} USDC initiated successfully!`)
      setStep(1)
      setAmount("")
      setPercentage(0)
    } catch (error) {
      console.error("Error creating withdrawal:", error)
      alert("Failed to process withdrawal. Please try again.")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6 space-y-6 animate-fade-in">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Withdraw</h1>
          <p className="text-muted-foreground">Withdraw funds from your Key Vault account.</p>
        </div>

        <KycStatus status={userData?.kyc_status || "pending"} />

        <div className="max-w-2xl mx-auto w-full">
          <Card className="gradient-border overflow-hidden">
            <CardHeader>
              <CardTitle>Withdraw Funds</CardTitle>
              <CardDescription>Convert your USDC back to USD and withdraw to your bank account.</CardDescription>
            </CardHeader>
            <CardContent>
              {step === 1 ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="amount">Amount (USDC)</Label>
                      <span className="text-sm text-muted-foreground">
                        Available: {maxWithdrawal.toLocaleString()} USDC
                      </span>
                    </div>
                    <div className="relative">
                      <Coins className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="amount"
                        placeholder="0.00"
                        className="pl-10"
                        value={amount}
                        onChange={handleAmountChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Percentage of Holdings</Label>
                    <div className="pt-4 pb-2">
                      <Slider
                        defaultValue={[0]}
                        max={100}
                        step={1}
                        value={[percentage]}
                        onValueChange={handleSliderChange}
                        className="[&>.slider-thumb]:bg-primary"
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span>25%</span>
                      <span>50%</span>
                      <span>75%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  <div className="rounded-lg bg-secondary p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="h-4 w-4 text-primary" />
                      <span className="font-medium">Withdrawal Summary</span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount:</span>
                        <span>{amount || "0"} USDC</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fee:</span>
                        <span>0.00 USDC</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">You'll Receive:</span>
                        <span>${amount || "0"} USD</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Remaining Balance:</span>
                        <span>{(maxWithdrawal - Number.parseFloat(amount || "0")).toLocaleString()} USDC</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 animated-gradient p-6 rounded-lg">
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-bold">Confirm Your Withdrawal</h3>
                    <p className="text-muted-foreground">Please review the details below before confirming.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="font-medium">Amount:</span>
                      <span className="font-bold">{amount} USDC</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="font-medium">Conversion:</span>
                      <span>${amount} USD</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="font-medium">Method:</span>
                      <span>Bank Transfer</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="font-medium">Percentage of Holdings:</span>
                      <span>{percentage.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="font-medium">Processing Time:</span>
                      <span>2-3 Business Days</span>
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
                disabled={!amount || Number.parseFloat(amount) <= 0 || Number.parseFloat(amount) > maxWithdrawal}
              >
                {step === 1 ? (
                  <>
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  "Confirm Withdrawal"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
