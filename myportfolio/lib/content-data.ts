export interface BlogPost {
  id: number
  title: string
  excerpt: string
  date: string
  slug: string
}

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

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Placeholder",
    excerpt: "",
    date: "August 2025",
    slug: "evolution-of-minimalist-design"
  },

]

export const photoItems: PhotoItem[] = [
  {
    id: 1,
    title: "Golden Hour Reflections",
    category: "Nature"
  },
  {
    id: 2,
    title: "Urban Geometry",
    category: "Architecture"
  },
  {
    id: 3,
    title: "Street Life",
    category: "Street"
  },
  {
    id: 4,
    title: "Abstract Forms",
    category: "Abstract"
  },
  {
    id: 5,
    title: "Portrait Series",
    category: "Portrait"
  },
  {
    id: 6,
    title: "Landscape Views",
    category: "Landscape"
  },
  {
    id: 7,
    title: "Still Life",
    category: "Still Life"
  },
  {
    id: 8,
    title: "Documentary",
    category: "Documentary"
  },
  {
    id: 9,
    title: "City Lights",
    category: "Urban"
  },
  {
    id: 10,
    title: "Mountain Peaks",
    category: "Landscape"
  },
  {
    id: 11,
    title: "Human Stories",
    category: "Documentary"
  },
  {
    id: 12,
    title: "Modern Architecture",
    category: "Architecture"
  }
]

export const experiences: Experience[] = [
  {
    title: "Software Engineer Intern",
    company: "Adaptional (YCS25)",
    period: "May 2025 - Aug 2025",
    description: "Designed property-merging algorithm with LLM parallelization, improving inference speed 2x and edge-case accuracy 90%."
  },
  {
    title: "Founding Engineer",
    company: "Accruely",
    period: "Mar 2025 - May 2025",
    description: "Built accrual automation MVP that won Dartmouth Shark Tank (1st Place) and advanced to YC S25 top 10% and a16z Final Round."
  },
  {
    title: "Deep Learning Researcher",
    company: "Dartmouth LISP Lab",
    period: "Jan 2025 - May 2025",
    description: "Reduced MAE by 13% and increased R² from 0.78 to 0.84 over real-valued MLP baselines on time series regression tasks."
  }
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
