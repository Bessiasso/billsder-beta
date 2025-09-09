"use client"

import { type ReactNode, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

type ParallaxSectionProps = {
  children: ReactNode
  className?: string
  baseVelocity?: number
  reverse?: boolean
}

export default function ParallaxSection({
  children,
  className = "",
  baseVelocity = 0.05,
  reverse = false,
}: ParallaxSectionProps) {
  const [isReduced, setIsReduced] = useState(false)
  const { scrollY } = useScroll()

  // Create a parallax effect based on scroll position
  const y = useTransform(scrollY, [0, 1000], [0, 300 * (reverse ? -1 : 1) * (isReduced ? 0.2 : 1)])

  useEffect(() => {
    // Check for reduced motion preference
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
      setIsReduced(mediaQuery.matches)

      const handleChange = () => setIsReduced(mediaQuery.matches)
      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  return (
    <motion.div className={className} style={{ y: isReduced ? 0 : y }}>
      {children}
    </motion.div>
  )
}
