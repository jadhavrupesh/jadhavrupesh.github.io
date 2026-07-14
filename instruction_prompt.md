Act as a senior frontend architect, award-winning interactive portfolio designer, accessibility specialist, and creative developer.

Your task is to completely redesign and refactor my existing developer portfolio:

Current website:
https://jadhavrupesh.github.io/

Repository:
https://github.com/jadhavrupesh/jadhavrupesh.github.io

Do not make a superficial theme adjustment. Redesign the entire website structure, layout system, navigation, visual hierarchy, component architecture, interactions, and responsive behavior.

## Existing technical context

The project currently uses:

* React 19
* TypeScript
* Vite
* React Router
* Tailwind CSS v4
* Framer Motion
* Lucide React
* Three.js / React Three Fiber
* GitHub Pages deployment
* A `constants.ts` file containing portfolio content
* Separate routes for Home, Experience, Skills, Music, and Contact
* A custom cursor
* A WebGL animated background
* A fixed bottom navigation bar

First inspect the complete repository before editing anything.

Preserve all useful personal information, experience entries, skills, project information, contact details, assets, and existing working links. Reuse the content from `constants.ts` instead of duplicating it throughout components.

## Main creative direction

Create a premium black-and-white portfolio inspired by:

* Early 1990s DOS computer games
* Monochrome CRT monitors
* Arcade machine interfaces
* Old operating-system windows
* Pixel-art menus
* Command-line interfaces
* 1-bit graphics and dithering
* Retro game save screens and player-stat menus

The result should feel like a polished modern interpretation of a 1990s computer game—not a cheap retro template.

The design must remain professional enough for recruiters, engineering managers, startup founders, and technical clients.

## Color system

Use a strictly monochrome palette:

* Main background: near black
* Primary text: warm white
* Secondary text: light gray
* Muted text: medium gray
* Borders: white with controlled opacity
* Active elements: inverted black-on-white
* Disabled elements: dark gray
* Selection color: white background with black text

Do not use colorful neon accents.

Do not use purple, blue, green, orange, or multicolor gradients.

Use 1-bit patterns, checkerboards, dot matrices, horizontal lines, dithering, and subtle noise for visual depth.

## Typography

Use two clearly defined typography roles:

1. A pixel-inspired or bitmap-style font for:

    * Page titles
    * Navigation labels
    * Small status indicators
    * Game-style section headings

2. A highly readable monospace font for:

    * Paragraphs
    * Experience descriptions
    * Project details
    * Contact information
    * Buttons and UI controls

Use the pixel font sparingly. Long text must remain easy to read.

Use uppercase labels, terminal-style prompts, short command phrases, and carefully controlled letter spacing.

## shadcn/ui requirement

Install and use shadcn/ui correctly in the existing Vite project.

Use shadcn components where appropriate, including:

* Button
* Card
* Badge
* Separator
* Tabs
* Tooltip
* Dialog
* Sheet
* Command
* ScrollArea
* Accordion
* Input
* Textarea
* DropdownMenu
* NavigationMenu, when suitable

Do not leave shadcn components in their default appearance.

Create a custom monochrome retro design system through CSS variables.

Set border radius to approximately `0px`, `2px`, or `4px`. Avoid modern pill-shaped interfaces except for tiny status indicators.

Buttons should resemble game menu choices or terminal commands, with states such as:

* `[ START ]`
* `[ VIEW WORK ]`
* `[ DOWNLOAD CV ]`
* `[ CONTACT ]`
* `[ BACK ]`

Active buttons may invert from black-on-white to white-on-black.

## New information architecture

Replace the current floating glass-card layout with a coherent game-interface structure.

### Global application shell

Design the entire site as a fictional portfolio operating system or game titled something like:

`RUPESH_OS`
or
`RUPESH.EXE`

The desktop layout should include:

* A thin top status bar
* Portfolio/system title
* Current route or command path
* Local time or session status
* Keyboard navigation hints
* Main content viewport
* Persistent navigation panel
* A bottom status/help bar

Example command path:

