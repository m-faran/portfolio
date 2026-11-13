import React from "react";

export function GithubIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
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

export interface SkillItem {
  name: string;
  icon: React.ReactNode;
}

export interface SkillCategory {
  id: string;
  title: string;
  scope: string;
  skills: SkillItem[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    scope: "Web applications, interactive UIs, 3D & motion systems",
    skills: [
      {
        name: "React",
        icon: (
          <svg viewBox="-11.5 -10.23 23 20.46" className="w-5 h-5 text-[var(--icon-react)]" fill="currentColor">
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
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-foreground" fill="currentColor">
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
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[var(--icon-tailwind)]" fill="currentColor">
            <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
          </svg>
        ),
      },
      {
        name: "Vite",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
            <path d="M21.5 3.5L12.7 20.8a.7.7 0 0 1-1.3 0L2.5 3.5a.7.7 0 0 1 .8-.9l8.4 1.5a.7.7 0 0 0 .3 0l8.7-1.5a.7.7 0 0 1 .8.9z" fill="#646CFF" />
            <path d="M14.6 3.3L8.8 13.5h3.6L10.3 20l7.3-10.7h-3.8l1.8-6h-1z" fill="var(--icon-vite-bolt)" />
          </svg>
        ),
      },
      {
        name: "GSAP",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
            <rect width="24" height="24" rx="4" fill="#0AE448" />
            <path d="M12 4a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm2.8 11.6a4.8 4.8 0 0 1-5.6 0l1.2-1.6a2.8 2.8 0 0 0 3.2 0z" fill="#000" />
          </svg>
        ),
      },
      {
        name: "Three.js",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-foreground" fill="currentColor">
            <path d="M.38 0a.268.268 0 0 0-.256.332l2.894 11.716a.268.268 0 0 0 .01.04l2.89 11.708a.268.268 0 0 0 .447.128L23.802 7.15a.268.268 0 0 0-.112-.45l-5.784-1.667a.268.268 0 0 0-.123-.035L6.38 1.715a.268.268 0 0 0-.144-.04L.456.01A.268.268 0 0 0 .38 0zm.374.654L5.71 2.08 1.99 5.664zM6.61 2.34l4.864 1.4-3.65 3.515zm-.522.12l1.217 4.926-4.877-1.4zm6.28 1.538l4.878 1.404-3.662 3.53zm-.52.13l1.208 4.9-4.853-1.392zm6.3 1.534l4.947 1.424-3.715 3.574zm-.524.12l1.215 4.926-4.876-1.398zm-15.432.696l4.964 1.424-3.726 3.586zM8.047 8.15l4.877 1.4-3.66 3.527zm-.518.137l1.236 5.017-4.963-1.432zm6.274 1.535l4.965 1.425-3.73 3.586zm-.52.127l1.235 5.012-4.958-1.43zm-9.63 2.438l4.873 1.406-3.656 3.523zm5.854 1.687l4.863 1.403-3.648 3.51zm-.54.04l1.214 4.927-4.875-1.4zm-3.896 4.02l5.037 1.442-3.782 3.638z" />
          </svg>
        ),
      },
      {
        name: "shadcn/ui",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-foreground" fill="currentColor">
            <path d="M22.219 11.784 11.784 22.219c-.407.407-.407 1.068 0 1.476.407.407 1.068.407 1.476 0L23.695 13.26c.407-.408.407-1.069 0-1.476-.408-.407-1.069-.407-1.476 0ZM20.132.305.305 20.132c-.407.407-.407 1.068 0 1.476.408.407 1.069.407 1.476 0L21.608 1.781c.407-.407.407-1.068 0-1.476-.408-.407-1.069-.407-1.476 0Z" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "backend-data",
    title: "Backend & Data Systems",
    scope: "APIs, relational & document stores, real-time sockets, edge caching",
    skills: [
      {
        name: "Node.js",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[var(--icon-node)]" fill="currentColor">
            <path d="M12 2l9 5.2v10.4L12 22l-9-5.2V7.2L12 2zm0 2.3L4.8 8.5v7l7.2 4.2 7.2-4.2v-7L12 4.3z" />
          </svg>
        ),
      },
      {
        name: "Express",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-foreground" fill="currentColor">
            <path d="M12.262 16.666h1.146l6.975-9.325H19.22zm9.778 1.441v.004l-4.334-5.706-.557.74 4.873 6.682H.945V4.173h9.505l5.026 6.7.574-.772-4.374-5.928h.003l-.719-.945H0v17.544h24zM10.917 8.705a3.8 3.8 0 0 0-1.292-1.183q-.796-.45-1.916-.45c-.746 0-1.37.14-1.906.424a3.76 3.76 0 0 0-1.31 1.12 4.9 4.9 0 0 0-.75 1.581 7.17 7.17 0 0 0 0 3.696c.148.567.402 1.101.75 1.573a3.5 3.5 0 0 0 1.31 1.066q.803.39 1.906.389 1.77 0 2.739-.868.966-.867 1.328-2.457h-1.139q-.271 1.084-.977 1.734-.704.651-1.952.65-.812 0-1.392-.342a3.1 3.1 0 0 1-.957-.869 3.5 3.5 0 0 1-.551-1.182 5 5 0 0 1-.17-1.133 9 9 0 0 0-.015-.286 4.5 4.5 0 0 1 .015-.829c.047-.418.147-.83.296-1.223A3.7 3.7 0 0 1 5.54 9.05a2.9 2.9 0 0 1 .922-.742q.541-.28 1.246-.28c.47 0 .869.093 1.23.28q.541.281.922.742.379.461.587 1.057t.225 1.246H5.625l.004.957h6.182a7.3 7.3 0 0 0-.18-1.924 4.9 4.9 0 0 0-.715-1.68z" />
          </svg>
        ),
      },
      {
        name: "Supabase",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[var(--icon-supabase)]" fill="currentColor">
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
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[var(--icon-mongodb)]" fill="currentColor">
            <path d="M12 1.5s-5.5 5.5-5.5 11c0 4.2 3.1 7.8 5.5 10 2.4-2.2 5.5-5.8 5.5-10 0-5.5-5.5-11-5.5-11zm-.1 18.8c-.3 0-.6-.3-.6-.6V4.8c.3.5.7 1.1 1.2 1.8v13.1c0 .3-.3.6-.6.6z" />
          </svg>
        ),
      },
      {
        name: "Prisma",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-foreground" fill="currentColor">
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
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-foreground" fill="currentColor">
            <path d="M11.9362.0137a12.1694 12.1694 0 00-2.9748.378C4.2816 1.5547.5678 5.7944.0918 10.6012c-.59 4.5488 1.7079 9.2856 5.6437 11.6345 3.8608 2.4179 9.0926 2.3199 12.8734-.223 3.3969-2.206 5.5118-6.2277 5.3858-10.2845-.058-4.0159-2.31-7.9167-5.7588-9.9796C16.354.5876 14.1431.0047 11.9362.0137zm-.063 1.696c4.9448-.007 9.7886 3.8137 10.2815 8.9245.945 5.6597-3.7528 11.4125-9.4875 11.5795-5.4538.544-10.7245-4.0798-10.8795-9.5566-.407-4.4338 2.5159-8.8346 6.6977-10.2995a9.1126 9.1126 0 013.3878-.647zm5.0908 3.2248c-2.6869 2.0849-5.2598 4.3078-7.8886 6.4567 1.2029.017 2.4118.016 3.6208.01 1.41-2.165 2.8589-4.3008 4.2678-6.4667zm-5.6647 7.6536c-1.41 2.166-2.86 4.3088-4.2699 6.4737 2.693-2.0799 5.2548-4.3198 7.9017-6.4557a255.4132 255.4132 0 00-3.6318-.018z" />
          </svg>
        ),
      },
      {
        name: "Python",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
            <path d="M11.9 2c-3.1 0-2.9 1.3-2.9 1.3l.1 1.4h2.9v.4H6.7S4 4.8 4 8c0 3.1 1.7 3 1.7 3l.9-.1v-1.3c0-1.5 1.3-1.4 1.3-1.4h4.7s1.4 0 1.4-1.3V3.4S14.8 2 11.9 2zm-.9 1.2a.6.6 0 1 1 0 1.2.6.6 0 0 1 0-1.2z" fill="#4B8BBE" />
            <path d="M12.1 22c3.1 0 2.9-1.3 2.9-1.3l-.1-1.4h-2.9v-.4h5.3s2.7.3 2.7-2.9c0-3.1-1.7-3-1.7-3l-.9.1v1.3c0 1.5-1.3 1.4-1.3 1.4H11.4s-1.4 0-1.4 1.3v3.5s-.8 1.4 2.1 1.4zm.9-1.2a.6.6 0 1 1 0-1.2.6.6 0 0 1 0 1.2z" fill="var(--icon-python-yellow)" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "web3",
    title: "Web3 & Blockchain Protocols",
    scope: "Smart contracts, account abstraction, DEX routing, Solana & EVM",
    skills: [
      {
        name: "Solidity",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-foreground" fill="currentColor">
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
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[var(--icon-ethereum)]" fill="currentColor">
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
                <stop stopColor="var(--icon-solana-start)" />
                <stop offset="1" stopColor="var(--icon-solana-end)" />
              </linearGradient>
            </defs>
          </svg>
        ),
      },
      {
        name: "Viem",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-foreground" fill="currentColor">
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
                <stop stopColor="var(--icon-solana-start)" />
                <stop offset="1" stopColor="var(--icon-solana-end)" />
              </linearGradient>
            </defs>
          </svg>
        ),
      },
      {
        name: "Wallet Adapter",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[var(--icon-wallet)]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
            <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
            <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "mobile",
    title: "Cross-Platform Mobile",
    scope: "iOS & Android native runtime, OTA builds, store deployment",
    skills: [
      {
        name: "Android",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[var(--icon-android)]" fill="currentColor">
            <path d="M6 18c0 .5.4 1 1 1h1v3c0 .5.5 1 1 1s1-.5 1-1v-3h4v3c0 .5.5 1 1 1s1-.5 1-1v-3h1c.6 0 1-.5 1-1V9H6v9zm-3-8c-.5 0-1 .5-1 1v6c0 .5.5 1 1 1s1-.5 1-1v-6c0-.5-.5-1-1-1zm18 0c-.5 0-1 .5-1 1v6c0 .5.5 1 1 1s1-.5 1-1v-6c0-.5-.5-1-1-1zM15.5 3.8l1.2-1.2a.5.5 0 0 0-.7-.7l-1.3 1.3A7.3 7.3 0 0 0 12 3c-.9 0-1.8.1-2.7.2L8 1.9a.5.5 0 0 0-.7.7l1.2 1.2A5.8 5.8 0 0 0 6 8h12a5.8 5.8 0 0 0-2.5-4.2zM9 6a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4zm6 0a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4z" />
          </svg>
        ),
      },
      {
        name: "Expo",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-foreground" fill="currentColor">
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
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-foreground" fill="currentColor">
            <path d="M18.7 19.5c-.8 1.2-1.7 2.4-3 2.4-1.3 0-1.7-.8-3.2-.8-1.5 0-2 .8-3.2.8-1.3 0-2.3-1.3-3.2-2.5-1.7-2.5-3-7.1-1.2-10.2 1-1.6 2.6-2.6 4.3-2.6 1.3 0 2.5.9 3.3.9.8 0 2.3-1.1 3.9-.9 1.4.1 2.6.6 3.4 1.7-3.1 1.7-2.6 5.8.5 7.1-.6 1.5-1.4 3-2.6 4.1zM15.4 4.5c.6-.8 1.1-2 1-3-.9.1-2.1.6-2.7 1.4-.6.7-1.1 1.9-.9 2.9 1.1.1 2-.5 2.6-1.3z" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "ai-media-scraping",
    title: "AI, Media & Automation",
    scope: "LLM integration, headless browser pipelines, media processing",
    skills: [
      {
        name: "Claude",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[var(--icon-claude)]" fill="currentColor">
            <path d="M12 2l1.6 6.2L20 8l-4.8 4.6 3 6.4-6.2-2.5L7 22l1.2-6.8L3 11l6.4-.8L12 2z" />
          </svg>
        ),
      },
      {
        name: "Gemini",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[var(--icon-gemini)]" fill="currentColor">
            <path d="M12 2C12 7.5 7.5 12 2 12c5.5 0 10 4.5 10 10 0-5.5 4.5-10 10-10-5.5 0-10-4.5-10-10z" />
          </svg>
        ),
      },
      {
        name: "Hugging Face",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[var(--icon-huggingface)]" fill="currentColor">
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
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[var(--icon-ffmpeg)]" fill="currentColor">
            <path d="M2.5 3.5l8 4.5-8 4.5v-9zm9.5 5.5l8 4.5-8 4.5V9zm-9.5 5.5l8 4.5-8 4.5v-9z" />
          </svg>
        ),
      },
      {
        name: "Puppeteer",
        icon: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[var(--icon-puppeteer)]" fill="currentColor">
            <path d="M12 2a4 4 0 0 0-4 4v1H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4zm-2 4a2 2 0 1 1 4 0v1h-4V6zm7 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-7 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "shipping-tooling",
    title: "Shipping, Cloud & Tooling",
    scope: "CI/CD, containerization, edge networks, package management",
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
        icon: <GithubIcon className="w-5 h-5 text-foreground" />,
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
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-foreground" fill="currentColor">
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
];
