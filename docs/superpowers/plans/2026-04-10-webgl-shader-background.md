# WebGL Shader Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the canvas silk texture background with the exact 21st.dev RGB wave WebGL shader (Three.js, GLSL — colorful chromatic aberration sine waves on black).

**Architecture:** Create a self-contained `WebGLShader` component that manages its own Three.js scene/renderer lifecycle, renders full-viewport via a `position: fixed` canvas, and is swapped in for `SilkBackgroundAnimation` in `App.tsx`. The SCRIM_LAYERS overlay is lightened so the colorful wave glow shows through.

**Tech Stack:** React 19, TypeScript, Three.js 0.183.2, Vite, Tailwind CSS 4

---

## File Map

| Action | File | Responsibility |
|--------|------|---------------|
| Create | `components/ui/web-gl-shader.tsx` | Three.js scene + GLSL shader, full-viewport fixed canvas |
| Modify | `App.tsx` | Swap background component, lighten scrim, remove old import |

---

### Task 1: Create `web-gl-shader.tsx`

**Files:**
- Create: `components/ui/web-gl-shader.tsx`

- [ ] **Step 1: Create the file**

```tsx
// components/ui/web-gl-shader.tsx
import { useEffect, useRef } from "react"
import * as THREE from "three"

export function WebGLShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<{
    scene: THREE.Scene | null
    camera: THREE.OrthographicCamera | null
    renderer: THREE.WebGLRenderer | null
    mesh: THREE.Mesh | null
    uniforms: {
      resolution: { value: number[] }
      time: { value: number }
      xScale: { value: number }
      yScale: { value: number }
      distortion: { value: number }
    } | null
    animationId: number | null
  }>({
    scene: null,
    camera: null,
    renderer: null,
    mesh: null,
    uniforms: null,
    animationId: null,
  })

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const { current: refs } = sceneRef

    const vertexShader = `
      attribute vec3 position;
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;

      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
        
        float d = length(p) * distortion;
        
        float rx = p.x * (1.0 + d);
        float gx = p.x;
        float bx = p.x * (1.0 - d);

        float r = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
        float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
        float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);
        
        gl_FragColor = vec4(r, g, b, 1.0);
      }
    `

    refs.scene = new THREE.Scene()
    refs.renderer = new THREE.WebGLRenderer({ canvas })
    refs.renderer.setPixelRatio(window.devicePixelRatio)
    refs.renderer.setClearColor(new THREE.Color(0x000000))

    refs.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1)

    refs.uniforms = {
      resolution: { value: [window.innerWidth, window.innerHeight] },
      time: { value: 0.0 },
      xScale: { value: 1.0 },
      yScale: { value: 0.5 },
      distortion: { value: 0.05 },
    }

    const positions = new THREE.BufferAttribute(
      new Float32Array([
        -1.0, -1.0, 0.0,
         1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0,  1.0, 0.0,
      ]),
      3
    )
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", positions)

    const material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: refs.uniforms,
      side: THREE.DoubleSide,
    })

    refs.mesh = new THREE.Mesh(geometry, material)
    refs.scene.add(refs.mesh)

    const handleResize = () => {
      if (!refs.renderer || !refs.uniforms) return
      refs.renderer.setSize(window.innerWidth, window.innerHeight, false)
      refs.uniforms.resolution.value = [window.innerWidth, window.innerHeight]
    }

    handleResize()

    const animate = () => {
      if (refs.uniforms) refs.uniforms.time.value += 0.01
      if (refs.renderer && refs.scene && refs.camera) {
        refs.renderer.render(refs.scene, refs.camera)
      }
      refs.animationId = requestAnimationFrame(animate)
    }
    animate()

    window.addEventListener("resize", handleResize)

    return () => {
      if (refs.animationId) cancelAnimationFrame(refs.animationId)
      window.removeEventListener("resize", handleResize)
      if (refs.mesh) {
        refs.scene?.remove(refs.mesh)
        refs.mesh.geometry.dispose()
        if (refs.mesh.material instanceof THREE.Material) {
          refs.mesh.material.dispose()
        }
      }
      refs.renderer?.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full block"
    />
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles with no errors**

```bash
cd /Users/rupeshjadhav/StudioProjects/jadhavrupesh.github.io
npx tsc --noEmit
```

Expected: no output (clean). If errors appear, fix them before continuing.

- [ ] **Step 3: Commit**

```bash
git add components/ui/web-gl-shader.tsx
git commit -m "feat: add WebGL RGB wave shader background component"
```

---

### Task 2: Swap background in `App.tsx`

**Files:**
- Modify: `App.tsx`

- [ ] **Step 1: Replace the import and component in `App.tsx`**

Remove:
```tsx
import { SilkBackgroundAnimation } from '@/components/ui/silk-background-animation';
```

Add:
```tsx
import { WebGLShader } from '@/components/ui/web-gl-shader';
```

Replace the `SCRIM_LAYERS` constant (lighten it so the RGB waves show through — the heavy dark linear gradient was tuned for the silk texture and will kill the shader's colorful glow):

```tsx
const SCRIM_LAYERS = `
    radial-gradient(ellipse 95% 65% at 50% 18%, rgba(255,255,255,0.03) 0%, transparent 52%),
    linear-gradient(168deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.38) 100%)
`;
```

Replace the background div inside `AppContentWrapper`:

```tsx
// Before:
<SilkBackgroundAnimation className="h-full w-full" />

