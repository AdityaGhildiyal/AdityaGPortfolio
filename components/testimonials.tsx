"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

type Testimonial = {
  id: number
  name: string
  role: string
  image: string
  content: string
}

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const testimonials = [
    {
      id: 1,
      name: "Ashmit Mehta",
      role: "Startup Founder",
      content:
        "Aditya delivered our web application ahead of schedule and exceeded our expectations. His attention to detail and problem-solving skills were impressive. Would definitely work with him again!",
    },
    {
      id: 2,
      name: "Skand Butola",
      role: "Small Business Owner",
      content:
        "Working with Aditya was a great experience. He understood our requirements perfectly and implemented them with clean, maintainable code. The project was completed on time and within budget.",
    },
    {
      id: 3,
      name: "Himshikar Sharma",
      role: "Project Manager",
      content:
        "Aditya's technical expertise and communication skills made our collaboration smooth and productive. He was responsive to feedback and delivered high-quality work consistently.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0,
    }),
  }

  const nextTestimonial = () => {
    if (isAnimating) return
    setDirection(1)
    setIsAnimating(true)
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    if (isAnimating) return
    setDirection(-1)
    setIsAnimating(true)
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  useEffect(() => {
    // Auto-rotate testimonials
    if (isInView) {
      intervalRef.current = setInterval(() => {
        nextTestimonial()
      }, 8000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isInView, activeIndex, isAnimating])

  return (
    <section id="testimonials" className="py-20 relative" ref={ref}>
      <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-20"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-4xl mx-auto"
      >
        <motion.div variants={itemVariants} className="mb-12 text-center">
          <div className="text-sm font-mono text-emerald-400 mb-2">&gt; testimonials.map()</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
            Client Testimonials<span className="text-emerald-400">;</span>
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            What others say about working with me and the results of our collaboration.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="relative">
          <div className="relative h-[400px] md:h-[300px] overflow-hidden">
            <div className="absolute top-0 left-0 z-10 w-16 h-full bg-gradient-to-r from-[#0A0E17] to-transparent pointer-events-none"></div>
            <div className="absolute top-0 right-0 z-10 w-16 h-full bg-gradient-to-l from-[#0A0E17] to-transparent pointer-events-none"></div>

            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              onAnimationComplete={() => setIsAnimating(false)}
              className="bg-slate-900/50 p-8 rounded-lg border border-slate-800 backdrop-blur-sm"
            >
              <Quote className="w-12 h-12 text-emerald-400/30 mb-4" />
              <p className="text-slate-300 text-lg mb-6 italic">{testimonials[activeIndex].content}</p>
              <div className="flex items-center">
                <div>
                  <h4 className="font-bold text-emerald-400">{testimonials[activeIndex].name}</h4>
                  <p className="text-slate-400">
                    {testimonials[activeIndex].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (isAnimating) return
                  setDirection(index > activeIndex ? 1 : -1)
                  setIsAnimating(true)
                  setActiveIndex(index)
                }}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === activeIndex ? "bg-emerald-400" : "bg-slate-700"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <Button
              onClick={prevTestimonial}
              variant="outline"
              size="icon"
              className="border-slate-700 text-slate-300 hover:text-emerald-400 hover:border-emerald-400"
              disabled={isAnimating}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              onClick={nextTestimonial}
              variant="outline"
              size="icon"
              className="border-slate-700 text-slate-300 hover:text-emerald-400 hover:border-emerald-400"
              disabled={isAnimating}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
