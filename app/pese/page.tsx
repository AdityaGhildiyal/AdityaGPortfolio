"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, FileText, Film, Terminal, Video, Users, Brain } from "lucide-react"
import CustomCursor from "@/components/custom-cursor"

export default function PESEPage() {
  const [activeTab, setActiveTab] = useState("introduction")
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    setMounted(true)
  }, [])

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

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#0A0E17] text-slate-100">
      <CustomCursor />
      <header className="bg-slate-900/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-800 p-4 flex items-center">
        <Link href="/" className="flex items-center text-slate-300 hover:text-emerald-400 transition-colors">
          <ArrowLeft className="mr-2" size={20} />
          <span className="text-base">Back to Portfolio</span>
        </Link>
        <div className="flex items-center mx-auto">
          <Terminal size={22} className="text-emerald-400 mr-2" />
          <h1 className="text-2xl font-bold tracking-wide">PESE 400</h1>
        </div>
      </header>

      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-8"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <div className="text-sm font-mono text-emerald-400 mb-2">&gt; pese.sections</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
            PESE 400 Assignments<span className="text-emerald-400">;</span>
          </h2>
          <p className="text-slate-300 max-w-2xl">
            A collection of assignments and activities completed for the PESE 400 course.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap mb-8 overflow-x-auto hide-scrollbar">
          <TabButton
            icon={<Brain size={20} />}
            label="Self Introduction"
            isActive={activeTab === "introduction"}
            onClick={() => setActiveTab("introduction")}
          />
          <TabButton
            icon={<FileText size={20} />}
            label="Profiling Sheet"
            isActive={activeTab === "profiling"}
            onClick={() => setActiveTab("profiling")}
          />
          <TabButton
            icon={<Film size={20} />}
            label="Movie Review"
            isActive={activeTab === "movie"}
            onClick={() => setActiveTab("movie")}
          />
          <TabButton
            icon={<Video size={20} />}
            label="Presentation Skills"
            isActive={activeTab === "presentation"}
            onClick={() => setActiveTab("presentation")}
          />
          <TabButton
            icon={<Users size={20} />}
            label="Group Discussion"
            isActive={activeTab === "discussion"}
            onClick={() => setActiveTab("discussion")}
          />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-slate-900/50 rounded-lg border border-slate-800 backdrop-blur-sm p-6 overflow-auto max-h-[calc(100vh-12rem)]"
        >
          {activeTab === "introduction" && <SelfIntroduction />}
          {activeTab === "profiling" && <ProfilingSheet />}
          {activeTab === "movie" && <MovieReview />}
          {activeTab === "presentation" && <PresentationSkills />}
          {activeTab === "discussion" && <GroupDiscussion />}
        </motion.div>
      </motion.div>
    </div>
  )
}

