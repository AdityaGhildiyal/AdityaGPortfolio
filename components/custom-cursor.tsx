"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY })
        setHidden(false) // Fix: Show the cursor if mouse is already in window
      })
    }

    const onMouseEnter = () => setHidden(false)
    const onMouseLeave = () => setHidden(true)
    const onMouseDown = () => setClicked(true)
    const onMouseUp = () => setClicked(false)

    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseenter", onMouseEnter)
      document.addEventListener("mouseleave", onMouseLeave)
      document.addEventListener("mousedown", onMouseDown)
      document.addEventListener("mouseup", onMouseUp)
    }

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseenter", onMouseEnter)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
    }

    const handleLinkHoverEvents = () => {
      document.querySelectorAll("a, button, [role=button], input, textarea, select").forEach((el) => {
        el.addEventListener("mouseenter", () => setLinkHovered(true))
        el.addEventListener("mouseleave", () => setLinkHovered(false))
      })
    }

    addEventListeners()
    handleLinkHoverEvents()

    // Initial position check
    document.body.dispatchEvent(new MouseEvent("mousemove", {
      clientX: window.innerWidth / 2,
      clientY: window.innerHeight / 2
    }))

    return () => removeEventListeners()
  }, [])

  const cursorOutlineVariants = {
    default: {
      x: position.x - 12,
      y: position.y - 12,
      opacity: hidden ? 0 : 0.6,
      scale: 1,
      transition: {
        type: "spring",
        mass: 0.3,
        stiffness: 800,
        damping: 30,
      },
    },
    clicked: {
      x: position.x - 12,
      y: position.y - 12,
      scale: 0.8,
      opacity: hidden ? 0 : 0.8,
      transition: {
        type: "spring",
        mass: 0.3,
        stiffness: 800,
        damping: 30,
      },
    },
    hovered: {
      x: position.x - 16.8,
      y: position.y - 16.8,
      width: 33.6,
      height: 33.6,
      opacity: hidden ? 0 : 0.6,
      mixBlendMode: "difference" as const,
      transition: {
        type: "spring",
        mass: 0.3,
        stiffness: 800,
        damping: 30,
      },
    },
  }

  const cursorDotVariants = {
    default: {
      x: position.x - 4.32,
      y: position.y - 4.32,
      opacity: hidden ? 0 : 0.8,
      scale: 1,
      transition: {
        type: "spring",
        mass: 0.1,
        stiffness: 1000,
        damping: 20,
      },
    },
    clicked: {
      x: position.x - 4.32,
      y: position.y - 4.32,
      scale: 0.5,
      opacity: hidden ? 0 : 0.8,
      transition: {
        type: "spring",
        mass: 0.1,
        stiffness: 1000,
        damping: 20,
      },
    },
    hovered: {
      opacity: 0,
      transition: {
        type: "spring",
        mass: 0.1,
        stiffness: 1000,
        damping: 20,
      },
    },
  }

  return (
    <>
      <motion.div
        className="cursor-dot fixed top-0 left-0 z-[999] pointer-events-none w-[8.64px] h-[8.64px] rounded-full bg-emerald-400"
        variants={cursorDotVariants}
        animate={linkHovered ? "hovered" : clicked ? "clicked" : "default"}
      />
      <motion.div
        className="cursor-dot-outline fixed top-0 left-0 z-[998] pointer-events-none w-[24px] h-[24px] rounded-full border border-emerald-400"
        variants={cursorOutlineVariants}
        animate={linkHovered ? "hovered" : clicked ? "clicked" : "default"}
      />
    </>
  )
}
