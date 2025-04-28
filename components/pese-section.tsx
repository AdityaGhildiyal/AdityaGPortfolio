"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { FileText, Film, Video, Users, Brain, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PESESection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

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

  const peseModules = [
    {
      icon: <Brain className="w-5 h-5 text-emerald-400" />,
      title: "Self Introduction",
      description:
        "Activities to understand left and right brain functioning, along with a comprehensive self-introduction.",
    },
    {
      icon: <FileText className="w-5 h-5 text-emerald-400" />,
      title: "Profiling Sheet",
      description:
        "A detailed questionnaire with 20 questions about career objectives, strengths, weaknesses, and personal insights.",
    },
    {
      icon: <Film className="w-5 h-5 text-emerald-400" />,
      title: "Movie Review",
      description:
        "Analysis of 'The Pursuit of Happyness' including favorite dialogues, personal review, and key takeaways.",
    },
    {
      icon: <Video className="w-5 h-5 text-emerald-400" />,
      title: "Presentation Skills",
      description: "Concepts behind effective presentations and team presentation videos demonstrating these skills.",
    },
    {
      icon: <Users className="w-5 h-5 text-emerald-400" />,
      title: "Group Discussion",
      description:
        "Understanding the do's and don'ts of group discussions, different types, and idea generation techniques.",
    },
  ]

  return (
    <section id="pese-section" className="py-20 relative" ref={ref}>
      <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-20"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-4xl mx-auto"
      >
        <motion.div variants={itemVariants} className="mb-12">
          <div className="text-sm font-mono text-emerald-400 mb-2">&gt; pese.modules</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
            PESE 400<span className="text-emerald-400">;</span>
          </h2>
          <p className="text-slate-300 max-w-2xl">
            Practical for Employability Skill Enhancement (PESE) 400 is a subject in my 4th semester of BTech CSE
            designed to develop professional skills, communication abilities, and personal growth. Below are the key
            modules covered in this section.
          </p>
        </motion.div>

        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {peseModules.map((module, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-slate-900/50 p-6 rounded-lg border border-slate-800 backdrop-blur-sm"
            >
              <div className="flex items-center mb-4">
                {module.icon}
                <h3 className="text-xl font-semibold font-mono ml-2">{module.title}</h3>
              </div>
              <p className="text-slate-300">{module.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="text-center">
          <Link href="/pese">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-black font-mono">
              Explore PESE 400 <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
