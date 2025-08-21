"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"


interface PathAnimationProps {
  fromNode: string
  toNode: string
  onComplete?: () => void
  isVisible: boolean
  nodePositions?: Record<string, { x: number; y: number }>
}

export default function PathAnimation({ fromNode, toNode, onComplete, isVisible, nodePositions }: PathAnimationProps) {
  const [path, setPath] = useState<string[]>([])
  const [animationKey, setAnimationKey] = useState(0)

  useEffect(() => {
    if (fromNode && toNode && fromNode !== toNode) {
      // Simple path logic without dijkstra
      const path = [fromNode, toNode]
      setPath(path)
      setAnimationKey((prev) => prev + 1)
    }
  }, [fromNode, toNode])

  if (!isVisible || path.length < 2) return null

  const getNodePosition = (nodeId: string) => {
    if (nodePositions && nodePositions[nodeId]) {
      return nodePositions[nodeId]
    }
    // Default position for unknown nodes
    return { x: 60, y: 40 }
  }

  return (
    <div className="fixed top-6 left-6 z-50 w-28 h-20 pointer-events-none">
      <svg width="100%" height="100%" viewBox="0 0 120 80" className="overflow-visible">
        {path.slice(0, -1).map((nodeId, index) => {
          const currentPos = getNodePosition(nodeId)
          const nextPos = getNodePosition(path[index + 1])

          return (
            <g key={`${animationKey}-${nodeId}-${path[index + 1]}`}>
              {/* Static path line */}
              <line
                x1={currentPos.x}
                y1={currentPos.y}
                x2={nextPos.x}
                y2={nextPos.y}
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                opacity="0.5"
              />

              {/* Animated path line */}
              <motion.line
                x1={currentPos.x}
                y1={currentPos.y}
                x2={nextPos.x}
                y2={nextPos.y}
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                strokeDasharray="6 3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  ease: "easeInOut",
                }}
                onAnimationComplete={() => {
                  if (index === path.length - 2 && onComplete) {
                    setTimeout(onComplete, 100)
                  }
                }}
              />

              {/* Animated dot traveling along path */}
              <motion.circle
                r="2"
                fill="hsl(var(--primary))"
                initial={{
                  cx: currentPos.x,
                  cy: currentPos.y,
                  opacity: 0,
                }}
                animate={{
                  cx: nextPos.x,
                  cy: nextPos.y,
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: "easeInOut",
                }}
              />
            </g>
          )
        })}

        {path.map((nodeId, index) => {
          const pos = getNodePosition(nodeId)

          return (
            <motion.circle
              key={`${animationKey}-node-${nodeId}`}
              cx={pos.x}
              cy={pos.y}
              r={nodeId === "home" ? 5 : 3}
              fill="hsl(var(--primary))"
              stroke="hsl(var(--background))"
              strokeWidth="1"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.6, 1, 0.8],
              }}
              transition={{
                duration: 0.2,
                delay: index * 0.05,
                ease: "easeOut",
              }}
            />
          )
        })}
      </svg>
    </div>
  )
}
