"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export function Footer() {
  return (
    <footer className="glass-footer pt-20 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-20 relative z-10">
          <div className="md:col-span-5">
            <div className="flex items-center space-x-3 mb-8">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl transform rotate-45"></div>
                <div className="absolute inset-1 bg-black/80 rounded-lg transform rotate-45 flex items-center justify-center">
                  <span className="text-white font-bold">KV</span>
                </div>
              </div>
              <span className="font-bold text-3xl tracking-tight text-white">Key Vault</span>
            </div>
            <p className="text-white/70 mb-8 max-w-md text-lg leading-relaxed">
              Key Vault provides exposure to DeFi through a professionally managed, secure fund structure with{" "}
              <span className="text-orange-400 font-semibold">15–25% annual returns</span>.
            </p>
            <div className="">
              <div className="flex flex-col space-y-2">
                <p className="text-white/80 font-medium">1 Crypto Way</p>
                <p className="text-white/80 font-medium">Merica, USA</p>
                <p className="text-orange-400 font-medium mt-4">info@keyvaultfund.com</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-orange-400 font-semibold text-xl mb-6">Company</h4>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-white/70 hover:text-orange-400 transition-colors text-lg">
                  About
                </Link>
              </li>
              <li>
                <Link href="#team" className="text-white/70 hover:text-orange-400 transition-colors text-lg">
                  Team
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-white/70 hover:text-orange-400 transition-colors text-lg">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-orange-400 transition-colors text-lg">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-5">
            <h4 className="text-orange-400 font-semibold text-xl mb-6">Subscribe to our newsletter</h4>
            <p className="text-white/70 mb-6 text-lg">
              Stay updated with the latest news and investment opportunities.
            </p>
            <form className="flex mb-8">
              <input
                type="email"
                placeholder="Your email address"
                className="glass-input px-6 py-4 rounded-l-2xl w-full focus:outline-none text-white placeholder:text-white/40"
              />
              <button type="submit" className="glass-button px-6 py-4 rounded-r-2xl text-white font-semibold">
                →
              </button>
            </form>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="w-12 h-12 rounded-2xl glass-subtle flex items-center justify-center text-white/70 hover:text-orange-400 transition-colors"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link
                href="#"
                className="w-12 h-12 rounded-2xl glass-subtle flex items-center justify-center text-white/70 hover:text-orange-400 transition-colors"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-orange-500/20 bg-[#0a0a0a] pt-8 pb-16 relative z-10 flex flex-col md:flex-row justify-between items-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-white/60 text-lg mb-4 md:mb-0"
          >
            &copy; {new Date().getFullYear()} Key Vault Fund. All rights reserved.
          </motion.p>
          <div className="flex space-x-8">
            <Link href="#" className="text-white/60 hover:text-orange-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-white/60 hover:text-orange-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-white/60 hover:text-orange-400 transition-colors">
              Press and Media
            </Link>
          </div>
        </div>
      </div>

      {/* Logo positioned below content, partially cut off by footer bottom */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[175px] opacity-5 pointer-events-none z-0">
        <Image
          src="/images/key-vault-logo.png"
          alt="Key Vault Logo"
          width={1500}
          height={1200}
          className="object-contain"
        />
      </div>
    </footer>
  )
}
