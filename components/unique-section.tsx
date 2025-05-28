"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, Clock, Shield } from "lucide-react"

export function UniqueSection() {
  const features = [
    {
      icon: <BarChart3 className="h-10 w-10 text-orange-400" />,
      title: "Proprietary Investment Index",
      description:
        "Our diversified portfolio invests in high-quality crypto like Bitcoin, Ethereum, and Solana, with advanced hedging strategies to protect your investment during market downturns.",
    },
    {
      icon: <Clock className="h-10 w-10 text-orange-500" />,
      title: "Our Launch Timing",
      description:
        "With institutional Bitcoin ETFs surpassing $100B and Ethereum ETFs reaching $5.72B in AUM, we're positioned at the perfect moment as crypto becomes a legitimate financial instrument.",
    },
    {
      icon: <Shield className="h-10 w-10 text-orange-600" />,
      title: "Secured and Streamlined",
      description:
        "Our advanced hedging strategy protects your investment during market downturns, reducing losses and stabilizing overall returns with annual volatility of just 2-7%.",
    },
  ]

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  }

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-900/20 to-black"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What makes <span className="text-orange-400">Key Vault</span> Unique?
          </h2>
          <p className="text-zinc-400 max-w-3xl mx-auto">
            Our proprietary approach combines security, timing, and expertise to deliver exceptional results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <Card className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-all duration-300 h-full backdrop-blur-sm overflow-hidden group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-6 relative z-10">
                  <div className="mb-5 p-3 bg-zinc-800/80 rounded-lg inline-block">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-zinc-400">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 p-8 bg-gradient-to-r from-zinc-900 to-zinc-900 rounded-lg border border-zinc-800 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-orange-600/10 opacity-30"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4">Smart Risk Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <h4 className="text-lg font-medium mb-2">Strategy</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-zinc-800/60 rounded-md">
                    <p className="text-zinc-300">Bitcoin Buy & Hold</p>
                    <p className="text-zinc-500 text-sm">~70 - 80% Annual Volatility</p>
                  </div>
                  <div className="p-3 bg-zinc-800/60 rounded-md">
                    <p className="text-zinc-300">Unhedged Diverse Portfolio</p>
                    <p className="text-zinc-500 text-sm">~32% Annual Volatility</p>
                  </div>
                  <div className="p-3 bg-orange-900/20 border border-orange-500/20 rounded-md">
                    <p className="text-orange-400 font-medium">Key Vault Strategy</p>
                    <p className="text-orange-500/80 text-sm">~2 - 7% Annual Volatility ✅</p>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2">
                <h4 className="text-lg font-medium mb-2">How do we do it?</h4>
                <p className="text-zinc-400 mb-4">
                  We use advanced, institutional-style strategies (delta hedging) to automatically reduce your risk.
                  This lets you safely enjoy crypto's potential without worrying about crashes or volatility.
                </p>
                <div className="bg-zinc-800/60 p-4 rounded-md">
                  <h5 className="font-medium mb-2">Max Drawdown Comparison</h5>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400">Unhedged Crypto (BTC)</span>
                      <span className="text-red-400">-14.23%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400">S&P 500 Index</span>
                      <span className="text-orange-400">-3.50%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400">Key Vault Fund</span>
                      <span className="text-orange-400">-0.53%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
