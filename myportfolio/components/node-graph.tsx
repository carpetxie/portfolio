"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { blogPosts, photoItems, experiences, randomItems } from "@/lib/content-data"

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

  // Generate nodes dynamically based on content data
  const generateNodes = (): Node[] => {
    const nodes: Node[] = [
      // Main center node
      { id: "home", label: "Home", x: 400, y: 300, type: "main", clickable: true },

      // Category nodes
      { id: "blog", label: "Blog", x: 200, y: 150, type: "category", parentId: "home" },
      { id: "photography", label: "Photography", x: 600, y: 150, type: "category", parentId: "home" },
      { id: "experiences", label: "Experiences", x: 200, y: 450, type: "category", parentId: "home" },
      { id: "random", label: "Random", x: 600, y: 450, type: "category", parentId: "home" },
    ]

    blogPosts.forEach((post, index) => {
      const angle = (index / blogPosts.length) * Math.PI * 2
      const radius = 80
      nodes.push({
        id: `blog-${post.id}`,
        label: post.title.length > 20 ? post.title.substring(0, 20) + "..." : post.title,
        x: Math.round((200 + Math.cos(angle - Math.PI / 2) * radius) * 100) / 100,
        y: Math.round((150 + Math.sin(angle - Math.PI / 2) * radius) * 100) / 100,
        type: "content",
        parentId: "blog",
        href: `/blog/${post.slug}`,
        contentType: "blog",
      })
    })

    photoItems.slice(0, 12).forEach((photo, index) => {
      const angle = (index / 12) * Math.PI * 2
      const radius = 100
      nodes.push({
        id: `photo-${photo.id}`,
        label: photo.title.length > 15 ? photo.title.substring(0, 15) + "..." : photo.title,
        x: Math.round((600 + Math.cos(angle - Math.PI / 2) * radius) * 100) / 100,
        y: Math.round((150 + Math.sin(angle - Math.PI / 2) * radius) * 100) / 100,
        type: "content",
        parentId: "photography",
        contentType: "photo",
      })
    })

    experiences.forEach((exp, index) => {
      const positions = [
        { x: 120, y: 380 },
        { x: 160, y: 450 },
        { x: 240, y: 500 },
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
        { x: 680, y: 380 },
        { x: 720, y: 420 },
        { x: 640, y: 480 },
        { x: 580, y: 500 },
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
    if (node.type === "main") return 20
    if (node.type === "category") return 12
    return 6
  }

  const handleNodeClick = (node: Node) => {
    if (node.id === "home" && node.clickable) {
      onMainNodeClick()
    }
  }



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/20 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        <svg
          ref={svgRef}
          width="800"
          height="600"
          viewBox="0 0 800 600"
          className="border border-border/20 rounded-lg bg-white/30"
        >
          <defs>
            <filter id="mainNodeGlow">
              <feGaussianBlur stdDeviation="8" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

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
                stroke="#6b7280"
                strokeWidth="1"
                opacity={fromNode.id === "home" || toNode.id === "home" ? "0.8" : "0.4"}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: index * 0.02 }}
              />
            )
          })}

          {/* Render nodes */}
          {nodes.map((node, index) => (
            <g key={node.id}>
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={getNodeSize(node)}
                fill={node.type === "main" ? "#a78bfa" : "#c4b5fd"}
                stroke="none"
                filter={node.type === "main" ? "url(#mainNodeGlow)" : "none"}
                opacity={node.type === "main" ? 1 : 0.3}
                className={node.clickable ? "cursor-pointer" : "cursor-default"}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: node.type === "main" ? 1 : 0.3,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.5 + index * 0.02,
                }}
                whileHover={
                  node.clickable
                    ? {
                        scale: 1.2,
                        filter: "url(#mainNodeGlow) brightness(1.2)",
                      }
                    : {}
                }
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => handleNodeClick(node)}
              />

              {node.type === "main" && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={getNodeSize(node) + 6}
                  fill="none"
                  stroke="#a78bfa"
                  strokeWidth="1"
                  opacity="0.5"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
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

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="absolute -bottom-16 left-0 right-0 text-center font-sans"
        >
          <motion.p
            className="text-gray-700 text-sm"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            Click the <span className="text-purple-600 font-medium">Home</span> node to enter
          </motion.p>
          <p className="text-gray-500 text-xs mt-1">
            {blogPosts.length} posts • {photoItems.length} photos • {experiences.length} experiences
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
