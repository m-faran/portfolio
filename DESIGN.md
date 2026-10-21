---
name: Faran Portfolio
description: High-density modular production datasheet for an autonomous full-stack and mobile engineer
colors:
  primary: "#10b981"
  primary-hover: "#059669"
  warning: "#f59e0b"
  surface-ground: "#09090b"
  surface-card: "#121215"
  surface-hover: "#151518"
  border-subtle: "#27272a"
  border-hover: "#3f3f46"
  text-high: "#fafafa"
  text-muted: "#a1a1aa"
  text-subtle: "#71717a"
typography:
  display:
    fontFamily: "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.25rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body:
    fontFamily: "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  mono:
    fontFamily: "var(--font-geist-mono), ui-monospace, SFMono-Regular, SF Mono, Menlo, Monaco, Consolas, Liberation Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.05em"
rounded:
  sm: "4px"
  md: "6px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface-ground}"
    rounded: "{rounded.sm}"
    padding: "8px 20px"
  card-spec:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text-high}"
    rounded: "{rounded.sm}"
    padding: "24px"
---

# Design System: Faran Portfolio

## Overview

**Creative North Star: "The Production Component Datasheet"**

The visual language of an autonomous, product-minded engineer whose work speaks through verified software artifacts rather than commercial hyperbole. Grounded in the discipline of precision engineering component manifests and architectural specifications, the interface communicates total competence, high data density, and zero decorative noise.

Surfaces exist on a deep charcoal ground with razor-thin hairline borders separating modular modules. Content is structured into scannable specifications: technical IDs, plain-English value propositions, delivered capabilities, and verified operational states. Every element serves an authentic function.

**Key Characteristics:**
- Disciplined monochromatic dark palette punctuated only by functional status indicators (Emerald for Live, Amber for Closed Testing).
- High-contrast, scannable typographic hierarchy pairing robust grotesque display with precision monospace metadata.
- Modular component containers with hairline boundary definitions (1px solid borders) and subtle tonal lifts.
- Sub-200ms functional micro-interactions; zero distracting floating blobs, parallax drags, or slow page transitions.

## Colors

A restrained monochromatic dark palette with solitary, high-signal operational status accents.

### Primary
- **Signal Emerald** (`#10b981`): Reserved strictly for verified operational truth—live demo pills, active pulses, and primary project dispatch actions.
- **Emerald Deep Hover** (`#059669`): Interactive hover state for primary action buttons.

### Secondary
- **Operational Amber** (`#f59e0b`): Reserved exclusively for in-progress or gated states (Closed Testing Beta).

### Neutral
- **Deep Carbon Ground** (`#09090b`): Primary canvas ground, providing an immersive, high-contrast backdrop.
- **Datasheet Surface Card** (`#121215`): Modular container surface, slightly lifted from ground.
- **Hover Surface** (`#151518`): Interactive card hover background.
- **Hairline Border** (`#27272a`): Technical 1px boundary separating sections and modules.
- **High-Contrast Text** (`#fafafa`): Headings, card titles, and primary readable labels.
- **Muted Body Text** (`#a1a1aa`): Descriptive summaries and delivered feature points (≥7.5:1 contrast ratio).
- **Subtle Monospace Text** (`#71717a`): Spec IDs, architectural notes, and secondary timestamps.

### Named Rules
**The Solitary Signal Rule.** Saturated color is never decorative. Emerald and Amber exist solely to communicate state (live vs testing) or direct conversion; no background gradients or decorative color floods are permitted.

## Typography

**Display & Body Font:** Geist Sans (`var(--font-geist-sans)`, with modern grotesque system fallback `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`)
**Metadata & Spec Font:** Geist Mono (`var(--font-geist-mono)`, with engineering monospace system fallback `ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", monospace`)

**Character:** Modern typographic precision: clear, authoritative sans-serif body text paired with disciplined monospace data points for specifications, categories, and IDs.

