"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
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
      image: "/placeholder.svg?height=400&width=400",
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
      image: "/placeholder.svg?height=400&width=400",
      bio: [
        "Founder of IronStag Investments, managing $4.8 Million in assets with a 30% APY over 2024",
        "Co-Founder of Purelight Power, with a successful $150 Million acquisition",
        "Investor in Crypto since 2016",
      ],
    },
  ]

  return (
    <section id="team" className="py-20 bg-zinc-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-900/20 to-zinc-900"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Who is behind <span className="text-orange-400">Key Vault</span>
          </h2>
          <p className="text-zinc-400 max-w-3xl mx-auto">
            Our team combines decades of experience in finance, technology, and cryptocurrency investments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="bg-zinc-800/50 border-zinc-700 overflow-hidden h-full backdrop-blur-sm group">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-1/3 h-64 md:h-auto overflow-hidden">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent md:bg-gradient-to-l"></div>
                    </div>
                    <div className="w-full md:w-2/3 p-6">
                      <div className="flex flex-col h-full">
                        <div>
                          <h3 className="text-2xl text-white font-bold mb-1">{member.name}</h3>
                          <p className="text-orange-400 font-medium mb-2">{member.title}</p>
                          <p className="text-zinc-400 text-sm mb-4">{member.email}</p>
                        </div>

                        <div className="flex-grow">
                          <ul className="space-y-2 mb-4">
                            {member.bio.map((item, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-orange-400 mr-2">•</span>
                                <span className="text-zinc-300 text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-auto">
                          <Link
                            href={`https://linkedin.com/in/${member.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-zinc-400 hover:text-white transition-colors"
                          >
                            <Linkedin className="h-4 w-4 mr-2" />
                            <span className="text-sm">{member.linkedin}</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
