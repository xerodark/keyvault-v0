"use client"

import { useState } from "react"
import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface AdminUserTableProps {
  users: any[]
}

export function AdminUserTable({ users }: AdminUserTableProps) {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleRoleChange = async (userId: number, newRole: string) => {
    setIsUpdating(true)

    try {
      await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          role: newRole,
        }),
      })

      // Reload the page to refresh the data
      window.location.reload()
    } catch (error) {
      console.error("Error updating user role:", error)
      alert("Failed to update user role")
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>KYC Status</TableHead>
            <TableHead className="text-right">Fund Share</TableHead>
            <TableHead className="text-right">Current Value</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${user.role === "admin" ? "bg-primary/20 text-primary" : "bg-secondary"}`}
                >
                  {user.role}
                </span>
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    user.kyc_status === "verified"
                      ? "bg-green-500/20 text-green-500"
                      : user.kyc_status === "pending"
                        ? "bg-yellow-500/20 text-yellow-500"
                        : "bg-red-500/20 text-red-500"
                  }`}
                >
                  {user.kyc_status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                {user.portfolio ? `${Number(user.portfolio.fund_share_percent).toFixed(2)}%` : "0%"}
              </TableCell>
              <TableCell className="text-right">
                ${user.portfolio ? Number(user.portfolio.current_value).toLocaleString() : "0"}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleRoleChange(user.id, user.role === "admin" ? "user" : "admin")}
                      disabled={isUpdating}
                    >
                      {user.role === "admin" ? "Remove Admin Role" : "Make Admin"}
                    </DropdownMenuItem>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
