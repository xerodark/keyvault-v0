"use client"

import { type FC, useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Menu, X, Wallet, LogOut, User, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useApi } from "@/hooks/use-api"

const navItems = [
  { name: "Dashboard", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Deposit", href: "/deposit" },
  { name: "Withdraw", href: "/withdraw" },
  { name: "Settings", href: "/settings" },
]

export const Header: FC = () => {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: session } = useSession()
  const { data: userData } = useApi(session?.user?.id ? `/api/user/${session.user.id}` : null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (userData?.role === "admin") {
      setIsAdmin(true)
    }
  }, [userData])

  const handleConnectWallet = () => {
    // This is a placeholder for the wallet connection flow
    alert("Wallet connection is not yet implemented")
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: "/login" })
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="text-xl font-bold">Key Vault</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-primary" : "text-muted-foreground",
              )}
            >
              {item.name}
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/admin"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/admin" ? "text-primary" : "text-muted-foreground",
              )}
            >
              Admin
            </Link>
          )}
        </nav>

        {/* User Menu / Connect Wallet Button */}
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              {isAdmin && (
                <DropdownMenuItem asChild>
                  <Link href="/admin">
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Admin Dashboard</span>
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={handleConnectWallet}>
                <Wallet className="mr-2 h-4 w-4" />
                <span>Connect Wallet</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button className="hidden md:flex items-center gap-2" onClick={handleConnectWallet}>
            <Wallet className="h-4 w-4" />
            Connect Wallet
          </Button>
        )}

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden p-4 pt-0 bg-background border-b border-border/40 animate-fade-in">
          <nav className="flex flex-col space-y-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary p-2 rounded-md",
                  pathname === item.href ? "text-primary bg-secondary" : "text-muted-foreground",
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {isAdmin && (
              <Link
                href="/admin"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary p-2 rounded-md",
                  pathname === "/admin" ? "text-primary bg-secondary" : "text-muted-foreground",
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            {session ? (
              <Button variant="outline" className="mt-2" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Log out
              </Button>
            ) : (
              <Button className="mt-2 w-full flex items-center justify-center gap-2" onClick={handleConnectWallet}>
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
