"use client"

import { motion } from "framer-motion"
import { TrendingUp, Calculator, Target } from "lucide-react"

export function FutureProjections() {
  const projectionScenarios = [
    {
      scenario: "Conservative",
      return: "15-18%",
      probability: "80%",
      description: "Market downturns and regulatory challenges",
    },
    {
      scenario: "Base Case",
      return: "18-22%",
      probability: "60%",
      description: "Normal market conditions with steady growth",
    },
    {
      scenario: "Optimistic",
      return: "22-25%",
      probability: "40%",
      description: "Favorable market conditions and adoption",
    },
  ]

  const growthProjections = [
    { year: 2025, conservative: 117200, base: 122000, optimistic: 127500 },
    { year: 2026, conservative: 134780, base: 148840, optimistic: 159375 },
    { year: 2027, conservative: 155000, base: 181584, optimistic: 199219 },
    { year: 2028, conservative: 178250, base: 221532, optimistic: 249024 },
    { year: 2029, conservative: 204988, base: 270269, optimistic: 311280 },
  ]

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-orange-900/15 to-black" />
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
            <span className="gradient-text font-medium">Future Outlook</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Growth <span className="gradient-text">Projections</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Data-driven projections based on market analysis, historical performance, and strategic positioning.
          </p>
        </motion.div>

        {/* Scenario Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 rounded-3xl mb-16 glass-shimmer"
        >
          <div className="flex items-center mb-8">
            <Target className="h-8 w-8 text-orange-400 mr-3" />
            <h3 className="text-2xl font-bold text-white">2025-2029 Return Scenarios</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {projectionScenarios.map((scenario, index) => (
              <div key={index} className="inner-glass p-6 rounded-xl text-center">
                <h4 className="text-orange-400 font-bold text-xl mb-2">{scenario.scenario}</h4>
                <p className="text-white text-3xl font-bold mb-2">{scenario.return}</p>
                <p className="text-white/60 text-sm mb-4">Probability: {scenario.probability}</p>
                <p className="text-white/70 text-sm">{scenario.description}</p>
              </div>
            ))}
          </div>

          <div className="inner-glass p-6 rounded-xl">
            <h4 className="text-orange-400 font-bold text-lg mb-4">Key Growth Drivers</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="space-y-2">
                <li className="flex items-center text-white/70">
                  <span className="text-orange-400 mr-2">•</span>
                  Institutional crypto adoption acceleration
                </li>
                <li className="flex items-center text-white/70">
                  <span className="text-orange-400 mr-2">•</span>
                  Regulatory clarity improvements
                </li>
                <li className="flex items-center text-white/70">
                  <span className="text-orange-400 mr-2">•</span>
                  DeFi protocol maturation
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-center text-white/70">
                  <span className="text-orange-400 mr-2">•</span>
                  Enhanced hedging strategies
                </li>
                <li className="flex items-center text-white/70">
                  <span className="text-orange-400 mr-2">•</span>
                  Expanded asset universe
                </li>
                <li className="flex items-center text-white/70">
                  <span className="text-orange-400 mr-2">•</span>
                  Improved yield opportunities
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Growth Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <div className="glass-card p-8 rounded-3xl glass-shimmer">
            <div className="flex items-center mb-6">
              <Calculator className="h-8 w-8 text-orange-500 mr-3" />
              <h3 className="text-2xl font-bold text-white">Investment Growth Calculator</h3>
            </div>

            <div className="space-y-6">
              <div className="inner-glass p-4 rounded-xl">
                <h4 className="text-orange-400 font-bold mb-4">$100,000 Investment Scenarios</h4>
                <div className="space-y-3">
                  {growthProjections.map((projection, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-white/70">{projection.year}</span>
                      <div className="flex space-x-4 text-sm">
                        <span className="text-red-300">${projection.conservative.toLocaleString()}</span>
                        <span className="text-orange-400 font-bold">${projection.base.toLocaleString()}</span>
                        <span className="text-green-400">${projection.optimistic.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="inner-glass p-4 rounded-xl">
                <h4 className="text-orange-400 font-bold mb-2">5-Year Projections</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-red-300 text-lg font-bold">$205K</p>
                    <p className="text-white/60 text-xs">Conservative</p>
                  </div>
                  <div>
                    <p className="text-orange-400 text-lg font-bold">$270K</p>
                    <p className="text-white/60 text-xs">Base Case</p>
                  </div>
                  <div>
                    <p className="text-green-400 text-lg font-bold">$311K</p>
                    <p className="text-white/60 text-xs">Optimistic</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl glass-shimmer">
            <div className="flex items-center mb-6">
              <TrendingUp className="h-8 w-8 text-orange-600 mr-3" />
              <h3 className="text-2xl font-bold text-white">Market Outlook</h3>
            </div>

            <div className="space-y-6">
              <div className="inner-glass p-4 rounded-xl">
                <h4 className="text-orange-400 font-bold mb-2">Crypto Market Trends</h4>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li>• Bitcoin ETFs reaching $200B+ AUM by 2026</li>
                  <li>• Ethereum staking yield stabilizing at 4-6%</li>
                  <li>• Solana ecosystem expansion accelerating</li>
                  <li>• DeFi TVL expected to reach $500B</li>
                </ul>
              </div>

              <div className="inner-glass p-4 rounded-xl">
                <h4 className="text-orange-400 font-bold mb-2">Regulatory Environment</h4>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li>• Clearer institutional frameworks</li>
                  <li>• Stablecoin regulation providing stability</li>
                  <li>• Tax clarity improving adoption</li>
                  <li>• Global coordination increasing</li>
                </ul>
              </div>

              <div className="inner-glass p-4 rounded-xl">
                <h4 className="text-orange-400 font-bold mb-2">Technology Advances</h4>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li>• Layer 2 scaling solutions maturing</li>
                  <li>• Cross-chain interoperability improving</li>
                  <li>• Institutional custody solutions</li>
                  <li>• Advanced risk management tools</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
