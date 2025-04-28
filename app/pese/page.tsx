"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, FileText, Film, Terminal, Video, Users, Brain } from "lucide-react"
import OptimizedVideo from "@/components/optimized-video"

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

interface TabButtonProps {
  icon: React.ReactNode
  label: string
  isActive: boolean
  onClick: () => void
}

function TabButton({ icon, label, isActive, onClick }: TabButtonProps) {
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
                    Hello! I'm Aditya Ghildiyal, born in Delhi, with most of my schooling completed in Delhi and Bhopal.
                    I am currently pursuing a Bachelor of Technology (B.Tech) in Computer Science and Engineering at
                    Graphic Era Hill University, Dehradun, Uttarakhand.
                  </p>

                  <p className="mb-4">
                    I have a strong passion for web development, algorithms, and building efficient technology
                    solutions. My technical skills include proficiency in C, C++, Python, JavaScript, and React. I enjoy
                    solving complex problems and optimizing code for better performance.
                  </p>

                  <p>
                    Beyond technical skills, I have a deep interest in artificial intelligence research and competitive
                    programming. I am committed to continuous learning and aspire to build a career as a software
                    engineer specializing in full-stack development and artificial intelligence.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-bold mb-3 text-slate-400 text-sm flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
                  Self Introduction Video
                </h4>
                <OptimizedVideo
                  src="/self-introduction.mp4"
                  poster="/placeholder.svg?height=400&width=600&text=Self Introduction Video"
                  title="Self Introduction"
                />
              </div>
            </div>
          </div>

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
                  Brain Activity Summary
                </h4>
                <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-700">
                  <p className="text-slate-300 text-sm">
                    Through various activities and assessments, I've discovered that I have a balanced brain profile
                    with a slight preference for left-brain activities. This explains my aptitude for programming and
                    problem-solving while still maintaining creative abilities for design and innovative thinking.
                  </p>
                  <div className="mt-4 flex justify-center">
                    <div className="bg-slate-900/80 rounded-lg p-4 border border-slate-700 max-w-md">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-emerald-400 font-mono">Left Brain</span>
                        <span className="text-purple-400 font-mono">Right Brain</span>
                      </div>
                      <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-purple-500"
                          style={{ width: "55%" }}
                        ></div>
                      </div>
                      <div className="mt-2 text-xs text-center text-slate-400">55% Left Brain / 45% Right Brain</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Profiling Sheet Component
function ProfilingSheet() {
  const questions = [
    {
      question: "Write your career objective.",
      answer:
        "My career objective is to become a skilled software developer, keep learning new technologies, and work on projects that make a real difference.I want to keep improving my skills, grow with the company I work for, and build a successful career by giving my best to every opportunity I get..",
    },
    {
      question: "Why do you want to be an engineer? Elaborate reasons.",
      answer:
        "I have always been passionate about technology and problem-solving. Engineering provides the perfect platform to apply logic, creativity, and innovation to build solutions that impact society. I enjoy writing code, optimizing algorithms, and developing interactive applications, which makes software engineering the ideal field for me.",
    },
    {
      question: "Write about projects or internship you have done/are doing along with the learning.",
      answer:
        "I have worked on a few interesting projects so far.First, I made a chatbot using Next.js and machine learning. Through this project, I learned how to build conversational interfaces and connect a front-end application with machine learning models. It helped me understand user interactions and how to process data intelligently.Second, I developed an online class platform with an automated attendance system. In this project, I worked on integrating real-time features and automating tasks like marking attendance using QR codes and databases. It gave me hands-on experience in backend development, frontend integration, and managing user flows.Lastly, I built a cross-platform Minesweeper game. This project helped me learn about game logic, user interface design, and making apps that work smoothly across both web and mobile platforms.Each of these projects improved my technical skills and taught me how to think practically while solving real-world problems.",
    },
    {
      question: "What would you consider a significant achievement in your life and why?",
      answer:
        "For me, one of my most significant achievements is overcoming my lack of confidence, shyness, and poor communication skills.Earlier, I used to find it difficult to start conversations or even speak comfortably in group situations.But over time, by consistently pushing myself out of my comfort zone, practicing speaking, and interacting with different people, I have made a lot of improvement.Now, I am able to hold conversations, initiate discussions, and express my thoughts much more clearly and confidently.",
    },
    {
      question: "Write about a failure of yours which you consider to share. What have you learned from it?",
      answer:
        "For a long time, I was indisciplined about my studies, leading to poor grades. This experience taught me the importance of consistency and planning. I started following a structured schedule, set short-term goals, and focused on daily improvements, which helped me regain control over my academics.",
    },
    {
      question: "What are your strengths? Write one or two instances where you have demonstrated your strengths.",
      answer:
        "Adaptability – When I had to quickly switch from one project to another with very little notice, I adjusted my schedule, learned the necessary new skills, and still delivered the work on time. This adaptability allowed me to handle unexpected changes without compromising the quality of my work.\n\nPunctuality – I take punctuality seriously in all my commitments. For instance, when I had an important deadline for a personal coding project, I made sure to allocate enough time daily, tracked my progress, and completed the project ahead of schedule. My punctuality ensured I met all my self-imposed milestones and deadlines without stress.",
    },

    {
      question: "Write about your weaknesses. What are you doing to improve your weaknesses?",
      answer:
        "One of my main weaknesses has been my shyness and lack of confidence, especially in communication. To improve this, I’ve been actively pushing myself out of my comfort zone by engaging in more conversations and practicing public speaking.\n\nI’m also working on my communication skills by participating in group discussions and seeking constructive feedback to enhance how I express myself.",
    },

    {
      question:
        "What is the most difficult moment that you have faced in your life so far? What qualities helped you to overcome the moment?",
      answer:
        "Managing semester exams while juggling multiple personal commitments was a particularly difficult moment. My time management was not as effective as I had hoped, and I struggled to balance my study schedule with other responsibilities. However, my adaptability helped me overcome this challenge. I quickly adjusted my approach, re-prioritized tasks, and found new ways to manage my time better. This adaptability allowed me to adapt to the situation and still perform well in my exams while meeting my other obligations.",
    },

    {
      question: "Apart from academics, what else are you interested in? Make a separate list in terms of extracurricular activities, sports and any other interests.",
      answer:
        "Extracurricular Activities:\n• Web development\n• AI research\n• Competitive programming\n\nSports:\n• Chess\n• Table tennis\n\nOther Interests:\n• Deep-sea creatures and their behaviors",
    },
    {
      question:
        "Write 3 leadership qualities. How many do you possess? Write an instance where you have applied those qualities.",
      answer:
        "1. Decision-making\n2. Problem-solving\n3. Team coordination\n\nI demonstrated problem-solving and team coordination when leading my team in the Attendance System project. I ensured smooth development, assigned tasks efficiently, and handled technical challenges.",
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
        "1. Opportunities for learning and growth.\n2. A collaborative and innovative work environment.\n3. Challenging projects that improve my skills.\n4. Fair compensation and work-life balance.\n5. Exposure to industry best practices and technologies.",
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
        "Write a few lines about your friends. Do you think they help/may help you in achieving your goals? If yes, how? If no, why do you accompany them?",
      answer:
        "My friends are motivated and hardworking, especially in tech-related fields. We often share knowledge, discuss coding problems, and work on projects together, helping each other grow.",
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
                  <div className="aspect-w-16 aspect-h-9 bg-slate-800/60 rounded-lg border border-slate-700 flex items-center justify-center mb-4 h-96 overflow-hidden group relative">
                    <OptimizedVideo
                      src={`/Q-${index + 1}.mp4`}
                      poster={`/placeholder.svg?height=400&width=600&text=Video ${index + 1}`}
                      title={`Question ${index + 1} Response`}
                    />
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

// Movie Review Component
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
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-lg border border-slate-800 backdrop-blur-sm overflow-hidden">
            <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700">
              <div className="flex items-center">
                <span className="text-emerald-400 mr-2 text-lg">$</span>
                <h3 className="text-base font-bold text-slate-100">Overall Review Summary</h3>
              </div>
            </div>

            <div className="p-4">
              <div className="bg-slate-800/60 rounded-lg p-4 mb-6 border border-slate-700">
                <h4 className="font-bold mb-3 text-slate-400 text-sm flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>
                  Key Takeaways
                </h4>
                <p className="text-slate-300 text-sm mb-4">
                  "The Pursuit of Happyness" is a powerful story about resilience, determination, and the unwavering
                  pursuit of one's dreams despite overwhelming obstacles. Will Smith's portrayal of Chris Gardner
                  masterfully captures the emotional journey of a man fighting against homelessness while caring for his
                  son.
                </p>
                <p className="text-slate-300 text-sm">
                  The film teaches us that persistence in the face of adversity, maintaining dignity through hardship,
                  and never giving up on our dreams are essential qualities for success. It reminds us that sometimes
                  the darkest moments come just before breakthrough, and that protecting our dreams from doubt—even our
                  own—is crucial to achieving them.
                </p>
              </div>

              <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-slate-400 text-sm flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>
                    Rating
                  </h4>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill={star <= 5 ? "#10b981" : "none"}
                        stroke="#10b981"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mx-0.5"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-slate-400 italic">
                  "A compelling reminder that with determination and hard work, we can overcome even the most
                  challenging circumstances."
                </p>
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
                    For our team presentation, we focused on creating a cohesive narrative around our product, ensuring
                    each team member had a clear role and section to present. We practiced timing, transitions between
                    speakers, and prepared for potential questions from the investors.
                  </p>
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
                    Our team presentation simulated a pitch to potential investors for our product,{" "}
                    <strong>React CRM</strong> — an innovative Customer Relationship Management tool designed for modern
                    businesses.
                  </p>

                  <ul className="list-disc list-inside space-y-2 mb-4">
                    <li>
                      Our <strong>CEO</strong> introduced the product vision, mission, and the market opportunity.
                    </li>
                    <li>
                      The <strong>Technical Head</strong> explained the core features, technical architecture, and
                      advantages of using React CRM.
                    </li>
                    <li>
                      The <strong>Marketing Head</strong> discussed the go-to-market strategies, target audience, and
                      brand positioning.
                    </li>
                    <li>
                      The <strong>Financial Head</strong> presented the business model, projected revenues, funding
                      requirements, and expected ROI for the investors.
                    </li>
                  </ul>

                  <p>
                    We structured our presentation to mimic a real-world investor pitch, focusing on clarity,
                    confidence, and engagement. Visual aids were carefully designed to support each section, and we
                    rehearsed extensively to ensure seamless transitions and answer any potential questions from the
                    investors.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-bold mb-3 text-slate-400 text-sm flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
                  Team Presentation Video
                </h4>
                <OptimizedVideo
                  src="/team-presentation.mp4"
                  poster="/placeholder.svg?height=400&width=600&text=Team Presentation Video"
                  title="Team Presentation"
                />
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
          {/* Do's and Don'ts Section */}
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
            </div>
          </div>

          {/* Types of Group Discussions Section */}
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
                <div className="text-slate-300 text-sm space-y-4">
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
          </div>

          {/* Idea Generation Techniques Section */}
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
                <div className="text-slate-300 text-sm space-y-4">
                  <div>
                    <h5 className="text-emerald-400 mb-2 font-bold">5W1H Method</h5>
                    <p>
                      Analyzing a topic by asking <strong>Who, What, When, Where, Why,</strong> and <strong>How</strong>{" "}
                      questions to explore all aspects deeply and systematically.
                    </p>
                  </div>
                  <div>
                    <h5 className="text-emerald-400 mb-2 font-bold">SPEEL Technique</h5>
                    <p>
                      A method that encourages idea generation by considering:{" "}
                      <strong>Social, Political, Economic, Environmental,</strong> and <strong>Legal</strong> dimensions
                      of a topic.
                    </p>
                  </div>
                </div>
              </div>

              {/* Video Section */}
              <div className="mt-6">
                <h4 className="font-bold mb-3 text-slate-400 text-sm flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
                  Group Discussion Video
                </h4>
                <OptimizedVideo
                  src="/gd-idea-generation.mp4"
                  poster="/placeholder.svg?height=400&width=600&text=Group Discussion Video"
                  title="Group Discussion"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
