"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, HelpCircle, Lock, Settings } from "lucide-react"

export function ProblemSection() {
  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
      },
    }),
  }

  const problems = [
    {
      icon: <HelpCircle className="h-8 w-8 text-orange-400" />,
      title: "Limited Knowledge",
      description:
        "Crypto assets are still a relatively misunderstood commodity. Investors lack the know-how on where or how to invest.",
    },
    {
      icon: <AlertTriangle className="h-8 w-8 text-orange-400" />,
      title: "Compliance & Regulatory Uncertainty",
      description:
        "The crypto industry is still developing and many rules and regulations meant to protect investors are still being embraced or codified.",
    },
    {
      icon: <Settings className="h-8 w-8 text-orange-400" />,
      title: "Operational Complexity",
      description:
        "Embracing novel financial assets in the new and rapidly evolving world of DeFi can be difficult to understand.",
    },
    {
      icon: <Lock className="h-8 w-8 text-orange-400" />,
      title: "Mass Interest Without Access",
      description: "65% of institutional investors plan crypto allocations, but only 37% currently have exposure.",
    },
  ]

  return (
    <section id="about" className="py-20 bg-zinc-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-50"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Institutional and Individual Investors Want Crypto.
            <span className="text-orange-400"> So What's Holding Them Back?</span>
          </h2>
          <p className="text-zinc-400 max-w-3xl mx-auto">
            Despite growing interest in cryptocurrency investments, several barriers prevent widespread institutional
            adoption.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpVariant}
            >
              <Card className="bg-zinc-800/50 border-zinc-700 hover:border-orange-500/50 transition-all duration-300 h-full backdrop-blur-sm group">
                <CardContent className="p-6">
                  <div className="mb-4 p-3 bg-zinc-900/80 rounded-lg inline-block group-hover:bg-orange-900/20 transition-colors duration-300">
                    {problem.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{problem.title}</h3>
                  <p className="text-zinc-400">{problem.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 p-6 bg-gradient-to-r from-orange-900/20 to-black/20 rounded-lg border border-zinc-800"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6">
              <h3 className="text-2xl font-bold mb-2">The Market Opportunity</h3>
              <p className="text-zinc-400">
                Institutional Bitcoin ETFs surpassed $100B in AUM in 2024, while Ethereum ETFs reached $5.72B. Solana
                ETFs are projected to attract $2B+ in 2025.
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-orange-400 mr-2"></div>
                <span className="text-zinc-300 mr-2">Bitcoin ETFs:</span>
                <span className="font-bold">$100B+ AUM</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                <span className="text-zinc-300 mr-2">Ethereum ETFs:</span>
                <span className="font-bold">$5.72B AUM</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-orange-600 mr-2"></div>
                <span className="text-zinc-300 mr-2">Solana ETFs (Projected):</span>
                <span className="font-bold">$2B+ AUM</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
