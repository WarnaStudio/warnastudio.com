import { Hero } from "@/components/landing/hero"
import { Pillars } from "@/components/landing/pillars"
import { Services } from "@/components/landing/services"
import { Packages } from "@/components/landing/packages"
import { Process } from "@/components/landing/process"
import { Portfolio } from "@/components/landing/portfolio"
import { Testimonials } from "@/components/landing/testimonials"
import { CTA } from "@/components/landing/cta"
import { Reveal } from "@/components/experience/reveal"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Reveal>
        <Pillars />
      </Reveal>
      <Reveal delay={0.05}>
        <Services />
      </Reveal>
      <Reveal>
        <Packages />
      </Reveal>
      <Reveal delay={0.05}>
        <Process />
      </Reveal>
      <Reveal>
        <Portfolio />
      </Reveal>
      <Reveal delay={0.05}>
        <Testimonials />
      </Reveal>
      <Reveal>
        <CTA />
      </Reveal>
    </>
  )
}
