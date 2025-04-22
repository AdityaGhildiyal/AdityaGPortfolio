"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
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

    const onMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame for smoother cursor movement
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY })
      })
    }

    const onMouseEnter = () => {
      setHidden(false)
    }

    const onMouseLeave = () => {
      setHidden(true)
    }

    const onMouseDown = () => {
      setClicked(true)
    }

    const onMouseUp = () => {
      setClicked(false)
    }

    const handleLinkHoverEvents = () => {
      document.querySelectorAll("a, button, [role=button], input, textarea, select").forEach((el) => {
        el.addEventListener("mouseenter", () => setLinkHovered(true))
        el.addEventListener("mouseleave", () => setLinkHovered(false))
      })
    }

    addEventListeners()
    handleLinkHoverEvents()

    return () => {
      removeEventListeners()
    }
  }, [])

  // Cursor variants with dot followed by outline
  const cursorOutlineVariants = {
    default: {
      x: position.x - 10, // Larger outline (20% bigger)
      y: position.y - 10,
      opacity: hidden ? 0 : 0.6,
      scale: 1,
      transition: {
        type: "spring",
        mass: 0.3,
        stiffness: 800,
        damping: 30,
        ease: "linear",
      },
    },
    clicked: {
      x: position.x - 10,
      y: position.y - 10,
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
      x: position.x - 14,
      y: position.y - 14,
      width: 28,
      height: 28,
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
      x: position.x - 3.6, // 20% bigger dot
      y: position.y - 3.6,
      opacity: hidden ? 0 : 0.8,
      scale: 1,
      transition: {
        type: "spring",
        mass: 0.1,
        stiffness: 1000,
        damping: 20,
        ease: "linear",
      },
    },
    clicked: {
      x: position.x - 3.6,
      y: position.y - 3.6,
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
        className="cursor-dot fixed top-0 left-0 z-[999] pointer-events-none w-[7.2px] h-[7.2px] rounded-full bg-emerald-400"
        variants={cursorDotVariants}
        animate={linkHovered ? "hovered" : clicked ? "clicked" : "default"}
      />
      <motion.div
        className="cursor-dot-outline fixed top-0 left-0 z-[998] pointer-events-none w-[20px] h-[20px] rounded-full border border-emerald-400"
        variants={cursorOutlineVariants}
        animate={linkHovered ? "hovered" : clicked ? "clicked" : "default"}
      />
    </>
  )
}
