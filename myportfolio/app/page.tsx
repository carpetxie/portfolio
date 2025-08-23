"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState, useEffect } from "react"
import NodeGraph from "@/components/node-graph"
import MiniGraph from "@/components/mini-graph"
import CurrentInterests from "@/components/current-interests"
import HomeNavigation from "@/components/home-navigation"
import UniversalFooter from "@/components/universal-footer"
import { useNavigation } from "@/contexts/navigation-context"
import { experiences, randomItems } from "@/lib/content-data"

export default function Portfolio() {
  const [showNodeGraph, setShowNodeGraph] = useState(true)
  const { showMiniGraph, setCurrentNode } = useNavigation()
  const [displayedText, setDisplayedText] = useState("")
  const [displayedParagraph, setDisplayedParagraph] = useState("")
  const [displayedIntro, setDisplayedIntro] = useState("")
  const fullText = "Jeffrey Xie"
  const paragraphText = "Studying cs/math at Dartmouth College"
  const introText = "Hello! I'm Jeffrey, a software engineer broadly interested in full-stack, ml and graph algorithms. Outside of academics, I lift, hike, play violin, take pictures of cool places and watch horror movies."
  
  useEffect(() => {
    let headingIndex = 0
    let paragraphIndex = 0
    let introIndex = 0

    const headingInterval = setInterval(() => {
      if (headingIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, headingIndex))
        headingIndex++
      }
      
      if (headingIndex > fullText.length) {
        clearInterval(headingInterval)
      }
    }, 200) // Slower typing for heading

    // Start paragraph typing after heading is done
    const paragraphInterval = setInterval(() => {
      if (paragraphIndex <= paragraphText.length) {
        setDisplayedParagraph(paragraphText.slice(0, paragraphIndex))
        paragraphIndex++
      } else {
        clearInterval(paragraphInterval)
      }
    }, 50) // Medium typing speed for paragraph

    // Start intro typing after paragraph is done
    const introInterval = setInterval(() => {
      if (introIndex <= introText.length) {
        setDisplayedIntro(introText.slice(0, introIndex))
        introIndex++
      } else {
        clearInterval(introInterval)
      }
    }, 15) // Fast typing for intro

    return () => {
      clearInterval(headingInterval)
      clearInterval(paragraphInterval)
      clearInterval(introInterval)
    }
  }, [introText])

  const handleMainNodeClick = () => {
    setShowNodeGraph(false)
    showMiniGraph()
    setCurrentNode("home")
  }

  const handleGraphClick = () => {
    setShowNodeGraph(true)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Node Graph Overlay */}
      {showNodeGraph && <NodeGraph onMainNodeClick={handleMainNodeClick} />}

      {/* Mini Graph Component - only show when not on landing page */}
      {!showNodeGraph && <MiniGraph onGraphClick={handleGraphClick} />}

      {/* Main Content - faded when node graph is showing */}
      <div className={`transition-opacity duration-500 ${showNodeGraph ? "opacity-0" : "opacity-100"}`}>
        {/* Header */}
        <HomeNavigation />

        {/* Hero Section */}
        <section className="pt-32 pb-50 px-6 bg-background">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-border">
                <Image
                  src="/jeffrey.jpg"
                  alt="Jeffrey Xie"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
                      <h1 className="font-sans text-6xl md:text-8xl font-bold mb-8 leading-tight">
            {displayedText}
            <span className="animate-pulse">|</span>
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            {displayedParagraph}
            <span className="animate-pulse">|</span>
          </p>
          
          {/* Personal Introduction - Replacing "Learn more about me" link */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.5 }}
              className="max-w-2xl mx-auto"
            >
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {displayedIntro}
                <span className="animate-pulse">|</span>
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              </div>
            </motion.div>
          </div>
          </div>
        </section>

        {/* Current Interests section */}
        <CurrentInterests />



        {/* Experiences Section */}
        <section id="experiences" className="py-24 px-6 bg-background">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-sans text-3xl font-bold mb-16 text-center">Experiences</h2>
            
            {/* Vertical Timeline */}
            <div className="relative">
              {/* Central Timeline Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/60 via-primary to-primary/60 transform -translate-x-1/2" />
              
              {/* Timeline Items */}
              <div className="space-y-12">
                {experiences
                  .sort((a, b) => {
                    // Custom sorting to ensure Early Engineer appears first (most recent)
                    if (a.title === "Early Engineer") return -1
                    if (b.title === "Early Engineer") return 1
                    
                    // Default date sorting for other experiences
                    const getDate = (period: string) => {
                      const startDate = period.split(' - ')[0]
                      const [month, year] = startDate.split(' ')
                      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                      return new Date(parseInt(year), months.indexOf(month))
                    }
                    return getDate(b.period).getTime() - getDate(a.period).getTime()
                  })
                  .map((exp, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className={`relative flex items-center ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                        <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg" />
                      </div>
                      
                      {/* Experience Card */}
                      <div className={`w-5/12 ${i % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                        <motion.div
                          className="group bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                          whileHover={{ scale: 1.02 }}
                        >
                          {/* Period Badge */}
                          <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full border border-primary/20 w-fit mb-3">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            <span className="text-primary font-medium text-xs">{exp.period}</span>
                          </div>
                          
                          {/* Title */}
                          <h3 className="font-sans text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                            {exp.title}
                          </h3>
                          
                          {/* Company */}
                          <p className="text-primary font-semibold text-base mb-3">
                            {exp.company}
                          </p>
                          
                          {/* Description */}
                          <p className="text-muted-foreground leading-relaxed text-sm">
                            {exp.description}
                          </p>
                          
                          {/* Hover Effect Overlay */}
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          </div>
        </section>

        {/* Random Section */}
        <section id="random" className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-sans text-3xl font-bold mb-12 text-center">Random</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {randomItems.map((item, i) => (
                <div key={i} className="bg-card rounded-lg p-6 border border-border">
                  <h3 className="font-sans text-xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <UniversalFooter />
      </div>
    </div>
  )
}
