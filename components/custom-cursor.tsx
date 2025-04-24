"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    // Safely set initial position after mount
    setPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
    setHidden(false)

    const onMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY })
        setHidden(false)
      })
    }

    const onMouseEnter = () => setHidden(false)
    const onMouseLeave = () => setHidden(true)
    const onMouseDown = () => setClicked(true)
    const onMouseUp = () => setClicked(false)

    const addListeners = () => {
      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseenter", onMouseEnter)
      document.addEventListener("mouseleave", onMouseLeave)
      document.addEventListener("mousedown", onMouseDown)
      document.addEventListener("mouseup", onMouseUp)
    }

    const removeListeners = () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseenter", onMouseEnter)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
    }

    const handleLinkHover = () => {
      document.querySelectorAll("a, button, [role=button], input, textarea, select").forEach((el) => {
        el.addEventListener("mouseenter", () => setLinkHovered(true))
        el.addEventListener("mouseleave", () => setLinkHovered(false))
      })
    }

    addListeners()
    handleLinkHover()

    return () => removeListeners()
  }, [])

  const transitionProps = {
    type: "spring",
    stiffness: 500,
    damping: 30,
    mass: 0.2,
  }

  const cursorOutlineVariants = {
    default: {
      x: position.x - 12,
      y: position.y - 12,
      opacity: hidden ? 0 : 0.5,
      scale: 1,
      transition: transitionProps,
    },
    clicked: {
      x: position.x - 12,
      y: position.y - 12,
      scale: 0.8,
      opacity: hidden ? 0 : 0.7,
      transition: transitionProps,
    },
    hovered: {
      x: position.x - 18,
      y: position.y - 18,
      width: 36,
      height: 36,
      opacity: hidden ? 0 : 0.6,
      mixBlendMode: "difference" as const,
      transition: transitionProps,
    },
  }

  const cursorDotVariants = {
    default: {
      x: position.x - 4,
      y: position.y - 4,
      opacity: hidden ? 0 : 0.8,
      scale: 1,
      transition: { ...transitionProps, stiffness: 1000, damping: 40 },
    },
    clicked: {
      x: position.x - 4,
      y: position.y - 4,
      scale: 0.6,
      opacity: hidden ? 0 : 0.9,
      transition: { ...transitionProps, stiffness: 1000, damping: 40 },
    },
    hovered: {
      opacity: 0,
      transition: { ...transitionProps, stiffness: 1000, damping: 40 },
    },
  }

  return (
    <>
      <motion.div
        className="cursor-dot fixed top-0 left-0 z-[999] pointer-events-none w-2 h-2 rounded-full bg-emerald-400"
        variants={cursorDotVariants}
        animate={linkHovered ? "hovered" : clicked ? "clicked" : "default"}
      />
      <motion.div
        className="cursor-outline fixed top-0 left-0 z-[998] pointer-events-none w-6 h-6 rounded-full border border-emerald-400"
        variants={cursorOutlineVariants}
        animate={linkHovered ? "hovered" : clicked ? "clicked" : "default"}
      />
    </>
  )
}
