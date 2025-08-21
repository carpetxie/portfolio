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
    title: "The Evolution of Minimalist Design in Digital Spaces",
    excerpt: "Exploring how minimalism has shaped modern digital interfaces and why less truly can be more when it comes to user experience design...",
    date: "March 2024",
    slug: "evolution-of-minimalist-design"
  },
  {
    id: 2,
    title: "Building Sustainable Design Systems",
    excerpt: "A deep dive into creating design systems that stand the test of time while remaining flexible enough to evolve with your product...",
    date: "March 2024",
    slug: "building-sustainable-design-systems"
  },
  {
    id: 3,
    title: "Photography as a Tool for Better UX Design",
    excerpt: "How the principles of photography composition can dramatically improve your approach to user interface design...",
    date: "March 2024",
    slug: "photography-as-ux-tool"
  },
  {
    id: 4,
    title: "The Psychology Behind Color Choices",
    excerpt: "Understanding the emotional and psychological impact of color choices in digital design and how to leverage them effectively...",
    date: "February 2024",
    slug: "color-psychology"
  },
  {
    id: 5,
    title: "Lessons Learned from Remote Design Collaboration",
    excerpt: "Key insights and practical tips for maintaining design quality and team cohesion in distributed creative teams...",
    date: "February 2024",
    slug: "remote-collaboration"
  },
  {
    id: 6,
    title: "Typography in the Age of Variable Fonts",
    excerpt: "Exploring the creative possibilities and technical considerations of implementing variable fonts in modern web design...",
    date: "February 2024",
    slug: "variable-fonts"
  },
  {
    id: 7,
    title: "Creating Accessible Design Patterns",
    excerpt: "Building inclusive design patterns that work for everyone, not just the majority of users...",
    date: "January 2024",
    slug: "accessible-design"
  },
  {
    id: 8,
    title: "The Intersection of Art and Technology",
    excerpt: "How traditional art principles continue to influence and enhance contemporary digital design practices...",
    date: "January 2024",
    slug: "art-technology"
  },
  {
    id: 9,
    title: "Designing for Emotional Connection",
    excerpt: "Creating user experiences that resonate on an emotional level and build lasting connections with your audience...",
    date: "January 2024",
    slug: "emotional-design"
  },
  {
    id: 10,
    title: "Future Trends in Digital Experience Design",
    excerpt: "Predictions and emerging trends that will shape the future of digital experience design in the coming years...",
    date: "December 2023",
    slug: "future-trends"
  }
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
    title: "Coffee Enthusiast",
    description: "I believe great design starts with great coffee. Currently exploring single-origin beans and the art of pour-over brewing."
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
