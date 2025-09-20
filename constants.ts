
import type { Experience, Project, SkillCategory, Education } from './types';

export const personalInfo = {
    name: "Rupesh Jadhav",
    location: "Mumbai, India",
    phone: "+91-9920354733",
    email: "jadhavrupesh22@gmail.com",
    linkedin: "https://www.linkedin.com/in/rupesh-jadhav-126624100/",
    github: "https://github.com/jadhavrupesh",
};

export const professionalSummary: string = "Experienced Mobile Developer with 5+ years of expertise in Android, Flutter, and KMP. Built scalable apps across FinTech, Banking, Hospitality, Logistics, E-commerce. Skilled in Clean Architecture, MVVM, State Management, and performance optimization.";

export const experienceData: Experience[] = [
    {
        role: "Senior Flutter Developer",
        company: "Snapwork Technologies",
        duration: "September 2024 - July 2025",
        description: [
            "Architected a scalable Flutter application with LEGO-block with Umbrella Architecture, supporting responsive layouts across mobile, tablet, and web platforms (HDFC Smart Now App).",
            "Utilized tools like Melos and Mason for efficient workspace management and code generation, while profiling and optimizing performance using DevTools.",
            "Optimized the onboarding module for cross-platform compatibility, supporting Android, iOS, and web platforms (ICICI International App).",
            "Enhanced security using robust token management, ensuring seamless session handling and user authentication.",
            "Handled maintenance, tuned performance, and improved security, including fixing issues from VAPT reports (HDFC Connect App).",
            "Implemented session timeout functionality via a Flutter module integrated into the native codebase (Axis Mobile App).",
        ]
    },
    {
        role: "Senior Flutter Developer",
        company: "Tribetayling",
        duration: "December 2020 – April 2024",
        description: [
            "Migrated native Android codebase to Flutter using MVVM, Clean Architecture, and Hilt, ensuring scalable and maintainable cross-platform development.",
            "Integrated Razorpay, Google Maps, and Google Translate APIs to support multi-language checkout and location services.",
            "Implemented CI/CD using Codemagic, automated Play Store and App Store deployment, and added Firebase Crashlytics + Analytics for monitoring.",
            "Designed secure workflows with authentication, encryption, and FCM-based push notifications to enhance app reliability and compliance."
        ]
    },
    {
        role: "Android Developer",
        company: "Fraydio",
        duration: "October 2019 – Jun 2020",
        description: [
            "Built and maintained native Android applications in Java using MVVM and Clean Architecture for modular, scalable development.",
            "Integrated Agora SDK for real-time audio streaming and implemented Firebase Notifications and Authentication.",
            "Enhanced reliability using Crashlytics and stored structured chat data in Firebase Firestore for seamless messaging."
        ]
    }
];

export const projectData: Project[] = [
    {
        name: "BTL King",
        technologies: "Flutter, Dart, Melos, BLoC, Firebase, Clean Architecture",
        duration: "Feb 2025 - Jun 2025",
        description: [
            "Built a multi-module hotel management app using Flutter, structured with Melos for efficient project orchestration.",
            "Implemented end-to-end UI and API integration using Clean Architecture and BLoC for robust state handling.",
            "Added support for Firebase notifications and ensured modular delivery pipelines across environments."
        ]
    },
    {
        name: "VestaAODM",
        technologies: "Kotlin Multiplatform, Compose, Ktor, Koin, Moko-MVVM, Kamel",
        duration: "Jun 2024 - Sep 2024",
        description: [
            "Developed cross-platform airport duty manager app with shared Compose Multiplatform UI.",
            "Implemented real-time reporting, photo capture, offline caching, and push notifications.",
            "Used Ktor, Koin, and Moko-MVVM for scalable architecture."
        ]
    },
    {
        name: "Gemini Bot",
        technologies: "Flutter, Dart, BLoC, Dio, Chat API",
        duration: "May 2023",
        description: [
            "Built chatbot app to interact with Google Gemini using Flutter BLoC and Dio for API integration.",
            "Designed modular UI and implemented token streaming with robust error handling."
        ]
    },
    {
        name: "KMM Birds",
        technologies: "Kotlin Multiplatform, Voyager, Ktor, Kamel",
        duration: "Jan 2023",
        description: [
            "Created educational app displaying bird data with shared KMP business logic.",
            "Implemented image loading and navigation using Kamel and Voyager.",
            "Deployed on Android and iOS with a single codebase."
        ]
    }
];

export const skillData: SkillCategory[] = [
    { title: "Languages", skills: ["Kotlin", "Java", "Dart", "C", "C++", "Python", "SQL", "JavaScript"] },
    { title: "Frameworks", skills: ["Android SDK", "Flutter", "Compose Multiplatform", "KMP", "Jetpack Compose"] },
    { title: "Architectures", skills: ["MVVM", "Clean Architecture", "MVC", "Multi-module", "LEGO-block"] },
    { title: "Tools", skills: ["Android Studio", "VS Code", "Git", "Figma", "Jenkins", "Melos", "Mason", "Codemagic"] },
    { title: "Backend/APIs", skills: ["Firebase", "Ktor", "REST-Api", "Razorpay", "Agora", "Room-DB"] },
    { title: "Testing/CI", skills: ["VAPT hardening", "performance tuning", "CI/CD", "code review"] },
];

export const educationData: Education = {
    degree: "B.Sc. in Computer Science",
    institution: "Kirti M. Doongursee College, Mumbai, India",
    duration: "2015 - 2019"
};
