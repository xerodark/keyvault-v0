"use client"

import { motion } from "framer-motion"
import { LineChart, Calendar, DollarSign } from "lucide-react"

export function HistoricalPerformance() {
  const monthlyData = [
    { month: "Jan 2023", value: 100, return: 0 },
    { month: "Feb 2023", value: 102.1, return: 2.1 },
    { month: "Mar 2023", value: 105.8, return: 3.6 },
    { month: "Apr 2023", value: 108.2, return: 2.3 },
    { month: "May 2023", value: 111.5, return: 3.0 },
    { month: "Jun 2023", value: 109.8, return: -1.5 },
    { month: "Jul 2023", value: 114.2, return: 4.0 },
    { month: "Aug 2023", value: 117.1, return: 2.5 },
    { month: "Sep 2023", value: 115.6, return: -1.3 },
    { month: "Oct 2023", value: 119.8, return: 3.6 },
    { month: "Nov 2023", value: 122.4, return: 2.2 },
    { month: "Dec 2023", value: 119.5, return: -2.4 },
  ]

  const yearlyData = [
    { year: "2022", apy: 18.2, aum: 2.1, volatility: 3.2 },
    { year: "2023", apy: 19.5, aum: 2.9, volatility: 2.8 },
    { year: "2024", apy: 22.0, aum: 3.47, volatility: 2.1 },
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
            <span className="gradient-text font-medium">Historical Data</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Three Years of <span className="gradient-text">Consistent Growth</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Our track record demonstrates steady performance across different market conditions with superior
            risk-adjusted returns.
          </p>
        </motion.div>

        {/* Monthly Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 rounded-3xl mb-16 glass-shimmer"
        >
          <div className="flex items-center mb-8">
            <LineChart className="h-8 w-8 text-orange-400 mr-3" />
            <h3 className="text-2xl font-bold text-white">2023 Monthly Performance</h3>
          </div>

          <div className="h-80 relative mb-8">
            <div className="absolute inset-0 flex items-end justify-between px-4">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex flex-col items-center group">
                  <div
                    className="w-8 bg-gradient-to-t from-orange-500/40 to-orange-500/10 rounded-t-lg mb-2 glass-glow-orange transition-all duration-300 group-hover:from-orange-500/60 group-hover:to-orange-500/20"
                    style={{ height: `${(data.value - 95) * 4}px` }}
                  ></div>
                  <span className="text-orange-400 font-bold text-sm mb-1">
                    {data.return > 0 ? "+" : ""}
                    {data.return}%
                  </span>
                  <span className="text-white/60 text-xs transform -rotate-45 origin-center">
                    {data.month.split(" ")[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="inner-glass p-4 rounded-xl text-center">
              <h4 className="text-orange-400 font-bold text-lg">Total Return</h4>
              <p className="text-white text-2xl font-bold">19.5%</p>
            </div>
            <div className="inner-glass p-4 rounded-xl text-center">
              <h4 className="text-orange-400 font-bold text-lg">Best Month</h4>
              <p className="text-white text-2xl font-bold">+4.0%</p>
            </div>
            <div className="inner-glass p-4 rounded-xl text-center">
              <h4 className="text-orange-400 font-bold text-lg">Worst Month</h4>
              <p className="text-white text-2xl font-bold">-2.4%</p>
            </div>
          </div>
        </motion.div>

        {/* Yearly Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-8 rounded-3xl glass-shimmer"
        >
          <div className="flex items-center mb-8">
            <Calendar className="h-8 w-8 text-orange-500 mr-3" />
            <h3 className="text-2xl font-bold text-white">Annual Performance Summary</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-6 text-orange-400 font-semibold text-lg">Year</th>
                  <th className="text-center py-4 px-6 text-orange-400 font-semibold text-lg">Annual Return</th>
                  <th className="text-center py-4 px-6 text-orange-400 font-semibold text-lg">AUM (Millions)</th>
                  <th className="text-center py-4 px-6 text-orange-400 font-semibold text-lg">Volatility</th>
                  <th className="text-center py-4 px-6 text-orange-400 font-semibold text-lg">Status</th>
                </tr>
              </thead>
              <tbody>
                {yearlyData.map((data, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 text-white font-medium">{data.year}</td>
                    <td className="py-4 px-6 text-center text-orange-400 font-bold">{data.apy}%</td>
                    <td className="py-4 px-6 text-center text-white">${data.aum}M</td>
                    <td className="py-4 px-6 text-center text-white">{data.volatility}%</td>
                    <td className="py-4 px-6 text-center">
                      <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-sm font-medium">
                        Target Exceeded
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="inner-glass p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <DollarSign className="h-6 w-6 text-orange-400 mr-2" />
                <h4 className="text-white font-bold">Cumulative Growth</h4>
              </div>
              <p className="text-white/70 mb-2">$100,000 invested in 2022 would be worth:</p>
              <p className="text-orange-400 text-3xl font-bold">$171,847</p>
              <p className="text-white/60 text-sm">71.8% total return over 3 years</p>
            </div>
            <div className="inner-glass p-6 rounded-xl">
              <h4 className="text-white font-bold mb-4">Key Achievements</h4>
              <ul className="space-y-2">
                <li className="flex items-center text-white/70">
                  <span className="text-orange-400 mr-2">•</span>
                  Zero negative years
                </li>
                <li className="flex items-center text-white/70">
                  <span className="text-orange-400 mr-2">•</span>
                  Consistently low volatility
                </li>
                <li className="flex items-center text-white/70">
                  <span className="text-orange-400 mr-2">•</span>
                  Outperformed benchmarks
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
