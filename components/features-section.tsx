"use client"

import { motion } from "framer-motion"
import { ShieldCheckIcon, ChartBarIcon, ClockIcon, BoltIcon, Check } from "@heroicons/react/24/outline"

export function FeaturesSection() {
  const features = [
    {
      icon: <ChartBarIcon className="h-12 w-12 text-orange-600" />,
      title: "Proprietary Investment Index",
      description:
        "Our diversified portfolio invests in high-quality crypto like Bitcoin, Ethereum, and Solana, with advanced hedging strategies to protect your investment during market downturns.",
    },
    {
      icon: <ClockIcon className="h-12 w-12 text-orange-700" />,
      title: "Perfect Timing",
      description:
        "With institutional Bitcoin ETFs surpassing $100B and Ethereum ETFs reaching $5.72B in AUM, we're positioned at the perfect moment as crypto becomes a legitimate financial instrument.",
    },
    {
      icon: <ShieldCheckIcon className="h-12 w-12 text-orange-600" />,
      title: "Advanced Risk Management",
      description:
        "Our advanced hedging strategy protects your investment during market downturns, reducing losses and stabilizing overall returns with annual volatility of just 2-7%.",
    },
    {
      icon: <BoltIcon className="h-12 w-12 text-orange-800" />,
      title: "Consistent Yield Generation",
      description:
        "Assets don't just sit idle. We stake them or provide liquidity, earning interest-like yield regularly. This provides steady, passive income.",
    },
  ]

  return (
    <section id="features" className="py-32 relative overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-orange-50/30 to-gray-50" />
      <div className="absolute inset-0 bg-grid-black/[0.02]" />

      {/* Floating background elements - orange primary for light mode */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-200/40 rounded-full filter blur-3xl float" />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-300/30 rounded-full filter blur-3xl float"
        style={{ animationDelay: "3s" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-6 py-2 rounded-full glass-light mb-6"
          >
            <span className="gradient-text-light font-medium">Key Features</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-gray-900"
          >
            What makes <span className="gradient-text-light">Key Vault</span> unique?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Our proprietary approach combines security, timing, and expertise to deliver exceptional results.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass-card-light p-10 rounded-3xl glass-shimmer group"
            >
              <div className="mb-8 p-4 glass-subtle-light rounded-2xl inline-block">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Risk management showcase - orange emphasis for light mode */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="glass-card-light p-12 rounded-3xl relative overflow-hidden glass-glow-light"
        >
          <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
            <div className="lg:w-1/2">
              <h3 className="text-3xl font-bold mb-6 text-orange-600">Smart Risk Management</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Our platform handles all the complexity of crypto investing, from security to portfolio management, so
                you can focus on your returns without the technical challenges.
              </p>
            </div>

            <div className="w-full lg:w-1/2 p-4 sm:p-8">
              <h4 className="font-bold mb-4 sm:mb-6 text-center text-gray-900 text-lg sm:text-xl">
                Risk-Adjusted Return
              </h4>
              <div className="space-y-4 sm:space-y-6">
                {/* Bitcoin Buy & Hold */}
                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-baseline">
                  <span className="text-gray-600 text-base sm:text-lg text-center sm:text-left">
                    Bitcoin Buy &amp; Hold
                  </span>
                  <span className="text-gray-900 font-medium text-base sm:text-lg text-center sm:text-right">
                    ~1 Sharpe Ratio
                  </span>
                </div>
                {/* Unhedged Diverse Portfolio */}
                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-baseline">
                  <span className="text-gray-600 text-base sm:text-lg text-center sm:text-left">
                    Unhedged Diverse Portfolio
                  </span>
                  <span className="text-gray-900 font-medium text-base sm:text-lg text-center sm:text-right">
                    ~1.08 Sharpe Ratio
                  </span>
                </div>
                {/* Key Vault Strategy Highlight */}
                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-baseline p-3 sm:p-4 highlight-glass-light rounded-xl">
                  <span className="flex items-center text-orange-600 font-bold text-base sm:text-lg text-center sm:text-left">
                    <span className="inline-block w-2 h-2 bg-orange-600 rounded-sm mr-2"></span>
                    Key Vault Strategy
                  </span>
                  <span className="gradient-text-light font-bold text-base sm:text-lg text-center sm:text-right">
                    ~8.6-17.9 Sharpe Ratio
                  </span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
