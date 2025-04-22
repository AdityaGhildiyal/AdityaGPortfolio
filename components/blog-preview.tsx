"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type BlogPost = {
  id: number
  title: string
  excerpt: string
  date: string
  readTime: string
  image: string
  tags: string[]
  slug: string
}

export default function BlogPreview() {
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

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Understanding Heap Data Structure: Implementation and Applications",
      excerpt:
        "A comprehensive guide to the Heap data structure, covering its implementation, time complexity, and practical applications in algorithm design.",
      date: "May 15, 2023",
      readTime: "8 min read",
      image: "/heap.png?height=200&width=400",
      tags: ["DSA", "Heap", "Priority Queue", "Algorithms"],
      slug: "heap-data-structure",
    },
    {
      id: 2,
      title: "Tim Sort: The Efficient Hybrid Sorting Algorithm",
      excerpt:
        "Explore Tim Sort, the hybrid sorting algorithm that combines merge sort and insertion sort to achieve optimal performance in real-world scenarios.",
      date: "April 3, 2023",
      readTime: "6 min read",
      image: "/TimSort.png?height=200&width=400",
      tags: ["Algorithms", "Sorting", "Tim Sort", "Python"],
      slug: "tim-sort-algorithm",
    },
    {
      id: 3,
      title: "Hamilton Path Algorithm: Theory and Applications",
      excerpt:
        "Dive into the Hamilton Path problem, its algorithmic solutions, and practical applications in network routing and circuit design.",
      date: "March 12, 2023",
      readTime: "7 min read",
      image: "/HPA.png?height=200&width=400",
      tags: ["Graph Theory", "Hamilton Path", "NP-Complete", "Algorithms"],
      slug: "hamilton-path-algorithm",
    },
  ]

  return (
    <section id="blog" className="py-20 relative" ref={ref}>
      <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-20"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-4xl mx-auto"
      >
        <motion.div variants={itemVariants} className="mb-12">
          <div className="text-sm font-mono text-emerald-400 mb-2">&gt; blog.filter(recent)</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
            My Articles<span className="text-emerald-400">;</span>
          </h2>
          <p className="text-slate-300 max-w-2xl">
            Thoughts, tutorials, and insights about algorithms, data structures, and computer science concepts.
          </p>
        </motion.div>

        <motion.div variants={containerVariants} className="grid gap-8">
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              className="bg-slate-900/50 rounded-lg border border-slate-800 backdrop-blur-sm overflow-hidden hover:border-emerald-500/50 transition-colors duration-300"
            >
              <div className="grid md:grid-cols-[1fr_250px] gap-6">
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-slate-800 text-emerald-400 rounded text-xs font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-xl font-bold font-mono text-slate-200 mb-3 hover:text-emerald-400 transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-slate-400 mb-4">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-slate-500 mb-4">
                    <div className="flex items-center mr-4">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="ghost" className="text-emerald-400 hover:text-emerald-500 p-0 h-auto">
                      Read Article <ArrowRight className="w-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
                <div className="relative h-[200px] md:h-auto overflow-hidden">
                  <Link href={`/blog/${post.slug}`}>
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="object-cover w-full h-full"
                    />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
