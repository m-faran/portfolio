---
name: Muhammad Faran — Engineering Portfolio
description: High-contrast dark architectural portfolio and interactive system dossiers for a Full-Stack, Mobile & Web3 Software Engineer.
colors:
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
typography:
  display:
    fontFamily: "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(3rem, 7vw, 6rem)"
    fontWeight: 900
    lineHeight: 1.03
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(1.875rem, 3.5vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  title:
    fontFamily: "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(1.25rem, 2vw, 1.625rem)"
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
    backgroundColor: "{colors.ink-alabaster}"
    textColor: "{colors.canvas-obsidian}"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
  button-secondary:
    backgroundColor: "{colors.surface-lift}"
    textColor: "{colors.ink-alabaster}"
    rounded: "{rounded.sm}"
    padding: "10px 16px"
  dossier-card:
    backgroundColor: "{colors.surface-carbon}"
    textColor: "{colors.ink-alabaster}"
    rounded: "{rounded.md}"
    padding: "24px"
---

# Design System: Muhammad Faran — Engineering Portfolio

## Overview

**Creative North Star: "The Systems Architecture Monograph"**

The portfolio is designed as an authoritative, dark-room systems engineering monograph. Rather than treating software projects as small e-commerce product tiles, every shipped platform is presented as a technical dossier with full-scale visual evidence, multi-screen workflow stages, and explicit architectural documentation. The interface recedes into a disciplined carbon-and-obsidian grid (`#09090b` to `#18181b`) so real product interfaces, system diagrams, and engineering prose command immediate trust.

We reject cramped 3-column thumbnail grids that crush mobile portrait screens into unreadable postage stamps, and we reject shallow two-line project blurbs that omit how a system was actually built.

**Key Characteristics:**
- **Monumental Typographic Anchor:** High-contrast Geist Sans display headlines paired with measured 65ch narrative prose and Geist Mono technical telemetry.
- **Aspect-Aware Media Theatres:** Wide browser stages for web/Web3 platforms and 3-up portrait device triptychs (or tall portrait stages with filmstrips) for native mobile apps.
- **Architectural Transparency:** Every project pairs visual proof (with per-screen captions and fullscreen lightbox inspection) with Problem Solved, System Architecture, Key Capabilities, and Tech Stack.
- **Zero Decorative Chrome:** 1px structural borders (`#27272a`), tonal surface elevation, and semantic status signals (`#34d399` live, `#fbbf24` testing).

## Colors

A restrained dual-mode monochrome foundation (**Obsidian Monograph** in Dark Mode and **Architectural Paper Monograph** in Light Mode) where real product screenshots and functional status telemetry provide the only chromatic accents. Theme activation follows the visitor's OS `prefers-color-scheme` by default and includes an interactive toggle in the top engineering masthead persisted via `localStorage`.

### Primary
- **Foreground Ink** (`#fafafa` Alabaster in Dark / `#09090b` Obsidian in Light): Primary display headlines, project titles, active controls, and high-emphasis primary CTA fills.

### Secondary
- **Live Signal Emerald** (`#34d399` in Dark / `#10b981` in Light): Used exclusively for verified live deployment indicators (`LIVE`) and active session telemetry.
- **Testing Signal Amber** (`#fbbf24` in Dark / `#f59e0b` in Light): Used exclusively for closed-beta and Play Store testing indicators (`TESTING`).

### Neutral (Dark Mode — Obsidian Monograph)
- **Obsidian Canvas** (`#09090b`): Root page background, media stage backdrop, and form input wells.
- **Carbon Surface** (`#121215`): Primary container surface for project dossiers, skill accordions, and inquiry panels.
- **Hover Surface** (`#151518`): Subtle interactive surface shift for expandable rows and interactive cards.
- **Lifted Slate** (`#18181b`): Elevated secondary controls, technology badges, and architecture callout blocks.
- **Hairline Zinc** (`#27272a`): 1px structural dividers, card borders, and viewport frames.
- **Active Border Zinc** (`#3f3f46`): Hover and focus border highlight state.
- **Muted Pewter** (`#a1a1aa`): Primary narrative body copy, problem statements, and capability descriptions (≥7.5:1 contrast on `#09090b`).
- **Subtle Ash** (`#8a8a93`): Secondary metadata, inactive tab labels, and input placeholders (≥5.2:1 contrast on `#09090b`).

### Neutral (Light Mode — Architectural Paper Monograph)
- **Architectural Paper Canvas** (`#f8f8f8`): Root page background, media stage backdrop, and form input wells.
- **Pure White Dossier Surface** (`#ffffff`): Primary container surface for project dossiers, skill accordions, and inquiry panels.
- **Hover Surface** (`#f4f4f5`): Subtle interactive surface shift for expandable rows and interactive cards.
- **Lifted Stone** (`#f1f1f3`): Elevated secondary controls, technology badges, and viewport chrome headers.
- **Hairline Zinc** (`#e4e4e7`): 1px structural dividers, card borders, and viewport frames.
- **Active Border Zinc** (`#a1a1aa`): Hover and focus border highlight state.
- **Muted Charcoal** (`#4b4b53`): Primary narrative body copy and descriptions (≥7.2:1 contrast on `#f8f8f8` and `#ffffff`).
- **Subtle Slate** (`#63636b`): Secondary metadata, spec counters, and input placeholders (≥5.4:1 contrast across all light surfaces).

### Named Rules
**The Earned Chroma Rule.** Never apply decorative brand colors, neon gradients, or colored borders to containers. Color appears only inside real product screenshots, technology logos, and 6px operational status dots.

## Typography

**Display Font:** Geist Sans (with `-apple-system, BlinkMacSystemFont, sans-serif` fallback)
**Body Font:** Geist Sans
**Label/Mono Font:** Geist Mono (with `ui-monospace, SFMono-Regular, monospace` fallback)

**Character:** Swiss-industrial clarity on a dark canvas—combining heavy, tightly tracked sans-serif titles with crisp monospace spec identifiers, screen counters, and stack tags.

### Hierarchy
- **Display** (`900`, `clamp(3rem, 7vw, 6rem)`, `1.03` line-height, `-0.035em` tracking): Hero title only.
- **Headline** (`700`, `clamp(1.875rem, 3.5vw, 2.5rem)`, `1.15` line-height, `-0.025em` tracking): Major section headings (`Selected Work`, `Skills & Technologies`, `Start a Project Conversation`).
- **Title** (`700`, `clamp(1.25rem, 2vw, 1.625rem)`, `1.25` line-height, `-0.02em` tracking): Project dossier titles and sub-panel headers.
- **Body** (`400`, `1rem` / `16px`, `1.65` line-height): Project summaries, problem statements, and architectural descriptions, constrained to `65ch` max measure.
- **Label** (`500`, `0.75rem` / `12px`, `1.4` line-height, `0.04em` tracking): Spec IDs (`SPEC-01`), category filters, screen counters (`1/5`), and technology stack badges with `tabular-nums`.

### Named Rules
**The No-Kicker Rule.** Never place a small uppercase eyebrow or kicker above a section heading or project title. Let the heading lead first; place spec IDs, categories, and status badges inline beside the title or in a trailing metadata rail.

## Layout

The page uses a centered `max-w-6xl` (`1152px`) container with `16px` (`px-4`) mobile and `24px` (`sm:px-6`) desktop horizontal padding, anchored by a sticky `64px` (`h-16`) top engineering masthead.

In **Selected Work**, projects use an interactive 12-column **Split Workbench** master-detail architecture:
- **Sticky System Directory (4 columns on desktop):** Streamlined directory of all 9 specifications (`SPEC-01` to `SPEC-09`) displaying spec IDs, category classification, live status telemetry, active state indicators, and project titles (with deeper details delegated to the adjacent inspection theatre).
- **Deep-Dive Inspection Theatre (8 columns on desktop):** Dedicated inspection stage pairing a hybrid media theatre (**Viewport + Visual Thumbnail Filmstrip** for Web specs; **3-Up Multi-Screen Triptych** for Mobile specs) with an executive system summary and comprehensive Technology Stack badges.

## Elevation & Depth

Depth is achieved primarily through **tonal layering** (`#09090b` canvas → `#121215` dossier surface → `#18181b` lifted callout/control) reinforced by crisp `1px solid #27272a` structural hairlines.

### Shadow Vocabulary
- **Device Stage Drop** (`box-shadow: 0 16px 36px -8px rgba(0, 0, 0, 0.7)`): Applied to portrait mobile device frames and floating lightbox viewports to separate screenshots from the dark stage backdrop.
- **Floating Dock Elevation** (`box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.85)`): Applied to the floating Impeccable Live variant switcher bar and modal dialogs.

### Named Rules
**The No-Halo Rule.** Never use zero-offset colored glow shadows (`0 0 8px`). All shadows must use vertical offset and dark ambient blur.

## Shapes

Crisp, architectural geometry with `4px` (`rounded`) to `6px` (`rounded-md`) corners on buttons, badges, and dossiers. Borders are strictly `1px` (`border-card-border`); never use thick colored left/right accent borders.

## Components

### Buttons
- **Shape:** Sharp architectural radius (`4px` / `rounded`).
- **Primary:** Solid Alabaster fill (`#fafafa`) with Obsidian text (`#09090b`), `10px 20px` padding, bold weight.
- **Secondary / Action:** Lifted Slate surface (`#18181b`) with `1px solid #27272a` border and Alabaster text (`#fafafa`), shifting to `#27272a` background and `#3f3f46` border on hover.

### Chips & Stack Badges
- **Style:** Monospace `12px` labels inside `#18181b` (`bg-lift`) with `1px solid #27272a` border and `6px 10px` padding.
- **State:** Interactive filter tabs highlight active selection with `#27272a` fill and `#fafafa` bold text.

### Project Dossiers & Media Stages
- **Corner Style:** `6px` (`rounded-md`) outer frame with `1px solid #27272a` border.
- **Background:** `#121215` (`bg-card-bg`) for narrative panels; `#09090b` (`bg-background`) with subtle radial/linear tonal depth for media stages.
- **Mobile Triptych Stage:** Displays up to 3 portrait screens side-by-side (`aspect-[9/19]`) with interactive selection so portrait mobile workflows fill horizontal stages naturally.
- **Contextual Caption Bar:** Persistent footer strip beneath every media stage displaying screen index (`01 / 05`), screen title,full architectural caption, and a `Fullscreen ⤢` trigger.

### Inputs / Fields
- **Style:** `1px solid #27272a` stroke on `#09090b` background with `4px` radius and `12px 16px` padding.
- **Focus:** Border shifts to `#3f3f46` with a `1px` ring.

## Do's and Don'ts

### Do:
- **Do** pair every project gallery with per-screen captions and deep engineering narrative (Problem Solved, Architecture Note, Capabilities, Tech Stack).
- **Do** present mobile portrait screenshots in multi-screen triptych stages or dedicated portrait viewports with filmstrips so they are large and legible.
- **Do** provide a 1-click Fullscreen Lightbox on every project image so evaluators can inspect fine UI details at full resolution.
- **Do** keep the Hero section clean, bold, and authoritative.

### Don't:
- **Don't** use a 3-column equal-card grid for Selected Work that shrinks screenshots and truncates project context to two lines.
- **Don't** place kickers or eyebrows above headings.
- **Don't** use decorative section numbers (`01 / 02 / 03`) where sequence carries no meaning.
- **Don't** use gradient text, thick colored side-borders, or zero-offset neon glow shadows.