// After:
<WebGLShader />
```

The full updated `AppContentWrapper` function should look like:

```tsx
const AppContentWrapper: React.FC = () => {
    const { palette } = useTheme();

    return (
        <div className="relative min-h-screen min-h-[100dvh] overflow-x-hidden">
            <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
                <WebGLShader />
            </div>
            <div
                className="fixed inset-0 z-[1] pointer-events-none"
                style={{ background: SCRIM_LAYERS }}
                aria-hidden
            />
            <div className="relative z-10 min-h-screen" style={{ color: palette.text }}>
                <div className="min-h-screen backdrop-blur-md supports-[backdrop-filter]:backdrop-blur-lg bg-black/[0.14] shadow-[inset_0_0_100px_rgba(0,0,0,0.55)] ring-1 ring-inset ring-white/[0.06]">
                    <main className="max-w-3xl mx-auto px-6 sm:px-8 pb-28 md:pb-32 relative">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/experience" element={<ExperiencePage />} />
                            <Route path="/skills" element={<SkillsPage />} />
                            <Route path="/music" element={<MusicPage />} />
                        </Routes>
                    </main>
                </div>
            </div>
            <Navigation />
        </div>
    );
};
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no output (clean).

- [ ] **Step 3: Run dev server and visually verify**

```bash
npm run dev
```

Open `http://localhost:5173` (or whatever port Vite reports).

Expected:
- Black background with flowing colorful RGB sine wave lines (white/red/green/blue)
- Waves animate smoothly
- Content card visible on top with text readable
- Navigation bar visible at bottom
- No console errors

- [ ] **Step 4: Commit**

```bash
git add App.tsx
git commit -m "feat: replace silk background with WebGL RGB wave shader"
```

---

## Self-Review

**Spec coverage:**
- ✅ `web-gl-shader.tsx` created with exact GLSL from 21st.dev
- ✅ `"use client"` removed (Vite, not Next.js)
- ✅ `SilkBackgroundAnimation` swapped out in `App.tsx`
- ✅ SCRIM_LAYERS lightened to let RGB waves show
- ✅ Full cleanup on unmount (cancelAnimationFrame, dispose)

**Placeholder scan:** None — all steps have complete code.

**Type consistency:** `refs.uniforms` typed explicitly in the `useRef` — matches usage in `animate` and `handleResize` throughout.
