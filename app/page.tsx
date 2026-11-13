"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { PROJECTS, Project } from "./project-data";
import { SKILL_CATEGORIES, GithubIcon } from "./skills-data";

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
  const [selectedWorkbenchId, setSelectedWorkbenchId] = useState<string>(PROJECTS[0].id);

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
  const [archiveOpen, setArchiveOpen] = useState(false);

  // Skills Accordion State
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    frontend: true,
    web3: true,
  });

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

  const flagshipProjects = filteredProjects.slice(0, 4);
  const archiveProjects = filteredProjects.slice(4);

  // Active project for Split Workbench
  const workbenchProject =
    filteredProjects.find((p) => p.id === selectedWorkbenchId) || filteredProjects[0];
  const workbenchIndex = filteredProjects.indexOf(workbenchProject);
  const isArchivedSelected = archiveProjects.some((p) => p.id === workbenchProject?.id);
  const isArchiveExpanded = archiveOpen || isArchivedSelected;

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
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      workbenchInspectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleCategory = (id: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleExpandAllSkills = () => {
    const allOpen: Record<string, boolean> = {};
    SKILL_CATEGORIES.forEach((cat) => {
      allOpen[cat.id] = true;
    });
    setOpenCategories(allOpen);
  };

  const handleCollapseAllSkills = () => {
    setOpenCategories({});
  };

  const isAllSkillsExpanded = SKILL_CATEGORIES.every((cat) => openCategories[cat.id]);

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
              href="#skills"
              className="inline-flex min-h-[44px] sm:min-h-0 items-center whitespace-nowrap px-2 sm:px-2.5 sm:py-1.5 text-xs sm:text-sm font-medium text-text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded"
            >
              Skills
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

        {/* SELECTED WORK SECTION (Split Workbench Architecture) */}
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
                Select any system from the directory to inspect its interactive screen flows,
                problem context, system architecture, and source repositories.
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

          {/* SPLIT WORKBENCH STAGE (4-Col Sticky System Directory + 8-Col Deep-Dive Inspection Theatre) */}
          <div
            id="projects-stage"
            role="tabpanel"
            aria-labelledby={`tab-${activeCategory}`}
            className="pt-8"
          >
            {workbenchProject && (() => {
              const renderDirectoryItem = (proj: Project) => {
                const isSelected = proj.id === workbenchProject.id;
                return (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => handleSelectProject(proj.id)}
                    aria-current={isSelected ? "true" : undefined}
                    className={`w-full text-left p-3.5 sm:p-4 transition-colors cursor-pointer flex flex-col gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground ${
                      isSelected
                        ? "bg-lift text-foreground"
                        : "bg-card-bg text-text-muted hover:bg-hover-surface hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`font-mono text-xs font-bold tabular-nums ${
                          isSelected ? "text-foreground" : "text-text-subtle"
                        }`}
                      >
                        {proj.specId} · {proj.categoryLabel}
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-mono text-[11px]">
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
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm sm:text-base font-bold text-foreground">
                        {proj.title}
                      </span>
                      {isSelected && (
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider bg-foreground text-background px-2 py-0.5 rounded">
                          Active
                        </span>
                      )}
                    </div>
                  </button>
                );
              };

              return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Sticky Project Spec Index (4 Cols) */}
                <div
                  id="system-directory-panel"
                  className="lg:col-span-4 lg:sticky lg:top-20 border border-card-border bg-card-bg rounded-md overflow-hidden"
                >
                  <div className="border-b border-card-border bg-lift/60 px-4 py-3 flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                      System Directory ({filteredProjects.length})
                    </span>
                    <span className="font-mono text-[11px] text-text-muted">Select to inspect</span>
                  </div>
                  <div className="max-h-[460px] lg:max-h-[720px] overflow-y-auto divide-y divide-card-border">
                    {archiveProjects.length > 0 && (
                      <div className="bg-lift/30 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-text-subtle">
                        Flagship Projects ({flagshipProjects.length})
                      </div>
                    )}
                    {flagshipProjects.map(renderDirectoryItem)}

                    {archiveProjects.length > 0 && (
                      <>
                        <button
                          type="button"
                          onClick={() => setArchiveOpen((prev) => !prev)}
                          aria-expanded={isArchiveExpanded}
                          aria-controls="directory-archive-list"
                          className="w-full min-h-[44px] bg-lift/40 hover:bg-hover-surface px-4 py-2.5 flex items-center justify-between font-mono text-[11px] font-semibold uppercase tracking-wider text-text-muted hover:text-foreground transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground"
                        >
                          <span>Archive ({archiveProjects.length})</span>
                          <span className="flex items-center gap-1.5 tabular-nums">
                            <span>{isArchiveExpanded ? "Hide" : "Show"}</span>
                            <svg
                              className={`h-3.5 w-3.5 transition-transform duration-200 ${
                                isArchiveExpanded ? "rotate-180" : ""
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </span>
                        </button>
                        {isArchiveExpanded && (
                          <div
                            id="directory-archive-list"
                            className="divide-y divide-card-border"
                          >
                            {archiveProjects.map(renderDirectoryItem)}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Right 8-Column Deep-Dive Inspection Theatre */}
                <div
                  ref={workbenchInspectionRef}
                  className="lg:col-span-8 border border-card-border bg-card-bg rounded-md overflow-hidden scroll-mt-20"
                >
                  {/* Workbench Top Bar */}
                  <div className="border-b border-card-border bg-lift/50 px-5 py-4 sm:px-6 sm:py-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                        {workbenchProject.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
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
                    </div>
                  </div>

                  {/* Workbench Body */}
                  <div className="p-5 sm:p-6 space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="font-mono text-xs text-text-muted tabular-nums">
                        {workbenchProject.specId} ({workbenchIndex + 1} of{" "}
                        {filteredProjects.length})
                      </span>
                      <ProjectActionButtons project={workbenchProject} />
                    </div>

                    {/* Hybrid Media Stage:
                        - Mobile projects -> 3-Up Multi-Screen Triptych
                        - Web projects -> High-Res Viewport + Thumbnail Filmstrip */}
                    <ProjectMediaStage
                      project={workbenchProject}
                      activeIndex={cardImageIndexes[workbenchProject.id] ?? 0}
                      onSelectIndex={(idx) => setProjectImageIndex(workbenchProject.id, idx)}
                      onOpenLightbox={(idx) => openLightbox(workbenchProject, idx)}
                      isLcpCandidate
                    />

                    {/* Deep Engineering Narrative */}
                    <ProjectNarrativePanel project={workbenchProject} />
                  </div>
                </div>
              </div>
              );
            })()}
          </div>
        </section>

        {/* SKILLS & TECHNOLOGIES SECTION */}
        <section
          id="skills"
          aria-labelledby="skills-title"
          className="mt-20 sm:mt-28 border-t border-card-border pt-14 sm:pt-16"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between pb-8">
            <div className="space-y-2">
              <h2
                id="skills-title"
                className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
              >
                Skills &amp; Technologies
              </h2>
              <p className="text-sm sm:text-base text-text-muted max-w-2xl">
                Production stack across frontend interfaces, backend data infrastructure, and cross-platform mobile runtimes.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={isAllSkillsExpanded ? handleCollapseAllSkills : handleExpandAllSkills}
                className="inline-flex min-h-[44px] sm:min-h-0 items-center gap-2 rounded border border-card-border bg-card-bg px-3.5 py-2.5 sm:py-2 font-mono text-xs sm:text-sm font-medium tracking-wide text-text-muted transition-colors hover:border-card-hover hover:bg-lift hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground cursor-pointer"
              >
                <svg
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    isAllSkillsExpanded ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <span>{isAllSkillsExpanded ? "Collapse All" : "Expand All (50)"}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {SKILL_CATEGORIES.map((cat) => {
              const isOpen = !!openCategories[cat.id];
              const displayedPreviewSkills = cat.skills
                .slice(0, 4)
                .map((s) => s.name)
                .join(", ");
              const remainingCount = cat.skills.length - 4;

              return (
                <div
                  key={cat.id}
                  className="border border-card-border bg-card-bg rounded-md overflow-hidden transition-colors hover:border-card-hover self-start"
                >
                  <button
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    aria-expanded={isOpen}
                    aria-controls={`skills-content-${cat.id}`}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-hover-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground cursor-pointer"
                  >
                    <div className="min-w-0 space-y-1">
                      <h3 className="text-base sm:text-lg font-bold text-foreground">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-text-subtle">{cat.scope}</p>
                      {!isOpen && (
                        <div className="pt-1 flex items-center gap-1.5 text-xs text-text-muted font-mono min-w-0">
                          <span className="truncate">{displayedPreviewSkills}</span>
                          {remainingCount > 0 && (
                            <span className="shrink-0 text-text-subtle">
                              +{remainingCount} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className="border border-card-border bg-lift px-2.5 py-1 rounded font-mono text-xs font-medium tracking-wide text-text-muted tabular-nums">
                        {cat.skills.length} tools
                      </span>
                      <svg
                        className={`h-4 w-4 text-text-muted transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={`skills-content-${cat.id}`}
                      role="region"
                      aria-label={`${cat.title} skills`}
                      className="px-5 pb-5 pt-2 border-t border-card-border/60"
                    >
                      <div className="flex flex-wrap gap-2.5 pt-2">
                        {cat.skills.map((skill) => (
                          <div
                            key={skill.name}
                            className="flex-1 min-w-[calc(50%-0.625rem)] sm:min-w-[130px] inline-flex items-center justify-center gap-2.5 border border-card-border bg-lift px-3.5 py-2.5 rounded text-xs sm:text-sm font-medium text-foreground hover:border-card-hover hover:bg-hover-surface transition-colors"
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
