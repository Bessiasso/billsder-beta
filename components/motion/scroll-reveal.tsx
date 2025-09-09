"use client"

import { type ReactNode, useEffect, useState } from "react"
import { motion, useAnimation, type Variant } from "framer-motion"
import { useInView } from "react-intersection-observer"

type ScrollRevealProps = {
  children: ReactNode
  width?: "full" | "auto"
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  className?: string
  once?: boolean
  threshold?: number
  distance?: number
}

export default function ScrollReveal({
  children,
  width = "auto",
  delay = 0,
  duration = 0.5,
  direction = "up",
  className = "",
  once = true,
  threshold = 0.1,
  distance = 50,
}: ScrollRevealProps) {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold,
  })
  const [isReduced, setIsReduced] = useState(false)

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

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else if (!once) {
      controls.start("hidden")
    }
  }, [controls, inView, once])

  // Define animation variants based on direction
  const getDirectionalVariants = () => {
    if (isReduced) {
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      }
    }

    const variants: { [key: string]: { hidden: Variant; visible: Variant } } = {
      up: {
        hidden: { y: distance, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: {
            duration,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      },
      down: {
        hidden: { y: -distance, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: {
            duration,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      },
      left: {
        hidden: { x: distance, opacity: 0 },
        visible: {
          x: 0,
          opacity: 1,
          transition: {
            duration,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      },
      right: {
        hidden: { x: -distance, opacity: 0 },
        visible: {
          x: 0,
          opacity: 1,
          transition: {
            duration,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      },
      none: {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      },
    }

    return variants[direction]
  }

  const widthClass = width === "full" ? "w-full" : ""

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={getDirectionalVariants()}
      className={`${widthClass} ${className}`}
    >
      {children}
    </motion.div>
  )
}
