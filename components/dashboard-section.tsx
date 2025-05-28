"use client"

import { ContainerScroll } from "@/components/ui/container-scroll"
import { DashboardUI } from "@/components/dashboard-ui"

export function DashboardSection() {
  return (
    <section className="bg-[#0f0f0f] relative">
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
        <div className="w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full" />
      </div>

      <ContainerScroll
        titleComponent={
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Powerful <span className="text-orange-500">Dashboard</span> for Your Investments
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl mb-8">
              Monitor your portfolio, track performance, and manage your investments all in one place.
            </p>
          </div>
        }
      >
        <DashboardUI />
      </ContainerScroll>
    </section>
  )
}
