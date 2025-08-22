"use client"

import { MapPin, BookOpen, Compass, Target } from "lucide-react"
import { useEffect, useState } from "react"

interface InterestCard {
  id: string
  title: string
  icon: React.ReactNode
  borderColor: string
  content: React.ReactNode
  activityLevel: 'high' | 'medium' | 'low'
  startedDate?: string
}

export default function CurrentInterests() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const interestCards: InterestCard[] = [
    {
      id: "location",
      title: "Current Location",
      icon: <MapPin className="w-6 h-6" />,
      borderColor: "border-primary",
      activityLevel: 'medium',
      startedDate: '2 weeks ago',
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium">Columbus, Ohio</span>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-200">Just chilling at home</span>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-300">
            <span>Started 2 weeks ago</span>
            <div className="flex items-center gap-1">
              <span>Activity:</span>
              <div className="w-2 h-2 bg-primary/60 rounded-full"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "reading",
      title: "Currently Reading",
      icon: <BookOpen className="w-6 h-6" />,
      borderColor: "border-primary",
      activityLevel: 'low',
      startedDate: '1 week ago',
      content: (
        <div className="space-y-3">
          <div className="font-medium">Random blogs</div>
          <div className="text-sm text-gray-200">Just browsing around the internet</div>
          <div className="flex items-center justify-between text-xs text-gray-300">
            <span>Started 1 week ago</span>
            <div className="flex items-center gap-1">
              <span>Activity:</span>
              <div className="w-2 h-2 bg-primary/40 rounded-full"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "exploring",
      title: "Exploring",
      icon: <Compass className="w-6 h-6" />,
      borderColor: "border-primary",
      activityLevel: 'high',
      startedDate: '3 weeks ago',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-2 bg-white/10 rounded-lg border border-white/20 hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:bg-white/15 group/sub">
              <div className="text-lg mb-1 group-hover/sub:rotate-6 transition-transform duration-300">🗄️</div>
              <div className="text-xs text-gray-200">Databases</div>
              <div className="w-1 h-1 bg-primary/60 rounded-full mx-auto mt-1 opacity-0 group-hover/sub:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="text-center p-2 bg-white/10 rounded-lg border border-white/20 hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:bg-white/15 group/sub">
              <div className="text-lg mb-1 group-hover/sub:rotate-6 transition-transform duration-300">📊</div>
              <div className="text-xs text-gray-200">Graph Theory</div>
              <div className="w-1 h-1 bg-primary/60 rounded-full mx-auto mt-1 opacity-0 group-hover/sub:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="text-center p-2 bg-white/10 rounded-lg border border-white/20 hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:bg-white/15 group/sub">
              <div className="text-lg mb-1 group-hover/sub:rotate-6 transition-transform duration-300">🤖</div>
              <div className="text-xs text-gray-200">Automating Parents&apos; Jobs</div>
              <div className="w-1 h-1 bg-primary/60 rounded-full mx-auto mt-1 opacity-0 group-hover/sub:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="text-center p-2 bg-white/10 rounded-lg border border-white/20 hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:bg-white/15 group/sub">
              <div className="text-lg mb-1 group-hover/sub:rotate-6 transition-transform duration-300">⚡</div>
              <div className="text-xs text-gray-200">Full Stack</div>
              <div className="w-1 h-1 bg-primary/60 rounded-full mx-auto mt-1 opacity-0 group-hover/sub:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-300">
            <span>Started 3 weeks ago</span>
            <div className="flex items-center gap-1">
              <span>Activity:</span>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "focus",
      title: "Current Focus",
      icon: <Target className="w-6 h-6" />,
      borderColor: "border-primary",
      activityLevel: 'high',
      startedDate: '1 month ago',
      content: (
        <div className="space-y-4">
          <div className="font-medium">Reading Sakana AI Research Papers</div>
          <div className="text-sm text-gray-200">Particularly Text-to-LoRA</div>
          
          {/* Progress Ring */}
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 w-16 h-16 border-2 border-white/10 rounded-full"></div>
            <div className="absolute inset-0 w-16 h-16 border-2 border-transparent border-t-primary rounded-full animate-spin" style={{animationDuration: '3s'}}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-primary rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-300">
            <span>Started 1 month ago</span>
            <div className="flex items-center gap-1">
              <span>Activity:</span>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <section className="pt-48 pb-24 px-6 relative overflow-hidden bg-black">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        {/* Floating particles */}
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{animationDelay: '0.5s', animationDuration: '2s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-primary/30 rounded-full animate-bounce" style={{animationDelay: '1.5s', animationDuration: '2.5s'}}></div>
      </div>
      
      {/* Enhanced Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`font-sans text-4xl font-bold mb-4 text-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Current Interests
          </h2>
          <p className={`text-xl text-gray-300 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            What&apos;s capturing my attention right now
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {interestCards.map((card, index) => (
            <div
              key={card.id}
              className={`bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/25 
                         hover:bg-white/20 hover:border-white/35 transition-all duration-500 
                         hover:shadow-2xl hover:shadow-black/20 group cursor-pointer
                         hover:-translate-y-1 ${card.borderColor}`}
              style={{
                borderTopWidth: '4px',
                borderTopColor: 'var(--primary)',
                transitionDelay: `${index * 100}ms`
              }}
            >
              {/* Enhanced Header with Breathing Icon */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-white/20 group-hover:bg-white/30 transition-all duration-300 text-primary group-hover:scale-110 group-hover:rotate-3">
                  <div className="animate-pulse" style={{animationDuration: '3s'}}>
                    {card.icon}
                  </div>
                </div>
                <h3 className="font-sans text-xl font-semibold text-white group-hover:text-primary/90 transition-colors duration-300">
                  {card.title}
                </h3>
              </div>
              
              {/* Content */}
              <div className="text-gray-100">
                {card.content}
              </div>
              
              {/* Subtle Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/3 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
