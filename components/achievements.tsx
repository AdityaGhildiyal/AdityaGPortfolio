"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Award, Code, FileCode, Users } from "lucide-react"

type Achievement = {
  id: number
  icon: React.ReactNode
  value: string
  label: string
  description: string
}

export default function Achievements() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

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

  const achievements: Achievement[] = [
    {
      id: 1,
      icon: <Code className="w-8 h-8 text-emerald-400" />,
      value: "5+",
      label: "Projects Completed",
      description: "Successfully delivered projects across various domains and technologies.",
    },
    {
      id: 2,
      icon: <Users className="w-8 h-8 text-emerald-400" />,
      value: "5+",
      label: "Satisfied Clients",
      description: "Worked with clients on freelance projects, delivering quality solutions.",
    },
    {
      id: 3,
      icon: <FileCode className="w-8 h-8 text-emerald-400" />,
      value: "100K+",
      label: "Lines of Code",
      description: "Written clean, maintainable code across numerous applications.",
    },
    {
      id: 4,
      icon: <Award className="w-8 h-8 text-emerald-400" />,
      value: "3+",
      label: "Certifications Received",
      description: "Earned certifications in various technologies and frameworks.",
    },
  ]

  return (
    <section id="achievements" className="py-20 relative" ref={ref}>
      <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-20"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-4xl mx-auto"
      >
        <motion.div variants={itemVariants} className="mb-12 text-center">
          <div className="text-sm font-mono text-emerald-400 mb-2">&gt; achievements.count()</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
            Milestones<span className="text-emerald-400">;</span>
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Key achievements and milestones from my professional journey.
          </p>
        </motion.div>

        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              variants={itemVariants}
              className="bg-slate-900/50 p-6 rounded-lg border border-slate-800 backdrop-blur-sm"
            >
              <div className="flex items-center mb-4">
                {achievement.icon}
                <div className="ml-4">
                  <div className="text-3xl font-bold text-emerald-400 font-mono">{achievement.value}</div>
                  <div className="text-lg text-slate-300">{achievement.label}</div>
                </div>
              </div>
              <p className="text-slate-400">{achievement.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
