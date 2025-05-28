"use client"

import { motion } from "framer-motion"
import { TrendingUp, BarChart3, Shield } from "lucide-react"

export function PerformanceHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 via-black to-orange-800/20" />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />

      {/* Animated background elements */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-orange-500/40 rounded-full filter blur-3xl animate-pulse" />
      <div
        className="absolute bottom-20 right-20 w-96 h-96 bg-orange-600/30 rounded-full filter blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-6 py-2 rounded-full glass mb-8"
          >
            <span className="gradient-text font-medium">Performance Analytics</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-white leading-tight max-w-6xl"
          >
            Proven <span className="gradient-text">Performance</span> & Future Potential
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl leading-relaxed"
          >
            Comprehensive analysis of our track record, risk management strategies, and growth projections that
            demonstrate consistent outperformance in the cryptocurrency investment space.
          </motion.p>

          {/* Key metrics cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16"
          >
            <div className="glass-card p-8 rounded-3xl text-center glass-shimmer">
              <TrendingUp className="h-12 w-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-4xl font-bold gradient-text mb-2">22%</h3>
              <p className="text-white/70 text-lg">2024 Annual Return</p>
              <p className="text-orange-400 text-sm mt-2">+2.5% vs Target</p>
            </div>
            <div className="glass-card p-8 rounded-3xl text-center glass-shimmer">
              <Shield className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-4xl font-bold gradient-text mb-2">-0.30%</h3>
              <p className="text-white/70 text-lg">Max Daily Drop</p>
              <p className="text-orange-400 text-sm mt-2">Industry Leading</p>
            </div>
            <div className="glass-card p-8 rounded-3xl text-center glass-shimmer">
              <BarChart3 className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-4xl font-bold gradient-text mb-2">17.9</h3>
              <p className="text-white/70 text-lg">Sharpe Ratio</p>
              <p className="text-orange-400 text-sm mt-2">Risk-Adjusted Excellence</p>
            </div>
          </motion.div>

          {/* Navigation indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex space-x-4"
          >
            <div className="w-3 h-3 rounded-full bg-orange-400"></div>
            <div className="w-3 h-3 rounded-full bg-orange-400/40"></div>
            <div className="w-3 h-3 rounded-full bg-orange-400/40"></div>
            <div className="w-3 h-3 rounded-full bg-orange-400/40"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
