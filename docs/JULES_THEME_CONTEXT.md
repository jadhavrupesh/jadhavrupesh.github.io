# Jules-Style Theme — Work Context

Reference: <https://jules.google/> (Google's "Jules" autonomous coding agent site).
Goal: make this portfolio's **pixel theme** match Jules's interface, pixel-art
design, and its small animated elements (readable ASCII wordmark, moving
characters, and the animated squid/octopus that writes code).

## Jules design DNA (extracted from the live site)

- **Colors:** background purple `#1D0245`, surface `#09051c`, accents
  pink `#E1308D`, cyan `#0FD3D3`, yellow `#F0C642`, purple `#784fcf` / `#472394`.
- **Type:** Roboto Mono (variable), monospace fallbacks.
- **Shape language:** pixel clip-path corners (`rounded-pixel-sm/lg`), pixelated
  images, comic-style tiles, dotted/dither background patterns
  (`pattern-dot-three`, `pattern-square-light`, `pattern-tentacle`).
- **Signature animations:**
  1. **Hero wordmark** — the name is real monospace text on a grid; a robot `@`
     ejects characters, chases the loose pieces, and carries each back to its
     slot. Config from Jules: `textColor #784fcf`, ejected piece colors
     `[#E1308D,#0FD3D3,#F0C642,#472394]`, `ejectionIntervalMs 700`, robot char `@`.
  2. **Squid code-writer** — a pixel squid/octopus agent crawls the code editor
     line by line: moves to a line (thinking, with a thought bubble), "inks" the
     characters (writing), then drops to the next line. Uses `animate-squid-idle`
     (`squid-bob` 3s), `animate-squid-thinking` (`squid-pulse` 1s), and per-line
     `line-ink-flash` background highlight. Sprite: `/jules-pixelated.png`
     (30x30, purple). Thinking bubble: `/thought-bubble.png`.

Jules keyframes (reference):
```css
@keyframes squid-bob   { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-3px) rotate(2deg)} }
@keyframes squid-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.8;transform:scale(1.05)} }
@keyframes line-ink-flash { 0%,100%{background:transparent} 50%{background:#5d43c680} }
```

## What was implemented in this repo

All changes live in the **pixel theme** (default theme; toggle via the die).

### New components
- `components/ascii/PixelHeroLogo.tsx` — canvas hero. Robot `@` ejects and
  reassembles a readable block-font banner spelling **RUPESH / JADHAV**.
  30fps cap, pauses offscreen (IntersectionObserver) and under reduced-motion.
- `components/ascii/PixelSquid.tsx` — **original** pixel squid sprite (SVG, 16x16
  grid, purple `#784fcf` body / `#a184e6` highlight / dark eyes). Body and
  tentacles are separate `<g>` groups so they animate independently. Not Google's
  trademarked mascot — a clean-room original.
- `components/ascii/PixelCodeEditor.tsx` — the `rupesh.dart` editor. The squid
  agent crawls down line-by-line writing code: `thinking` (bubble) → `writing`
  (types chars, ink-flash on the active line + caret) → next line → hold → loop.
  Reduced-motion shows the fully-typed block, no animation.

### Wiring
- `components/ascii/PixelHome.tsx` — hero uses `<PixelHeroLogo />`; editor panel
  uses `<PixelCodeEditor />`.

### CSS (`pixel-theme.css`, appended)
- Hero logo layout + `.sr-only`, `.pixelated-img`.
- Ambient motion: `pixel-twinkle` (sparks), `pixel-float` (availability badge),
  `pixel-cursor-blink` (caret).
- Squid agent: `.pixel-squid-agent` (absolute, `translateY` per line, 0.45s
  transition), `squid-bob`, `squid-legs`, `squid-think` bubble, `.pixel-line-inking`
  highlight. Mobile sizing + `prefers-reduced-motion` disables all animation.

## Verification evidence

- `npx tsc --noEmit` — clean.
- `npm run build` — succeeds (~86 KB gzip JS, ~14 KB gzip CSS).
- Runtime (Playwright + system Chrome, screenshots in `/tmp`):
  - Hero canvas pixels change over time (hash `2893303831 → 2247152000`).
  - Editor grows char-by-char; caret present; no page errors.
  - Reduced-motion: hero static, editor fully typed & stable.
  - **Squid crawls down**: distinct `translateY` positions `0 → 26 → 52 → 78px`.
  - **Ink-flash** line highlight observed while writing.
- `npx playwright test tests/ascii.spec.ts --workers=1` — 7/8 pass.

## Known issue (pre-existing, not from this work)

- `tests/ascii.spec.ts:67` ("die switches complete layouts... remembers theme")
  is **flaky**: pressing Enter on the die should toggle pixel→ascii, but the
  assertion `data-theme='ascii'` intermittently times out (stays `pixel`).
  This concerns `AsciiDie.tsx` keyboard handling — **untracked WIP** by the repo
  owner (`AsciiDie.tsx` is `??`, `tests/ascii.spec.ts` is modified/uncommitted).
  It is unrelated to the hero/squid/editor changes and reproduces flakily
  regardless. Likely fix: the die's `<button>` has `onClick` but no explicit
  `onKeyDown` for Enter/Space, or a focus/localStorage timing race.

## Commits

- `4fad14a` Add Jules-style animated hero wordmark with robot reassembly + ambient motion
- `ba964b1` Add Jules-style auto-typing code editor animation
- (uncommitted) Squid agent: `PixelSquid.tsx`, squid-driven `PixelCodeEditor.tsx`,
  denser readable wordmark in `PixelHeroLogo.tsx`, squid CSS.

## Run locally

```sh
npm ci
npm run dev            # http://localhost:5173/
npx tsc --noEmit
npm run build
# Tests expect a server on 127.0.0.1:5173:
npx vite --host 127.0.0.1 --port 5173 --strictPort &
npx playwright test tests/ascii.spec.ts --workers=1
```

## Follow-ups / ideas to get even closer to Jules

- Give the squid a subtle "ink drip" trail on the line it just finished.
- Add the Jules comic tiles row ("more time for what you want").
- Fix the flaky die keyboard toggle (add `onKeyDown` Enter/Space handler).
- Optionally animate the hero wordmark colors cycling through the Jules palette.
