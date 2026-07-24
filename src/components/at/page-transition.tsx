"use client"

import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"

const variants = {
  initial: { opacity: 0, y: 28, filter: "blur(8px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -18,
    filter: "blur(6px)",
    transition: { duration: 0.4, ease: [0.4, 0, 1, 1] },
  },
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={path}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="relative z-10 min-h-[100svh]"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
