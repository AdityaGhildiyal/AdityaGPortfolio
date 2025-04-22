"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Briefcase, GraduationCap, Award } from "lucide-react"

type TimelineItem = {
  id: number
  title: string
  organization: string
  period: string
  description: string
  type: "work" | "education" | "award"
}

export default function ExperienceTimeline() {
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

  const timelineItems: TimelineItem[] = [
    {
      id: 1,
      title: "B.Tech in Computer Science and Engineering",
      organization: "Graphic Era Hill University",
      period: "2023 - Present",
      description:
        "Currently pursuing B.Tech in Computer Science and Engineering. Focusing on core CS fundamentals, data structures, algorithms, and modern web development technologies.",
      type: "education",
    },
    {
      id: 2,
      title: "Freelance Web Developer",
      organization: "Self-employed",
      period: "2023 - Present",
      description:
        "Working with clients to build modern web applications using React and NextJS. Handling full-stack development and deployment.",
      type: "work",
    },
    {
      id: 3,
      title: "ML Intern",
      organization: "WebSolution Ltd.",
      period: "2023",
      description:
        "Worked on machine learning projects and implemented various ML algorithms for data analysis and prediction.",
      type: "work",
    },
    {
      id: 4,
      title: "Frontend Developer Certification",
      organization: "Frontend Masters",
      period: "2024",
      description:
        "Completed advanced certification in modern frontend development, covering React, TypeScript, and state management patterns.",
      type: "education",
    },
    {
      id: 5,
      title: "Higher Secondary Education",
      organization: "Srinagar Garhwal",
      period: "2020 - 2022",
      description:
        "Completed 11th and 12th standard with focus on science and mathematics.",
      type: "education",
    },
    {
      id: 6,
      title: "Early Education",
      organization: "Delhi & Bhopal",
      period: "2008 - 2020",
      description:
        "Completed schooling up to 10th standard in various cities across India.",
      type: "education",
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "work":
        return <Briefcase className="w-5 h-5 text-emerald-400" />
      case "education":
        return <GraduationCap className="w-5 h-5 text-emerald-400" />
      case "award":
        return <Award className="w-5 h-5 text-emerald-400" />
      default:
        return <Briefcase className="w-5 h-5 text-emerald-400" />
    }
  }

  return (
    <section id="experience" className="py-20 relative" ref={ref}>
      <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-20"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-4xl mx-auto"
      >
        <motion.div variants={itemVariants} className="mb-12">
          <div className="text-sm font-mono text-emerald-400 mb-2">&gt; experience.forEach()</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
            Experience & Education<span className="text-emerald-400">;</span>
          </h2>
          <p className="text-slate-300 max-w-2xl">
            My professional journey and educational background that have shaped my skills and expertise.
          </p>
        </motion.div>

        <div className="relative border-l-2 border-slate-700 ml-3 md:ml-6 pl-6 md:pl-8">
          {timelineItems.map((item, index) => (
            <motion.div key={item.id} variants={itemVariants} className="mb-10 relative" custom={index}>
              <div className="absolute -left-[42px] md:-left-[50px] p-2 bg-slate-900 rounded-full border-2 border-slate-700">
                {getIcon(item.type)}
              </div>

              <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-800 backdrop-blur-sm">
                <div className="flex flex-wrap justify-between items-start mb-2">
                  <h3 className="text-xl font-bold font-mono text-emerald-400">{item.title}</h3>
                  <span className="text-sm font-mono bg-slate-800 px-2 py-1 rounded text-slate-300 mt-1">
                    {item.period}
                  </span>
                </div>
                <div className="text-lg text-slate-300 mb-2">{item.organization}</div>
                <p className="text-slate-400">{item.description}</p>
              </div>

              {index < timelineItems.length - 1 && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={isInView ? { height: "40px" } : { height: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                  className="absolute -left-[1px] top-full w-[2px] bg-slate-700"
                />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
