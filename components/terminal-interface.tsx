"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Terminal, X, Minimize2, Maximize2 } from "lucide-react"

type CommandResult = {
  input: string
  output: React.ReactNode
}

export default function TerminalInterface() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [input, setInput] = useState("")
  const [commandHistory, setCommandHistory] = useState<CommandResult[]>([
    {
      input: "welcome",
      output: (
        <div>
          <p className="text-emerald-400">Welcome to Aditya's Terminal!</p>
          <p className="text-slate-300 mt-1">Type 'help' to see available commands.</p>
        </div>
      ),
    },
  ])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [commandHistory])

  useEffect(() => {
    if (isOpen) {
      focusInput()
    }
  }, [isOpen])

  const handleCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase()
    let result: React.ReactNode

    switch (command) {
      case "help":
        result = (
          <div className="space-y-1">
            <p className="text-emerald-400">Available commands:</p>
            <p>
              <span className="text-yellow-400">about</span> - Learn about Aditya
            </p>
            <p>
              <span className="text-yellow-400">skills</span> - View technical skills
            </p>
            <p>
              <span className="text-yellow-400">projects</span> - List projects
            </p>
            <p>
              <span className="text-yellow-400">contact</span> - Get contact information
            </p>
            <p>
              <span className="text-yellow-400">experience</span> - View work experience
            </p>
            <p>
              <span className="text-yellow-400">clear</span> - Clear terminal
            </p>
            <p>
              <span className="text-yellow-400">exit</span> - Close terminal
            </p>
          </div>
        )
        break

      case "about":
        result = (
          <div className="space-y-1">
            <p className="text-emerald-400">About Aditya Ghildiyal:</p>
            <p>
              Full Stack Developer with extensive experience in building modern web applications. 
              Expert in creating elegant solutions to complex problems using cutting-edge technologies.
              Passionate about clean code, performance optimization, and user experience.
            </p>
          </div>
        )
        break

      case "skills":
        result = (
          <div className="space-y-1">
            <p className="text-emerald-400">Technical Skills:</p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">Frontend:</span>
                <span>React, Next.js, TypeScript, Tailwind CSS, HTML/CSS</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">Backend:</span>
                <span>Node.js, Express, MongoDB, PostgreSQL</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">Tools:</span>
                <span>Git, Docker, CI/CD</span>
              </div>
            </div>
          </div>
        )
        break

      case "projects":
        result = (
          <div className="space-y-1">
            <p className="text-emerald-400">Featured Projects:</p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">Tournament Fixture Generator</span>
                <span className="text-slate-400">- Next.js, TypeScript, Algorithms</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">ChatBot</span>
                <span className="text-slate-400">- Next.js, OpenAI API, NLP</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">Minesweeper</span>
                <span className="text-slate-400">- React, Game Development</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">ERP Cell</span>
                <span className="text-slate-400">- Next.js, API Integration</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">PathFinding Website</span>
                <span className="text-slate-400">- Next.js, Algorithms, Maps</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">MST-TSP Route Optimization</span>
                <span className="text-slate-400">- Algorithms, Graph Theory</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">Voice Authentication Lock</span>
                <span className="text-slate-400">- Machine Learning</span>
              </div>
            </div>
          </div>
        )
        break

      case "contact":
        result = (
          <div className="space-y-1">
            <p className="text-emerald-400">Contact Information:</p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">Email:</span>
                <a href="mailto:aditya.ghildiyal@gmail.com" className="text-slate-300 hover:text-emerald-400">
                  aditya.ghildiyal@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">GitHub:</span>
                <a href="https://github.com/AdityaGhildiyal" className="text-slate-300 hover:text-emerald-400">
                  github.com/AdityaGhildiyal
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">LinkedIn:</span>
                <a href="https://linkedin.com/in/adityaghildiyal" className="text-slate-300 hover:text-emerald-400">
                  linkedin.com/in/adityaghildiyal
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">Twitter:</span>
                <a href="https://twitter.com/AdityaGhildiyal" className="text-slate-300 hover:text-emerald-400">
                  twitter.com/AdityaGhildiyal
                </a>
              </div>
            </div>
          </div>
        )
        break

      case "experience":
        result = (
          <div className="space-y-1">
            <p className="text-emerald-400">Professional Experience:</p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">Freelance Web Developer</span>
                <span className="text-slate-400">- Self-employed (2023 - Present)</span>
              </div>
              <div className="ml-4 text-sm text-slate-400">
                Building modern web applications using React and NextJS. Handling full-stack development and deployment.
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">ML Intern</span>
                <span className="text-slate-400">- WebSolution Ltd. (2023)</span>
              </div>
              <div className="ml-4 text-sm text-slate-400">
                Worked on machine learning projects and implemented various ML algorithms for data analysis and prediction.
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">Frontend Developer</span>
                <span className="text-slate-400">- Frontend Masters (2024)</span>
              </div>
              <div className="ml-4 text-sm text-slate-400">
                Completed advanced certification in modern frontend development, covering React, TypeScript, and state management patterns.
              </div>
            </div>
            <p className="text-emerald-400 mt-2">Education:</p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">B.Tech in Computer Science and Engineering</span>
                <span className="text-slate-400">- Graphic Era Hill University (2023 - Present)</span>
              </div>
              <div className="ml-4 text-sm text-slate-400">
                Currently pursuing B.Tech in Computer Science and Engineering. Focusing on core CS fundamentals, data structures, algorithms, and modern web development technologies.
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">Higher Secondary Education</span>
                <span className="text-slate-400">- Srinagar Garhwal (2020 - 2022)</span>
              </div>
              <div className="ml-4 text-sm text-slate-400">
                Completed 11th and 12th standard with focus on science and mathematics.
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">Early Education</span>
                <span className="text-slate-400">- Delhi & Bhopal (2008 - 2020)</span>
              </div>
              <div className="ml-4 text-sm text-slate-400">
                Completed schooling up to 10th standard in various cities across India.
              </div>
            </div>
          </div>
        )
        break

      case "clear":
        setCommandHistory([])
        return

      case "exit":
        setIsOpen(false)
        return

      case "":
        result = <span></span>
        break

      default:
        result = (
          <p className="text-red-400">Command not found: {command}. Type 'help' to see available commands.</p>
        )
    }

    setCommandHistory((prev) => [...prev, { input: command, output: result }])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      handleCommand(input)
      setInput("")
      setHistoryIndex(-1)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && isOpen) {
      e.preventDefault()
      setIsOpen(false)
      setIsMinimized(false)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex].input)
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex].input)
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput("")
      }
    }
  }

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <>
      <Button
        onClick={() => {
          if (!isOpen) {
            setIsOpen(true)
            setIsMinimized(false)
          }
        }}
        className="fixed bottom-4 right-4 bg-slate-800 hover:bg-slate-700 z-50"
        size="icon"
      >
        <Terminal className="h-5 w-5 text-emerald-400" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: isMinimized ? "calc(100% - 2.5rem)" : 0,
              height: isMinimized ? "2.5rem" : "auto",
            }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-16 right-4 w-full max-w-md bg-slate-900 border border-slate-700 rounded-md shadow-xl overflow-hidden z-50"
            style={{
              height: isMinimized ? "2.5rem" : "calc(100vh - 6rem)",
            }}
          >
            <div className="flex items-center justify-between bg-slate-800 px-4 py-2 border-b border-slate-700">
              <div className="flex items-center">
                <Terminal className="h-4 w-4 text-emerald-400 mr-2" />
                <span className="text-sm font-mono text-slate-200">terminal@aditya:~</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-slate-400 hover:text-slate-200"
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-slate-400 hover:text-red-400"
                  onClick={() => {
                    setIsOpen(false)
                    setIsMinimized(false)
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <div className="flex flex-col h-full">
                <div
                  className="flex-1 overflow-y-auto p-4 font-mono text-sm"
                  ref={terminalRef}
                  style={{
                    maxHeight: "calc(100vh - 15rem)",
                    minHeight: "10rem",
                  }}
                >
                  {commandHistory.map((command, index) => (
                    <div key={index} className="space-y-1">
                      <div className="text-emerald-400">&gt; {command.input}</div>
                      {command.output}
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSubmit} className="p-4">
                  <div className="flex">
                    <span className="text-emerald-400 mr-2">$</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 bg-transparent outline-none text-slate-200 font-mono"
                      autoFocus
                    />
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
