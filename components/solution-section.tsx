"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

export function SolutionSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])

  const benefits = [
    "Professional management by experienced crypto investors",
    "Secure fund structure with institutional-grade security",
    "Simplified access to complex DeFi opportunities",
    "Reduced volatility through advanced hedging strategies",
    "Diversified exposure to top cryptocurrencies",
    "Regular yield generation through staking and liquidity provision",
  ]

  return (
    <section id="solution" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-orange-600/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div style={{ opacity, y }} className="lg:w-1/2">
            <span className="inline-block py-1 px-3 rounded-full bg-orange-900/30 text-orange-400 text-sm font-medium mb-4">
              Introducing
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Key Vault provides exposure to Crypto and DeFi through a{" "}
              <span className="text-orange-400">professionally managed, secure fund structure.</span>
            </h2>
            <p className="text-zinc-400 mb-8">
              Institutions and Individuals can unlock crypto's growth with the guidance and professional management of
              Key Vault's experienced team of investors, without the need of navigating the complexity of the crypto
              ecosystem.
            </p>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-start"
                >
                  <CheckCircle className="h-5 w-5 text-orange-400 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-zinc-300">{benefit}</p>
                </motion.div>
              ))}
            </div>

            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-none px-6 py-5 text-base rounded-md group"
            >
              Learn About Our Strategy
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:w-1/2"
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg blur opacity-30"></div>
              <div className="relative bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Traditional vs. Key Vault Fund</h3>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="col-span-1"></div>
                  <div className="col-span-1 text-center font-medium text-zinc-400">Traditional</div>
                  <div className="col-span-1 text-center font-medium text-orange-400">Key Vault</div>
                </div>

                {[
                  { name: "Volatility", traditional: "High", keyVault: "Lower" },
                  { name: "Yield Generation", traditional: "No", keyVault: "Yes" },
                  { name: "Portfolio", traditional: "Single Asset", keyVault: "Diversified" },
                  { name: "Risk Management", traditional: "No", keyVault: "Active" },
                  { name: "Sharpe Ratio", traditional: "~1", keyVault: "8.6-17.9" },
                ].map((row, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4 py-3 border-t border-zinc-800">
                    <div className="col-span-1 text-zinc-300">{row.name}</div>
                    <div className="col-span-1 text-center text-zinc-400">{row.traditional}</div>
                    <div className="col-span-1 text-center text-orange-400 font-medium">{row.keyVault}</div>
                  </div>
                ))}

                <div className="mt-6 pt-6 border-t border-zinc-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-zinc-400">Annual Returns:</span>
                    <span className="text-orange-400 font-bold">15-25%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Max Daily Drop:</span>
                    <span className="text-orange-400 font-bold">-0.30%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
