import type { Experience, Project, SkillCategory, Education, JournalEntry, JourneyItem, PhilosophyItem } from './types';

export const personalInfo = {
  name: "Rupesh Jadhav",
  roleTitle: "Software Developer",
  roleCursive: "Software Developer",
  location: "Mumbai, India",
  phone: "+91-9920354733",
  email: "jadhavrupesh22@gmail.com",
  linkedin: "https://www.linkedin.com/in/rupesh-jadhav-126624100/",
  github: "https://github.com/jadhavrupesh",
  availability: "Software Developer @ Enso Webworks · Mumbai",
  estYear: "2019",
};

export const professionalSummary = "Software Developer at Enso Webworks in Mumbai with 5+ years of experience engineering high-performance mobile, web, and cross-platform systems. Leveraging AI on a daily basis to architect scalable codebases, accelerate product delivery, and craft intelligent digital experiences.";

export const aboutNarrative = {
  intro: "I’m Rupesh Jadhav, a Software Developer based in Mumbai, India, currently building software at Enso Webworks. With 5+ years of experience, I specialize in crafting robust mobile applications, multi-module Flutter architectures, Kotlin Multiplatform systems, and integrating AI into modern development workflows.",
  col1: "I began my software engineering journey in 2019 building native Android applications in Java and Kotlin with MVVM and Clean Architecture. As modern engineering evolved, I expanded deeply into cross-platform Flutter and Kotlin Multiplatform (KMP), architecting modular codebases with Melos, reactive state pipelines with BLoC, and production systems across FinTech, Banking, and SaaS.",
  col2: "Today at Enso Webworks in Mumbai, I build resilient, user-centric software while harnessing AI on a daily basis—from LLM API integrations and conversational assistants to AI-assisted coding and automated workflows. Whether hardening applications against enterprise VAPT standards or shipping intuitive user experiences, my approach is rooted in clean engineering, high velocity, and continuous innovation.",
};

export const philosophyData: PhilosophyItem[] = [
  {
    number: "01",
    title: "Modular architecture & clean code",
    description: "Deconstructing complex software into decoupled, testable LEGO-block packages with Flutter, KMP, and Clean Architecture.",
  },
  {
    number: "02",
    title: "AI-augmented engineering velocity",
    description: "Leveraging generative AI and LLMs on a daily basis to automate scaffolding, design intelligent features, and accelerate shipping cycles.",
  },
  {
    number: "03",
    title: "Enterprise reliability & security",
    description: "Building production software hardened against VAPT security standards, with 60fps performance and reliable offline-first data sync.",
  },
];

export const journeyData: JourneyItem[] = [
  {
    period: "Current",
    title: "Software Developer @ Enso Webworks",
    description: "Building scalable software, mobile architectures, and AI-driven product capabilities in Mumbai.",
  },
  {
    period: "2024",
    title: "Mobile Banking Architecture @ Snapwork",
    description: "Architected modular Flutter & KMP solutions for tier-1 enterprise banking clients (HDFC, ICICI, Axis Bank).",
  },
  {
    period: "2020 — 2024",
    title: "Scaling Cross-Platform Products @ Tribetayling",
    description: "Migrated native codebases to Flutter, integrated payment gateways (Razorpay), location APIs, and automated CI/CD.",
  },
  {
    period: "2019 — 2020",
    title: "Building Native Foundations @ Fraydio",
    description: "Engineered native Android apps with Agora real-time audio streaming, Firebase Firestore, and MVVM architecture.",
  },
];

