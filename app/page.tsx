"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Project Data Schema
interface ProjectGalleryItem {
  url: string;
  label: string;
  caption: string;
  alt: string;
}

interface ProjectGithubLink {
  label: string;
  url: string;
}

interface Project {
  id: string;
  specId: string;
  title: string;
  tagline: string;
  category: "web3" | "mobile" | "web";
  categoryLabel: string;
  status: "live" | "testing";
  statusText: string;
  image: string;
  imageAlt: string;
  gallery?: ProjectGalleryItem[];
  link: string;
  isExternalLink: boolean;
  githubUrl?: string;
  githubLinks?: ProjectGithubLink[];
  githubPrivate?: boolean;
  problemSolved: string;
  summary: string;
  capabilities: { title: string; desc: string }[];
  techStack: string[];
  architectureNote: string;
}

// Pixel-perfect Brand Icon Components
function GithubIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function UpworkIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.545-1.142-2.547-2.548V3.592H.5v7.112c0 2.235 1.547 4.133 3.659 4.606v3.29h2.368v-3.328c.954.215 1.951.325 2.972.324 2.527 0 4.708-1.026 6.136-2.684l1.248 5.86h2.417l-1.776-8.344c.594-.658 1.054-1.442 1.332-2.327 1.455.978 3.193 1.559 5.063 1.559V10.74c-1.486 0-2.87-.492-3.999-1.322z" />
    </svg>
  );
}

function FiverrIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-.85c-.546 0-.84.41-.84 1.092v2.466h-1.61v-3.558h-.684c-.547 0-.84.41-.84 1.092v2.466h-1.61v-4.874h1.61v.74c.264-.574.626-.74 1.163-.74h1.972v.74c.264-.574.625-.74 1.162-.74h.527v1.316zm-6.786 1.501h-3.359c.088.546.43.858 1.006.858.43 0 .732-.175.83-.487l1.425.4c-.351.848-1.22 1.364-2.255 1.364-1.748 0-2.549-1.355-2.549-2.515 0-1.14.703-2.505 2.45-2.505 1.856 0 2.471 1.384 2.471 2.408 0 .224-.01.37-.02.477zm-1.562-.945c-.04-.42-.342-.81-.889-.81-.508 0-.81.225-.908.81h1.797zM7.508 15.44h1.416l1.767-4.874h-1.62l-.86 2.837-.878-2.837H5.72l1.787 4.874zm-6.6 0H2.51v-3.558h1.524v3.558h1.591v-4.874H2.51v-.302c0-.332.235-.536.606-.536h.918V8.412H2.85c-1.162 0-1.943.712-1.943 1.755v.4H0v1.316h.908v3.558z" />
    </svg>
  );
}

