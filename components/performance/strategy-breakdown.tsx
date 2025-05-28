"use client"

import { motion } from "framer-motion"
import { Settings, Layers, Zap, Shield } from "lucide-react"

export function StrategyBreakdown() {
  const strategyComponents = [
    {
      icon: <Layers className="h-8 w-8 text-orange-400" />,
      title: "Multi-Asset Portfolio",
      allocation: "70%",
      description: "Diversified holdings across Bitcoin, Ethereum, Solana, and emerging DeFi tokens",
      details: ["Bitcoin (35%)", "Ethereum (25%)", "Solana (10%)", "DeFi Tokens (30%)"],
    },
    {
      icon: <Shield className="h-8 w-8 text-orange-500" />,
      title: "Delta Hedging",
      allocation: "20%",
      description: "Advanced derivatives strategies to reduce portfolio volatility and downside risk",
      details: ["Options hedging", "Futures contracts", "Perpetual swaps", "Dynamic rebalancing"],
    },
    {
      icon: <Zap className="h-8 w-8 text-orange-600" />,
      title: "Yield Generation",
      allocation: "10%",
      description: "Active staking and liquidity provision to generate additional returns",
      details: ["ETH 2.0 staking", "DeFi liquidity pools", "Lending protocols", "Validator rewards"],
    },
  ]

  const performanceDrivers = [
    { driver: "Asset Appreciation", contribution: "65%", description: "Core crypto holdings value growth" },
    { driver: "Yield Generation", contribution: "20%", description: "Staking and DeFi protocol rewards" },
    { driver: "Risk Management", contribution: "15%", description: "Volatility reduction and downside protection" },
  ]

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-orange-900/10 to-black" />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <div className="inline-block px-6 py-2 rounded-full glass mb-6">
            <span className="gradient-text font-medium">Investment Strategy</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            How We <span className="gradient-text">Generate Returns</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            A detailed breakdown of our proprietary investment methodology and performance drivers.
          </p>
        </motion.div>

        {/* Strategy Components */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
        >
          {strategyComponents.map((component, index) => (
            <div key={index} className="glass-card p-8 rounded-3xl glass-shimmer">
              <div className="flex items-center mb-6">
                {component.icon}
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-white">{component.title}</h3>
                  <span className="text-orange-400 font-bold text-lg">{component.allocation}</span>
                </div>
              </div>

              <p className="text-white/70 mb-6">{component.description}</p>

              <div className="space-y-2">
                {component.details.map((detail, i) => (
                  <div key={i} className="flex items-center text-white/60 text-sm">
                    <span className="text-orange-400 mr-2">•</span>
                    {detail}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Performance Attribution */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-8 rounded-3xl mb-16 glass-shimmer"
        >
          <div className="flex items-center mb-8">
            <Settings className="h-8 w-8 text-orange-400 mr-3" />
            <h3 className="text-2xl font-bold text-white">Performance Attribution Analysis</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {performanceDrivers.map((driver, index) => (
              <div key={index} className="inner-glass p-6 rounded-xl text-center">
                <h4 className="text-orange-400 font-bold text-lg mb-2">{driver.driver}</h4>
                <p className="text-white text-3xl font-bold mb-2">{driver.contribution}</p>
                <p className="text-white/70 text-sm">{driver.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Detailed Strategy Flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card p-8 rounded-3xl glass-shimmer"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Investment Process Flow</h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-400 font-bold text-xl">1</span>
              </div>
              <h4 className="text-white font-bold mb-2">Asset Selection</h4>
              <p className="text-white/70 text-sm">
                Research and select high-quality crypto assets based on fundamentals
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-400 font-bold text-xl">2</span>
              </div>
              <h4 className="text-white font-bold mb-2">Portfolio Construction</h4>
              <p className="text-white/70 text-sm">
                Build diversified portfolio with optimal risk-return characteristics
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-400 font-bold text-xl">3</span>
              </div>
              <h4 className="text-white font-bold mb-2">Risk Management</h4>
              <p className="text-white/70 text-sm">
                Implement hedging strategies to reduce volatility and protect capital
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-400 font-bold text-xl">4</span>
              </div>
              <h4 className="text-white font-bold mb-2">Yield Optimization</h4>
              <p className="text-white/70 text-sm">Generate additional returns through staking and DeFi protocols</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
