"use client"

import type React from "react"
import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AtSign, Github, Linkedin, MapPin, Send, Twitter } from "lucide-react"

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setSubmitted(true)
      setFormState({ name: "", email: "", message: "" })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    } catch (error: any) {
      console.error('Error:', error)
      setError(error.message || 'An unexpected error occurred')
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setError(null)
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 relative" ref={ref}>
      <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-20"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-4xl mx-auto"
      >
        <motion.div variants={itemVariants} className="mb-12">
          <div className="text-sm font-mono text-emerald-400 mb-2"> contact.init()</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
            Get In Touch<span className="text-emerald-400">;</span>
          </h2>
          <p className="text-slate-300 max-w-2xl">
            Have a project in mind or want to discuss potential opportunities? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          <motion.div variants={itemVariants}>
            <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-800 backdrop-blur-sm mb-6">
              <h3 className="text-xl font-bold mb-4 font-mono text-emerald-400">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <AtSign className="w-5 h-5 text-emerald-400 mr-3" />
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=adityaghildiyal@proton.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-emerald-400 transition-colors"
                  >
                    adityaghildiyal@proton.me
                  </a>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-emerald-400 mr-3" />
                  <span className="text-slate-300">Dehradun, Uttarakhand</span>
                </div>
              </div>

              <h3 className="text-xl font-bold mt-8 mb-4 font-mono text-emerald-400">Social Links</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/AdityaGhildiyal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 p-3 rounded-full text-slate-300 hover:text-emerald-400 hover:border-emerald-400 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/aditya-ghildiyal-1a02772a0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 p-3 rounded-full text-slate-300 hover:text-emerald-400 hover:border-emerald-400 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://x.com/Ghil82362Aditya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 p-3 rounded-full text-slate-300 hover:text-emerald-400 hover:border-emerald-400 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=adityaghildiyal@proton.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 p-3 rounded-full text-slate-300 hover:text-emerald-400 hover:border-emerald-400 transition-colors"
                >
                  <AtSign className="w-5 h-5" />
                </a>
              </div>
            </div>

            <motion.div
              variants={itemVariants}
              className="bg-slate-900/50 p-6 rounded-lg border border-slate-800 backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold mb-4 font-mono text-emerald-400">Freelancing Hours</h3>
              <div className="space-y-2 text-slate-300">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-mono text-emerald-400">--</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-mono text-emerald-400">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-mono text-emerald-400">Closed</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <form
              onSubmit={handleSubmit}
              className="bg-slate-900/50 p-6 rounded-lg border border-slate-800 backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold mb-6 font-mono text-emerald-400">Send Message</h3>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-mono text-slate-300">
                    Name<span className="text-emerald-400">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="bg-slate-800 border-slate-700 focus:border-emerald-500 focus:ring-emerald-500"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-mono text-slate-300">
                    Email<span className="text-emerald-400">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="bg-slate-800 border-slate-700 focus:border-emerald-500 focus:ring-emerald-500"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-mono text-slate-300">
                    Message<span className="text-emerald-400">*</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    className="bg-slate-800 border-slate-700 focus:border-emerald-500 focus:ring-emerald-500 min-h-[150px]"
                    placeholder="Hello, I'd like to talk about..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-mono"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </span>
                  )}
                </Button>

                {submitted && (
                  <div className="mt-4 p-3 bg-emerald-500/20 border border-emerald-500 rounded-md text-emerald-400 text-sm">
                    Thank you! Your message has been sent successfully.
                  </div>
                )}

                {error && (
                  <div className="mt-4 p-3 bg-red-500/20 border border-red-500 rounded-md text-red-400 text-sm">
                    Error: {error}
                  </div>
                )}
              </div>
            </form>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="mt-20 text-center">
          <p className="text-slate-400 font-mono">
            <span className="text-emerald-400">const</span> footer = <span className="text-emerald-400">{`{`}</span>
            copyright:{" "}
            <span className="text-green-300">
              "© {new Date().getFullYear()} Aditya Ghildiyal. All rights reserved."
            </span>
            <span className="text-emerald-400">{`}`}</span>;
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}