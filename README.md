# Rupesh Jadhav

An interactive monochrome portfolio built with React, TypeScript, and Vite. Its animated ASCII sculpture is actual text: drag it or use arrow keys to rotate, switch between torus/sphere/cube, and use Play/Pause and Reset controls.

### Run the portfolio

```sh
npm ci
npm run dev
```

Use the local Vite URL rather than opening `index.html` directly. All portfolio content comes from `constants.ts`. The `/about`, `/experience`, `/skills`, `/projects`, and `/contact` routes open keyboard-accessible panels; Escape closes them.

The ASCII animation uses native JavaScript and a single `<pre>` element, without WebGL or image assets. Rendering is capped at 24 frames per second and stops while hidden or offscreen. Reduced-motion preferences start the sculpture paused; visitors can deliberately play it or rotate it manually.

```sh
npx tsc --noEmit
npm run build
# With the development server running; tests use installed Google Chrome:
npx playwright test tests/ascii.spec.ts --workers=1
```

The existing GitHub Actions workflow builds and publishes `dist` to the `gh-pages` branch after a push to `main`. Deployment settings are unchanged.

### Inspiration

- [ASCII Motion](https://www.ascii-motion.com/) — character-based motion and procedural text artwork.
- [Three.js ASCII example](https://threejs.org/examples/webgl_effects_ascii.html) — shaded geometric forms rendered in text.

The renderer and interface are original code. The existing local Neoda font supplies the display lettering; IBM Plex Mono and Space Grotesk load from Google Fonts with system fallbacks.

---

**Senior Mobile Developer**

I am a Senior Mobile Developer with over five years of experience delivering secure, scalable, and high-performance applications. I have a proven track record of success across diverse industries, including **FinTech, Banking, Hospitality, Logistics, and E-commerce**. Over the years, I’ve contributed to end-to-end product lifecycles, from ideation and architecture to deployment and maintenance.

I enjoy building products from the ground up, solving complex engineering challenges, and mentoring teams to adopt modern best practices. My focus is on **Clean Architecture**, **MVVM**, and **multi-module design**, ensuring long-term maintainability and scalability of applications. I take pride in writing clean, testable, and production-grade code while always prioritizing performance and security.

I specialize in **Android (Kotlin, Java)**, **Flutter**, and **Kotlin Multiplatform (KMP)**, enabling me to build for multiple platforms efficiently. My professional experience includes payment gateway integrations (Razorpay), maps and localization (Google Maps/Translate), real-time communication (Agora, WebSockets), and secure data storage (Room, Firebase). Beyond frontend and mobile work, I have backend exposure using **Ktor** and **Firebase**, and I’ve designed **CI/CD pipelines** with Jenkins and Codemagic for automated delivery. I am also proficient in **VAPT hardening**, code reviews, and performance optimization.

Recognized for my problem-solving mindset, I’ve built and optimized solutions that balance innovation with reliability. I actively explore new technologies like **Compose Multiplatform** and **state management patterns** to stay ahead in the fast-moving mobile ecosystem.

---

### Connect
**LinkedIn:** [Rupesh Jadhav](https://www.linkedin.com/in/rupesh-jadhav-126624100/)  
**Email:** [jadhavrupesh22@gmail.com](mailto:jadhavrupesh22@gmail.com)

---

### Technologies
I work with a range of technologies that help me build secure, scalable, and high‑performance applications. My focus is on mobile development, but I also bring backend and tooling expertise to deliver complete solutions.

**Mobile:** Kotlin · Java · Dart · Flutter · Compose · Android SDK · KMP  
**Backend:** Firebase · Ktor · REST  
**Tools:** Git · Codemagic · CI/CD · Performance Tuning · VAPT Security
