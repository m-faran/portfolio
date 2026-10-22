"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Project Data Schema
interface ProjectGalleryItem {
  url: string;
  label: string;
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
        alt: "Roaring Bulls Solana tokenized equities trading platform screenshot",
      },
      {
        url: "/projects/roaring-bulls-swipe.png",
        label: "Swipe Deck",
        alt: "Roaring Bulls swipe-based equity curation deck and basket calculator",
      },
      {
        url: "/projects/roaring-bulls-tape.png",
        label: "Search The Tape",
        alt: "Roaring Bulls live tokenized equity tape with real-time market pricing",
      },
    ],
    link: "https://roaring-bulls.vercel.app/",
    isExternalLink: true,
    githubUrl: "https://github.com/m-faran/roaring-bulls",
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
        alt: "Chundrigar Capital Pakistan Stock Exchange tokenized shares platform screenshot",
      },
      {
        url: "/projects/chundrigar-markets.png",
        label: "KSE-100 Markets",
        alt: "Chundrigar Capital KSE-100 index scrip working list and sector filters",
      },
      {
        url: "/projects/chundrigar-trade.png",
        label: "Trading Terminal",
        alt: "Chundrigar Capital Allied Bank trading terminal with candlestick chart and dual payment rails",
      },
      {
        url: "/projects/chundrigar-kyc.png",
        label: "Identity Check",
        alt: "Chundrigar Capital investor identity verification and whitelist compliance step",
      },
      {
        url: "/projects/chundrigar-heritage.png",
        label: "Heritage",
        alt: "Chundrigar Capital I.I. Chundrigar Road architectural landmark illustration",
      },
    ],
    link: "https://chundrigar-capital.vercel.app/",
    isExternalLink: true,
    githubUrl: "https://github.com/m-faran/chundrigar-capital",
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
        alt: "DevSafar hackathon discovery directory and team recruitment portal screenshot",
      },
      {
        url: "/projects/devsafar-dashboard.png",
        label: "Platform Shell",
        alt: "DevSafar authenticated web application console with sidebar navigation",
      },
      {
        url: "/projects/devsafar-directory.png",
        label: "Event Directory",
        alt: "DevSafar hackathon directory with status filters and prize pools",
      },
    ],
    link: "https://www.devsafar.app/",
    isExternalLink: true,
    githubPrivate: true,
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
        alt: "Ludo Elemental loading screen with element tokens",
      },
      {
        url: "/projects/ludo-elemental-board.png",
        label: "Game Board",
        alt: "Ludo Elemental active game board screenshot with pawns and power meters",
      },
      {
        url: "/projects/ludo-elemental-shop.png",
        label: "Cosmetic Shop",
        alt: "Ludo Elemental cosmetic shop screenshot showing board skins",
      },
      {
        url: "/projects/ludo-elemental-party.png",
        label: "Party Lobby",
        alt: "Ludo Elemental party code and room creation screen",
      },
      {
        url: "/projects/ludo-elemental-matchmaking.png",
        label: "Matchmaking",
        alt: "Ludo Elemental online multiplayer matchmaking search screen",
      },
      {
        url: "/projects/ludo-elemental-settings.png",
        label: "Settings",
        alt: "Ludo Elemental settings screen with audio and player account controls",
      },
    ],
    link: "#",
    isExternalLink: false,
    githubPrivate: true,
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
        alt: "Kenzoku mobile app user discovery interface with passion matching tags",
      },
      {
        url: "/projects/kenzoku-interests.png",
        label: "Interests",
        alt: "Kenzoku interest tag selection interface",
      },
      {
        url: "/projects/kenzoku-profile-setup.png",
        label: "Profile Setup",
        alt: "Kenzoku profile creation and bio setup screen",
      },
      {
        url: "/projects/kenzoku-chats.png",
        label: "Direct Chats",
        alt: "Kenzoku direct peer messaging screen",
      },
      {
        url: "/projects/kenzoku-notifications.png",
        label: "Notifications",
        alt: "Kenzoku connection requests and activity notifications screen",
      },
      {
        url: "/projects/kenzoku-welcome.png",
        label: "Welcome",
        alt: "Kenzoku onboarding welcome screen",
      },
      {
        url: "/projects/kenzoku-signup.png",
        label: "Create Account",
        alt: "Kenzoku account registration screen",
      },
      {
        url: "/projects/kenzoku-login.png",
        label: "Login",
        alt: "Kenzoku user login and password recovery screen",
      },
    ],
    link: "#",
    isExternalLink: false,
    githubUrl: "https://github.com/m-faran/kenzoku",
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
        alt: "Genie Markets landing page hero section",
      },
      {
        url: "/projects/genie-markets-terminal.png",
        label: "Terminal",
        alt: "Genie Markets live prediction terminal and onchain vault interface",
      },
      {
        url: "/projects/genie-markets-payouts.png",
        label: "Landing (Features)",
        alt: "Genie Markets landing page feature section",
      },
      {
        url: "/projects/genie-markets-infrastructure.png",
        label: "Landing (Overview)",
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
          <svg viewBox="-11.5 -10.23 23 20.46" className="w-5 h-5 text-[#61DAFB]" fill="currentColor">
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
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
            <path d="M18.665 21.978a10 10 0 1 1 3.313-3.322l-8.665-11.127H10.5v8.942h1.666V10.15l7.165 9.183.003-.004c-.218.232-.442.456-.669.649zm-4.331-4.821l1.666 2.138A9.97 9.97 0 0 0 22 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10c2.04 0 3.93-.612 5.5-1.665l-3.166-4.178v1z" />
          </svg>
        ),
      },
      {
        name: "TypeScript",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
            <rect width="24" height="24" rx="4" fill="#3178C6" />
            <path d="M11.5 9H6v2h2.2v8h2.6v-8H13V9h-1.5zm6.8 3.5c-1.3-.4-2-.8-2-1.5 0-.7.6-1.1 1.6-1.1.9 0 1.7.3 2.3.7l.8-1.7c-.8-.6-1.9-.9-3.2-.9-2.3 0-3.9 1.3-3.9 3.2 0 1.8 1.2 2.7 3.1 3.3 1.4.5 1.8.9 1.8 1.6 0 .8-.8 1.3-1.9 1.3-1.2 0-2.3-.5-3.1-1.2l-.9 1.8c1 .8 2.4 1.3 3.9 1.3 2.6 0 4.3-1.3 4.3-3.4 0-1.9-1.2-2.9-2.8-3.4z" fill="#fff" />
          </svg>
        ),
      },
      {
        name: "JavaScript",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
            <rect width="24" height="24" rx="4" fill="#F7DF1E" />
            <path d="M7.5 18c-.8 0-1.5-.3-2-.7l.8-1.5c.3.3.7.5 1.2.5.6 0 1-.3 1-1V8.5H11v6.8c0 1.8-1.1 2.7-3.5 2.7zm8.5 0c-2.3 0-3.7-1.3-3.7-3.2l2.2-.1c.1 1 .8 1.5 1.6 1.5.8 0 1.4-.4 1.4-1 0-.7-.5-1-1.6-1.4-2.1-.7-3.3-1.4-3.3-3.1 0-1.8 1.4-3.2 3.6-3.2 1.8 0 3 .8 3.5 1.9l-1.9 1.1c-.3-.6-.8-1-1.6-1s-1.2.4-1.2 1c0 .6.4.9 1.4 1.3 2.3.8 3.5 1.6 3.5 3.3 0 2-1.6 3.4-3.9 3.4z" fill="#000" />
          </svg>
        ),
      },
      {
        name: "HTML",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
            <path d="M3 2l1.8 17.5L12 22l7.2-2.5L21 2H3zm14.8 5.7h-7.6l.2 2.3h7.2l-.6 6.3-4.6 1.3-4.6-1.3-.3-3.3h2.3l.1 1.5 2.5.7 2.5-.7.3-2.9H7.6l-.6-6.6h11l-.2 2.7z" fill="#E34F26" />
          </svg>
        ),
      },
      {
        name: "CSS",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
            <path d="M3 2l1.8 17.5L12 22l7.2-2.5L21 2H3zm13.7 5.7l-.3 3.3h-4.4v2.3h4.2l-.5 5.3-3.7 1-3.7-1-.3-2.7h2.3l.1 1.2 1.6.4 1.6-.4.2-2h-5.8l-.6-6.6h10.9z" fill="#2997FF" />
          </svg>
        ),
      },
      {
        name: "Tailwind CSS",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#38BDF8]" fill="currentColor">
            <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
          </svg>
        ),
      },
      {
        name: "Vite",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
            <path d="M21.5 3.5L12.7 20.8a.7.7 0 0 1-1.3 0L2.5 3.5a.7.7 0 0 1 .8-.9l8.4 1.5a.7.7 0 0 0 .3 0l8.7-1.5a.7.7 0 0 1 .8.9z" fill="#646CFF" />
            <path d="M14.6 3.3L8.8 13.5h3.6L10.3 20l7.3-10.7h-3.8l1.8-6h-1z" fill="#FFD43B" />
          </svg>
        ),
      },
      {
        name: "GSAP",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#88CE02]" fill="currentColor">
            <path d="M17.21 0c-.545.003-1.084.134-1.256.367-.11.165-.192 1.196-.11 1.718 0 0 .032.345.09.614a14.6 14.6 0 0 1-.02.182 7.024 7.024 0 0 1-.097.605c-.01.056-.207.095-.425.152a2.495 2.495 0 0 0-.138-.042c-.234-.069-.385.123-.618.26-.069-.04-.371-.178-.536-.082-.165.096-.275.193-.44.261-.082-.041-.302-.041-.48.028a1.27 1.27 0 0 0-.483.278c-2.314.58-4.813 1.635-5.012 1.741-1.017.522-2.679 1.415-3.434 2.033-1.291 1.071-2.06 2.322-2.363 3.242-.385 1.14-.275 1.827.096 1.387.298-.366 1.632-1.454 2.475-1.999l-.002.007a3.219 3.219 0 0 1 .44-.26l.233-.124.505-.323c.602.552.803 1.433.937 2.63.22 1.841 1.704 2.693 3.434 2.72 1.8.028 2.446.399 3.119 1.305.153.201.318.307.47.368a1.954 1.954 0 0 0-.16.405c-.075.17-.125.38-.157.608a.157.157 0 0 0-.03.075c-.068.536-.055 1.8-.068 2.473-.014.673-.028.77-.083.866-.055.11-.11.178-.178.467-.069.302-.193.384-.316.631-.206.385-.165.81.041 1.003.206.192.77.481 1.538.385.77-.096.88-.151.756-.893-.014-.11-.192-.605-.137-.797.082-.206-.096-.563-.055-.577.041-.014.096-.288.096-.426 0-.137-.014-.796.137-1.14.062-.14.193-.46.326-.785.442-.723.459-1.161.48-1.41.03-.202.046-.46.018-.744.055-.083.289-.275.316-.646 0 0 .644-.337 1.102-1.148.16.557.31.91.286 1.272-.499.39-.684.678-.76.959-.048-.02-.076-.037-.11-.04h-.027a.437.437 0 0 0-.106.029c-.192.068-.041 1.318.165 1.827.206.508.316.81.398 1.36.083.549-.192 1.222-.302 1.524 0 0-.179.536.233.824.358.248 1.704.18 2.308.18.605 0 1.511.219 2.088.109.715-.124.824-.55.399-.77-.426-.22-1.072-.329-1.91-.933-.22-.152-.522-.289-.563-.412-.041-.124-.041-.838-.027-1.457.013-.618.22-1.414.288-1.84.064-.398-.076-.388-.262-.351.032-.147.066-.292.097-.446.344-.632.193-1.223.193-1.223.82-1.044.4-3.27.22-4.048.64.303.96.188.96.188.102-.055.192-.134.274-.224.337-.362.51-.916.51-.916V11c.782-.783 1.151-1.936.26-2.692a1.331 1.331 0 0 0-.219-1.263 1.56 1.56 0 0 0-.37-1.731 1.36 1.36 0 0 0-.487-.297c-.2-.295-.245-.417-.572-.349-.15-.165-.178-.288-.494-.178 0 0-.096-.234-.275-.289a.25.25 0 0 0-.05-.015c-.302-.21-.576-.215-.772-.16-.064-.048-.061-.124-.07-.388-.008-.2-.019-.486-.031-.744.027-.328.102-.974.126-1.303.028-.37.042-.948-.123-1.195C18.303.12 17.754-.003 17.21 0zm-.005.34c.7 0 1.002.22 1.044.343.013.028.082.495.04.797-.013.11-.027.509-.054.687-.014.179-.069.385-.124.673-.041.234-.233.495-.384.536-.261.069-.742.055-1.017 0-.069-.014-.124-.055-.192-.096-.151-.248-.234-.44-.261-.742-.028-.289-.083-.412-.096-.632-.014-.33-.014-.55-.014-.55.014-.178.069-.618.069-.659.013-.123.233-.357.989-.357zm-1.133 2.702c.146.149.301.306.432.416.124.11.426.096.7.096.248 0 .468.028.564-.027.154-.077.355-.235.523-.394.011.152.022.304.026.435.01.295-.043.468.024.57-.082.048-.174.105-.269.156-.151.08-.306.136-.403.115h-.002c-.209-.035-.931-.215-1.331-.407-.167-.259-.335-.398-.326-.448.027-.137.04-.247.054-.425.004-.03.005-.058.008-.088zm-.853.69l.035.001c.424.036.65.152.808.284l.076.03.008-.027c.047.03.102.06.162.088.47.159 1.104.308 1.309.353.247.055.645-.192.838-.316.343-.22.783-.04.989.193.137.15.192.247.192.288.316-.11.357.041.508.206.385-.179.412.041.44.137-.122 0-.298.014-.538.04l-.012-.012c-.144-.153-.402-.289-.599-.384-.087-.031-.18-.049-.252-.097-.11-.055-.22-.137-.385-.123-.687.082-.824.315-1.415.178-.577-.134-.737-.254-1.333-.221l.001.026c-.105.016-.2.03-.22.03-.206.012-.722.067-1.153-.1a1.256 1.256 0 0 0-.161-.076l-.005-.002h-.001c-.18-.07-.39-.11-.63-.112h-.026c.218-.11.356-.259.56-.218.22.041.44.22.564.357a.858.858 0 0 0-.178-.288c.128-.09.245-.229.418-.234zm-1.1.545c.15.002.28.026.417.073.018.009.034.018.059.029.288.137.81.164 1.25.137a2.26 2.26 0 0 0 .563-.095c.322.024.514.11.977.216.31.07.502.045.695-.007.193-.053.386-.13.723-.17a.542.542 0 0 1 .188.013c.038.02.075.04.11.061.062.049.214.135.343.189.164.068.59.357.645.425a.1.1 0 0 0 .038.03c.242.314.407.755.396 1.21-.06.46-.426.214-.626.12-.412-.178-.824-.302-1.305-.302-.48 0-1.099.041-1.635.179-.741.206-.961.192-1.29.027-.33-.178-.907-.618-.907-.618v.01c-.007-.007-.012-.012-.014-.01-.042.069-.138.247-.193.33-.027.522-.343 1.346-.934 1.552a.547.547 0 0 1-.467-.041 2.503 2.503 0 0 0-.55-.275c.481.384.729.673.949 1.181.174.43.415 1.017 1.002 1.646.363-.004.725.097.962.346.137.137.357.289.33.426 0 .041-.083.151-.151.234a3.231 3.231 0 0 1-.207.22c-.054.04-.247.192-.288.22-.041.027-.096.095-.137.109-.138.069-.289.014-.426-.055s.027-.082-.124-.192c-.34-.24-.541-.411-.454-.832-.932-.794-2.561-1.26-2.911-2.108-.22-.55-.248-.824-.042-1.058.605-.687.371-1.346.825-1.634.425-.275.783.04.989.33-.124-.509-.55-.633-.55-.674 0-.632.605-1.071 1.21-1.181.218-.041.389-.062.54-.06zm-1.847.534c-.14.196-.231.435-.246.721-.206.028-.673.055-.907.907a3.39 3.39 0 0 1-.214.62c-.103.045-2.946 1.274-5.229 2.542l-.01-.007c-.32.18-.627.363-.919.546l-.125.077-.001.003c-1.136.723-2.04 1.45-2.637 2.112.412-2.679 2.528-4.08 3.53-4.698 2.42-1.489 4.629-2.225 6.758-2.823zm8.037.323c.26-.004.536.06.756.275.59.577.425 1.209.247 1.648.15.179.508.687.288 1.291-.04.138-.343.138-.563.495.55-.316.893-.233 1.017.165.192.618-.234 1.36-.605 1.772 0-.014-.014-.028-.014-.041-.055.206-.123.604-.535 1.044-.206.22-.371.192-.605.137-.215-.054-.322-.142-.543-.276-.036-.207-.102-.482-.102-.59 0-.044-.004-.141-.01-.243.032-.036.066-.074.106-.114 0 0 .178-.247.44-.233.26.014.535-.041.604-.11 0-.48-.55-.494-.357-1.319.013-.04.082-.11.302-.137-.33-.069-.48-.083-.714-.302l-.013-.013c.11-.253.224-.457.301-.605.193-.385.082-.852.082-.852.207-.069.385-.179.413-.247.203-.673-.164-1.322-.605-1.74.036-.003.073-.005.11-.006zm-5.46.925c.01.016.02.033.034.05.179.22.577.495 1.113.673.26.083.467.028.7-.027 1.123-.278 2.304-.346 3.33.155a1.82 1.82 0 0 1-.157 1.068c-.232.465-.533 1.068-.48 2.215-.246.044-1.419.144-1.992.037-.521-.097-1.416-.525-1.62-.69a6.703 6.703 0 0 1-.125-.848 1.37 1.37 0 0 0 .454-.343c-.412.068-.577.04-.825-.097-.235-.13-.642-.533-.87-.82.229-.29.393-.69.335-1.226.037-.05.07-.099.102-.147zm-4.38 1.598c-.09.253.093.654.224.953.508 1.179 2.07 1.29 3.127 2.18a.723.723 0 0 0 .06.388c.083.165.371.413.371.413-.055.054-.027.164-.027.164.204.217.504.243.547.246-.435 1.248-.816 2.626-.451 4.095-.179.244-.368.445-.531.668a.851.851 0 0 1-.444-.31c-.591-.852-1.457-1.416-3.023-1.374-2.349.055-3.283-.907-3.461-2.748-.094-.974-.357-1.922-.888-2.479C7.489 9.014 9.6 7.937 10.268 7.73a2.8 2.8 0 0 0 .2-.073zm3.496.18c.381.442.795.727 1.193.979.082.343.11.577.192 1.03h-.041l-.027.308a2.836 2.836 0 0 0-.62-.113l.001-.003c-.893-1.057-.7-1.47-1.058-2.019.097-.034.225-.094.36-.182zm5.911 1.086c.076.067.178.12.323.154-.327.68.33.912.37 1.17-.143.083-.367.037-.603.025-.115-.006-.229.065-.321.147l.032-.367c.006-.43.09-.809.2-1.13zM15.79 9.947c.024.035.178.131 1.002.352 1.026.275 2.323.12 2.55.09a.378.378 0 0 1-.022.089c0 .343.055.59.096.81.053.308.13.533.163.74l.008-.007c.234 1.367.561 3.133-.267 4.048.041.192.069.467.014.783a3.204 3.204 0 0 1-.151.535 2.29 2.29 0 0 0-.108.352c-1.1.142-1.755.055-2.06-.015.123-.374.407-.754.876-.735-.022-.911-.264-1.223-.511-1.891.395-.883.299-1.665.621-2.848-.247.261-.44 1.209-.604 1.786-.206.838-.563 1.648-1.525 2.294 0 .22-.069.384-.151.494-.179.261-.412.344-.494.77.11-.138.26-.261.26-.22a8.51 8.51 0 0 1-.025.493l.012.001c-.165 1.044-.522 1.525-.742 2.115-.151.426-.096 1.36-.151 1.374-.385.083-.975-.068-1.14-.15.162-1.14.019-2.278.436-3.6l-.015-.006c.16-.554.478-.878.939-1.464-.161-.52-.532-1.64.266-4.182.033-.014.067-.03.105-.049l.206-.137c.04-.028.096-.069.137-.096.069-.042.371-.371.412-.412.096-.097.165-.124.192-.234.055-.206-.247-.412-.37-.55-.018-.019-.03-.034-.043-.05.013-.039.027-.077.042-.114.01-.125.028-.26.042-.367zm.883 7.942c.05.002.174.122.751.158.66.04 1.539-.083 1.772-.138.234-.055.097.11.069.275l-.026.169c-.399.134-1.008.188-1.416.202-.393.013-.846-.012-1.161-.11-.048-.26-.063-.47-.007-.55a.024.024 0 0 1 .018-.006zm2.506.846c-.02.135-.035.223-.058.372-.388.12-.888.122-1.27.135a4.413 4.413 0 0 1-1.012-.07 2.065 2.065 0 0 1-.033-.109 11.343 11.343 0 0 1-.065-.252c.179.034.53.079 1.15.087a4.142 4.142 0 0 0 1.288-.163zm-.106.685c-.069.44-.055 1.786-.014 2.157.014.11.948.522 1.277.77.107.085.259.157.422.222.042.042.116.105.197.203.162.213.052.436-.135.526-.264-.007-.568-.052-1.074-.128-.695-.104-1.129-.101-1.73-.106v-.003c-.152-.275-.056-.728-.056-.728a2.2 2.2 0 0 1-.809-.18l.012-.026c.234-.48.22-.591.151-1.415-.047-.578-.196-.883-.335-1.195.169.016.409.035.857.041a4.567 4.567 0 0 0 1.237-.138zm-5.306 2.084c.243 0 .6.032.676.1v.014c.014.165.165.399.11.522-.027.069-.096-.041-.192-.068.041.26.151.741.316 1.112.11.248.041.426-.33.495-.33.014-.755 0-1.112-.083-.412-.206-.55-.316-.467-.7.068-.275.494-.59.865-.838-.206.014-.426.165-.398-.014.055-.357.206-.33.302-.508-.02-.02.084-.032.23-.032z" />
          </svg>
        ),
      },
      {
        name: "Three.js",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
            <path d="M.38 0a.268.268 0 0 0-.256.332l2.894 11.716a.268.268 0 0 0 .01.04l2.89 11.708a.268.268 0 0 0 .447.128L23.802 7.15a.268.268 0 0 0-.112-.45l-5.784-1.667a.268.268 0 0 0-.123-.035L6.38 1.715a.268.268 0 0 0-.144-.04L.456.01A.268.268 0 0 0 .38 0zm.374.654L5.71 2.08 1.99 5.664zM6.61 2.34l4.864 1.4-3.65 3.515zm-.522.12l1.217 4.926-4.877-1.4zm6.28 1.538l4.878 1.404-3.662 3.53zm-.52.13l1.208 4.9-4.853-1.392zm6.3 1.534l4.947 1.424-3.715 3.574zm-.524.12l1.215 4.926-4.876-1.398zm-15.432.696l4.964 1.424-3.726 3.586zM8.047 8.15l4.877 1.4-3.66 3.527zm-.518.137l1.236 5.017-4.963-1.432zm6.274 1.535l4.965 1.425-3.73 3.586zm-.52.127l1.235 5.012-4.958-1.43zm-9.63 2.438l4.873 1.406-3.656 3.523zm5.854 1.687l4.863 1.403-3.648 3.51zm-.54.04l1.214 4.927-4.875-1.4zm-3.896 4.02l5.037 1.442-3.782 3.638z" />
          </svg>
        ),
      },
      {
        name: "shadcn/ui",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
            <path d="M22.219 11.784 11.784 22.219c-.407.407-.407 1.068 0 1.476.407.407 1.068.407 1.476 0L23.695 13.26c.407-.408.407-1.069 0-1.476-.408-.407-1.069-.407-1.476 0ZM20.132.305.305 20.132c-.407.407-.407 1.068 0 1.476.408.407 1.069.407 1.476 0L21.608 1.781c.407-.407.407-1.068 0-1.476-.408-.407-1.069-.407-1.476 0Z" />
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
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#68BC51]" fill="currentColor">
            <path d="M12 2l9 5.2v10.4L12 22l-9-5.2V7.2L12 2zm0 2.3L4.8 8.5v7l7.2 4.2 7.2-4.2v-7L12 4.3z" />
          </svg>
        ),
      },
      {
        name: "Express",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
            <path d="M12.262 16.666h1.146l6.975-9.325H19.22zm9.778 1.441v.004l-4.334-5.706-.557.74 4.873 6.682H.945V4.173h9.505l5.026 6.7.574-.772-4.374-5.928h.003l-.719-.945H0v17.544h24zM10.917 8.705a3.8 3.8 0 0 0-1.292-1.183q-.796-.45-1.916-.45c-.746 0-1.37.14-1.906.424a3.76 3.76 0 0 0-1.31 1.12 4.9 4.9 0 0 0-.75 1.581 7.17 7.17 0 0 0 0 3.696c.148.567.402 1.101.75 1.573a3.5 3.5 0 0 0 1.31 1.066q.803.39 1.906.389 1.77 0 2.739-.868.966-.867 1.328-2.457h-1.139q-.271 1.084-.977 1.734-.704.651-1.952.65-.812 0-1.392-.342a3.1 3.1 0 0 1-.957-.869 3.5 3.5 0 0 1-.551-1.182 5 5 0 0 1-.17-1.133 9 9 0 0 0-.015-.286 4.5 4.5 0 0 1 .015-.829c.047-.418.147-.83.296-1.223A3.7 3.7 0 0 1 5.54 9.05a2.9 2.9 0 0 1 .922-.742q.541-.28 1.246-.28c.47 0 .869.093 1.23.28q.541.281.922.742.379.461.587 1.057t.225 1.246H5.625l.004.957h6.182a7.3 7.3 0 0 0-.18-1.924 4.9 4.9 0 0 0-.715-1.68z" />
          </svg>
        ),
      },
      {
        name: "Supabase",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#3ECF8E]" fill="currentColor">
            <path d="M13.4 22c-.6 0-1-.5-.8-1.1l2.4-7.9H4.8c-.7 0-1.2-.7-.9-1.3L11.5 2c.4-.7 1.4-.4 1.3.4l-2.2 7.6h9.6c.8 0 1.2.9.7 1.5L14.3 21.6c-.2.3-.5.4-.9.4z" />
          </svg>
        ),
      },
      {
        name: "PostgreSQL",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#4169E1]" fill="currentColor">
            <path d="M12 2C6.5 2 2 6.5 2 12c0 4.1 2.5 7.6 6.1 9.1.5.1.7-.2.7-.5v-1.8c-2.4.5-3-1-3-1-.4-1-1-1.3-1-1.3-.8-.5.1-.5.1-.5.9.1 1.4.9 1.4.9.8 1.4 2.1 1 2.6.8.1-.6.3-1 .6-1.2-2-.2-4.1-1-4.1-4.4 0-1 .4-1.8 1-2.4-.1-.2-.4-1.1.1-2.4 0 0 .8-.2 2.5.9.7-.2 1.5-.3 2.3-.3.8 0 1.6.1 2.3.3 1.7-1.1 2.5-.9 2.5-.9.5 1.3.2 2.2.1 2.4.6.6 1 1.4 1 2.4 0 3.4-2.1 4.2-4.1 4.4.3.3.6.8.6 1.7V20.5c0 .3.2.6.7.5C19.5 19.6 22 16.1 22 12c0-5.5-4.5-10-10-10z" />
          </svg>
        ),
      },
      {
        name: "Firebase",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
            <path d="M4.5 17.5L8.5 2.5l3.8 7.2L4.5 17.5zm15 0L17.7 5.2l-2.4 4.5 4.2 7.8zm-7.5 4.5l6.5-4.5-4-7.5-6.5 10 4 2z" fill="#FFA000" />
            <path d="M12 22l4-2-4-7.5-4 7.5 4 2z" fill="#FFCA28" />
          </svg>
        ),
      },
      {
        name: "MongoDB",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#00ED64]" fill="currentColor">
            <path d="M12 1.5s-5.5 5.5-5.5 11c0 4.2 3.1 7.8 5.5 10 2.4-2.2 5.5-5.8 5.5-10 0-5.5-5.5-11-5.5-11zm-.1 18.8c-.3 0-.6-.3-.6-.6V4.8c.3.5.7 1.1 1.2 1.8v13.1c0 .3-.3.6-.6.6z" />
          </svg>
        ),
      },
      {
        name: "Prisma",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
            <path d="M12.7 2.3a1 1 0 0 0-1.4 0L2.5 11.1a1 1 0 0 0 0 1.4l8.8 8.8a1 1 0 0 0 1.4 0l8.8-8.8a1 1 0 0 0 0-1.4L12.7 2.3zm-.7 2.4l6.6 6.6-6.6 6.6-6.6-6.6L12 4.7z" />
          </svg>
        ),
      },
      {
        name: "Redis",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#FF4438]" fill="currentColor">
            <path d="M21.4 8.7L12.6 4a1.4 1.4 0 0 0-1.2 0L2.6 8.7a1.4 1.4 0 0 0 0 2.6l8.8 4.7a1.4 1.4 0 0 0 1.2 0l8.8-4.7a1.4 1.4 0 0 0 0-2.6zM12 14.3L4.5 10.3 12 6.3l7.5 4-7.5 4zm9.4 1.4l-2 .9v2.2l2-.9v-2.2zm-4 1.7l-4.8 2.6a1.4 1.4 0 0 1-1.2 0L6.6 17.4v2.2l4.8 2.6c.4.2.8.2 1.2 0l4.8-2.6v-2.2z" />
          </svg>
        ),
      },
      {
        name: "Socket.io",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
            <path d="M11.9362.0137a12.1694 12.1694 0 00-2.9748.378C4.2816 1.5547.5678 5.7944.0918 10.6012c-.59 4.5488 1.7079 9.2856 5.6437 11.6345 3.8608 2.4179 9.0926 2.3199 12.8734-.223 3.3969-2.206 5.5118-6.2277 5.3858-10.2845-.058-4.0159-2.31-7.9167-5.7588-9.9796C16.354.5876 14.1431.0047 11.9362.0137zm-.063 1.696c4.9448-.007 9.7886 3.8137 10.2815 8.9245.945 5.6597-3.7528 11.4125-9.4875 11.5795-5.4538.544-10.7245-4.0798-10.8795-9.5566-.407-4.4338 2.5159-8.8346 6.6977-10.2995a9.1126 9.1126 0 013.3878-.647zm5.0908 3.2248c-2.6869 2.0849-5.2598 4.3078-7.8886 6.4567 1.2029.017 2.4118.016 3.6208.01 1.41-2.165 2.8589-4.3008 4.2678-6.4667zm-5.6647 7.6536c-1.41 2.166-2.86 4.3088-4.2699 6.4737 2.693-2.0799 5.2548-4.3198 7.9017-6.4557a255.4132 255.4132 0 00-3.6318-.018z" />
          </svg>
        ),
      },
      {
        name: "Python",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
            <path d="M11.9 2c-3.1 0-2.9 1.3-2.9 1.3l.1 1.4h2.9v.4H6.7S4 4.8 4 8c0 3.1 1.7 3 1.7 3l.9-.1v-1.3c0-1.5 1.3-1.4 1.3-1.4h4.7s1.4 0 1.4-1.3V3.4S14.8 2 11.9 2zm-.9 1.2a.6.6 0 1 1 0 1.2.6.6 0 0 1 0-1.2z" fill="#4B8BBE" />
            <path d="M12.1 22c3.1 0 2.9-1.3 2.9-1.3l-.1-1.4h-2.9v-.4h5.3s2.7.3 2.7-2.9c0-3.1-1.7-3-1.7-3l-.9.1v1.3c0 1.5-1.3 1.4-1.3 1.4H11.4s-1.4 0-1.4 1.3v3.5s-.8 1.4 2.1 1.4zm.9-1.2a.6.6 0 1 1 0-1.2.6.6 0 0 1 0 1.2z" fill="#FFD43B" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "mobile",
    index: "03",
    title: "Mobile",
    skills: [
      {
        name: "Android",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#3DDC84]" fill="currentColor">
            <path d="M6 18c0 .5.4 1 1 1h1v3c0 .5.5 1 1 1s1-.5 1-1v-3h4v3c0 .5.5 1 1 1s1-.5 1-1v-3h1c.6 0 1-.5 1-1V9H6v9zm-3-8c-.5 0-1 .5-1 1v6c0 .5.5 1 1 1s1-.5 1-1v-6c0-.5-.5-1-1-1zm18 0c-.5 0-1 .5-1 1v6c0 .5.5 1 1 1s1-.5 1-1v-6c0-.5-.5-1-1-1zM15.5 3.8l1.2-1.2a.5.5 0 0 0-.7-.7l-1.3 1.3A7.3 7.3 0 0 0 12 3c-.9 0-1.8.1-2.7.2L8 1.9a.5.5 0 0 0-.7.7l1.2 1.2A5.8 5.8 0 0 0 6 8h12a5.8 5.8 0 0 0-2.5-4.2zM9 6a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4zm6 0a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4z" />
          </svg>
        ),
      },
      {
        name: "Expo",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
            <path d="M4.5 4.5L12 12l7.5-7.5L21 6l-9 9-9-9 1.5-1.5zm0 7.5L12 19.5l7.5-7.5L21 13.5l-9 9-9-9 1.5-1.5z" />
          </svg>
        ),
      },
      {
        name: "Play Console",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
            <path d="M4 3.5v17l10-8.5L4 3.5z" fill="#00C1A0" />
            <path d="M14 12l3.5 3L4 20.5 14 12z" fill="#FF3A44" />
            <path d="M14 12L4 3.5 17.5 9 14 12z" fill="#00E676" />
            <path d="M17.5 9l3 2.5a1 1 0 0 1 0 1.5l-3 2-3.5-3 3.5-3z" fill="#FFC107" />
          </svg>
        ),
      },
      {
        name: "Apple",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
            <path d="M18.7 19.5c-.8 1.2-1.7 2.4-3 2.4-1.3 0-1.7-.8-3.2-.8-1.5 0-2 .8-3.2.8-1.3 0-2.3-1.3-3.2-2.5-1.7-2.5-3-7.1-1.2-10.2 1-1.6 2.6-2.6 4.3-2.6 1.3 0 2.5.9 3.3.9.8 0 2.3-1.1 3.9-.9 1.4.1 2.6.6 3.4 1.7-3.1 1.7-2.6 5.8.5 7.1-.6 1.5-1.4 3-2.6 4.1zM15.4 4.5c.6-.8 1.1-2 1-3-.9.1-2.1.6-2.7 1.4-.6.7-1.1 1.9-.9 2.9 1.1.1 2-.5 2.6-1.3z" />
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
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#F59E0B]" fill="currentColor">
            <path d="M12 2l1.6 6.2L20 8l-4.8 4.6 3 6.4-6.2-2.5L7 22l1.2-6.8L3 11l6.4-.8L12 2z" />
          </svg>
        ),
      },
      {
        name: "Gemini",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#8E75FF]" fill="currentColor">
            <path d="M12 2C12 7.5 7.5 12 2 12c5.5 0 10 4.5 10 10 0-5.5 4.5-10 10-10-5.5 0-10-4.5-10-10z" />
          </svg>
        ),
      },
      {
        name: "Hugging Face",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#FFD21E]" fill="currentColor">
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
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#10A37F]" fill="currentColor">
            <path d="M22.3 9.4a5.7 5.7 0 0 0-.5-4.8 5.8 5.8 0 0 0-6.1-2.7 5.8 5.8 0 0 0-4.6-2 5.9 5.9 0 0 0-5.6 4A5.8 5.8 0 0 0 1.8 7a5.8 5.8 0 0 0 .5 6.6 5.8 5.8 0 0 0 .5 4.8 5.8 5.8 0 0 0 6.1 2.7 5.8 5.8 0 0 0 4.6 2 5.9 5.9 0 0 0 5.6-4 5.8 5.8 0 0 0 3.7-3.1 5.8 5.8 0 0 0-.5-6.6zM13.2 21.8a4.3 4.3 0 0 1-2.6-.9l3.5-2a2 2 0 0 0 1-1.7v-4.9l1.8 1v4.3a4.3 4.3 0 0 1-3.7 4.2zm-8.8-3.7a4.3 4.3 0 0 1-.5-2.7l3.5 2a2 2 0 0 0 2 0l4.2-2.4v2.1l-3.7 2.1a4.3 4.3 0 0 1-5.5-1.1zm-1.8-8.7a4.3 4.3 0 0 1 2.1-1.8V11.5a2 2 0 0 0 1 1.7l4.2 2.4-1.8 1-3.7-2.1a4.3 4.3 0 0 1-1.8-4.9zm15.1 2.3l-4.2-2.4 1.8-1 3.7 2.1a4.3 4.3 0 0 1-.3 7.6v-3.9a2 2 0 0 0-1-2.4zm2.1-4a4.3 4.3 0 0 1-2.1 1.8V5.6a2 2 0 0 0-1-1.7l-4.2-2.4 1.8-1 3.7 2.1a4.3 4.3 0 0 1 1.8 4.9zm-8.3-4.3a4.3 4.3 0 0 1 2.6.9l-3.5 2a2 2 0 0 0-1 1.7v4.9l-1.8-1V5.9a4.3 4.3 0 0 1 3.7-4.2zM12 13.8l-2.4-1.4 2.4-1.4 2.4 1.4L12 13.8z" />
          </svg>
        ),
      },
      {
        name: "Antigravity",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#3186FF]" fill="currentColor">
            <path d="M20.533 21.233C21.705 22.113 23.464 21.527 21.852 19.915C17.015 15.225 18.041 2.328 12.032 2.328C6.024 2.328 7.049 15.225 2.213 19.915C0.454 21.673 2.360 22.113 3.532 21.233C8.075 18.156 7.782 12.733 12.032 12.733C16.283 12.733 15.989 18.156 20.533 21.233Z" />
          </svg>
        ),
      },
      {
        name: "FFmpeg",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#00C814]" fill="currentColor">
            <path d="M2.5 3.5l8 4.5-8 4.5v-9zm9.5 5.5l8 4.5-8 4.5V9zm-9.5 5.5l8 4.5-8 4.5v-9z" />
          </svg>
        ),
      },
      {
        name: "Puppeteer",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#00D8A2]" fill="currentColor">
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
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#F05032]" fill="currentColor">
            <path d="M21.6 10.9L13.1 2.4a1.7 1.7 0 0 0-2.4 0l-1.8 1.8 2.3 2.3a2 2 0 0 1 2.5 2.5l2.2 2.2a2 2 0 1 1-1.2 1.2l-2.1-2.1v4.3a2 2 0 1 1-1.7 0V9.8a2 2 0 0 1-1.1-2.6L7.4 4.8 2.4 9.8a1.7 1.7 0 0 0 0 2.4l8.5 8.5c.7.7 1.7.7 2.4 0l8.3-8.3a1.7 1.7 0 0 0 0-2.4z" />
          </svg>
        ),
      },
      {
        name: "GitHub",
        icon: <GithubIcon className="w-5 h-5 text-white" />,
      },
      {
        name: "Docker",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#2496ED]" fill="currentColor">
            <path d="M13.5 8.5h2v2h-2zm-2.5 0h2v2h-2zm-2.5 0h2v2h-2zm5-2.5h2v2h-2zm-2.5 0h2v2h-2zm-2.5 0h2v2h-2zm-2.5 2.5h2v2h-2zm14.8 4.2c-.3-.2-1.3-.7-2.6-.4-.3-1-1.1-1.8-2-2.1l-.8-.3-.5.7c-.7 1.1-.7 2.6-.2 3.8-.7.4-1.7.5-2.6.5H2.2c-.4 1.4.1 3.2 1.2 4.4 1.6 1.7 3.8 2.2 6.5 2.2 6 0 10.5-3.3 11.8-8.2.7 0 1.4-.2 1.9-.6h-.8z" />
          </svg>
        ),
      },
      {
        name: "Vercel",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
            <path d="M12 2L2 20h20L12 2z" />
          </svg>
        ),
      },
      {
        name: "Cloudflare",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#F38020]" fill="currentColor">
            <path d="M18.2 10.2a5.4 5.4 0 0 0-5.2-4.2c-2.3 0-4.3 1.5-5 3.6a4.8 4.8 0 0 0-4.5 4.8c0 2.7 2.2 4.8 4.8 4.8h14.4c2.3 0 4.2-1.9 4.2-4.2 0-2.2-1.7-4-3.8-4.2l-.9-.1-.2-.5z" />
          </svg>
        ),
      },
      {
        name: "npm",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#E53E3E]" fill="currentColor">
            <path d="M2 4v16h20V4H2zm16 13h-3.5V9h-3v8H5V7h13v10z" />
          </svg>
        ),
      },
      {
        name: "pnpm",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#F69220]" fill="currentColor">
            <path d="M3 3h5v5H3zm6 0h5v5H9zm6 0h5v5h-5zM3 9h5v5H3zm12 0h5v5h-5zm-6 6h5v5H9zm6 0h5v5h-5zm-12 0h5v5H3z" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "web3",
    index: "06",
    title: "Web3/Blockchain",
    skills: [
      {
        name: "Solidity",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
            <path d="M12 2l4.5 8L12 18l-4.5-8L12 2zm0 4.5l-2.5 4.5 2.5 4.5 2.5-4.5L12 6.5zM17 11l4.5 7.5L17 22l-2.5-4.5 2.5-6.5zM7 11l2.5 6.5L7 22l-4.5-3.5L7 11z" />
          </svg>
        ),
      },
      {
        name: "Rust",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#F74C00]" fill="currentColor">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 4a6 6 0 1 1-6 6 6 6 0 0 1 6-6zm-1 2h2v2h-2zm-3.5 1.5l1.4 1.4-1.4 1.4-1.4-1.4zm9 0l1.4 1.4-1.4 1.4-1.4-1.4zM7 11h2v2H7zm8 0h2v2h-2zm-4.5 3.5h2v2h-2z" />
          </svg>
        ),
      },
      {
        name: "Foundry",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#FF5722]" fill="currentColor">
            <path d="M21 7h-4.2l-2-2H4c-.6 0-1 .4-1 1v2.5c0 .3.1.6.3.8L5.5 11v3h2.5v2H6v3h12v-3h-2v-2h2.5v-1l2-2.5c.3-.3.5-.7.5-1.1V7z" />
          </svg>
        ),
      },
      {
        name: "Anchor",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#3B82F6]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#8A9DF5]" fill="currentColor">
            <path d="M12 2L4.5 13.5 12 18l7.5-4.5L12 2zm0 17.5L4.5 15 12 22l7.5-7-7.5 4.5z" />
          </svg>
        ),
      },
      {
        name: "Solana",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
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
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
            <path d="M2.5 4h4.8l5.2 12.8L17.7 4h4.8L14.2 20h-4.4L2.5 4z" />
          </svg>
        ),
      },
      {
        name: "Wagmi",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#FF6B2B]" fill="currentColor">
            <path d="M3.5 5.5h3.2l3.3 9.8 3-9.8h2.8l3 9.8 3.3-9.8h3.2l-4.8 13h-3.4l-2.8-9-2.8 9H4.9L3.5 5.5z" />
          </svg>
        ),
      },
      {
        name: "RainbowKit",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
            <path d="M4 18a8 8 0 0 1 16 0" stroke="#FF494A" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M7 18a5 5 0 0 1 10 0" stroke="#FFB020" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M10 18a2 2 0 0 1 4 0" stroke="#00D26A" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        name: "Solana Web3.js",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
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
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#14F195]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    category: "Web app development",
    customCategory: "",
    budget: "Still deciding",
    customBudget: "",
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
    if (formState.category === "Other" && !formState.customCategory.trim()) {
      setFormError("Please specify your custom project scope.");
      return;
    }
    if (formState.budget === "Custom" && !formState.customBudget.trim()) {
      setFormError("Please enter your target budget amount.");
      return;
    }
    setFormSubmitting(true);
    setFormError(null);

    try {
      const payload = {
        name: formState.name,
        email: formState.email,
        category:
          formState.category === "Other" && formState.customCategory.trim()
            ? formState.customCategory.trim()
            : formState.category,
        budget:
          formState.budget === "Custom" && formState.customBudget.trim()
            ? formState.customBudget.trim()
            : formState.budget,
        message: formState.message,
      };

      const response = await fetch("https://formspree.io/f/xaeqgenr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
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
            <span className="hidden sm:inline-flex items-center border border-card-border bg-lift/80 px-2.5 py-0.5 font-mono text-xs font-medium tracking-wide text-text-muted rounded">
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
      <main id="top" className="flex-1 mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 sm:pb-16">
        {/* HERO SECTION (Editorial Manifesto with Authoritative Copywriting) */}
        <section
          aria-labelledby="hero-title"
          className="min-h-[calc(100vh-4rem)] flex flex-col justify-center pt-8 pb-16 sm:pt-12 sm:pb-24 border-b border-card-border"
        >
          <div className="space-y-8 max-w-4xl">
            {/* Monumental Headline preserving original copy */}
            <h1
              id="hero-title"
              className="text-5xl font-black tracking-tight text-foreground sm:text-7xl lg:text-8xl sm:leading-[1.03]"
            >
              Full Stack <br className="hidden sm:inline" />Software Engineer
            </h1>

            {/* Original Value Proposition */}
            <p className="max-w-2xl text-lg sm:text-xl leading-relaxed text-text-muted">
              I&apos;m <strong className="font-bold text-foreground">Muhammad Faran</strong>, a Fullstack Software Engineer, I take mobile apps, web platforms and blockchain systems from zero to deployment with clean architecture and complete technical ownership.
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
                  <span aria-hidden="true" className="text-sm font-semibold">↓</span>
                </a>

                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded bg-foreground px-5 py-2.5 text-xs sm:text-sm font-bold text-background transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground shadow-sm"
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
                  className="inline-flex items-center gap-2 rounded border border-card-border bg-card-bg px-4 py-2.5 font-mono text-xs font-medium tracking-wide text-foreground transition-colors hover:border-card-hover hover:bg-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground cursor-pointer"
                >
                  <span>Upwork</span>
                  <span className="text-text-muted">↗</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPlaceholderModal("Fiverr")}
                  title="Hire on Fiverr"
                  aria-label="Hire on Fiverr"
                  className="inline-flex items-center gap-2 rounded border border-card-border bg-card-bg px-4 py-2.5 font-mono text-xs font-medium tracking-wide text-foreground transition-colors hover:border-card-hover hover:bg-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground cursor-pointer"
                >
                  <span>Fiverr</span>
                  <span className="text-text-muted">↗</span>
                </button>

                <a
                  href="https://github.com/m-faran"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub Profile"
                  aria-label="GitHub Profile"
                  className="inline-flex items-center gap-2 rounded border border-card-border bg-card-bg px-4 py-2.5 font-mono text-xs font-medium tracking-wide text-foreground transition-colors hover:border-card-hover hover:bg-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                >
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
                                <span>{idx === 0 ? "UI" : "Contracts"}</span>
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
                <span>{isAllExpanded ? "Collapse All" : "Expand All (50)"}</span>
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
                            className="flex-1 min-w-[calc(50%-0.625rem)] sm:min-w-[125px] inline-flex items-center justify-center gap-2.5 border border-card-border bg-lift px-3.5 py-2.5 rounded text-xs sm:text-sm font-medium text-foreground hover:border-card-hover hover:bg-hover-surface transition-colors shadow-xs"
                          >
                            <span className="shrink-0 flex items-center justify-center w-5 h-5">
                              {skill.icon}
                            </span>
                            <span className="truncate">{skill.name}</span>
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
                          category: "Web app development",
                          customCategory: "",
                          budget: "Still deciding",
                          customBudget: "",
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
                        name={formState.category === "Other" ? undefined : "category"}
                        value={formState.category}
                        onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                        className="w-full border border-card-border bg-background px-3.5 py-3 text-sm sm:text-base text-foreground focus:border-card-hover focus:outline-none focus:ring-1 focus:ring-card-hover rounded transition-colors cursor-pointer"
                      >
                        <option value="Web app development">Web app development</option>
                        <option value="Mobile app development">Mobile app development</option>
                        <option value="Blockchain system development">Blockchain system development</option>
                        <option value="Other">Other (write your own)</option>
                      </select>
                      {formState.category === "Other" && (
                        <input
                          type="text"
                          id="custom-category"
                          name="category"
                          required
                          value={formState.customCategory}
                          onChange={(e) => setFormState({ ...formState, customCategory: e.target.value })}
                          placeholder="Specify project scope (e.g. AI platform, API)..."
                          aria-label="Custom project scope"
                          className="mt-2 w-full border border-card-border bg-background px-4 py-2.5 text-sm sm:text-base text-foreground placeholder:text-text-subtle focus:border-card-hover focus:outline-none focus:ring-1 focus:ring-card-hover rounded transition-colors"
                          autoFocus
                        />
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="project-budget" className="font-mono text-xs sm:text-sm font-semibold tracking-wide text-text-muted">
                        Target Budget Range
                      </label>
                      <select
                        id="project-budget"
                        name={formState.budget === "Custom" ? undefined : "budget"}
                        value={formState.budget}
                        onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                        className="w-full border border-card-border bg-background px-3.5 py-3 text-sm sm:text-base text-foreground focus:border-card-hover focus:outline-none focus:ring-1 focus:ring-card-hover rounded transition-colors cursor-pointer"
                      >
                        <option value="Still deciding">Still deciding</option>
                        <option value="$1,000 - $2,500">$1,000 - $2,500</option>
                        <option value="$2,500 - $5,000">$2,500 - $5,000</option>
                        <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                        <option value="$10,000+">$10,000+</option>
                        <option value="Custom">Custom amount (enter your own)</option>
                      </select>
                      {formState.budget === "Custom" && (
                        <input
                          type="text"
                          id="custom-budget"
                          name="budget"
                          required
                          value={formState.customBudget}
                          onChange={(e) => setFormState({ ...formState, customBudget: e.target.value })}
                          placeholder="e.g. $3,500 or $15k - $25k"
                          aria-label="Custom budget amount"
                          className="mt-2 w-full border border-card-border bg-background px-4 py-2.5 text-sm sm:text-base text-foreground placeholder:text-text-subtle focus:border-card-hover focus:outline-none focus:ring-1 focus:ring-card-hover rounded transition-colors"
                          autoFocus
                        />
                      )}
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