"use client"

import { motion } from "framer-motion"
import { MapPin, Calendar, Building2, Briefcase } from "lucide-react"
import { experiences } from "@/lib/content-data"

interface Experience {
  title: string
  company: string
  period: string
  description: string
}

export default function ExperienceTimeline() {
  // Sort experiences by date (assuming period format is "MMM YYYY - MMM YYYY")
  const sortedExperiences = [...experiences].sort((a, b) => {
    const getDate = (period: string) => {
      const startDate = period.split(' - ')[0]
      const [month, year] = startDate.split(' ')
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      return new Date(parseInt(year), months.indexOf(month))
    }
    return getDate(b.period).getTime() - getDate(a.period).getTime()
  })

  // If no experiences, show a message
  if (sortedExperiences.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No experiences found</p>
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const timelineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="relative py-12">
      
      {/* Timeline line */}
      <motion.div
        className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/60 to-primary/20"
        variants={timelineVariants}
        initial="hidden"
        animate="visible"
      />
      
      <motion.div
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {sortedExperiences.map((experience, index) => (
          <motion.div
            key={`${experience.company}-${experience.title}-${index}`}
            className="relative flex items-start gap-6"
            variants={itemVariants}
          >
            {/* Timeline dot */}
            <div className="relative z-10 flex-shrink-0">
              <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg" />
              {index < sortedExperiences.length - 1 && (
                <div className="absolute top-4 left-2 w-0.5 h-8 bg-gradient-to-b from-primary/60 to-transparent" />
              )}
            </div>

            {/* Content card */}
            <motion.div
              className="flex-1 bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group"
              whileHover={{ scale: 1.02, y: -2 }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {experience.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                    <Building2 className="w-4 h-4" />
                    <span className="font-medium">{experience.company}</span>
                  </div>
                </div>
                
                {/* Period badge */}
                <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  <Calendar className="w-4 h-4" />
                  <span>{experience.period}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {experience.description}
              </p>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Floating particles */}
      <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{animationDelay: '0.5s', animationDuration: '2s'}} />
      <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-primary/30 rounded-full animate-bounce" style={{animationDelay: '1.5s', animationDuration: '2.5s'}} />
    </div>
  )
}
