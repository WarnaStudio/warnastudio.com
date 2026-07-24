import { Hero } from "@/components/landing/hero"
import { Marquee } from "@/components/landing/marquee"
import { Statement } from "@/components/landing/statement"
import { Pillars } from "@/components/landing/pillars"
import { Services } from "@/components/landing/services"
import { Packages } from "@/components/landing/packages"
import { Process } from "@/components/landing/process"
import { Portfolio } from "@/components/landing/portfolio"
import { Products } from "@/components/landing/products"
import { Testimonials } from "@/components/landing/testimonials"
import { CTA } from "@/components/landing/cta"
import { Reveal } from "@/components/experience/reveal"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Statement />
      <Services />
      <Reveal>
        <Pillars />
      </Reveal>
      <Packages />
      <Reveal>
        <Process />
      </Reveal>
      <Portfolio />
      <Reveal>
        <Products />
      </Reveal>
      <Reveal>
        <Testimonials />
      </Reveal>
      <Reveal>
        <CTA />
      </Reveal>
    </>
  )
}
