# OPEN DESIGN SYSTEM — MINIMALIST BENTO SPECIFICATION (`DESIGN.md`)

> **Product**: Rupesh Jadhav — Senior Mobile Developer Portfolio
> **Design Language**: Linear/Awwwards Minimalist Dark Bento Aesthetic
> **Core Principles**: High contrast typography, dark void backdrop, subtle glass surface blur, spotlight border glow on cursor hover, and fast keyboard-first navigation.

---

## 🎨 Design Tokens

### Color Palette (Void Dark Mode)
- **Void Base (`--bg`)**: `#050507` (Deepest Charcoal Dark)
- **Bento Card Surface (`--bg-surface`)**: `rgba(18, 18, 24, 0.7)` (Translucent Frosted Glass)
- **Bento Card Hover (`--bg-hover`)**: `rgba(28, 28, 38, 0.85)`
- **Glass Overlay (`--bg-glass`)**: `rgba(10, 10, 14, 0.8)` with `backdrop-filter: blur(24px)`

### Brand Gradients & Accents
- **Primary Accent (`--accent`)**: `#8b5cf6` (Electric Violet)
- **Secondary Accent (`--accent-cyan`)**: `#06b6d4` (Cyber Cyan)
- **Status Green (`--status-green`)**: `#10b981` (Emerald Available)
- **Gradient Headline**: `linear-gradient(135deg, #ffffff 0%, #a1a1aa 50%, #8b5cf6 100%)`
- **Spotlight Glow Radius**: `300px` radial gradient tracking `(clientX, clientY)`

### Typography
- **Display Sans**: `Inter`, system-ui, sans-serif
- **Technical Mono**: `JetBrains Mono`, monospace
- **Scale**:
  - Hero Display: `3.5rem` (56px) / `font-weight: 800` / `letter-spacing: -0.04em`
  - Section Title: `2.25rem` (36px) / `font-weight: 700` / `letter-spacing: -0.03em`
  - Bento Header: `1.25rem` (20px) / `font-weight: 600`
  - Body: `0.95rem` (15.2px) / `line-height: 1.6`

### Borders & Motion
- **Border Crisp**: `rgba(255, 255, 255, 0.08)`
- **Border Active**: `rgba(139, 92, 246, 0.4)`
- **Ease Spring**: `cubic-bezier(0.16, 1, 0.3, 1)`
- **Border Radius**: Bento Cards `20px` (`rounded-2xl`), Pills `9999px` (`rounded-full`)

---

## 🧩 Architectural Components

1. **Floating Glass Navbar**: Pill-shaped container at the top of the viewport with blur, route indicators, search `Cmd+K` trigger, and live availability badge.
2. **Interactive Bento Grid**: Flexible multi-span grid layout (1x1, 2x1, 2x2) with dynamic mouse-spotlight border tracking.
3. **Spotlight Command Palette (`Cmd+K`)**: Keyboard-driven modal menu for fast page navigation, quick clipboard copying, and resume viewing.
4. **Project Case Study Drawers**: Detailed modal windows for architectural deep-dives, code snippets, and live demo links.
