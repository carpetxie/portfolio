"use client"

import { motion } from "framer-motion"
import { useNavigation } from "@/contexts/navigation-context"
import { photoItems } from "@/lib/content-data"
import { useState, useEffect } from "react"
import PathAnimation from "./path-animation"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  slug: string
}

interface MiniNode {
  id: string
  x: number
  y: number
  type: "main" | "category" | "content"
  parentId?: string
}

export default function MiniGraph() {
  const { state } = useNavigation()
  const [showPathAnimation, setShowPathAnimation] = useState(false)
  const [animationPath, setAnimationPath] = useState<{ from: string; to: string } | null>(null)
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    // Fetch blog posts from API
    fetch('/api/blog-posts')
      .then(res => res.json())
      .then(data => setBlogPosts(data))
      .catch(err => console.error('Failed to fetch blog posts:', err))
  }, [])

  useEffect(() => {
    if (state.previousNode && state.currentNode && state.previousNode !== state.currentNode) {
      setAnimationPath({ from: state.previousNode, to: state.currentNode })
      setShowPathAnimation(true)
    }
  }, [state.currentNode, state.previousNode])

  const handleAnimationComplete = () => {
    setShowPathAnimation(false)
    setAnimationPath(null)
  }

  const generateMiniNodes = (): MiniNode[] => {
    const nodes: MiniNode[] = [
      { id: "home", x: 60, y: 40, type: "main" },
      { id: "blog", x: 30, y: 20, type: "category", parentId: "home" },
      { id: "photography", x: 90, y: 20, type: "category", parentId: "home" },
      { id: "experiences", x: 30, y: 60, type: "category", parentId: "home" },
      { id: "random", x: 90, y: 60, type: "category", parentId: "home" },
    ]

    // Add sub-nodes for blog
    blogPosts.slice(0, 3).forEach((post, index) => {
      const angle = (index / 3) * Math.PI * 2
      const radius = 12
      nodes.push({
        id: `blog-${post.id}`,
        x: Math.round((30 + Math.cos(angle - Math.PI / 2) * radius) * 100) / 100,
        y: Math.round((20 + Math.sin(angle - Math.PI / 2) * radius) * 100) / 100,
        type: "content",
        parentId: "blog",
      })
    })

    // Add sub-nodes for photography
    photoItems.slice(0, 4).forEach((photo, index) => {
      const angle = (index / 4) * Math.PI * 2
      const radius = 12
      nodes.push({
        id: `photo-${photo.id}`,
        x: Math.round((90 + Math.cos(angle - Math.PI / 2) * radius) * 100) / 100,
        y: Math.round((20 + Math.sin(angle - Math.PI / 2) * radius) * 100) / 100,
        type: "content",
        parentId: "photography",
      })
    })

    return nodes
  }

  const miniNodes = generateMiniNodes()

  const getNodeColor = (nodeId: string) => {
    if (nodeId === state.currentNode) return "#3b82f6" // Blue for current
    if (nodeId === "home") return "#6b7280" // Gray for home
    return "#9ca3af" // Light gray for others
  }

  const getNodeSize = (nodeId: string, type: string) => {
    if (nodeId === state.currentNode) return type === "content" ? 3 : 7
    if (nodeId === "home") return 6
    if (type === "content") return 2
    return 3
  }
  
  // Safety check to ensure all nodes have valid sizes
  const safeGetNodeSize = (nodeId: string, type: string) => {
    const size = getNodeSize(nodeId, type)
    return size || 2 // Default to 2 if undefined
  }

  const generateConnections = () => {
    const connections: Array<{
      from: string
      to: string
      fromNode: MiniNode
      toNode: MiniNode
    }> = []

    // Main to category connections
    const categoryNodes = miniNodes.filter((node) => node.type === "category")
    categoryNodes.forEach((node) => {
      connections.push({ from: "home", to: node.id, fromNode: miniNodes.find((n) => n.id === "home")!, toNode: node })
    })

    // Category to content connections
    const contentNodes = miniNodes.filter((node) => node.type === "content")
    contentNodes.forEach((node) => {
      if (node.parentId) {
        const parentNode = miniNodes.find((n) => n.id === node.parentId)
        if (parentNode) {
          connections.push({ from: node.parentId, to: node.id, fromNode: parentNode, toNode: node })
        }
      }
    })

    return connections
  }

  const connections = generateConnections()

  if (!state.showMiniGraph) return null

  return (
    <>
      {/* Path Animation Overlay */}
      {animationPath && (
        <PathAnimation
          fromNode={animationPath.from}
          toNode={animationPath.to}
          onComplete={handleAnimationComplete}
          isVisible={showPathAnimation}
          nodePositions={miniNodes.reduce(
            (acc, node) => {
              acc[node.id] = { x: node.x, y: node.y }
              return acc
            },
            {} as Record<string, { x: number; y: number }>,
          )}
        />
      )}

      {/* Mini Graph */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="fixed top-20 left-6 z-40 w-32 h-28 bg-transparent border-none shadow-none"
      >
        <svg width="100%" height="100%" viewBox="0 0 120 80" className="opacity-100">
          {connections.map((connection) => (
            <line
              key={`connection-${connection.from}-${connection.to}`}
              x1={connection.fromNode.x}
              y1={connection.fromNode.y}
              x2={connection.toNode.x}
              y2={connection.toNode.y}
              stroke="#6b7280"
              strokeWidth="2"
              opacity="1"
            />
          ))}

          <defs>
            <radialGradient id="nodeGradient" cx="40%" cy="40%">
              <stop offset="0%" stopColor="#f9fafb" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#e5e7eb" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#9ca3af" stopOpacity="0.2" />
            </radialGradient>
            <filter id="nodeShadow">
              <feDropShadow dx="0.5" dy="1" stdDeviation="0.5" floodOpacity="0.1" />
            </filter>
          </defs>

          {/* Nodes */}
          {miniNodes.map((node) => (
            <g key={node.id}>
              <circle
                cx={node.x + 0.3}
                cy={node.y + 0.5}
                r={safeGetNodeSize(node.id, node.type)}
                fill="#000000"
                opacity="0.06"
              />
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={safeGetNodeSize(node.id, node.type)}
                fill={`url(#nodeGradient)`}
                stroke={getNodeColor(node.id)}
                strokeWidth={node.id === state.currentNode ? 2 : 1}
                filter="url(#nodeShadow)"
                animate={{
                  r: safeGetNodeSize(node.id, node.type),
                  stroke: getNodeColor(node.id),
                }}
                transition={{ duration: 0.3 }}
              />
              <circle
                cx={node.x - safeGetNodeSize(node.id, node.type) * 0.2}
                cy={node.y - safeGetNodeSize(node.id, node.type) * 0.2}
                r={safeGetNodeSize(node.id, node.type) * 0.15}
                fill="#ffffff"
                opacity="0.3"
              />
            </g>
          ))}
        </svg>

        {/* Page indicator text */}
        <div className="absolute -bottom-1 left-0 right-0 text-center">
          <span className="text-[10px] text-muted-foreground bg-background/90 px-1 py-0.5 rounded text-center block font-sans">
            {state.currentNode === "home" && "Home"}
            {state.currentNode === "blog" && "Blog"}
            {state.currentNode === "photography" && "Photos"}
            {state.currentNode === "experiences" && "Experience"}
            {state.currentNode === "random" && "Random"}
            {state.currentNode.includes("blog-") && "Post"}
            {state.currentNode.includes("photo-") && "Photo"}
          </span>
        </div>
      </motion.div>
    </>
  )
}