export const experienceData: Experience[] = [
  {
    role: "Software Developer",
    company: "Enso Webworks",
    location: "Mumbai, India",
    duration: "2025 — Present",
    description: [
      "Building high-performance cross-platform software and mobile applications with modular architecture and clean code standards.",
      "Leveraging AI on a daily basis (LLM APIs, prompt engineering, agentic workflows, and automated scaffolding) to significantly accelerate product iterations and feature delivery.",
      "Designing responsive, intuitive UI interfaces and decoupled business logic layers across mobile and web platforms.",
      "Collaborating on full-lifecycle software engineering from product ideation and architecture design to production release and monitoring.",
    ],
  },
  {
    role: "Senior Flutter Developer & Architect",
    company: "Snapwork Technologies",
    location: "Mumbai, India",
    duration: "2024",
    description: [
      "Architected a scalable Flutter application with LEGO-block and Umbrella Architecture, supporting responsive layouts across mobile, tablet, and web (HDFC Smart Now App).",
      "Utilized tools like Melos and Mason for efficient workspace management and code generation, while profiling and optimizing performance using DevTools.",
      "Optimized the onboarding module for cross-platform compatibility across Android, iOS, and Web (ICICI International App).",
      "Enhanced security using robust token management and fixed critical issues from VAPT vulnerability audit reports (HDFC Connect App).",
      "Implemented session timeout functionality via a standalone Flutter module integrated into native codebases (Axis Mobile App).",
    ],
  },
  {
    role: "Senior Flutter Developer",
    company: "Tribetayling",
    location: "Mumbai, India",
    duration: "2020 — 2024",
    description: [
      "Migrated native Android codebase to Flutter using MVVM, Clean Architecture, and Hilt, ensuring maintainable cross-platform code.",
      "Integrated Razorpay, Google Maps, and Google Translate APIs to support multi-language checkout and location services.",
      "Implemented automated CI/CD using Codemagic, automated Play Store and App Store deployments, and integrated Firebase Crashlytics.",
      "Designed secure workflows with biometric authentication, token encryption, and FCM-based push notifications.",
    ],
  },
  {
    role: "Android Developer",
    company: "Fraydio",
    location: "Mumbai, India",
    duration: "2019 — 2020",
    description: [
      "Built and maintained native Android applications in Java using MVVM and Clean Architecture for modular development.",
      "Integrated Agora SDK for real-time audio broadcasting and implemented Firebase Notifications and Authentication.",
      "Stored structured chat data in Firebase Firestore for low-latency messaging with offline persistence.",
    ],
  },
];

