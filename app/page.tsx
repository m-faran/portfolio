"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { PROJECTS, Project } from "./project-data";

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

type FormErrorField =
  | "name"
  | "email"
  | "customCategory"
  | "customBudget"
  | "message"
  | "form"
  | null;

const CATEGORY_TABS: Array<{ id: "all" | "web" | "mobile"; label: string }> = [
  { id: "all", label: "ALL" },
  { id: "web", label: "WEB" },
  { id: "mobile", label: "MOBILE" },
];

interface LightboxState {
  project: Project;
  index: number;
}

function ProjectActionButtons({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {project.githubLinks && project.githubLinks.length > 1 ? (
        project.githubLinks.map((gh, idx) => (
          <a
            key={idx}
            href={gh.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] sm:min-h-0 items-center gap-1.5 border border-card-border bg-lift px-3 py-2 sm:py-1.5 font-mono text-xs font-medium tracking-wide text-foreground hover:border-card-hover hover:bg-card-border rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            title={gh.label}
            aria-label={`${project.title} ${gh.label}`}
          >
            <GithubIcon className="h-3.5 w-3.5 text-foreground" />
            <span>{gh.label}</span>
          </a>
        ))
      ) : project.githubUrl ? (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] sm:min-h-0 items-center gap-1.5 border border-card-border bg-lift px-3 py-2 sm:py-1.5 font-mono text-xs font-medium tracking-wide text-foreground hover:border-card-hover hover:bg-card-border rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
          title="View GitHub Repository"
          aria-label={`${project.title} GitHub repository`}
        >
          <GithubIcon className="h-3.5 w-3.5 text-foreground" />
          <span>Source Code</span>
        </a>
      ) : project.githubPrivate ? (
        <span
          className="inline-flex items-center gap-1.5 border border-card-border/70 bg-background px-2.5 py-1.5 font-mono text-xs font-medium tracking-wide text-text-muted rounded"
          title="Private Repository (Commercial IP)"
        >
          <svg
            className="h-3.5 w-3.5 text-text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span>Private Repo</span>
        </span>
      ) : null}

      {project.isExternalLink ? (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] sm:min-h-0 items-center gap-1.5 border border-foreground bg-foreground px-3.5 py-2 sm:py-1.5 font-mono text-xs font-bold tracking-wide text-background hover:opacity-90 transition-opacity rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
        >
          <span>
            {project.link.includes("play.google.com") ? "Google Play" : "Launch Live"}
          </span>
          <span aria-hidden="true">↗</span>
        </a>
      ) : (
        <span className="inline-flex items-center gap-1.5 border border-card-border bg-lift/60 px-3 py-1.5 font-mono text-xs font-medium tracking-wide text-text-muted rounded">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--signal-amber)]" />
          <span>Closed Testing Build</span>
        </span>
      )}
    </div>
  );
}

