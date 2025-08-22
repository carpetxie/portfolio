"use client"

import { MapPin, BookOpen, Zap, Compass, Target, Quote } from "lucide-react"

interface InterestCard {
  id: string
  title: string
  icon: React.ReactNode
  borderColor: string
  content: React.ReactNode
}

export default function CurrentInterests() {
  const interestCards: InterestCard[] = [
    {
      id: "location",
      title: "Current Location",
      icon: <MapPin className="w-6 h-6" />,
      borderColor: "border-primary",
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium">Columbus, Ohio</span>
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-sm text-gray-200">Just chilling at home</span>
          </div>
        </div>
      )
    },
    {
      id: "reading",
      title: "Currently Reading",
      icon: <BookOpen className="w-6 h-6" />,
      borderColor: "border-primary",
      content: (
        <div className="space-y-3">
          <div className="font-medium">Random blogs</div>
          <div className="text-sm text-gray-200">Just browsing around the internet</div>
        </div>
      )
    },

    {
      id: "exploring",
      title: "Exploring",
      icon: <Compass className="w-6 h-6" />,
      borderColor: "border-primary",
      content: (
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-2 bg-white/10 rounded-lg border border-white/20 hover:border-primary/30 transition-colors">
            <div className="text-lg mb-1">🗄️</div>
            <div className="text-xs text-gray-200">Databases</div>
          </div>
          <div className="text-center p-2 bg-white/10 rounded-lg border border-white/20 hover:border-primary/30 transition-colors">
            <div className="text-lg mb-1">📊</div>
            <div className="text-xs text-gray-200">Graph Theory</div>
          </div>
          <div className="text-center p-2 bg-white/10 rounded-lg border border-white/20 hover:border-primary/30 transition-colors">
            <div className="text-lg mb-1">🤖</div>
            <div className="text-xs text-gray-200">Automating Parents' Jobs</div>
          </div>
          <div className="text-center p-2 bg-white/10 rounded-lg border border-white/20 hover:border-primary/30 transition-colors">
            <div className="text-lg mb-1">⚡</div>
            <div className="text-xs text-gray-200">Full Stack</div>
          </div>
        </div>
      )
    },
    {
      id: "focus",
      title: "Current Focus",
      icon: <Target className="w-6 h-6" />,
      borderColor: "border-primary",
      content: (
        <div className="space-y-3">
          <div className="font-medium">Reading Sakana AI Research Papers</div>
          <div className="text-sm text-gray-200">Particularly Text-to-LoRA</div>
        </div>
      )
    },

  ]

  return (
    <section className="pt-48 pb-24 px-6 relative overflow-hidden bg-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-sans text-4xl font-bold mb-4 text-white">Current Interests</h2>
          <p className="text-xl text-gray-300">What's capturing my attention right now</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {interestCards.map((card) => (
            <div
              key={card.id}
              className={`bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/25 hover:bg-white/20 hover:border-white/35 transition-all duration-500 hover:shadow-2xl hover:shadow-black/20 group ${card.borderColor}`}
              style={{
                borderTopWidth: '4px',
                borderTopColor: 'var(--primary)'
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-white/20 group-hover:bg-white/30 transition-colors text-primary">
                  {card.icon}
                </div>
                <h3 className="font-sans text-xl font-semibold text-white">{card.title}</h3>
              </div>
              <div className="text-gray-100">
                {card.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