export const projectData: Project[] = [
  {
    id: "btl-king",
    name: "BTL King",
    tagline: "A multi-module hotel management and hospitality SaaS platform.",
    tag: "Hospitality SaaS",
    category: "Flutter",
    timeline: "2025",
    role: "Lead Mobile Architect",
    platform: "Android · iOS · Web",
    focus: "Hospitality Management",
    technologies: "Flutter, Dart, Melos, BLoC, Firebase, Clean Architecture",
    duration: "Feb 2025 — Jun 2025",
    description: [
      "Built a multi-module hotel management system using Flutter, orchestrated with Melos workspaces for independent feature development.",
      "Implemented Clean Architecture with BLoC for predictable state flow across bookings, guest profiles, and billing modules.",
      "Integrated Firebase cloud messaging, real-time sync, and multi-tenant theming.",
    ],
    responsibilities: [
      "Architecture design and Melos multi-package orchestration",
      "BLoC state management implementation and domain modeling",
      "API client design with automated retry and error interceptors",
      "Real-time room occupancy and guest reservation views",
      "Automated CI/CD build scripts and lint rules",
    ],
    challenges: [
      "Handling real-time synchronization of room inventory across concurrent desk operators",
      "Structuring isolated feature packages so hotel staff and admin portals share common core domain logic without circular dependencies",
    ],
    impact: "Cut feature delivery time by 40% using isolated Melos packages and allowed instantaneous offline booking caching for unreliable network environments.",
  },
  {
    id: "gemini-bot",
    name: "Gemini AI & Assistant Client",
    tagline: "Real-time AI assistant with streaming token responses and markdown rendering.",
    tag: "AI & Realtime",
    category: "AI & Realtime",
    timeline: "2024",
    role: "Software Developer",
    platform: "Android · iOS · Web",
    focus: "Generative AI & LLMs",
    technologies: "Flutter, Dart, Google Gemini API, BLoC, Server-Sent Events, Markdown Parser",
    duration: "2024",
    description: [
      "Engineered a conversational AI client interfacing with the Google Gemini API with real-time token streaming.",
      "Implemented smooth 60fps incremental streaming with syntax-highlighted code rendering, markdown parsing, and token buffering.",
      "Built resilient error recovery, conversation branch management, and local prompt history persistence.",
    ],
    responsibilities: [
      "SSE streaming token parser and incremental 16ms UI batching",
      "Markdown and syntax highlighter formatting engine",
      "Local conversation history persistence with offline caching",
      "Prompt template optimization and context window handling",
    ],
    challenges: [
      "Maintaining smooth 60fps scrolling while streaming tokens rapidly update the active message bubble",
    ],
    impact: "Achieved zero UI stutter during high-speed token generation with decoupled BLoC state stream handlers.",
  },
  {
    id: "hdfc-smart-now",
    name: "HDFC Smart Now & Connect",
    tagline: "Enterprise banking platform and high-security customer modules.",
    tag: "Banking & FinTech",
    category: "Enterprise",
    timeline: "2024",
    role: "Senior Flutter Architect",
    platform: "Android · iOS · Web",
    focus: "Enterprise Banking",
    technologies: "Flutter, Umbrella Architecture, Melos, Mason, VAPT Hardening, DevTools",
    duration: "2024",
    description: [
      "Architected enterprise banking modules utilizing LEGO-block with Umbrella Architecture for HDFC Bank.",
      "Hardened security against rigorous VAPT vulnerability assessments (token encryption, SSL pinning, anti-tampering).",
      "Engineered automated Mason templates and Melos workspaces for engineering velocity across 15+ developers.",
    ],
    responsibilities: [
      "Umbrella architecture design across mobile, tablet, and web",
      "VAPT vulnerability remediation and security certification",
      "Session timeout modules integrated into native container codebases",
      "DevTools memory profiling and frame-rate optimization",
    ],
    challenges: [
      "Complying with strict RBI and banking cybersecurity guidelines while maintaining sub-second transition speeds",
      "Integrating Flutter sub-modules smoothly into existing legacy native Objective-C / Swift and Java codebases",
    ],
    impact: "Passed 100% of VAPT security audits without regressions and standardized the banking development workflow with reusable Mason scaffolds.",
  },
  {
    id: "vesta-aodm",
    name: "VestaAODM",
    tagline: "Cross-platform airport operations and duty management system.",
    tag: "Airport Operations",
    category: "Kotlin Multiplatform",
    timeline: "2024",
    role: "Senior KMP Developer",
    platform: "Android · iOS",
    focus: "Operations & Incident Tracking",
    technologies: "Kotlin Multiplatform, Compose Multiplatform, Ktor, Koin, Moko-MVVM, Kamel",
    duration: "2024",
    description: [
      "Developed an airport duty manager app with shared Compose Multiplatform UI across Android and iOS.",
      "Implemented real-time incident reporting, high-resolution photo capture, offline caching, and priority push notifications.",
      "Used Ktor HTTP client, Koin dependency injection, and Moko-MVVM for testable shared architecture.",
    ],
    responsibilities: [
      "Shared UI design using Compose Multiplatform",
      "Ktor HTTP networking with offline local SQLite caching",
      "Native camera integration for incident evidence capture",
      "Cross-platform push notification handling",
    ],
    challenges: [
      "Ensuring consistent performance and camera capture behavior on both Android devices and iPhones with unified Kotlin code",
      "Optimizing image compression and background queueing for airport tarmac workers in dead zones",
    ],
    impact: "Delivered 85% shared code between Android and iOS versions with 0 platform-specific UI discrepancies.",
  },
  {
    id: "kmm-birds",
    name: "KMM Birds Explorer",
    tagline: "Educational wildlife exploration platform built with KMP.",
    tag: "KMP Exploration",
    category: "Kotlin Multiplatform",
    timeline: "2023",
    role: "KMP Developer",
    platform: "Android · iOS",
    focus: "Open Source / Education",
    technologies: "Kotlin Multiplatform, Voyager Navigation, Ktor, Kamel Image Loader",
    duration: "2023",
    description: [
      "Open-source educational app displaying categorized bird species with shared KMP business logic.",
      "Implemented asynchronous image caching with Kamel and multi-screen navigation using Voyager.",
      "Single codebase deployed across Android and iOS targets.",
    ],
    responsibilities: [
      "Voyager navigation stack orchestration",
      "Shared data layer with Ktor HTTP client and serialization",
      "Image memory caching pipeline",
    ],
    challenges: [
      "Handling asynchronous image cache decoding without locking the main thread on iOS",
    ],
    impact: "Demonstrated 90%+ code sharing efficiency between mobile platforms as a reference open-source template.",
  },
];

