"use client"

import { motion } from "framer-motion"
import { BarChart3, Target, Award } from "lucide-react"

export function ComparativeAnalysis() {
  const benchmarkData = [
    { name: "Key Vault Fund", return: 22.0, volatility: 2.1, sharpe: 17.9, maxDrawdown: -0.53, color: "orange" },
    { name: "Bitcoin (BTC)", return: 45.2, volatility: 78.5, sharpe: 0.9, maxDrawdown: -14.23, color: "yellow" },
    { name: "Ethereum (ETH)", return: 38.7, volatility: 82.1, sharpe: 0.8, maxDrawdown: -16.8, color: "blue" },
    { name: "S&P 500", return: 11.2, volatility: 18.2, sharpe: 0.6, maxDrawdown: -3.5, color: "green" },
    { name: "Crypto Index", return: 28.4, volatility: 65.3, sharpe: 0.7, maxDrawdown: -12.1, color: "purple" },
  ]

  const performanceCategories = [
    { category: "Risk-Adjusted Returns", keyVault: "Excellent", market: "Poor", advantage: "17x better Sharpe ratio" },
    { category: "Volatility Management", keyVault: "Excellent", market: "Poor", advantage: "37x lower volatility" },
    { category: "Downside Protection", keyVault: "Excellent", market: "Poor", advantage: "27x smaller drawdowns" },
    { category: "Recovery Speed", keyVault: "Excellent", market: "Poor", advantage: "45x faster recovery" },
    { category: "Consistency", keyVault: "Excellent", market: "Poor", advantage: "Zero negative years" },
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
            <span className="gradient-text font-medium">Benchmark Analysis</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            How We <span className="gradient-text">Compare</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Side-by-side comparison with major cryptocurrencies and traditional investment vehicles.
          </p>
        </motion.div>

        {/* Performance Comparison Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 rounded-3xl mb-16 glass-shimmer"
        >
          <div className="flex items-center mb-8">
            <BarChart3 className="h-8 w-8 text-orange-400 mr-3" />
            <h3 className="text-2xl font-bold text-white">Risk vs. Return Analysis</h3>
          </div>

          <div className="overflow-x-auto mb-8">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-6 text-orange-400 font-semibold text-lg">Investment</th>
                  <th className="text-center py-4 px-6 text-orange-400 font-semibold text-lg">2024 Return</th>
                  <th className="text-center py-4 px-6 text-orange-400 font-semibold text-lg">Volatility</th>
                  <th className="text-center py-4 px-6 text-orange-400 font-semibold text-lg">Sharpe Ratio</th>
                  <th className="text-center py-4 px-6 text-orange-400 font-semibold text-lg">Max Drawdown</th>
                </tr>
              </thead>
              <tbody>
                {benchmarkData.map((item, index) => (
                  <tr
                    key={index}
                    className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                      item.name === "Key Vault Fund" ? "highlight-glass" : ""
                    }`}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div
                          className={`w-3 h-3 rounded-full mr-3 ${
                            item.color === "orange"
                              ? "bg-orange-400"
                              : item.color === "yellow"
                                ? "bg-yellow-400"
                                : item.color === "blue"
                                  ? "bg-blue-400"
                                  : item.color === "green"
                                    ? "bg-green-400"
                                    : "bg-purple-400"
                          }`}
                        ></div>
                        <span
                          className={`font-medium ${item.name === "Key Vault Fund" ? "text-orange-400" : "text-white"}`}
                        >
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td
                      className={`py-4 px-6 text-center font-bold ${
                        item.name === "Key Vault Fund" ? "text-orange-400" : "text-white"
                      }`}
                    >
                      {item.return}%
                    </td>
                    <td
                      className={`py-4 px-6 text-center ${
                        item.name === "Key Vault Fund" ? "text-orange-400 font-bold" : "text-white"
                      }`}
                    >
                      {item.volatility}%
                    </td>
                    <td
                      className={`py-4 px-6 text-center ${
                        item.name === "Key Vault Fund" ? "text-orange-400 font-bold" : "text-white"
                      }`}
                    >
                      {item.sharpe}
                    </td>
                    <td
                      className={`py-4 px-6 text-center ${
                        item.name === "Key Vault Fund" ? "text-orange-400 font-bold" : "text-white"
                      }`}
                    >
                      {item.maxDrawdown}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="inner-glass p-4 rounded-xl text-center">
              <Target className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <h4 className="text-orange-400 font-bold text-lg">Best Risk-Adjusted Return</h4>
              <p className="text-white/70">17.9 Sharpe Ratio vs. market average of 0.8</p>
            </div>
            <div className="inner-glass p-4 rounded-xl text-center">
              <Award className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <h4 className="text-orange-400 font-bold text-lg">Lowest Volatility</h4>
              <p className="text-white/70">2.1% vs. crypto average of 75%</p>
            </div>
            <div className="inner-glass p-4 rounded-xl text-center">
              <BarChart3 className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h4 className="text-orange-400 font-bold text-lg">Superior Protection</h4>
              <p className="text-white/70">-0.53% max drawdown vs. -14% average</p>
            </div>
          </div>
        </motion.div>

        {/* Competitive Advantages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-8 rounded-3xl glass-shimmer"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Competitive Advantages</h3>

          <div className="space-y-4">
            {performanceCategories.map((category, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 inner-glass rounded-xl">
                <div className="text-white font-medium">{category.category}</div>
                <div className="text-center">
                  <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-sm font-medium">
                    {category.keyVault}
                  </span>
                </div>
                <div className="text-center">
                  <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm font-medium">
                    {category.market}
                  </span>
                </div>
                <div className="text-white/70 text-sm">{category.advantage}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
