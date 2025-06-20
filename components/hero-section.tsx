// HeroSection.tsx

"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 md:pt-24 lg:pt-0">
      {/* Complex background with orange emphasis */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 via-black to-orange-800/20" />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />
      <div className="absolute inset-0 bg-dot-white/[0.05]" />

      {/* Animated background blobs - orange primary */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-orange-500/40 rounded-full filter blur-3xl animate-pulse" />
      <div
        className="absolute bottom-20 right-20 w-96 h-96 bg-orange-600/30 rounded-full filter blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/15 rounded-full filter blur-2xl float" />

      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-0 relative z-10">
        <div className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-6rem)] lg:min-h-screen">
          {/* Glass badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-6 py-2 rounded-full glass mb-8"
          >
            <span className="gradient-text font-medium">Institutional-Grade Crypto Fund</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 md:mb-8 text-white leading-tight max-w-5xl"
          >
            Secure Crypto Investment Made <span className="gradient-text">Simple</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl lg:text-2xl text-white/80 mb-8 md:mb-12 max-w-3xl leading-relaxed px-4 md:px-0"
          >
            Key Vault provides exposure to DeFi through a professionally managed, secure fund structure with{" "}
            <span className="text-orange-400 font-semibold">15-25% annual returns</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 mb-8 md:mb-16"
          >
            <Link href="/investor-portal">
              <Button size="lg" className="glass-button text-white px-10 py-6 text-lg rounded-2xl group">
                Investor Portal
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/performance">
              <Button
                size="lg"
                variant="outline"
                className="glass border-orange-500/30 text-white hover:text-white hover:bg-orange-500/10 px-10 py-6 text-lg rounded-2xl"
              >
                Learn More
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
