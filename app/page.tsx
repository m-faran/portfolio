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
    tagline: "Swipe-based tokenized equities trading platform on Solana",
    category: "web",
    categoryLabel: "Web",
    status: "live",
    statusText: "LIVE DEMO",
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
    tagline: "Tokenized Pakistan Stock Exchange (KSE-100) shares on Base Sepolia",
    category: "web3",
    categoryLabel: "Web & Blockchain",
    status: "live",
    statusText: "LIVE DEMO",
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
    statusText: "LIVE DEMO",
    image: "/projects/devsafar.png",
    imageAlt: "DevSafar hackathon discovery directory and team recruitment portal screenshot",
    gallery: [
      {
        url: "/projects/devsafar.png",
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
    tagline: "Competitive multiplayer mobile board game with elemental power-ups",
    category: "mobile",
    categoryLabel: "Mobile",
    status: "testing",
    statusText: "CLOSED TESTING",
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
    tagline: "Interest-based community matchmaking app connecting developers and creators",
    category: "mobile",
    categoryLabel: "Mobile",
    status: "testing",
    statusText: "CLOSED TESTING",
    image: "/projects/kenzoku.png",
    imageAlt: "Kenzoku mobile app user discovery interface with interest matching tags",
    gallery: [
      {
        url: "/projects/kenzoku.png",
        label: "Discover Feed",
        caption: "Discovery deck: interest-matched peer recommendation cards with fluid Pass and Connect gestures",
        alt: "Kenzoku mobile app user discovery interface with interest matching tags",
      },
      {
        url: "/projects/kenzoku-interests.png",
        label: "Interests",
        caption: "Interest taxonomy: multi-select tags across programming, robotics, chess, and engineering hobbies",
        alt: "Kenzoku interest tag selection interface",
      },
      {
        url: "/projects/kenzoku-profile-setup.png",
        label: "Profile Setup",
        caption: "Profile builder: custom short bio, location, and workplace or university verification",
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
    link: "https://kenzoku.codekin.xyz/",
    isExternalLink: true,
    githubUrl: "https://github.com/m-faran/kenzoku",
    problemSolved:
      "Meeting peers with matching technical passions and project interests is fragmented across noisy social platforms. Kenzoku provides focused peer discovery with verified interest tags and low-friction connection requests.",
    summary:
      "Cross-platform React Native social matchmaking app allowing developers and tech enthusiasts to discover peers based on shared skillsets, programming languages, and hobby tags.",
    capabilities: [
      {
        title: "Interest-Vector Discovery",
        desc: "Matches users based on shared technical passions (Coding, Technology, Robotics, Chess) with dynamic compatibility tags.",
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
    tagline: "Decentralized onchain prediction protocol with Pyth Entropy randomness on Monad",
    category: "web3",
    categoryLabel: "Web & Blockchain",
    status: "live",
    statusText: "LIVE DEMO",
    image: "/projects/genie-markets.png",
    imageAlt: "Genie Markets onchain prediction protocol interface with Pyth Entropy verifier and live telemetry on Monad Testnet",
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

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<"all" | "web3" | "mobile" | "web">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [placeholderModal, setPlaceholderModal] = useState<string | null>(null);
  const caseStudyRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const openProjectModal = (project: Project) => {
    setActiveGalleryIndex(0);
    setSelectedProject(project);
  };

  // Close modals on Escape; trap Tab inside the open dialog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
        setPlaceholderModal(null);
        return;
      }
      if (e.key === "Tab" && (selectedProject || placeholderModal)) {
        const container = selectedProject ? caseStudyRef.current : placeholderRef.current;
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
  }, [selectedProject, placeholderModal]);

  // Move focus into the dialog on open, restore focus to the trigger on close
  useEffect(() => {
    if (selectedProject) {
      lastFocusedRef.current = document.activeElement as HTMLElement | null;
      const raf = requestAnimationFrame(() => {
        const first = caseStudyRef.current?.querySelector<HTMLElement>("button, a[href]");
        first?.focus();
      });
      return () => {
        cancelAnimationFrame(raf);
        lastFocusedRef.current?.focus?.();
      };
    }
  }, [selectedProject]);

  // Move focus into the placeholder dialog on open
  useEffect(() => {
    if (placeholderModal) {
      const raf = requestAnimationFrame(() => {
        const first = placeholderRef.current?.querySelector<HTMLElement>("button, a[href]");
        first?.focus();
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [placeholderModal]);

  // Lock body scroll when a modal is open, compensating for the scrollbar so the
  // page doesn't visibly shift when the overlay appears/disappears.
  useEffect(() => {
    if (selectedProject || placeholderModal) {
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
  }, [selectedProject, placeholderModal]);

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

  const filteredProjects =
    activeCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

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
    <div className="relative min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Engineering Masthead */}
      <header className="sticky top-0 z-40 border-b border-card-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Logo & Availability Status */}
          <div className="flex items-center gap-4">
            <a
              href="#top"
              className="flex items-center gap-2.5 font-mono text-sm font-semibold tracking-wider text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
            >
              <span className="flex h-7 w-7 items-center justify-center border border-card-hover bg-lift text-xs font-bold text-emerald-400">
                F
              </span>
              <span className="tracking-widest">FARAN</span>
            </a>

            <div className="hidden items-center gap-2 border-l border-card-border pl-4 sm:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span className="font-mono text-xs font-medium tracking-wide text-text-muted uppercase">
                Available for Q4 MVPs & Freelance
              </span>
            </div>
          </div>

          {/* Quick Nav Anchors */}
          <nav aria-label="Main Navigation" className="flex items-center gap-1 sm:gap-6">
            <a
              href="#projects"
              className="px-2.5 py-1.5 text-xs font-medium text-text-muted transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
            >
              Projects
            </a>
            <a
              href="#capabilities"
              className="px-2.5 py-1.5 text-xs font-medium text-text-muted transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
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
        <section aria-labelledby="hero-title" className="space-y-6 pb-12 sm:pb-16 border-b border-card-border">
          {/* Main Headline */}
          <h1
            id="hero-title"
            className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl sm:leading-[1.15] max-w-4xl"
          >
            Full-Stack & Mobile Engineer. Taking Web & Blockchain systems, mobile apps, and web platforms from zero to production deployment.
          </h1>

          {/* Value Proposition */}
          <p className="max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
            I partner with founders, agency leads, and Upwork & Fiverr clients to design, architect, and deliver autonomous software solutions with clean architecture, verified contracts, and responsive UI.
          </p>

          {/* Action Row: Platforms & Direct CTA */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {/* Upwork Profile Button */}
            <button
              type="button"
              onClick={() => setPlaceholderModal("Upwork")}
              className="inline-flex items-center gap-2 border border-card-border bg-card-bg px-4 py-2 font-mono text-xs font-medium text-foreground transition-colors hover:border-card-hover hover:bg-lift focus-visible:ring-2 focus-visible:ring-emerald-500 rounded cursor-pointer"
            >
              <UpworkIcon className="h-3.5 w-3.5 text-emerald-400" />
              <span>Hire on Upwork</span>
            </button>

            {/* Fiverr Profile Button */}
            <button
              type="button"
              onClick={() => setPlaceholderModal("Fiverr")}
              className="inline-flex items-center gap-2 border border-card-border bg-card-bg px-4 py-2 font-mono text-xs font-medium text-foreground transition-colors hover:border-card-hover hover:bg-lift focus-visible:ring-2 focus-visible:ring-emerald-500 rounded cursor-pointer"
            >
              <FiverrIcon className="h-3.5 w-3.5 text-emerald-400" />
              <span>Hire on Fiverr</span>
            </button>

            {/* Download Resume Placeholder */}
            <button
              type="button"
              onClick={() => setPlaceholderModal("Resume")}
              className="inline-flex items-center gap-2 border border-card-border bg-card-bg px-4 py-2 font-mono text-xs font-medium text-foreground transition-colors hover:border-card-hover hover:bg-lift focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
            >
              <svg className="h-3.5 w-3.5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Download Resume</span>
            </button>

            {/* Direct Inquiry Anchor */}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-emerald-500 bg-emerald-500 px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-background transition-all hover:bg-emerald-400 focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
            >
              <span>Start a Project</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        {/* PROJECT SHOWCASE SECTION (LEVEL 1: Clean Visual Cards) */}
        <section id="projects" aria-labelledby="projects-title" className="pt-12 sm:pt-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between pb-8">
            <div>
              <h2 id="projects-title" className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Featured Engineering Work
              </h2>
              <p className="mt-2 text-sm text-text-muted max-w-xl">
                Visual snapshots of production web platforms, dApps, and cross-platform apps. Click any card to inspect the full case study.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div
              role="tablist"
              aria-label="Filter projects by category"
              className="mt-2 inline-flex w-full flex-wrap items-center gap-1 border border-card-border bg-card-bg p-1 rounded sm:mt-0 sm:w-auto"
            >
              <button
                role="tab"
                aria-selected={activeCategory === "all"}
                aria-controls="projects-grid"
                onClick={() => setActiveCategory("all")}
                className={
                  `flex-1 px-3 py-1.5 text-center font-mono text-xs font-medium transition-colors rounded sm:flex-none ${
                  activeCategory === "all"
                    ? "bg-card-border text-foreground"
                    : "text-text-muted hover:text-foreground"
                }`}
              >
                ALL ({PROJECTS.length})
              </button>
              <button
                role="tab"
                aria-selected={activeCategory === "web"}
                aria-controls="projects-grid"
                onClick={() => setActiveCategory("web")}
                className={
                  `flex-1 px-3 py-1.5 text-center font-mono text-xs font-medium transition-colors rounded sm:flex-none ${
                  activeCategory === "web"
                    ? "bg-card-border text-foreground"
                    : "text-text-muted hover:text-foreground"
                }`}
              >
                WEB ({PROJECTS.filter((p) => p.category === "web").length})
              </button>
              <button
                role="tab"
                aria-selected={activeCategory === "mobile"}
                aria-controls="projects-grid"
                onClick={() => setActiveCategory("mobile")}
                className={
                  `flex-1 px-3 py-1.5 text-center font-mono text-xs font-medium transition-colors rounded sm:flex-none ${
                  activeCategory === "mobile"
                    ? "bg-card-border text-foreground"
                    : "text-text-muted hover:text-foreground"
                }`}
              >
                MOBILE ({PROJECTS.filter((p) => p.category === "mobile").length})
              </button>
              <button
                role="tab"
                aria-selected={activeCategory === "web3"}
                aria-controls="projects-grid"
                onClick={() => setActiveCategory("web3")}
                className={
                  `flex-1 px-3 py-1.5 text-center font-mono text-xs font-medium transition-colors rounded sm:flex-none ${
                  activeCategory === "web3"
                    ? "bg-card-border text-foreground"
                    : "text-text-muted hover:text-foreground"
                }`}
              >
                WEB & BLOCKCHAIN ({PROJECTS.filter((p) => p.category === "web3").length})
              </button>
            </div>
          </div>

          {/* Level 1 Modular Project Grid with Visual Viewports */}
          <div id="projects-grid" className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => {
              return (
                <article
                  key={project.id}
                  className="group relative flex flex-col justify-between border border-card-border bg-card-bg overflow-hidden transition-all hover:border-card-hover hover:bg-hover-surface rounded"
                >
                  {/* Top Screenshot Viewport */}
                  <div
                    onClick={() => openProjectModal(project)}
                    className="relative aspect-[16/10] w-full overflow-hidden bg-background border-b border-card-border cursor-pointer flex items-center justify-center"
                  >
                    {project.category === "mobile" ? (
                      <div className="relative h-full w-full flex items-center justify-center p-2.5 bg-gradient-to-b from-lift/50 to-background">
                        <Image
                          src={project.image}
                          alt={project.imageAlt}
                          width={457}
                          height={914}
                          className="h-full w-auto max-w-full object-contain rounded-sm transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]"
                        />
                      </div>
                    ) : (
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        width={1024}
                        height={550}
                        className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      />
                    )}

                    {/* Operational Status Pill Overlay */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                      {project.status === "live" ? (
                        <span className="inline-flex items-center gap-1.5 border border-emerald-500/40 bg-background/85 backdrop-blur-sm px-2.5 py-1 font-mono text-xs font-semibold text-emerald-400 rounded">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                          {project.statusText}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 border border-amber-500/40 bg-background/85 backdrop-blur-sm px-2.5 py-1 font-mono text-xs font-semibold text-amber-400 rounded">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
                          {project.statusText}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Minimal Body Content - No Text Walls */}
                  <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between font-mono text-xs text-text-subtle">
                        <span>{project.specId}</span>
                        <span className="text-text-muted">{project.categoryLabel}</span>
                      </div>

                      <h3
                        onClick={() => openProjectModal(project)}
                        className="text-xl font-bold tracking-tight text-foreground hover:text-emerald-400 transition-colors cursor-pointer"
                      >
                        {project.title}
                      </h3>

                      <p className="text-xs leading-relaxed text-text-muted line-clamp-2">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.techStack.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="border border-card-border bg-lift px-2 py-0.5 font-mono text-xs text-text-muted"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span
                          key="more"
                          className="border border-card-border bg-lift px-2 py-0.5 font-mono text-xs text-text-subtle"
                        >
                          +{project.techStack.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Action Line: View Case Study + GitHub + Launch */}
                    <div className="flex items-center justify-between border-t border-card-border pt-4 mt-auto">
                      <button
                        type="button"
                        onClick={() => openProjectModal(project)}
                        className="font-mono text-xs font-semibold text-foreground hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-emerald-500 rounded cursor-pointer"
                      >
                        <span>View Case Study</span>
                        <span aria-hidden="true">→</span>
                      </button>

                      <div className="flex items-center gap-2">
                        {project.githubUrl ? (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 border border-card-border bg-lift px-2.5 py-1 font-mono text-xs font-medium text-foreground hover:border-card-hover hover:bg-card-border rounded transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
                            title="View GitHub Repository"
                            aria-label={`${project.title} GitHub repository`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <GithubIcon className="h-3.5 w-3.5 text-foreground" />
                            <span>GitHub</span>
                          </a>
                        ) : project.githubPrivate ? (
                          <span
                            className="inline-flex items-center gap-1 font-mono text-xs text-text-subtle px-1.5 py-1"
                            title="Private Repository"
                          >
                            <svg className="h-3 w-3 text-text-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth="2" />
                              <path d="M7 11V7a5 5 0 0110 0v4" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <span>Private</span>
                          </span>
                        ) : null}

                        {project.isExternalLink ? (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 rounded px-1.5 py-1"
                          >
                            <span>Launch</span>
                            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </a>
                        ) : (
                          <span className="font-mono text-xs text-amber-400/80 px-1.5 py-1">
                            Closed Beta
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

        {/* CAPABILITIES & DELIVERY MODEL */}
        <section
          id="capabilities"
          aria-labelledby="capabilities-title"
          className="mt-16 sm:mt-24 border-t border-card-border pt-12 sm:pt-16"
        >
          <div className="max-w-2xl">
            <h2 id="capabilities-title" className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Engineering Capabilities & Delivery Model
            </h2>
            <p className="mt-2 text-sm text-text-muted">
              How I help non-technical startup founders, agency leads, and clients bring products from initial concept to live production.
            </p>
            <p className="mt-4 font-mono text-xs text-text-subtle">
              6 Products Shipped · 3 Live in Production · 135+ Tokenized Securities · 3,870+ Events Indexed
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {/* Pillar 1 */}
            <div className="border border-card-border bg-card-bg p-6 space-y-3 rounded">
              <span className="font-mono text-xs font-bold text-emerald-400 tracking-wider">
                01 // END-TO-END MVPs
              </span>
              <h3 className="text-lg font-bold text-foreground">Zero-to-Launch Web Platforms</h3>
              <p className="text-xs leading-relaxed text-text-muted">
                Complete product architecture from schema design and authentication to responsive frontend and cloud CI/CD. Designed for rapid iteration without architectural debt.
              </p>
              <div className="pt-2 font-mono text-xs text-text-subtle">
                Next.js · React 19 · TypeScript · Supabase · Tailwind
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="border border-card-border bg-card-bg p-6 space-y-3 rounded">
              <span className="font-mono text-xs font-bold text-emerald-400 tracking-wider">
                02 // CROSS-PLATFORM MOBILE
              </span>
              <h3 className="text-lg font-bold text-foreground">React Native (iOS & Android)</h3>
              <p className="text-xs leading-relaxed text-text-muted">
                Single codebase delivering native 60fps performance on both iOS and Android. Offline storage, gesture physics, native haptics, and App Store / Google Play submission.
              </p>
              <div className="pt-2 font-mono text-xs text-text-subtle">
                React Native · Expo EAS · Reanimated · Offline Sync
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="border border-card-border bg-card-bg p-6 space-y-3 rounded">
              <span className="font-mono text-xs font-bold text-emerald-400 tracking-wider">
                03 // SMART CONTRACTS & dAPPS
              </span>
              <h3 className="text-lg font-bold text-foreground">Web & Blockchain Systems</h3>
              <p className="text-xs leading-relaxed text-text-muted">
                Non-custodial user onboarding (Privy), DEX atomic swaps (Jupiter on Solana), and EVM prediction & trading smart contracts (Base & Monad) with verifiable oracles (Pyth).
              </p>
              <div className="pt-2 font-mono text-xs text-text-subtle">
                Solana · Base · Monad · Pyth Entropy · Privy · Wagmi
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT & DIRECT INQUIRY SECTION */}
        <section
          id="contact"
          aria-labelledby="contact-title"
          className="mt-16 sm:mt-24 border-t border-card-border pt-12 sm:pt-16 pb-12"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Left Column: Direct channels and platform links */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 id="contact-title" className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Start a Project Conversation
                </h2>
                <p className="mt-2 text-sm text-text-muted leading-relaxed">
                  Available for fixed-scope MVP builds, mobile app development, and long-term contracting. Let’s talk about your requirements, timeline, and deliverables.
                </p>
              </div>

              {/* Status Box */}
              <div className="border border-card-border bg-card-bg p-4 space-y-2 rounded">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                  <span className="font-mono text-xs font-bold uppercase text-foreground">
                    Direct Freelance Engagement
                  </span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  Clients hire me directly or through escrow on Upwork and Fiverr for peace of mind. Every milestone has clear completion criteria.
                </p>
              </div>

              {/* Platform Badges */}
              <div className="space-y-3 pt-2">
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-text-subtle">
                  Preferred Platforms:
                </p>
                <div className="flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPlaceholderModal("Upwork")}
                    className="flex items-center justify-between border border-card-border bg-card-bg px-4 py-3 text-xs font-medium text-foreground transition-colors hover:border-card-hover hover:bg-lift rounded text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <UpworkIcon className="h-4 w-4 text-emerald-400" />
                      <span className="font-semibold">Upwork Profile</span>
                    </div>
                    <span className="font-mono text-xs text-emerald-400">Verified Platform ›</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlaceholderModal("Fiverr")}
                    className="flex items-center justify-between border border-card-border bg-card-bg px-4 py-3 text-xs font-medium text-foreground transition-colors hover:border-card-hover hover:bg-lift rounded text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <FiverrIcon className="h-4 w-4 text-emerald-400" />
                      <span className="font-semibold">Fiverr Profile</span>
                    </div>
                    <span className="font-mono text-xs text-emerald-400">Verified Platform ›</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlaceholderModal("Resume")}
                    className="flex items-center justify-between border border-card-border bg-card-bg px-4 py-3 text-xs font-medium text-foreground transition-colors hover:border-card-hover hover:bg-lift rounded text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <svg className="h-4 w-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="font-semibold">Technical Resume</span>
                    </div>
                    <span className="font-mono text-xs text-text-muted">PDF Asset ›</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Direct Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="border border-card-border bg-card-bg p-6 sm:p-8 rounded">
                {formSubmitted ? (
                  <div className="space-y-4 py-8 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-950/40 border border-emerald-500 text-emerald-400">
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
                          setFormState({
                            name: "",
                            email: "",
                            category: "Full MVP Development",
                            budget: "Still deciding",
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
                    <h3 className="text-lg font-bold text-foreground">Direct Project Inquiry</h3>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label htmlFor="client-name" className="font-mono text-xs font-medium text-text-muted">
                          Your Name *
                        </label>
                        <input
                          id="client-name"
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          placeholder="e.g. Alex Miller"
                          className="w-full border border-card-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder-text-subtle focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="client-email" className="font-mono text-xs font-medium text-text-muted">
                          Email Address *
                        </label>
                        <input
                          id="client-email"
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          placeholder="name@company.com"
                          className="w-full border border-card-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder-text-subtle focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label htmlFor="project-category" className="font-mono text-xs font-medium text-text-muted">
                          Project Scope
                        </label>
                        <select
                          id="project-category"
                          value={formState.category}
                          onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                          className="w-full border border-card-border bg-background px-3 py-2.5 text-xs text-foreground focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded"
                        >
                          <option>Full MVP Development</option>
                          <option>Mobile App Development</option>
                          <option>Web & Blockchain Engineering</option>
                          <option>Web Platform Engineering</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="project-budget" className="font-mono text-xs font-medium text-text-muted">
                          Target Budget Range
                        </label>
                        <select
                          id="project-budget"
                          value={formState.budget}
                          onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                          className="w-full border border-card-border bg-background px-3 py-2.5 text-xs text-foreground focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded"
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
                      <label htmlFor="project-message" className="font-mono text-xs font-medium text-text-muted">
                        Project Summary & Goals *
                      </label>
                      <textarea
                        id="project-message"
                        required
                        rows={4}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Describe the product, desired timeline, and key features needed..."
                        className="w-full border border-card-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder-text-subtle focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="w-full border border-emerald-500 bg-emerald-500 px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-background transition-all hover:bg-emerald-400 focus-visible:ring-2 focus-visible:ring-emerald-500 rounded disabled:opacity-50 cursor-pointer"
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
      <footer className="border-t border-card-border bg-background py-8 text-xs text-text-subtle">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2 font-mono">
            <span className="font-bold text-foreground">FARAN</span>
            <span>•</span>
            <span>Full-Stack & Mobile Software Engineer</span>
          </div>

          <div className="flex items-center gap-4 font-mono text-xs">
            <span>Next.js 16 + React 19 + Tailwind v4</span>
            <span>•</span>
            <span className="text-emerald-400">All Systems Operational</span>
          </div>
        </div>
      </footer>

      {/* LEVEL 2: DEDICATED PROJECT CASE STUDY MODAL */}
      {selectedProject && (
        <div
          id="case-study-dialog"
          ref={caseStudyRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-3xl border border-card-border bg-card-bg text-foreground rounded shadow-2xl my-8 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-card-border bg-card-bg/95 backdrop-blur px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-text-subtle">{selectedProject.specId}</span>
                <span className="font-mono text-xs text-emerald-400">• {selectedProject.categoryLabel}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="font-mono text-xs text-text-muted hover:text-foreground p-1.5 border border-card-border hover:border-card-hover bg-lift rounded transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
                aria-label="Close modal"
              >
                ✕ Esc
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
              {/* Title & Tagline */}
              <div>
                <h3 id="case-study-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  {selectedProject.title}
                </h3>
                <p className="mt-2 text-base text-emerald-400 font-mono">
                  {selectedProject.tagline}
                </p>
              </div>

              {/* High-Resolution Project Screenshot Frame with Multi-Screen Gallery Switcher */}
              <div className="space-y-3">
                {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                  <div className="flex flex-wrap items-center gap-1.5 pb-0.5">
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-text-subtle mr-1">
                      Screens ({selectedProject.gallery.length}):
                    </span>
                    {selectedProject.gallery.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveGalleryIndex(idx)}
                        className={`px-3 py-1 font-mono text-xs rounded transition-all cursor-pointer ${
                          activeGalleryIndex === idx
                            ? "bg-emerald-500 text-background font-bold shadow-sm"
                            : "bg-lift text-text-muted hover:text-foreground hover:bg-card-border border border-card-border"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}

                <div className="border border-card-border bg-background overflow-hidden rounded">
                  {selectedProject.category === "mobile" ? (
                    <div className="flex justify-center p-6 sm:p-8 bg-gradient-to-b from-lift/60 to-background">
                      <div className="max-w-[260px] sm:max-w-[300px] rounded-xl overflow-hidden border border-card-hover shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-black">
                        <Image
                          src={
                            selectedProject.gallery && selectedProject.gallery[activeGalleryIndex]
                              ? selectedProject.gallery[activeGalleryIndex].url
                              : selectedProject.image
                          }
                          alt={
                            selectedProject.gallery && selectedProject.gallery[activeGalleryIndex]
                              ? selectedProject.gallery[activeGalleryIndex].alt
                              : selectedProject.imageAlt
                          }
                          width={457}
                          height={914}
                          className="w-full h-auto object-contain transition-all duration-200"
                          preload
                        />
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={
                        selectedProject.gallery && selectedProject.gallery[activeGalleryIndex]
                          ? selectedProject.gallery[activeGalleryIndex].url
                          : selectedProject.image
                      }
                      alt={
                        selectedProject.gallery && selectedProject.gallery[activeGalleryIndex]
                          ? selectedProject.gallery[activeGalleryIndex].alt
                          : selectedProject.imageAlt
                      }
                      width={1024}
                      height={550}
                      className="w-full h-auto object-cover object-top"
                      preload
                    />
                  )}
                  <div className="flex items-center justify-between border-t border-card-border px-4 py-2 font-mono text-xs text-text-subtle bg-background">
                    <span className="truncate pr-4 text-text-muted">
                      {selectedProject.gallery && selectedProject.gallery[activeGalleryIndex]
                        ? selectedProject.gallery[activeGalleryIndex].caption
                        : selectedProject.category === "mobile"
                        ? "Mobile Application Interface"
                        : "Live Production Platform"}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                        <span className="text-emerald-400 font-semibold">
                          {activeGalleryIndex + 1}/{selectedProject.gallery.length}
                        </span>
                      )}
                      <span>{selectedProject.statusText}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Row */}
              <div className="flex flex-wrap items-center gap-3">
                {selectedProject.isExternalLink ? (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-emerald-500 bg-emerald-500 px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-background transition-all hover:bg-emerald-400 focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
                  >
                    <span>Launch Live Application</span>
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 border border-amber-500/40 bg-amber-950/20 px-4 py-2 font-mono text-xs text-amber-400 rounded">
                    Currently In Closed Testing (Beta)
                  </span>
                )}

                {/* GitHub Buttons */}
                {selectedProject.githubLinks && selectedProject.githubLinks.length > 0 ? (
                  selectedProject.githubLinks.map((gh, idx) => (
                    <a
                      key={idx}
                      href={gh.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-card-border bg-lift px-4 py-2.5 font-mono text-xs font-medium text-foreground hover:border-card-hover hover:bg-card-border rounded transition-colors"
                    >
                      <GithubIcon className="h-3.5 w-3.5 text-foreground" />
                      <span>{gh.label}</span>
                      <svg className="h-3 w-3 text-text-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  ))
                ) : selectedProject.githubUrl ? (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-card-border bg-lift px-4 py-2.5 font-mono text-xs font-medium text-foreground hover:border-card-hover hover:bg-card-border rounded transition-colors"
                  >
                    <GithubIcon className="h-3.5 w-3.5 text-foreground" />
                    <span>View GitHub Repo</span>
                    <svg className="h-3 w-3 text-text-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                ) : selectedProject.githubPrivate ? (
                  <span className="inline-flex items-center gap-2 border border-card-border bg-card-bg px-4 py-2.5 font-mono text-xs text-text-subtle rounded">
                    <svg className="h-3.5 w-3.5 text-text-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span>Private Repository (Commercial IP)</span>
                  </span>
                ) : null}

                <a
                  href="#contact"
                  onClick={() => setSelectedProject(null)}
                  className="inline-flex items-center gap-2 border border-card-border bg-lift px-4 py-2.5 font-mono text-xs font-medium text-foreground hover:border-card-hover hover:bg-card-border rounded transition-colors"
                >
                  <span>Inquire About Similar Work →</span>
                </a>
              </div>

              {/* Problem Solved & Executive Summary */}
              <div className="border border-card-border bg-background p-5 rounded space-y-2">
                <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  The Problem & Client Outcome
                </span>
                <p className="text-sm leading-relaxed text-text-muted">
                  {selectedProject.problemSolved}
                </p>
              </div>

              {/* Key Delivered Capabilities */}
              <div className="space-y-3">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-foreground border-b border-card-border pb-2">
                  Delivered Capabilities & Features
                </h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {selectedProject.capabilities.map((cap, i) => (
                    <div key={i} className="border border-card-border bg-lift p-3.5 rounded space-y-1">
                      <div className="flex items-center gap-2 font-mono text-xs font-semibold text-foreground">
                        <span className="text-emerald-400">›</span>
                        <span>{cap.title}</span>
                      </div>
                      <p className="text-xs text-text-muted leading-relaxed pl-3.5">
                        {cap.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engineering Architecture & Technical Specs */}
              <div className="space-y-3">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-foreground border-b border-card-border pb-2">
                  Architecture & Technical Notes
                </h4>
                <div className="border border-card-border bg-background p-4 rounded font-mono text-xs leading-relaxed text-text-muted">
                  {selectedProject.architectureNote}
                </div>
              </div>

              {/* Complete Tech Stack */}
              <div className="space-y-2">
                <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-text-subtle">
                  Technologies & Frameworks
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="border border-card-border bg-lift px-3 py-1 font-mono text-xs text-emerald-400 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-card-border bg-card-bg px-6 py-4 flex items-center justify-between">
              <span className="font-mono text-xs text-text-subtle">
                Press Esc or click outside to return to catalog
              </span>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="border border-card-border bg-lift px-4 py-1.5 font-mono text-xs text-foreground hover:bg-card-border rounded transition-colors"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PLACEHOLDER MODAL FOR UPWORK / FIVERR / RESUME */}
      {placeholderModal && (
        <div
          role="dialog"
          aria-modal="true"
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
              <span className="font-mono text-xs font-bold text-emerald-400 uppercase">
                {placeholderModal} Placeholder
              </span>
              <button
                type="button"
                onClick={() => setPlaceholderModal(null)}
                className="font-mono text-xs text-text-muted hover:text-foreground p-1"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-text-muted leading-relaxed">
              This button is reserved as a direct link for your official <strong>{placeholderModal}</strong> endpoint. When you supply your link or resume file, it will connect directly.
            </p>

            <div className="border border-card-border bg-background p-3 font-mono text-xs text-emerald-400">
              STATUS: Placeholder Reserved in PRODUCT.md
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPlaceholderModal(null)}
                className="border border-card-border bg-lift px-4 py-2 font-mono text-xs text-foreground hover:bg-card-border rounded cursor-pointer"
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
