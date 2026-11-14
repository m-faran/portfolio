---
name: Muhammad Faran — Engineering Portfolio
description: Dual-mode (Obsidian Dark & Architectural Paper Light) engineering portfolio and interactive system dossiers for a Full-Stack, Mobile & Web3 Software Engineer.
colors:
  dark:
    canvas-obsidian: "#09090b"
    surface-carbon: "#121215"
    surface-hover: "#151518"
    surface-lift: "#18181b"
    border-hairline: "#27272a"
    border-active: "#3f3f46"
    ink-alabaster: "#fafafa"
    ink-muted: "#a1a1aa"
    ink-subtle: "#8a8a93"
    signal-emerald: "#34d399"
    signal-amber: "#fbbf24"
    signal-error: "#f87171"
    signal-error-border: "rgba(239, 68, 68, 0.4)"
    signal-error-bg: "rgba(127, 29, 29, 0.2)"
  light:
    canvas-paper: "#f8f8f8"
    surface-white: "#ffffff"
    surface-hover: "#f4f4f5"
    surface-lift: "#f1f1f3"
    border-hairline: "#d4d4d8"
    border-active: "#71717a"
    ink-obsidian: "#09090b"
    ink-muted: "#4b4b53"
    ink-subtle: "#63636b"
    signal-emerald: "#10b981"
    signal-amber: "#f59e0b"
    signal-error: "#b91c1c"
    signal-error-border: "rgba(220, 38, 38, 0.35)"
    signal-error-bg: "rgba(220, 38, 38, 0.08)"
