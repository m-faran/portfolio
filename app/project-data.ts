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

export interface Project {
  id: string;
  specId: string;
  title: string;
  category: "mobile" | "web";
  categoryLabel: string;
  status: "live" | "testing";
  gallery: ProjectGalleryItem[];
  link: string;
  isExternalLink: boolean;
  githubUrl?: string;
  githubLinks?: ProjectGithubLink[];
  githubPrivate?: boolean;
  summary: string;
  techStack: string[];
}

export const PROJECTS: Project[] = [
{
    id: "stormpkr",
    specId: "SPEC-01",
    title: "StormPKR Mobile Wallet",
    category: "mobile",
    categoryLabel: "Mobile",
    status: "testing",
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
    summary:
      "A simple and secure mobile wallet for sending and receiving digital rupees ($SPKR) instantly with zero transfer fees. Built to feel just like a familiar everyday payment app with quick sign-in, PIN protection, and effortless balance management.",
    techStack: [
      "React Native",
      "Expo",
      "TypeScript",
    ],
  },
{
    id: "chundrigar-capital",
    specId: "SPEC-02",
    title: "Chundrigar Capital",
    category: "web",
    categoryLabel: "Web",
    status: "live",
    gallery: [
      {
        url: "/projects/chundrigar-capital.png",
        label: "Overview",
        caption:
          "Financial portal dashboard featuring live market data and 3-step digital trade settlement.",
        alt: "Chundrigar Capital Pakistan Stock Exchange shares platform screenshot",
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
          "Execution terminal with historical candlestick charting, live market feed, and fast digital payment options.",
        alt: "Chundrigar Capital trading terminal with candlestick chart",
      },
      {
        url: "/projects/chundrigar-kyc.png",
        label: "Identity Check",
        caption:
          "Fast online investor identity verification and compliance onboarding workflow.",
        alt: "Chundrigar Capital investor identity verification step",
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
    summary:
      "A modern web trading platform for Pakistan Stock Exchange (KSE-100) shares, featuring live market data, interactive price charts, and fast digital order settlement in a clean financial dashboard.",
    techStack: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
    ],
  },
{
    id: "roaring-bulls",
    specId: "SPEC-03",
    title: "Roaring Bulls",
    category: "web",
    categoryLabel: "Web",
    status: "live",
    gallery: [
      {
        url: "/projects/roaring-bulls.png",
        label: "Overview",
        caption:
          "Interactive dashboard for curating and investing in popular global stock baskets.",
        alt: "Roaring Bulls stock basket trading platform screenshot",
      },
      {
        url: "/projects/roaring-bulls-swipe.png",
        label: "Swipe Deck",
        caption:
          "Fixed-budget asset swipe allocation deck showing stock cards, risk tiers, and a live basket cart.",
        alt: "Roaring Bulls swipe-based equity curation deck and basket calculator",
      },
      {
        url: "/projects/roaring-bulls-tape.png",
        label: "Search The Tape",
        caption:
          "Searchable directory of 135+ top equities (TSLA, NVDA, GOOGL) with real-time price quotes and 24h metrics.",
        alt: "Roaring Bulls live stock tape with real-time market pricing",
      },
    ],
    link: "https://roaring-bulls.vercel.app/",
    isExternalLink: true,
    githubUrl: "https://github.com/m-faran/roaring-bulls",
    summary:
      "A fast and intuitive web trading application that lets users discover and buy popular stock baskets (like Apple, Tesla, and Nvidia) using a simple swipe-based interface and 1-click checkout.",
    techStack: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
    ],
  },
{
    id: "ludo-elemental",
    specId: "SPEC-04",
    title: "Ludo Elemental",
    category: "mobile",
    categoryLabel: "Mobile",
    status: "live",
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
    link: "https://play.google.com/store/apps/details?id=com.stymite.ludoelemental",
    isExternalLink: true,
    githubPrivate: true,
    summary:
      "A fast-paced 4-player mobile board game for Android & iOS that revamps classic Ludo with elemental powers (Fire, Water, Earth, Wind), online matchmaking, and private lobbies to play with friends.",
    techStack: ["React Native", "Expo", "TypeScript", "Socket.io"],
  },
{
    id: "kenzoku",
    specId: "SPEC-05",
    title: "Kenzoku Mobile App",
    category: "mobile",
    categoryLabel: "Mobile",
    status: "testing",
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
    summary:
      "A mobile social app for connecting people through shared hobbies and niche passions—from tech and gaming to anime and creative arts—featuring private direct messaging and zero vanity follower counts.",
    techStack: ["React Native", "Expo EAS", "TypeScript", "Reanimated", "Supabase", "NativeWind"],
  },
{
    id: "devsafar",
    specId: "SPEC-06",
    title: "DevSafar",
    category: "web",
    categoryLabel: "Web",
    status: "live",
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
    summary:
      "Full-stack developer competition hub aggregating 3,800+ hackathons, CTFs, and coding tournaments with live deadline tracking and skill-based teammate matchmaking.",
    techStack: ["Next.js", "Supabase", "PostgreSQL", "TypeScript", "Tailwind CSS", "Puppeteer"],
  },
{
    id: "stormpkr-web",
    specId: "SPEC-07",
    title: "StormPKR Website & KYC Hub",
    category: "web",
    categoryLabel: "Web",
    status: "live",
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
    link: "https://stormpkr.vercel.app/",
    isExternalLink: true,
    githubPrivate: true,
    summary:
      "Product landing portal and verification hub for the StormPKR ecosystem, featuring an interactive product showcase, multi-step identity verification flow, and integrated customer support desk.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
{
    id: "kenzoku-web",
    specId: "SPEC-08",
    title: "Kenzoku Narrative Portal",
    category: "web",
    categoryLabel: "Web",
    status: "live",
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
    link: "https://kenzoku.codekin.xyz/",
    isExternalLink: true,
    githubPrivate: true,
    summary:
      "An atmospheric narrative web portal presenting the philosophy, safety principles, and interest-based community design of the Kenzoku ecosystem through an immersive visual story.",
    techStack: ["Next.js", "React", "TypeScript", "GSAP", "Tailwind CSS"],
  },
{
    id: "genie-markets",
    specId: "SPEC-09",
    title: "Genie Markets",
    category: "web",
    categoryLabel: "Web",
    status: "live",
    gallery: [
      {
        url: "/projects/genie-markets.png",
        label: "Landing (Hero)",
        caption:
          "Platform hero showcasing interactive number prediction mechanics and up to 600x instant multiplier payouts.",
        alt: "Genie Markets landing page hero section",
      },
      {
        url: "/projects/genie-markets-terminal.png",
        label: "Prediction Terminal",
        caption:
          "Live prediction execution arena with 3-digit combination selector, account balance, and real-time round telemetry.",
        alt: "Genie Markets live prediction terminal and account interface",
      },
      {
        url: "/projects/genie-markets-payouts.png",
        label: "Payout Architecture",
        caption:
          "Structured odds multiplier matrix detailing Single (9x), Exact Pair (90x), and Genie Trio (140x–600x) payout tiers.",
        alt: "Genie Markets landing page feature section",
      },
      {
        url: "/projects/genie-markets-infrastructure.png",
        label: "Platform Specs",
        caption:
          "System architecture breakdown covering responsive interface engineering, instant settlement, and round recovery.",
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
    summary:
      "A fast-paced interactive prediction web application featuring real-time 3-digit number draws, instant digital prize payouts, dynamic multiplier boards, and a modern financial dashboard interface.",
    techStack: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
    ],
  },
];
