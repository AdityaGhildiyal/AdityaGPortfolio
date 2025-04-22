"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Server, Database, Code, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useRef } from "react"
import CustomCursor from "@/components/custom-cursor"

export default function DemoPage() {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [showError, setShowError] = useState(false)
  const scrollPosition = useRef(0)

  // Save scroll position when navigating away
  useEffect(() => {
    scrollPosition.current = window.scrollY

    // Save scroll position to sessionStorage
    const handleBeforeUnload = () => {
      sessionStorage.setItem("scrollPosition", scrollPosition.current.toString())
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval)
          setTimeout(() => setShowError(true), 1000)
          return 90
        }
        return prev + Math.floor(Math.random() * 15)
      })
    }, 300)

    const savedPosition = sessionStorage.getItem("scrollPosition")
    if (savedPosition) {
      window.scrollTo(0, Number.parseInt(savedPosition))
      sessionStorage.removeItem("scrollPosition")
    }

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0E17] to-[#111927] text-slate-100 flex flex-col">
      <CustomCursor />
      <header className="p-4 border-b border-slate-800">
        <div className="container mx-auto">
          <Link href="/" className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-mono">Return to Portfolio</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full"
        >
          {!showError ? (
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-4 bg-slate-800/50 rounded-full mb-6">
                <Server className="w-8 h-8 text-emerald-400" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-4 font-mono">Initializing Application</h1>
              <p className="text-slate-300 mb-8">Setting up the backend services and connecting to the database...</p>

              <div className="w-full bg-slate-800 rounded-full h-4 mb-4">
                <div
                  className="h-4 rounded-full bg-emerald-500"
                  style={{ width: `${loadingProgress}%`, transition: "width 0.3s ease-in-out" }}
                ></div>
              </div>
              <p className="text-sm text-slate-400 font-mono">{loadingProgress}% Complete</p>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                  <div className="flex items-center mb-2">
                    <Server className="w-4 h-4 text-emerald-400 mr-2" />
                    <span className="font-mono text-sm">API Server</span>
                  </div>
                  <div className="text-xs text-slate-400 font-mono">Initializing...</div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                  <div className="flex items-center mb-2">
                    <Database className="w-4 h-4 text-emerald-400 mr-2" />
                    <span className="font-mono text-sm">Database</span>
                  </div>
                  <div className="text-xs text-slate-400 font-mono">Connecting...</div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                  <div className="flex items-center mb-2">
                    <Code className="w-4 h-4 text-emerald-400 mr-2" />
                    <span className="font-mono text-sm">Frontend</span>
                  </div>
                  <div className="text-xs text-slate-400 font-mono">Ready</div>
                </div>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-slate-800/50 p-8 rounded-lg border border-slate-700 text-center"
            >
              <div className="inline-flex items-center justify-center p-4 bg-amber-500/20 rounded-full mb-6">
                <AlertTriangle className="w-8 h-8 text-amber-500" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-4 font-mono">Backend Deployment In Progress</h1>
              <div className="h-px w-full bg-slate-700 my-6"></div>
              <p className="text-slate-300 mb-6">
                We&apos;re currently working on deploying the backend services for this application. The frontend is
                ready, but the backend components are still being configured.
              </p>
              <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-700 mb-6 text-left">
                <p className="font-mono text-sm text-slate-300 mb-2">// Status update</p>
                <p className="font-mono text-xs text-amber-500">
                  Error: Unable to connect to database server. Please check your connection settings and try again.
                </p>
              </div>
              <p className="text-slate-400 mb-8">
                This is a portfolio demonstration. In a real application, you would be able to interact with the full
                stack implementation including database operations and API calls.
              </p>
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-black font-mono" asChild>
                <Link href="/">Return to Portfolio</Link>
              </Button>
            </motion.div>
          )}
        </motion.div>
      </main>

      <footer className="py-6 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} Aditya Ghildiyal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