`C:\USERS\RUPESH\PORTFOLIO\EXPERIENCE>`

Do not imitate Windows exactly. Create an original retro interface.

### Desktop navigation

Use either:

* A narrow left-side game menu, or
* A compact terminal-style top navigation

Recommended items:

* `01_HOME`
* `02_EXPERIENCE`
* `03_SKILLS`
* `04_PROJECTS`
* `05_MUSIC`
* `06_CONTACT`

Add a Projects section or page when project data exists in the repository.

The current page must be visibly selected using:

* A `>` cursor
* Inverted colors
* A blinking block
* An outlined focus state

Support keyboard navigation where practical.

### Mobile navigation

On mobile:

* Replace the persistent desktop navigation with a shadcn Sheet or compact game-menu button
* Keep navigation thumb-friendly
* Avoid horizontal overflow
* Reduce decorative effects
* Preserve the terminal/game identity
* Do not place important controls too close to screen edges

## Page specifications

### Home page

Build a striking full-viewport introduction.

Suggested structure:

Left side:

* Boot/status message
* Name
* Role
* Concise professional summary
* Primary actions
* Availability indicator
* Technology snapshot

Right side:

* Animated ASCII artwork
* ASCII portrait interpretation, rotating wireframe object, Android mascot-inspired abstract figure, mobile-device outline, or developer workstation
* Small player statistics panel

Example text style:

`PLAYER: RUPESH JADHAV`

`CLASS: SENIOR MOBILE DEVELOPER`

`SPECIALITY: FLUTTER / ANDROID / KMP`

`LOCATION: MUMBAI, INDIA`

Include strong calls to action:

* View experience
* View projects
* Download résumé, only when a real résumé file exists
* Contact me

Add a short boot sequence when the site first loads, but keep it brief and skippable.

### Experience page

Present work history as a mission log, campaign history, or save-file list.

Each company entry should show:

* Role
* Company
* Duration
* Main responsibilities
* Technologies
* Achievements
* Selected project or client context, when already present in the data

Possible labels:

* `MISSION`
* `EMPLOYER`
* `DURATION`
* `OBJECTIVES`
* `RESULTS`
* `TECH LOADOUT`

Use accordion behavior on smaller screens.

Keep long descriptions readable. Do not turn every sentence into decorative UI.

### Skills page

Present skills as a player inventory, capability matrix, or system diagnostics screen.

Organize skills into meaningful categories such as:

* Mobile development
* Architecture
* State management
* Backend
* APIs and integrations
* DevOps
* Security
* Tools

Possible visual patterns:

* Monochrome stat bars
* Skill grids
* Inventory slots
* Command output
* Level indicators

Do not assign misleading numerical proficiency percentages unless the existing data contains verified values.

Use text labels such as:

* `PRIMARY`
* `ADVANCED`
* `WORKING KNOWLEDGE`
* `TOOLS`

### Projects section

Create a dedicated Projects page or a strong featured-project section.

Each project should show:

* Project name
* Short problem statement
* My contribution
* Technology stack
* Architecture or engineering challenge
* Outcome
* Demo link
* Repository link
* Screenshot, only when a real asset exists

Use a selectable mission-list interface on desktop and stacked panels on mobile.

Do not invent projects, results, clients, statistics, or links.

### Music page

Retain the Music page but redesign it as a retro audio-player or sound-test screen.

Possible interface elements:

* ASCII equalizer
* Animated waveform made from text characters
* Track list
* Play-state indicator
* Volume-style visual treatment
* `NOW PLAYING` panel

Do not autoplay sound.

Respect browser media rules and accessibility requirements.

### Contact page

Design the Contact page like a communication terminal.

Include:

* Email
* LinkedIn
* GitHub
* Location
* Phone only when it is intentionally public
* A simple contact form or mailto action

Example heading:

`OPEN_COMMUNICATION_CHANNEL`

Use shadcn Input, Textarea, Button, Tooltip, and validation patterns.

Clearly indicate whether the form sends data or opens the user’s email client. Do not create a fake successful submission.

## ASCII art and animation