const PROJECTS: Project[] = [
  {
    id: "roaring-bulls",
    specId: "SPEC-01",
    title: "Roaring Bulls",
    tagline: "Swipe-based tokenized onchain (solana blockchain) stocks trading platform",
    category: "web",
    categoryLabel: "Web",
    status: "live",
    statusText: "LIVE",
    image: "/projects/roaring-bulls.png",
    imageAlt: "Roaring Bulls Solana tokenized equities trading platform screenshot",
    gallery: [
      {
        url: "/projects/roaring-bulls.png",
        label: "Overview",
        caption: "Terminal landing and live portfolio telemetry dashboard on Solana",
        alt: "Roaring Bulls Solana tokenized equities trading platform screenshot",
      },
      {
        url: "/projects/roaring-bulls-swipe.png",
        label: "Swipe Deck",
        caption: "Fixed-budget asset swipe allocation deck with Adobe xStock equity receipt and live basket cart",
        alt: "Roaring Bulls swipe-based equity curation deck and basket calculator",
      },
      {
        url: "/projects/roaring-bulls-tape.png",
        label: "Search The Tape",
        caption: "Searchable directory of 135+ tokenized equities (TSLA, NVDA, GOOGL) with real-time Jupiter DEX quotes",
        alt: "Roaring Bulls live tokenized equity tape with real-time market pricing",
      },
    ],
    link: "https://roaring-bulls.vercel.app/",
    isExternalLink: true,
    githubUrl: "https://github.com/m-faran/roaring-bulls",
    problemSolved:
      "Traditional stock trading is intimidating, rigid, and slow for modern retail investors. Roaring Bulls turns equity basket allocation into an intuitive, fixed-budget swipe ritual on Solana.",
    summary:
      "A fast, non-custodial trading dApp allowing retail investors to invest in tokenized equities (TSLA, NVDA, SPY) and pre-IPO unicorns through fixed-budget swipe curation.",
    capabilities: [
      {
        title: "Atomic 1-Click Execution",
        desc: "Packages multiple token swaps into a single atomic transaction routed via Jupiter DEX aggregator.",
      },
      {
        title: "Non-Custodial Login via Privy",
        desc: "Frictionless onboarding with embedded email/social authentication, eliminating seed-phrase anxiety.",
      },
      {
        title: "Curated Risk Tiers",
        desc: "Structured asset pools: Conservative (1:1 backed public xStocks), Balanced (Pre-IPO unicorns), and Degen (equity-paired memecoins).",
      },
      {
        title: "Session Budget Guardrails",
        desc: "Pre-set boundary locks ensuring users can never exceed their intended investment allocation.",
      },
    ],
    techStack: ["Solana", "Jupiter DEX API", "Privy Auth", "Next.js", "TypeScript", "Tailwind CSS"],
    architectureNote:
      "Engineered an atomic swap router that constructs and simulates Jupiter transaction batches on Solana Devnet, enforcing slippage limits and wallet balance verification prior to dispatch.",
  },
  {
    id: "chundrigar-capital",
    specId: "SPEC-02",
    title: "Chundrigar Capital",
    tagline: "Tokenized Pakistan Stock Exchange shares on Base Sepolia Blockchain",
    category: "web3",
    categoryLabel: "Web & Blockchain",
    status: "live",
    statusText: "LIVE",
    image: "/projects/chundrigar-capital.png",
    imageAlt: "Chundrigar Capital Pakistan Stock Exchange tokenized shares platform screenshot",
    gallery: [
      {
        url: "/projects/chundrigar-capital.png",
        label: "Overview",
        caption: "Decentralized securities exchange overview on Base Sepolia with dual currency settlement rails",
        alt: "Chundrigar Capital Pakistan Stock Exchange tokenized shares platform screenshot",
      },
      {
        url: "/projects/chundrigar-markets.png",
        label: "KSE-100 Markets",
        caption: "Full KSE-100 scrip directory with sector filters, index weights, market caps, and daily points",
        alt: "Chundrigar Capital KSE-100 index scrip working list and sector filters",
      },
      {
        url: "/projects/chundrigar-trade.png",
        label: "Trading Terminal",
        caption: "Individual scrip execution terminal (ABL) with historical candlesticks, PSX Data API, and dual SPKR/USDC rails",
        alt: "Chundrigar Capital Allied Bank trading terminal with candlestick chart and dual payment rails",
      },
      {
        url: "/projects/chundrigar-kyc.png",
        label: "Identity Check",
        caption: "Non-custodial identity compliance verification (CNIC, Passport, Driver Licence) for whitelisted wallet settlements",
        alt: "Chundrigar Capital investor identity verification and whitelist compliance step",
      },
      {
        url: "/projects/chundrigar-heritage.png",
        label: "Heritage",
        caption: "Architectural line illustration of Karachi's I.I. Chundrigar Road and Pakistan Stock Exchange financial district",
        alt: "Chundrigar Capital I.I. Chundrigar Road architectural landmark illustration",
      },
    ],
    link: "https://chundrigar-capital.vercel.app/",
    isExternalLink: true,
    githubUrl: "https://github.com/m-faran/chundrigar-capital",
    problemSolved:
      "Overseas diaspora and crypto-native investors face extreme banking barriers when trying to invest in high-yield emerging markets like the Pakistan Stock Exchange (PSX). Chundrigar Capital tokenizes KSE-100 equities on Base Sepolia with dual payment rails.",
    summary:
      "Decentralized securities platform enabling domestic and overseas investors to trade tokenized KSE-100 blue chips with dual currency settlement rails.",
    capabilities: [
      {
        title: "Dual Currency Rails",
        desc: "Native PKR pricing for local investors and direct USDC payment settlement for international investors.",
      },
      {
        title: "Signed On-Chain Quotes",
        desc: "Every price quote is signed off-chain and cryptographically validated on-chain to prevent front-running.",
      },
      {
        title: "Direct Treasury Counterparty",
        desc: "Automated minting and burning directly against treasury liquidity at a transparent 0.50% fee.",
      },
      {
        title: "Whitelist Compliance Hooks",
        desc: "ERC-20 transfer hooks enforcing investor verification and regulatory compliance per jurisdiction.",
      },
    ],
    techStack: ["Base Sepolia (EVM)", "Solidity", "Next.js", "Wagmi", "Viem", "RainbowKit"],
    architectureNote:
      "Implemented gas-optimized ERC-20 token contracts on Base with EIP-712 typed data signatures to verify off-chain exchange quote timestamps and prices before minting.",
  },
  {
    id: "devsafar",
    specId: "SPEC-03",
    title: "DevSafar",
    tagline: "Global hackathon & coding competition discovery directory",
    category: "web",
    categoryLabel: "Web",
    status: "live",
    statusText: "LIVE",
    image: "/projects/devsafar-hero.png",
    imageAlt: "DevSafar hackathon discovery directory and team recruitment portal screenshot",
    gallery: [
      {
        url: "/projects/devsafar-hero.png",
        label: "Landing Portal",
        caption: "Public developer tournament portal tracking live hackathons, CTFs, and coding competitions",
        alt: "DevSafar hackathon discovery directory and team recruitment portal screenshot",
      },
      {
        url: "/projects/devsafar-dashboard.png",
        label: "Platform Shell",
        caption: "Authenticated developer console with left-sidebar navigation (Track, Find Team, Chat, Alerts) and aggregated event feeds",
        alt: "DevSafar authenticated web application console with sidebar navigation",
      },
      {
        url: "/projects/devsafar-directory.png",
        label: "Event Directory",
        caption: "Comprehensive discovery feed indexing 3,870+ worldwide hackathons with prize pool tracking and registration gates",
        alt: "DevSafar hackathon directory with status filters and prize pools",
      },
    ],
    link: "https://www.devsafar.app/",
    isExternalLink: true,
    githubPrivate: true,
    problemSolved:
      "Developers struggle to discover upcoming hackathons across scattered platforms and frequently fail to participate due to missing teammates. DevSafar aggregates tournaments worldwide with live deadline countdowns and built-in team matchmaking.",
    summary:
      "Comprehensive developer portal tracking upcoming and live hackathons, CTFs, and tech tournaments with live countdowns and team recruitment.",
    capabilities: [
      {
        title: "Live Deadline Countdowns",
        desc: "Real-time synchronization tracking registration cutoffs, submission gates, and judging windows.",
      },
      {
        title: "Teammate Matchmaking",
        desc: "Skill-based matchmaking filters allowing solo developers to recruit complementary frontend, backend, or design peers.",
      },
      {
        title: "Free Community Submissions",
        desc: "Automated organizer submission pipeline with edge validation and instant community directory listing.",
      },
      {
        title: "High-Performance Aggregation",
        desc: "Aggregates events across 100+ global platforms with sub-100ms client search and filter queries.",
      },
    ],
    techStack: ["Next.js", "Supabase", "PostgreSQL", "TypeScript", "Tailwind CSS"],
    architectureNote:
      "Built resilient Supabase edge queries with optimistic UI caching to handle deadline timers and concurrent team discovery requests with sub-100ms response times.",
  },
  {
    id: "ludo-elemental",
    specId: "SPEC-04",
    title: "Ludo Elemental",
    tagline: "Multiplayer mobile board game with elemental power-ups",
    category: "mobile",
    categoryLabel: "Mobile",
    status: "testing",
    statusText: "PLAYSTORE CLOSED TESTING",
    image: "/projects/ludo-elemental.png",
    imageAlt: "Ludo Elemental mobile game splash screen with elemental dice and power tokens",
    gallery: [
      {
        url: "/projects/ludo-elemental.png",
        label: "Splash Screen",
        caption: "Initial game loading splash featuring elemental dice and power tokens",
        alt: "Ludo Elemental loading screen with element tokens",
      },
      {
        url: "/projects/ludo-elemental-board.png",
        label: "Game Board",
        caption: "In-game turn-based match with elemental pawn temples and cooldown meters",
        alt: "Ludo Elemental active game board screenshot with pawns and power meters",
      },
      {
        url: "/projects/ludo-elemental-shop.png",
        label: "Cosmetic Shop",
        caption: "In-game store for unlocked boards (Classic, Anime Dream, Cyber Neon)",
        alt: "Ludo Elemental cosmetic shop screenshot showing board skins",
      },
      {
        url: "/projects/ludo-elemental-party.png",
        label: "Party Lobby",
        caption: "Private room creation and alphanumeric party code sharing",
        alt: "Ludo Elemental party code and room creation screen",
      },
      {
        url: "/projects/ludo-elemental-matchmaking.png",
        label: "Matchmaking",
        caption: "Real-time 4-player online matchmaking queue with seat indicators",
        alt: "Ludo Elemental online multiplayer matchmaking search screen",
      },
      {
        url: "/projects/ludo-elemental-settings.png",
        label: "Settings",
        caption: "Account connectivity, Google Sign-In, and ambient elemental lofi audio sliders",
        alt: "Ludo Elemental settings screen with audio and player account controls",
      },
    ],
    link: "#",
    isExternalLink: false,
    githubPrivate: true,
    problemSolved:
      "Classic board games rely almost entirely on passive dice rolls, leading to repetitive matches. Ludo Elemental injects tactical skill and strategy through deployable elemental abilities.",
    summary:
      "Turn-based competitive mobile board game augmenting classic Ludo mechanics with elemental abilities (Fire, Water, Earth, Wind) to create tactical multiplayer depth.",
    capabilities: [
      {
        title: "Deterministic Game State Engine",
        desc: "Custom turn-based state machine managing board physics, cooldown counters, and token movements.",
      },
      {
        title: "Multiplayer Reconnect Sync",
        desc: "State reconciliation recovering dropped mobile connections seamlessly without match abandonment.",
      },
      {
        title: "Resource Skill Management",
        desc: "Tactical cooldown activations replacing pure dice rolls with strategic pawn shields and speed boosts.",
      },
    ],
    techStack: ["React Native", "Game State Machine", "TypeScript", "Mobile Sound FX"],
    architectureNote:
      "Designed a pure deterministic state transition engine running client-side with rollback reconciliation, ensuring cross-platform synchronization between iOS and Android players.",
  },
  {
    id: "kenzoku",
    specId: "SPEC-05",
    title: "Kenzoku",
    tagline: "Interests driven non romantic matchmaking app connecting people",
    category: "mobile",
    categoryLabel: "Mobile",
    status: "testing",
    statusText: "PLAYSTORE CLOSED TESTING",
    image: "/projects/kenzoku.png",
    imageAlt: "Kenzoku mobile app user discovery interface with passion matching tags",
    gallery: [
      {
        url: "/projects/kenzoku.png",
        label: "Discover Feed",
        caption: "Discovery deck: passion-matched recommendation cards with fluid Pass and Connect gestures",
        alt: "Kenzoku mobile app user discovery interface with passion matching tags",
      },
      {
        url: "/projects/kenzoku-interests.png",
        label: "Interests",
        caption: "Interest taxonomy: multi-select tags across chess, film photography, indie game dev, climbing, and robotics",
        alt: "Kenzoku interest tag selection interface",
      },
      {
        url: "/projects/kenzoku-profile-setup.png",
        label: "Profile Setup",
        caption: "Profile builder: custom short bio, location, and authentic passion verification",
        alt: "Kenzoku profile creation and bio setup screen",
      },
      {
        url: "/projects/kenzoku-chats.png",
        label: "Direct Chats",
        caption: "Direct messaging: private real-time peer conversation threads unlocked upon matching",
        alt: "Kenzoku direct peer messaging screen",
      },
      {
        url: "/projects/kenzoku-notifications.png",
        label: "Notifications",
        caption: "Connection center: incoming connection requests with instant Accept and Reject actions",
        alt: "Kenzoku connection requests and activity notifications screen",
      },
      {
        url: "/projects/kenzoku-welcome.png",
        label: "Welcome",
        caption: "Serene onboarding: Japanese-inspired branding, ninja emblem, and single-tap entry",
        alt: "Kenzoku onboarding welcome screen",
      },
      {
        url: "/projects/kenzoku-signup.png",
        label: "Create Account",
        caption: "Frictionless authentication: email and Google OAuth registration pipelines",
        alt: "Kenzoku account registration screen",
      },
      {
        url: "/projects/kenzoku-login.png",
        label: "Login",
        caption: "Secure login: returning user authentication with credential validation",
        alt: "Kenzoku user login and password recovery screen",
      },
    ],
    link: "#",
    isExternalLink: false,
    githubUrl: "https://github.com/m-faran/kenzoku",
    problemSolved:
      "Building genuine connections is fragmented across noisy social platforms driven by superficial metrics. Whether into chess, film photography, indie game development, rock climbing, or robotics, Kenzoku helps users discover their true inner circle based on authentic passions.",
    summary:
      "Cross-platform React Native community matchmaking app helping users build their true inner circle based on authentic passions—from robotics and indie game dev to chess and climbing—rather than superficial social metrics.",
    capabilities: [
      {
        title: "Passion-Vector Discovery",
        desc: "Matches users based on authentic passions (chess, film photography, indie game dev, rock climbing, robotics) with dynamic compatibility tags.",
      },
      {
        title: "60fps Card Gesture Physics",
        desc: "Tactile Pass and Connect gesture stack running directly on the native UI thread via Reanimated.",
      },
      {
        title: "Direct Real-Time Messaging",
        desc: "Instant encrypted peer chats unlocked upon mutual connection with push notifications.",
      },
    ],
    techStack: ["React Native", "Expo EAS", "TypeScript", "Reanimated", "NativeWind"],
    architectureNote:
      "Structured gesture interaction handlers entirely on the native UI thread, preventing JS thread frame drops during profile deck swipes and real-time transition physics.",
  },
  {
    id: "genie-markets",
    specId: "SPEC-06",
    title: "Genie Markets",
    tagline: "Decentralized onchain prediction protocol on Monad Testnet Blockchain",
    category: "web3",
    categoryLabel: "Web & Blockchain",
    status: "live",
    statusText: "LIVE",
    image: "/projects/genie-markets.png",
    imageAlt: "Genie Markets onchain prediction protocol landing page on Monad Testnet",
    gallery: [
      {
        url: "/projects/genie-markets.png",
        label: "Landing (Hero)",
        caption: "Genie Markets landing page hero section on Monad Testnet",
        alt: "Genie Markets landing page hero section",
      },
      {
        url: "/projects/genie-markets-terminal.png",
        label: "Terminal",
        caption: "Autonomous prediction terminal, onchain vault smart account interface, and protocol odds dashboard",
        alt: "Genie Markets live prediction terminal and onchain vault interface",
      },
      {
        url: "/projects/genie-markets-payouts.png",
        label: "Landing (Features)",
        caption: "Genie Markets landing page feature section with prediction tiers and execution pipeline",
        alt: "Genie Markets landing page feature section",
      },
      {
        url: "/projects/genie-markets-infrastructure.png",
        label: "Landing (Overview)",
        caption: "Genie Markets landing page overview of smart accounts, randomness, and call to action",
        alt: "Genie Markets landing page overview and call to action",
      },
    ],
    link: "https://geniemarkets.vercel.app/",
    isExternalLink: true,
    githubUrl: "https://github.com/m-faran/geniemarkets-frontend",
    githubLinks: [
      {
        label: "Frontend Repo",
        url: "https://github.com/m-faran/geniemarkets-frontend",
      },
      {
        label: "Protocol Contracts",
        url: "https://github.com/m-faran/genie-markets",
      },
    ],
    problemSolved:
      "Traditional prediction markets and gaming dApps rely on opaque off-chain randomness, incur high gas fees, and demand confusing seed phrases. Genie Markets brings sub-second verifiable randomness on Monad via Pyth Entropy with zero-gas account abstraction.",
    summary:
      "High-throughput onchain prediction protocol on Monad Testnet leveraging Pyth Entropy for cryptographic randomness, ERC-4337 zero-gas accounts, and automated USDC payouts up to 600x.",
    capabilities: [
      {
        title: "Pyth Entropy Oracles",
        desc: "Cryptographically verified, tamper-proof onchain randomness resolving 3-digit draws with sub-second finality.",
      },
      {
        title: "Zero-Gas Smart Accounts (ERC-4337)",
        desc: "Embedded Privy wallet onboarding sponsoring all gas fees, enabling immediate trading via social login without seed phrases.",
      },
      {
        title: "Structured Odds Multipliers",
        desc: "Single (9x), Exact Pair (90x), and Genie Trio (140x–600x) payout calculation models settled instantaneously in USDC.",
      },
      {
        title: "Non-Custodial Escrow & Recovery",
        desc: "Automated smart contract lockups with 24-hour permissionless stale round recovery to safeguard user capital.",
      },
    ],
    techStack: ["Monad Testnet", "Pyth Entropy", "Solidity", "Privy (ERC-4337)", "Next.js", "TypeScript", "Tailwind CSS"],
    architectureNote:
      "Engineered high-throughput settlement contracts on Monad EVM integrated directly with Pyth Entropy callback handlers, coupled with an ERC-4337 paymaster pipeline for fully sponsored user transactions.",
  },
];

