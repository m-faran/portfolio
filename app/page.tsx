"use client";

import React, { useState } from "react";

// Project Data Schema
interface Project {
  id: string;
  specId: string;
  title: string;
  tagline: string;
  category: "web3" | "mobile" | "web";
  categoryLabel: string;
  status: "live" | "testing";
  statusText: string;
  link: string;
  isExternalLink: boolean;
  summary: string;
  capabilities: string[];
  techStack: string[];
  architectureNote: string;
}

const PROJECTS: Project[] = [
  {
    id: "roaring-bulls",
    specId: "SPEC-01 // SOLANA",
    title: "Roaring Bulls",
    tagline: "Swipe-based tokenized equities trading platform on Solana",
    category: "web3",
    categoryLabel: "Web3 & Blockchain",
    status: "live",
    statusText: "LIVE DEMO",
    link: "https://roaring-bulls.vercel.app/",
    isExternalLink: true,
    summary:
      "A fast, non-custodial trading dApp allowing retail investors to invest in tokenized equities (TSLA, NVDA, SPY) and pre-IPO unicorns through fixed-budget swipe curation.",
    capabilities: [
      "Atomic 1-click execution bundling multiple basket swaps via Jupiter DEX router",
      "Non-custodial user onboarding with email/social login powered by Privy",
      "Three risk-tiered asset decks: Conservative (xStocks), Balanced (Pre-IPO), and Degen",
      "Hard budget lock guardrails preventing users from exceeding pre-set session limits",
    ],
    techStack: ["Solana", "Jupiter DEX API", "Privy Auth", "Next.js", "TypeScript", "Tailwind CSS"],
    architectureNote:
      "Engineered an atomic swap router that constructs and simulates Jupiter transaction batches on Solana Devnet, enforcing slippage limits and wallet balance verification prior to dispatch.",
  },
  {
    id: "chundrigar-capital",
    specId: "SPEC-02 // BASE SEPOLIA",
    title: "Chundrigar Capital",
    tagline: "Tokenized Pakistan Stock Exchange (KSE-100) shares on Base Sepolia",
    category: "web3",
    categoryLabel: "Web3 & Blockchain",
    status: "live",
    statusText: "LIVE DEMO",
    link: "https://chundrigar-capital.vercel.app/",
    isExternalLink: true,
    summary:
      "Decentralized securities platform enabling domestic and overseas investors to trade tokenized KSE-100 blue chips with dual currency settlement rails.",
    capabilities: [
      "Dual-rail settlement: native PKR pricing for local investors and USDC for diaspora",
      "Cryptographically signed on-chain price quotes ensuring tamper-proof execution",
      "Treasury direct-counterparty contract minting shares with a flat 0.50% fee structure",
      "Whitelist-governed ERC-20 transfer hooks complying with KYC verification states",
    ],
    techStack: ["Base Sepolia (EVM)", "Solidity", "Next.js", "Wagmi", "Viem", "RainbowKit"],
    architectureNote:
      "Implemented gas-optimized ERC-20 token contracts on Base with EIP-712 typed data signatures to verify off-chain exchange quote timestamps and prices before minting.",
  },
  {
    id: "devsafar",
    specId: "SPEC-03 // WEB PLATFORM",
    title: "DevSafar",
    tagline: "Global hackathon & coding competition discovery directory",
    category: "web",
    categoryLabel: "Web Applications",
    status: "live",
    statusText: "LIVE DEMO",
    link: "https://www.devsafar.app/",
    isExternalLink: true,
    summary:
      "Comprehensive developer portal tracking upcoming and live hackathons, CTFs, and tech tournaments with live countdowns and team recruitment.",
    capabilities: [
      "Real-time countdown engine tracking registration, submission, and judging deadlines",
      "Solo hacker matchmaking system connecting developers by complementary skill sets",
      "Free organizer pipeline with instant community listing validation",
      "Fast cached search indexing tournaments across regions and prize pools",
    ],
    techStack: ["Next.js", "Supabase", "PostgreSQL", "TypeScript", "Tailwind CSS"],
    architectureNote:
      "Built resilient Supabase edge queries with optimistic UI caching to handle deadline timers and concurrent team discovery requests with sub-100ms response times.",
  },
  {
    id: "kenzoku",
    specId: "SPEC-04 // REACT NATIVE",
    title: "Kenzoku",
    tagline: "Minimalist cross-platform mobile app with Japanese design principles",
    category: "mobile",
    categoryLabel: "Mobile Apps (React Native)",
    status: "testing",
    statusText: "CLOSED TESTING",
    link: "https://kenzoku.codekin.xyz/",
    isExternalLink: true,
    summary:
      "Cross-platform iOS and Android mobile application designed with serene Japanese minimalism, focusing on tactile gesture interaction and clutter-free utility.",
    capabilities: [
      "60fps gesture-driven navigation built on React Native Reanimated gesture handlers",
      "Offline-first client state with persistent local database cache",
      "Platform-native haptic feedback accompanying micro-interactions",
      "Smooth dark/light themes dynamically shifting with ambient lighting",
    ],
    techStack: ["React Native", "Expo EAS", "TypeScript", "Reanimated", "NativeWind"],
    architectureNote:
      "Structured the navigation shell to run entirely on the native UI thread, avoiding JS thread frame drops during complex gesture physics and screen transitions.",
  },
  {
    id: "ludo-elemental",
    specId: "SPEC-05 // MOBILE GAME",
    title: "Ludo Elemental",
    tagline: "Competitive multiplayer mobile board game with elemental power-ups",
    category: "mobile",
    categoryLabel: "Mobile Apps (React Native)",
    status: "testing",
    statusText: "CLOSED TESTING",
    link: "#",
    isExternalLink: false,
    summary:
      "Turn-based competitive mobile board game that augments classic Ludo mechanics with elemental abilities (Fire, Water, Earth, Wind) to create tactical multiplayer depth.",
    capabilities: [
      "Turn-based deterministic game state machine managing board physics and ability timers",
      "Multiplayer session synchronization with graceful disconnect/reconnect state recovery",
      "Tactical resource management replacing pure dice rolls with strategic cooldowns",
      "Custom mobile sound design and elemental visual effects optimized for battery efficiency",
    ],
    techStack: ["React Native", "Game State Machine", "TypeScript", "Mobile Sound FX"],
    architectureNote:
      "Designed a pure deterministic state transition engine running client-side with rollback reconciliation, ensuring cross-platform synchronization between iOS and Android players.",
  },
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<"all" | "web3" | "mobile" | "web">("all");
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [placeholderModal, setPlaceholderModal] = useState<string | null>(null);

  // Contact Form State
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    category: "Full MVP Development",
    budget: "$2,000 - $5,000",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const filteredProjects =
    activeCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  const toggleExpand = (id: string) => {
    setExpandedCardId((prev) => (prev === id ? null : id));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      return;
    }
    setFormSubmitting(true);
    setTimeout(() => {
      setFormSubmitting(false);
      setFormSubmitted(true);
    }, 600);
  };

  return (
    <div className="relative min-h-screen bg-[#09090b] text-[#fafafa] flex flex-col">
      {/* Top Engineering Masthead */}
      <header className="sticky top-0 z-40 border-b border-[#27272a] bg-[#09090b]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Logo & Availability Status */}
          <div className="flex items-center gap-4">
            <a
              href="#top"
              className="flex items-center gap-2.5 font-mono text-sm font-semibold tracking-wider text-[#fafafa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
            >
              <span className="flex h-7 w-7 items-center justify-center border border-[#3f3f46] bg-[#18181b] text-xs font-bold text-emerald-400">
                F
              </span>
              <span className="tracking-widest">FARAN</span>
            </a>

            <div className="hidden items-center gap-2 border-l border-[#27272a] pl-4 sm:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[11px] font-medium tracking-wide text-[#a1a1aa] uppercase">
                Available for Q4 MVPs & Freelance
              </span>
            </div>
          </div>

          {/* Quick Nav Anchors */}
          <nav aria-label="Main Navigation" className="flex items-center gap-1 sm:gap-6">
            <a
              href="#projects"
              className="px-2.5 py-1.5 text-xs font-medium text-[#a1a1aa] transition-colors hover:text-[#fafafa] focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
            >
              Projects
            </a>
            <a
              href="#capabilities"
              className="px-2.5 py-1.5 text-xs font-medium text-[#a1a1aa] transition-colors hover:text-[#fafafa] focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
            >
              Capabilities
            </a>
            <a
              href="#contact"
              className="ml-2 inline-flex items-center justify-center border border-emerald-500/40 bg-emerald-950/20 px-3.5 py-1.5 font-mono text-xs font-semibold text-emerald-400 transition-colors hover:border-emerald-500 hover:bg-emerald-950/40 focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
            >
              Hire Me
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main id="top" className="flex-1 mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        {/* HERO SECTION */}
        <section aria-labelledby="hero-title" className="space-y-6 pb-12 sm:pb-16 border-b border-[#27272a]">
          {/* Main Headline */}
          <h1
            id="hero-title"
            className="text-3xl font-bold tracking-tight text-[#fafafa] sm:text-5xl sm:leading-[1.15] max-w-4xl"
          >
            Full-Stack & Mobile Engineer. Taking Web3 dApps, React Native apps, and web platforms from zero to production deployment.
          </h1>

          {/* Value Proposition */}
          <p className="max-w-2xl text-base leading-relaxed text-[#a1a1aa] sm:text-lg">
            I partner with founders, agency leads, and Upwork & Fiverr clients to design, architect, and deliver autonomous software solutions with clean architecture, verified contracts, and responsive UI.
          </p>

          {/* Action Row: Platforms & Direct CTA */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {/* Upwork Profile Button */}
            <button
              type="button"
              onClick={() => setPlaceholderModal("Upwork")}
              className="inline-flex items-center gap-2 border border-[#27272a] bg-[#121215] px-4 py-2 font-mono text-xs font-medium text-[#fafafa] transition-colors hover:border-[#3f3f46] hover:bg-[#18181b] focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
            >
              <svg className="h-3.5 w-3.5 text-emerald-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-3.327 0-5.466 2.217-6.079 4.887l-.023.097-2.091 9.897H7.319l1.83-8.653c.121-.572.038-1.171-.232-1.688-.27-.517-.732-.898-1.298-1.071L2.4 7.618l-.513 2.427 4.197.886-.713 3.371H2.4l-.513 2.427h3.003L3.398 22h3.079l1.492-7.05h1.974l-2.09 9.895h3.05l1.884-8.918c.954.73 2.083 1.157 3.284 1.233l.49.029.08-.485c.045-.274.07-.552.07-.833 0-4.411-3.589-8-8-8z" />
              </svg>
              <span>Hire on Upwork</span>
            </button>

            {/* Fiverr Profile Button */}
            <button
              type="button"
              onClick={() => setPlaceholderModal("Fiverr")}
              className="inline-flex items-center gap-2 border border-[#27272a] bg-[#121215] px-4 py-2 font-mono text-xs font-medium text-[#fafafa] transition-colors hover:border-[#3f3f46] hover:bg-[#18181b] focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
            >
              <svg className="h-3.5 w-3.5 text-emerald-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22.5 12c0 5.799-4.701 10.5-10.5 10.5S1.5 17.799 1.5 12 6.201 1.5 12 1.5 22.5 6.201 22.5 12zM9.54 16.5h1.92V9.6H9.54v6.9zm-1.8-6.9H5.82v1.5h1.92v5.4H9.6v-5.4H11.4V9.6H9.6V8.16c0-.54.36-.78.78-.78h1.02V5.7H9.84c-1.5 0-2.1.84-2.1 2.16V9.6zm8.82 2.76h1.92c-.12-1.38-.96-2.16-2.16-2.16-1.5 0-2.34 1.14-2.34 2.82 0 1.62.84 2.82 2.4 2.82 1.14 0 1.98-.66 2.16-1.8h-1.92c-.12.42-.48.66-.78.66-.54 0-.84-.42-.84-1.2h3.54v-.48c0-.24 0-.48-.06-.66zm-1.98-.6c0-.6.3-.96.72-.96.42 0 .72.36.78.96h-1.5z" />
              </svg>
              <span>Hire on Fiverr</span>
            </button>

            {/* Download Resume Placeholder */}
            <button
              type="button"
              onClick={() => setPlaceholderModal("Resume")}
              className="inline-flex items-center gap-2 border border-[#27272a] bg-[#121215] px-4 py-2 font-mono text-xs font-medium text-[#fafafa] transition-colors hover:border-[#3f3f46] hover:bg-[#18181b] focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
            >
              <svg className="h-3.5 w-3.5 text-[#a1a1aa]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Download Resume</span>
            </button>

            {/* Direct Inquiry Anchor */}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-emerald-500 bg-emerald-500 px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[#09090b] transition-all hover:bg-emerald-400 focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
            >
              <span>Start a Project</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        {/* PROJECT SHOWCASE SECTION */}
        <section id="projects" aria-labelledby="projects-title" className="pt-12 sm:pt-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between pb-8">
            <div>
              <h2 id="projects-title" className="text-2xl font-bold tracking-tight text-[#fafafa] sm:text-3xl">
                Featured Engineering Work
              </h2>
              <p className="mt-2 text-sm text-[#a1a1aa] max-w-xl">
                Production-deployed dApps, full-stack platforms, and closed-test React Native mobile applications. Click any card for technical architecture.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div
              role="tablist"
              aria-label="Filter projects by category"
              className="inline-flex flex-wrap items-center gap-1 border border-[#27272a] bg-[#121215] p-1 rounded"
            >
              <button
                role="tab"
                aria-selected={activeCategory === "all"}
                onClick={() => setActiveCategory("all")}
                className={`px-3 py-1.5 font-mono text-xs font-medium transition-colors rounded ${
                  activeCategory === "all"
                    ? "bg-[#27272a] text-[#fafafa]"
                    : "text-[#a1a1aa] hover:text-[#fafafa]"
                }`}
              >
                ALL (5)
              </button>
              <button
                role="tab"
                aria-selected={activeCategory === "web3"}
                onClick={() => setActiveCategory("web3")}
                className={`px-3 py-1.5 font-mono text-xs font-medium transition-colors rounded ${
                  activeCategory === "web3"
                    ? "bg-[#27272a] text-[#fafafa]"
                    : "text-[#a1a1aa] hover:text-[#fafafa]"
                }`}
              >
                WEB3 & BLOCKCHAIN (2)
              </button>
              <button
                role="tab"
                aria-selected={activeCategory === "mobile"}
                onClick={() => setActiveCategory("mobile")}
                className={`px-3 py-1.5 font-mono text-xs font-medium transition-colors rounded ${
                  activeCategory === "mobile"
                    ? "bg-[#27272a] text-[#fafafa]"
                    : "text-[#a1a1aa] hover:text-[#fafafa]"
                }`}
              >
                MOBILE (2)
              </button>
              <button
                role="tab"
                aria-selected={activeCategory === "web"}
                onClick={() => setActiveCategory("web")}
                className={`px-3 py-1.5 font-mono text-xs font-medium transition-colors rounded ${
                  activeCategory === "web"
                    ? "bg-[#27272a] text-[#fafafa]"
                    : "text-[#a1a1aa] hover:text-[#fafafa]"
                }`}
              >
                WEB APPS (1)
              </button>
            </div>
          </div>

          {/* Modular Grid of Project Spec Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filteredProjects.map((project) => {
              const isExpanded = expandedCardId === project.id;
              return (
                <article
                  key={project.id}
                  className="group relative flex flex-col justify-between border border-[#27272a] bg-[#121215] p-5 sm:p-6 transition-all hover:border-[#3f3f46] hover:bg-[#151518] rounded"
                >
                  <div className="space-y-4">
                    {/* Spec Header Line */}
                    <div className="flex items-center justify-between border-b border-[#27272a] pb-3 text-xs">
                      <span className="font-mono font-medium tracking-wider text-[#a1a1aa]">
                        {project.specId}
                      </span>
                      {project.status === "live" ? (
                        <span className="inline-flex items-center gap-1.5 border border-emerald-500/30 bg-emerald-950/20 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                          {project.statusText}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 border border-amber-500/30 bg-amber-950/20 px-2 py-0.5 font-mono text-[10px] font-semibold text-amber-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
                          {project.statusText}
                        </span>
                      )}
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h3 className="text-xl font-bold tracking-tight text-[#fafafa]">
                        {project.title}
                      </h3>
                      <p className="mt-1 font-mono text-xs text-emerald-400">
                        {project.tagline}
                      </p>
                    </div>

                    {/* 1-Sentence Plain-English Summary */}
                    <p className="text-sm leading-relaxed text-[#a1a1aa]">
                      {project.summary}
                    </p>

                    {/* Key Capabilities Delivered */}
                    <div className="space-y-1.5 pt-1">
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#71717a]">
                        Key Capabilities Delivered:
                      </p>
                      <ul className="space-y-1 text-xs text-[#a1a1aa]">
                        {project.capabilities.map((cap, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-emerald-500 select-none">›</span>
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Compact-to-Expanded Technical Disclosure (Miura-Fold Raise) */}
                    {isExpanded && (
                      <div className="border-t border-[#27272a] pt-3 text-xs space-y-2">
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                          Engineering Architecture:
                        </p>
                        <p className="text-[#a1a1aa] leading-relaxed font-mono text-[11px] bg-[#09090b] p-3 border border-[#27272a] rounded">
                          {project.architectureNote}
                        </p>
                      </div>
                    )}

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="border border-[#27272a] bg-[#18181b] px-2 py-0.5 font-mono text-[10px] text-[#a1a1aa]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="mt-6 flex items-center justify-between border-t border-[#27272a] pt-4">
                    <button
                      type="button"
                      onClick={() => toggleExpand(project.id)}
                      className="font-mono text-xs text-[#a1a1aa] hover:text-[#fafafa] transition-colors inline-flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
                    >
                      <span>{isExpanded ? "Collapse Specs" : "Expand Specs"}</span>
                      <span aria-hidden="true">{isExpanded ? "↑" : "↓"}</span>
                    </button>

                    {project.isExternalLink ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
                      >
                        <span>Launch App</span>
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    ) : (
                      <span className="font-mono text-xs text-amber-400/80">
                        In Closed Testing
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* CAPABILITIES & DELIVERY MODEL */}
        <section
          id="capabilities"
          aria-labelledby="capabilities-title"
          className="mt-16 sm:mt-24 border-t border-[#27272a] pt-12 sm:pt-16"
        >
          <div className="max-w-2xl">
            <h2 id="capabilities-title" className="text-2xl font-bold tracking-tight text-[#fafafa] sm:text-3xl">
              Engineering Capabilities & Delivery Model
            </h2>
            <p className="mt-2 text-sm text-[#a1a1aa]">
              How I help non-technical startup founders, agency leads, and clients bring products from initial concept to live production.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {/* Pillar 1 */}
            <div className="border border-[#27272a] bg-[#121215] p-6 space-y-3 rounded">
              <span className="font-mono text-xs font-bold text-emerald-400 tracking-wider">
                01 // END-TO-END MVPs
              </span>
              <h3 className="text-lg font-bold text-[#fafafa]">Zero-to-Launch Web Platforms</h3>
              <p className="text-xs leading-relaxed text-[#a1a1aa]">
                Complete product architecture from schema design and authentication to responsive frontend and cloud CI/CD. Designed for rapid iteration without architectural debt.
              </p>
              <div className="pt-2 font-mono text-[10px] text-[#71717a]">
                Next.js · React 19 · TypeScript · Supabase · Tailwind
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="border border-[#27272a] bg-[#121215] p-6 space-y-3 rounded">
              <span className="font-mono text-xs font-bold text-emerald-400 tracking-wider">
                02 // CROSS-PLATFORM MOBILE
              </span>
              <h3 className="text-lg font-bold text-[#fafafa]">React Native (iOS & Android)</h3>
              <p className="text-xs leading-relaxed text-[#a1a1aa]">
                Single codebase delivering native 60fps performance on both iOS and Android. Offline storage, gesture physics, native haptics, and App Store / Google Play submission.
              </p>
              <div className="pt-2 font-mono text-[10px] text-[#71717a]">
                React Native · Expo EAS · Reanimated · Offline Sync
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="border border-[#27272a] bg-[#121215] p-6 space-y-3 rounded">
              <span className="font-mono text-xs font-bold text-emerald-400 tracking-wider">
                03 // SMART CONTRACTS & dAPPS
              </span>
              <h3 className="text-lg font-bold text-[#fafafa]">Web3 & Blockchain Systems</h3>
              <p className="text-xs leading-relaxed text-[#a1a1aa]">
                Non-custodial user onboarding (Privy), DEX atomic swaps (Jupiter on Solana), and EVM smart contracts (Base) with verifiable on-chain price verification.
              </p>
              <div className="pt-2 font-mono text-[10px] text-[#71717a]">
                Solana · Base (EVM) · Jupiter SDK · Privy · Wagmi
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT & DIRECT INQUIRY SECTION */}
        <section
          id="contact"
          aria-labelledby="contact-title"
          className="mt-16 sm:mt-24 border-t border-[#27272a] pt-12 sm:pt-16 pb-12"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Left Column: Direct channels and platform links */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 id="contact-title" className="text-2xl font-bold tracking-tight text-[#fafafa] sm:text-3xl">
                  Start a Project Conversation
                </h2>
                <p className="mt-2 text-sm text-[#a1a1aa] leading-relaxed">
                  Available for fixed-scope MVP builds, mobile app development, and long-term contracting. Let’s talk about your requirements, timeline, and deliverables.
                </p>
              </div>

              {/* Status Box */}
              <div className="border border-[#27272a] bg-[#121215] p-4 space-y-2 rounded">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                  <span className="font-mono text-xs font-bold uppercase text-[#fafafa]">
                    Direct Freelance Engagement
                  </span>
                </div>
                <p className="text-xs text-[#a1a1aa] leading-relaxed">
                  Clients hire me directly or through escrow on Upwork and Fiverr for peace of mind. Every milestone has clear completion criteria.
                </p>
              </div>

              {/* Platform Badges */}
              <div className="space-y-3 pt-2">
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#71717a]">
                  Preferred Platforms:
                </p>
                <div className="flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPlaceholderModal("Upwork")}
                    className="flex items-center justify-between border border-[#27272a] bg-[#121215] px-4 py-3 text-xs font-medium text-[#fafafa] transition-colors hover:border-[#3f3f46] hover:bg-[#18181b] rounded text-left"
                  >
                    <span className="font-semibold">Upwork Profile</span>
                    <span className="font-mono text-xs text-emerald-400">Verified Platform ›</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlaceholderModal("Fiverr")}
                    className="flex items-center justify-between border border-[#27272a] bg-[#121215] px-4 py-3 text-xs font-medium text-[#fafafa] transition-colors hover:border-[#3f3f46] hover:bg-[#18181b] rounded text-left"
                  >
                    <span className="font-semibold">Fiverr Profile</span>
                    <span className="font-mono text-xs text-emerald-400">Verified Platform ›</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlaceholderModal("Resume")}
                    className="flex items-center justify-between border border-[#27272a] bg-[#121215] px-4 py-3 text-xs font-medium text-[#fafafa] transition-colors hover:border-[#3f3f46] hover:bg-[#18181b] rounded text-left"
                  >
                    <span className="font-semibold">Technical Resume</span>
                    <span className="font-mono text-xs text-[#a1a1aa]">PDF Asset ›</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Direct Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="border border-[#27272a] bg-[#121215] p-6 sm:p-8 rounded">
                {formSubmitted ? (
                  <div className="space-y-4 py-8 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-950/40 border border-emerald-500 text-emerald-400">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[#fafafa]">Inquiry Received</h3>
                    <p className="text-sm text-[#a1a1aa] max-w-md mx-auto">
                      Thank you for reaching out, {formState.name}. I typically review and reply to project scopes within 24 hours.
                    </p>
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setFormSubmitted(false);
                          setFormState({
                            name: "",
                            email: "",
                            category: "Full MVP Development",
                            budget: "$2,000 - $5,000",
                            message: "",
                          });
                        }}
                        className="font-mono text-xs text-emerald-400 hover:underline"
                      >
                        Send another note
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    <h3 className="text-lg font-bold text-[#fafafa]">Direct Project Inquiry</h3>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label htmlFor="client-name" className="font-mono text-xs font-medium text-[#a1a1aa]">
                          Your Name *
                        </label>
                        <input
                          id="client-name"
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          placeholder="e.g. Alex Miller"
                          className="w-full border border-[#27272a] bg-[#09090b] px-3.5 py-2.5 text-xs text-[#fafafa] placeholder-[#71717a] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="client-email" className="font-mono text-xs font-medium text-[#a1a1aa]">
                          Email Address *
                        </label>
                        <input
                          id="client-email"
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          placeholder="name@company.com"
                          className="w-full border border-[#27272a] bg-[#09090b] px-3.5 py-2.5 text-xs text-[#fafafa] placeholder-[#71717a] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label htmlFor="project-category" className="font-mono text-xs font-medium text-[#a1a1aa]">
                          Project Scope
                        </label>
                        <select
                          id="project-category"
                          value={formState.category}
                          onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                          className="w-full border border-[#27272a] bg-[#09090b] px-3 py-2.5 text-xs text-[#fafafa] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded"
                        >
                          <option>Full MVP Development</option>
                          <option>Cross-Platform Mobile App (React Native)</option>
                          <option>Web3 / dApp Engineering</option>
                          <option>Frontend / Architecture Overhaul</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="project-budget" className="font-mono text-xs font-medium text-[#a1a1aa]">
                          Target Budget Range
                        </label>
                        <select
                          id="project-budget"
                          value={formState.budget}
                          onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                          className="w-full border border-[#27272a] bg-[#09090b] px-3 py-2.5 text-xs text-[#fafafa] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded"
                        >
                          <option>$1,000 - $2,500</option>
                          <option>$2,500 - $5,000</option>
                          <option>$5,000 - $10,000</option>
                          <option>$10,000+</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="project-message" className="font-mono text-xs font-medium text-[#a1a1aa]">
                        Project Summary & Goals *
                      </label>
                      <textarea
                        id="project-message"
                        required
                        rows={4}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Describe the product, desired timeline, and key features needed..."
                        className="w-full border border-[#27272a] bg-[#09090b] px-3.5 py-2.5 text-xs text-[#fafafa] placeholder-[#71717a] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="w-full border border-emerald-500 bg-emerald-500 px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-[#09090b] transition-all hover:bg-emerald-400 focus-visible:ring-2 focus-visible:ring-emerald-500 rounded disabled:opacity-50"
                    >
                      {formSubmitting ? "Dispatching Message..." : "Submit Project Scope →"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#27272a] bg-[#09090b] py-8 text-xs text-[#71717a]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2 font-mono">
            <span className="font-bold text-[#fafafa]">FARAN</span>
            <span>•</span>
            <span>Full-Stack & Mobile Software Engineer</span>
          </div>

          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span>Next.js 16 + React 19 + Tailwind v4</span>
            <span>•</span>
            <span className="text-emerald-400">All Systems Operational</span>
          </div>
        </div>
      </footer>

      {/* PLACEHOLDER MODAL FOR UPWORK / FIVERR / RESUME */}
      {placeholderModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <div className="w-full max-w-md border border-[#27272a] bg-[#121215] p-6 space-y-4 rounded shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#27272a] pb-3">
              <span className="font-mono text-xs font-bold text-emerald-400 uppercase">
                {placeholderModal} Placeholder
              </span>
              <button
                type="button"
                onClick={() => setPlaceholderModal(null)}
                className="font-mono text-xs text-[#a1a1aa] hover:text-[#fafafa] p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-[#a1a1aa] leading-relaxed">
              This button is reserved as a direct link for your official <strong>{placeholderModal}</strong> endpoint. When you supply your link or resume file, it will connect directly.
            </p>

            <div className="border border-[#27272a] bg-[#09090b] p-3 font-mono text-xs text-emerald-400">
              STATUS: Placeholder Reserved in PRODUCT.md
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPlaceholderModal(null)}
                className="border border-[#27272a] bg-[#18181b] px-4 py-2 font-mono text-xs text-[#fafafa] hover:bg-[#27272a] rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
