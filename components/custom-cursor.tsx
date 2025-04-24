"use client"

import { useEffect, useState, useRef } from "react"
import { motion, TargetAndTransition } from "framer-motion"

export default function CustomCursor() {
  type AnimationStyle = TargetAndTransition

  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [visible, setVisible] = useState(false)

  const dotRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }

    const onMouseEnter = () => setVisible(true)
    const onMouseLeave = () => setVisible(false)
    const onMouseDown = () => setClicked(true)
    const onMouseUp = () => setClicked(false)

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseenter", onMouseEnter)
    document.addEventListener("mouseleave", onMouseLeave)
    document.addEventListener("mousedown", onMouseDown)
    document.addEventListener("mouseup", onMouseUp)

    const elements = document.querySelectorAll("a, button, [role=button], input, textarea, select")
    elements.forEach(el => {
      el.addEventListener("mouseenter", () => setLinkHovered(true))
      el.addEventListener("mouseleave", () => setLinkHovered(false))
    })

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseenter", onMouseEnter)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)

      elements.forEach(el => {
        el.removeEventListener("mouseenter", () => setLinkHovered(true))
        el.removeEventListener("mouseleave", () => setLinkHovered(false))
      })
    }
  }, [])

  // Smooth dot animation using requestAnimationFrame
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b

    const animate = () => {
      dotRef.current.x = lerp(dotRef.current.x, position.x, 0.5)
      dotRef.current.y = lerp(dotRef.current.y, position.y, 0.5)
      setDotPosition({ x: dotRef.current.x, y: dotRef.current.y })
      requestAnimationFrame(animate)
    }

    animate()
  }, [position])

  const getCursorSize = () => (linkHovered ? 36 : 24)

  const getOutlineStyle = (): AnimationStyle => {
    const size = getCursorSize()
    return {
      x: position.x - size / 2,
      y: position.y - size / 2,
      width: size,
      height: size,
      opacity: visible ? 0.6 : 0,
      scale: clicked ? 0.8 : 1,
      mixBlendMode: linkHovered ? "difference" : "normal",
      transition: { duration: 0 }
    }
  }

  const getDotStyle = (): AnimationStyle => {
    const dotSize = 8.64
    return {
      x: dotPosition.x - dotSize / 2,
      y: dotPosition.y - dotSize / 2,
      opacity: visible && !linkHovered ? 0.8 : 0,
      scale: clicked ? 0.5 : 1,
      transition: {
        duration: 0.15,
        ease: "easeOut"
      }
    }
  }

  return (
    <>
      <motion.div
        className="cursor-dot fixed top-0 left-0 z-[999] pointer-events-none w-[8.64px] h-[8.64px] rounded-full bg-emerald-400"
        animate={getDotStyle()}
      />
      <motion.div
        className="cursor-outline fixed top-0 left-0 z-[998] pointer-events-none rounded-full border border-emerald-400"
        animate={getOutlineStyle()}
      />
    </>
  )
}
