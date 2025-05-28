"use client"

import { motion } from "framer-motion"
import { Shield, AlertTriangle, TrendingDown } from "lucide-react"

export function RiskAnalysis() {
  const riskMetrics = [
    { metric: "Maximum Drawdown", value: "-0.53%", benchmark: "-14.23%", status: "excellent" },
    { metric: "Volatility (Annual)", value: "2.1%", benchmark: "70-80%", status: "excellent" },
    { metric: "Sharpe Ratio", value: "17.9", benchmark: "~1.0", status: "excellent" },
    { metric: "Recovery Time", value: "2 days", benchmark: "90 days", status: "excellent" },
    { metric: "Downside Deviation", value: "1.2%", benchmark: "45%", status: "excellent" },
    { metric: "Value at Risk (95%)", value: "-0.8%", benchmark: "-12%", status: "excellent" },
  ]

  const monthlyReturns = [
    { month: "Jan", return: 2.1, risk: "low" },
    { month: "Feb", return: 3.6, risk: "low" },
    { month: "Mar", return: 2.3, risk: "low" },
    { month: "Apr", return: 3.0, risk: "low" },
    { month: "May", return: -1.5, risk: "medium" },
    { month: "Jun", return: 4.0, risk: "low" },
    { month: "Jul", return: 2.5, risk: "low" },
    { month: "Aug", return: -1.3, risk: "medium" },
    { month: "Sep", return: 3.6, risk: "low" },
    { month: "Oct", return: 2.2, risk: "low" },
    { month: "Nov", return: -2.4, risk: "high" },
    { month: "Dec", return: 1.8, risk: "low" },
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
            <span className="gradient-text font-medium">Risk Management</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Superior <span className="gradient-text">Risk Control</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Our advanced hedging strategies and risk management protocols deliver exceptional risk-adjusted returns.
          </p>
        </motion.div>

        {/* Risk Metrics Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 rounded-3xl mb-16 glass-shimmer"
        >
          <div className="flex items-center mb-8">
            <Shield className="h-8 w-8 text-orange-400 mr-3" />
            <h3 className="text-2xl font-bold text-white">Risk Metrics vs. Traditional Crypto</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-6 text-orange-400 font-semibold text-lg">Risk Metric</th>
                  <th className="text-center py-4 px-6 text-orange-400 font-semibold text-lg">Key Vault</th>
                  <th className="text-center py-4 px-6 text-orange-400 font-semibold text-lg">Traditional Crypto</th>
                  <th className="text-center py-4 px-6 text-orange-400 font-semibold text-lg">Improvement</th>
                </tr>
              </thead>
              <tbody>
                {riskMetrics.map((metric, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 text-white font-medium">{metric.metric}</td>
                    <td className="py-4 px-6 text-center text-orange-400 font-bold">{metric.value}</td>
                    <td className="py-4 px-6 text-center text-red-400">{metric.benchmark}</td>
                    <td className="py-4 px-6 text-center">
                      <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                        Excellent
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Monthly Risk Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <div className="glass-card p-8 rounded-3xl glass-shimmer">
            <div className="flex items-center mb-6">
              <TrendingDown className="h-8 w-8 text-orange-500 mr-3" />
              <h3 className="text-2xl font-bold text-white">Monthly Risk Profile</h3>
            </div>

            <div className="space-y-4">
              {monthlyReturns.map((data, index) => (
                <div key={index} className="flex items-center justify-between p-3 inner-glass rounded-lg">
                  <span className="text-white font-medium">{data.month}</span>
                  <span className={`font-bold ${data.return > 0 ? "text-green-400" : "text-red-400"}`}>
                    {data.return > 0 ? "+" : ""}
                    {data.return}%
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      data.risk === "low"
                        ? "bg-green-500/20 text-green-400"
                        : data.risk === "medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {data.risk}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl glass-shimmer">
            <div className="flex items-center mb-6">
              <AlertTriangle className="h-8 w-8 text-orange-600 mr-3" />
              <h3 className="text-2xl font-bold text-white">Risk Management Strategy</h3>
            </div>

            <div className="space-y-6">
              <div className="inner-glass p-4 rounded-xl">
                <h4 className="text-orange-400 font-bold mb-2">Delta Hedging</h4>
                <p className="text-white/70 text-sm">
                  Automatically adjusts portfolio exposure to maintain target risk levels during market volatility.
                </p>
              </div>

              <div className="inner-glass p-4 rounded-xl">
                <h4 className="text-orange-400 font-bold mb-2">Diversification</h4>
                <p className="text-white/70 text-sm">
                  Spread across multiple high-quality cryptocurrencies to reduce concentration risk.
                </p>
              </div>

              <div className="inner-glass p-4 rounded-xl">
                <h4 className="text-orange-400 font-bold mb-2">Real-time Monitoring</h4>
                <p className="text-white/70 text-sm">
                  24/7 risk monitoring with automated alerts and position adjustments.
                </p>
              </div>

              <div className="inner-glass p-4 rounded-xl">
                <h4 className="text-orange-400 font-bold mb-2">Stress Testing</h4>
                <p className="text-white/70 text-sm">
                  Regular portfolio stress tests against historical market crash scenarios.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
