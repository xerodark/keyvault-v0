"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
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

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center text-center">
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
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-white leading-tight max-w-5xl"
          >
            Secure Crypto Investment Made <span className="gradient-text">Simple</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl leading-relaxed"
          >
            Key Vault provides exposure to DeFi through a professionally managed, secure fund structure with{" "}
            <span className="text-orange-400 font-semibold">15-25% annual returns</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-6 mb-16"
          >
            <Button size="lg" className="glass-button text-white px-10 py-6 text-lg rounded-2xl group">
              Start Investing
              <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
            </Button>
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

          {/* Glass stats cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <div className="glass-card p-8 rounded-3xl text-center glass-shimmer">
              <h3 className="text-4xl font-bold gradient-text mb-2">15-25%</h3>
              <p className="text-white/70 text-lg">Annual Returns</p>
            </div>
            <div className="glass-card p-8 rounded-3xl text-center glass-shimmer">
              <h3 className="text-4xl font-bold gradient-text mb-2">2-7%</h3>
              <p className="text-white/70 text-lg">Annual Volatility</p>
            </div>
            <div className="glass-card p-8 rounded-3xl text-center glass-shimmer">
              <h3 className="text-4xl font-bold gradient-text mb-2">8.6-17.9</h3>
              <p className="text-white/70 text-lg">Sharpe Ratio</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      {/* Removing scroll indicator as per instructions */}
    </section>
  )
}
