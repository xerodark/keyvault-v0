"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import Image from "next/image"

export function Header() {
  const [scrollY, setScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Calculate opacity based on scroll position
  // Starts at 0 (fully transparent) and reaches 1 (fully opaque) at 300px scroll
  const calculateOpacity = () => {
    const maxScroll = 300
    const opacity = Math.min(scrollY / maxScroll, 1)
    return opacity
  }

  // Calculate background opacity for the header
  const backgroundOpacity = calculateOpacity()

  // Determine if we should show the enhanced header styling
  const isScrolled = scrollY > 50

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
        isScrolled ? "py-2" : "py-4",
      )}
      style={{
        background: `rgba(10, 10, 10, ${backgroundOpacity * 0.8})`,
        backdropFilter: `blur(${backgroundOpacity * 24}px)`,
        WebkitBackdropFilter: `blur(${backgroundOpacity * 24}px)`,
        borderBottom: backgroundOpacity > 0.5 ? `1px solid rgba(255, 255, 255, ${backgroundOpacity * 0.1})` : "none",
      }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/" className="flex items-center">
            <div className="relative h-55 w-auto flex items-center">
              <Image
                src="/images/8.png"
                alt="Key Vault Logo"
                width={300}
                height={80}
                className="object-contain h-full w-auto max-h-45"
                priority
              />
            </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center space-x-8"
          >
            <NavLinks />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              className="text-white px-6 py-2 rounded-xl transition-all duration-300"
              size="sm"
              style={{
                background: `rgba(249, 115, 22, ${0.15 + backgroundOpacity * 0.1})`,
                backdropFilter: `blur(16px)`,
                WebkitBackdropFilter: `blur(16px)`,
                boxShadow: `0 4px 16px 0 rgba(249, 115, 22, ${0.2 + backgroundOpacity * 0.1})`,
              }}
            >
              Get Started
            </Button>
          </motion.div>
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="md:hidden text-white focus:outline-none p-2 rounded-xl transition-all duration-300"
          onClick={toggleMobileMenu}
          style={{
            background: `rgba(255, 255, 255, ${0.03 + backgroundOpacity * 0.05})`,
            backdropFilter: `blur(${8 + backgroundOpacity * 4}px)`,
            WebkitBackdropFilter: `blur(${8 + backgroundOpacity * 4}px)`,
          }}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `rgba(10, 10, 10, ${Math.max(backgroundOpacity, 0.8)})`,
            backdropFilter: `blur(24px)`,
            WebkitBackdropFilter: `blur(24px)`,
            borderTop: `1px solid rgba(255, 255, 255, 0.05)`,
          }}
        >
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            <MobileNavLinks closeMenu={() => setIsMobileMenuOpen(false)} />
            <Button
              className="text-white w-full py-3 rounded-xl"
              style={{
                background: `rgba(249, 115, 22, 0.25)`,
                backdropFilter: `blur(16px)`,
                WebkitBackdropFilter: `blur(16px)`,
                boxShadow: `0 4px 16px 0 rgba(249, 115, 22, 0.3)`,
              }}
            >
              Get Started
            </Button>
          </div>
        </motion.div>
      )}
    </header>
  )
}

function NavLinks() {
  return (
    <>
      <Link href="#features" className="text-white/90 hover:text-white transition-colors font-medium">
        Features
      </Link>
      <Link href="/performance" className="text-white/90 hover:text-white transition-colors font-medium">
        Performance
      </Link>
      <Link href="#team" className="text-white/90 hover:text-white transition-colors font-medium">
        Team
      </Link>
      <Link href="#contact" className="text-white/90 hover:text-white transition-colors font-medium">
        Contact
      </Link>
    </>
  )
}

function MobileNavLinks({ closeMenu }: { closeMenu: () => void }) {
  return (
    <>
      <Link
        href="#features"
        className="text-lg py-3 text-white/90 hover:text-white transition-colors font-medium"
        onClick={closeMenu}
      >
        Features
      </Link>
      <Link
        href="/performance"
        className="text-lg py-3 text-white/90 hover:text-white transition-colors font-medium"
        onClick={closeMenu}
      >
        Performance
      </Link>
      <Link
        href="#team"
        className="text-lg py-3 text-white/90 hover:text-white transition-colors font-medium"
        onClick={closeMenu}
      >
        Team
      </Link>
      <Link
        href="#contact"
        className="text-lg py-3 text-white/90 hover:text-white transition-colors font-medium"
        onClick={closeMenu}
      >
        Contact
      </Link>
    </>
  )
}