Create attractive ASCII-based animation without making the site distracting.

Implement one major ASCII animation and a small number of supporting effects.

Possible main animations:

* Rotating ASCII cube
* Rotating wireframe smartphone
* Animated developer workstation
* Morphing initials `RJ`
* Terminal boot sequence
* Starfield rendered with text characters
* Cellular automaton
* Scrolling code rain in monochrome
* ASCII waveform on the Music page

The animation must:

* Use `requestAnimationFrame` responsibly or use a controlled timer
* Avoid unnecessary React rerenders
* Pause when the tab is not visible
* Scale down on mobile
* Support `prefers-reduced-motion`
* Provide a static fallback
* Remain decorative with appropriate `aria-hidden`
* Avoid causing layout shift
* Avoid consuming excessive CPU or battery

Add subtle supporting effects:

* CRT scanlines
* Very light screen flicker
* Blinking terminal cursor
* Text typing effect
* Dithered hover transitions
* Pixelated route transition
* Inverted menu selection
* Small ASCII loading indicator

Do not animate every element.

## Background treatment

Replace the current WebGL shader background unless it adds meaningful value to the new design.

Prefer a lighter background system built from:

* CSS scanlines
* Low-opacity noise
* Grid patterns
* Dither textures
* ASCII particles
* Subtle radial light
* Edge vignette

Avoid heavy blur, glassmorphism, large gradients, and GPU-heavy effects.

## Custom cursor

Do not allow the custom cursor to reduce usability.

For desktop pointer devices, use a minimal square or crosshair cursor only when it improves the retro experience.

Requirements:

* Disable it on touch devices
* Preserve native text-selection behavior
* Preserve visible links and button states
* Never hide the system cursor without a reliable replacement
* Respect reduced-motion preferences

Removing the custom cursor is acceptable when accessibility or performance is improved.

## Component architecture

Refactor the project into clear reusable components.

Suggested structure:

* `components/layout/RetroShell.tsx`
* `components/layout/StatusBar.tsx`
* `components/layout/RetroNavigation.tsx`
* `components/layout/MobileMenu.tsx`
* `components/layout/CommandPath.tsx`
* `components/ascii/AsciiHero.tsx`
* `components/ascii/AsciiAnimator.tsx`
* `components/ascii/BootSequence.tsx`
* `components/retro/PixelFrame.tsx`
* `components/retro/RetroButton.tsx`
* `components/retro/StatusIndicator.tsx`
* `components/retro/SectionHeading.tsx`
* `components/retro/StatBar.tsx`
* `components/retro/TerminalPanel.tsx`
* `components/experience/MissionCard.tsx`
* `components/projects/ProjectPanel.tsx`
* `components/contact/ContactTerminal.tsx`
* `lib/motion.ts`
* `lib/ascii.ts`
* `lib/utils.ts`

Keep page components focused on composition rather than containing hundreds of lines of UI logic.

Avoid giant single-file components.

Use semantic HTML:

* `header`
* `nav`
* `main`
* `section`
* `article`
* `footer`

## Theme architecture

Replace ad-hoc inline palette styles with CSS variables.

Create tokens for:

* Background
* Foreground
* Surface
* Muted surface
* Border
* Strong border
* Muted text
* Active foreground
* Active background
* Focus ring
* Shadow
* Scanline opacity
* Grid opacity

Use Tailwind utilities and shadcn-compatible CSS variables consistently.

Avoid repeating arbitrary color values throughout TSX files.

## Motion system

Create a consistent motion vocabulary:

* Page enter: quick pixel-style reveal or short fade
* Menu selection: instant inversion with slight movement
* Card reveal: minimal stagger
* Dialog opening: scale from approximately `0.98` to `1`
* Typing animation: used only for important headings
* Hover: 100–180ms
* Route transitions: under 350ms

Use Framer Motion only where it provides real value.

Create a centralized reduced-motion strategy.

## Accessibility

Meet WCAG AA standards.

Requirements:

