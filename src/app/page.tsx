import { Hero } from "@/components/landing/hero"
import { Marquee } from "@/components/landing/marquee"
import { Statement } from "@/components/landing/statement"
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
      <Marquee />
      <Statement />
      <Reveal>
        <Pillars />
      </Reveal>
      <Reveal delay={0.04}>
        <Services />
      </Reveal>
      <Reveal>
        <Packages />
      </Reveal>
      <Reveal delay={0.04}>
        <Process />
      </Reveal>
      <Portfolio />
      <Reveal>
        <Testimonials />
      </Reveal>
      <Reveal delay={0.04}>
        <CTA />
      </Reveal>
    </>
  )
}
