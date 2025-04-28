"use client"

import { useEffect, useState, useRef } from "react"
import { useParams, notFound, useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Calendar, Clock, Share2, Check, Copy, Facebook, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

// Blog post content
const blogPosts = {
  "heap-data-structure": {
    title: "Understanding Heap Data Structure: Implementation and Applications",
    date: "May 15, 2023",
    readTime: "8 min read",
    author: "Aditya Ghildiyal",
    image: "/heap.png?height=400&width=800",
    tags: ["DSA", "Heap", "Priority Queue", "Algorithms"],
    next: "tim-sort-algorithm",
    prev: "hamilton-path-algorithm",
    content: `
      <h2>Introduction to Heap Data Structure</h2>
      <p>A Heap is a specialized tree-based data structure that satisfies the heap property: if P is a parent node of C, then the key of P is either greater than or equal to (in a max heap) or less than or equal to (in a min heap) the key of C. The heap is one of the most efficient implementations of priority queues, which are abstract data types that allow efficient access to the minimum or maximum element.</p>
      
      <h2>Types of Heaps</h2>
      <p>There are two main types of heaps:</p>
      <ul>
        <li><strong>Max Heap:</strong> The value of each parent node is greater than or equal to its children nodes.</li>
        <li><strong>Min Heap:</strong> The value of each parent node is less than or equal to its children nodes.</li>
      </ul>
      
      <h2>Binary Heap Implementation</h2>
      <p>A binary heap is typically implemented using an array, where for any element at index i:</p>
      <ul>
        <li>The parent is at index (i-1)/2</li>
        <li>The left child is at index 2*i + 1</li>
        <li>The right child is at index 2*i + 2</li>
      </ul>
      
      <pre><code>
class MinHeap {
  constructor() {
    this.heap = [];
  }
  
  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }
  
  getLeftChildIndex(i) {
    return 2 * i + 1;
  }
  
  getRightChildIndex(i) {
    return 2 * i + 2;
  }
  
  swap(i1, i2) {
    [this.heap[i1], this.heap[i2]] = [this.heap[i2], this.heap[i1]];
  }
  
  heapifyUp(index) {
    let currentIndex = index || this.heap.length - 1;
    let parentIndex = this.getParentIndex(currentIndex);
    
    while (currentIndex > 0 && this.heap[parentIndex] > this.heap[currentIndex]) {
      this.swap(parentIndex, currentIndex);
      currentIndex = parentIndex;
      parentIndex = this.getParentIndex(currentIndex);
    }
  }
  
  heapifyDown(index = 0) {
    let smallest = index;
    const leftIndex = this.getLeftChildIndex(index);
    const rightIndex = this.getRightChildIndex(index);
    const size = this.heap.length;
    
    if (leftIndex < size && this.heap[leftIndex] < this.heap[smallest]) {
      smallest = leftIndex;
    }
    
    if (rightIndex < size && this.heap[rightIndex] < this.heap[smallest]) {
      smallest = rightIndex;
    }
    
    if (smallest !== index) {
      this.swap(index, smallest);
      this.heapifyDown(smallest);
    }
  }
  
  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }
  
  extractMin() {
    if (this.heap.length === 0) return null;
    
    const min = this.heap[0];
    const last = this.heap.pop();
    
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.heapifyDown();
    }
    
    return min;
  }
  
  peek() {
    return this.heap[0];
  }
  
  size() {
    return this.heap.length;
  }
}
      </code></pre>
      
      <h2>Time Complexity</h2>
      <p>The time complexity of heap operations is as follows:</p>
      <ul>
        <li><strong>Insertion:</strong> O(log n)</li>
        <li><strong>Deletion (extractMin/extractMax):</strong> O(log n)</li>
        <li><strong>Finding the minimum/maximum element:</strong> O(1)</li>
        <li><strong>Heapify:</strong> O(n)</li>
      </ul>
      
      <h2>Applications of Heap Data Structure</h2>
      <p>Heaps are used in various algorithms and applications:</p>
      <ol>
        <li><strong>Priority Queues:</strong> Heaps are the most efficient implementation of priority queues, which are used in many algorithms like Dijkstra's shortest path and Prim's minimum spanning tree.</li>
        <li><strong>Heap Sort:</strong> An efficient sorting algorithm with O(n log n) time complexity.</li>
        <li><strong>Finding the k largest/smallest elements:</strong> Using a min-heap or max-heap to efficiently find these elements in a large dataset.</li>
        <li><strong>Median Maintenance:</strong> Using two heaps (a max-heap and a min-heap) to efficiently keep track of the median of a stream of numbers.</li>
        <li><strong>Memory Management:</strong> Operating systems use heaps for memory allocation.</li>
      </ol>
      
      <h2>Conclusion</h2>
      <p>The heap data structure is a powerful tool in a programmer's arsenal, offering efficient solutions to many common problems. Understanding how heaps work and when to use them can significantly improve the performance of your algorithms and applications.</p>
      
      <p>In future articles, we'll explore more advanced heap variants like Fibonacci heaps and their applications in graph algorithms.</p>
    `,
  },
  "tim-sort-algorithm": {
    title: "Tim Sort: The Efficient Hybrid Sorting Algorithm",
    date: "April 3, 2023",
    readTime: "6 min read",
    author: "Aditya Ghildiyal",
    image: "/TimSort.png?height=400&width=800",
    tags: ["Algorithms", "Sorting", "Tim Sort", "Python"],
    next: "hamilton-path-algorithm",
    prev: "heap-data-structure",
    content: `
      <h2>Introduction to Tim Sort</h2>
      <p>Tim Sort is a hybrid, stable sorting algorithm derived from merge sort and insertion sort. It was implemented by Tim Peters in 2002 for use in the Python programming language. The algorithm is designed to perform well on many kinds of real-world data and is the default sorting algorithm in Python, Java, and many other programming languages.</p>
      
      <h2>Why Tim Sort?</h2>
      <p>Tim Sort was designed to address the shortcomings of traditional sorting algorithms when dealing with real-world data. It takes advantage of the fact that real-world data often has some pre-existing order (called "runs") that can be exploited for efficiency.</p>
      
      <p>The key advantages of Tim Sort include:</p>
      <ul>
        <li><strong>Stability:</strong> It preserves the relative order of equal elements.</li>
        <li><strong>Efficiency:</strong> O(n log n) worst-case time complexity.</li>
        <li><strong>Adaptivity:</strong> It performs better on partially sorted arrays.</li>
        <li><strong>Memory usage:</strong> It requires O(n) auxiliary space.</li>
      </ul>
      
      <h2>How Tim Sort Works</h2>
      <p>Tim Sort works by first dividing the array into small chunks (called "runs"), sorting these runs using insertion sort, and then merging the sorted runs using a modified merge sort algorithm. Here's a step-by-step breakdown:</p>
      
      <h3>1. Determine the Run Size</h3>
      <p>Tim Sort first determines the size of the "runs" (subarrays) that will be sorted individually. The minimum run size is typically between 32 and 64 elements, depending on the implementation.</p>
      
      <h3>2. Sort Individual Runs</h3>
      <p>Each run is sorted using insertion sort, which is efficient for small arrays or nearly sorted arrays.</p>
      
      <h3>3. Merge Runs</h3>
      <p>The sorted runs are then merged using a modified merge sort algorithm. Tim Sort uses a smart merging strategy that minimizes the number of comparisons and movements.</p>
      
      <pre><code>
def insertion_sort(arr, left, right):
    for i in range(left + 1, right + 1):
        j = i
        while j > left and arr[j] < arr[j - 1]:
            arr[j], arr[j - 1] = arr[j - 1], arr[j]
            j -= 1

def merge(arr, l, m, r):
    len1, len2 = m - l + 1, r - m
    left, right = [], []
    
    for i in range(0, len1):
        left.append(arr[l + i])
    for i in range(0, len2):
        right.append(arr[m + 1 + i])
    
    i, j, k = 0, 0, l
    
    while i < len1 and j < len2:
        if left[i] <= right[j]:
            arr[k] = left[i]
            i += 1
        else:
            arr[k] = right[j]
            j += 1
        k += 1
    
    while i < len1:
        arr[k] = left[i]
        k += 1
        i += 1
    
    while j < len2:
        arr[k] = right[j]
        k += 1
        j += 1

def tim_sort(arr):
    n = len(arr)
    min_run = 32
    
    # Sort individual subarrays of size min_run
    for i in range(0, n, min_run):
        insertion_sort(arr, i, min((i + min_run - 1), (n - 1)))
    
    # Start merging from size min_run
    size = min_run
    while size < n:
        for left in range(0, n, 2 * size):
            mid = min((left + size - 1), (n - 1))
            right = min((left + 2 * size - 1), (n - 1))
            
            if mid < right:
                merge(arr, left, mid, right)
        
        size = 2 * size
      </code></pre>
      
      <h2>Optimizations in Tim Sort</h2>
      <p>Tim Sort includes several optimizations that make it efficient in practice:</p>
      
      <h3>Galloping Mode</h3>
      <p>When merging runs, if one run consistently dominates the other, Tim Sort enters "galloping mode" where it uses binary search to find the insertion points, reducing the number of comparisons.</p>
      
      <h3>Run Detection</h3>
      <p>Tim Sort identifies natural runs (sequences that are already sorted) in the input array and preserves them, which can significantly reduce the sorting effort.</p>
      
      <h3>Merge Strategy</h3>
      <p>Tim Sort uses a smart strategy to decide which runs to merge, minimizing the total number of merges and comparisons.</p>
      
      <h2>Time and Space Complexity</h2>
      <p>Tim Sort has the following complexity characteristics:</p>
      <ul>
        <li><strong>Best-case time complexity:</strong> O(n) when the array is already sorted</li>
        <li><strong>Average-case time complexity:</strong> O(n log n)</li>
        <li><strong>Worst-case time complexity:</strong> O(n log n)</li>
        <li><strong>Space complexity:</strong> O(n)</li>
      </ul>
      
      <h2>Real-world Applications</h2>
      <p>Tim Sort is used in many real-world applications:</p>
      <ul>
        <li>It's the default sorting algorithm in Python's <code>sorted()</code> function and <code>list.sort()</code> method.</li>
        <li>Java's <code>Arrays.sort()</code> and <code>Collections.sort()</code> use Tim Sort for non-primitive types.</li>
        <li>Android's implementation of <code>Arrays.sort()</code> uses Tim Sort.</li>
        <li>Many database systems use Tim Sort for efficient sorting operations.</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Tim Sort is a powerful and efficient sorting algorithm that combines the best features of merge sort and insertion sort. Its ability to adapt to different data patterns makes it particularly well-suited for real-world applications where data often has some pre-existing order.</p>
      
      <p>Understanding Tim Sort provides insights into how algorithm design can be optimized for practical use cases rather than just theoretical worst-case scenarios.</p>
    `,
  },
  "hamilton-path-algorithm": {
    title: "Hamilton Path Algorithm: Theory and Applications",
    date: "March 12, 2023",
    readTime: "7 min read",
    author: "Aditya Ghildiyal",
    image: "/HPA.png?height=400&width=800",
    tags: ["Graph Theory", "Hamilton Path", "NP-Complete", "Algorithms"],
    next: "heap-data-structure",
    prev: "tim-sort-algorithm",
    content: `
      <h2>Introduction to Hamilton Paths</h2>
      <p>A Hamiltonian Path (or Hamilton Path) is a path in an undirected or directed graph that visits each vertex exactly once. Similarly, a Hamiltonian Circuit (or Hamilton Cycle) is a Hamiltonian Path that is a cycle, meaning it starts and ends at the same vertex.</p>
      
      <p>Named after Sir William Rowan Hamilton who invented a game that involved finding such a path on a dodecahedron, the problem of determining whether a Hamiltonian Path exists in a given graph is one of the classic NP-complete problems in computational complexity theory.</p>
      
      <h2>Understanding the Complexity</h2>
      <p>The Hamiltonian Path problem is NP-complete, which means:</p>
      <ul>
        <li>It is in NP (solutions can be verified in polynomial time)</li>
        <li>Every problem in NP can be reduced to it in polynomial time</li>
      </ul>
      
      <p>This complexity classification implies that there is no known polynomial-time algorithm to determine whether a Hamiltonian Path exists in a general graph, unless P = NP (one of the most important open questions in computer science).</p>
      
      <h2>Algorithms for Finding Hamiltonian Paths</h2>
      <p>Despite being NP-complete, several algorithms exist for solving the Hamiltonian Path problem:</p>
      
      <h3>1. Brute Force Approach</h3>
      <p>The simplest approach is to generate all possible permutations of vertices and check if any form a valid Hamiltonian Path.</p>
      
      <pre><code>
function hasHamiltonianPath(graph):
    n = number of vertices in graph
    for each permutation p of vertices:
        isPath = true
        for i = 0 to n-2:
            if there is no edge between p[i] and p[i+1]:
                isPath = false
                break
        if isPath:
            return true
    return false
      </code></pre>
      
      <p>This approach has a time complexity of O(n!), making it impractical for graphs with more than a few vertices.</p>
      
      <h3>2. Dynamic Programming Approach</h3>
      <p>For small to medium-sized graphs, dynamic programming can be more efficient:</p>
      
      <pre><code>
function findHamiltonianPath(graph):
    n = number of vertices in graph
    // dp[mask][v] = true if there is a path covering vertices in mask and ending at v
    dp[1 << v][v] = true for all vertices v
    
    for mask = 1 to (1 << n) - 1:
        for v = 0 to n-1:
            if (mask & (1 << v)) != 0:  // if v is in mask
                for u = 0 to n-1:
                    if (mask & (1 << u)) != 0 and u != v and (u,v) is an edge:
                        if dp[mask ^ (1 << v)][u]:
                            dp[mask][v] = true
    
    return true if dp[(1 << n) - 1][v] is true for any v
      </code></pre>
      
      <p>This approach has a time complexity of O(n² × 2ⁿ), which is better than the brute force approach but still exponential.</p>
      
      <h3>3. Backtracking Algorithm</h3>
      <p>Backtracking can be used to find a Hamiltonian Path more efficiently in practice:</p>
      
      <pre><code>
function hamiltonianPath(graph):
    n = number of vertices in graph
    path = array of size n, initialized with -1
    path[0] = 0  // Start with vertex 0
    
    if findPath(graph, path, 1):
        return path
    else:
        return "No Hamiltonian Path exists"

function findPath(graph, path, pos):
    n = number of vertices in graph
    
    // If all vertices are included in the path
    if pos == n:
        return true
    
    for v = 1 to n-1:  // Try different vertices
        // Check if this vertex can be added to the path
        if isValid(graph, path, pos, v):
            path[pos] = v
            
            // Recur to construct rest of the path
            if findPath(graph, path, pos+1):
                return true
            
            // If adding vertex v doesn't lead to a solution, remove it
            path[pos] = -1
    
    return false

function isValid(graph, path, pos, v):
    // Check if this vertex is adjacent to the previously added vertex
    if not graph[path[pos-1]][v]:
        return false
    
    // Check if the vertex has already been included in the path
    for i = 0 to pos-1:
        if path[i] == v:
            return false
    
    return true
      </code></pre>
      
      <h2>Applications of Hamiltonian Paths</h2>
      <p>Hamiltonian Paths and Cycles have numerous practical applications:</p>
      
      <h3>1. Circuit Design</h3>
      <p>In electronic circuit design, Hamiltonian Paths are used to optimize the layout of components and minimize wire crossings.</p>
      
      <h3>2. Network Routing</h3>
      <p>In computer networks, finding efficient routes that visit each node exactly once can optimize data transmission and reduce network congestion.</p>
      
      <h3>3. Genome Assembly</h3>
      <p>In bioinformatics, Hamiltonian Paths are used in DNA sequencing to reconstruct the original DNA sequence from fragments.</p>
      
      <h3>4. Operations Research</h3>
      <p>The famous Traveling Salesman Problem (TSP) is a special case of the Hamiltonian Cycle problem where edges have weights, and the goal is to find the minimum-weight cycle.</p>
      
      <h3>5. Game Design</h3>
      <p>Puzzle games often incorporate Hamiltonian Path problems, challenging players to find paths that visit each location exactly once.</p>
      
      <h2>Special Cases and Properties</h2>
      <p>While the general problem is NP-complete, there are special cases where Hamiltonian Paths can be found efficiently:</p>
      
      <h3>Dirac's Theorem</h3>
      <p>If a graph with n vertices (n ≥ 3) has a minimum degree of n/2 or greater, then it contains a Hamiltonian Cycle.</p>
      
      <h3>Ore's Theorem</h3>
      <p>If a graph with n vertices (n ≥ 3) satisfies d(u) + d(v) ≥ n for every pair of non-adjacent vertices u and v, then it contains a Hamiltonian Cycle.</p>
      
      <h3>Complete Graphs</h3>
      <p>Every complete graph has a Hamiltonian Path (and Cycle), and finding one is trivial.</p>
      
      <h2>Conclusion</h2>
      <p>The Hamiltonian Path problem remains one of the most fascinating and challenging problems in graph theory. Despite its computational complexity, it continues to inspire new algorithms and heuristics that work well in practice for specific types of graphs.</p>
      
      <p>Understanding Hamiltonian Paths and their properties is essential for anyone working in algorithm design, network optimization, or computational complexity theory.</p>
    `,
  },
}

export default function BlogPost() {
  const { slug } = useParams()
  const router = useRouter()
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copied, setCopied] = useState(false)
  const shareMenuRef = useRef<HTMLDivElement>(null)
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
    // Simulate loading
    const timer = setTimeout(() => {
      if (typeof slug === "string" && slug in blogPosts) {
        setPost(blogPosts[slug as keyof typeof blogPosts])
      }
      setLoading(false)

      // Restore scroll position if returning to the page
      const savedPosition = sessionStorage.getItem("scrollPosition")
      if (savedPosition) {
        window.scrollTo(0, Number.parseInt(savedPosition))
        sessionStorage.removeItem("scrollPosition")
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [slug])

  useEffect(() => {
    // Close share menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setShowShareMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const copyToClipboard = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const shareOnSocial = (platform: string) => {
    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent(post?.title || "Check out this article")

    let shareUrl = ""
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`
        break
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        break
    }

    window.open(shareUrl, "_blank")
    setShowShareMenu(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0E17] text-slate-100 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#0A0E17] text-slate-100">
      <header className="bg-slate-900/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-mono">Back to Portfolio</span>
          </Link>
          <div className="relative" ref={shareMenuRef}>
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-300 hover:text-emerald-400"
              onClick={() => setShowShareMenu(!showShareMenu)}
            >
              <Share2 className="w-5 h-5" />
            </Button>

            <AnimatePresence>
              {showShareMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-md shadow-lg z-20 border border-slate-700 overflow-hidden"
                >
                  <div className="py-1">
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center w-full px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-emerald-400"
                    >
                      {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                      {copied ? "Copied!" : "Copy link"}
                    </button>
                    <button
                      onClick={() => shareOnSocial("twitter")}
                      className="flex items-center w-full px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-emerald-400"
                    >
                      <Twitter className="w-4 h-4 mr-2" />
                      Share on Twitter
                    </button>
                    <button
                      onClick={() => shareOnSocial("facebook")}
                      className="flex items-center w-full px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-emerald-400"
                    >
                      <Facebook className="w-4 h-4 mr-2" />
                      Share on Facebook
                    </button>
                    <button
                      onClick={() => shareOnSocial("linkedin")}
                      className="flex items-center w-full px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-emerald-400"
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      Share on LinkedIn
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag: string) => (
                  <span key={tag} className="px-2 py-1 bg-slate-800 text-emerald-400 rounded text-xs font-mono">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 font-mono">{post.title}</h1>
              <div className="flex items-center text-sm text-slate-400 mb-6">
                <div className="flex items-center mr-4">
                  <Calendar className="w-4 h-4 mr-1" />
                  {post.date}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {post.readTime}
                </div>
              </div>
              <div className="mb-8">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-auto rounded-lg object-cover max-h-[400px]"
                />
              </div>
            </div>

            <div className="prose prose-invert prose-emerald max-w-none prose-pre:bg-slate-900/80 prose-pre:border prose-pre:border-slate-700">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            <div className="mt-12 pt-8 border-t border-slate-800">
              <h3 className="text-xl font-bold mb-4 font-mono">About the Author</h3>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-800">
                  <img src="/HeadShot.jpg?height=64&width=64" alt="Author" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-emerald-400">{post.author}</h4>
                  <p className="text-slate-300 mt-1">
                    Full Stack Developer specializing in modern web technologies. Passionate about algorithms, data
                    structures, and creating elegant solutions to complex problems.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex justify-between">
              {post.prev && (
                <Link href={`/blog/${post.prev}`}>
                  <Button
                    variant="outline"
                    className="border-slate-700 text-slate-300 hover:text-emerald-400 hover:border-emerald-400"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous Article
                  </Button>
                </Link>
              )}
              {post.next && (
                <Link href={`/blog/${post.next}`}>
                  <Button
                    variant="outline"
                    className="border-slate-700 text-slate-300 hover:text-emerald-400 hover:border-emerald-400"
                  >
                    Next Article
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="bg-slate-900 border-t border-slate-800 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400 font-mono">
            © {new Date().getFullYear()} Aditya Ghildiyal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
