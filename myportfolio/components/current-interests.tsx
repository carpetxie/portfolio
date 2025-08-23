"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"

interface InterestItem {
  id: string
  title: string
  icon: React.ReactNode
  content: string
  color: string
  layout: 'wide' | 'tall' | 'compact'
}

interface ClassItem {
  id: string
  title: string
  icon: React.ReactNode
  description: string
  color: string
  category: string
  semester: string
}

export default function CurrentInterests() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // Parallax transforms for background elements
  const backgroundY1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const backgroundY2 = useTransform(scrollYProgress, [0, 1], [0, 150])
  const backgroundY3 = useTransform(scrollYProgress, [0, 1], [0, -80])
  const particleY = useTransform(scrollYProgress, [0, 1], [0, -200])
  const particleX = useTransform(scrollYProgress, [0, 1], [0, 100])

  useEffect(() => {
    if (isInView) {
      setIsVisible(true)
    }
  }, [isInView])

  const interestItems: InterestItem[] = [
    {
      id: "location",
      title: "Current Location",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      ),
      color: "from-primary/20 to-primary/10",
      content: "Columbus, Ohio",
      layout: 'wide'
    },
    {
      id: "reading",
      title: "Currently Reading",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM3 19V6h8v13H3zm18 0h-8V6h8v13z"/>
          <path d="M14 9.5h6v1h-6zM14 11.5h6v1h-6zM14 13.5h6v1h-6z"/>
        </svg>
      ),
      color: "from-primary/30 to-primary/15",
      content: "Sakana AI Papers",
      layout: 'tall'
    },
    {
      id: "exploring",
      title: "Exploring",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      color: "from-primary/25 to-primary/12",
      content: "Graph algorithms and full stack",
      layout: 'wide'
    },
    {
      id: "focus",
      title: "Current Focus",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      color: "from-primary/35 to-primary/18",
      content: "Automating my mom's job",
      layout: 'compact'
    }
  ]

  const classItems: ClassItem[] = [
    {
      id: "cs1",
      title: "Human-Centered Machine Learning",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      ),
      description: "Graduate-level course on ML with human factors",
      color: "text-white",
      category: "Computer Science",
      semester: "Graduate Level"
    },
    {
      id: "cs2",
      title: "Object-Oriented Programming",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
        </svg>
      ),
      description: "Software design principles and OOP concepts",
      color: "text-white",
      category: "Computer Science",
      semester: "Recent"
    },
    {
      id: "cs3",
      title: "Algorithms",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
        </svg>
      ),
      description: "Data structures and algorithm design",
      color: "text-white",
      category: "Computer Science",
      semester: "Recent"
    },
    {
      id: "cs4",
      title: "Systems",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
        </svg>
      ),
      description: "Computer systems and architecture",
      color: "text-white",
      category: "Computer Science",
      semester: "Recent"
    },
    {
      id: "math1",
      title: "Linear Algebra",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
        </svg>
      ),
      description: "Vector spaces, matrices, and transformations",
      color: "text-white",
      category: "Mathematics",
      semester: "Recent"
    },
    {
      id: "math2",
      title: "Multi-Variable Calculus",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09v6L12 21l-7-3.82v-6L1 9l11-6z"/>
        </svg>
      ),
      description: "Calculus of multiple variables and vector analysis",
      color: "text-white",
      category: "Mathematics",
      semester: "Recent"
    },
    {
      id: "math3",
      title: "Discrete Math",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
        </svg>
      ),
      description: "Logic, sets, combinatorics, and graph theory",
      color: "text-white",
      category: "Mathematics",
      semester: "Recent"
    },
    {
      id: "math4",
      title: "Probability",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      ),
      description: "Probability theory and statistical concepts",
      color: "text-white",
      category: "Mathematics",
      semester: "Recent"
    },
    {
      id: "math5",
      title: "Machine Learning Math",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      ),
      description: "Mathematical foundations for ML algorithms",
      color: "text-white",
      category: "Mathematics",
      semester: "Recent"
    },
    {
      id: "math6",
      title: "Differential Equations",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09v6L12 21l-7-3.82v-6L1 9l11-6z"/>
        </svg>
      ),
      description: "Ordinary and partial differential equations",
      color: "text-white",
      category: "Mathematics",
      semester: "Recent"
    }
  ]

  return (
    <section ref={sectionRef} className="pt-24 pb-20 px-6 relative overflow-hidden bg-black min-h-screen">
      {/* Enhanced Animated Background Elements with Parallax */}
      <div className="absolute inset-0 opacity-20">
        <motion.div 
          className="absolute top-10 left-10 w-32 h-32 bg-primary/30 rounded-full blur-3xl"
          style={{ y: backgroundY1 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-32 right-20 w-24 h-24 bg-primary/20 rounded-full blur-3xl"
          style={{ y: backgroundY2 }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-1/4 w-20 h-20 bg-primary/10 rounded-full blur-3xl"
          style={{ y: backgroundY3 }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Enhanced floating particles with parallax */}
        <motion.div 
          className="absolute top-1/3 right-1/4 w-2 h-2 bg-primary/40 rounded-full"
          style={{ y: particleY, x: particleX }}
          animate={{
            scale: [0.5, 1.5, 0.5],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-primary/30 rounded-full"
          style={{ y: particleY, x: particleX }}
          animate={{
            scale: [0.8, 1.8, 0.8],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1.5
          }}
        />
        
        {/* Additional flowing particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-primary/30 to-blue-400/30 rounded-full"
            style={{
              left: `${(i * 12.5) % 100}%`,
              top: `${(i * 15) % 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.1, 0.8, 0.1],
              scale: [0.3, 1.2, 0.3],
            }}
            transition={{
              duration: 5 + (i * 0.3),
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Enhanced Grid Pattern Overlay with scroll interaction */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], [0, -50])
        }}
      >
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </motion.div>
      
      {/* Content with Two-Column Layout */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="font-sans text-5xl font-bold mb-6 text-white">
            Current Interests & Classes
          </h2>
          <p className="text-xl text-gray-300">
            What&apos;s capturing my attention right now and what I&apos;ve learned
          </p>
        </motion.div>
        
        {/* Two-Column Layout - Reduced gap for better space utilization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column - Current Interests (Unique & Organic) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center lg:text-left">
              Current Interests
            </h3>
            
            <div className="grid grid-cols-1 gap-5">
              {interestItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1, ease: "easeOut" }}
                  className={`group ${
                    item.layout === 'wide' ? 'col-span-1' : 
                    item.layout === 'tall' ? 'row-span-2' : 'col-span-1'
                  }`}
                >
                  <div className={`
                    relative p-8 rounded-2xl border border-white/10 overflow-hidden bg-white/5 backdrop-blur-sm
                    hover:border-white/20 transition-all duration-500 group-hover:scale-[1.02]
                    shadow-lg hover:shadow-2xl hover:shadow-primary/20
                    ${item.layout === 'wide' ? 'h-28' : item.layout === 'tall' ? 'h-36' : 'h-24'}
                  `}>
                    {/* Enhanced gradient background overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10 group-hover:opacity-20 transition-all duration-500`} />
                    
                    {/* Subtle pattern overlay for texture */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="w-full h-full" style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                        backgroundSize: '20px 20px'
                      }}></div>
                    </div>
                    
                    {/* Content with enhanced effects */}
                    <div className="relative z-10 flex items-center gap-5 h-full">
                      <div className={`
                        p-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30
                        group-hover:scale-110 group-hover:rotate-3 transition-all duration-300
                        shadow-lg group-hover:shadow-xl group-hover:shadow-primary/30
                        text-white
                      `}>
                        {item.icon}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xl font-bold mb-3 text-white group-hover:text-gray-100 transition-colors duration-300 drop-shadow-lg">
                          {item.title}
                        </h4>
                        <p className="text-gray-300 text-base leading-relaxed drop-shadow-md">
                          {item.content}
                        </p>
                      </div>
                    </div>
                    
                    {/* Enhanced glow effects */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-all duration-500 blur-sm`} />
                    
                    {/* Animated border glow */}
                    <motion.div 
                      className={`absolute inset-0 rounded-2xl border-2 border-transparent`}
                      style={{
                        background: `linear-gradient(45deg, transparent, rgba(var(--primary-rgb), 0.3), transparent)`,
                        backgroundSize: '200% 200%'
                      }}
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%']
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut"
                      }}
                    />
                    
                    {/* Subtle inner shadow for depth */}
                    <div className="absolute inset-0 rounded-2xl shadow-inner opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Right Column - Classes (Scrollable & Compact) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center lg:text-left">
              Classes Taken
            </h3>
            
            {/* Scrollable Classes Container - Increased height to show more classes */}
            <div className="relative">
              <div className="max-h-[32rem] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                {classItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.05, ease: "easeOut" }}
                    className="group"
                  >
                    <div className="flex items-start gap-2 p-2 rounded-lg hover:bg-white/10 transition-all duration-300 border border-white/20 hover:border-white/30 hover:shadow-lg hover:shadow-primary/10 bg-white/5">
                      <div className="p-1 rounded-lg bg-primary/20 text-primary group-hover:scale-110 transition-all duration-300 flex-shrink-0 shadow-sm">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold mb-1 text-white group-hover:text-gray-100 transition-colors duration-300 drop-shadow-sm">
                          {item.title}
                        </h4>
                        <p className="text-gray-300 text-xs leading-relaxed mb-1 group-hover:text-gray-200 transition-colors duration-300">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs">
                          <span className={`px-1.5 py-0.5 rounded-full font-medium ${
                            item.category === "Computer Science" 
                              ? "bg-blue-500/20 text-blue-300 border border-blue-400/30" 
                              : item.category === "Mathematics"
                              ? "bg-green-500/20 text-green-300 border border-green-400/30"
                              : "bg-primary/20 text-primary"
                          }`}>{item.category}</span>
                          <span className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">{item.semester}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Scroll hint - Only show if there are many classes */}
              {classItems.length > 6 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="mt-3 text-center"
                >
                  <div className="inline-flex items-center gap-2 text-gray-400 text-sm">
                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"></div>
                    <span>Scroll to see more classes</span>
                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"></div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
