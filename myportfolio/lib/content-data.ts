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
  tech?: string
}

export interface RandomItem {
  title: string
  description: string
}

export interface Project {
  title: string
  description: string
  tags: string[]
  isCurrent?: boolean
  link?: string
}

export const experiences: Experience[] = [
  {
    title: "Early Engineer",
    company: "Adaptional (YC S25)",
    period: "May 2025 - Nov 2025",
    description: "Automated underwriting pipelines for insurance companies.",
    tech: "TypeScript, Next.js, PostgreSQL, pgvector, Supabase, GPT API"
  },
  {
    title: "Offseason Founder",
    company: "Founders, Inc.",
    period: "Jun 2025 - Jun 2025",
    description: "1 of 70 out of 2200+ chosen. Worked on Henry, an oracle (inspired by GenBio) for high stake strategy teams."
  },
  {
    title: "Co-Investigator",
    company: "Olive Theory Lab",
    period: "May 2023 - Present",
    description: "Keeping callers on crisis hotlines on-hold for longer. Worked with the Us Natl. 988 Suicide Hotline. Music + Psychology + ML Research."
  },
  {
    title: "Deep Learning Research Intern",
    company: "LISP Lab",
    period: "Jan 2025 - May 2025",
    description: "Using complex valued neural networks to model neural synchrony with Dr. Chin",
    tech: "Python, PyTorch, NumPy, Pandas, Matplotlib"
  },
  {
    title: "Machine Learning Research Intern",
    company: "Cognitive Systems Engineering Lab",
    period: "May 2024 - Sep 2024",
    description: "Applying explainable algorithms to breast cancer segmentation under Dr. Krening",
    tech: "Python, TensorFlow, Scikit-learn, OpenCV, SHAP"
  },
  {
    title: "Farming Intern",
    company: "Jacquemin Farms",
    period: "Mar 2024 - Jun 2024",
    description: "Cultivating the Ohioan fields"
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

export const projects: Project[] = [
  {
    title: "Classical Composer Prediction",
    description: "94%+ accuracy identifying Bach from MIDI using 10 musical features; 67.5% multi-class accuracy.",
    tags: ["Python", "MIDI", "Logistic Regression", "Linear Regression"],
    link: "https://github.com/carpetxie/math50-final-project",
  },
  {
    title: "IEX Crumbling Quote Signal Simulation",
    description: "Agent-based sim modeling IEX CQS impact on market microstructure. Event-driven with Hawkes process.",
    tags: ["Python", "Simulation", "Agent-based"],
    link: "https://github.com/carpetxie/IEX-CQI",
  },
  {
    title: "ComplexNN (Neural Synchrony)",
    description: "Complex-valued neural networks for modeling neural synchrony in brain activity.",
    tags: ["Python", "PyTorch", "Complex-valued NN", "Signal Processing"],
  },
  {
    title: "Breast Cancer Classification",
    description: "Ultrasound classification without ROI. Random Forest 78% accuracy, AUC 0.86 on 780 images.",
    tags: ["Python", "Scikit-Learn", "Random Forest", "MLP", "SVM"],
    link: "https://github.com/carpetxie/BreastCancerResearch",
  },
  {
    title: "Tiny Search Engine",
    description: "Full search engine in C with indexing, querying, and ranking.",
    tags: ["C", "Make", "Indexing", "Querying"],
    link: "https://github.com/carpetxie/tiny-search-engine",
  },
  {
    title: "ORM (Rock Paper Scissors)",
    description: "Cut a 62% win-rate AI down to 20.6% over 107 games using Occam&apos;s Razor ML.",
    tags: ["Python", "Jupyter", "ML"],
    link: "https://github.com/carpetxie/ORM",
  }
]

export const hobbies: string[] = [
  "weight lifting",
  "running",
  "reading",
  "chess",
  "cooking",
]

/** Add your honors as strings; they'll show as bullet points (chronological, oldest first). */
export const honors: string[] = [
  "Honors Performance Series Finalist — Carnegie Hall, 1st violin · Feb 2023",
  "North Shore Hackathon — 2nd of 133, $7k · Nov 2023",
  "Cornucodia Hackathon — 2nd of 200+, $17k · Nov 2023",
  "Hackathon for Peace — 1st of 1150 · Oct 2023",
  "Morrill Excellence Scholarship — Full Tuition Scholarship to OSU · Jan 2024",
  "Invited Speaker, OSU Psych 1 — Presented to 100+ · 2024",
  "TuckLAB Entrepreneurship Judges' Choice + 1st Place — Dartmouth · May 2025",
  "Offseason @ Founders Inc. — 1 of 70 out of 2200+ · Jun 2025",
  "YC Full Stack Hackathon — Top 6 Finalist out of 2000+ · Jan 2026",
]
