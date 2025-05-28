"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Calendar, MessageCircle } from "lucide-react"

export function PerformanceCTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-orange-900/20 to-black" />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />

      {/* Floating elements */}
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-orange-500/25 to-orange-600/20 rounded-full filter blur-3xl float" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Ready to <span className="gradient-text">Invest</span> with Confidence?
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Join sophisticated investors who trust Key Vault for superior risk-adjusted returns in the cryptocurrency
            market.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Investment Summary */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-10 rounded-3xl glass-shimmer"
          >
            <h3 className="text-3xl font-bold text-white mb-8">Investment Highlights</h3>

            <div className="space-y-6">
              <div className="flex justify-between items-center p-4 inner-glass rounded-xl">
                <span className="text-white/80">Minimum Investment</span>
                <span className="text-orange-400 font-bold">$100,000</span>
              </div>
              <div className="flex justify-between items-center p-4 inner-glass rounded-xl">
                <span className="text-white/80">Target Annual Return</span>
                <span className="text-orange-400 font-bold">15-25%</span>
              </div>
              <div className="flex justify-between items-center p-4 inner-glass rounded-xl">
                <span className="text-white/80">Management Fee</span>
                <span className="text-orange-400 font-bold">2%</span>
              </div>
              <div className="flex justify-between items-center p-4 inner-glass rounded-xl">
                <span className="text-white/80">Performance Fee</span>
                <span className="text-orange-400 font-bold">20%</span>
              </div>
              <div className="flex justify-between items-center p-4 inner-glass rounded-xl">
                <span className="text-white/80">Lock-up Period</span>
                <span className="text-orange-400 font-bold">None</span>
              </div>
            </div>

            <div className="mt-8 p-6 highlight-glass rounded-xl">
              <h4 className="text-orange-400 font-bold text-lg mb-3">Why Choose Key Vault?</h4>
              <ul className="space-y-2">
                <li className="flex items-center text-white/80">
                  <span className="text-orange-400 mr-2">✓</span>
                  Proven track record of outperformance
                </li>
                <li className="flex items-center text-white/80">
                  <span className="text-orange-400 mr-2">✓</span>
                  Industry-leading risk management
                </li>
                <li className="flex items-center text-white/80">
                  <span className="text-orange-400 mr-2">✓</span>
                  Transparent reporting and analytics
                </li>
                <li className="flex items-center text-white/80">
                  <span className="text-orange-400 mr-2">✓</span>
                  Experienced team with deep expertise
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Action Items */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-10 rounded-3xl glass-shimmer"
          >
            <h3 className="text-3xl font-bold text-white mb-8">Next Steps</h3>

            <div className="space-y-6">
              <Button className="w-full glass-button text-white py-4 rounded-xl text-lg font-semibold group">
                <MessageCircle className="mr-3 h-6 w-6" />
                Schedule Consultation
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                variant="outline"
                className="w-full glass border-orange-500/30 text-white hover:text-white hover:bg-orange-500/10 py-4 rounded-xl text-lg font-semibold group"
              >
                <Download className="mr-3 h-6 w-6" />
                Download Fact Sheet
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                variant="outline"
                className="w-full glass border-orange-500/30 text-white hover:text-white hover:bg-orange-500/10 py-4 rounded-xl text-lg font-semibold group"
              >
                <Calendar className="mr-3 h-6 w-6" />
                Request Performance Report
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            <div className="mt-8 p-6 inner-glass rounded-xl">
              <h4 className="text-orange-400 font-bold text-lg mb-3">Contact Information</h4>
              <div className="space-y-2">
                <p className="text-white/80">
                  <span className="text-orange-400">Email:</span> invest@keyvaultfund.com
                </p>
                <p className="text-white/80">
                  <span className="text-orange-400">Phone:</span> +1 (555) 123-4567
                </p>
                <p className="text-white/80">
                  <span className="text-orange-400">Office:</span> 123 Financial District, New York, NY
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
              <p className="text-orange-400 text-sm font-medium mb-1">Important Notice</p>
              <p className="text-white/70 text-xs">
                Past performance does not guarantee future results. All investments carry risk of loss. Please read our
                full disclosure documents before investing.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="glass-card p-8 rounded-3xl max-w-4xl mx-auto glass-shimmer">
            <h3 className="text-2xl font-bold text-white mb-4">
              Join the Future of <span className="gradient-text">Crypto Investing</span>
            </h3>
            <p className="text-white/70 mb-6">
              Experience the power of professional crypto fund management with institutional-grade security and
              performance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="glass-button text-white px-8 py-3 rounded-xl font-semibold group">
                Start Your Investment Journey
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                className="glass border-orange-500/30 text-white hover:text-white hover:bg-orange-500/10 px-8 py-3 rounded-xl font-semibold"
              >
                Learn More About Our Strategy
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
