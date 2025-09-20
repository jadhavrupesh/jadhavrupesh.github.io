
export interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string[];
}

export interface Project {
  name: string;
  technologies: string;
  duration: string;
  description: string[];
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
