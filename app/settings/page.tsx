"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { KycStatus } from "@/components/kyc-status"
import { Bell, Lock, Mail, Shield, User, Wallet } from "lucide-react"
import { useApi } from "@/hooks/use-api"

export default function SettingsPage() {
  const { data: session } = useSession()
  const { data: userData, loading, error, refetch } = useApi(`/api/user/${session?.user.id}`)

  const [emailNotifications, setEmailNotifications] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)
  const [twoFactorAuth, setTwoFactorAuth] = useState(true)
  const [connectingWallet, setConnectingWallet] = useState(false)
  const [initiatingKyc, setInitiatingKyc] = useState(false)

  const handleConnectWallet = async () => {
    setConnectingWallet(true)

    try {
      // Get nonce
      const nonceResponse = await fetch("/api/auth/wallet/nonce")
      const { nonce } = await nonceResponse.json()

      // In a real implementation, you would:
      // 1. Request wallet connection
      // 2. Sign the nonce with the wallet
      // 3. Verify the signature

      // For now, we'll just simulate a successful connection
      setTimeout(() => {
        alert("Wallet connection is not yet implemented")
        setConnectingWallet(false)
      }, 1000)
    } catch (error) {
      console.error("Error connecting wallet:", error)
      setConnectingWallet(false)
    }
  }

  const handleDisconnectWallet = async () => {
    setConnectingWallet(true)

    try {
      // In a real implementation, you would call an API to disconnect the wallet

      // For now, we'll just simulate a successful disconnection
      setTimeout(() => {
        alert("Wallet disconnection is not yet implemented")
        setConnectingWallet(false)
      }, 1000)
    } catch (error) {
      console.error("Error disconnecting wallet:", error)
      setConnectingWallet(false)
    }
  }

  const handleInitiateKyc = async () => {
    setInitiatingKyc(true)

    try {
      const response = await fetch("/api/kyc/initiate", {
        method: "POST",
      })

      const data = await response.json()

      if (data.redirectUrl) {
        // In a real implementation, you would redirect to the KYC provider
        alert("KYC flow initiated. You would be redirected to the KYC provider.")
      }

      // Refetch user data to update KYC status
      refetch()
    } catch (error) {
      console.error("Error initiating KYC flow:", error)
    } finally {
      setInitiatingKyc(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6 space-y-6 animate-fade-in">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and security.</p>
        </div>

        <KycStatus status={userData?.kyc_status || "pending"} />

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4 pt-4">
            <Card className="gradient-border">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Full Name</Label>
                    <Input id="firstName" defaultValue={userData?.name || ""} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={userData?.email || ""} />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>

            <Card className="gradient-border">
              <CardHeader>
                <CardTitle>KYC Information</CardTitle>
                <CardDescription>Your identity verification details.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-secondary p-4 flex items-start gap-3">
                  <User className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">
                      {userData?.kyc_status === "verified"
                        ? "Identity Verified"
                        : userData?.kyc_status === "pending"
                          ? "Verification Pending"
                          : "Verification Required"}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {userData?.kyc_status === "verified"
                        ? "Your identity has been successfully verified."
                        : userData?.kyc_status === "pending"
                          ? "Your verification is being processed."
                          : "Please complete identity verification to unlock all features."}
                    </p>
                    {userData?.kyc_status !== "verified" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3"
                        onClick={handleInitiateKyc}
                        disabled={initiatingKyc || userData?.kyc_status === "pending"}
                      >
                        {initiatingKyc
                          ? "Initiating..."
                          : userData?.kyc_status === "pending"
                            ? "Verification in Progress"
                            : "Start Verification"}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4 pt-4">
            <Card className="gradient-border">
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Change your password.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Update Password</Button>
              </CardFooter>
            </Card>

            <Card className="gradient-border">
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Enhance your account security with 2FA.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                    </div>
                  </div>
                  <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
                </div>

                {twoFactorAuth && (
                  <div className="rounded-lg bg-secondary p-4">
                    <h4 className="font-medium">Two-Factor Authentication is Enabled</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your account is protected with an authenticator app.
                    </p>
                    <Button variant="outline" size="sm" className="mt-3">
                      <Lock className="h-4 w-4 mr-2" />
                      Reconfigure 2FA
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wallet" className="space-y-4 pt-4">
            <Card className="gradient-border">
              <CardHeader>
                <CardTitle>Wallet Connection</CardTitle>
                <CardDescription>Manage your connected Solana wallet.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {userData?.wallet_address ? (
                  <div className="rounded-lg bg-secondary p-4 flex items-start gap-3">
                    <Wallet className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Wallet Connected</h4>
                      <p className="text-sm font-mono mt-1">{userData.wallet_address}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Connected on {new Date(userData.wallet_verified_at).toLocaleDateString()}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3"
                        onClick={handleDisconnectWallet}
                        disabled={connectingWallet}
                      >
                        {connectingWallet ? "Disconnecting..." : "Disconnect Wallet"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg bg-secondary p-4 flex items-start gap-3">
                    <Wallet className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">No Wallet Connected</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Connect your Solana wallet to enable on-chain transactions.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3"
                        onClick={handleConnectWallet}
                        disabled={connectingWallet}
                      >
                        {connectingWallet ? "Connecting..." : "Connect Wallet"}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4 pt-4">
            <Card className="gradient-border">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive transaction and security alerts via email.
                      </p>
                    </div>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium">Marketing Emails</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive updates about new features and promotions.
                      </p>
                    </div>
                  </div>
                  <Switch checked={marketingEmails} onCheckedChange={setMarketingEmails} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