function TabButton({ icon, label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-6 py-3 mr-2 mb-2 transition-all rounded-lg ${
        isActive
          ? "bg-slate-800 text-emerald-400 border-b-2 border-emerald-400"
          : "bg-slate-900/80 text-slate-400 hover:text-slate-100 border border-slate-800 hover:border-slate-700"
      }`}
    >
      <span className="mr-2">{icon}</span>
      <span className="text-base whitespace-nowrap">{label}</span>
    </button>
  )
}

// Self Introduction Component
function SelfIntroduction() {
  return (
    <div className="w-full font-mono">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-slate-100">
            Activities to Understand Left and Right Brain & Self Introduction
          </h2>
          <p className="text-slate-400 text-base">Understanding brain hemispheres and introducing myself</p>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900/50 rounded-lg border border-slate-800 backdrop-blur-sm overflow-hidden">
            <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700">
              <div className="flex items-center">
                <span className="text-emerald-400 mr-2 text-lg">$</span>
                <h3 className="text-base font-bold text-slate-100">Left Brain vs Right Brain</h3>
              </div>
            </div>

            <div className="p-4">
              <div className="bg-slate-800/60 rounded-lg p-4 mb-6 border border-slate-700">
                <h4 className="font-bold mb-3 text-slate-400 text-sm flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>
                  Understanding Brain Hemispheres
                </h4>
                <div className="text-slate-300 text-sm">
                  <p className="mb-4">The human brain has two hemispheres, each with specialized functions:</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="border border-slate-700 p-4 rounded-lg">
                      <h5 className="text-emerald-400 mb-2 font-bold">Left Brain</h5>
                      <ul className="list-disc list-inside space-y-1 text-slate-300">
                        <li>Logical thinking</li>
                        <li>Analytical reasoning</li>
                        <li>Mathematical abilities</li>
                        <li>Language processing</li>
                        <li>Sequential processing</li>
                      </ul>
                    </div>

                    <div className="border border-slate-700 p-4 rounded-lg">
                      <h5 className="text-emerald-400 mb-2 font-bold">Right Brain</h5>
                      <ul className="list-disc list-inside space-y-1 text-slate-300">
                        <li>Creative thinking</li>
                        <li>Intuition</li>
                        <li>Visual-spatial abilities</li>
                        <li>Artistic expression</li>
                        <li>Holistic processing</li>
                      </ul>
                    </div>
                  </div>

                  <p>
                    Through various activities and assessments, I've discovered that I have a balanced brain profile
                    with a slight preference for left-brain activities, which explains my aptitude for programming and
                    problem-solving while still maintaining creative abilities.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-bold mb-3 text-slate-400 text-sm flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
                  Brain Activity Video
                </h4>
                <div className="aspect-w-16 aspect-h-9 bg-slate-800/60 rounded-lg border border-slate-700 flex items-center justify-center mb-4 h-64 overflow-hidden group relative">
                  <video
                    className="w-full h-full object-contain"
                    controls
                    src="/brain-activity.mp4"
                    poster="/placeholder.svg?height=400&width=600&text=Brain Activity Video"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-lg border border-slate-800 backdrop-blur-sm overflow-hidden">
            <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700">
              <div className="flex items-center">
                <span className="text-emerald-400 mr-2 text-lg">$</span>
                <h3 className="text-base font-bold text-slate-100">Self Introduction</h3>
              </div>
            </div>

            <div className="p-4">
              <div className="bg-slate-800/60 rounded-lg p-4 mb-6 border border-slate-700">
                <h4 className="font-bold mb-3 text-slate-400 text-sm flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>
                  About Me
                </h4>
                <div className="text-slate-300 text-sm">
                  <p className="mb-4">
                    Hello! I'm Aditya Ghildiyal, a second-year Computer Science and Engineering student at Graphic Era
                    Hill University in Dehradun, Uttarakhand. I'm passionate about web development, algorithms, and
                    creating efficient solutions to real-world problems.
                  </p>

                  <p className="mb-4">
                    My technical skills include proficiency in C, C++, Python, JavaScript, and TypeScript. I've worked
                    on several projects including a ChatBot for my university, an ERP system, and a pathfinding
                    visualization tool. I enjoy the challenge of optimizing code and implementing complex algorithms.
                  </p>

                  <p>
                    Beyond coding, I'm interested in AI research and competitive programming. I believe in continuous
                    learning and am always looking to expand my knowledge in emerging technologies. My goal is to become
                    a skilled software engineer specializing in full-stack development and artificial intelligence.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-bold mb-3 text-slate-400 text-sm flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
                  Self Introduction Video
                </h4>
                <div className="aspect-w-16 aspect-h-9 bg-slate-800/60 rounded-lg border border-slate-700 flex items-center justify-center mb-4 h-64 overflow-hidden group relative">
                  <video
                    className="w-full h-full object-contain"
                    controls
                    src="/self-intro.mp4"
                    poster="/placeholder.svg?height=400&width=600&text=Self Introduction Video"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Profiling Sheet Component (from the provided code, but styled to match portfolio theme)
function ProfilingSheet() {
  const questions = [
    {
      question: "Write your career objective.",
      answer:
        "To become a skilled software engineer, specializing in full-stack development and artificial intelligence. I aim to create efficient, scalable applications that solve real-world problems while continuously enhancing my knowledge of data structures, algorithms, and system design.",
    },
    {
      question: "Why do you want to be an engineer? Elaborate reasons.",
      answer:
        "I have always been passionate about technology and problem-solving. Engineering provides the perfect platform to apply logic, creativity, and innovation to build solutions that impact society. I enjoy writing code, optimizing algorithms, and developing interactive applications, which makes software engineering the ideal field for me.",
    },
    {
      question: "Write about projects or internship you have done/ are doing along with the learning.",
      answer:
        "Attendance System with QR Code\n\nTechnologies: React, Next.js, MongoDB\n\nLearned about frontend development, API integration, and database management.\n\nOnline Class Platform\n\nTechnologies: Next.js, ZEGOCLOUD (for media streaming)\n\nGained knowledge about real-time communication, authentication, and cloud-based APIs.\n\nWordle Game (Cross-Platform)\n\nTechnologies: Next.js (web), React Native (mobile)\n\nLearned about game logic implementation, UI design, and cross-platform development.",
    },
    {
      question: "What would you consider a significant achievement in your life and why?",
      answer:
        "Building a functional chatbot for Graphic Era Hill University using Next.js and MongoDB. It provides students with information about placements, courses, and admissions. This project helped me understand API routes, database storage, and UI optimization.",
    },
    {
      question: "Write about a failure of yours which you consider to share. What have you learned from it?",
      answer:
        "I initially started working with Django for backend development but found it too complex for my use case. After struggling with it, I switched to Next.js and built my applications efficiently. This taught me that choosing the right technology stack is crucial, and sometimes, simplifying an approach leads to better results.",
    },
    {
      question: "What are your strengths? Write one or two instances where you have demonstrated your strengths.",
      answer:
        "Logical Thinking & Problem-Solving – Successfully implemented the A* algorithm for a shortest path finder project.\n\nAdaptability & Quick Learning – Switched from Django to Next.js when developing a chatbot, proving my ability to learn new technologies quickly.",
    },
    {
      question: "Write about your weaknesses. What are you doing to overcome your weaknesses?",
      answer:
        "Typing Speed – Working on improving my typing accuracy and speed through daily practice.\n\nTime Management – Using task prioritization techniques and scheduling my projects efficiently.",
    },
    {
      question:
        "What is the most difficult moment that you have faced in your life so far? What qualities helped you to overcome the moment?",
      answer:
        "Balancing college coursework and project development was challenging. Discipline, persistence, and problem-solving skills helped me manage both effectively.",
    },
    {
      question:
        "Apart from academics, what else are you interested in? Make a separate list in terms of extracurricular activities, sports and any other interests.",
      answer:
        "Extracurricular Activities:\n• Web development\n• AI research\n• Competitive programming\n\nSports:\n• Chess\n• Table tennis\n\nOther Interests:\n• Deep-sea creatures and their behaviors",
    },
    {
      question: "Give an example of an area, concept or thing that you are absolutely passionate about.",
      answer:
        "I am deeply interested in AI and algorithm optimization. Understanding how search and pathfinding algorithms work, such as A* and Dijkstra's, excites me, and I enjoy implementing them in projects.",
    },
    {
      question: "Describe yourself as an individual in 5 lines.",
      answer:
        "1. Passionate about building scalable web applications.\n\n2. Enjoys problem-solving and algorithmic challenges.\n\n3. Constantly learning new programming languages and frameworks.\n\n4. Adapts quickly to new technologies and methodologies.\n\n5. Aims to develop impactful software solutions in the future.",
    },
    {
      question: "What kinds of people do you enjoy working with?",
      answer:
        "People who are collaborative, open-minded, and eager to learn. I enjoy working with those who take initiative and contribute innovative ideas.",
    },
    {
      question:
        "What kinds of people you don't want to work with? What would you do if they became your senior in your dream job?",
      answer:
        "I prefer not to work with uncooperative or overly negative individuals. However, if such a person became my senior, I would maintain professionalism, adapt, and focus on learning from the experience.",
    },
    {
      question: "What do you expect from your first job? Prioritize and write in order.",
      answer:
        "1. Opportunities for learning and growth.\n\n2. A collaborative and innovative work environment.\n\n3. Challenging projects that improve my skills.\n\n4. Fair compensation and work-life balance.\n\n5. Exposure to industry best practices and technologies.",
    },
    {
      question: "In the past year, what have you been dissatisfied about in your performance?",
      answer:
        "I felt that my time management was not efficient enough, especially while working on multiple projects. I have since started prioritizing tasks and using productivity tools to improve efficiency.",
    },
    {
      question:
        "Rate yourself out of 5 in verbal communication. What are you doing to improve your communication skills?",
      answer:
        "3.5/5 – I can explain technical concepts well but aim to improve my clarity and confidence. To improve, I participate in discussions, explain concepts to peers, and engage in coding communities.",
    },
    {
      question:
        "Who is your role model? What qualities of that person you would like to see in your personality and why?",
      answer:
        "Elon Musk – I admire his vision, persistence, and problem-solving skills. I want to develop the ability to think ahead, take calculated risks, and innovate in my field.",
    },
    {
      question:
        "Write a few lines about your friends. Do you think they help/ may help you in achieving your goals? If yes, how? If no, why do you accompany them?",
      answer:
        "My friends are motivated and hardworking, especially in tech-related fields. We often share knowledge, discuss coding problems, and work on projects together, helping each other grow.",
    },
    {
      question:
        "Write 3 leadership qualities. How many do you possess? Write an instance where you have applied those qualities.",
      answer:
        "1. Decision-making\n\n2. Problem-solving\n\n3. Team coordination\n\nI demonstrated problem-solving and team coordination when leading my team in the Attendance System project. I ensured smooth development, assigned tasks efficiently, and handled technical challenges.",
    },
    {
      question: "So finally, tell us something more about yourself or introduce yourself.",
      answer:
        "I am a second-year CSE student at Graphic Era Hill University, passionate about software development and algorithm design. My expertise lies in React, Next.js, and MongoDB, and I enjoy building projects that solve real-world problems. Apart from coding, I have an interest in deep-sea creatures and their behaviors. I am always eager to learn and improve my skills, whether in web development, AI, or competitive programming.",
    },
  ]

  return (
    <div className="w-full font-mono">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-slate-100">Profiling Sheet</h2>
          <p className="text-slate-400 text-base">20 answers about me</p>
        </div>
        <div className="space-y-8">
          {questions.map((question, index) => (
            <div
              key={index}
              className="bg-slate-900/50 rounded-lg border border-slate-800 backdrop-blur-sm overflow-hidden"
            >
              <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700">
                <div className="flex items-center">
                  <span className="text-emerald-400 mr-2 text-lg">$</span>
                  <h3 className="text-base font-bold text-slate-100">
                    Q{index + 1}: {question.question}
                  </h3>
                </div>
              </div>

              <div className="p-4">
                <div className="bg-slate-800/60 rounded-lg p-4 mb-6 border border-slate-700 text-slate-300">
                  <h4 className="font-bold mb-3 text-slate-400 text-sm flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>
                    Answer
                  </h4>
                  <div className="whitespace-pre-line text-slate-300 text-sm">{question.answer}</div>
                </div>

                <div className="mt-6">
                  <h4 className="font-bold mb-3 text-slate-400 text-sm flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
                    My Video Response
                  </h4>
                  <div className="aspect-w-16 aspect-h-9 bg-slate-800/60 rounded-lg border border-slate-700 flex items-center justify-center mb-4 h-64 overflow-hidden group relative">
                    <video
                      className="w-full h-full object-contain"
                      controls
                      src={`/Q${index + 1}.mp4`}
                      poster={`/placeholder.svg?height=400&width=600&text=Video ${index + 1}`}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Movie Review Component (styled to match portfolio theme)
function MovieReview() {
  return (
    <div className="w-full font-mono">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-slate-100">Movie Review: The Pursuit of Happyness</h2>
          <p className="text-slate-400 text-base">My review of the movie "The Pursuit of Happyness"</p>
        </div>
        <div className="space-y-8">
          <div className="bg-slate-900/50 rounded-lg border border-slate-800 backdrop-blur-sm overflow-hidden">
            <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700">
              <div className="flex items-center">
                <span className="text-emerald-400 mr-2 text-lg">$</span>
                <h3 className="text-base font-bold text-slate-100">1) Your Favourite Dialogue and Why?</h3>
              </div>
            </div>

            <div className="p-4">
              <div className="bg-slate-800/60 rounded-lg p-4 mb-6 border border-slate-700">
                <p className="italic text-slate-300 mb-4 text-sm">
                  "Don't ever let somebody tell you… You can't do something. Not even me. You got a dream, you gotta
                  protect it."
                </p>
                <p className="text-slate-300 text-sm">
                  This dialogue hits deep because it's a reminder that dreams are fragile and easily crushed by others'
                  doubts. It speaks to self-belief and resilience, even when those around us—including people we look up
                  to—fail to see our potential. It's especially motivating for students and young people navigating
                  uncertainties in life.
                </p>
              </div>

              <div className="mt-6">
                <h4 className="font-bold mb-3 text-slate-400 text-sm flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
                  My Video Response
                </h4>
                <div className="aspect-w-16 aspect-h-9 bg-slate-800/60 rounded-lg border border-slate-700 flex items-center justify-center mb-4 h-64 overflow-hidden group relative">
                  <video
                    className="w-full h-full object-contain"
                    controls
                    src="/MR1.mp4"
                    poster="/placeholder.svg?height=400&width=600&text=Movie Review 1"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-lg border border-slate-800 backdrop-blur-sm overflow-hidden">
            <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700">
              <div className="flex items-center">
                <span className="text-emerald-400 mr-2 text-lg">$</span>
                <h3 className="text-base font-bold text-slate-100">2) Your Personal Review</h3>
              </div>
            </div>

            <div className="p-4">
              <div className="bg-slate-800/60 rounded-lg p-4 mb-6 border border-slate-700">
                <p className="text-slate-300 text-sm">
                  "The Pursuit of Happyness" is a heart-touching and inspiring true story about Chris Gardner, a man who
                  refuses to give up despite facing homelessness, financial ruin, and personal struggles. The film
                  portrays the harsh realities of life while emphasizing hope, perseverance, and the power of dreams.
                  Will Smith delivers a powerful performance that makes you feel every moment of Chris's struggle and
                  eventual triumph. It's a rollercoaster of emotions, with moments of pain, motivation, and triumph all
                  blended into one masterpiece.
                </p>
              </div>

              <div className="mt-6">
                <h4 className="font-bold mb-3 text-slate-400 text-sm flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
                  My Video Response
                </h4>
                <div className="aspect-w-16 aspect-h-9 bg-slate-800/60 rounded-lg border border-slate-700 flex items-center justify-center mb-4 h-64 overflow-hidden group relative">
                  <video
                    className="w-full h-full object-contain"
                    controls
                    src="/MR2.mp4"
                    poster="/placeholder.svg?height=400&width=600&text=Movie Review 2"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-lg border border-slate-800 backdrop-blur-sm overflow-hidden">
            <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700">
              <div className="flex items-center">
                <span className="text-emerald-400 mr-2 text-lg">$</span>
                <h3 className="text-base font-bold text-slate-100">3) Learning to Take Away from the Movie</h3>
              </div>
            </div>

            <div className="p-4">
              <div className="bg-slate-800/60 rounded-lg p-4 mb-6 border border-slate-700">
                <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm">
                  <li>Resilience pays off – No matter how tough things get, persistence leads to results.</li>
                  <li>Believe in yourself – Self-confidence is key to overcoming rejection and failure.</li>
                  <li>Hard work matters – Success doesn't come overnight; it takes relentless effort.</li>
                  <li>
                    Stay focused on your goal – Even in chaos, keeping your eyes on the goal can change your destiny.
                  </li>
                </ul>
              </div>

              <div className="mt-6">
                <h4 className="font-bold mb-3 text-slate-400 text-sm flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
                  My Video Response
                </h4>
                <div className="aspect-w-16 aspect-h-9 bg-slate-800/60 rounded-lg border border-slate-700 flex items-center justify-center mb-4 h-64 overflow-hidden group relative">
                  <video
                    className="w-full h-full object-contain"
                    controls
                    src="/MR3.mp4"
                    poster="/placeholder.svg?height=400&width=600&text=Movie Review 3"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-lg border border-slate-800 backdrop-blur-sm overflow-hidden">
            <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700">
              <div className="flex items-center">
                <span className="text-emerald-400 mr-2 text-lg">$</span>
                <h3 className="text-base font-bold text-slate-100">Overall Video Review</h3>
              </div>
            </div>

            <div className="p-4">
              <p className="text-slate-300 mb-6 text-sm">
                Please provide a comprehensive video review of the movie, discussing all aspects covered in the
                questions above.
              </p>

              <div className="aspect-w-16 aspect-h-9 bg-slate-800/60 rounded-lg border border-slate-700 flex items-center justify-center h-80 overflow-hidden group relative">
                <video
                  className="w-full h-full object-contain"
                  controls
                  src="/MR4.mp4"
                  poster="/placeholder.svg?height=400&width=600&text=Movie Review Overall"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Presentation Skills Component
function PresentationSkills() {
  return (
    <div className="w-full font-mono">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-slate-100">Presentation Skills</h2>
          <p className="text-slate-400 text-base">
            Video regarding the concept behind my presentation and team's presentation video
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900/50 rounded-lg border border-slate-800 backdrop-blur-sm overflow-hidden">
            <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700">
              <div className="flex items-center">
                <span className="text-emerald-400 mr-2 text-lg">$</span>
                <h3 className="text-base font-bold text-slate-100">Presentation Concept</h3>
              </div>
            </div>

            <div className="p-4">
              <div className="bg-slate-800/60 rounded-lg p-4 mb-6 border border-slate-700">
                <h4 className="font-bold mb-3 text-slate-400 text-sm flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>
                  Understanding Effective Presentations
                </h4>
                <div className="text-slate-300 text-sm">
                  <p className="mb-4">
                    An effective presentation combines clear content structure, engaging delivery, and appropriate
                    visual aids. The key elements include:
                  </p>

                  <ul className="list-disc list-inside space-y-2 mb-4">
                    <li>Clear introduction that establishes the purpose</li>
                    <li>Logical flow of information with smooth transitions</li>
                    <li>Engaging delivery with appropriate pace and tone</li>
                    <li>Visual aids that enhance rather than distract</li>
                    <li>Strong conclusion that reinforces key points</li>
                    <li>Effective handling of questions and discussion</li>
                  </ul>

                  <p>
                    For our team presentation, we focused on creating a cohesive narrative around our topic, ensuring
                    each team member had a clear role and section to present. We practiced timing, transitions between
                    speakers, and prepared for potential questions.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-bold mb-3 text-slate-400 text-sm flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
                  Concept Video
                </h4>
                <div className="aspect-w-16 aspect-h-9 bg-slate-800/60 rounded-lg border border-slate-700 flex items-center justify-center mb-4 h-64 overflow-hidden group relative">
                  <video
                    className="w-full h-full object-contain"
                    controls
                    src="/presentation-concept.mp4"
                    poster="/placeholder.svg?height=400&width=600&text=Presentation Concept Video"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-lg border border-slate-800 backdrop-blur-sm overflow-hidden">
            <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700">
              <div className="flex items-center">
                <span className="text-emerald-400 mr-2 text-lg">$</span>
                <h3 className="text-base font-bold text-slate-100">Team Presentation</h3>
              </div>
            </div>

            <div className="p-4">
              <div className="bg-slate-800/60 rounded-lg p-4 mb-6 border border-slate-700">
                <h4 className="font-bold mb-3 text-slate-400 text-sm flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>
                  Our Team Presentation
                </h4>
                <div className="text-slate-300 text-sm">
                  <p className="mb-4">
                    Our team presentation focused on "Emerging Technologies in Software Development." We covered:
                  </p>

                  <ul className="list-disc list-inside space-y-2 mb-4">
                    <li>Current trends in AI and machine learning</li>
                    <li>The impact of blockchain beyond cryptocurrency</li>
                    <li>Edge computing and its applications</li>
                    <li>The future of web development with WebAssembly</li>
                    <li>Practical applications and case studies</li>
                  </ul>

                  <p>
                    Each team member researched their section thoroughly and prepared visual aids to support their
                    points. We practiced together to ensure smooth transitions and consistent pacing throughout the
                    presentation.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-bold mb-3 text-slate-400 text-sm flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
                  Team Presentation Video
                </h4>
                <div className="aspect-w-16 aspect-h-9 bg-slate-800/60 rounded-lg border border-slate-700 flex items-center justify-center mb-4 h-64 overflow-hidden group relative">
                  <video
                    className="w-full h-full object-contain"
                    controls
                    src="/team-presentation.mp4"
                    poster="/placeholder.svg?height=400&width=600&text=Team Presentation Video"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Group Discussion Component
function GroupDiscussion() {
  return (
    <div className="w-full font-mono">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-slate-100">Group Discussion</h2>
          <p className="text-slate-400 text-base">
            Understanding the Do's and Don'ts of GD, different types, and idea generation techniques
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900/50 rounded-lg border border-slate-800 backdrop-blur-sm overflow-hidden">
            <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700">
              <div className="flex items-center">
                <span className="text-emerald-400 mr-2 text-lg">$</span>
                <h3 className="text-base font-bold text-slate-100">Do's and Don'ts of Group Discussion</h3>
              </div>
            </div>

            <div className="p-4">
              <div className="bg-slate-800/60 rounded-lg p-4 mb-6 border border-slate-700">
                <h4 className="font-bold mb-3 text-slate-400 text-sm flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>
                  Guidelines for Effective Group Discussions
                </h4>
                <div className="text-slate-300 text-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <h5 className="text-emerald-400 mb-3 font-bold">Do's</h5>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Listen actively to others' points</li>
                        <li>Speak clearly and confidently</li>
                        <li>Back arguments with facts and examples</li>
                        <li>Maintain eye contact with the group</li>
                        <li>Initiate the discussion if there's an opportunity</li>
                        <li>Summarize points occasionally</li>
                        <li>Be respectful of differing opinions</li>
                        <li>Stay on topic and be relevant</li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-red-400 mb-3 font-bold">Don'ts</h5>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Interrupt others while they're speaking</li>
                        <li>Dominate the discussion</li>
                        <li>Get aggressive or emotional</li>
                        <li>Use slang or inappropriate language</li>
                        <li>Deviate from the topic</li>
                        <li>Be silent throughout the discussion</li>
                        <li>Make personal attacks</li>
                        <li>Speak without clarity or purpose</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-bold mb-3 text-slate-400 text-sm flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
                  Video Explanation
                </h4>
                <div className="aspect-w-16 aspect-h-9 bg-slate-800/60 rounded-lg border border-slate-700 flex items-center justify-center mb-4 h-64 overflow-hidden group relative">
                  <video
                    className="w-full h-full object-contain"
                    controls
                    src="/gd-dos-donts.mp4"
                    poster="/placeholder.svg?height=400&width=600&text=GD Do's and Don'ts Video"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-lg border border-slate-800 backdrop-blur-sm overflow-hidden">
            <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700">
              <div className="flex items-center">
                <span className="text-emerald-400 mr-2 text-lg">$</span>
                <h3 className="text-base font-bold text-slate-100">Types of Group Discussions</h3>
              </div>
            </div>

            <div className="p-4">
              <div className="bg-slate-800/60 rounded-lg p-4 mb-6 border border-slate-700">
                <h4 className="font-bold mb-3 text-slate-400 text-sm flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>
                  Different Formats of Group Discussions
                </h4>
                <div className="text-slate-300 text-sm">
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-emerald-400 mb-2 font-bold">Topic-based GD</h5>
                      <p>
                        Participants discuss a given topic or theme, sharing their views and perspectives. These can be
                        further divided into:
                      </p>
                      <ul className="list-disc list-inside mt-2 ml-4">
                        <li>Factual topics (based on events, data)</li>
                        <li>Controversial topics (with opposing viewpoints)</li>
                        <li>Abstract topics (conceptual or philosophical)</li>
                        <li>Case study-based discussions</li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-emerald-400 mb-2 font-bold">Role-based GD</h5>
                      <p>
                        Participants are assigned specific roles or perspectives to represent during the discussion,
                        regardless of their personal views.
                      </p>
                    </div>

                    <div>
                      <h5 className="text-emerald-400 mb-2 font-bold">Problem-solving GD</h5>
                      <p>
                        The group is presented with a problem or scenario and must work together to find solutions or
                        strategies.
                      </p>
                    </div>

                    <div>
                      <h5 className="text-emerald-400 mb-2 font-bold">Case-based GD</h5>
                      <p>
                        Participants analyze a detailed case study and discuss various aspects, implications, and
                        potential actions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-bold mb-3 text-slate-400 text-sm flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
                  Video Explanation
                </h4>
                <div className="aspect-w-16 aspect-h-9 bg-slate-800/60 rounded-lg border border-slate-700 flex items-center justify-center mb-4 h-64 overflow-hidden group relative">
                  <video
                    className="w-full h-full object-contain"
                    controls
                    src="/gd-types.mp4"
                    poster="/placeholder.svg?height=400&width=600&text=GD Types Video"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-lg border border-slate-800 backdrop-blur-sm overflow-hidden">
            <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700">
              <div className="flex items-center">
                <span className="text-emerald-400 mr-2 text-lg">$</span>
                <h3 className="text-base font-bold text-slate-100">Idea Generation Techniques</h3>
              </div>
            </div>

            <div className="p-4">
              <div className="bg-slate-800/60 rounded-lg p-4 mb-6 border border-slate-700">
                <h4 className="font-bold mb-3 text-slate-400 text-sm flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>
                  Methods for Generating Ideas in Group Discussions
                </h4>
                <div className="text-slate-300 text-sm">
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-emerald-400 mb-2 font-bold">Brainstorming</h5>
                      <p>
                        A free-flowing session where all ideas are welcomed without criticism, focusing on quantity over
                        quality initially.
                      </p>
                    </div>

                    <div>
                      <h5 className="text-emerald-400 mb-2 font-bold">Mind Mapping</h5>
                      <p>
                        Visual organization of ideas around a central concept, showing relationships and connections
                        between different thoughts.
                      </p>
                    </div>

                    <div>
                      <h5 className="text-emerald-400 mb-2 font-bold">SCAMPER Technique</h5>
                      <p>
                        A structured approach using prompts: Substitute, Combine, Adapt, Modify, Put to other uses,
                        Eliminate, Reverse.
                      </p>
                    </div>

                    <div>
                      <h5 className="text-emerald-400 mb-2 font-bold">Six Thinking Hats</h5>
                      <p>
                        Edward de Bono's method of looking at problems from different perspectives (facts, emotions,
                        caution, benefits, creativity, process).
                      </p>
                    </div>

                    <div>
                      <h5 className="text-emerald-400 mb-2 font-bold">5W1H Method</h5>
                      <p>
                        Analyzing a topic by asking Who, What, When, Where, Why, and How questions to explore all
                        aspects.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-bold mb-3 text-slate-400 text-sm flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
                  Video Explanation
                </h4>
                <div className="aspect-w-16 aspect-h-9 bg-slate-800/60 rounded-lg border border-slate-700 flex items-center justify-center mb-4 h-64 overflow-hidden group relative">
                  <video
                    className="w-full h-full object-contain"
                    controls
                    src="/gd-idea-generation.mp4"
                    poster="/placeholder.svg?height=400&width=600&text=Idea Generation Video"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
