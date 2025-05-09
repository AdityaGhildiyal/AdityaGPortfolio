import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import ParticleBackground from "@/components/particle-background"
import ExperienceTimeline from "@/components/experience-timeline"

import Testimonials from "@/components/testimonials"
import BlogPreview from "@/components/blog-preview"
import Achievements from "@/components/achievements"

import PESESection from "@/components/pese-section"

import Navigation from "@/components/navigation"
import ThreeDModel from "@/components/three-d-model"
import TerminalInterface from "@/components/terminal-interface"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0A0E17] text-slate-100 overflow-hidden">
      <ParticleBackground />
      <TerminalInterface />
      <Navigation />
      <div className="container mx-auto px-4">
        <Hero />
        <About />
        <Skills />
        <div className="flex justify-center py-10">
          <ThreeDModel />
        </div>
        <ExperienceTimeline />
        <Projects />
        <PESESection />
        <Contact />
      </div>
    </main>
  )
}
