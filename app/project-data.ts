import React from "react";

export interface ProjectGalleryItem {
  url: string;
  label: string;
  caption: string;
  alt: string;
}

export interface ProjectGithubLink {
  label: string;
  url: string;
}

export interface ProjectCapability {
  title: string;
  desc: string;
}

export interface Project {
  id: string;
  specId: string;
  title: string;
  tagline: string;
  category: "web3" | "mobile" | "web";
  categoryLabel: string;
  status: "live" | "testing";
  statusText: string;
  isFlagship?: boolean;
  image: string;
  imageAlt: string;
  gallery: ProjectGalleryItem[];
  link: string;
  isExternalLink: boolean;
  githubUrl?: string;
  githubLinks?: ProjectGithubLink[];
  githubPrivate?: boolean;
  problemSolved: string;
  summary: string;
  capabilities: ProjectCapability[];
  techStack: string[];
  architectureNote: string;
}

export const PROJECTS: Project[] = [
  {
    id: "roaring-bulls",
    specId: "SPEC-01",
    title: "Roaring Bulls",
    tagline:
      "Swipe-based tokenized equities trading platform on Solana with atomic Jupiter DEX basket execution.",
    category: "web",
    categoryLabel: "Web",
    status: "live",
    statusText: "LIVE",
    isFlagship: true,
    image: "/projects/roaring-bulls.png",
    imageAlt: "Roaring Bulls Solana tokenized equities trading platform screenshot",
    gallery: [
      {
        url: "/projects/roaring-bulls.png",
        label: "Overview",
        caption:
          "Terminal landing and portfolio telemetry dashboard for curating tokenized global equities on Solana.",
        alt: "Roaring Bulls Solana tokenized equities trading platform screenshot",
      },
      {
        url: "/projects/roaring-bulls-swipe.png",
        label: "Swipe Deck",
        caption:
          "Fixed-budget asset swipe allocation deck showing Adobe xStock equity card, risk tier selector, and live basket cart.",
        alt: "Roaring Bulls swipe-based equity curation deck and basket calculator",
      },
      {
        url: "/projects/roaring-bulls-tape.png",
        label: "Search The Tape",
        caption:
          "Searchable directory of 135+ tokenized equities (TSLA, NVDA, GOOGL) with real-time Jupiter DEX quotes and 24h metrics.",
        alt: "Roaring Bulls live tokenized equity tape with real-time market pricing",
      },
    ],
    link: "https://roaring-bulls.vercel.app/",
    isExternalLink: true,
    githubUrl: "https://github.com/m-faran/roaring-bulls",
    problemSolved:
      "Traditional retail stock brokerages are rigid, slow, and fragmented across multi-step order tickets. Roaring Bulls transforms equity basket curation into a bounded, fixed-budget swipe workflow settled directly on Solana.",
    summary:
      "A non-custodial trading web application enabling investors to curate and buy baskets of tokenized public equities (TSLA, NVDA, SPY) and pre-IPO assets through a single atomic transaction.",
    capabilities: [
      {
        title: "Atomic 1-Click Basket Swaps",
        desc: "Bundles multiple tokenized stock allocations into a single atomic transaction routed via the Jupiter DEX aggregator.",
      },
      {
        title: "Embedded Privy Onboarding",
        desc: "Non-custodial wallet provisioning via email or social login alongside native Solana wallets, eliminating seed-phrase friction.",
      },
      {
        title: "Risk-Tiered Asset Decks",
        desc: "Three curated allocation pools: Conservative (1:1 backed xStocks), Balanced (Pre-IPO unicorns), and Degen.",
      },
      {
        title: "Hard Session Budget Locks",
        desc: "Pre-committed session budget ceilings that prevent over-allocation before transaction signing.",
      },
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Solana Web3.js",
      "Jupiter DEX API",
      "Privy Auth",
      "Tailwind CSS",
    ],
    architectureNote:
      "Engineered an atomic swap router that constructs and simulates multi-leg Jupiter transaction batches on Solana, enforcing strict slippage guardrails and balance checks prior to dispatch.",
  },
  {
    id: "chundrigar-capital",
    specId: "SPEC-02",
    title: "Chundrigar Capital",
    tagline:
      "Tokenized Pakistan Stock Exchange (KSE-100) securities trading platform on Base Sepolia with dual PKR & USDC settlement rails.",
    category: "web3",
    categoryLabel: "Web & Blockchain",
    status: "live",
    statusText: "LIVE",
    isFlagship: true,
    image: "/projects/chundrigar-capital.png",
    imageAlt: "Chundrigar Capital Pakistan Stock Exchange tokenized shares platform screenshot",
    gallery: [
      {
        url: "/projects/chundrigar-capital.png",
        label: "Overview",
        caption:
          "Decentralized PSX securities exchange portal featuring live USD/PKR oracle parity and 3-step token settlement overview.",
        alt: "Chundrigar Capital Pakistan Stock Exchange tokenized shares platform screenshot",
      },
      {
        url: "/projects/chundrigar-markets.png",
        label: "KSE-100 Markets",
        caption:
          "Full KSE-100 scrip directory with sector filtering, index weights, market capitalization, and live price telemetry.",
        alt: "Chundrigar Capital KSE-100 index scrip working list and sector filters",
      },
      {
        url: "/projects/chundrigar-trade.png",
        label: "Trading Terminal",
        caption:
          "Allied Bank (ABL) execution terminal with historical candlestick charting, PSX feed integration, and dual SPKR/USDC payment rails.",
        alt: "Chundrigar Capital Allied Bank trading terminal with candlestick chart and dual payment rails",
      },
      {
        url: "/projects/chundrigar-kyc.png",
        label: "Identity Check",
        caption:
          "Onchain investor identity verification and ERC-20 whitelist compliance workflow for CNIC and passport holders.",
        alt: "Chundrigar Capital investor identity verification and whitelist compliance step",
      },
      {
        url: "/projects/chundrigar-heritage.png",
        label: "Heritage",
        caption:
          "Editorial architectural tribute to Karachi's historic I.I. Chundrigar Road financial district.",
        alt: "Chundrigar Capital I.I. Chundrigar Road architectural landmark illustration",
      },
    ],
    link: "https://chundrigar-capital.vercel.app/",
    isExternalLink: true,
    githubUrl: "https://github.com/m-faran/chundrigar-capital",
    problemSolved:
      "Domestic and diaspora investors face steep brokerage onboarding barriers and slow remittance settlement when investing in Pakistan Stock Exchange (PSX) equities. Chundrigar Capital brings KSE-100 blue-chip shares onchain with instant settlement.",
    summary:
      "Full-stack Web3 securities exchange on Base Sepolia enabling investors to mint and trade tokenized KSE-100 equities using either PKR-pegged tokens or USDC against a verifiable treasury contract.",
    capabilities: [
      {
        title: "Dual-Currency Settlement Rails",
        desc: "Supports both domestic rupee-denominated settlement ($SPKR) and international stablecoin settlement ($USDC) in one terminal.",
      },
      {
        title: "EIP-712 Signed Price Quotes",
        desc: "Off-chain PSX market quotes are cryptographically signed and verified on-chain to prevent stale pricing or front-running.",
      },
      {
        title: "Direct Treasury Counterparty",
        desc: "Deterministic mint-and-burn smart contracts executing directly against protocol liquidity with a transparent 0.50% fee.",
      },
      {
        title: "Whitelisted Compliance Hooks",
        desc: "ERC-20 transfer restrictions ensuring only KYC-whitelisted wallet addresses can mint or receive regulated equity tokens.",
      },
    ],
    techStack: [
      "Base Sepolia (EVM)",
      "Solidity",
      "Foundry",
      "Next.js",
      "Wagmi",
      "Viem",
      "RainbowKit",
    ],
    architectureNote:
      "Implemented gas-optimized ERC-20 equity contracts on Base with EIP-712 typed-data signature verification to validate off-chain exchange quote timestamps and prices prior to token minting.",
  },
  {
    id: "stormpkr",
    specId: "SPEC-07",
    title: "StormPKR Mobile Wallet",
    tagline:
      "Mobile crypto wallet for Pakistan's PKR-pegged stablecoin ($SPKR) featuring gasless Base transactions and seedless onboarding.",
    category: "mobile",
    categoryLabel: "Mobile",
    status: "testing",
    statusText: "CLOSED TESTING",
    isFlagship: true,
    image: "/projects/stormpkr.png",
    imageAlt:
      "StormPKR mobile wallet dashboard displaying PKR balance, quick actions, and gasless Base network status",
    gallery: [
      {
        url: "/projects/stormpkr.png",
        label: "Wallet Balance",
        caption:
          "Primary mobile dashboard displaying Rs 10,000 ($SPKR) balance, quick transfer actions, and active gasless Base status.",
        alt: "StormPKR wallet dashboard showing Rs 10,000 balance and gasless Base status",
      },
      {
        url: "/projects/stormpkr-send.png",
        label: "Gas-Free Send",
        caption:
          "Peer-to-peer rupee token transfer flow with sponsored zero-gas execution powered by Thirdweb account abstraction.",
        alt: "StormPKR send token screen with gas-free transfer powered by Thirdweb",
      },
      {
        url: "/projects/stormpkr-confirm.png",
        label: "Confirm Transfer",
        caption:
          "Pre-dispatch transaction verification screen confirming recipient address, exact PKR amount, and Rs 0.00 sponsored network fee.",
        alt: "StormPKR transaction confirmation screen showing free gas fee on Base network",
      },
      {
        url: "/projects/stormpkr-success.png",
        label: "Gasless Success",
        caption:
          "Instant onchain settlement receipt confirming gasless $SPKR delivery on Base with block explorer verification.",
        alt: "StormPKR success modal showing tokens sent gaslessly on Base",
      },
      {
        url: "/projects/stormpkr-deposit.png",
        label: "Fiat & Token Ramps",
        caption:
          "Local Pakistani fiat deposit rails integrating EasyPaisa, JazzCash, and direct bank transfers for 1:1 $SPKR minting.",
        alt: "StormPKR deposit screen with EasyPaisa, JazzCash, and bank transfer payment rails",
      },
      {
        url: "/projects/stormpkr-history.png",
        label: "Transaction History",
        caption:
          "Chronological onchain ledger indexing incoming and outgoing $SPKR transfers with counterparty metadata.",
        alt: "StormPKR transaction history screen with sent and received transfer ledger",
      },
      {
        url: "/projects/stormpkr-welcome.png",
        label: "Welcome Screen",
        caption:
          "Onboarding entry showcasing Pakistan's 1:1 rupee-pegged stablecoin wallet experience.",
        alt: "StormPKR splash screen showcasing Pakistan's first PKR-pegged stablecoin",
      },
      {
        url: "/projects/stormpkr-create-wallet.png",
        label: "Seedless Onboarding",
        caption:
          "One-tap wallet creation via Google or Apple social auth alongside traditional self-custodial recovery phrases.",
        alt: "StormPKR seedless wallet creation screen via Google, Apple, or recovery phrase",
      },
      {
        url: "/projects/stormpkr-import-wallet.png",
        label: "Import Wallet",
        caption:
          "Multi-path wallet recovery supporting existing 12-word seed phrases or linked social smart accounts.",
        alt: "StormPKR import wallet options via recovery phrase or social accounts",
      },
      {
        url: "/projects/stormpkr-pin.png",
        label: "PIN Authentication",
        caption:
          "Hardware-backed 6-digit PIN security lock protecting local wallet session and signing keys.",
        alt: "StormPKR 6-digit PIN security lock screen to protect wallet access",
      },
      {
        url: "/projects/stormpkr-settings.png",
        label: "Wallet Settings",
        caption:
          "Account management console displaying smart wallet address, Base network status, and security preferences.",
        alt: "StormPKR settings screen showing wallet address, Base network selector, and security controls",
      },
    ],
    link: "#",
    isExternalLink: false,
    githubPrivate: true,
    problemSolved:
      "Everyday users in Pakistan cannot adopt crypto wallets when forced to manage 12-word seed phrases and acquire ETH on L2 just to pay gas fees for a rupee transfer. StormPKR makes stablecoin payments feel like a native fintech app.",
    summary:
      "Cross-platform React Native wallet for the $SPKR stablecoin on Base, combining Thirdweb smart account paymasters for 100% gasless transfers with EasyPaisa/JazzCash fiat onboarding.",
    capabilities: [
      {
        title: "Sponsored Gasless Transactions",
        desc: "Every $SPKR transfer is routed through a Thirdweb paymaster on Base so users never hold or spend ETH for gas.",
      },
      {
        title: "Seedless Social Smart Accounts",
        desc: "Provisions non-custodial wallets via Google or Apple OAuth in seconds while preserving full self-custody.",
      },
      {
        title: "Local Pakistani Payment Rails",
        desc: "Native deposit and off-ramp workflows tailored for EasyPaisa, JazzCash, and local interbank IBFT rails.",
      },
      {
        title: "Enclave PIN & Ledger Security",
        desc: "Device-level encrypted key storage gated by a 6-digit PIN lock and real-time Base block indexing.",
      },
    ],
    techStack: [
      "React Native",
      "Expo",
      "Base (EVM)",
      "Thirdweb SDK",
      "ERC-4337 Paymaster",
      "TypeScript",
    ],
    architectureNote:
      "Integrated Thirdweb ERC-4337 smart wallet paymasters on Base to sponsor ERC-20 transfer gas costs transparently, paired with secure device enclave key storage and deterministic PIN verification.",
  },
  {
    id: "genie-markets",
    specId: "SPEC-06",
    title: "Genie Markets",
    tagline:
      "Decentralized onchain prediction protocol on Monad Testnet powered by Pyth Entropy verifiable randomness and ERC-4337 zero-gas accounts.",
    category: "web3",
    categoryLabel: "Web & Blockchain",
    status: "live",
    statusText: "LIVE",
    isFlagship: true,
    image: "/projects/genie-markets.png",
    imageAlt: "Genie Markets onchain prediction protocol landing page on Monad Testnet",
    gallery: [
      {
        url: "/projects/genie-markets.png",
        label: "Landing (Hero)",
        caption:
          "Protocol hero showcasing Pyth Entropy cryptographic randomness on Monad Testnet and up to 600x instant USDC payouts.",
        alt: "Genie Markets landing page hero section",
      },
      {
        url: "/projects/genie-markets-terminal.png",
        label: "Prediction Terminal",
        caption:
          "Live prediction execution arena with 3-digit combination selector, onchain vault balance, and Pyth Entropy proof telemetry.",
        alt: "Genie Markets live prediction terminal and onchain vault interface",
      },
      {
        url: "/projects/genie-markets-payouts.png",
        label: "Payout Architecture",
        caption:
          "Structured odds multiplier matrix detailing Single (9x), Exact Pair (90x), and Genie Trio (140x–600x) settlement tiers.",
        alt: "Genie Markets landing page feature section",
      },
      {
        url: "/projects/genie-markets-infrastructure.png",
        label: "Protocol Specs",
        caption:
          "System architecture breakdown covering ERC-4337 gasless smart accounts, Pyth Entropy callbacks, and stale-round recovery.",
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
      "Conventional onchain prediction games suffer from opaque off-chain randomness, slow block confirmations, and tedious wallet approval popups. Genie Markets delivers sub-second verifiable outcomes on Monad with zero gas friction.",
    summary:
      "High-throughput prediction protocol on Monad Testnet combining Pyth Entropy cryptographic randomness with Privy ERC-4337 smart accounts for instant, gas-sponsored USDC settlement.",
    capabilities: [
      {
        title: "Pyth Entropy Verifiable Randomness",
        desc: "Resolves 3-digit prediction draws onchain using Pyth Entropy cryptographic commit-reveal callbacks.",
      },
      {
        title: "ERC-4337 Zero-Gas Smart Accounts",
        desc: "Embedded Privy smart accounts sponsor all Monad transaction gas fees so players trade seamlessly with USDC.",
      },
      {
        title: "Tiered Multiplier Engine",
        desc: "Supports Single (9x), Exact Pair (90x), and Genie Trio (140x–600x) risk structures settled atomically.",
      },
      {
        title: "Permissionless Escrow Recovery",
        desc: "Built-in 24-hour stale round timeout recovery safeguards user principal if an external oracle callback is delayed.",
      },
    ],
    techStack: [
      "Monad Testnet",
      "Solidity",
      "Foundry",
      "Pyth Entropy",
      "Privy (ERC-4337)",
      "Next.js",
      "TypeScript",
    ],
    architectureNote:
      "Engineered settlement smart contracts on Monad EVM integrated directly with Pyth Entropy async callback handlers, paired with an ERC-4337 paymaster pipeline for gas-sponsored user predictions.",
  },
  {
    id: "devsafar",
    specId: "SPEC-03",
    title: "DevSafar",
    tagline:
      "Hackathon & coding competition discovery directory and team recruitment portal built for developers and students.",
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
        caption:
          "Public discovery portal indexing hackathons and coding competitions across 100+ global and regional platforms.",
        alt: "DevSafar hackathon discovery directory and team recruitment portal screenshot",
      },
      {
        url: "/projects/devsafar-dashboard.png",
        label: "Platform Shell",
        caption:
          "Authenticated developer workspace with sidebar navigation for tracking deadlines, finding teammates, chat, and alerts.",
        alt: "DevSafar authenticated web application console with sidebar navigation",
      },
      {
        url: "/projects/devsafar-directory.png",
        label: "Event Directory",
        caption:
          "Filterable tournament directory indexing 3,870+ hackathons with live countdowns, prize pools, and registration gates.",
        alt: "DevSafar hackathon directory with status filters and prize pools",
      },
    ],
    link: "https://www.devsafar.app/",
    isExternalLink: true,
    githubPrivate: true,
    problemSolved:
      "Student and indie developers frequently miss hackathons scattered across dozens of websites or drop out because they lack teammates with complementary skills. DevSafar unifies discovery and squad formation in one platform.",
    summary:
      "Full-stack developer competition hub aggregating 3,800+ hackathons, CTFs, and coding tournaments with live deadline tracking and skill-based teammate matchmaking.",
    capabilities: [
      {
        title: "Real-Time Deadline Telemetry",
        desc: "Live countdown engines tracking registration cutoffs, submission windows, and judging stages across time zones.",
      },
      {
        title: "Complementary Squad Matchmaking",
        desc: "Connects solo builders with frontend, backend, mobile, or UI/UX teammates before competition lock-in.",
      },
      {
        title: "Organizer Submission Pipeline",
        desc: "Self-serve event listing workflow with automated schema validation and instant community indexing.",
      },
      {
        title: "Sub-100ms Filtered Search",
        desc: "Indexed PostgreSQL queries filtering thousands of events by prize pool, modality, region, and tech stack.",
      },
    ],
    techStack: ["Next.js", "Supabase", "PostgreSQL", "TypeScript", "Tailwind CSS", "Puppeteer"],
    architectureNote:
      "Built automated scraping and ingestion pipelines feeding indexed Supabase PostgreSQL tables with optimistic client caching for sub-100ms directory filtering.",
  },
  {
    id: "kenzoku",
    specId: "SPEC-05",
    title: "Kenzoku Mobile App",
    tagline:
      "Interests-driven non-romantic matchmaking mobile app connecting people through shared niche passions.",
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
        caption:
          "Primary discovery card showing shared passion tags, compatibility signals, and tactile Pass / Connect actions.",
        alt: "Kenzoku mobile app user discovery interface showing profile card with shared passions and connect action",
      },
      {
        url: "/projects/kenzoku-discover-zarak.png",
        label: "Candidate Match",
        caption:
          "Candidate profile view highlighting tech, startup, and builder interest intersections.",
        alt: "Kenzoku discovery card showing candidate profile with tech and startups passion tags",
      },
      {
        url: "/projects/kenzoku-discover-nick.png",
        label: "Dossier Preview",
        caption:
          "Expanded candidate dossier card surfacing niche anime, gaming, and engineering passions.",
        alt: "Kenzoku discovery card showing niche anime and tech interests with dossier button",
      },
      {
        url: "/projects/kenzoku-interests.png",
        label: "Passion Index",
        caption:
          "Multi-domain passion taxonomy selector used to compute kindred compatibility vectors.",
        alt: "Kenzoku passion index tag selection interface to calculate kindred compatibility",
      },
      {
        url: "/projects/kenzoku-profile-setup.png",
        label: "Identity Dossier",
        caption:
          "Structured onboarding dossier capturing portrait, bio, personal motives, and city without clout metrics.",
        alt: "Kenzoku identity dossier onboarding screen for portrait, bio, motives, and location",
      },
      {
        url: "/projects/kenzoku-notifications.png",
        label: "Activity Notices",
        caption:
          "Incoming connection request queue with explicit consent gates (Pass or Accept) before chat unlocks.",
        alt: "Kenzoku activity log showing pending connection requests with pass and accept options",
      },
      {
        url: "/projects/kenzoku-chats.png",
        label: "Dispatch Index",
        caption:
          "Active peer conversation channels with unread indicators and instant dispatch search.",
        alt: "Kenzoku message channels list and dispatch search interface",
      },
      {
        url: "/projects/kenzoku-chat-thread.png",
        label: "Encrypted Chat",
        caption:
          "Real-time 1-to-1 messaging thread anchored by the mutual passion tags that sparked the connection.",
        alt: "Kenzoku direct encrypted messaging thread with shared passion indicator",
      },
      {
        url: "/projects/kenzoku-moderation.png",
        label: "Safety Controls",
        caption:
          "In-thread trust and safety controls enabling instant user reporting, muting, or permanent blocking.",
        alt: "Kenzoku user options and block dialog for trust and safety",
      },
      {
        url: "/projects/kenzoku-welcome.png",
        label: "Welcome Screen",
        caption:
          "Atmospheric onboarding entry introducing Kenzoku's 'Find Your People' kindred philosophy.",
        alt: "Kenzoku onboarding welcome screen with Find Your People branding",
      },
    ],
    link: "#",
    isExternalLink: false,
    githubUrl: "https://github.com/m-faran/kenzoku",
    problemSolved:
      "Modern social apps optimize for follower clout or romantic dating, leaving builders, hobbyists, and niche enthusiasts isolated. Kenzoku matches people strictly on shared obsessions—from robotics and indie dev to analog film and chess.",
    summary:
      "Cross-platform React Native social discovery application featuring passion-vector matching, consent-gated 1-to-1 messaging, and anti-clout profile dossiers.",
    capabilities: [
      {
        title: "Passion-Vector Matching",
        desc: "Ranks candidate dossiers by weighted overlap across curated hobby, craft, and technical interest tags.",
      },
      {
        title: "60fps Native Card Physics",
        desc: "Gesture-driven discovery cards running on the native UI thread via React Native Reanimated.",
      },
      {
        title: "Consent-Gated Messaging",
        desc: "Direct real-time chat threads unlock only after mutual connection acceptance, paired with block/report moderation.",
      },
      {
        title: "Zero-Clout Dossier Design",
        desc: "Eliminates public follower counts, likes, and algorithmic feeds in favor of high-signal personal dossiers.",
      },
    ],
    techStack: ["React Native", "Expo EAS", "TypeScript", "Reanimated", "Supabase", "NativeWind"],
    architectureNote:
      "Structured card gesture physics entirely on the native UI thread via Reanimated worklets while synchronizing real-time chat dispatches and presence over Supabase channels.",
  },
  {
    id: "ludo-elemental",
    specId: "SPEC-04",
    title: "Ludo Elemental",
    tagline:
      "Competitive multiplayer mobile board game augmenting classic Ludo with tactical elemental power-ups.",
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
        caption:
          "Game launch splash featuring elemental dice, power emblems, and asset preloading progress.",
        alt: "Ludo Elemental loading screen with element tokens",
      },
      {
        url: "/projects/ludo-elemental-board.png",
        label: "Game Board",
        caption:
          "Active 4-player turn-based match board with elemental pawn temples, dice physics, and ability cooldown meters.",
        alt: "Ludo Elemental active game board screenshot with pawns and power meters",
      },
      {
        url: "/projects/ludo-elemental-shop.png",
        label: "Cosmetic Shop",
        caption:
          "In-game cosmetic store for unlocking custom board themes (Classic, Anime Dream, Cyber Neon).",
        alt: "Ludo Elemental cosmetic shop screenshot showing board skins",
      },
      {
        url: "/projects/ludo-elemental-party.png",
        label: "Party Lobby",
        caption:
          "Private multiplayer room creation and alphanumeric party code sharing for playing with friends.",
        alt: "Ludo Elemental party code and room creation screen",
      },
      {
        url: "/projects/ludo-elemental-matchmaking.png",
        label: "Matchmaking",
        caption:
          "Real-time 4-player online matchmaking queue with live seat status and latency synchronization.",
        alt: "Ludo Elemental online multiplayer matchmaking search screen",
      },
      {
        url: "/projects/ludo-elemental-settings.png",
        label: "Settings",
        caption:
          "Player profile configuration, Google Sign-In linking, and custom elemental audio/SFX mixers.",
        alt: "Ludo Elemental settings screen with audio and player account controls",
      },
    ],
    link: "#",
    isExternalLink: false,
    githubPrivate: true,
    problemSolved:
      "Traditional mobile board games rely purely on random dice luck, leading to repetitive gameplay. Ludo Elemental introduces tactical player agency through deployable Fire, Water, Earth, and Wind abilities.",
    summary:
      "Real-time 4-player mobile board game built for Android & iOS featuring a deterministic turn-based state machine, private party lobbies, online matchmaking, and elemental skill cooldowns.",
    capabilities: [
      {
        title: "Deterministic Game State Engine",
        desc: "Custom turn-based state machine governing pawn collisions, elemental buffs, shield states, and cooldown counters.",
      },
      {
        title: "Drop-Safe Multiplayer Reconnect",
        desc: "Session state reconciliation that restores active matches seamlessly after mobile network drops.",
      },
      {
        title: "Party Codes & Live Matchmaking",
        desc: "Supports both instant public 4-player matchmaking queues and private room codes for friend lobbies.",
      },
    ],
    techStack: ["React Native", "Expo", "TypeScript", "Socket.io", "Deterministic State Machine"],
    architectureNote:
      "Designed a deterministic state transition engine with server-authoritative turn validation and rollback reconciliation to keep all 4 mobile clients synchronized under variable latency.",
  },
  {
    id: "stormpkr-web",
    specId: "SPEC-08",
    title: "StormPKR Website & KYC Hub",
    tagline:
      "Marketing landing portal, regulatory CNIC KYC onboarding flow, and customer support hub for the StormPKR ecosystem.",
    category: "web",
    categoryLabel: "Web",
    status: "live",
    statusText: "LIVE",
    image: "/projects/stormpkr-web.png",
    imageAlt:
      "StormPKR web landing page hero showcasing instant rupee transfers without banks and 3D coin visual",
    gallery: [
      {
        url: "/projects/stormpkr-web.png",
        label: "Landing (Hero)",
        caption:
          "High-contrast web hero presenting instant digital rupee transfers without banks alongside a 3D $SPKR coin render.",
        alt: "StormPKR web landing page hero showcasing instant rupee transfers without banks and 3D coin visual",
      },
      {
        url: "/projects/stormpkr-web-features.png",
        label: "Feature Architecture",
        caption:
          "Core value proposition grid detailing 1:1 PKR reserve parity, zero hidden fees, and instant settlement.",
        alt: "StormPKR feature grid highlighting 1:1 rupee peg, instant transfers, no hidden fees, and transparency",
      },
      {
        url: "/projects/stormpkr-web-kyc.png",
        label: "KYC Compliance Hub",
        caption:
          "Regulatory identity verification overview outlining Pakistani CNIC compliance tiers and wallet limits.",
        alt: "StormPKR regulatory CNIC identity verification overview and compliance requirements screen",
      },
      {
        url: "/projects/stormpkr-web-kyc-form.png",
        label: "KYC Form Flow",
        caption:
          "Multi-step CNIC personal information intake and front/back identity document upload pipeline.",
        alt: "StormPKR CNIC personal information entry and document upload multi-step onboarding form",
      },
      {
        url: "/projects/stormpkr-web-support.png",
        label: "Customer Support Desk",
        caption:
          "Dedicated customer helpdesk portal integrating direct WhatsApp support routing and email ticket dispatch.",
        alt: "StormPKR customer helpdesk portal with direct WhatsApp messaging and email support channels",
      },
      {
        url: "/projects/stormpkr-web-faq.png",
        label: "FAQ & Waitlist",
        caption:
          "Interactive FAQ knowledge base paired with early-access waitlist registration.",
        alt: "StormPKR frequently asked questions accordion and early access waitlist signup form",
      },
      {
        url: "/projects/stormpkr-web-cta.png",
        label: "Conversion Banner",
        caption:
          "Full-width conversion banner and ecosystem navigation footer.",
        alt: "StormPKR dark contrast conversion call-to-action banner and platform navigation footer",
      },
    ],
    link: "#",
    isExternalLink: false,
    githubPrivate: true,
    problemSolved:
      "Launching a regional fiat-pegged stablecoin requires bridging mainstream consumer trust with strict regulatory identity verification. StormPKR Website unifies public education, CNIC KYC compliance, and live user support.",
    summary:
      "Companion web platform for the StormPKR ecosystem housing the product marketing portal, a multi-step Pakistani CNIC KYC verification workflow, waitlist capture, and omnichannel customer support.",
    capabilities: [
      {
        title: "Multi-Step CNIC KYC Pipeline",
        desc: "Structured identity verification flow validating Pakistani CNIC numbers and capturing identity document uploads.",
      },
      {
        title: "3D Stablecoin Visual Presentation",
        desc: "High-trust editorial landing experience explaining 1:1 PKR reserve backing and gasless settlement.",
      },
      {
        title: "Omnichannel Support Desk",
        desc: "Integrated support routing connecting users directly to WhatsApp helpdesk agents and structured ticket queues.",
      },
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "3D Asset Pipeline", "KYC Form Validation"],
    architectureNote:
      "Built a multi-step client-validated KYC document intake pipeline with strict CNIC format verification, progressive disclosure FAQs, and responsive conversion layouts.",
  },
  {
    id: "kenzoku-web",
    specId: "SPEC-09",
    title: "Kenzoku Narrative Portal",
    tagline:
      "Atmospheric narrative landing portal with six-stratum scrollytelling and anti-clout social philosophy for the Kenzoku ecosystem.",
    category: "web",
    categoryLabel: "Web",
    status: "live",
    statusText: "LIVE",
    image: "/projects/kenzoku-web.png",
    imageAlt:
      "Kenzoku landing page hero with twilight firefly visual and interest-based matchmaking value proposition",
    gallery: [
      {
        url: "/projects/kenzoku-web.png",
        label: "Landing (Hero)",
        caption:
          "Atmospheric twilight hero introducing Kenzoku's interest-first social graph and mobile store entry points.",
        alt: "Kenzoku landing page hero with twilight firefly visual and interest-based matchmaking value proposition",
      },
      {
        url: "/projects/kenzoku-web-problem.png",
        label: "The Problem (Stratum I)",
        caption:
          "Stratum I narrative dissecting algorithmic monetization and performative social feeds.",
        alt: "Kenzoku interactive narrative section dissecting algorithmic monetization and performative social feeds",
      },
      {
        url: "/projects/kenzoku-web-clearing.png",
        label: "Shared Obsession (Stratum II)",
        caption:
          "Stratum II visual chapter illustrating kindred synchronization across shared niche obsessions.",
        alt: "Kenzoku narrative stratum explaining isolation on modern platforms and kindred interest synchronization",
      },
      {
        url: "/projects/kenzoku-web-artifacts.png",
        label: "Niche Passions (Stratum III)",
        caption:
          "Stratum III artifact showcase highlighting analog photography, vinyl audio, and tactile craft hobbies.",
        alt: "Kenzoku niche passion artifacts showcase highlighting analog photography, vinyl audio, and craft hobbies",
      },
      {
        url: "/projects/kenzoku-web-anti-clout.png",
        label: "Anti-Clout Design (Stratum IV)",
        caption:
          "Stratum IV architectural manifesto detailing zero follower rankings and buried vanity metrics.",
        alt: "Kenzoku anti-clout design philosophy with buried like counters and zero follower rankings",
      },
      {
        url: "/projects/kenzoku-web-safety.png",
        label: "Safety Sanctuary (Stratum V)",
        caption:
          "Stratum V trust and safety breakdown covering 18+ verification and consent-gated 1-to-1 boundaries.",
        alt: "Kenzoku safety architecture featuring 18+ verification and consent-gated one-to-one boundary shielding",
      },
      {
        url: "/projects/kenzoku-web-bedrock.png",
        label: "Living Bedrock (Stratum VI)",
        caption:
          "Stratum VI exploration of the Japanese etymology of 'Kenzoku' (kindred / family of shared purpose).",
        alt: "Kenzoku Japanese etymology exploration illustrating deep kindred connection through glowing roots",
      },
      {
        url: "/projects/kenzoku-web-cta.png",
        label: "Call to Action & Footer",
        caption:
          "Final conversion stratum with iOS App Store and Google Play badges and compliance documentation.",
        alt: "Kenzoku conversion section with mobile store availability badges, copyright, and compliance links",
      },
    ],
    link: "#",
    isExternalLink: false,
    githubPrivate: true,
    problemSolved:
      "Conventional app landing pages rely on generic feature bullets that fail to communicate the emotional and architectural shift of an anti-clout social network. Kenzoku's web portal immerses visitors through a six-stratum narrative.",
    summary:
      "Bespoke narrative web portal guiding visitors through six thematic depth strata—from the alienation of algorithmic feeds to Kenzoku's passion-vector architecture and safety sanctuary.",
    capabilities: [
      {
        title: "Six-Stratum Scrollytelling",
        desc: "Choreographed chapter progression (Stratum I–VI) pacing typography, illustrations, and atmospheric depth transitions.",
      },
      {
        title: "Anti-Clout Design Manifesto",
        desc: "Interactive visual breakdowns demonstrating how Kenzoku removes vanity counters and performative leaderboards.",
      },
      {
        title: "Safety & Consent Architecture",
        desc: "Clear documentation of 18+ age gates, mutual-consent chat unlocking, and zero-tolerance moderation.",
      },
    ],
    techStack: ["Next.js", "TypeScript", "GSAP", "Tailwind CSS", "Responsive Scrollytelling"],
    architectureNote:
      "Engineered a six-stratum scroll progression combining GSAP viewport triggers, zero-CLS high-resolution visual plates, and accessible reduced-motion fallbacks.",
  },
];
