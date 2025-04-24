"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "bg-black/80 backdrop-blur-md py-3" : "bg-transparent py-5",
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-md transform rotate-45"></div>
            <div className="absolute inset-1 bg-black rounded-sm transform rotate-45 flex items-center justify-center">
              <span className="text-white font-bold text-xs">KV</span>
            </div>
          </div>
          <span className="font-bold text-xl tracking-tight">Key Vault</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLinks />
          <Button
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-none"
            size="sm"
          >
            Invest Now
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white focus:outline-none" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-zinc-900/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <MobileNavLinks closeMenu={() => setIsMobileMenuOpen(false)} />
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-none w-full">
              Invest Now
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

function NavLinks() {
  return (
    <>
      <Link href="#about" className="text-sm text-zinc-300 hover:text-white transition-colors">
        About
      </Link>
      <Link href="#solution" className="text-sm text-zinc-300 hover:text-white transition-colors">
        Solution
      </Link>
      <Link href="#team" className="text-sm text-zinc-300 hover:text-white transition-colors">
        Team
      </Link>
      <Link href="#performance" className="text-sm text-zinc-300 hover:text-white transition-colors">
        Performance
      </Link>
      <Link href="#contact" className="text-sm text-zinc-300 hover:text-white transition-colors">
        Contact
      </Link>
    </>
  )
}

function MobileNavLinks({ closeMenu }: { closeMenu: () => void }) {
  return (
    <>
      <Link
        href="#about"
        className="text-base py-2 text-zinc-300 hover:text-white transition-colors"
        onClick={closeMenu}
      >
        About
      </Link>
      <Link
        href="#solution"
        className="text-base py-2 text-zinc-300 hover:text-white transition-colors"
        onClick={closeMenu}
      >
        Solution
      </Link>
      <Link
        href="#team"
        className="text-base py-2 text-zinc-300 hover:text-white transition-colors"
        onClick={closeMenu}
      >
        Team
      </Link>
      <Link
        href="#performance"
        className="text-base py-2 text-zinc-300 hover:text-white transition-colors"
        onClick={closeMenu}
      >
        Performance
      </Link>
      <Link
        href="#contact"
        className="text-base py-2 text-zinc-300 hover:text-white transition-colors"
        onClick={closeMenu}
      >
        Contact
      </Link>
    </>
  )
}
