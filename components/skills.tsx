"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  // Skills with green color shades based on level
  const skills = [
    { name: "JavaScript", level: 90, color: "#0d9488" }, // teal-600
    { name: "TypeScript", level: 85, color: "#10b981" }, // emerald-500
    { name: "React", level: 88, color: "#059669" }, // emerald-600
    { name: "Next.js", level: 82, color: "#047857" }, // emerald-700
    { name: "Node.js", level: 80, color: "#0d9488" }, // teal-600
    { name: "Express", level: 78, color: "#14b8a6" }, // teal-500
    { name: "MongoDB", level: 75, color: "#0f766e" }, // teal-700
    { name: "PostgreSQL", level: 72, color: "#0f766e" }, // teal-700
    { name: "HTML/CSS", level: 92, color: "#059669" }, // emerald-600
    { name: "Tailwind CSS", level: 85, color: "#10b981" }, // emerald-500
    { name: "Git", level: 88, color: "#059669" }, // emerald-600
    { name: "Docker", level: 70, color: "#0f766e" }, // teal-700
  ]

  return (
    <section id="skills" className="py-20 relative" ref={ref}>
      <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-20"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-4xl mx-auto"
      >
        <motion.div variants={itemVariants} className="mb-12">
          <div className="text-sm font-mono text-emerald-400 mb-2">&gt; skills.map()</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
            Technical Skills<span className="text-emerald-400">;</span>
          </h2>
          <p className="text-slate-300 max-w-2xl">
            My toolkit includes a variety of technologies that I&apos;ve mastered over the years. Here&apos;s a visual
            representation of my technical proficiency.
          </p>
        </motion.div>

        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: "C", level: 90 },
            { name: "C++", level: 90 },
            { name: "Python", level: 75 },
            { name: "DSA", level: 75 },
            { name: "Machine Learning", level: 70 },
            { name: "JavaScript", level: 72 },
            { name: "TypeScript", level: 67 },
            { name: "React", level: 80 },
            { name: "Next.js", level: 80 },
            { name: "Node.js", level: 80 },
            { name: "Express", level: 80 },
            { name: "MongoDB", level: 80 },
            { name: "PostgreSQL", level: 85 },
            { name: "HTML/CSS", level: 85 },
            { name: "Docker", level: 50 },
            { name: "Java", level: 55 },
          ].map((skill) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-300 font-mono">{skill.name}</span>
                <span className="text-slate-400 font-mono">{skill.level}%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full bg-emerald-500"
                />
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-16 bg-slate-900/50 p-6 rounded-lg border border-slate-800 backdrop-blur-sm"
        >
          <h3 className="text-xl font-bold mb-4 font-mono text-emerald-400">
            Other Skills<span className="text-white">:</span>
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              "RESTful APIs",
              "GraphQL",
              "Redux",
              "Django",
              "Flask",
              "Spring Boot",
              "CI/CD",
              "AWS",
              "Firebase",
              "Responsive Design",
              "UI/UX",
              "Problem Solving",
              "Team Collaboration",
            ].map((skill) => (
              <span key={skill} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm font-mono">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
