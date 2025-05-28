"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ArrowDown, ArrowRight, ArrowLeft, ShieldCheck } from "lucide-react"

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])

  const steps = [
    {
      title: "You deposit USDC",
      description: "Start by depositing USDC into your Key Vault account.",
      icon: <ArrowRight className="h-6 w-6" />,
    },
    {
      title: "We build your crypto portfolio",
      description: "Our team creates a diversified portfolio of top cryptocurrencies with advanced hedging.",
      icon: <ArrowLeft className="h-6 w-6" />,
    },
    {
      title: "Assets earn interest and grow",
      description: "Your assets generate yield through staking and liquidity provision while appreciating in value.",
      icon: <ArrowRight className="h-6 w-6" />,
    },
    {
      title: "We protect against market drops",
      description: "Our hedging strategies automatically adjust to protect your investment during downturns.",
      icon: <ShieldCheck className="h-6 w-6" />,
    },
    {
      title: "You receive USDC back upon withdrawal",
      description: "Withdraw your funds as USDC whenever you need, with no lock-up periods.",
      icon: <ArrowDown className="h-6 w-6" />,
    },
  ]

  return (
    <section ref={sectionRef} className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/30 via-black to-black"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div style={{ opacity, y }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How <span className="text-orange-400">Your Money</span> Works
          </h2>
          <p className="text-zinc-400 max-w-3xl mx-auto">A streamlined process designed for security and growth.</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-orange-600 to-orange-700 hidden md:block"></div>

            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className={`flex flex-col md:flex-row items-center md:items-start gap-6 mb-12 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="md:w-1/2 flex flex-col items-center md:items-end md:pr-8">
                  <div className={`text-center md:text-right ${index % 2 === 0 ? "md:text-left" : ""}`}>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-zinc-400">{step.description}</p>
                  </div>
                </div>

                <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg">
                  {step.icon}
                </div>

                <div className="md:w-1/2 md:pl-8 hidden md:block"></div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 p-8 bg-zinc-900/50 rounded-lg border border-zinc-800 max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-6 md:mb-0 md:mr-8 md:w-1/2">
              <h3 className="text-2xl font-bold mb-3">Secured and Streamlined</h3>
              <p className="text-zinc-400">
                Our platform handles all the complexity of crypto investing, from security to portfolio management, so
                you can focus on your returns without the technical challenges.
              </p>
            </div>
            <div className="md:w-1/2 bg-zinc-800/50 p-6 rounded-lg">
              <h4 className="font-medium mb-4 text-center">Risk-Adjusted Return</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Bitcoin Buy & Hold</span>
                  <span className="text-zinc-300">~1 Sharpe Ratio</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Unhedged Diverse Portfolio</span>
                  <span className="text-zinc-300">~1.08 Sharpe Ratio</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-orange-400 font-medium">Key Vault Strategy</span>
                  <span className="text-orange-400 font-medium">~8.6 - 17.9 Sharpe Ratio</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
