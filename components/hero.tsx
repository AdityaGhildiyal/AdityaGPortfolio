"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-scroll"

export default function Hero() {
  const [text, setText] = useState("")
  const fullText = "Aditya Ghildiyal"
  const [showCursor, setShowCursor] = useState(true)
  const [subtitle, setSubtitle] = useState("")
  const fullSubtitle = "Full Stack Developer"

  useEffect(() => {
    if (text.length < fullText.length) {
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1))
      }, 150)
      return () => clearTimeout(timeout)
    } else if (subtitle.length < fullSubtitle.length) {
      const timeout = setTimeout(() => {
        setSubtitle(fullSubtitle.slice(0, subtitle.length + 1))
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [text, subtitle, fullText, fullSubtitle])

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  // Random motion animation for social links
  const floatingAnimation = (delay: number) => ({
    y: [0, -10, 0, 5, 0],
    x: [0, 5, 0, -5, 0],
    transition: {
      y: {
        repeat: Number.POSITIVE_INFINITY,
        duration: 5,
        ease: "easeInOut",
        delay: delay,
      },
      x: {
        repeat: Number.POSITIVE_INFINITY,
        duration: 6,
        ease: "easeInOut",
        delay: delay + 0.5,
      },
    },
  })

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative">
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-xl font-mono text-emerald-400 relative"
        >
          ag_dev
          <div className="absolute top-full left-0 mt-2 flex gap-4">
            <motion.a
              href="https://github.com/AdityaGhildiyal/"
              target="_blank"
              rel="noopener noreferrer"
              animate={floatingAnimation(0)}
            >
              <Github className="w-5 h-5 text-slate-400 hover:text-emerald-400 transition-colors" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/aditya-ghildiyal-1a02772a0/"
              target="_blank"
              rel="noopener noreferrer"
              animate={floatingAnimation(1)}
            >
              <Linkedin className="w-5 h-5 text-slate-400 hover:text-emerald-400 transition-colors" />
            </motion.a>
            <motion.a
              href="https://x.com/Ghil82362Aditya"
              target="_blank"
              rel="noopener noreferrer"
              animate={floatingAnimation(2)}
            >
              <Twitter className="w-5 h-5 text-slate-400 hover:text-emerald-400 transition-colors" />
            </motion.a>
          </div>
        </motion.div>
      </div>

      <div className="z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 text-sm font-mono text-emerald-400"
        >
          &gt; Hello World!
        </motion.div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 font-mono">
          <span className="text-white">{text}</span>
          <span className={`text-emerald-400 ${showCursor ? "opacity-100" : "opacity-0"}`}>_</span>
        </h1>

        <h2 className="text-xl md:text-2xl text-slate-300 mb-2 font-mono">{subtitle}</h2>

        {subtitle.length === fullSubtitle.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-xl md:text-2xl mb-8"
          >
            <span className="text-slate-400">Crafting digital experiences with code</span>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="flex flex-wrap gap-4"
        >
          <Link to="projects" spy={true} smooth={true} duration={1000} offset={-70}>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-black font-mono">View Projects</Button>
          </Link>
          <Button variant="outline" className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 font-mono">
            Download Resume
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <Link to="about" spy={true} smooth={true} duration={1000} offset={-70}>
          <Button variant="ghost" size="icon" className="animate-bounce text-slate-400 hover:text-emerald-400">
            <ArrowDown className="h-6 w-6" />
          </Button>
        </Link>
      </motion.div>
    </section>
  )
}
