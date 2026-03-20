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
  link?: string
}

export interface RandomItem {
  title: string
  description: string
}

export interface Project {
  title: string
  preview: string
  description: string
  tags: string[]
  isCurrent?: boolean
  github?: string
  website?: string
}

export const experiences: Experience[] = [
  {
    title: "Machine Learning Engineer Intern",
    company: "Adaptional (YC S25)",
    period: "May 2025 - Nov 2025",
    description: "LLMs for underwriting automation.",
    link: "https://www.adaptional.com/"
  },
  {
    title: "Machine Learning Engineer | Offseason Founder ",
    company: "Founders, Inc.",
    period: "Jun 2025 - Jul 2025",
    description: "Built Henry, an oracle for strategy teams.",
    link: "https://f.inc/"
  },
  {
    title: "Machine Learning Engineer Intern",
    company: "Grid",
    period: "Jan 2025 - May 2025",
    description: "Accounting automation.",
    link: "https://www.withgrid.ai/"
  },
  {
    title: "Co-Investigator",
    company: "Olive Theory Lab",
    period: "May 2023 - Present",
    description: "ML research on 988 Suicide Hotline using music and psychology."
  },
  {
    title: "Deep Learning Research Intern",
    company: "LISP Lab",
    period: "Jan 2025 - May 2025",
    description: "Using complex valued neural networks to model neural synchrony with Dr. Chin",
    link: "https://sites.dartmouth.edu/lisplab/"
  },
  {
    title: "Machine Learning Research Intern",
    company: "Cognitive Systems Engineering Lab",
    period: "May 2024 - Sep 2024",
    description: "Applying explainable algorithms to breast cancer segmentation under Dr. Krening",
    link: "https://u.osu.edu/csel/"
  },
  {
    title: "Farming Intern",
    company: "Jacquemin Farms",
    period: "Mar 2024 - Jun 2024",
    description: "Cultivating the Ohioan fields",
    link: "https://www.jacqueminfarms.net/"
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
    title: "Clinova",
    preview: "Virtual clinical trial platform.",
    description: "Full-stack virtual clinical trial platform using a multi-agent AI pipeline to simulate, validate, and replicate randomized controlled trials with 3D visualization and OMOP CDM integration.",
    tags: ["Full-stack", "Multi-agent AI", "3D Visualization", "AWS"],
    github: "https://github.com/SadeekFarhan21/Clinova",
    website: "https://clinova.farhansadeek.com/",
  },
  {
    title: "SodaCan",
    preview: "Terminal-first data workbench.",
    description: "Terminal-first workbench using Gemini API for 10x faster data ingestion.",
    tags: ["Python", "Gemini API", "CLI"],
    github: "https://github.com/carpetxie/sodacan",
    website: "https://www.youtube.com/watch?v=D7Xe7LfG400",
  },
  {
    title: "IEX Crumbling Quote Signal Simulation",
    preview: "Market microstructure simulation.",
    description: "Agent-based sim modeling IEX CQS impact on market microstructure. Event-driven with Hawkes process.",
    tags: ["Python", "Simulation", "Agent-based"],
    github: "https://github.com/carpetxie/IEX-CQI",
  },
  {
    title: "Tiny Search Engine",
    preview: "Full search engine in C.",
    description: "Full search engine in C with indexing, querying, and ranking.",
    tags: ["C", "Make", "Indexing", "Querying"],
    github: "https://github.com/carpetxie/tiny-search-engine",
  },
  {
    title: "Occam's Razor Model on Game Theory",
    preview: "Beats a 62% win-rate RPS AI.",
    description: "Cut a 62% win-rate AI in rps down to 20.6% over 107 games using Occam's Razor ML.",
    tags: ["Python", "Jupyter", "ML"],
    github: "https://github.com/carpetxie/ORM",
  }
]

