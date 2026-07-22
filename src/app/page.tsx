import { Hero } from "@/components/landing/hero"
import { Pillars } from "@/components/landing/pillars"
import { Services } from "@/components/landing/services"
import { Packages } from "@/components/landing/packages"
import { Process } from "@/components/landing/process"
import { Portfolio } from "@/components/landing/portfolio"
import { Testimonials } from "@/components/landing/testimonials"
import { CTA } from "@/components/landing/cta"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Pillars />
      <Services />
      <Packages />
      <Process />
      <Portfolio />
      <Testimonials />
      <CTA />
    </>
  )
}