### Hierarchy
- **Display** (Bold 700, `clamp(2rem, 5vw, 3.25rem)`, line-height 1.15, tracking `-0.03em`): Hero positioning statement.
- **Headline** (Bold 700, `1.5rem` to `1.875rem`, line-height 1.25, tracking `-0.02em`): Section titles.
- **Title** (Bold 700, `1.25rem`, line-height 1.3): Project card titles.
- **Body** (Regular 400, `0.875rem` / 14px, line-height 1.6, max line length `65–75ch`): Summaries, feature lists, and explanations.
- **Label / Mono** (Medium 500, `0.6875rem` / 11px to `0.75rem` / 12px, tracking `0.05em`, uppercase where indicated): Spec IDs, status pills, category tabs, and tech tags.

### Named Rules
**The Spec Alignment Rule.** Monospace type is reserved exclusively for structured data: version numbers, module IDs (`SPEC-01`), tech tags, and operational states. Prose and narrative text must always use the grotesque body face.

## Layout

- **Grid Architecture**: 12-column responsive fluid grid with max-width container capped at `72rem` (1152px) for optimal scannability.
- **Project Grid**: 1-column stack on mobile viewports (<768px), transitioning cleanly into an egalitarian 2-column modular spec grid on desktop (≥768px).
- **Rhythm & Separation**: Generous section separation (64px to 96px) bounded by continuous 1px hairline divider rules (`#27272a`).

## Elevation & Depth

Surfaces rely on tonal contrast and hairline containment rather than decorative drop shadows.

- **Flat & Precise**: Surfaces are flat at rest with distinct background separation (`#09090b` canvas to `#121215` card).
- **Interactive Shift**: Card hover states slightly shift background tone to `#151518` and brighten border to `#3f3f46`, without aggressive displacement.
- **Modal Elevation**: High-focus dialogs use `backdrop-blur-sm` over `rgba(0,0,0,0.8)` with a 24px soft ambient shadow (`box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.75)`).

## Shapes

- **Corner Radii**: Tight, disciplined rounding: `rounded` (4px) for cards, tabs, and buttons; `rounded-full` reserved solely for circular pulse dots and modal close buttons.
- **Borders**: Continuous 1px solid hairline borders across all interactive boundaries; zero zero-blur block drop shadows or colored accent strips.

## Components

### Buttons
- **Shape**: Tight corner radius (4px).
- **Primary ("Start a Project")**: High-contrast emerald fill (`#10b981`), dark carbon text (`#09090b`), font-mono bold uppercase text, 150ms hover transition to `#34d399`.
- **Secondary (Platforms / Badges)**: Deep charcoal background (`#121215`), 1px hairline border (`#27272a`), inline SVG platform brand mark, hover lift to `#18181b` and border `#3f3f46`.

### Spec Cards
- **Structure**: Hairline bordered container (`#27272a`), 24px internal padding, top spec metadata line with status indicator, bold title, 1-line plain-English summary, delivered capability bullets, expandable architecture notes, and footer launch action.

### Status Indicators
- **Live Demo Pill**: Emerald border (`border-emerald-500/30`), subtle emerald tint background (`bg-emerald-950/20`), emerald text (`text-emerald-400`), solid 6px emerald circle.
- **Closed Testing Pill**: Amber border (`border-amber-500/30`), amber tint background (`bg-amber-950/20`), amber text (`text-amber-400`), solid 6px amber circle.

### Filter Tabs
- **Structure**: Unified segmented bar with hairline border, active tab receives solid lifted background (`bg-[#27272a]` with text `#fafafa`), inactive tabs render in muted `#a1a1aa`.

## Do's and Don'ts

### Do:
- **Do** maintain strict hairline borders (1px `#27272a`) across all container elements.
- **Do** verify contrast ratios exceed 4.5:1 for body copy and 3:1 for large display elements.
- **Do** keep animations strictly functional (150ms ease transitions on interactive hover/focus).
- **Do** explain technical achievements in terms of concrete delivered capabilities.

### Don't:
- **Don't** add decorative gradients to text or buttons.
- **Don't** add kickers or small eyebrow labels above primary section headings.
- **Don't** use emojis or unicode symbols in place of clean, consistent inline SVGs.
- **Don't** add fake testimonials or unverified marketing metrics.
- **Don't** use heavy blur or glassmorphism as surface decoration.