export const research: Project[] = [
  {
    title: "Classical Composer Prediction",
    preview: "94%+ accuracy identifying Bach from MIDI.",
    description: "94%+ accuracy identifying Bach from MIDI using 10 musical features; 67.5% multi-class accuracy.",
    tags: ["Python", "MIDI", "Logistic Regression", "Linear Regression"],
    github: "https://github.com/carpetxie/math50-final-project",
  },
  {
    title: "ComplexNN (Private repo)",
    preview: "Complex-valued NNs to mimick neural synchrony.",
    description: "Complex-valued neural networks for modeling neural synchrony in brain activity.",
    tags: ["Python", "PyTorch", "Complex-valued NN", "Signal Processing"],
  },
  {
    title: "Breast Cancer Classification",
    preview: "Ultrasound classifier, 78% accuracy.",
    description: "Ultrasound classification without ROI. Random Forest 78% accuracy, AUC 0.86 on 780 images.",
    tags: ["Python", "Scikit-Learn", "Random Forest", "MLP", "SVM"],
    github: "https://github.com/carpetxie/BreastCancerResearch",
  },
  {
    title: "Running Injury Prediction",
    preview: "RNN/LSTM on biomechanics sequences.",
    description: "RNN and LSTM models for predicting running injuries from ground reaction force data. RNN outperformed LSTM in accuracy, precision, and recall on 9k-point biomechanics sequences.",
    tags: ["Python", "PyTorch", "RNN", "LSTM", "Optuna"],
    github: "https://github.com/carpetxie/RunningInjury",
  },
]

export const hobbies: string[] = [
  "weight lifting",
  "running",
  "reading",
  "chess",
  "cooking",
]

export interface Honor {
  title: string
  description: string
  period: string
  link?: string
}

export const honors: Honor[] = [
  {
    title: "YC Full Stack Hackathon",
    description: "Top 6 Finalist out of 2000+ participants.",
    period: "Jan 2026",
    link: "https://www.linkedin.com/in/emir-karabeg-53ab52196/",
  },
  {
    title: "Offseason @ Founders Inc.",
    description: "1 of 70 selected out of 2200+ applicants.",
    period: "Jun 2025",
    link: "https://f.inc/offseason",
  },
  {
    title: "TuckLAB Entrepreneurship",
    description: "Judges' Choice + 1st Place at Dartmouth.",
    period: "May 2025",
    link: "https://tucklab.tuck.dartmouth.edu/programs/entrepreneurship",
  },
  {
    title: "Invited Speaker, OSU Psych 1",
    description: "Presented research to 100+ students.",
    period: "2024",
  },
  {
    title: "Morrill Excellence Scholarship",
    description: "Full tuition scholarship to The Ohio State University.",
    period: "Jan 2024",
    link: "https://ugeducation.osu.edu/student-enrichment/scholars-programs/morrill-scholarship-program",
  },
  {
    title: "Hackathon for Peace",
    description: "1st place out of 1150 participants.",
    period: "Oct 2023",
    link: "https://devpost.com/software/a-change-in-heart?_gl=1*b8rcfn*_gcl_au*MTE0NDM5ODQyOC4xNzY5MDI3NzQw*_ga*NDIyNDc4Mjg4LjE3NjkwMjc3NDE.*_ga_0YHJK3Y10M*czE3NzExMDQwMzIkbzgkZzEkdDE3NzExMDQxMTMkajQ5JGwwJGgw",
  },
  {
    title: "Cornucodia Hackathon",
    description: "2nd place out of 200+ participants, $17k prize.",
    period: "Nov 2023",
    link: "https://devpost.com/software/a-change-in-heart?_gl=1*b8rcfn*_gcl_au*MTE0NDM5ODQyOC4xNzY5MDI3NzQw*_ga*NDIyNDc4Mjg4LjE3NjkwMjc3NDE.*_ga_0YHJK3Y10M*czE3NzExMDQwMzIkbzgkZzEkdDE3NzExMDQxMTMkajQ5JGwwJGgw",
  },
  {
    title: "North Shore Hackathon",
    description: "2nd place out of 133 participants, $7k prize.",
    period: "Nov 2023",
    link: "https://devpost.com/software/a-change-in-heart?_gl=1*b8rcfn*_gcl_au*MTE0NDM5ODQyOC4xNzY5MDI3NzQw*_ga*NDIyNDc4Mjg4LjE3NjkwMjc3NDE.*_ga_0YHJK3Y10M*czE3NzExMDQwMzIkbzgkZzEkdDE3NzExMDQxMTMkajQ5JGwwJGgw",
  },
  {
    title: "Honors Performance Series Finalist",
    description: "Carnegie Hall, 1st violin.",
    period: "Feb 2023",
    link: "https://honorsperformance.org/",
  },
]
