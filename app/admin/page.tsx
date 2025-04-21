import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { Header } from "@/components/header"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  // If not authenticated, redirect to login
  if (!session) {
    redirect("/login")
  }

  // Check if user is an admin
  const user = await prisma.user.findUnique({
    where: {
      id: Number.parseInt(session.user.id),
    },
    select: {
      role: true,
    },
  })

  // If not an admin, redirect to dashboard
  if (!user || user.role !== "admin") {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <AdminDashboard />
      </main>
    </div>
  )
}
