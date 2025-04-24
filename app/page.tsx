import { HeroSection } from "@/components/hero-section"
import { ProblemSection } from "@/components/problem-section"
import { SolutionSection } from "@/components/solution-section"
import { UniqueSection } from "@/components/unique-section"
import { TeamSection } from "@/components/team-section"
import { PerformanceSection } from "@/components/performance-section"
import { ProcessSection } from "@/components/process-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white overflow-hidden">
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <UniqueSection />
        <TeamSection />
        <ProcessSection />
        <PerformanceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
