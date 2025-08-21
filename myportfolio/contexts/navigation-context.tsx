"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { usePathname } from "next/navigation"

export type NodeId = "home" | "blog" | "photography" | "experiences" | "random" | string

export interface NavigationState {
  currentNode: NodeId
  previousNode: NodeId | null
  showMiniGraph: boolean
  navigationHistory: NodeId[]
}

interface NavigationContextType {
  state: NavigationState
  setCurrentNode: (nodeId: NodeId) => void
  showMiniGraph: () => void
  hideMiniGraph: () => void
  getNodePath: (fromNode: NodeId, toNode: NodeId) => NodeId[]
  navigateToSection: (sectionId: string) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [state, setState] = useState<NavigationState>({
    currentNode: "home",
    previousNode: null,
    showMiniGraph: false,
    navigationHistory: ["home"],
  })

  const getNodeFromPath = (path: string): NodeId => {
    if (path === "/") return "home"
    if (path === "/blog") return "blog"
    if (path === "/photography") return "photography"
    if (path.startsWith("/blog/")) return path.replace("/blog/", "blog-")
    if (path.startsWith("/photography/")) return path.replace("/photography/", "photo-")
    return "home"
  }

  useEffect(() => {
    const newNode = getNodeFromPath(pathname)
    setState((prev) => {
      if (newNode !== prev.currentNode) {
        return {
          ...prev,
          previousNode: prev.currentNode,
          currentNode: newNode,
          navigationHistory: [...prev.navigationHistory, newNode],
        }
      }
      return prev
    })
  }, [pathname])

  const setCurrentNode = useCallback((nodeId: NodeId) => {
    setState((prev) => ({
      ...prev,
      previousNode: prev.currentNode,
      currentNode: nodeId,
      navigationHistory: [...prev.navigationHistory, nodeId],
    }))
  }, [])

  const showMiniGraph = useCallback(() => {
    setState((prev) => ({ ...prev, showMiniGraph: true }))
  }, [])

  const hideMiniGraph = useCallback(() => {
    setState((prev) => ({ ...prev, showMiniGraph: false }))
  }, [])

  const getNodePath = useCallback((fromNode: NodeId, toNode: NodeId): NodeId[] => {
    if (fromNode === toNode) return [fromNode]

    // Simple path logic without dijkstra
    const categoryNodes = ["blog", "photography", "experiences", "random"]
    const isFromCategory = categoryNodes.includes(fromNode)
    const isToCategory = categoryNodes.includes(toNode)

    if (isFromCategory && isToCategory) {
      return [fromNode, "home", toNode]
    }
    return [fromNode, "home", toNode]
  }, [])

  const navigateToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      // Update navigation state to reflect the section
      const sectionNode = sectionId as NodeId
      setState((prev) => ({
        ...prev,
        previousNode: prev.currentNode,
        currentNode: sectionNode,
        navigationHistory: [...prev.navigationHistory, sectionNode],
      }))
    }
  }, [])

  return (
    <NavigationContext.Provider
      value={{
        state,
        setCurrentNode,
        showMiniGraph,
        hideMiniGraph,
        getNodePath,
        navigateToSection,
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider")
  }
  return context
}
