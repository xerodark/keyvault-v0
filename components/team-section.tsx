"use client"

import { motion } from "framer-motion"
import { Linkedin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function TeamSection() {
  const team = [
    {
      name: "Brett Nielsen",
      title: "CEO",
      email: "brett@keyvaultfund.com",
      linkedin: "brettnielsen",
      image: "/images/2.png",
      bio: [
        "Private Equity Operating Partner at Portco CEO with KSV Global",
        "Deputy to National Finance Chair: Romney for President 2012",
        "Investor in Crypto since 2017",
      ],
    },
    {
      name: "Deven Webster",
      title: "COO",
      email: "deven@keyvaultfund.com",
      linkedin: "devenwebster",
      image: "/images/1.png",
      bio: [
        "Founder of IronStag Investments, managing $4.8 Million in assets with a 30% APY over 2024",
        "Co-Founder of Purelight Power, with a successful $150 Million acquisition",
        "Investor in Crypto since 2016",
      ],
    },
  ]

  return (
    <section id="team" className="py-32 relative overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-orange-50/20 to-gray-50" />
      <div className="absolute inset-0 bg-grid-black/[0.02]" />

      {/* Floating elements - orange primary for light mode */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-orange-200/30 to-orange-300/20 rounded-full filter blur-3xl float" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-6 py-2 rounded-full glass-light mb-6"
          >
            <span className="gradient-text-light font-medium">Our Team</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-gray-900"
          >
            Who is behind <span className="gradient-text-light">Key Vault</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Our team combines decades of experience in finance, technology, and cryptocurrency investments.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="glass-card-light rounded-3xl overflow-hidden h-full glass-shimmer group">
                {/* Pure Image Section - no overlays */}
                <div className="relative w-full h-96 sm:h-[28rem] overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={`${member.name} - ${member.title} at Key Vault Fund`}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    priority={index === 0}
                    quality={95}
                  />
                </div>

                {/* Separate Content Section Below Image */}
                <div className="p-8">
                  {/* Name and Title Section */}
                  <div className="mb-6">
                    <h3 className="text-3xl text-gray-900 font-bold mb-2">{member.name}</h3>
                    <p className="gradient-text-light font-semibold text-xl mb-4">{member.title}</p>
                    <p className="text-gray-500 text-sm font-medium">{member.email}</p>
                  </div>

                  {/* Bio Section */}
                  <div className="mb-6">
                    <ul className="space-y-4">
                      {member.bio.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-orange-600 mr-3 mt-1.5 text-sm font-bold">•</span>
                          <span className="text-gray-700 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* LinkedIn Section */}
                  <div className="pt-6 border-t border-gray-200">
                    <Link
                      href={`https://linkedin.com/in/${member.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center glass-subtle-light px-5 py-3 rounded-xl text-gray-700 hover:text-gray-900 transition-all duration-300 group/link hover:shadow-lg"
                    >
                      <Linkedin className="h-5 w-5 mr-3 group-hover/link:text-orange-600 transition-colors" />
                      <span className="group-hover/link:text-orange-600 transition-colors font-medium">
                        {member.linkedin}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
