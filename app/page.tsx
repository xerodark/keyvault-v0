import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { Header } from "@/components/header"
import { UserDashboard } from "@/components/dashboard/user-dashboard"
import { authOptions } from "@/lib/auth"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  // If not authenticated, redirect to login
  if (!session) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <UserDashboard />
      </main>
    </div>
  )
}
