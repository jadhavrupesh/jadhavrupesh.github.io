
export interface Experience {
  role: string;
  company: string;
  location?: string;
  duration: string;
  description: string[];
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  tag: string;
  category: string;
  timeline: string;
  role: string;
  platform: string;
  focus: string;
  technologies: string;
  duration: string;
  description: string[];
  responsibilities?: string[];
  challenges?: string[];
  impact?: string;
  coverImage?: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  coverImage?: string;
  content: {
    heading?: string;
    text: string;
  }[];
}

export interface JourneyItem {
  period: string;
  title: string;
  description: string;
}

export interface PhilosophyItem {
  number: string;
  title: string;
  description: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  duration: string;
}

