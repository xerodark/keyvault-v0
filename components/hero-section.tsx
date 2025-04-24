"use client"

import { useEffect, useRef } from "react"
import { Button as DefaultButton } from "@/components/ui/button"
import { Button as MovingBorderButton } from "@/components/ui/moving-border"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - left) / width
      const y = (e.clientY - top) / height

      containerRef.current.style.setProperty("--mouse-x", `${x}`)
      containerRef.current.style.setProperty("--mouse-y", `${y}`)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at calc(var(--mouse-x, 0.5) * 100%) calc(var(--mouse-y, 0.5) * 100%), rgba(249, 115, 22, 0.15), transparent 50%)",
      }}
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black"></div>
      </div>

      <div className="container mx-auto px-4 z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex justify-center"
          >
            <MovingBorderButton
              borderRadius="30px"
              as="div"
              containerClassName="w-auto h-auto"
              className="bg-orange-950/30 text-orange-400 font-medium border-zinc-800 py-2 px-4"
            >
              Institutional-Grade Crypto Fund
            </MovingBorderButton>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-400"
          >
            Key Vault Fund
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-zinc-400 mb-8 max-w-3xl mx-auto"
          >
            Driving Secure Investment Into the Rapidly Growing World of Decentralized Finance
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <DefaultButton
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-none px-8 py-6 text-lg rounded-md group"
            >
              Start Investing
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </DefaultButton>
            <DefaultButton
              size="lg"
              variant="outline"
              className="border-zinc-700 text-white bg-gray-800 hover:bg-zinc-800 px-8 py-6 text-lg rounded-md"
            >
              Learn More
            </DefaultButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">15-25%</div>
              <div className="text-sm text-zinc-400">Annual Returns</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">$4M+</div>
              <div className="text-sm text-zinc-400">Assets Under Management</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">~2-7%</div>
              <div className="text-sm text-zinc-400">Annual Volatility</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">8.6-17.9</div>
              <div className="text-sm text-zinc-400">Sharpe Ratio</div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.5,
            delay: 1.2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <div className="w-6 h-10 border-2 border-zinc-500 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-zinc-400 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
