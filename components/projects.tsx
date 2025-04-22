"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ExternalLink, Github, Maximize2, Minimize2, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Projects() {
  const ref = useRef(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [expandedProject, setExpandedProject] = useState<number | null>(null)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [buttonPosition, setButtonPosition] = useState(0)

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  // Save button position when expanding
  useEffect(() => {
    if (buttonRef.current && !showAllProjects) {
      const rect = buttonRef.current.getBoundingClientRect()
      setButtonPosition(rect.top + window.scrollY)
    }
  }, [showAllProjects])

  // Scroll back to button position when collapsing
  const toggleShowAllProjects = () => {
    if (showAllProjects) {
      setShowAllProjects(false)
      // Wait for state to update and DOM to re-render
      setTimeout(() => {
        if (buttonRef.current) {
          buttonRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
        } else {
          window.scrollTo({
            top: buttonPosition,
            behavior: "smooth",
          })
        }
      }, 100)
    } else {
      // Save current button position before expanding
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect()
        setButtonPosition(rect.top + window.scrollY)
      }
      setShowAllProjects(true)
    }
  }

  // Featured projects (always visible)
  const featuredProjects = [
    {
      id: 1,
      title: "Tournament Fixture Generator",
      description:
        "A tournament generator supporting Knockout, Round Robin, and Hybrid formats. Built with Next.js and TypeScript.",
      image: "/Project7.png?height=300&width=400",
      tags: ["Next.js", "TypeScript", "Algorithms", "UI/UX"],
      github: "https://gitlab.com/AdityaG05/tourneygen",
      demo: "https://v0-dark-theme-ui-design.vercel.app/",
      details:
        "This project features a comprehensive tournament management system with support for multiple tournament formats, real-time updates, and an intuitive user interface. It includes features like automatic fixture generation, team management, and match scheduling.",
    },
    {
      id: 2,
      title: "ChatBot",
      description:
        "A chatbot built with NextJs using OpenAI API and custom API integration for natural language processing.",
      image: "/Project1.png?height=300&width=400",
      tags: ["Next.js", "OpenAI", "API Integration", "NLP"],
      github: "https://github.com/AdityaGhildiyal/ChatBot-GEHUCollege",
      demo: "https://deployement-page.vercel.app/",
      details:
        "This project implements a sophisticated chatbot using OpenAI's API, featuring natural language understanding, context awareness, and custom response handling. It includes features like conversation history, user authentication, and real-time responses.",
    },
    {
      id: 3,
      title: "Minesweeper",
      description:
        "A classic Minesweeper game built using React with modern UI and game mechanics.",
      image: "/Project5.png?height=300&width=400",
      tags: ["React", "Game Development", "UI/UX"],
      github: "https://github.com/AdityaGhildiyal/Minesweeper",
      demo: "https://minesweeper-addyg.vercel.app/",
      details:
        "This project recreates the classic Minesweeper game with modern UI elements, smooth animations, and responsive design. Features include customizable difficulty levels, game statistics, and a clean, intuitive interface.",
    },
  ]

  const otherProjects = [
    {
      id: 4,
      title: "ERP Cell",
      description:
        "A custom ERP system for educational institutions built with NextJs and custom API integration.",
      image: "/Project2.png?height=300&width=400",
      tags: ["Next.js", "API", "Database", "Authentication"],
      github: "https://github.com/AdityaGhildiyal/Attendance_react-nextjs",
      demo: "https://deployement-page.vercel.app/",
      details:
        "This ERP system includes features for student and teacher management, attendance tracking, grade management, and report generation. It features role-based access control and real-time updates.",
    },
    {
      id: 5,
      title: "PathFinding Website",
      description:
        "A visualization tool for pathfinding algorithms using NextJS and MapLibreGL.",
      image: "/Project3.png?height=300&width=400",
      tags: ["Next.js", "Algorithms", "Visualization", "Maps"],
      github: "https://gitlab.com/collegeprojects3461408/daa-4thsemester/-/tree/main/pathvisualization?ref_type=heads",
      demo: "https://deployement-page.vercel.app/",
      details:
        "This project visualizes pathfinding algorithms like A* and Dijkstra on an interactive map interface. Features include customizable start/end points, obstacle placement, and algorithm comparison.",
    },
    {
      id: 6,
      title: "MST-TSP Route Optimization",
      description:
        "An optimization project for solving Minimum Spanning Tree and Traveling Salesman problems.",
      image: "/Project4.png?height=300&width=400",
      tags: ["Algorithms", "Optimization", "Graph Theory"],
      github: "https://github.com/AdityaGhildiyal/MST-CityCalculator",
      demo: "https://deployement-page.vercel.app/",
      details:
        "This project implements and visualizes solutions to classic optimization problems in graph theory. It includes features like interactive graph manipulation, algorithm visualization, and performance comparison.",
    },
    {
      id: 7,
      title: "Voice Authentication Lock",
      description:
        "A voice-based authentication system using machine learning techniques.",
      image: "/Project6.png?height=300&width=400",
      tags: ["Machine Learning", "Authentication", "Security"],
      github: "https://github.com/AdityaGhildiyal/VoiceAuth",
      demo: "https://deployement-page.vercel.app/",
      details:
        "This project implements voice recognition and authentication using machine learning algorithms. Features include voice pattern analysis, secure authentication, and user management.",
    },
  ]

  const toggleExpand = (id: number) => {
    if (expandedProject === id) {
      setExpandedProject(null)
    } else {
      setExpandedProject(id)
    }
  }

  // Combine projects based on showAllProjects state
  const displayedProjects = showAllProjects ? [...featuredProjects, ...otherProjects] : featuredProjects

  return (
    <section id="projects" className="py-20 relative" ref={ref}>
      <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-20"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-5xl mx-auto"
      >
        <motion.div variants={itemVariants} className="mb-12">
          <div className="text-sm font-mono text-emerald-400 mb-2">&gt; projects.forEach()</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
            Featured Projects<span className="text-emerald-400">;</span>
          </h2>
          <p className="text-slate-300 max-w-2xl">
            Here are some of the projects I&apos;ve worked on. Each one represents a unique challenge and solution.
          </p>
        </motion.div>

        <motion.div variants={containerVariants} className="grid gap-8">
          {displayedProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className={`bg-slate-900/50 rounded-lg border border-slate-800 backdrop-blur-sm overflow-hidden transition-all duration-500 ${
                expandedProject === project.id ? "scale-[1.02]" : ""
              }`}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold font-mono text-emerald-400">{project.title}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleExpand(project.id)}
                      className="text-slate-400 hover:text-emerald-400"
                    >
                      {expandedProject === project.id ? (
                        <Minimize2 className="h-5 w-5" />
                      ) : (
                        <Maximize2 className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                  <p className="text-slate-300 mb-4">
                    {expandedProject === project.id ? project.details : project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-slate-800 text-emerald-400 rounded text-xs font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 font-mono"
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-black font-mono" asChild>
                      <Link href={project.demo}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="relative h-[250px] md:h-auto overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] to-transparent opacity-50"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div ref={buttonRef} variants={itemVariants} className="mt-12 text-center">
          <Button
            onClick={toggleShowAllProjects}
            className="bg-emerald-500 hover:bg-emerald-600 text-black font-mono flex items-center gap-2"
          >
            {showAllProjects ? (
              <>
                Show Less Projects <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                View All Projects <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
