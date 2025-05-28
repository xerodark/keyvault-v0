"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({ name: "", email: "", message: "" })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-orange-900/15 to-black" />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />

      {/* Floating elements - orange primary */}
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-orange-500/25 to-orange-600/20 rounded-full filter blur-3xl float" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-6 py-2 rounded-full glass mb-6"
          >
            <span className="gradient-text font-medium">Get in Touch</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-white"
          >
            Ready to <span className="gradient-text">Get Started?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-white/70 max-w-3xl mx-auto"
          >
            Contact us to learn more about Key Vault Fund and how we can help you navigate the world of cryptocurrency
            investments.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-10 rounded-3xl glass-shimmer"
          >
            <h3 className="text-3xl font-bold mb-8 text-white">Get in Touch</h3>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="p-3 rounded-xl bg-orange-500/20 mr-6">
                  <Mail className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-white text-lg">Email</h4>
                  <p className="text-white/70">info@keyvaultfund.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3 rounded-xl bg-orange-500/20 mr-6">
                  <Phone className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-white text-lg">Phone</h4>
                  <p className="text-white/70">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3 rounded-xl bg-orange-500/20 mr-6">
                  <MapPin className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-white text-lg">Office</h4>
                  <p className="text-white/70">
                    123 Financial District
                    <br />
                    New York, NY 10004
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10">
              <h4 className="font-semibold mb-4 text-white text-lg">Investment Opportunities</h4>
              <p className="text-white/70 mb-6 leading-relaxed">
                For information about investment opportunities and minimum investments, please contact our team
                directly.
              </p>
              <Button className="glass-button text-white px-6 py-3 rounded-xl">Schedule a Consultation</Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-10 rounded-3xl glass-shimmer"
          >
            <h3 className="text-3xl font-bold mb-8 text-white">Send a Message</h3>

            {isSubmitted ? (
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-8 text-center">
                <h4 className="text-2xl font-semibold gradient-text mb-3">Message Sent!</h4>
                <p className="text-white/80">Thank you for reaching out. Our team will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="glass-input text-white placeholder:text-white/40 py-3 px-4 rounded-xl"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="glass-input text-white placeholder:text-white/40 py-3 px-4 rounded-xl"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    className="glass-input text-white placeholder:text-white/40 min-h-[140px] py-3 px-4 rounded-xl resize-none"
                    placeholder="Tell us about your investment goals..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full glass-button text-white py-4 rounded-xl text-lg font-semibold"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
