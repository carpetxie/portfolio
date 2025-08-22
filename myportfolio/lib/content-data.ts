export interface PhotoItem {
  id: number
  title: string
  category: string
  description?: string
}

export interface Experience {
  title: string
  company: string
  period: string
  description: string
}

export interface RandomItem {
  title: string
  description: string
}

export const experiences: Experience[] = [
  {
    title: "Offseason Founder",
    company: "Founders, Inc.",
    period: "Jun 2025 - Jun 2025",
    description: "1 of 70 out of 2200+ chosen. Withdrew due to housing crisis in SF"
  },
  {
    title: "Deep Learning Researcher",
    company: "Dartmouth College",
    period: "Jan 2025 - May 2025",
    description: "Using complex valued neural networks to model neural synchrony with Dr. Chin"
  },
  {
    title: "Machine Learning Researcher",
    company: "The Ohio State University",
    period: "May 2024 - Sep 2024",
    description: "Applying explainable algorithms to breast cancer segmentation under Dr. Krening"
  },
  {
    title: "Weeding Intern",
    company: "Winnie & Co.",
    period: "May 2023 - Aug 2024",
    description: "Cultivating my neighbors' lawns"
  },
  {
    title: "Farming Intern",
    company: "Jacquemin Farms",
    period: "Mar 2024 - Jun 2024",
    description: "Cultivating the Ohioan fields"
  },
  {
    title: "Machine Learning Researcher",
    company: "The Ohio State University",
    period: "Mar 2023 - Sep 2023",
    description: "Research internship in machine learning applications"
  },
  {
    title: "Early Engineer",
    company: "Adaptional (YC S25)",
    period: "May 2025 - Aug 2025",
    description: "Designed property-merging algorithm with LLM parallelization, improving inference speed 2x and edge-case accuracy 90%."
  },

]

export const randomItems: RandomItem[] = [
  {
    title: "Weight Lifting",
    description: "Bench: 255; Squat: 285x7; Deadlift: N/A"
  },
  {
    title: "San Francisco",
    description: "I was homeless for a period of time."
  },
]

export const photoCategories = [
  { name: "Nature", count: 12 },
  { name: "Architecture", count: 8 },
  { name: "Street", count: 15 },
  { name: "Abstract", count: 6 },
  { name: "Portrait", count: 10 },
  { name: "Landscape", count: 9 },
  { name: "Still Life", count: 7 },
  { name: "Documentary", count: 11 }
]