export const journalData: JournalEntry[] = [
  {
    id: "ai-in-daily-software-development",
    title: "How Daily AI Workflows 3x Software Engineering Velocity",
    date: "2026",
    readTime: "5 min read",
    category: "AI & Engineering",
    excerpt: "Practical insights on integrating generative AI, LLM APIs, and agentic workflows into everyday software architecture and mobile development.",
    content: [
      {
        heading: "From Code Completion to Agentic Co-Piloting",
        text: "Using AI daily is no longer just about tab-autocomplete; it's about treating LLMs and autonomous coding agents as senior pair-programming partners. From exploring edge-case test matrices to scaffolding clean architectural layers, AI reduces cognitive load on boilerplate tasks so engineers can focus on domain modeling and system resilience.",
      },
      {
        heading: "Scaffolding Clean Architecture with LLMs",
        text: "By feeding strict architectural rules—such as BLoC state isolation, Mason brick templates, or KMP multi-module boundaries—AI tools can generate pristine, type-safe repositories, data mappers, and unit tests with zero drift from team standards.",
      },
      {
        heading: "Building AI-Native User Experiences",
        text: "Integrating LLM APIs into user-facing products requires understanding token streaming, state buffering, prompt context management, and graceful offline fallbacks. Creating smooth 60fps streaming experiences turns raw model output into delightful user interfaces.",
      },
    ],
  },
  {
    id: "lego-block-architecture-melos",
    title: "Building LEGO-Block Flutter Apps with Melos and Mason",
    date: "2025",
    readTime: "5 min read",
    category: "Architecture",
    excerpt: "How decomposing enterprise codebases into isolated, reusable packages accelerates team velocity and prevents circular dependencies.",
    content: [
      {
        heading: "The Monolith Trap in Mobile Apps",
        text: "As enterprise mobile applications expand past 50 screens and multiple squads, monolithic folders quickly lead to tight coupling, endless merge conflicts, and slow test runs. By adopting a LEGO-block umbrella architecture, every business feature becomes an isolated Melos package with strict boundaries.",
      },
      {
        heading: "Why Melos Makes Monorepos Effortless",
        text: "Melos manages versioning, package linking, and command execution across all sub-packages in one workspace. With simple scripts, running tests across 20 modules or analyzing lint rules becomes a single command (`melos run test:all`).",
      },
      {
        heading: "Scaffolding with Mason",
        text: "Pairing Melos with Mason bricks allows engineering teams to scaffold new clean-architecture feature modules—including BLoC, domain models, repositories, and UI widgets—in under 10 seconds with guaranteed consistency.",
      },
    ],
  },
  {
    id: "kmp-vs-flutter-production-guide",
    title: "KMP vs Flutter: Sharing Logic Without Sacrificing Native UX",
    date: "2025",
    readTime: "7 min read",
    category: "Cross-Platform",
    excerpt: "A practical comparison of Kotlin Multiplatform and Flutter based on 5+ years of production experience in FinTech and Operations.",
    content: [
      {
        heading: "The Core Philosophy Difference",
        text: "Flutter provides an entire rendering engine with its own canvas, ensuring 100% pixel-perfect uniformity across all devices. In contrast, Kotlin Multiplatform compiles shared Kotlin logic into native JVM bytecode and Objective-C/Swift frameworks, letting you choose between shared Compose UI or native SwiftUI / Jetpack Compose.",
      },
      {
        heading: "When to Choose Flutter",
        text: "Flutter is unmatched for speed-to-market when building complete digital products with complex customized branding, animations, and cross-platform tablet/web requirements.",
      },
      {
        heading: "When KMP Wins",
        text: "KMP shines when integrating into existing native enterprise apps, or when apps require deep platform-specific APIs and zero overhead in native UI compliance.",
      },
    ],
  },
  {
    id: "vapt-hardening-banking-apps",
    title: "Hardening Mobile Banking Apps Against VAPT Vulnerabilities",
    date: "2025",
    readTime: "6 min read",
    category: "Security",
    excerpt: "Essential security patterns: SSL pinning, secure token storage, root detection, and memory protection for FinTech apps.",
    content: [
      {
        heading: "Understanding the VAPT Threat Model",
        text: "Vulnerability Assessment and Penetration Testing (VAPT) is mandatory for banking applications. Common attack vectors include man-in-the-middle network interception, runtime memory tampering, and token extraction from local storage.",
      },
      {
        heading: "Key Hardening Techniques",
        text: "1. Certificate Pinning with backup public key hashes to eliminate proxy sniffing. 2. Encrypted Room / SQLite databases using SQLCipher. 3. Secure storage keys saved in Android Keystore / iOS Keychain. 4. Root / Jailbreak detection with active runtime termination.",
      },
    ],
  },
  {
    id: "gemini-ai-token-streaming-flutter",
    title: "Streaming AI Tokens with Flutter BLoC and SSE",
    date: "2024",
    readTime: "4 min read",
    category: "AI & Realtime",
    excerpt: "Implementing smooth 60fps token streaming from the Google Gemini API without UI jank or excessive re-renders.",
    content: [
      {
        heading: "Handling High-Frequency SSE Streams",
        text: "When large language models generate text, tokens arrive at unpredictable millisecond intervals. If every incoming chunk triggers a full widget tree rebuild, frame rate quickly drops.",
      },
      {
        heading: "The Decoupled BLoC Buffer Pattern",
        text: "By buffering tokens in a lightweight StreamTransformer and emitting batched state updates at 16ms intervals, the UI renders silk-smooth scrolling markdown without frame drops.",
      },
    ],
  },
];

export const skillData: SkillCategory[] = [
  { title: "Languages", skills: ["Kotlin", "Dart", "TypeScript", "JavaScript", "Java", "Python", "SQL"] },
  { title: "Mobile & Cross-Platform", skills: ["Flutter", "Android SDK", "Kotlin Multiplatform (KMP)", "Compose Multiplatform", "Jetpack Compose", "React / Web"] },
  { title: "AI & Modern Tooling", skills: ["Gemini API", "LLM Integrations", "Cursor & AI Agents", "Prompt Engineering", "Streaming SSE", "Context Window Management"] },
  { title: "Architecture & Patterns", skills: ["Clean Architecture", "MVVM", "BLoC Pattern", "LEGO-Block & Melos", "Umbrella Monorepo", "Repository Pattern"] },
  { title: "DevOps, Security & Tools", skills: ["VAPT Security Hardening", "Codemagic CI/CD", "GitHub Actions", "Mason Scaffolding", "Firebase", "DevTools Profiling"] },
];

export const educationData: Education = {
  degree: "B.Sc. in Computer Science",
  institution: "Kirti M. Doongursee College, Mumbai, India",
  duration: "2015 — 2019",
};