function ProjectMediaStage({
  project,
  activeIndex,
  onSelectIndex,
  onOpenLightbox,
  isLcpCandidate = false,
}: {
  project: Project;
  activeIndex: number;
  onSelectIndex: (idx: number) => void;
  onOpenLightbox: (idx: number) => void;
  isLcpCandidate?: boolean;
}) {
  const gallery = project.gallery;
  const total = gallery.length;
  const safeIndex = activeIndex % total;
  const current = gallery[safeIndex];
  const isMobile = project.category === "mobile";

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectIndex((safeIndex - 1 + total) % total);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectIndex((safeIndex + 1) % total);
  };

  // Compute adjacent indices for the 3-up Mobile Triptych stage
  const prevIdx = (safeIndex - 1 + total) % total;
  const nextIdx = (safeIndex + 1) % total;
  const triptychIndices = total >= 3 ? [prevIdx, safeIndex, nextIdx] : gallery.map((_, i) => i);

  // Auto-scroll the footer switcher so the active screen is always centered and in view
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const prevProjectIdRef = useRef("");

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const activeBtn = container.querySelector<HTMLElement>('[data-active="true"]');
    if (!activeBtn) return;

    const containerRect = container.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();

    const targetScrollLeft =
      btnRect.left -
      containerRect.left +
      container.scrollLeft -
      container.clientWidth / 2 +
      btnRect.width / 2;

    const isNewProject = prevProjectIdRef.current !== project.id;
    prevProjectIdRef.current = project.id;

    container.scrollTo({
      left: Math.max(0, targetScrollLeft),
      behavior: isNewProject ? "auto" : "smooth",
    });
  }, [safeIndex, project.id]);

  return (
    <div className="flex flex-col border border-card-border bg-background rounded-md overflow-hidden">
      {/* Top Viewport Chrome Bar */}
      <div className="flex items-center justify-between gap-2 border-b border-card-border bg-lift/70 px-3.5 py-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-card-hover" />
            <span className="h-2 w-2 rounded-full bg-card-border" />
            <span className="h-2 w-2 rounded-full bg-card-border" />
          </div>
          <span className="ml-1 font-mono text-xs text-text-muted truncate tabular-nums">
            {project.specId} ·{" "}
            <strong className="text-foreground font-semibold">{current.label}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="font-mono text-xs text-text-muted tabular-nums">
            {String(safeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => onOpenLightbox(safeIndex)}
            className="inline-flex min-h-[44px] sm:min-h-0 items-center gap-1.5 border border-card-border bg-card-bg hover:border-card-hover hover:bg-lift px-3 py-2 sm:px-2.5 sm:py-1 font-mono text-xs font-medium text-foreground rounded transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            title="Inspect full-resolution screenshot"
          >
            <span>Inspect Fullscreen</span>
            <span aria-hidden="true">⤢</span>
          </button>
        </div>
      </div>

      {/* Main Visual Stage:
          - Mobile Specs: Multi-Screen (3-Up Mobile Triptych)
          - Web Specs: High-Res Viewport + Visual Thumbnail Filmstrip */}
      {isMobile ? (
        <div className="relative bg-gradient-to-b from-lift/40 via-background to-background px-3 py-6 sm:px-6 sm:py-8">
          <div className="grid grid-cols-3 gap-2.5 sm:gap-5 items-center max-w-2xl mx-auto">
            {triptychIndices.map((screenIdx, slotPosition) => {
              const item = gallery[screenIdx];
              const isCenter = slotPosition === 1 || total < 3;
              return (
                <button
                  key={`${project.id}-triptych-${slotPosition}-${screenIdx}`}
                  type="button"
                  onClick={() =>
                    isCenter ? onOpenLightbox(screenIdx) : onSelectIndex(screenIdx)
                  }
                  aria-label={
                    isCenter
                      ? `Inspect ${item.label} in fullscreen`
                      : `Switch to ${item.label} screen`
                  }
                  className={`group/phone flex flex-col items-center transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-lg ${
                    isCenter
                      ? "scale-100 opacity-100 z-10"
                      : "scale-[0.91] opacity-55 hover:opacity-90 hover:scale-[0.94]"
                  }`}
                >
                  <div
                    className={`relative w-full aspect-[9/19] rounded-lg overflow-hidden border bg-card-bg flex items-center justify-center ${
                      isCenter
                        ? "border-foreground/40 shadow-[var(--shadow-stage)]"
                        : "border-card-border"
                    }`}
                  >
                    <Image
                      src={item.url}
                      alt={item.alt}
                      width={457}
                      height={914}
                      preload={isLcpCandidate && isCenter}
                      sizes="(max-width: 640px) 33vw, 240px"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="mt-2 text-center min-w-0 w-full px-1">
                    <p
                      className={`font-mono text-[11px] truncate tabular-nums ${
                        isCenter ? "text-foreground font-semibold" : "text-text-subtle"
                      }`}
                    >
                      {String(screenIdx + 1).padStart(2, "0")}. {item.label}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {total > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label={`Previous screen for ${project.title}`}
                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 h-11 w-11 sm:h-9 sm:w-9 flex items-center justify-center rounded-full bg-background/90 hover:bg-lift border border-card-border hover:border-card-hover text-foreground shadow-md transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label={`Next screen for ${project.title}`}
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 h-11 w-11 sm:h-9 sm:w-9 flex items-center justify-center rounded-full bg-background/90 hover:bg-lift border border-card-border hover:border-card-hover text-foreground shadow-md transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-background group/web">
          <button
            type="button"
            onClick={() => onOpenLightbox(safeIndex)}
            aria-label={`Inspect ${current.label} screenshot in fullscreen`}
            className="block h-full w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground"
          >
            <Image
              src={current.url}
              alt={current.alt}
              width={1280}
              height={800}
              preload={isLcpCandidate}
              sizes="(max-width: 1024px) 100vw, 760px"
              className="h-full w-full object-cover object-top"
            />
          </button>

          {total > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label={`Previous screen for ${project.title}`}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 h-11 w-11 sm:h-9 sm:w-9 flex items-center justify-center rounded-full bg-background/90 hover:bg-lift border border-card-border hover:border-card-hover text-foreground shadow-md transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label={`Next screen for ${project.title}`}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 h-11 w-11 sm:h-9 sm:w-9 flex items-center justify-center rounded-full bg-background/90 hover:bg-lift border border-card-border hover:border-card-hover text-foreground shadow-md transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      )}

      {/* Contextual Caption Banner */}
      <div className="border-t border-card-border bg-card-bg px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-foreground tabular-nums">
              [{String(safeIndex + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}]{" "}
              {current.label}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed">{current.caption}</p>
        </div>
      </div>

      {/* Interactive Footer:
          - Web Specs: Visual Thumbnail Filmstrip
          - Mobile Specs: Compact Screen Switcher Pills complementing the 3-Up Triptych */}
      {total > 1 && (
        <div
          ref={scrollContainerRef}
          className="border-t border-card-border bg-lift/40 px-3 py-2.5 overflow-x-auto"
        >
          {!isMobile ? (
            <div className="flex items-center gap-2.5">
              {gallery.map((item, idx) => {
                const isSelected = idx === safeIndex;
                return (
                  <button
                    key={item.url}
                    data-active={isSelected ? "true" : undefined}
                    type="button"
                    onClick={() => onSelectIndex(idx)}
                    className={`group/thumb flex items-center gap-2.5 p-1.5 rounded border shrink-0 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground ${
                      isSelected
                        ? "border-foreground bg-lift text-foreground"
                        : "border-card-border bg-card-bg text-text-muted hover:border-card-hover hover:text-foreground"
                    }`}
                  >
                    <div className="relative h-10 w-16 rounded-xs overflow-hidden border border-card-border bg-background shrink-0">
                      <Image
                        src={item.url}
                        alt={item.alt}
                        width={128}
                        height={80}
                        sizes="64px"
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                    <div className="pr-2 text-left">
                      <div className="font-mono text-[10px] text-text-subtle tabular-nums">
                        Screen {String(idx + 1).padStart(2, "0")}
                      </div>
                      <div className="font-mono text-xs font-medium whitespace-nowrap">
                        {item.label}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              {gallery.map((item, idx) => {
                const isSelected = idx === safeIndex;
                return (
                  <button
                    key={item.url}
                    data-active={isSelected ? "true" : undefined}
                    type="button"
                    onClick={() => onSelectIndex(idx)}
                    className={`inline-flex min-h-[44px] sm:min-h-0 items-center px-3 py-2 sm:px-2.5 sm:py-1 rounded font-mono text-xs whitespace-nowrap transition-colors cursor-pointer tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground ${
                      isSelected
                        ? "bg-foreground text-background font-bold"
                        : "bg-card-bg border border-card-border text-text-muted hover:text-foreground hover:border-card-hover"
                    }`}
                  >
                    {String(idx + 1).padStart(2, "0")}. {item.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ProjectNarrativePanel({ project }: { project: Project }) {
  return (
    <div id="project-narrative-panel" className="space-y-6 pt-2">
      {/* Executive Summary */}
      <p className="text-base sm:text-lg text-foreground/95 font-medium leading-relaxed">
        {project.summary}
      </p>

      {/* Technology Stack Footer */}
      <div className="pt-4 border-t border-card-border space-y-2.5">
        <div className="font-mono text-xs font-semibold uppercase tracking-wider text-text-subtle">
          Technology Stack
        </div>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="border border-card-border bg-lift px-2.5 py-1 rounded font-mono text-xs font-medium text-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [activeCategory, setActiveCategory] = useState<"all" | "web" | "mobile">("all");
  const [cardImageIndexes, setCardImageIndexes] = useState<Record<string, number>>({});
  const [selectedWorkbenchId, setSelectedWorkbenchId] = useState<string | null>(null);

  // Synchronize theme with OS preference and localStorage
  useEffect(() => {
    const root = document.documentElement;
    const resolveTheme = (): "light" | "dark" => {
      const currentAttr = root.dataset.theme;
      if (currentAttr === "light" || currentAttr === "dark") {
        return currentAttr;
      }
      try {
        const stored = localStorage.getItem("theme");
        if (stored === "light" || stored === "dark") {
          return stored;
        }
      } catch {}
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    };

    const initial = resolveTheme();
    root.dataset.theme = initial;
    setTheme(initial);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      try {
        const stored = localStorage.getItem("theme");
        if (stored !== "light" && stored !== "dark") {
          const next = e.matches ? "dark" : "light";
          root.dataset.theme = next;
          setTheme(next);
        }
      } catch {}
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    try {
      localStorage.setItem("theme", nextTheme);
    } catch {}
  };

  // Fullscreen Lightbox State & Focus Management
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeLightboxBtnRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const workbenchInspectionRef = useRef<HTMLDivElement>(null);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

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
  const [formErrorField, setFormErrorField] = useState<FormErrorField>(null);

  const filteredProjects =
    activeCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  // Selected project for on-demand inspection drawer (closed by default)
  const workbenchProject = selectedWorkbenchId
    ? filteredProjects.find((p) => p.id === selectedWorkbenchId) ?? null
    : null;
  const workbenchIndex = workbenchProject ? filteredProjects.indexOf(workbenchProject) : -1;

  const openLightbox = (project: Project, index: number) => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    setLightbox({ project, index });
  };

  const closeLightbox = () => {
    setLightbox(null);
    requestAnimationFrame(() => {
      previousFocusRef.current?.focus();
    });
  };

  // Focus trap, initial focus & keyboard navigation for Fullscreen Lightbox
  useEffect(() => {
    if (!lightbox) return;

    const focusTimer = requestAnimationFrame(() => {
      closeLightboxBtnRef.current?.focus();
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      const total = lightbox.project.gallery.length;
      if (e.key === "Escape") {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        setLightbox((prev) => {
          if (!prev) return null;
          const nextIdx = (prev.index + 1) % total;
          setCardImageIndexes((ci) => ({ ...ci, [prev.project.id]: nextIdx }));
          return { ...prev, index: nextIdx };
        });
      } else if (e.key === "ArrowLeft") {
        setLightbox((prev) => {
          if (!prev) return null;
          const nextIdx = (prev.index - 1 + total) % total;
          setCardImageIndexes((ci) => ({ ...ci, [prev.project.id]: nextIdx }));
          return { ...prev, index: nextIdx };
        });
      } else if (e.key === "Tab") {
        const container = lightboxRef.current;
        if (!container) return;
        const focusables = Array.from(
          container.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first || !container.contains(document.activeElement)) {
            e.preventDefault();
            last.focus();
          }
        } else if (document.activeElement === last || !container.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightbox]);

  const setProjectImageIndex = (projectId: string, idx: number) => {
    setCardImageIndexes((prev) => ({ ...prev, [projectId]: idx }));
  };

  const handleSelectProject = (projectId: string) => {
    setSelectedWorkbenchId(projectId);
    requestAnimationFrame(() => {
      setTimeout(() => {
        workbenchInspectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 60);
    });
  };

  const handleCloseProject = () => {
    setSelectedWorkbenchId(null);
    requestAnimationFrame(() => {
      document.getElementById("projects")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim()) {
      setFormErrorField("name");
      setFormError("Please enter your name.");
      document.getElementById("client-name")?.focus();
      return;
    }
    if (!formState.email.trim()) {
      setFormErrorField("email");
      setFormError("Please enter your email address.");
      document.getElementById("client-email")?.focus();
      return;
    }
    if (!formState.message.trim()) {
      setFormErrorField("message");
      setFormError("Please add a short project intro.");
      document.getElementById("project-message")?.focus();
      return;
    }
    if (formState.category === "Other" && !formState.customCategory.trim()) {
      setFormErrorField("customCategory");
      setFormError("Please specify your custom project scope.");
      document.getElementById("custom-category")?.focus();
      return;
    }
    if (formState.budget === "Custom" && !formState.customBudget.trim()) {
      setFormErrorField("customBudget");
      setFormError("Please enter your target budget amount.");
      document.getElementById("custom-budget")?.focus();
      return;
    }
    setFormSubmitting(true);
    setFormError(null);
    setFormErrorField(null);

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
        setFormErrorField("form");
        setFormError(errorMsg);
      }
    } catch {
      setFormErrorField("form");
      setFormError("Network error. Please check your internet connection and try again.");
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Engineering Masthead */}
      <header className="sticky top-0 z-30 border-b border-card-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-3 sm:px-6">
          <div className="flex items-center shrink-0">
            <a
              href="#top"
              className="inline-flex min-h-[44px] sm:min-h-0 items-center whitespace-nowrap font-mono text-xs sm:text-sm font-semibold tracking-wider sm:tracking-widest text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded"
            >
              MUHAMMAD FARAN
            </a>
          </div>

          <nav aria-label="Main Navigation" className="flex items-center gap-0.5 sm:gap-5 shrink-0">
            <a
              href="#projects"
              className="inline-flex min-h-[44px] sm:min-h-0 items-center whitespace-nowrap px-2 sm:px-2.5 sm:py-1.5 text-xs sm:text-sm font-medium text-text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="ml-1 sm:ml-2 inline-flex min-h-[44px] sm:min-h-0 items-center justify-center whitespace-nowrap rounded border border-card-border bg-lift px-2.5 sm:px-3.5 sm:py-1.5 font-mono text-xs font-medium tracking-wide text-foreground transition-colors hover:border-card-hover hover:bg-card-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            >
              Hire Me
            </a>
            <button
              type="button"
              onClick={handleToggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="ml-1 shrink-0 inline-flex h-11 w-11 sm:h-9 sm:w-9 items-center justify-center rounded border border-card-border bg-lift text-foreground transition-colors hover:border-card-hover hover:bg-card-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground cursor-pointer"
            >
              {theme === "dark" ? (
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path
                    strokeLinecap="round"
                    d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"
                  />
                </svg>
              ) : (
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                  />
                </svg>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main id="top" className="flex-1 mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 sm:pb-16">
        {/* HERO SECTION */}
        <section
          aria-labelledby="hero-title"
          className="min-h-[calc(100vh-4rem)] flex flex-col justify-center pt-8 pb-16 sm:pt-12 sm:pb-24 border-b border-card-border"
        >
          <div className="space-y-8 max-w-4xl">
            <h1
              id="hero-title"
              className="text-5xl font-black tracking-tight text-foreground sm:text-7xl lg:text-8xl sm:leading-[1.03]"
            >
              Full Stack <br className="hidden sm:inline" />
              Software Engineer
            </h1>

            <p className="max-w-2xl text-lg sm:text-xl leading-relaxed text-text-muted">
              I&apos;m <strong className="font-bold text-foreground">Muhammad Faran</strong>, a
              Fullstack Software Engineer, I take web platforms and mobile applications
              from zero to deployment with clean architecture and complete technical ownership.
            </p>

            <div className="space-y-4 pt-1">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded border border-foreground bg-foreground px-5 py-2.5 text-xs sm:text-sm font-bold text-background transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                >
                  <span>Let&apos;s talk</span>
                  <span aria-hidden="true" className="text-sm font-semibold">
                    ↓
                  </span>
                </a>

                <a
                  href="#projects"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded border border-card-border bg-lift px-5 py-2.5 text-xs sm:text-sm font-bold text-foreground transition-colors hover:border-card-hover hover:bg-card-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                >
                  <span>Explore my work</span>
                  <span aria-hidden="true" className="text-sm font-semibold">
                    ↓
                  </span>
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="https://www.upwork.com/freelancers/~01958faf0bb3c23d8a"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Hire on Upwork"
                  aria-label="Hire on Upwork"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded border border-card-border bg-card-bg px-4 py-2.5 font-mono text-xs font-medium tracking-wide text-foreground transition-colors hover:border-card-hover hover:bg-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                >
                  <span>Upwork</span>
                  <span className="text-text-muted">↗</span>
                </a>

                <a
                  href="https://github.com/m-faran"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub Profile"
                  aria-label="GitHub Profile"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded border border-card-border bg-card-bg px-4 py-2.5 font-mono text-xs font-medium tracking-wide text-foreground transition-colors hover:border-card-hover hover:bg-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                >
                  <span>GitHub</span>
                  <span className="text-text-muted">↗</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SELECTED WORK SECTION (Left-to-Right Moving Project Carousel + On-Demand Inspection Drawer) */}
        <section id="projects" aria-labelledby="projects-title" className="pt-14 sm:pt-20">
          {/* Section Header + Category Filters */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between pb-8 border-b border-card-border">
            <div className="space-y-2 max-w-2xl">
              <h2
                id="projects-title"
                className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
              >
                Selected Work
              </h2>
              <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                Browse the live project stream below—click any system to scroll down and inspect
                its full interactive screen flows, executive summary, architecture stack, and source
                repositories.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div
              role="tablist"
              aria-label="Filter projects by category"
              className="inline-flex w-full flex-wrap items-center gap-1.5 border border-card-border bg-card-bg p-1.5 rounded lg:w-auto"
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
                    aria-controls="projects-stage"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveCategory(tab.id)}
                    onKeyDown={(e) => handleTabKeyDown(e, idx)}
                    className={`flex-1 min-h-[44px] sm:min-h-0 px-3.5 py-2.5 sm:py-2 text-center font-mono text-xs font-medium tracking-wide transition-colors rounded lg:flex-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground cursor-pointer tabular-nums ${
                      isActive
                        ? "bg-foreground text-background font-bold"
                        : "text-text-muted hover:text-foreground hover:bg-lift"
                    }`}
                  >
                    {tab.label} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* CAROUSEL + EXPANDABLE INSPECTION PANEL */}
          <div
            id="projects-stage"
            role="tabpanel"
            aria-labelledby={`tab-${activeCategory}`}
            className="pt-8"
          >
            {(() => {
              const renderCarouselCard = (proj: Project, isDuplicate: boolean) => {
                const isSelected = workbenchProject?.id === proj.id;
                const gallery = proj.gallery;
                const total = gallery.length;
                const safeIndex = (cardImageIndexes[proj.id] ?? 0) % total;
                const currentScreen = gallery[safeIndex];
                const isMobile = proj.category === "mobile";
                const prevIdx = (safeIndex - 1 + total) % total;
                const nextIdx = (safeIndex + 1) % total;
                const triptychIndices =
                  total >= 3 ? [prevIdx, safeIndex, nextIdx] : gallery.map((_, i) => i);

                return (
                  <button
                    key={`${proj.id}-${isDuplicate ? "dup" : "main"}`}
                    type="button"
                    tabIndex={isDuplicate ? -1 : 0}
                    onClick={(e) => {
                      e.currentTarget.blur();
                      handleSelectProject(proj.id);
                    }}
                    aria-expanded={!isDuplicate ? isSelected : undefined}
                    aria-label={
                      isDuplicate
                        ? undefined
                        : `Inspect ${proj.title} (${proj.specId})`
                    }
                    className={`group/card w-[300px] sm:w-[390px] lg:w-[440px] shrink-0 text-left rounded-md border transition-colors flex flex-col overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground ${
                      isSelected
                        ? "border-foreground bg-lift shadow-[var(--shadow-stage)]"
                        : "border-card-border bg-card-bg hover:border-card-hover hover:bg-hover-surface"
                    }`}
                  >
                    {/* Card Top Spec Chrome */}
                    <div className="flex items-center justify-between gap-2 px-3.5 py-2.5 bg-lift/50">
                      <span className="font-mono text-xs font-bold text-text-subtle truncate tabular-nums">
                        {proj.specId} · {proj.categoryLabel}
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium text-foreground shrink-0">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            proj.status === "live"
                              ? "bg-[var(--signal-emerald)]"
                              : "bg-[var(--signal-amber)]"
                          }`}
                        />
                        <span>{proj.status === "live" ? "LIVE" : "TESTING"}</span>
                      </span>
                    </div>

                    {/* Visual Frame:
                        - Mobile projects: 3 portrait screens in center-hero triptych
                        - Web projects: single 16:10 high-res interface frame */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-background border-y border-card-border">
                      {isMobile ? (
                        <div className="h-full w-full flex items-center justify-center gap-2 sm:gap-3 px-3 py-3 sm:px-5 sm:py-3.5 bg-gradient-to-b from-lift/40 via-background to-background">
                          {triptychIndices.map((screenIdx, slotPosition) => {
                            const item = gallery[screenIdx];
                            const isCenter = slotPosition === 1 || total < 3;
                            return (
                              <div
                                key={`${proj.id}-card-phone-${slotPosition}-${screenIdx}`}
                                className={`relative h-full aspect-[9/19] rounded-md overflow-hidden border bg-card-bg flex items-center justify-center transition-transform duration-300 ${
                                  isCenter
                                    ? "scale-100 opacity-100 z-10 border-foreground/40 shadow-[var(--shadow-stage)]"
                                    : "scale-[0.9] opacity-60 border-card-border"
                                }`}
                              >
                                <Image
                                  src={item.url}
                                  alt={isDuplicate ? "" : item.alt}
                                  width={457}
                                  height={914}
                                  sizes="(max-width: 640px) 100px, 140px"
                                  className="h-full w-full object-contain"
                                />
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <Image
                          src={currentScreen.url}
                          alt={isDuplicate ? "" : currentScreen.alt}
                          width={960}
                          height={600}
                          sizes="(max-width: 640px) 300px, (max-width: 1024px) 390px, 440px"
                          className="h-full w-full object-cover object-top transition-transform duration-300 group-hover/card:scale-[1.02]"
                        />
                      )}
                    </div>

                    {/* Card Footer Metadata */}
                    <div className="p-3.5 sm:p-4 flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-base sm:text-lg font-bold tracking-tight text-foreground truncate">
                          {proj.title}
                        </span>
                        <span
                          className={`shrink-0 font-mono text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                            isSelected
                              ? "border-foreground bg-foreground text-background"
                              : "border-card-border bg-lift text-foreground group-hover/card:border-card-hover"
                          }`}
                        >
                          {isSelected ? "Inspecting ↓" : "Inspect ↓"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2 font-mono text-[11px] text-text-muted tabular-nums">
                        <span className="truncate">
                          {proj.techStack.slice(0, 3).join(" · ")}
                        </span>
                        <span className="shrink-0">{total} screens</span>
                      </div>
                    </div>
                  </button>
                );
              };

              return (
                <>
                  {/* Stream Control Strip */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2 font-mono text-xs text-text-muted tabular-nums">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          isCarouselPaused
                            ? "bg-[var(--signal-amber)]"
                            : "bg-[var(--signal-emerald)]"
                        }`}
                        aria-hidden="true"
                      />
                      <span>
                        {filteredProjects.length} Systems · Flowing left → right · Hover or click any
                        project to inspect
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsCarouselPaused((prev) => !prev)}
                      aria-pressed={isCarouselPaused}
                      className="inline-flex min-h-[44px] sm:min-h-0 items-center gap-2 rounded border border-card-border bg-card-bg px-3.5 py-2 sm:px-3 sm:py-1.5 font-mono text-xs font-medium text-foreground hover:border-card-hover hover:bg-lift transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                    >
                      {isCarouselPaused ? (
                        <svg
                          className="h-3.5 w-3.5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      ) : (
                        <svg
                          className="h-3.5 w-3.5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
                        </svg>
                      )}
                      <span>{isCarouselPaused ? "Resume Motion" : "Pause Motion"}</span>
                    </button>
                  </div>

                  {/* Continuous Left-to-Right Carousel Stage */}
                  <div
                    id="projects-carousel"
                    className="relative overflow-hidden rounded-md border border-card-border bg-card-bg/40 py-5 sm:py-6"
                  >
                    <style>{`
                      @keyframes marquee-ltr {
                        0% { transform: translate3d(-50%, 0, 0); }
                        100% { transform: translate3d(0%, 0, 0); }
                      }
                      .animate-marquee-ltr {
                        animation: marquee-ltr var(--marquee-duration, 36s) linear infinite;
                        will-change: transform;
                      }
                      .animate-marquee-ltr:hover,
                      .animate-marquee-ltr:has(:focus-visible),
                      .animate-marquee-ltr[data-paused="true"] {
                        animation-play-state: paused;
                      }
                      @media (prefers-reduced-motion: reduce) {
                        .animate-marquee-ltr {
                          animation: none !important;
                          transform: none !important;
                        }
                      }
                    `}</style>
                    <div
                      className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-14 bg-gradient-to-r from-background to-transparent z-10"
                      aria-hidden="true"
                    />
                    <div
                      className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-14 bg-gradient-to-l from-background to-transparent z-10"
                      aria-hidden="true"
                    />

                    <div
                      className="flex w-max items-stretch animate-marquee-ltr"
                      data-paused={isCarouselPaused ? "true" : undefined}
                      style={
                        {
                          "--marquee-duration": `${Math.max(20, filteredProjects.length * 4)}s`,
                        } as React.CSSProperties
                      }
                    >
                      <div className="flex items-stretch gap-5 sm:gap-6 pr-5 sm:pr-6">
                        {filteredProjects.map((proj) => renderCarouselCard(proj, false))}
                      </div>
                      <div
                        className="flex items-stretch gap-5 sm:gap-6 pr-5 sm:pr-6"
                        aria-hidden="true"
                      >
                        {filteredProjects.map((proj) => renderCarouselCard(proj, true))}
                      </div>
                    </div>
                  </div>

                  {/* On-Demand Expanded Project Inspection Drawer (Rendered Only After Selection) */}
                  {workbenchProject && (
                    <div
                      id="project-inspection-drawer"
                      ref={workbenchInspectionRef}
                      className="mt-8 border border-card-border bg-card-bg rounded-md overflow-hidden scroll-mt-24 shadow-[var(--shadow-stage)]"
                    >
                      {/* Drawer Top Bar with Navigation + Prominent Close */}
                      <div className="border-b border-card-border bg-lift/50 px-5 py-4 sm:px-6 sm:py-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-text-muted tabular-nums">
                            <span>
                              {workbenchProject.specId} · {workbenchProject.categoryLabel}
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-foreground font-medium">
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  workbenchProject.status === "live"
                                    ? "bg-[var(--signal-emerald)]"
                                    : "bg-[var(--signal-amber)]"
                                }`}
                              />
                              <span>{workbenchProject.status === "live" ? "LIVE" : "TESTING"}</span>
                            </span>
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                            {workbenchProject.title}
                          </h3>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              const prev =
                                filteredProjects[
                                  (workbenchIndex - 1 + filteredProjects.length) %
                                    filteredProjects.length
                                ];
                              setSelectedWorkbenchId(prev.id);
                            }}
                            className="min-h-[44px] sm:min-h-0 border border-card-border bg-background hover:border-card-hover hover:bg-lift px-3.5 py-2 sm:px-3 sm:py-1.5 rounded font-mono text-xs font-medium text-foreground transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                            title="Previous project"
                          >
                            ← Prev
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const next =
                                filteredProjects[(workbenchIndex + 1) % filteredProjects.length];
                              setSelectedWorkbenchId(next.id);
                            }}
                            className="min-h-[44px] sm:min-h-0 border border-card-border bg-background hover:border-card-hover hover:bg-lift px-3.5 py-2 sm:px-3 sm:py-1.5 rounded font-mono text-xs font-medium text-foreground transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                            title="Next project"
                          >
                            Next →
                          </button>
                          <button
                            type="button"
                            onClick={handleCloseProject}
                            aria-label={`Close ${workbenchProject.title} details`}
                            className="inline-flex min-h-[44px] sm:min-h-0 items-center gap-1.5 border border-foreground bg-foreground text-background hover:opacity-90 px-3.5 py-2 sm:px-3 sm:py-1.5 rounded font-mono text-xs font-bold tracking-wide transition-opacity cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                          >
                            <span>Close</span>
                            <svg
                              className="h-3.5 w-3.5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Drawer Body */}
                      <div className="p-5 sm:p-6 space-y-6">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <span className="font-mono text-xs text-text-muted tabular-nums">
                            {workbenchProject.specId} ({workbenchIndex + 1} of{" "}
                            {filteredProjects.length})
                          </span>
                          <ProjectActionButtons project={workbenchProject} />
                        </div>

                        <ProjectMediaStage
                          project={workbenchProject}
                          activeIndex={cardImageIndexes[workbenchProject.id] ?? 0}
                          onSelectIndex={(idx) => setProjectImageIndex(workbenchProject.id, idx)}
                          onOpenLightbox={(idx) => openLightbox(workbenchProject, idx)}
                          isLcpCandidate
                        />

                        <ProjectNarrativePanel project={workbenchProject} />

                        {/* Drawer Footer Close Option */}
                        <div className="pt-4 border-t border-card-border flex flex-wrap items-center justify-between gap-3">
                          <span className="font-mono text-xs text-text-muted">
                            Finished inspecting {workbenchProject.title}?
                          </span>
                          <button
                            type="button"
                            onClick={handleCloseProject}
                            className="inline-flex min-h-[44px] sm:min-h-0 items-center gap-1.5 border border-card-border bg-lift hover:border-card-hover hover:bg-card-border px-3.5 py-2 sm:px-3 sm:py-1.5 rounded font-mono text-xs font-medium text-foreground transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                          >
                            <span>Close Project ↑</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </section>

        {/* CONTACT & DIRECT INQUIRY SECTION */}
        <section
          id="contact"
          aria-labelledby="contact-title"
          className="mt-20 sm:mt-28 border-t border-card-border pt-14 sm:pt-16 pb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left 5 Columns: Engagement Specs & Direct Channels */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <h2
                  id="contact-title"
                  className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
                >
                  Start a Project Conversation
                </h2>
                <p className="text-base text-text-muted leading-relaxed">
                  Available for zero-to-launch web platforms and cross-platform mobile apps.
                  Send a brief note about what you&apos;d like to build.
                </p>
              </div>

              <div className="pt-1">
                <a
                  href="https://www.upwork.com/freelancers/~01958faf0bb3c23d8a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded border border-card-border bg-lift px-4 py-2.5 font-mono text-xs font-medium text-foreground hover:border-card-hover hover:bg-card-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                >
                  <span>Hire via Upwork</span>
                  <span className="text-text-muted">↗</span>
                </a>
              </div>
            </div>

            {/* Right 7 Columns: Direct Inquiry Form */}
            <div className="lg:col-span-7 border border-card-border bg-card-bg p-6 sm:p-8 rounded-md">
              {formSubmitted ? (
                <div className="space-y-4 py-8 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-lift border border-card-border text-foreground">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Inquiry Received</h3>
                  <p className="text-sm text-text-muted max-w-md mx-auto">
                    Thank you for reaching out, {formState.name}. I typically review and reply to
                    project scopes within 24 hours.
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
                      className="font-mono text-xs text-foreground underline underline-offset-4 hover:text-text-muted cursor-pointer"
                    >
                      Send another note
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  action="https://formspree.io/f/xaeqgenr"
                  method="POST"
                  noValidate
                  onSubmit={handleFormSubmit}
                  className="space-y-5"
                >
                  <h3 className="text-xl font-bold text-foreground">Direct Project Inquiry</h3>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="client-name"
                        className="font-mono text-xs sm:text-sm font-semibold tracking-wide text-text-muted"
                      >
                        Your Name *
                      </label>
                      <input
                        id="client-name"
                        name="name"
                        type="text"
                        required
                        aria-invalid={formErrorField === "name" ? "true" : undefined}
                        aria-describedby={formErrorField === "name" ? "form-error" : undefined}
                        value={formState.name}
                        onChange={(e) => {
                          setFormState({ ...formState, name: e.target.value });
                          if (formErrorField === "name") {
                            setFormError(null);
                            setFormErrorField(null);
                          }
                        }}
                        placeholder="e.g. Alex Miller"
                        className="w-full border border-card-border bg-background px-4 py-3 text-sm sm:text-base text-foreground placeholder:text-text-subtle focus:border-card-hover focus:outline-none focus:ring-1 focus:ring-card-hover rounded transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="client-email"
                        className="font-mono text-xs sm:text-sm font-semibold tracking-wide text-text-muted"
                      >
                        Email Address *
                      </label>
                      <input
                        id="client-email"
                        name="email"
                        type="email"
                        required
                        aria-invalid={formErrorField === "email" ? "true" : undefined}
                        aria-describedby={formErrorField === "email" ? "form-error" : undefined}
                        value={formState.email}
                        onChange={(e) => {
                          setFormState({ ...formState, email: e.target.value });
                          if (formErrorField === "email") {
                            setFormError(null);
                            setFormErrorField(null);
                          }
                        }}
                        placeholder="name@company.com"
                        className="w-full border border-card-border bg-background px-4 py-3 text-sm sm:text-base text-foreground placeholder:text-text-subtle focus:border-card-hover focus:outline-none focus:ring-1 focus:ring-card-hover rounded transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="project-category"
                        className="font-mono text-xs sm:text-sm font-semibold tracking-wide text-text-muted"
                      >
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
                        <option value="Other">Other (write your own)</option>
                      </select>
                      {formState.category === "Other" && (
                        <input
                          type="text"
                          id="custom-category"
                          name="category"
                          required
                          aria-invalid={formErrorField === "customCategory" ? "true" : undefined}
                          aria-describedby={
                            formErrorField === "customCategory" ? "form-error" : undefined
                          }
                          value={formState.customCategory}
                          onChange={(e) => {
                            setFormState({ ...formState, customCategory: e.target.value });
                            if (formErrorField === "customCategory") {
                              setFormError(null);
                              setFormErrorField(null);
                            }
                          }}
                          placeholder="Specify project scope (e.g. AI platform, API)..."
                          aria-label="Custom project scope"
                          className="mt-2 w-full border border-card-border bg-background px-4 py-2.5 text-sm sm:text-base text-foreground placeholder:text-text-subtle focus:border-card-hover focus:outline-none focus:ring-1 focus:ring-card-hover rounded transition-colors"
                        />
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="project-budget"
                        className="font-mono text-xs sm:text-sm font-semibold tracking-wide text-text-muted"
                      >
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
                          aria-invalid={formErrorField === "customBudget" ? "true" : undefined}
                          aria-describedby={
                            formErrorField === "customBudget" ? "form-error" : undefined
                          }
                          value={formState.customBudget}
                          onChange={(e) => {
                            setFormState({ ...formState, customBudget: e.target.value });
                            if (formErrorField === "customBudget") {
                              setFormError(null);
                              setFormErrorField(null);
                            }
                          }}
                          placeholder="e.g. $3,500 or $15k - $25k"
                          aria-label="Custom budget amount"
                          className="mt-2 w-full border border-card-border bg-background px-4 py-2.5 text-sm sm:text-base text-foreground placeholder:text-text-subtle focus:border-card-hover focus:outline-none focus:ring-1 focus:ring-card-hover rounded transition-colors"
                        />
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="project-message"
                      className="font-mono text-xs sm:text-sm font-semibold tracking-wide text-text-muted"
                    >
                      Short Project Intro *
                    </label>
                    <textarea
                      id="project-message"
                      name="message"
                      required
                      rows={3}
                      aria-invalid={formErrorField === "message" ? "true" : undefined}
                      aria-describedby={formErrorField === "message" ? "form-error" : undefined}
                      value={formState.message}
                      onChange={(e) => {
                        setFormState({ ...formState, message: e.target.value });
                        if (formErrorField === "message") {
                          setFormError(null);
                          setFormErrorField(null);
                        }
                      }}
                      placeholder="Briefly describe what you're looking to build..."
                      className="w-full border border-card-border bg-background px-4 py-3 text-sm sm:text-base text-foreground placeholder:text-text-subtle leading-relaxed focus:border-card-hover focus:outline-none focus:ring-1 focus:ring-card-hover rounded transition-colors"
                    />
                  </div>

                  {formError && (
                    <div
                      id="form-error"
                      role="alert"
                      aria-live="polite"
                      className="border border-[var(--signal-error-border)] bg-[var(--signal-error-bg)] text-[var(--signal-error)] p-3 rounded font-mono text-xs"
                    >
                      {formError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="w-full min-h-[44px] border border-foreground bg-foreground text-background px-5 py-3 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded disabled:opacity-50 cursor-pointer"
                  >
                    {formSubmitting ? "Sending..." : "Send Inquiry →"}
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
          <p className="text-sm text-text-muted">&copy; 2026 Muhammad Faran</p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-sm text-text-muted">
            <a
              href="https://www.upwork.com/freelancers/~01958faf0bb3c23d8a"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] sm:min-h-0 items-center px-2 py-2 sm:py-0 sm:px-0 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:underline"
            >
              Upwork
            </a>

            <a
              href="https://github.com/m-faran"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] sm:min-h-0 items-center px-2 py-2 sm:py-0 sm:px-0 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:underline"
            >
              GitHub
            </a>

            <a
              href="#contact"
              className="inline-flex min-h-[44px] sm:min-h-0 items-center px-2 py-2 sm:py-0 sm:px-0 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:underline"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>

      {/* FULLSCREEN HIGH-RESOLUTION LIGHTBOX MODAL */}
      {lightbox && (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${lightbox.project.title} screenshot inspector`}
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6"
        >
          {/* Lightbox Top Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="mx-auto w-full max-w-6xl flex items-center justify-between gap-4 border border-card-border bg-card-bg px-4 py-3 rounded"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="font-mono text-xs font-bold text-text-muted border border-card-border bg-lift px-2 py-0.5 rounded shrink-0 tabular-nums">
                {lightbox.project.specId}
              </span>
              <div className="min-w-0">
                <div className="text-sm sm:text-base font-bold text-foreground truncate">
                  {lightbox.project.title} —{" "}
                  <span className="text-text-muted font-normal">
                    {lightbox.project.gallery[lightbox.index].label}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="font-mono text-xs text-text-muted tabular-nums">
                {lightbox.index + 1} / {lightbox.project.gallery.length}
              </span>
              <button
                ref={closeLightboxBtnRef}
                type="button"
                onClick={closeLightbox}
                className="min-h-[44px] sm:min-h-0 border border-card-border bg-lift hover:border-card-hover px-3 py-2 sm:py-1.5 rounded font-mono text-xs font-bold text-foreground cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
              >
                Close (Esc) ✕
              </button>
            </div>
          </div>

          {/* Lightbox Center Image Viewport */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex-1 my-3 flex items-center justify-center overflow-hidden"
          >
            <Image
              src={lightbox.project.gallery[lightbox.index].url}
              alt={lightbox.project.gallery[lightbox.index].alt}
              width={1600}
              height={1000}
              sizes="95vw"
              className="max-h-[68vh] w-auto max-w-full object-contain rounded border border-card-border shadow-[var(--shadow-lightbox)]"
            />

            {lightbox.project.gallery.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    const prevIdx =
                      (lightbox.index - 1 + lightbox.project.gallery.length) %
                      lightbox.project.gallery.length;
                    setCardImageIndexes((ci) => ({ ...ci, [lightbox.project.id]: prevIdx }));
                    setLightbox({
                      ...lightbox,
                      index: prevIdx,
                    });
                  }}
                  aria-label="Previous image"
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 h-11 w-11 flex items-center justify-center rounded-full border border-card-border bg-card-bg/90 hover:border-card-hover text-foreground shadow-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const nextIdx = (lightbox.index + 1) % lightbox.project.gallery.length;
                    setCardImageIndexes((ci) => ({ ...ci, [lightbox.project.id]: nextIdx }));
                    setLightbox({
                      ...lightbox,
                      index: nextIdx,
                    });
                  }}
                  aria-label="Next image"
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 h-11 w-11 flex items-center justify-center rounded-full border border-card-border bg-card-bg/90 hover:border-card-hover text-foreground shadow-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                >
                  →
                </button>
              </>
            )}
          </div>

          {/* Lightbox Bottom Caption & Thumbnail Strip */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="mx-auto w-full max-w-6xl border border-card-border bg-card-bg p-3.5 sm:p-4 rounded space-y-3"
          >
            <p className="text-xs sm:text-sm text-foreground text-center">
              <strong className="font-mono text-text-muted mr-2">
                [{lightbox.project.gallery[lightbox.index].label}]
              </strong>
              {lightbox.project.gallery[lightbox.index].caption}
            </p>
            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              {lightbox.project.gallery.map((g, i) => (
                <button
                  key={g.url}
                  type="button"
                  onClick={() => setLightbox({ ...lightbox, index: i })}
                  className={`min-h-[44px] sm:min-h-0 px-3 py-2 sm:px-2.5 sm:py-1 rounded font-mono text-xs cursor-pointer transition-colors tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground ${
                    i === lightbox.index
                      ? "bg-foreground text-background font-bold"
                      : "bg-lift border border-card-border text-text-muted hover:text-foreground"
                  }`}
                >
                  {i + 1}. {g.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
