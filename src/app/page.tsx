import { Hero } from "@/components/landing/hero"
import { Services } from "@/components/landing/services"
import { Portfolio } from "@/components/landing/portfolio"
import { Testimonials } from "@/components/landing/testimonials"
import { CTA } from "@/components/landing/cta"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <Testimonials />
      <CTA />
    </>
  )
}
