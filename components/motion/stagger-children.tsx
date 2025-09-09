"use client"

import React from "react"

import { type ReactNode, useEffect, useState } from "react"
import { motion, useAnimation, type Variant } from "framer-motion"
import { useInView } from "react-intersection-observer"

type StaggerChildrenProps = {
  children: ReactNode
  className?: string
  delay?: number
  staggerDelay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  once?: boolean
  threshold?: number
  distance?: number
}

export default function StaggerChildren({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.1,
  direction = "up",
  once = true,
  threshold = 0.1,
  distance = 30,
}: StaggerChildrenProps) {
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
  const getContainerVariants = () => {
    return {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: isReduced ? 0.05 : staggerDelay,
          delayChildren: delay,
        },
      },
    }
  }

  const getChildVariants = () => {
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
            duration: 0.5,
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
            duration: 0.5,
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
            duration: 0.5,
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
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      },
      none: {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      },
    }

    return variants[direction]
  }

  return (
    <motion.div ref={ref} className={className} initial="hidden" animate={controls} variants={getContainerVariants()}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return <motion.div variants={getChildVariants()}>{child}</motion.div>
        }
        return child
      })}
    </motion.div>
  )
}
