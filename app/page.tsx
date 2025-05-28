import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { TeamSection } from "@/components/team-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
