## Next-Level Upgrade: Liquid Glass + Aurora

Upgrade the portfolio's flat "pseudo-glass" to authentic **iOS-26-style Liquid Glass** with real refraction on signature elements + an iridescent aurora layer. Balanced intensity (real SVG refraction on hero/nav/CTA, lightweight CSS-specular glass elsewhere) for 60fps everywhere.

### 1. New shared glass system — `components/ui/glass.tsx` (NEW)
- **`<GlassSurface>`** — lightweight CSS-only glass: layered specular top highlight (`inset` white shadow), deep inner/bottom shadow for depth, hairline border, subtle iridescent rim. Replaces the copy-pasted `GLASS_CARD`/`CARD_BASE` strings.
- **`<LiquidGlass>`** — the real-refraction variant: shared `feDisplacementMap` SVG filter + `backdrop-filter` + specular rim + depth. Used only on hero card, nav dock, CTA button.
- **`<GlassFilters />`** — one shared set of SVG filter defs (`#liquid-glass-refract`), mounted once globally so components stop rendering their own filter SVGs.

### 2. Aurora layer — `components/ui/aurora.tsx` (NEW)
- 3 soft drifting blobs (cyan `#22d3ee`, violet `#a78bfa`, pink `#f472b6`), heavily blurred, `mix-blend-screen`, very low opacity.
- GPU-composited CSS transforms only (no per-pixel JS). `pointer-events-none`. Respects `prefers-reduced-motion`.
- Sits at `z-[2]` between the WebGL shader (`z-0`) and content (`z-10`) so colors bleed *through* the glass.

### 3. Global CSS — `styles.css`
Add (plain CSS, works with Tailwind v4):
- `@keyframes aurora-drift`, `glass-sheen`, `shimmer` keyframes.
- `.glass-aurora-border` (animated iridescent conic-gradient border), `.glass-specular` (top highlight + bottom depth shadow) utilities.

### 4. Wire into `App.tsx`
- Insert `<Aurora />` at `z-[2]` between shader and content.
- Mount `<GlassFilters />` once (so filter refs resolve globally).
- Tune the scrim so aurora stays subtle, not dominant.

### 5. Signature refraction on `pages/HomePage.tsx`
- Hero profile card → `<LiquidGlass>` (real refraction) with aurora rim + conic-glow avatar ring.
- About / Expertise / Stack → `<GlassSurface>` (specular glass) with aurora-tinted hover.
- Gradient name text + refined layout polish.

### 6. Morphing glass nav dock — `components/Navigation.tsx`
- Wrap dock in `<LiquidGlass>`.
- Replace static active highlight with **framer-motion `layoutId` morphing pill** — the active indicator smoothly slides between items (the signature iOS feel).
- Aurora rim glow on the dock.

### 7. Apply across remaining pages
- `SkillsPage`, `ExperiencePage`, `ContactPage`, `MusicPage`: swap duplicated card strings for `<GlassSurface>`; add aurora-tinted hover rims.

### 8. Refactor `components/ui/liquid-glass-button.tsx`
- Reuse shared filter from `glass.tsx` (drop its own `<GlassFilter />`), add aurora glow.

### Verification
- `pnpm build` must pass (TypeScript + Vite production build).
- Dev server HMR to visually confirm on `localhost:5173`.

**Out of scope:** leaving the two unused background components and content/copy untouched; no router or data changes.