interface SkillItem {
  name: string;
  icon: React.ReactNode;
}

interface SkillCategory {
  id: string;
  index: string;
  title: string;
  skills: SkillItem[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    index: "01",
    title: "Frontend",
    skills: [
      {
        name: "React",
        icon: (
          <svg viewBox="-11.5 -10.23 23 20.46" className="w-4 h-4 text-[#61DAFB]" fill="currentColor">
            <circle cx="0" cy="0" r="2.05" />
            <g stroke="currentColor" strokeWidth="1" fill="none">
              <ellipse rx="11" ry="4.2" />
              <ellipse rx="11" ry="4.2" transform="rotate(60)" />
              <ellipse rx="11" ry="4.2" transform="rotate(120)" />
            </g>
          </svg>
        ),
      },
      {
        name: "Next.js",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-foreground" fill="currentColor">
            <path d="M18.665 21.978a10 10 0 1 1 3.313-3.322l-8.665-11.127H10.5v8.942h1.666V10.15l7.165 9.183.003-.004c-.218.232-.442.456-.669.649zm-4.331-4.821l1.666 2.138A9.97 9.97 0 0 0 22 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10c2.04 0 3.93-.612 5.5-1.665l-3.166-4.178v1z" />
          </svg>
        ),
      },
      {
        name: "TypeScript",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
            <rect width="24" height="24" rx="4" fill="#3178C6" />
            <path d="M11.5 9H6v2h2.2v8h2.6v-8H13V9h-1.5zm6.8 3.5c-1.3-.4-2-.8-2-1.5 0-.7.6-1.1 1.6-1.1.9 0 1.7.3 2.3.7l.8-1.7c-.8-.6-1.9-.9-3.2-.9-2.3 0-3.9 1.3-3.9 3.2 0 1.8 1.2 2.7 3.1 3.3 1.4.5 1.8.9 1.8 1.6 0 .8-.8 1.3-1.9 1.3-1.2 0-2.3-.5-3.1-1.2l-.9 1.8c1 .8 2.4 1.3 3.9 1.3 2.6 0 4.3-1.3 4.3-3.4 0-1.9-1.2-2.9-2.8-3.4z" fill="#fff" />
          </svg>
        ),
      },
      {
        name: "JavaScript",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
            <rect width="24" height="24" rx="4" fill="#F7DF1E" />
            <path d="M7.5 18c-.8 0-1.5-.3-2-.7l.8-1.5c.3.3.7.5 1.2.5.6 0 1-.3 1-1V8.5H11v6.8c0 1.8-1.1 2.7-3.5 2.7zm8.5 0c-2.3 0-3.7-1.3-3.7-3.2l2.2-.1c.1 1 .8 1.5 1.6 1.5.8 0 1.4-.4 1.4-1 0-.7-.5-1-1.6-1.4-2.1-.7-3.3-1.4-3.3-3.1 0-1.8 1.4-3.2 3.6-3.2 1.8 0 3 .8 3.5 1.9l-1.9 1.1c-.3-.6-.8-1-1.6-1s-1.2.4-1.2 1c0 .6.4.9 1.4 1.3 2.3.8 3.5 1.6 3.5 3.3 0 2-1.6 3.4-3.9 3.4z" fill="#000" />
          </svg>
        ),
      },
      {
        name: "HTML",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
            <path d="M3 2l1.8 17.5L12 22l7.2-2.5L21 2H3zm14.8 5.7h-7.6l.2 2.3h7.2l-.6 6.3-4.6 1.3-4.6-1.3-.3-3.3h2.3l.1 1.5 2.5.7 2.5-.7.3-2.9H7.6l-.6-6.6h11l-.2 2.7z" fill="#E34F26" />
          </svg>
        ),
      },
      {
        name: "CSS",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
            <path d="M3 2l1.8 17.5L12 22l7.2-2.5L21 2H3zm13.7 5.7l-.3 3.3h-4.4v2.3h4.2l-.5 5.3-3.7 1-3.7-1-.3-2.7h2.3l.1 1.2 1.6.4 1.6-.4.2-2h-5.8l-.6-6.6h10.9z" fill="#1572B6" />
          </svg>
        ),
      },
      {
        name: "Tailwind CSS",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#38BDF8]" fill="currentColor">
            <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
          </svg>
        ),
      },
      {
        name: "Vite",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
            <path d="M21.5 3.5L12.7 20.8a.7.7 0 0 1-1.3 0L2.5 3.5a.7.7 0 0 1 .8-.9l8.4 1.5a.7.7 0 0 0 .3 0l8.7-1.5a.7.7 0 0 1 .8.9z" fill="#646CFF" />
            <path d="M14.6 3.3L8.8 13.5h3.6L10.3 20l7.3-10.7h-3.8l1.8-6h-1z" fill="#FFD43B" />
          </svg>
        ),
      },
      {
        name: "GSAP",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
            <rect width="24" height="24" rx="4" fill="#0AE448" />
            <path d="M12 4a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm2.8 11.6a4.8 4.8 0 0 1-5.6 0l1.2-1.6a2.8 2.8 0 0 0 3.2 0z" fill="#000" />
          </svg>
        ),
      },
      {
        name: "Three.js",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-foreground" fill="currentColor">
            <path d="M2.5 19.5L12 3l9.5 16.5H2.5zm3.2-1.8h12.6L12 6.2 5.7 17.7z" />
          </svg>
        ),
      },
      {
        name: "shadcn/ui",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-foreground" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 20L20 4M4 4h4v4H4z" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "backend-data",
    index: "02",
    title: "Backend and data",
    skills: [
      {
        name: "Node.js",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#5FA04E]" fill="currentColor">
            <path d="M12 2l9 5.2v10.4L12 22l-9-5.2V7.2L12 2zm0 2.3L4.8 8.5v7l7.2 4.2 7.2-4.2v-7L12 4.3z" />
          </svg>
        ),
      },
      {
        name: "Express",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-foreground" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 8h4M5 12h3M5 16h4M14 8l5 8M19 8l-5 8" />
          </svg>
        ),
      },
      {
        name: "Supabase",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#3ECF8E]" fill="currentColor">
            <path d="M13.4 22c-.6 0-1-.5-.8-1.1l2.4-7.9H4.8c-.7 0-1.2-.7-.9-1.3L11.5 2c.4-.7 1.4-.4 1.3.4l-2.2 7.6h9.6c.8 0 1.2.9.7 1.5L14.3 21.6c-.2.3-.5.4-.9.4z" />
          </svg>
        ),
      },
      {
        name: "PostgreSQL",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#336791]" fill="currentColor">
            <path d="M12 2C6.5 2 2 6.5 2 12c0 4.1 2.5 7.6 6.1 9.1.5.1.7-.2.7-.5v-1.8c-2.4.5-3-1-3-1-.4-1-1-1.3-1-1.3-.8-.5.1-.5.1-.5.9.1 1.4.9 1.4.9.8 1.4 2.1 1 2.6.8.1-.6.3-1 .6-1.2-2-.2-4.1-1-4.1-4.4 0-1 .4-1.8 1-2.4-.1-.2-.4-1.1.1-2.4 0 0 .8-.2 2.5.9.7-.2 1.5-.3 2.3-.3.8 0 1.6.1 2.3.3 1.7-1.1 2.5-.9 2.5-.9.5 1.3.2 2.2.1 2.4.6.6 1 1.4 1 2.4 0 3.4-2.1 4.2-4.1 4.4.3.3.6.8.6 1.7V20.5c0 .3.2.6.7.5C19.5 19.6 22 16.1 22 12c0-5.5-4.5-10-10-10z" />
          </svg>
        ),
      },
      {
        name: "Firebase",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
            <path d="M4.5 17.5L8.5 2.5l3.8 7.2L4.5 17.5zm15 0L17.7 5.2l-2.4 4.5 4.2 7.8zm-7.5 4.5l6.5-4.5-4-7.5-6.5 10 4 2z" fill="#FFA000" />
            <path d="M12 22l4-2-4-7.5-4 7.5 4 2z" fill="#FFCA28" />
          </svg>
        ),
      },
      {
        name: "MongoDB",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#47A248]" fill="currentColor">
            <path d="M12 1.5s-5.5 5.5-5.5 11c0 4.2 3.1 7.8 5.5 10 2.4-2.2 5.5-5.8 5.5-10 0-5.5-5.5-11-5.5-11zm-.1 18.8c-.3 0-.6-.3-.6-.6V4.8c.3.5.7 1.1 1.2 1.8v13.1c0 .3-.3.6-.6.6z" />
          </svg>
        ),
      },
      {
        name: "Prisma",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-foreground" fill="currentColor">
            <path d="M12.7 2.3a1 1 0 0 0-1.4 0L2.5 11.1a1 1 0 0 0 0 1.4l8.8 8.8a1 1 0 0 0 1.4 0l8.8-8.8a1 1 0 0 0 0-1.4L12.7 2.3zm-.7 2.4l6.6 6.6-6.6 6.6-6.6-6.6L12 4.7z" />
          </svg>
        ),
      },
      {
        name: "Redis",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#DC382D]" fill="currentColor">
            <path d="M21.4 8.7L12.6 4a1.4 1.4 0 0 0-1.2 0L2.6 8.7a1.4 1.4 0 0 0 0 2.6l8.8 4.7a1.4 1.4 0 0 0 1.2 0l8.8-4.7a1.4 1.4 0 0 0 0-2.6zM12 14.3L4.5 10.3 12 6.3l7.5 4-7.5 4zm9.4 1.4l-2 .9v2.2l2-.9v-2.2zm-4 1.7l-4.8 2.6a1.4 1.4 0 0 1-1.2 0L6.6 17.4v2.2l4.8 2.6c.4.2.8.2 1.2 0l4.8-2.6v-2.2z" />
          </svg>
        ),
      },
      {
        name: "Socket.io",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-foreground" fill="currentColor">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.5l-3-4.5h2.5V7.5l3 4.5H13v4.5z" />
          </svg>
        ),
      },
      {
        name: "Python",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
            <path d="M11.9 2c-3.1 0-2.9 1.3-2.9 1.3l.1 1.4h2.9v.4H6.7S4 4.8 4 8c0 3.1 1.7 3 1.7 3l.9-.1v-1.3c0-1.5 1.3-1.4 1.3-1.4h4.7s1.4 0 1.4-1.3V3.4S14.8 2 11.9 2zm-.9 1.2a.6.6 0 1 1 0 1.2.6.6 0 0 1 0-1.2z" fill="#3776AB" />
            <path d="M12.1 22c3.1 0 2.9-1.3 2.9-1.3l-.1-1.4h-2.9v-.4h5.3s2.7.3 2.7-2.9c0-3.1-1.7-3-1.7-3l-.9.1v1.3c0 1.5-1.3 1.4-1.3 1.4H11.4s-1.4 0-1.4 1.3v3.5s-.8 1.4 2.1 1.4zm.9-1.2a.6.6 0 1 1 0-1.2.6.6 0 0 1 0 1.2z" fill="#FFD43B" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "mobile-desktop",
    index: "03",
    title: "Mobile and desktop",
    skills: [
      {
        name: "Android",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#3DDC84]" fill="currentColor">
            <path d="M6 18c0 .5.4 1 1 1h1v3c0 .5.5 1 1 1s1-.5 1-1v-3h4v3c0 .5.5 1 1 1s1-.5 1-1v-3h1c.6 0 1-.5 1-1V9H6v9zm-3-8c-.5 0-1 .5-1 1v6c0 .5.5 1 1 1s1-.5 1-1v-6c0-.5-.5-1-1-1zm18 0c-.5 0-1 .5-1 1v6c0 .5.5 1 1 1s1-.5 1-1v-6c0-.5-.5-1-1-1zM15.5 3.8l1.2-1.2a.5.5 0 0 0-.7-.7l-1.3 1.3A7.3 7.3 0 0 0 12 3c-.9 0-1.8.1-2.7.2L8 1.9a.5.5 0 0 0-.7.7l1.2 1.2A5.8 5.8 0 0 0 6 8h12a5.8 5.8 0 0 0-2.5-4.2zM9 6a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4zm6 0a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4z" />
          </svg>
        ),
      },
      {
        name: "Expo",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-foreground" fill="currentColor">
            <path d="M4.5 4.5L12 12l7.5-7.5L21 6l-9 9-9-9 1.5-1.5zm0 7.5L12 19.5l7.5-7.5L21 13.5l-9 9-9-9 1.5-1.5z" />
          </svg>
        ),
      },
      {
        name: "Play Console",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
            <path d="M4 3.5v17l10-8.5L4 3.5z" fill="#00C1A0" />
            <path d="M14 12l3.5 3L4 20.5 14 12z" fill="#FF3A44" />
            <path d="M14 12L4 3.5 17.5 9 14 12z" fill="#00E676" />
            <path d="M17.5 9l3 2.5a1 1 0 0 1 0 1.5l-3 2-3.5-3 3.5-3z" fill="#FFC107" />
          </svg>
        ),
      },
      {
        name: "Electron",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#9FEAF9]" fill="none" stroke="currentColor" strokeWidth="1.5">
            <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(30 12 12)" />
            <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(-30 12 12)" />
            <circle cx="12" cy="12" r="1.8" fill="currentColor" />
          </svg>
        ),
      },
      {
        name: "Windows",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#0078D6">
            <path d="M3 5.5L10.5 4.5v6.5H3V5.5zm8.5-1.2L21 3v8H11.5V4.3zM3 13h7.5v6.5L3 18.5V13zm8.5 0H21v8l-9.5-1.3V13z" />
          </svg>
        ),
      },
      {
        name: "macOS",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-foreground" fill="currentColor">
            <path d="M18.7 19.5c-.8 1.2-1.7 2.4-3 2.4-1.3 0-1.7-.8-3.2-.8-1.5 0-2 .8-3.2.8-1.3 0-2.3-1.3-3.2-2.5-1.7-2.5-3-7.1-1.2-10.2 1-1.6 2.6-2.6 4.3-2.6 1.3 0 2.5.9 3.3.9.8 0 2.3-1.1 3.9-.9 1.4.1 2.6.6 3.4 1.7-3.1 1.7-2.6 5.8.5 7.1-.6 1.5-1.4 3-2.6 4.1zM15.4 4.5c.6-.8 1.1-2 1-3-.9.1-2.1.6-2.7 1.4-.6.7-1.1 1.9-.9 2.9 1.1.1 2-.5 2.6-1.3z" />
          </svg>
        ),
      },
      {
        name: "Linux",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#FCC624">
            <path d="M12 2C9.8 2 8 3.8 8 6v4c0 1.1-.9 2-2 2H5c-.6 0-1 .4-1 1 0 2.2 1.8 4 4 4h8c2.2 0 4-1.8 4-4 0-.6-.4-1-1-1h-1c-1.1 0-2-.9-2-2V6c0-2.2-1.8-4-4-4zm-1.5 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-1.5 2.5c.8 0 1.5.3 1.5.8s-.7.8-1.5.8-1.5-.3-1.5-.8.7-.8 1.5-.8zM7 18c-1.7 0-3 1.3-3 3 0 .6.4 1 1 1h14c.6 0 1-.4 1-1 0-1.7-1.3-3-3-3H7z" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "ai-media-scraping",
    index: "04",
    title: "AI, media and scraping",
    skills: [
      {
        name: "Claude",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#D97706]" fill="currentColor">
            <path d="M12 2l1.6 6.2L20 8l-4.8 4.6 3 6.4-6.2-2.5L7 22l1.2-6.8L3 11l6.4-.8L12 2z" />
          </svg>
        ),
      },
      {
        name: "Gemini",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#8E75FF]" fill="currentColor">
            <path d="M12 2C12 7.5 7.5 12 2 12c5.5 0 10 4.5 10 10 0-5.5 4.5-10 10-10-5.5 0-10-4.5-10-10z" />
          </svg>
        ),
      },
      {
        name: "Hugging Face",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#FFD21E]" fill="currentColor">
            <circle cx="12" cy="12" r="10" />
            <circle cx="8.5" cy="10.5" r="1.5" fill="#000" />
            <circle cx="15.5" cy="10.5" r="1.5" fill="#000" />
            <path d="M8 14.5c1 1.5 2.5 2 4 2s3-.5 4-2" stroke="#000" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </svg>
        ),
      },
      {
        name: "Codex",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#10A37F]" fill="currentColor">
            <path d="M22.3 9.4a5.7 5.7 0 0 0-.5-4.8 5.8 5.8 0 0 0-6.1-2.7 5.8 5.8 0 0 0-4.6-2 5.9 5.9 0 0 0-5.6 4A5.8 5.8 0 0 0 1.8 7a5.8 5.8 0 0 0 .5 6.6 5.8 5.8 0 0 0 .5 4.8 5.8 5.8 0 0 0 6.1 2.7 5.8 5.8 0 0 0 4.6 2 5.9 5.9 0 0 0 5.6-4 5.8 5.8 0 0 0 3.7-3.1 5.8 5.8 0 0 0-.5-6.6zM13.2 21.8a4.3 4.3 0 0 1-2.6-.9l3.5-2a2 2 0 0 0 1-1.7v-4.9l1.8 1v4.3a4.3 4.3 0 0 1-3.7 4.2zm-8.8-3.7a4.3 4.3 0 0 1-.5-2.7l3.5 2a2 2 0 0 0 2 0l4.2-2.4v2.1l-3.7 2.1a4.3 4.3 0 0 1-5.5-1.1zm-1.8-8.7a4.3 4.3 0 0 1 2.1-1.8V11.5a2 2 0 0 0 1 1.7l4.2 2.4-1.8 1-3.7-2.1a4.3 4.3 0 0 1-1.8-4.9zm15.1 2.3l-4.2-2.4 1.8-1 3.7 2.1a4.3 4.3 0 0 1-.3 7.6v-3.9a2 2 0 0 0-1-2.4zm2.1-4a4.3 4.3 0 0 1-2.1 1.8V5.6a2 2 0 0 0-1-1.7l-4.2-2.4 1.8-1 3.7 2.1a4.3 4.3 0 0 1 1.8 4.9zm-8.3-4.3a4.3 4.3 0 0 1 2.6.9l-3.5 2a2 2 0 0 0-1 1.7v4.9l-1.8-1V5.9a4.3 4.3 0 0 1 3.7-4.2zM12 13.8l-2.4-1.4 2.4-1.4 2.4 1.4L12 13.8z" />
          </svg>
        ),
      },
      {
        name: "Antigravity",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
            <rect width="24" height="24" rx="4" fill="#FF6B00" />
            <path d="M12 6v7M12 17v1" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        name: "FFmpeg",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#007808]" fill="currentColor">
            <path d="M2.5 3.5l8 4.5-8 4.5v-9zm9.5 5.5l8 4.5-8 4.5V9zm-9.5 5.5l8 4.5-8 4.5v-9z" />
          </svg>
        ),
      },
      {
        name: "Puppeteer",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#00D8A2]" fill="currentColor">
            <path d="M12 2a4 4 0 0 0-4 4v1H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4zm-2 4a2 2 0 1 1 4 0v1h-4V6zm7 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-7 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "shipping-tooling",
    index: "05",
    title: "Shipping and tooling",
    skills: [
      {
        name: "Git",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#F05032]" fill="currentColor">
            <path d="M21.6 10.9L13.1 2.4a1.7 1.7 0 0 0-2.4 0l-1.8 1.8 2.3 2.3a2 2 0 0 1 2.5 2.5l2.2 2.2a2 2 0 1 1-1.2 1.2l-2.1-2.1v4.3a2 2 0 1 1-1.7 0V9.8a2 2 0 0 1-1.1-2.6L7.4 4.8 2.4 9.8a1.7 1.7 0 0 0 0 2.4l8.5 8.5c.7.7 1.7.7 2.4 0l8.3-8.3a1.7 1.7 0 0 0 0-2.4z" />
          </svg>
        ),
      },
      {
        name: "GitHub",
        icon: <GithubIcon className="w-4 h-4 text-foreground" />,
      },
      {
        name: "Docker",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#2496ED]" fill="currentColor">
            <path d="M13.5 8.5h2v2h-2zm-2.5 0h2v2h-2zm-2.5 0h2v2h-2zm5-2.5h2v2h-2zm-2.5 0h2v2h-2zm-2.5 0h2v2h-2zm-2.5 2.5h2v2h-2zm14.8 4.2c-.3-.2-1.3-.7-2.6-.4-.3-1-1.1-1.8-2-2.1l-.8-.3-.5.7c-.7 1.1-.7 2.6-.2 3.8-.7.4-1.7.5-2.6.5H2.2c-.4 1.4.1 3.2 1.2 4.4 1.6 1.7 3.8 2.2 6.5 2.2 6 0 10.5-3.3 11.8-8.2.7 0 1.4-.2 1.9-.6h-.8z" />
          </svg>
        ),
      },
      {
        name: "Vercel",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-foreground" fill="currentColor">
            <path d="M12 2L2 20h20L12 2z" />
          </svg>
        ),
      },
      {
        name: "Cloudflare",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#F38020]" fill="currentColor">
            <path d="M18.2 10.2a5.4 5.4 0 0 0-5.2-4.2c-2.3 0-4.3 1.5-5 3.6a4.8 4.8 0 0 0-4.5 4.8c0 2.7 2.2 4.8 4.8 4.8h14.4c2.3 0 4.2-1.9 4.2-4.2 0-2.2-1.7-4-3.8-4.2l-.9-.1-.2-.5z" />
          </svg>
        ),
      },
      {
        name: "Figma",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
            <path d="M8 2h4v5H8a2.5 2.5 0 0 1 0-5z" fill="#F24E1E" />
            <path d="M12 2h4a2.5 2.5 0 0 1 0 5h-4V2z" fill="#FF7262" />
            <path d="M8 7h4v5H8a2.5 2.5 0 0 1 0-5z" fill="#A259FF" />
            <path d="M12 7h4a2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 1-4 0V7z" fill="#1ABCFE" />
            <path d="M8 12h4v5a2.5 2.5 0 0 1-4-2 2.5 2.5 0 0 1 0-3z" fill="#0ACF83" />
          </svg>
        ),
      },
      {
        name: "npm",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#CB3837]" fill="currentColor">
            <path d="M2 4v16h20V4H2zm16 13h-3.5V9h-3v8H5V7h13v10z" />
          </svg>
        ),
      },
      {
        name: "pnpm",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#F69220]" fill="currentColor">
            <path d="M3 3h5v5H3zm6 0h5v5H9zm6 0h5v5h-5zM3 9h5v5H3zm12 0h5v5h-5zm-6 6h5v5H9zm6 0h5v5h-5zm-12 0h5v5H3z" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "web3",
    index: "06",
    title: "Web3",
    skills: [
      {
        name: "Solidity",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-foreground" fill="currentColor">
            <path d="M12 2l4.5 8L12 18l-4.5-8L12 2zm0 4.5l-2.5 4.5 2.5 4.5 2.5-4.5L12 6.5zM17 11l4.5 7.5L17 22l-2.5-4.5 2.5-6.5zM7 11l2.5 6.5L7 22l-4.5-3.5L7 11z" />
          </svg>
        ),
      },
      {
        name: "Rust",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#CE412B]" fill="currentColor">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 4a6 6 0 1 1-6 6 6 6 0 0 1 6-6zm-1 2h2v2h-2zm-3.5 1.5l1.4 1.4-1.4 1.4-1.4-1.4zm9 0l1.4 1.4-1.4 1.4-1.4-1.4zM7 11h2v2H7zm8 0h2v2h-2zm-4.5 3.5h2v2h-2z" />
          </svg>
        ),
      },
      {
        name: "Foundry",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#FF5722]" fill="currentColor">
            <path d="M21 7h-4.2l-2-2H4c-.6 0-1 .4-1 1v2.5c0 .3.1.6.3.8L5.5 11v3h2.5v2H6v3h12v-3h-2v-2h2.5v-1l2-2.5c.3-.3.5-.7.5-1.1V7z" />
          </svg>
        ),
      },
      {
        name: "Anchor",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#3B82F6]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="5" r="3" />
            <line x1="12" y1="8" x2="12" y2="21" />
            <path d="M5 12H19" />
            <path d="M5 12a7 7 0 0 0 14 0" />
          </svg>
        ),
      },
      {
        name: "Ethereum",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#627EEA]" fill="currentColor">
            <path d="M12 2L4.5 13.5 12 18l7.5-4.5L12 2zm0 17.5L4.5 15 12 22l7.5-7-7.5 4.5z" />
          </svg>
        ),
      },
      {
        name: "Solana",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
            <path d="M4 6.5l3-3h13l-3 3H4zm0 6l3-3h13l-3 3H4zm0 6l3-3h13l-3 3H4z" fill="url(#solana-grad)" />
            <defs>
              <linearGradient id="solana-grad" x1="4" y1="3.5" x2="20" y2="18.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#9945FF" />
                <stop offset="1" stopColor="#14F195" />
              </linearGradient>
            </defs>
          </svg>
        ),
      },
      {
        name: "Viem",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-foreground" fill="currentColor">
            <path d="M2.5 4h4.8l5.2 12.8L17.7 4h4.8L14.2 20h-4.4L2.5 4z" />
          </svg>
        ),
      },
      {
        name: "Wagmi",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#E65100]" fill="currentColor">
            <path d="M3.5 5.5h3.2l3.3 9.8 3-9.8h2.8l3 9.8 3.3-9.8h3.2l-4.8 13h-3.4l-2.8-9-2.8 9H4.9L3.5 5.5z" />
          </svg>
        ),
      },
      {
        name: "RainbowKit",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
            <path d="M4 18a8 8 0 0 1 16 0" stroke="#FF494A" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M7 18a5 5 0 0 1 10 0" stroke="#FFB020" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M10 18a2 2 0 0 1 4 0" stroke="#00D26A" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        name: "Solana Web3.js",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
            <path d="M4 6.5l3-3h13l-3 3H4zm0 6l3-3h13l-3 3H4zm0 6l3-3h13l-3 3H4z" fill="url(#solana-web3-grad)" />
            <defs>
              <linearGradient id="solana-web3-grad" x1="4" y1="3.5" x2="20" y2="18.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#9945FF" />
                <stop offset="1" stopColor="#14F195" />
              </linearGradient>
            </defs>
          </svg>
        ),
      },
      {
        name: "Wallet Adapter",
        icon: (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#14F195]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
            <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
            <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
          </svg>
        ),
      },
    ],
  },
];

