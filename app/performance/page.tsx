import { PerformanceHero } from "@/components/performance/performance-hero"
import { HistoricalPerformance } from "@/components/performance/historical-performance"
import { RiskAnalysis } from "@/components/performance/risk-analysis"
import { ComparativeAnalysis } from "@/components/performance/comparative-analysis"
import { FutureProjections } from "@/components/performance/future-projections"
import { StrategyBreakdown } from "@/components/performance/strategy-breakdown"
import { PerformanceCTA } from "@/components/performance/performance-cta"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PerformancePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <Header />
      <main>
        <PerformanceHero />
        <HistoricalPerformance />
        <RiskAnalysis />
        <ComparativeAnalysis />
        <FutureProjections />
        <StrategyBreakdown />
        <PerformanceCTA />
      </main>
      <Footer />
    </div>
  )
}
