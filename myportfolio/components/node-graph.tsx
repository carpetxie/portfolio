"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { experiences, randomItems } from "@/lib/content-data"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  slug: string
}

interface PhotoItem {
  id: string
  title: string
  category: string
  description?: string
  filename: string
  path: string
}

interface Node {
  id: string
  label: string
  x: number
  y: number
  type: "main" | "category" | "content"
  parentId?: string
  clickable?: boolean
  href?: string
  contentType?: string
}

interface Connection {
  from: string
  to: string
}

export default function NodeGraph({ onMainNodeClick }: { onMainNodeClick: () => void }) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [photoItems, setPhotoItems] = useState<PhotoItem[]>([])

  useEffect(() => {
    // Fetch blog posts from API
    fetch('/api/blog-posts')
      .then(res => res.json())
      .then(data => setBlogPosts(data))
      .catch(err => console.error('Failed to fetch blog posts:', err))

    // Fetch photo items from API
    fetch('/api/photos')
      .then(res => res.json())
      .then(data => setPhotoItems(data))
      .catch(err => console.error('Failed to fetch photo items:', err))
  }, [])

  // Generate nodes dynamically based on content data
  const generateNodes = (): Node[] => {
    const nodes: Node[] = [
      // Main center node
      { id: "home", label: "Home", x: 600, y: 440, type: "main", clickable: true },

      // Category nodes
      { id: "blog", label: "Blog", x: 300, y: 225, type: "category", parentId: "home", clickable: true },
      { id: "photography", label: "Photography", x: 900, y: 225, type: "category", parentId: "home", clickable: true },
      { id: "experiences", label: "Experiences", x: 300, y: 675, type: "category", parentId: "home", clickable: true },
      { id: "random", label: "Random", x: 900, y: 675, type: "category", parentId: "home", clickable: true },
    ]

    blogPosts.forEach((post, index) => {
      const angle = (index / blogPosts.length) * Math.PI * 2
      const radius = 120
      nodes.push({
        id: `blog-${post.id}`,
        label: post.title.length > 20 ? post.title.substring(0, 20) + "..." : post.title,
        x: Math.round((300 + Math.cos(angle - Math.PI / 2) * radius) * 100) / 100,
        y: Math.round((225 + Math.sin(angle - Math.PI / 2) * radius) * 100) / 100,
        type: "content",
        parentId: "blog",
        href: `/blog/${post.slug}`,
        contentType: "blog",
      })
    })

    if (photoItems.length > 0) {
      photoItems.slice(0, 12).forEach((photo, index) => {
        const angle = (index / 12) * Math.PI * 2
        const radius = 150
        nodes.push({
          id: `photo-${photo.id}`,
          label: photo.title.length > 15 ? photo.title.substring(0, 15) + "..." : photo.title,
          x: Math.round((900 + Math.cos(angle - Math.PI / 2) * radius) * 100) / 100,
          y: Math.round((225 + Math.sin(angle - Math.PI / 2) * radius) * 100) / 100,
          type: "content",
          parentId: "photography",
          contentType: "photo",
        })
      })
    }

    experiences.forEach((exp, index) => {
      const positions = [
        { x: 180, y: 570 },
        { x: 240, y: 675 },
        { x: 360, y: 750 },
      ]
      const pos = positions[index] || positions[0]
      nodes.push({
        id: `exp-${index}`,
        label: exp.title,
        x: pos.x,
        y: pos.y,
        type: "content",
        parentId: "experiences",
        contentType: "experience",
      })
    })

    randomItems.forEach((item, index) => {
      const positions = [
        { x: 1020, y: 570 },
        { x: 1080, y: 630 },
        { x: 960, y: 720 },
        { x: 870, y: 750 },
      ]
      const pos = positions[index] || positions[0]
      nodes.push({
        id: `random-${index}`,
        label: item.title,
        x: pos.x,
        y: pos.y,
        type: "content",
        parentId: "random",
        contentType: "random",
      })
    })

    return nodes
  }

  const nodes = generateNodes()

  // Generate connections dynamically
  const generateConnections = (): Connection[] => {
    const connections: Connection[] = [
      // Main to categories
      { from: "home", to: "blog" },
      { from: "home", to: "photography" },
      { from: "home", to: "experiences" },
      { from: "home", to: "random" },
    ]

    nodes.forEach((node) => {
      if (node.type === "content" && node.parentId) {
        connections.push({ from: node.parentId, to: node.id })
      }
    })

    return connections
  }

  const connections = generateConnections()

  const getNodeSize = (node: Node) => {
    if (node.type === "main") return 30
    if (node.type === "category") return 18
    return 9
  }

  const handleNodeClick = (node: Node) => {
    if (node.id === "home" && node.clickable) {
      onMainNodeClick()
    } else if (node.type === "category") {
      // Handle secondary node clicks
      if (node.id === "blog") {
        window.location.href = "/blog"
      } else if (node.id === "photography") {
        window.location.href = "/photography"
      } else if (node.id === "experiences") {
        // Scroll to experiences section on the same page
        const element = document.getElementById("experiences")
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      } else if (node.id === "random") {
        // Scroll to random section on the same page
        const element = document.getElementById("random")
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full h-full"
      >
        <svg
          ref={svgRef}
          width="100%"
          height="100vh"
          viewBox="0 0 1200 900"
          preserveAspectRatio="xMidYMid meet"
          className="border border-border/20 rounded-lg bg-white/30"
          style={{
            background: `
              radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.03) 0%, rgba(255, 255, 255, 0.8) 70%),
              linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 20px 20px, 20px 20px'
          }}
        >
          <defs>
            {/* Enhanced glow filters */}
            <filter id="mainNodeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur1" />
              <feGaussianBlur stdDeviation="6" result="coloredBlur2" />
              <feGaussianBlur stdDeviation="12" result="coloredBlur3" />
              <feMerge>
                <feMergeNode in="coloredBlur1" />
                <feMergeNode in="coloredBlur2" />
                <feMergeNode in="coloredBlur3" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            <filter id="categoryNodeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Gradient definitions */}
            <radialGradient id="homeNodeGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="1" />
              <stop offset="70%" stopColor="#8b5cf6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.6" />
            </radialGradient>
            
            <radialGradient id="homeGlowGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Subtle floating background dots */}
          {Array.from({ length: 8 }).map((_, i) => {
            const x = 100 + (i * 140) % 1000
            const y = 80 + (i * 120) % 700
            const size = 1 + (i % 3)
            const opacity = 0.03 + (i % 2) * 0.02
            
            return (
              <motion.circle
                key={`bg-dot-${i}`}
                cx={x}
                cy={y}
                r={size}
                fill="rgba(139, 92, 246, 0.1)"
                opacity={opacity}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [opacity * 0.5, opacity, opacity * 0.5],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />
            )
          })}

          {connections.map((connection, index) => {
            const fromNode = nodes.find((n) => n.id === connection.from)
            const toNode = nodes.find((n) => n.id === connection.to)
            if (!fromNode || !toNode) return null

            return (
              <motion.line
                key={`${connection.from}-${connection.to}`}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={fromNode.id === "home" || toNode.id === "home" ? "#8b5cf6" : "#6b7280"}
                strokeWidth={fromNode.id === "home" || toNode.id === "home" ? "3" : "2"}
                opacity={fromNode.id === "home" || toNode.id === "home" ? "0.9" : "0.4"}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: fromNode.id === "home" || toNode.id === "home" ? 0.9 : 0.4 }}
                transition={{ 
                  duration: 1.5, 
                  delay: 0.8 + index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{
                  strokeWidth: fromNode.id === "home" || toNode.id === "home" ? 4 : 3,
                  opacity: 1,
                  transition: { duration: 0.2 }
                }}
              />
            )
          })}

          {/* Render nodes */}
          {nodes.map((node, index) => (
            <g key={node.id}>
              {/* Enhanced main node with multiple glow layers */}
              {node.type === "main" && (
                <>
                  {/* Outer glow ring */}
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={getNodeSize(node) + 20}
                    fill="url(#homeGlowGradient)"
                    opacity="0.6"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.6, 0.8, 0.6],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                  
                  {/* Middle glow ring */}
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={getNodeSize(node) + 12}
                    fill="url(#homeGlowGradient)"
                    opacity="0.4"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                  />
                  
                  {/* Inner glow ring */}
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={getNodeSize(node) + 6}
                    fill="none"
                    stroke="#a78bfa"
                    strokeWidth="2"
                    opacity="0.7"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.7, 0.9, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  />
                </>
              )}

              {/* Main node circle */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={getNodeSize(node)}
                fill={node.type === "main" ? "url(#homeNodeGradient)" : "#c4b5fd"}
                stroke={node.type === "main" ? "#8b5cf6" : "none"}
                strokeWidth={node.type === "main" ? "2" : "0"}
                filter={node.type === "main" ? "url(#mainNodeGlow)" : 
                       node.type === "category" ? "url(#categoryNodeGlow)" : "none"}
                opacity={node.type === "main" ? 1 : 0.3}
                className={node.clickable ? "cursor-pointer" : "cursor-default"}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: node.type === "main" ? 1 : 0.3,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.3 + index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{
                  scale: node.type === "main" ? 1.4 : 1.3,
                  filter: node.type === "main" ? "url(#mainNodeGlow) brightness(1.5)" : 
                          "url(#categoryNodeGlow) brightness(1.3)",
                  transition: { duration: 0.2 }
                }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => handleNodeClick(node)}
              />

              {/* Click indicator for home node */}
              {node.type === "main" && (
                <motion.g>
                  {/* Pulsing dots around the home node */}
                  {Array.from({ length: 8 }).map((_, i) => {
                    const angle = (i / 8) * Math.PI * 2
                    const radius = getNodeSize(node) + 25
                    const dotX = node.x + Math.cos(angle) * radius
                    const dotY = node.y + Math.sin(angle) * radius
                    
                    return (
                      <motion.circle
                        key={i}
                        cx={dotX}
                        cy={dotY}
                        r="2"
                        fill="#a78bfa"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.25,
                          ease: "easeInOut",
                        }}
                      />
                    )
                  })}
                  
                  {/* "Click me" text indicator */}
                  <motion.text
                    x={node.x}
                    y={node.y + getNodeSize(node) + 15}
                    textAnchor="middle"
                    className="fill-purple-600 text-xs font-bold pointer-events-none"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: [0.7, 1, 0.7],
                      y: [10, 0, 10],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    CLICK ME!
                  </motion.text>
                </motion.g>
              )}

              {/* Node labels */}
              {(node.type === "main" || node.type === "category" || hoveredNode === node.id) && (
                <motion.text
                  x={node.x}
                  y={node.y - getNodeSize(node) - 8}
                  textAnchor="middle"
                  className="fill-gray-700 text-xs font-medium pointer-events-none font-sans"
                  opacity={node.type === "main" ? 1 : 0.7}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: node.type === "main" ? 1 : 0.7 }}
                  transition={{ duration: 0.3 }}
                >
                  {node.label}
                </motion.text>
              )}
            </g>
          ))}
        </svg>

        {/* Enhanced instructions - positioned to stay on screen */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="absolute bottom-10 left-0 right-0 text-center font-sans"
        >
          <motion.div
            className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-purple-200"
            animate={{ 
              boxShadow: [
                "0 4px 6px -1px rgba(139, 92, 246, 0.1)",
                "0 10px 15px -3px rgba(139, 92, 246, 0.2)",
                "0 4px 6px -1px rgba(139, 92, 246, 0.1)"
              ]
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <motion.div
              className="w-3 h-3 bg-purple-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <motion.p
              className="text-gray-700 text-sm font-medium"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              Click the <span className="text-purple-600 font-bold">Home</span> node to enter
            </motion.p>
          </motion.div>
          <p className="text-gray-500 text-xs mt-3">
            {blogPosts.length} posts • {photoItems.length || 0} photos • {experiences.length} experiences
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
