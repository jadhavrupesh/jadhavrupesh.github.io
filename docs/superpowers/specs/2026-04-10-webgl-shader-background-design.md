# WebGL Shader Background — Design Spec

**Date:** 2026-04-10  
**Status:** Approved

## Goal

Replace the current canvas-based silk texture background (`SilkBackgroundAnimation`) with the exact WebGL shader from [21st.dev/community/components/aliimam/web-gl-shader](https://21st.dev/community/components/aliimam/web-gl-shader/default).

The effect: colorful RGB sine-wave lines (red, green, blue channels separated by chromatic aberration) flowing across a black background.

## What Changes

### 1. New file: `components/ui/web-gl-shader.tsx`

Exact port of the 21st.dev component. Key adaptations for Vite/React (not Next.js):
- Remove `"use client"` directive
- Keep all Three.js logic identical
- Canvas is `position: fixed`, full viewport, `z-index` managed by App.tsx

**Shader parameters:**
- `xScale: 1.0` — wave frequency
- `yScale: 0.5` — wave amplitude
- `distortion: 0.05` — RGB channel separation (chromatic aberration)
- `time += 0.01` per frame

### 2. Update: `App.tsx`

- Swap `<SilkBackgroundAnimation>` → `<WebGLShader>` in the z-0 background layer
- Reduce `SCRIM_LAYERS` dark overlay — the shader is already dark; heavy scrim would kill the colorful wave glow
- Remove unused `SilkBackgroundAnimation` import

### 3. No other changes

Content card, navigation, custom cursor, all pages, theme system — untouched.

## Non-Goals

- No liquid glass button (not part of the portfolio)
- No layout changes to page content
- No modifications to the existing GLSL shader parameters (exact replica)

## Cleanup

- `components/ui/silk-background-animation.tsx` can be deleted after confirming the new background works (optional, user decides)
