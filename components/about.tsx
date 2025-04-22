"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Code2, Coffee, Cpu, Globe } from "lucide-react"

export default function About() {
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

  return (
    <section id="about" className="py-20 relative" ref={ref}>
      <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-20"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-4xl mx-auto"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <div className="text-sm font-mono text-emerald-400 mb-2">&gt; about.me</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 font-mono">
            Who Am I<span className="text-emerald-400">?</span>
          </h2>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mb-8 bg-slate-900/50 p-6 rounded-lg border border-slate-800 backdrop-blur-sm"
        >
          <div className="font-mono text-slate-300 leading-relaxed">
            <p className="mb-4">
              <span className="text-emerald-400">const </span>
              <span className="text-yellow-400">developer</span> = {"{"}
            </p>
            <p className="pl-6 mb-2">
              <span className="text-purple-400">name</span>:{" "}
              <span className="text-green-300">&quot;Aditya Ghildiyal&quot;</span>,
            </p>
            <p className="pl-6 mb-2">
              <span className="text-purple-400">title</span>:{" "}
              <span className="text-green-300">&quot;Freelancing Web Developer&quot;</span>,
            </p>
            <p className="pl-6 mb-2">
              <span className="text-purple-400">location</span>:{" "}
              <span className="text-green-300">&quot;Dehradun, Uttarakhand, India&quot;</span>,
            </p>
            <p className="pl-6 mb-2">
              <span className="text-purple-400">description</span>:{" "}
              <span className="text-green-300">
                &quot;Currently a student with a passion for web development and problem-solving. Specializing in building modern web applications with React and NextJS.&quot;
              </span>
              ,
            </p>
            <p className="pl-6 mb-2">
              <span className="text-purple-400">experience</span>:{" "}
              <span className="text-green-300">&quot;currently student&quot;</span>,
            </p>
            <p className="pl-6 mb-2">
              <span className="text-purple-400">coffee_per_day</span>: <span className="text-orange-300">1</span>,
            </p>
            <p className="mb-2">{"};"}</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-800 backdrop-blur-sm">
            <div className="flex items-center mb-4">
              <Globe className="w-5 h-5 text-emerald-400 mr-2" />
              <h3 className="text-xl font-semibold font-mono">Web Enthusiast</h3>
            </div>
            <p className="text-slate-300">
              Passionate about creating responsive, accessible, and performant web applications.
            </p>
          </div>

          <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-800 backdrop-blur-sm">
            <div className="flex items-center mb-4">
              <Coffee className="w-5 h-5 text-emerald-400 mr-2" />
              <h3 className="text-xl font-semibold font-mono">Problem Solver</h3>
            </div>
            <p className="text-slate-300">
              Strong foundation in Data Structures and Algorithms, with a passion for solving complex problems.
            </p>
          </div>

          <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-800 backdrop-blur-sm">
            <div className="flex items-center mb-4">
              <Cpu className="w-5 h-5 text-emerald-400 mr-2" />
              <h3 className="text-xl font-semibold font-mono">Tech Explorer</h3>
            </div>
            <p className="text-slate-300">
              Always learning and exploring new technologies to stay at the cutting edge of development.
            </p>
          </div>

          <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-800 backdrop-blur-sm">
            <div className="flex items-center mb-4">
              <Code2 className="w-5 h-5 text-emerald-400 mr-2" />
              <h3 className="text-xl font-semibold font-mono">Clean Code Advocate</h3>
            </div>
            <p className="text-slate-300">
              I believe in writing clean, maintainable code that follows best practices and design patterns.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