typography:
  display:
    fontFamily: "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(3rem, 7vw, 6rem)"
    fontWeight: 900
    lineHeight: 1.03
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(1.875rem, 3.5vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  title:
    fontFamily: "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(1.25rem, 2vw, 1.875rem)"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body:
    fontFamily: "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0em"
  label:
    fontFamily: "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.04em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
components:
  button-primary:
    backgroundColor: "var(--foreground)"
    textColor: "var(--background)"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
  button-secondary:
    backgroundColor: "var(--lift)"
    textColor: "var(--foreground)"
    borderColor: "var(--card-border)"
    rounded: "{rounded.sm}"
    padding: "10px 16px"
  dossier-card:
    backgroundColor: "var(--card-bg)"
    textColor: "var(--foreground)"
    borderColor: "var(--card-border)"
    rounded: "{rounded.md}"
    padding: "24px"
---

# Design System: Muhammad Faran — Engineering Portfolio

## Overview

**Creative North Star: "The Systems Architecture Monograph"**

The portfolio is designed as an authoritative, dual-theme systems engineering monograph (**Obsidian Monograph** in Dark Mode and **Architectural Paper Monograph** in Light Mode). Rather than treating software projects as small e-commerce product tiles, every shipped platform is presented as an interactive technical dossier with multi-screen workflow evidence, deployment telemetry, executive summary, and explicit stack documentation. The monochrome surface hierarchy recedes so real product interfaces and engineering prose command immediate trust.

We reject cramped 3-column thumbnail grids that crush mobile portrait screens into unreadable postage stamps, and we reject generic vanity metrics.

**Key Characteristics:**
- **Monumental Typographic Anchor:** High-contrast Geist Sans display headlines paired with measured body copy and Geist Mono technical telemetry (`tabular-nums`).
- **Aspect-Aware Media Theatres:** Wide `16:10` browser stages with visual filmstrips for web platforms and 3-up `9:19` portrait device triptychs for native mobile apps.
- **Focused Inspection Dossiers:** Every project pairs multi-screen interactive visual proof (per-screen architectural captions + accessible fullscreen lightbox inspection) with an executive summary, deployment/repository links, and structured technology stack pills.
- **Zero Decorative Chrome:** Crisp `1px` CSS-tokenized structural borders (`var(--card-border)`), tonal surface elevation, and semantic status signals (`--signal-emerald`, `--signal-amber`, `--signal-error`).

## Colors

A restrained dual-mode monochrome foundation (**Obsidian Monograph** in Dark Mode and **Architectural Paper Monograph** in Light Mode) implemented via CSS custom properties in `app/globals.css`. Theme resolution respects OS `prefers-color-scheme` by default and synchronizes with an interactive masthead toggle persisted via `localStorage` and `html[data-theme]`.

### Primary
- **Foreground Ink (`--foreground`)** (`#fafafa` Alabaster in Dark / `#09090b` Obsidian in Light): Primary display headlines, project titles, active controls, and high-emphasis primary CTA fills.

### Semantic Signals
- **Live Signal Emerald (`--signal-emerald`)** (`#34d399` Dark / `#10b981` Light): Verified live deployment status indicators (`LIVE`).
- **Testing Signal Amber (`--signal-amber`)** (`#fbbf24` Dark / `#f59e0b` Light): Closed-testing mobile release indicators (`TESTING`).
- **Error Signal (`--signal-error`, `--signal-error-border`, `--signal-error-bg`)**: Field-validation and submission alerts (`#f87171` text / `rgba(239, 68, 68, 0.4)` border / `rgba(127, 29, 29, 0.2)` background in Dark; `#b91c1c` text / `rgba(220, 38, 38, 0.35)` border / `rgba(220, 38, 38, 0.08)` background in Light).

### Neutral (Dark Mode — Obsidian Monograph)
- **Obsidian Canvas (`--background`, `#09090b`)**: Root page background, media stage backdrop, and form input wells.
- **Carbon Surface (`--card-bg`, `#121215`)**: Primary container surface for project dossiers, skill accordions, and inquiry panels.
- **Hover Surface (`--hover-surface`, `#151518`)**: Interactive surface shift for expandable skill rows and carousel cards.
- **Lifted Slate (`--lift`, `#18181b`)**: Elevated secondary controls, technology badges, and header rails.
- **Hairline Zinc (`--card-border`, `#27272a`)**: `1px` structural dividers, card borders, and viewport frames.
- **Active Border Zinc (`--card-hover-border`, `#3f3f46`)**: Hover border highlight state.
- **Muted Pewter (`--text-muted`, `#a1a1aa`)**: Primary narrative body copy and navigation links.
- **Subtle Ash (`--text-subtle`, `#8a8a93`)**: Secondary metadata, carousel card headers, and field sub-labels.

### Neutral (Light Mode — Architectural Paper Monograph)
- **Architectural Paper Canvas (`--background`, `#f8f8f8`)**: Root page background, media stage backdrop, and form input wells.
- **Pure White Dossier Surface (`--card-bg`, `#ffffff`)**: Primary container surface for project dossiers, skill accordions, and inquiry panels.
- **Hover Surface (`--hover-surface`, `#f4f4f5`)**: Interactive surface shift for expandable skill rows and carousel cards.
- **Lifted Stone (`--lift`, `#f1f1f3`)**: Elevated secondary controls, technology badges, and header rails.
- **Hairline Zinc (`--card-border`, `#d4d4d8`)**: `1px` structural dividers, card borders, and viewport frames (deepened for crisp Light Mode edge separation).
- **Active Border Zinc (`--card-hover-border`, `#71717a`)**: High-clarity hover border highlight state.
- **Muted Charcoal (`--text-muted`, `#4b4b53`)**: Primary narrative body copy and descriptions.
- **Subtle Slate (`--text-subtle`, `#63636b`)**: Secondary metadata, spec prefixes, and form sub-labels.

### Theme-Adaptive Icon Tokens (`--icon-*`)
- Brand SVG icons inside skill badges consume dual-theme `--icon-*` custom properties (17 calibrated variables covering React, Tailwind, Vite, Node.js, Supabase, MongoDB, Python, Ethereum, Solana gradient stops, Wallet Adapter, Android, Claude, Gemini, Hugging Face, FFmpeg, and Puppeteer) that darken automatically in Light Mode on `#f1f1f3` surfaces to preserve legibility and WCAG contrast.

### Named Rules
**The Earned Chroma Rule.** Never apply decorative brand colors, neon gradients, or colored borders to containers. Color appears only inside real product screenshots, theme-calibrated technology logos (`--icon-*`), operational status dots (`6px`), and semantic validation feedback (`--signal-error*`).

## Typography

**Display Font:** Geist Sans (with `-apple-system, BlinkMacSystemFont, sans-serif` fallback)
**Body Font:** Geist Sans
**Label/Mono Font:** Geist Mono (with `ui-monospace, SFMono-Regular, monospace` fallback)

**Character:** Swiss-industrial clarity across Obsidian Dark and Paper Light canvases—combining heavy, tightly tracked sans-serif titles with crisp monospace spec identifiers, screen counters, and stack tags.

### Hierarchy
- **Display** (`900`, `text-5xl sm:text-7xl lg:text-8xl`, `leading-[1.03]`, `tracking-tight`): Hero title only (`Full Stack Software Engineer`).
- **Headline** (`700`, `text-3xl sm:text-4xl`, `tracking-tight`): Major section headings (`Selected Work`, `Skills & Technologies`, `Start a Project Conversation`).
- **Title** (`700`, `text-2xl sm:text-3xl`, `tracking-tight`): Active project dossier title; sub-panel headings (`text-xl`, `text-base sm:text-lg`).
- **Body** (`400`/`500`, `16px`–`18px`, `leading-relaxed`): Hero intro, executive project summaries, and form copy (`max-w-2xl` measure).
- **Label & Micro-Telemetry** (`500`–`700`, `10px`–`12px` Geist Mono with `tabular-nums`): Spec IDs (`SPEC-01`), category filters, stream motion toggle, card `LIVE` / `TESTING` & `Inspect ↓` / `Inspecting ↓` badges (`11px`), screen counters (`01 / 11`), and technology stack badges.

### Named Rules
**The No-Kicker Rule.** Never place a small uppercase eyebrow or kicker above section headings (`Selected Work`, `Skills & Technologies`, `Start a Project Conversation`). Let major headings lead cleanly.

## Layout

The page uses a centered `max-w-6xl` (`1152px`) container with `16px` (`px-4`) mobile and `24px` (`sm:px-6`) desktop horizontal padding, anchored by a sticky `64px` (`h-16`) top engineering masthead (`px-3 sm:px-6`, `whitespace-nowrap` links/buttons to guarantee single-line fit down to `375px` mobile viewports).

In **Selected Work**, projects use a **Left-to-Right Moving Carousel + On-Demand Inspection Drawer** architecture:
- **Stream Control Strip & Continuous Carousel (`#projects-carousel`):** Pairs category filter tabs (`ALL (9)`, `WEB (6)`, `MOBILE (3)`) with a live motion telemetry indicator and `Pause Motion` / `Resume Motion` control. The horizontal track animates seamlessly left-to-right (`marquee-ltr`, `Math.max(20, count * 4)s`, `36s` across 9 specs) with edge fades, pausing automatically on `:hover`, keyboard `:focus-visible`, or manual toggle. Web cards render a single `16:10` screenshot; Mobile cards render a 3-up `9:19` phone triptych.
- **On-Demand Inspection Drawer (`#project-inspection-drawer`):** Closed by default (`selectedWorkbenchId: null`). Clicking any carousel card mounts the full-width dossier beneath the carousel and scrolls smoothly into view—combining top header controls (`← Prev`, `Next →`, solid `Close` button), deployment/source `ProjectActionButtons`, interactive `ProjectMediaStage` (`16:10` Browser Viewport + Filmstrip for Web; 3-Up `9:19` Triptych + pills for Mobile; fullscreen Lightbox trigger), `ProjectNarrativePanel` (`Executive Summary` + `Technology Stack`), and a footer `Close Project ↑` return button.

## Elevation & Depth

Depth is achieved primarily through **tonal layering** (`var(--background)` canvas → `var(--card-bg)` dossier surface → `var(--lift)` lifted control) reinforced by crisp `1px solid var(--card-border)` structural hairlines.

### Shadow Vocabulary
- **Device Stage Drop (`--shadow-stage`)**: `0 16px 36px -8px rgba(0, 0, 0, 0.85)` (Dark) / `0 16px 36px -8px rgba(9, 9, 11, 0.14), 0 4px 12px -2px rgba(9, 9, 11, 0.08)` (Light) on portrait mobile device frames, active carousel cards, and the expanded inspection drawer.
- **Lightbox Viewport Drop (`--shadow-lightbox`)**: `0 20px 50px rgba(0, 0, 0, 0.9)` (Dark) / `0 24px 60px -12px rgba(9, 9, 11, 0.24)` (Light) on fullscreen media dialogs.

### Named Rules
**The No-Halo Rule.** Never use zero-offset colored glow shadows (`0 0 8px`). All shadows must use vertical offset and ambient blur.

## Shapes, Touch Targets & Motion

- **Radius & Borders:** `4px` (`rounded`) on buttons/chips/inputs, `6px` (`rounded-md`) on carousel cards, marquee stage, and inspection drawer panels, `8px` (`rounded-lg`) on portrait device viewports. Borders are strictly `1px` (`border-card-border`); never use thick colored side borders.
- **Mobile Touch Targets:** All interactive mobile controls (header links, theme toggle, hero CTAs, filter tabs, `Pause Motion` / `Resume Motion` toggle, prev/next/close drawer buttons, `Inspect Fullscreen`, `Expand All`, `Hire via Upwork`, form submit, footer links, lightbox controls) enforce `min-h-[44px]` (`h-11 w-11` for square icon triggers) below the `sm` breakpoint.
- **Reduced Motion (`prefers-reduced-motion: reduce`):** Disables smooth scrolling (`scroll-behavior: auto`), ping/pulse/marquee animations (`.animate-marquee-ltr`), and spatial movement (`transform: none !important`) while preserving `opacity`, `background-color`, `border-color`, `color`, and `box-shadow` transitions for crisp focus/hover feedback.

## Components

### Buttons
- **Primary CTA:** Solid `bg-foreground text-background border-foreground`, `px-5 py-2.5` (`Let's talk ↓` hero anchor, inspection drawer header `Close` button, full-width form submit, primary deployment demo CTA).
- **Secondary / Outline CTA:** `bg-lift border-card-border text-foreground` shifting on hover (`Explore my work ↓` hero CTA, masthead `Hire Me`, external social/repo links, `Pause Motion` / `Resume Motion` toggle, `← Prev` / `Next →`, and footer `Close Project ↑`).

### Project Media Stages & Accessible Lightbox
- **Semantic Stage Triggers:** Both Web `16:10` viewport stages and Mobile `9:19` triptych stages use native `<button type="button">` wrappers for keyboard and screen-reader accessibility, paired with a persistent `Inspect Fullscreen ⤢` button in the stage header (no hover-only zoom badges).
- **Contextual Caption Bar:** Persistent footer strip beneath every media stage displaying screen index (`01 / 11`), screen title, and full caption.
- **Modal Lightbox:** Manages focus end-to-end—auto-focuses the Close button upon opening, traps `Tab` / `Shift+Tab` inside modal controls, supports `Escape` and `ArrowLeft`/`ArrowRight` navigation, and restores focus to the triggering element on close.

### Inputs & Accessible Form Validation
- **Style:** `1px solid var(--card-border)` stroke on `var(--background)` canvas with `4px` radius and `12px 16px` padding.
- **Field-Level Validation:** `<form noValidate>` routes validation through `handleFormSubmit`, setting `formErrorField` (`name` | `email` | `customScope` | `customBudget` | `message`) so only the failing input receives `aria-invalid="true"` and `aria-describedby="form-error"`, auto-focuses the field, and clears upon input change. Error messages render in the tokenized `--signal-error*` alert container (`#form-error`).

## Do's and Don'ts

### Do:
- **Do** pair every project gallery with per-screen captions, executive summary, technology stack badges, and accurate deployment/repository links.
- **Do** present mobile portrait screenshots in 3-up `9:19` triptych stages and web apps in `16:10` viewports with thumbnail filmstrips.
- **Do** keep the Hero CTA hierarchy clear (`Let's talk ↓` primary solid vs. `Explore my work ↓` bordered secondary) and preserve full keyboard/focus-trap accessibility in dialogs.
- **Do** keep Dual-Mode parity crisp across Obsidian Dark and Architectural Paper Light themes using CSS variables (`--card-border`, `--icon-*`, `--signal-*`).

### Don't:
- **Don't** use a 3-column equal-card grid for Selected Work that shrinks screenshots.
- **Don't** place kickers or eyebrows above headings, or render hover-only affordances without persistent triggers.
- **Don't** use blanket `0.01ms` reduced-motion transition overrides that erase state feedback, or mark unrelated form inputs `aria-invalid` on single-field errors.
- **Don't** use gradient text, thick colored side-borders, or zero-offset neon glow shadows.