const CATEGORY_TABS: Array<{ id: "all" | "web" | "mobile" | "web3"; label: string }> = [
  { id: "all", label: "ALL" },
  { id: "web", label: "WEB" },
  { id: "mobile", label: "MOBILE" },
  { id: "web3", label: "WEB & BLOCKCHAIN" },
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<"all" | "web3" | "mobile" | "web">("all");
  const [cardImageIndexes, setCardImageIndexes] = useState<Record<string, number>>({});
  const [placeholderModal, setPlaceholderModal] = useState<string | null>(null);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    frontend: true,
    web3: true,
  });

  const toggleCategory = (id: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleExpandAll = () => {
    const allOpen: Record<string, boolean> = {};
    SKILL_CATEGORIES.forEach((cat) => {
      allOpen[cat.id] = true;
    });
    setOpenCategories(allOpen);
  };

  const handleCollapseAll = () => {
    setOpenCategories({});
  };

  const isAllExpanded = SKILL_CATEGORIES.every((cat) => openCategories[cat.id]);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const handlePrevImage = (projectId: string, total: number) => {
    setCardImageIndexes((prev) => {
      const current = prev[projectId] ?? 0;
      return { ...prev, [projectId]: (current - 1 + total) % total };
    });
  };

  const handleNextImage = (projectId: string, total: number) => {
    setCardImageIndexes((prev) => {
      const current = prev[projectId] ?? 0;
      return { ...prev, [projectId]: (current + 1) % total };
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (projectId: string, total: number, e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartXRef.current;
    const diffY = e.changedTouches[0].clientY - touchStartYRef.current;

    // Register horizontal swipe if movement exceeds 35px threshold and is predominantly horizontal
    if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        handleNextImage(projectId, total);
      } else {
        handlePrevImage(projectId, total);
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === "ArrowRight") {
      nextIndex = (index + 1) % CATEGORY_TABS.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (index - 1 + CATEGORY_TABS.length) % CATEGORY_TABS.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = CATEGORY_TABS.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    const targetTab = CATEGORY_TABS[nextIndex];
    setActiveCategory(targetTab.id);
    const tabEl = document.getElementById(`tab-${targetTab.id}`);
    tabEl?.focus();
  };

  // Close placeholder modal on Escape; trap Tab inside open dialog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPlaceholderModal(null);
        return;
      }
      if (e.key === "Tab" && placeholderModal) {
        const container = placeholderRef.current;
        if (!container) return;
        const focusables = Array.from(
          container.querySelectorAll<HTMLElement>(
            "button:not([disabled]), a[href], input, select, textarea"
          )
        ).filter((el) => el.offsetParent !== null);
        if (focusables.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        if (e.shiftKey) {
          if (active === first || !container.contains(active)) {
            e.preventDefault();
            last.focus();
          }
        } else if (active === last || !container.contains(active)) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [placeholderModal]);

  // Move focus into the placeholder dialog on open, restore focus on close
  useEffect(() => {
    if (placeholderModal) {
      lastFocusedRef.current = document.activeElement as HTMLElement | null;
      const raf = requestAnimationFrame(() => {
        const first = placeholderRef.current?.querySelector<HTMLElement>("button, a[href]");
        first?.focus();
      });
      return () => {
        cancelAnimationFrame(raf);
        lastFocusedRef.current?.focus?.();
      };
    }
  }, [placeholderModal]);

  // Lock body scroll when placeholder modal is open
  useEffect(() => {
    if (placeholderModal) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "";
    };
  }, [placeholderModal]);

  // Contact Form State
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    category: "Full MVP Development",
    budget: "Still deciding",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const filteredProjects =
    activeCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      return;
    }
    setFormSubmitting(true);
    setFormError(null);

    try {
      const response = await fetch("https://formspree.io/f/xaeqgenr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setFormSubmitted(true);
      } else {
        const data = await response.json().catch(() => null);
        const errorMsg =
          data?.errors?.map((err: { message: string }) => err.message).join(", ") ||
          data?.error ||
          "There was an issue sending your message. Please try again.";
        setFormError(errorMsg);
      }
    } catch {
      setFormError("Network error. Please check your internet connection and try again.");
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Engineering Masthead */}
      <header className="sticky top-0 z-40 border-b border-card-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Logo & Availability Status */}
          <div className="flex items-center gap-3">
            <a
              href="#top"
              className="font-mono text-sm font-semibold tracking-widest text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded"
            >
              MUHAMMAD FARAN
            </a>
            <span className="hidden sm:inline-flex items-center gap-2 border border-card-border bg-lift/80 px-2.5 py-0.5 font-mono text-xs font-medium tracking-wide text-text-muted rounded">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.4)]"></span>
              AVAILABLE FOR WORK
            </span>
          </div>

          {/* Quick Nav Anchors */}
          <nav aria-label="Main Navigation" className="flex items-center gap-1 sm:gap-6">
            <a
              href="#projects"
              className="px-2.5 py-1.5 text-sm font-medium text-text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded"
            >
              Projects
            </a>
            <a
              href="#skills"
              className="px-2.5 py-1.5 text-sm font-medium text-text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded"
            >
              Skills
            </a>
            <a
              href="#contact"
              className="ml-2 inline-flex items-center justify-center rounded border border-card-border bg-lift px-3.5 py-1.5 font-mono text-xs font-medium tracking-wide text-foreground transition-colors hover:border-card-hover hover:bg-card-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            >
              Hire Me
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main id="top" className="flex-1 mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        {/* HERO SECTION (Editorial Manifesto with Authoritative Copywriting) */}
        <section
          aria-labelledby="hero-title"
          className="min-h-[calc(100vh-8rem)] flex flex-col justify-between pb-8 pt-4 sm:pt-6 border-b border-card-border"
        >
          <div className="my-auto py-8 sm:py-12 space-y-8 max-w-4xl">
            {/* Monumental Headline preserving original copy */}
            <h1
              id="hero-title"
              className="text-5xl font-black tracking-tight text-foreground sm:text-7xl lg:text-8xl sm:leading-[1.03]"
            >
              Full Stack <br className="hidden sm:inline" />Software Engineer
            </h1>

            {/* Original Value Proposition */}
            <p className="max-w-2xl text-lg sm:text-xl leading-relaxed text-text-muted">
              Im Muhammad Faran, a Fullstack Software Engineer, I take mobile apps, web platforms and blockchain systems from zero to deployment with clean architecture and complete technical ownership.
            </p>

            {/* Action Buttons: Primary CTAs & Sized-Up Freelance Platforms */}
            <div className="space-y-4 pt-1">
              {/* Tier 1: Primary Conversion Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded bg-foreground px-5 py-2.5 text-xs sm:text-sm font-bold text-background transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground shadow-sm"
                >
                  <span>Let&apos;s talk</span>
                  <span aria-hidden="true" className="text-sm font-semibold">↗</span>
                </a>

                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded border border-card-border bg-card-bg/60 px-5 py-2.5 text-xs sm:text-sm font-medium text-foreground transition-colors hover:border-card-hover hover:bg-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                >
                  <span>Explore my work</span>
                  <span aria-hidden="true" className="text-sm font-semibold">↓</span>
                </a>
              </div>

              {/* Tier 2: Sized-up Platform Channels (matches touch target & height) */}
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setPlaceholderModal("Upwork")}
                  title="Hire on Upwork"
                  aria-label="Hire on Upwork"
                  className="inline-flex items-center gap-2.5 rounded border border-card-border bg-card-bg px-4 py-2.5 font-mono text-xs font-medium tracking-wide text-foreground transition-colors hover:border-card-hover hover:bg-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground cursor-pointer"
                >
                  <UpworkIcon className="h-4 w-4" />
                  <span>Upwork</span>
                  <span className="text-text-muted">↗</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPlaceholderModal("Fiverr")}
                  title="Hire on Fiverr"
                  aria-label="Hire on Fiverr"
                  className="inline-flex items-center gap-2.5 rounded border border-card-border bg-card-bg px-4 py-2.5 font-mono text-xs font-medium tracking-wide text-foreground transition-colors hover:border-card-hover hover:bg-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground cursor-pointer"
                >
                  <FiverrIcon className="h-4 w-4" />
                  <span>Fiverr</span>
                  <span className="text-text-muted">↗</span>
                </button>

                <a
                  href="https://github.com/m-faran"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub Profile"
                  aria-label="GitHub Profile"
                  className="inline-flex items-center gap-2.5 rounded border border-card-border bg-card-bg px-4 py-2.5 font-mono text-xs font-medium tracking-wide text-foreground transition-colors hover:border-card-hover hover:bg-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span>GitHub</span>
                  <span className="text-text-muted">↗</span>
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* PROJECT SHOWCASE SECTION (LEVEL 1: Clean Visual Cards) */}
        <section id="projects" aria-labelledby="projects-title" className="pt-12 sm:pt-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-8">
            <h2 id="projects-title" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Selected Work
            </h2>

            {/* Category Filter Tabs */}
            <div
              role="tablist"
              aria-label="Filter projects by category"
              className="mt-2 inline-flex w-full flex-wrap items-center gap-1.5 border border-card-border bg-card-bg p-1.5 rounded sm:mt-0 sm:w-auto"
            >
              {CATEGORY_TABS.map((tab, idx) => {
                const isActive = activeCategory === tab.id;
                const count =
                  tab.id === "all"
                    ? PROJECTS.length
                    : PROJECTS.filter((p) => p.category === tab.id).length;
                return (
                  <button
                    key={tab.id}
                    id={`tab-${tab.id}`}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="projects-grid"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveCategory(tab.id)}
                    onKeyDown={(e) => handleTabKeyDown(e, idx)}
                    className={`flex-1 px-4 py-2 text-center font-mono text-xs sm:text-sm font-medium tracking-wide transition-colors rounded sm:flex-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground cursor-pointer ${isActive
                      ? "bg-card-border text-foreground font-semibold"
                      : "text-text-muted hover:text-foreground hover:bg-lift"
                      }`}
                  >
                    {tab.label} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Level 1 Modular Project Grid with Visual Viewports */}
          <div id="projects-grid" className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => {
              const galleryList =
                project.gallery && project.gallery.length > 0
                  ? project.gallery
                  : [
                    {
                      url: project.image,
                      alt: project.imageAlt,
                      label: "Overview",
                      caption: "",
                    },
                  ];
              const totalImages = galleryList.length;
              const currentImageIndex = (cardImageIndexes[project.id] ?? 0) % totalImages;
              const currentImage = galleryList[currentImageIndex];
              const hasMultipleImages = totalImages > 1;
              const isLcpCandidate = filteredProjects.indexOf(project) === 0 && currentImageIndex === 0;

              return (
                <article
                  key={project.id}
                  className="group relative flex flex-col justify-between border border-card-border bg-card-bg overflow-hidden transition-all hover:border-card-hover hover:bg-hover-surface rounded"
                >
                  {/* Top Screenshot Viewport with Hover Navigation */}
                  <div
                    className="relative aspect-[16/10] w-full overflow-hidden bg-background border-b border-card-border flex items-center justify-center select-none touch-pan-y"
                    onTouchStart={hasMultipleImages ? handleTouchStart : undefined}
                    onTouchEnd={hasMultipleImages ? (e) => handleTouchEnd(project.id, totalImages, e) : undefined}
                  >
                    {project.category === "mobile" ? (
                      <div className="relative h-full w-full flex items-center justify-center p-2.5 bg-gradient-to-b from-lift/50 to-background">
                        <Image
                          src={currentImage.url}
                          alt={currentImage.alt}
                          width={457}
                          height={914}
                          preload={isLcpCandidate}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="h-full w-auto max-w-full object-contain rounded-sm transition-transform duration-300 drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]"
                        />
                      </div>
                    ) : (
                      <Image
                        src={currentImage.url}
                        alt={currentImage.alt}
                        width={1024}
                        height={550}
                        preload={isLcpCandidate}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="h-full w-full object-cover object-top transition-transform duration-300"
                      />
                    )}

                    {/* Operational Status Pill Overlay */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10 pointer-events-none">
                      {project.status === "live" ? (
                        <span className="inline-flex items-center gap-2 border border-card-border bg-background/90 backdrop-blur-sm px-2.5 py-1 font-mono text-xs font-medium tracking-wide text-foreground rounded shadow-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.4)]"></span>
                          <span>{project.statusText}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 border border-card-border bg-background/90 backdrop-blur-sm px-2.5 py-1 font-mono text-xs font-medium tracking-wide text-foreground rounded shadow-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.4)]"></span>
                          <span>{project.statusText}</span>
                        </span>
                      )}
                    </div>

                    {/* Hover & Touch Gallery Navigation Controls */}
                    {hasMultipleImages && (
                      <>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handlePrevImage(project.id, totalImages);
                          }}
                          aria-label={`Previous image for ${project.title}`}
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 h-9 w-9 sm:h-8 sm:w-8 flex items-center justify-center rounded-full bg-background/90 hover:bg-background border border-card-border hover:border-card-hover text-foreground backdrop-blur-sm shadow-lg opacity-90 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100 transition-all cursor-pointer hover:scale-110 active:scale-95"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleNextImage(project.id, totalImages);
                          }}
                          aria-label={`Next image for ${project.title}`}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 h-9 w-9 sm:h-8 sm:w-8 flex items-center justify-center rounded-full bg-background/90 hover:bg-background border border-card-border hover:border-card-hover text-foreground backdrop-blur-sm shadow-lg opacity-90 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100 transition-all cursor-pointer hover:scale-110 active:scale-95"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>

                        {/* Visual Indicator: Screen index + Label */}
                        <div className="absolute bottom-2.5 left-2.5 z-10 flex items-center gap-1.5 bg-background/90 border border-card-border px-2.5 py-1 rounded backdrop-blur-sm font-mono text-xs tracking-wide text-text-muted pointer-events-none">
                          <span className="text-foreground font-semibold tracking-normal">
                            {currentImageIndex + 1}/{totalImages}
                          </span>
                          {currentImage.label && (
                            <span className="text-text-muted hidden sm:inline">
                              • {currentImage.label}
                            </span>
                          )}
                        </div>

                        {/* Pagination Dots indicator */}
                        <div className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity pointer-events-none">
                          {galleryList.map((_, idx) => (
                            <span
                              key={idx}
                              className={`h-1.5 rounded-full transition-all ${idx === currentImageIndex ? "w-3.5 bg-foreground" : "w-1.5 bg-card-border"
                                }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Minimal Body Content - No Text Walls */}
                  <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between font-mono text-xs font-semibold tracking-wider uppercase text-text-subtle">
                        <span className="text-foreground/90">{project.specId}</span>
                        <span className="text-text-muted">{project.categoryLabel}</span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                        {project.title}
                      </h3>

                      <p className="text-sm sm:text-base leading-relaxed text-text-muted line-clamp-2">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Action Line: GitHub + Launch */}
                    <div className="flex items-center justify-between border-t border-card-border pt-4 mt-auto">
                      <div className="flex items-center gap-2">
                        {project.githubLinks && project.githubLinks.length > 1 ? (
                          <div className="flex items-center gap-1.5">
                            {project.githubLinks.map((gh, idx) => (
                              <a
                                key={idx}
                                href={gh.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 border border-card-border bg-lift px-2.5 py-1.5 font-mono text-xs sm:text-sm font-medium tracking-wide text-foreground hover:border-card-hover hover:bg-card-border rounded transition-colors focus-visible:ring-2 focus-visible:ring-foreground"
                                title={gh.label}
                                aria-label={`${project.title} ${gh.label}`}
                              >
                                <GithubIcon className="h-3.5 w-3.5 text-foreground" />
                                <span>{idx === 0 ? "Frontend" : "Contracts"}</span>
                              </a>
                            ))}
                          </div>
                        ) : project.githubUrl ? (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 border border-card-border bg-lift px-3 py-1.5 font-mono text-xs sm:text-sm font-medium tracking-wide text-foreground hover:border-card-hover hover:bg-card-border rounded transition-colors focus-visible:ring-2 focus-visible:ring-foreground"
                            title="View GitHub Repository"
                            aria-label={`${project.title} GitHub repository`}
                          >
                            <GithubIcon className="h-3.5 w-3.5 text-foreground" />
                            <span>GitHub</span>
                          </a>
                        ) : project.githubPrivate ? (
                          <span
                            className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm font-medium tracking-wide text-text-muted px-2 py-1.5"
                            title="Private Repository (Commercial IP)"
                          >
                            <svg className="h-3.5 w-3.5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth="2" />
                              <path d="M7 11V7a5 5 0 0110 0v4" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <span>Private</span>
                          </span>
                        ) : null}
                      </div>

                      <div className="flex items-center gap-2">
                        {project.isExternalLink ? (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 border border-card-border bg-lift hover:border-card-hover hover:bg-card-border px-3.5 py-1.5 font-mono text-xs sm:text-sm font-semibold tracking-wide text-foreground hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                          >
                            <span>Launch</span>
                            <svg className="h-3.5 w-3.5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm font-medium tracking-wide text-text-muted px-2.5 py-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
                            <span>Closed Beta</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* SKILLS & TECHNOLOGIES SECTION WITH PROGRESSIVE DISCLOSURE ACCORDIONS */}
        <section
          id="skills"
          aria-labelledby="skills-title"
          className="mt-16 sm:mt-24 border-t border-card-border pt-12 sm:pt-16"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-8">
            <div>
              <h2 id="skills-title" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Skills &amp; Technologies
              </h2>
            </div>

            {/* Expand / Collapse All control */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={isAllExpanded ? handleCollapseAll : handleExpandAll}
                className="inline-flex items-center gap-2 rounded border border-card-border bg-card-bg px-3.5 py-2 font-mono text-xs sm:text-sm font-medium tracking-wide text-text-muted transition-colors hover:border-card-hover hover:bg-lift hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground cursor-pointer"
              >
                <svg
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${isAllExpanded ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
                <span>{isAllExpanded ? "Collapse All" : "Expand All (54)"}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {SKILL_CATEGORIES.map((cat) => {
              const isOpen = !!openCategories[cat.id];
              const displayedPreviewSkills = cat.skills.slice(0, 3).map((s) => s.name).join(", ");
              const remainingCount = cat.skills.length - 3;

              return (
                <div
                  key={cat.id}
                  className="border border-card-border bg-card-bg rounded transition-all hover:border-card-hover overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    aria-expanded={isOpen}
                    aria-controls={`skills-content-${cat.id}`}
                    className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-hover-surface/50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <span className="font-mono text-xs font-semibold tracking-wider text-text-muted px-2.5 py-1 rounded border border-card-border bg-lift shrink-0">
                        {cat.index}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-base sm:text-lg font-bold text-foreground">
                          {cat.title}
                        </h3>
                        {!isOpen && (
                          <div className="mt-1 flex items-center gap-1.5 text-xs sm:text-sm text-text-muted font-mono min-w-0">
                            <span className="truncate text-text-muted">
                              {displayedPreviewSkills}
                            </span>
                            {remainingCount > 0 && (
                              <span className="shrink-0 text-text-subtle font-medium">
                                +{remainingCount} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className="font-mono text-xs sm:text-sm font-medium tracking-wide text-text-muted">
                        {cat.skills.length} tools
                      </span>
                      <svg
                        className={`h-4 w-4 text-text-muted transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={`skills-content-${cat.id}`}
                      role="region"
                      aria-label={`${cat.title} skills`}
                      className="px-5 pb-5 pt-1 border-t border-card-border/60"
                    >
                      <div className="flex flex-wrap gap-2.5 pt-2">
                        {cat.skills.map((skill) => (
                          <div
                            key={skill.name}
                            className="inline-flex items-center gap-2 border border-card-border bg-lift px-3.5 py-2 rounded text-xs sm:text-sm font-medium text-foreground hover:border-card-hover hover:bg-hover-surface transition-colors shadow-xs"
                          >
                            <span className="shrink-0 flex items-center justify-center w-4 h-4">
                              {skill.icon}
                            </span>
                            <span>{skill.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CONTACT & DIRECT INQUIRY SECTION */}
        <section
          id="contact"
          aria-labelledby="contact-title"
          className="mt-16 sm:mt-24 border-t border-card-border pt-12 sm:pt-16 pb-12"
        >
          <div className="max-w-3xl">
            <h2 id="contact-title" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Start a Project Conversation
            </h2>
            <p className="mt-3 text-base sm:text-lg text-text-muted leading-relaxed">
              Available for zero-to-launch web platforms, cross-platform mobile apps, and blockchain systems. Let’s talk about your requirements, timeline, and deliverables.
            </p>

            <div className="mt-8 border border-card-border bg-card-bg p-6 sm:p-8 rounded">
              {formSubmitted ? (
                <div className="space-y-4 py-8 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-lift border border-card-border text-foreground">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Inquiry Received</h3>
                  <p className="text-sm text-text-muted max-w-md mx-auto">
                    Thank you for reaching out, {formState.name}. I typically review and reply to project scopes within 24 hours.
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormError(null);
                        setFormState({
                          name: "",
                          email: "",
                          category: "Full MVP Development",
                          budget: "Still deciding",
                          message: "",
                        });
                      }}
                      className="font-mono text-xs text-foreground underline underline-offset-4 hover:text-white"
                    >
                      Send another note
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  action="https://formspree.io/f/xaeqgenr"
                  method="POST"
                  onSubmit={handleFormSubmit}
                  className="space-y-5"
                >
                  <h3 className="text-xl font-bold text-foreground">Direct Project Inquiry</h3>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label htmlFor="client-name" className="font-mono text-xs sm:text-sm font-semibold tracking-wide text-text-muted">
                        Your Name *
                      </label>
                      <input
                        id="client-name"
                        name="name"
                        type="text"
                        required
                        aria-invalid={formError ? "true" : undefined}
                        aria-describedby={formError ? "form-error" : undefined}
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Alex Miller"
                        className="w-full border border-card-border bg-background px-4 py-3 text-sm sm:text-base text-foreground placeholder:text-text-subtle focus:border-card-hover focus:outline-none focus:ring-1 focus:ring-card-hover rounded transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="client-email" className="font-mono text-xs sm:text-sm font-semibold tracking-wide text-text-muted">
                        Email Address *
                      </label>
                      <input
                        id="client-email"
                        name="email"
                        type="email"
                        required
                        aria-invalid={formError ? "true" : undefined}
                        aria-describedby={formError ? "form-error" : undefined}
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full border border-card-border bg-background px-4 py-3 text-sm sm:text-base text-foreground placeholder:text-text-subtle focus:border-card-hover focus:outline-none focus:ring-1 focus:ring-card-hover rounded transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label htmlFor="project-category" className="font-mono text-xs sm:text-sm font-semibold tracking-wide text-text-muted">
                        Project Scope
                      </label>
                      <select
                        id="project-category"
                        name="category"
                        value={formState.category}
                        onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                        className="w-full border border-card-border bg-background px-3.5 py-3 text-sm sm:text-base text-foreground focus:border-card-hover focus:outline-none focus:ring-1 focus:ring-card-hover rounded transition-colors cursor-pointer"
                      >
                        <option>Full MVP Development</option>
                        <option>Mobile App Development</option>
                        <option>Web & Blockchain Engineering</option>
                        <option>Web Platform Engineering</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="project-budget" className="font-mono text-xs sm:text-sm font-semibold tracking-wide text-text-muted">
                        Target Budget Range
                      </label>
                      <select
                        id="project-budget"
                        name="budget"
                        value={formState.budget}
                        onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                        className="w-full border border-card-border bg-background px-3.5 py-3 text-sm sm:text-base text-foreground focus:border-card-hover focus:outline-none focus:ring-1 focus:ring-card-hover rounded transition-colors cursor-pointer"
                      >
                        <option>Still deciding</option>
                        <option>$1,000 - $2,500</option>
                        <option>$2,500 - $5,000</option>
                        <option>$5,000 - $10,000</option>
                        <option>$10,000+</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="project-message" className="font-mono text-xs sm:text-sm font-semibold tracking-wide text-text-muted">
                      Project Summary & Goals *
                    </label>
                    <textarea
                      id="project-message"
                      name="message"
                      required
                      rows={4}
                      aria-invalid={formError ? "true" : undefined}
                      aria-describedby={formError ? "form-error" : undefined}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Describe the product, desired timeline, and key features needed..."
                      className="w-full border border-card-border bg-background px-4 py-3 text-sm sm:text-base text-foreground placeholder:text-text-subtle leading-relaxed focus:border-card-hover focus:outline-none focus:ring-1 focus:ring-card-hover rounded transition-colors"
                    ></textarea>
                  </div>

                  {formError && (
                    <div
                      id="form-error"
                      role="alert"
                      aria-live="polite"
                      className="border border-red-500/40 bg-red-950/20 text-red-400 p-3 rounded font-mono text-xs"
                    >
                      {formError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="w-full border border-foreground bg-foreground text-background px-5 py-3 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded disabled:opacity-50 cursor-pointer shadow-sm"
                  >
                    {formSubmitting ? "Dispatching Message..." : "Submit Project Scope →"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-card-border bg-background py-8 sm:py-10 text-xs sm:text-sm text-text-muted">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <p className="text-sm text-text-muted">
            &copy; 2026 Muhammad Faran
          </p>

          {/* Navigation & Contact Links */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-sm text-text-muted">
            {/* Upwork */}
            <button
              type="button"
              onClick={() => setPlaceholderModal("Upwork")}
              className="cursor-pointer transition-colors hover:text-foreground focus-visible:outline-none focus-visible:underline"
            >
              Upwork
            </button>

            {/* Fiverr */}
            <button
              type="button"
              onClick={() => setPlaceholderModal("Fiverr")}
              className="cursor-pointer transition-colors hover:text-foreground focus-visible:outline-none focus-visible:underline"
            >
              Fiverr
            </button>

            {/* GitHub */}
            <a
              href="https://github.com/m-faran"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:underline"
            >
              GitHub
            </a>

            {/* Contact */}
            <a
              href="#contact"
              className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:underline"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>

      {/* PLACEHOLDER / CONTRACT INITIATION MODAL */}
      {placeholderModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="placeholder-title"
          aria-describedby="placeholder-desc"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setPlaceholderModal(null)}
        >
          <div
            id="placeholder-dialog"
            ref={placeholderRef}
            className="w-full max-w-md border border-card-border bg-card-bg p-6 space-y-4 rounded shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-card-border pb-3">
              <h3
                id="placeholder-title"
                className="font-mono text-xs sm:text-sm font-bold text-foreground uppercase tracking-wider"
              >
                Hire on {placeholderModal}
              </h3>
              <button
                type="button"
                onClick={() => setPlaceholderModal(null)}
                className="h-7 w-7 flex items-center justify-center font-mono text-xs text-text-muted hover:text-foreground rounded border border-card-border hover:bg-lift transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <p id="placeholder-desc" className="text-sm text-text-muted leading-relaxed">
              Official <strong>{placeholderModal}</strong> profile integration is being connected. In the meantime, you can submit your project scope below, and we can initiate an official {placeholderModal} contract or direct freelance agreement.
            </p>

            <div className="border border-card-border bg-background p-3.5 font-mono text-xs tracking-wide text-text-muted flex items-center justify-between rounded">
              <span>Direct Engagement Status</span>
              <span className="inline-flex items-center gap-1.5 text-foreground font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                Active &amp; Available
              </span>
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setPlaceholderModal(null)}
                className="border border-card-border bg-lift px-4 py-2 font-mono text-xs font-medium tracking-wide text-text-muted hover:text-foreground hover:bg-card-border rounded cursor-pointer transition-colors"
              >
                Close
              </button>
              <a
                href="#contact"
                onClick={() => setPlaceholderModal(null)}
                className="border border-foreground bg-foreground text-background hover:bg-zinc-200 px-4 py-2 font-mono text-xs font-bold tracking-wide rounded transition-colors"
              >
                Start Inquiry Form →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
