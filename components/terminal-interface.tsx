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
          <p className="text-emerald-400">Welcome to Aditya&apos;s Terminal!</p>
          <p className="text-slate-300 mt-1">Type &apos;help&apos; to see available commands.</p>
        </div>
      ),
    },
  ])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [commandHistory])

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
              Full Stack Developer with 5+ years of experience building web applications. Passionate about creating
              elegant solutions to complex problems using modern technologies.
            </p>
          </div>
        )
        break

      case "skills":
        result = (
          <div className="space-y-1">
            <p className="text-emerald-400">Technical Skills:</p>
            <p>
              <span className="text-yellow-400">Frontend:</span> React, Next.js, TypeScript, Tailwind CSS
            </p>
            <p>
              <span className="text-yellow-400">Backend:</span> Node.js, Express, MongoDB, PostgreSQL
            </p>
            <p>
              <span className="text-yellow-400">Other:</span> Git, Docker, AWS, CI/CD
            </p>
          </div>
        )
        break

      case "projects":
        result = (
          <div className="space-y-1">
            <p className="text-emerald-400">Notable Projects:</p>
            <p>
              <span className="text-yellow-400">E-Commerce Platform</span> - Full-stack online store with payment
              integration
            </p>
            <p>
              <span className="text-yellow-400">Task Management App</span> - Collaborative task tracking with real-time
              updates
            </p>
            <p>
              <span className="text-yellow-400">Weather Dashboard</span> - Interactive weather visualization app
            </p>
            <p>
              <span className="text-yellow-400">Social Media Analytics</span> - Dashboard for tracking social metrics
            </p>
          </div>
        )
        break

      case "contact":
        result = (
          <div className="space-y-1">
            <p className="text-emerald-400">Contact Information:</p>
            <p>
              <span className="text-yellow-400">Email:</span> aditya.ghildiyal@example.com
            </p>
            <p>
              <span className="text-yellow-400">GitHub:</span> github.com/adityaghildiyal
            </p>
            <p>
              <span className="text-yellow-400">LinkedIn:</span> linkedin.com/in/adityaghildiyal
            </p>
            <p>
              <span className="text-yellow-400">Twitter:</span> twitter.com/adityaghildiyal
            </p>
          </div>
        )
        break

      case "experience":
        result = (
          <div className="space-y-1">
            <p className="text-emerald-400">Work Experience:</p>
            <p>
              <span className="text-yellow-400">Senior Developer</span> - TechCorp (2021-Present)
            </p>
            <p className="pl-4 text-sm">Led development of enterprise applications using React and Node.js</p>
            <p>
              <span className="text-yellow-400">Full Stack Developer</span> - WebSolutions (2019-2021)
            </p>
            <p className="pl-4 text-sm">Built and maintained e-commerce platforms and CMS systems</p>
            <p>
              <span className="text-yellow-400">Junior Developer</span> - StartupX (2018-2019)
            </p>
            <p className="pl-4 text-sm">Developed frontend components and implemented responsive designs</p>
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
          <p className="text-red-400">Command not found: {command}. Type &apos;help&apos; to see available commands.</p>
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
    if (e.key === "ArrowUp") {
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
          setIsOpen(true)
          setIsMinimized(false)
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
            className="fixed bottom-16 right-4 w-full max-w-md h-96 bg-slate-900 border border-slate-700 rounded-md shadow-xl overflow-hidden z-50"
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
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <div
                className="p-4 h-[calc(100%-2.5rem)] overflow-y-auto font-mono text-sm"
                ref={terminalRef}
                onClick={focusInput}
              >
                {commandHistory.map((cmd, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex">
                      <span className="text-emerald-400 mr-2">$</span>
                      <span className="text-slate-200">{cmd.input}</span>
                    </div>
                    <div className="mt-1 ml-4">{cmd.output}</div>
                  </div>
                ))}
                <form onSubmit={handleSubmit} className="flex mt-2">
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
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
