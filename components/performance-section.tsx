"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart, LineChart, TrendingUp } from "lucide-react"

export function PerformanceSection() {
  return (
    <section id="performance" className="py-20 bg-zinc-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-900/20 to-zinc-900"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Proven <span className="text-orange-400">Performance</span> & Future Potential
          </h2>
          <p className="text-zinc-400 max-w-3xl mx-auto">
            Our track record demonstrates consistent growth with minimal volatility.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-zinc-800/50 border-zinc-700 h-full backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-6 w-6 text-orange-400 mr-2" />
                  <h3 className="text-xl font-bold text-white">APY Historical and Projected</h3>
                </div>
                <div className="h-64 relative">
                  <div className="absolute inset-0 flex items-end">
                    <div className="w-1/3 h-[78%] bg-orange-500/20 border-t border-orange-500 flex flex-col items-center justify-end p-2">
                      <span className="text-orange-400 font-bold text-xl mb-2">19.5%</span>
                      <span className="text-zinc-400 text-sm">2023</span>
                    </div>
                    <div className="w-1/3 h-[90%] bg-orange-500/30 border-t border-orange-500 flex flex-col items-center justify-end p-2">
                      <span className="text-orange-400 font-bold text-xl mb-2">22%</span>
                      <span className="text-zinc-400 text-sm">2024</span>
                    </div>
                    <div className="w-1/3 h-[70%] bg-orange-500/20 border-t border-orange-500 flex flex-col items-center justify-end p-2">
                      <span className="text-orange-400 font-bold text-xl mb-2">17.2%</span>
                      <span className="text-zinc-400 text-sm">2025 (Projected)</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-zinc-700">
                  <p className="text-zinc-400 text-sm">
                    Key Vault has consistently delivered strong annual returns between 15-25%, outperforming traditional
                    investment vehicles while maintaining lower volatility.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-zinc-800/50 border-zinc-700 h-full backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <BarChart className="h-6 w-6 text-orange-500 mr-2" />
                  <h3 className="text-xl font-bold text-white">3 Year Historical Fund Growth</h3>
                </div>
                <div className="h-64 relative">
                  <div className="absolute inset-0 flex items-end">
                    <div className="w-1/3 h-[70%] bg-orange-500/20 border-t border-orange-500 flex flex-col items-center justify-end p-2">
                      <span className="text-orange-400 font-bold text-xl mb-2">$2.9M</span>
                      <span className="text-zinc-400 text-sm">2023</span>
                    </div>
                    <div className="w-1/3 h-[85%] bg-orange-500/30 border-t border-orange-500 flex flex-col items-center justify-end p-2">
                      <span className="text-orange-400 font-bold text-xl mb-2">$3.47M</span>
                      <span className="text-zinc-400 text-sm">2024</span>
                    </div>
                    <div className="w-1/3 h-[100%] bg-orange-500/20 border-t border-orange-500 flex flex-col items-center justify-end p-2">
                      <span className="text-orange-400 font-bold text-xl mb-2">$4.06M</span>
                      <span className="text-zinc-400 text-sm">2025</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-zinc-700">
                  <p className="text-zinc-400 text-sm">
                    Our assets under management have grown steadily over the past three years, reflecting both strong
                    performance and increasing investor confidence.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-zinc-800/50 border-zinc-700 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center mb-6">
                <LineChart className="h-6 w-6 text-orange-600 mr-2" />
                <h3 className="text-xl font-bold text-white">3 Year Max Draw Down Comparison</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-700">
                      <th className="text-left py-3 px-4 text-zinc-400 font-medium">Strategy</th>
                      <th className="text-center py-3 px-4 text-zinc-400 font-medium">Max Daily Drop (%)</th>
                      <th className="text-center py-3 px-4 text-zinc-400 font-medium">Worst 24h Return (%)</th>
                      <th className="text-center py-3 px-4 text-zinc-400 font-medium">Recovery Days (est.)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-zinc-800">
                      <td className="py-3 px-4 text-zinc-300">Unhedged Crypto (BTC)</td>
                      <td className="py-3 px-4 text-center text-red-400">-9.79%</td>
                      <td className="py-3 px-4 text-center text-red-400">-14.23%</td>
                      <td className="py-3 px-4 text-center text-zinc-300">90 days</td>
                    </tr>
                    <tr className="border-b border-zinc-800 bg-orange-900/10">
                      <td className="py-3 px-4 text-orange-400 font-medium">Key Vault Fund</td>
                      <td className="py-3 px-4 text-center text-orange-400 font-medium">-0.30%</td>
                      <td className="py-3 px-4 text-center text-orange-400 font-medium">-0.53%</td>
                      <td className="py-3 px-4 text-center text-orange-400 font-medium">2 days</td>
                    </tr>
                    <tr className="border-b border-zinc-800">
                      <td className="py-3 px-4 text-zinc-300">S&P 500 Index</td>
                      <td className="py-3 px-4 text-center text-orange-400">-3.00%</td>
                      <td className="py-3 px-4 text-center text-orange-400">-3.50%</td>
                      <td className="py-3 px-4 text-center text-zinc-300">30 days</td>
                    </tr>
                    <tr className="border-b border-zinc-800">
                      <td className="py-3 px-4 text-zinc-300">Vanguard Bond ETF (BND)</td>
                      <td className="py-3 px-4 text-center text-yellow-400">-0.70%</td>
                      <td className="py-3 px-4 text-center text-yellow-400">-1.10%</td>
                      <td className="py-3 px-4 text-center text-zinc-300">5 days</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-zinc-300">REITs</td>
                      <td className="py-3 px-4 text-center text-orange-400">-2.10%</td>
                      <td className="py-3 px-4 text-center text-orange-400">-2.90%</td>
                      <td className="py-3 px-4 text-center text-zinc-300">20 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-700">
                <p className="text-zinc-400">
                  Key Vault's advanced risk management strategies result in significantly lower drawdowns and faster
                  recovery times compared to both traditional crypto investments and conventional asset classes.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