* Visible keyboard focus states
* Full keyboard navigation
* Skip-to-content link
* Semantic headings
* Sufficient contrast
* Accessible mobile menu
* Accessible dialogs and accordions
* Descriptive link labels
* Proper form labels and error messages
* No meaning communicated only through animation
* No rapid flashing
* Reduced-motion support
* ASCII art hidden from screen readers when decorative
* Static text alternative when ASCII art conveys useful information

## Responsive requirements

Test and optimize for:

* 320px mobile width
* 375px mobile width
* 768px tablet width
* 1024px laptop width
* 1440px desktop width
* Large ultrawide displays

The interface should feel intentionally designed at every breakpoint.

Do not merely shrink the desktop design.

## Performance requirements

Target:

* Fast initial rendering
* Minimal layout shift
* Lazy-loaded heavy sections
* Lazy-loaded Three.js code if it remains
* Optimized images
* No unnecessary animation loops
* No excessive blur
* No excessive drop shadows
* No duplicate dependencies
* No console errors
* No hydration assumptions because this is a Vite SPA

Keep the final production bundle reasonable.

## SEO and metadata

Improve:

* Page title
* Meta description
* Open Graph metadata
* Favicon
* Theme color
* Canonical URL
* Structured headings
* Social preview image, when an existing suitable asset is available

Use accurate descriptions. Do not invent employment claims.

## GitHub Pages compatibility

The final website must continue to deploy correctly to GitHub Pages.

Preserve or improve:

* Vite configuration
* Existing deployment workflow
* Asset paths
* Route fallback behavior
* Refreshing nested routes
* `404.html`, when it is required for SPA routing

Do not migrate to Next.js.

Do not introduce server-only functionality.

Ensure `npm run build` succeeds.

## Things to avoid

Do not create:

* A generic SaaS landing page
* A default shadcn dashboard
* Excessive glassmorphism
* Large rounded cards
* Colorful cyberpunk neon effects
* Unreadable pixel fonts
* Constant flickering
* Autoplay audio
* Fake terminal commands that do nothing
* Fake GitHub statistics
* Fake proficiency percentages
* Fake project metrics
* Fake form submissions
* Excessive typewriter animations
* A mobile layout that is just a compressed desktop layout
* Decorative effects that interfere with reading

## Implementation process

Follow this sequence:

### Phase 1: Audit

Inspect:

* Folder structure
* Package dependencies
* Existing routes
* Current data models
* All components and pages
* Public assets
* Deployment workflow
* Accessibility issues
* Performance-heavy code
* Duplicate visual patterns

Provide a concise audit before editing.

### Phase 2: Design system

Define:

* Design tokens
* Typography
* Spacing
* Borders
* Surfaces
* Interaction states
* Motion rules
* Responsive breakpoints
* Reusable retro components

### Phase 3: Application shell

Implement:

* New global shell
* Status bar
* Responsive navigation
* Main viewport
* Footer/status help line
* Route transitions
* Reduced-motion handling

### Phase 4: Pages

Rebuild all pages using the new system.

Do not leave any page with the old glassmorphism design.

### Phase 5: ASCII interactions

Add the main ASCII animation and limited supporting effects.

### Phase 6: Cleanup

Remove:

* Unused components
* Unused styles
* Unused dependencies
* Old theme code
* Dead WebGL code
* Duplicate motion definitions
* Inaccessible cursor behavior

Only remove code after verifying it is no longer needed.

### Phase 7: Validation

Run and fix:

* TypeScript validation
* Production build
* Linting, when configured
* Broken imports
* Broken links
* Route navigation
* Keyboard navigation
* Mobile overflow
* Reduced-motion mode
* Console warnings
* Accessibility issues

## Final output required

Do not only describe the redesign. Implement it in the repository.

At the end, provide:

1. Concise summary of the new design
2. Files created
3. Files modified
4. Files removed
5. Dependencies added or removed
6. Accessibility improvements
7. Performance improvements
8. Build result
9. Any remaining limitations
10. Instructions for running and deploying the site

Before considering the task finished, verify that the complete site feels like one consistent black-and-white 1990s game interface and that all existing portfolio information remains accurate.
