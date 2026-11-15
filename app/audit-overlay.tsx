"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";

export type AuditPrepareAction =
  | "hero"
  | "header"
  | "carousel"
  | "carousel-paused"
  | "spec-09"
  | "spec-01"
  | "lightbox-spec-01"
  | "contact-validation"
  | "contact";

export interface AuditFindingItem {
  id: string;
  severity: "P1" | "P2" | "P3";
  status: "fixed" | "skipped";
  source: "Audit + Critique" | "Audit" | "Critique";
  category: string;
  title: string;
  metrics: string;
  location: string;
  selector: string;
  whyItMatters: string;
  fix: string;
  command: string;
  prepare: AuditPrepareAction;
}

const AUDIT_FINDINGS: AuditFindingItem[] = [
  {
    id: "A-01",
    severity: "P1",
    status: "fixed",
    source: "Audit + Critique",
    category: "Responsive / A11y",
    title: "Carousel primary track clips offscreen & lacks touch swipe",
    metrics: "FIXED: native overflow-x-auto touch-pan-x + onFocus reveal + inert-free mirror",
    location: "app/page.tsx",
    selector: "#projects-carousel",
    whyItMatters:
      "wrapCarouselOffset kept the accessible tabIndex={0} primary track offscreen while visible cards sat inside aria-hidden='true', and overflow-hidden ignored touch swipe.",
    fix: "Switched to native overflow-x-auto horizontal scrolling with touch swipe, onFocus scroll-into-view, and non-focusable duplicate buffer.",
    command: "/impeccable adapt",
    prepare: "carousel",
  },
  {
    id: "A-02",
    severity: "P1",
    status: "fixed",
    source: "Audit + Critique",
    category: "Responsive / WCAG 1.4.4",
    title: "375px stage header crushes screen title, dot squishes & 200% zoom overflows",
    metrics: "FIXED: dots hidden <sm, compact Fullscreen label, shrink-0 dot, flex-wrap header",
    location: "app/page.tsx",
    selector: '[data-audit-id="stage-header"]',
    whyItMatters:
      "At 375px, controls squeezed SPEC-09 · Landing (Hero) to 0px; telemetry dot squished; 200% zoom overflowed header/carousel controls to 636px.",
    fix: "Hidden decorative dots below sm, condensed mobile button label, added shrink-0 on telemetry dot, and enabled header/controls flex-wrap.",
    command: "/impeccable adapt",
    prepare: "spec-09",
  },
  {
    id: "A-03",
    severity: "P1",
    status: "fixed",
    source: "Audit + Critique",
    category: "Accessibility / WCAG 1.4.3",
    title: "Dimmed mobile triptych labels fail AA contrast",
    metrics: "FIXED: opacity-60 moved to phone container only (labels 5.61:1 Light / 5.81:1 Dark)",
    location: "app/page.tsx",
    selector: '[data-audit-id="triptych-side-btn"]',
    whyItMatters:
      "opacity-55 on the flanking triptych button dimmed 11px text-text-subtle labels below WCAG AA 4.5:1.",
    fix: "Applied opacity dimming solely to the phone frame container so caption text stays at full opacity.",
    command: "/impeccable colorize",
    prepare: "spec-01",
  },
  {
    id: "A-04",
    severity: "P1",
    status: "fixed",
    source: "Audit + Critique",
    category: "Validation / WCAG 3.3.1",
    title: "Form noValidate skips email syntax & validates Other/Custom out of order",
    metrics: "FIXED: email regex check, top-to-bottom validation order, aria-required, short option",
    location: "app/page.tsx",
    selector: "#client-email",
    whyItMatters:
      "noValidate + trim-only check accepted malformed emails and validated custom fields after message; budget option clipped on desktop grid.",
    fix: "Added email format regex, reordered validation top-to-bottom, added aria-required='true', and shortened budget option copy.",
    command: "/impeccable harden",
    prepare: "contact-validation",
  },
  {
    id: "A-05",
    severity: "P1",
    status: "fixed",
    source: "Audit",
    category: "Responsive / WCAG 2.5.5",
    title: "sm:min-h-0 drops tablet touch targets below 44x44px",
    metrics: "FIXED: min-h-[44px] retained below lg (1024px) & >=28px desktop nav/footer links",
    location: "app/page.tsx",
    selector: "header nav",
    whyItMatters:
      "Interactive controls dropped to 30-36px on 640px-1024px touch tablets; desktop nav/footer text links measured 20px.",
    fix: "Moved responsive reset from sm:min-h-0 to lg:min-h-0 and padded header/footer links to >=28px on desktop.",
    command: "/impeccable adapt",
    prepare: "header",
  },
  {
    id: "C-06",
    severity: "P2",
    status: "fixed",
    source: "Audit + Critique",
    category: "State Consistency",
    title: "Lightbox bottom screen pills desync ProjectMediaStage on close",
    metrics: "FIXED: thumbnail pill clicks sync cardImageIndexes back to stage",
    location: "app/page.tsx",
    selector: '[data-audit-id="fullscreen-trigger"]',
    whyItMatters:
      "Clicking bottom screen pills inside Lightbox updated lightbox.index without syncing cardImageIndexes, reverting the stage on Escape.",
    fix: "Updated Lightbox thumbnail pill onClick to call setCardImageIndexes cleanly.",
    command: "/impeccable harden",
    prepare: "lightbox-spec-01",
  },
  {
    id: "C-07",
    severity: "P2",
    status: "skipped",
    source: "Audit + Critique",
    category: "Hero Hierarchy & Copy",
    title: "836px desktop Hero void (~45%), ~90ch comma splice & backwards CTA order",
    metrics: "SKIPPED (kept per user request) · ~90 chars/line · Let's talk leads Explore my work",
    location: "app/page.tsx:940-1010",
    selector: '[data-audit-id="hero-stage"]',
    whyItMatters:
      "min-h-[calc(100vh-4rem)] leaves bottom space open on desktop, bio uses a comma splice over ~90ch lines, and Let's talk visually precedes Explore my work.",
    fix: "Tighten hero vertical height, refine bio grammar to max-w-xl, and put Explore my work first.",
    command: "/impeccable polish",
    prepare: "hero",
  },
  {
    id: "C-08",
    severity: "P2",
    status: "skipped",
    source: "Critique",
    category: "Copy & Recognition",
    title: "Contradictory 'Flowing left -> right' when paused & no card summaries",
    metrics: 'SKIPPED (kept per user request) · Static status text + title/stack/count cards',
    location: "app/page.tsx",
    selector: '[data-audit-id="stream-telemetry"]',
    whyItMatters:
      "Pausing motion leaves telemetry saying 'Flowing left -> right'; cards show title and stack tags without 1-line descriptions.",
    fix: "Switch telemetry text when paused and add a concise line-clamp-1 project blurb on carousel cards.",
    command: "/impeccable clarify",
    prepare: "carousel-paused",
  },
  {
    id: "A-09",
    severity: "P2",
    status: "fixed",
    source: "Audit",
    category: "Performance",
    title: "Offscreen rAF burn, permanent will-change & duplicate image copy",
    metrics: "FIXED: IntersectionObserver + visibilitychange gate rAF + dynamic willChange",
    location: "app/page.tsx",
    selector: "#projects-carousel",
    whyItMatters:
      "rAF previously mutated style every frame even when scrolled away or paused, with permanent will-change active at rest.",
    fix: "Gated animation frames on IntersectionObserver, visibilityState, and active motion, clearing willChange when idle.",
    command: "/impeccable optimize",
    prepare: "carousel",
  },
  {
    id: "A-10",
    severity: "P2",
    status: "fixed",
    source: "Audit",
    category: "Theming / WCAG 1.4.11 & 2.4.7",
    title: "Light signal dots (<3:1), border contrast (1.4:1) & weak input focus rings",
    metrics: "FIXED: emerald #047857 (5.4:1), amber #b45309 (5.0:1), --input-border, ring-2",
    location: "app/globals.css & app/page.tsx",
    selector: "#project-message",
    whyItMatters:
      "Light Mode signal dots and form borders sat below 3:1 contrast, and inputs used weak focus:ring-card-hover.",
    fix: "Deepened Light Mode signal tokens, introduced --input-border, and standardized focus-visible:ring-2 focus-visible:ring-foreground.",
    command: "/impeccable colorize",
    prepare: "contact",
  },
  {
    id: "P-11",
    severity: "P3",
    status: "fixed",
    source: "Audit + Critique",
    category: "SLA, Tokens & Polish",
    title: "Missing upfront 24h SLA, scrollbar 3px radius & DESIGN.md YAML drift",
    metrics: "FIXED: 24h UTC+5 note added, HTML/CSS pills trimmed, 4px thumb, StageNavArrows",
    location: "app/page.tsx, project-data.ts, globals.css, DESIGN.md",
    selector: '[data-audit-id="contact-pitch"]',
    whyItMatters:
      "Visitors didn't see the 24h response expectation pre-submit; redundant HTML/CSS tags and 3px radius created minor drift.",
    fix: "Added upfront 24h SLA line, removed redundant HTML/CSS pills, aligned 4px scrollbar radius, extracted StageNavArrows, and updated DESIGN.md YAML.",
    command: "/impeccable polish",
    prepare: "contact",
  },
];

interface PinBox {
  id: string;
  severity: "P1" | "P2" | "P3";
  top: number;
  left: number;
  width: number;
  height: number;
  pinTop: number;
  pinLeft: number;
  liveDims: string;
}

interface AuditOverlayProps {
  onPrepareTarget: (action: AuditPrepareAction) => void;
  onExitAudit: () => void;
}

const SEVERITY_COLORS: Record<"P1" | "P2" | "P3", { border: string; bg: string; text: string }> = {
  P1: {
    border: "var(--signal-error, #ef4444)",
    bg: "var(--signal-error, #ef4444)",
    text: "#ffffff",
  },
  P2: {
    border: "var(--signal-amber, #b45309)",
    bg: "var(--signal-amber, #b45309)",
    text: "#ffffff",
  },
  P3: {
    border: "var(--text-subtle, #52525b)",
    bg: "var(--text-subtle, #52525b)",
    text: "#ffffff",
  },
};

export default function AuditOverlay({ onPrepareTarget, onExitAudit }: AuditOverlayProps) {
  const [selectedId, setSelectedId] = useState<string>("A-01");
  const [severityFilter, setSeverityFilter] = useState<"ALL" | "P1" | "P2" | "P3">("ALL");
  const [showPins, setShowPins] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [pinBoxes, setPinBoxes] = useState<PinBox[]>([]);
  const [carouselLiveInfo, setCarouselLiveInfo] = useState<{
    primaryLeft: number | null;
    viewportWidth: number;
  }>({ primaryLeft: null, viewportWidth: 0 });

  const filteredFindings = useMemo(() => {
    if (severityFilter === "ALL") return AUDIT_FINDINGS;
    return AUDIT_FINDINGS.filter((item) => item.severity === severityFilter);
  }, [severityFilter]);

  const selectedFinding = useMemo(
    () => AUDIT_FINDINGS.find((item) => item.id === selectedId) ?? AUDIT_FINDINGS[0],
    [selectedId]
  );

  const measurePins = useCallback(() => {
    if (!showPins || typeof window === "undefined") {
      setPinBoxes([]);
      return;
    }

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const measured: PinBox[] = [];
    const occupiedPins: Array<{ top: number; left: number }> = [];

    for (const item of filteredFindings) {
      const el = document.querySelector(item.selector) as HTMLElement | null;
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0 && item.id !== "A-02") continue;
      if (rect.bottom < -40 || rect.top > vh + 40) continue;

      let pinTop = Math.max(8, Math.min(vh - 34, rect.top + 6));
      let pinLeft = Math.max(8, Math.min(vw - 84, rect.left + 6));

      // Stagger colliding pins cleanly along the horizontal axis
      while (
        occupiedPins.some(
          (p) => Math.abs(p.top - pinTop) < 26 && Math.abs(p.left - pinLeft) < 62
        )
      ) {
        if (pinLeft + 66 < vw - 76) {
          pinLeft += 66;
        } else {
          pinTop += 28;
          pinLeft = Math.max(8, rect.left + 6);
        }
        if (pinTop > vh - 34) break;
      }

      occupiedPins.push({ top: pinTop, left: pinLeft });
      measured.push({
        id: item.id,
        severity: item.severity,
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        pinTop,
        pinLeft,
        liveDims: `${Math.round(rect.width)}×${Math.round(rect.height)}px`,
      });
    }

    const primaryCopy = document.querySelector(
      '[data-audit-id="carousel-primary-copy"]'
    ) as HTMLElement | null;
    if (primaryCopy) {
      setCarouselLiveInfo({
        primaryLeft: Math.round(primaryCopy.getBoundingClientRect().left),
        viewportWidth: vw,
      });
    }

    setPinBoxes(measured);
  }, [filteredFindings, showPins]);

  useEffect(() => {
    let rafId = 0;
    const loop = () => {
      measurePins();
      rafId = window.requestAnimationFrame(loop);
    };
    rafId = window.requestAnimationFrame(loop);
    window.addEventListener("scroll", measurePins, { passive: true });
    window.addEventListener("resize", measurePins, { passive: true });

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", measurePins);
      window.removeEventListener("resize", measurePins);
    };
  }, [measurePins]);

  const handleSelectFinding = (item: AuditFindingItem) => {
    setSelectedId(item.id);
    onPrepareTarget(item.prepare);
  };

  const selectedBox = pinBoxes.find((b) => b.id === selectedId);

  return (
    <>
      {/* Live Canvas Bounding Boxes & Clickable Annotation Pins */}
      {showPins && (
        <div
          className="pointer-events-none fixed inset-0 z-[9990] overflow-hidden"
          aria-hidden="false"
        >
          {pinBoxes.map((box) => {
            const palette = SEVERITY_COLORS[box.severity];
            const isActive = box.id === selectedId;
            return (
              <React.Fragment key={box.id}>
                <div
                  style={{
                    top: `${box.top}px`,
                    left: `${box.left}px`,
                    width: `${Math.max(4, box.width)}px`,
                    height: `${Math.max(4, box.height)}px`,
                    borderColor: palette.border,
                    borderWidth: "1px",
                    borderStyle: isActive ? "solid" : "dashed",
                    backgroundColor: isActive ? "rgba(239, 68, 68, 0.06)" : "transparent",
                  }}
                  className="fixed rounded pointer-events-none transition-[border-color,background-color] duration-150"
                />
                <button
                  type="button"
                  onClick={() => {
                    const found = AUDIT_FINDINGS.find((f) => f.id === box.id);
                    if (found) handleSelectFinding(found);
                  }}
                  style={{
                    top: `${box.pinTop}px`,
                    left: `${box.pinLeft}px`,
                    backgroundColor: isActive ? "var(--foreground)" : palette.bg,
                    color: isActive ? "var(--background)" : palette.text,
                    borderColor: palette.border,
                  }}
                  className="pointer-events-auto fixed inline-flex items-center gap-1 rounded px-2 py-0.5 border font-mono text-[11px] font-bold shadow-[var(--shadow-stage)] cursor-pointer transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                  title={`Inspect ${box.id}`}
                >
                  <span>{box.id}</span>
                  {isActive && <span className="opacity-80">· {box.liveDims}</span>}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      )}

      {/* Docked Audit + Critique Inspector HUD */}
      <aside
        aria-label="Impeccable Audit & Critique Visualizer"
        className="fixed bottom-3 inset-x-3 sm:inset-x-auto sm:right-4 sm:bottom-4 sm:w-[430px] z-[9995] rounded-md border border-card-border bg-card-bg text-foreground shadow-[var(--shadow-lightbox)] flex flex-col overflow-hidden"
      >
        {/* Compact Top Bar */}
        <div className="flex items-center justify-between gap-2 border-b border-card-border bg-lift px-3 py-2.5">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-[var(--signal-amber)]"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <p className="font-mono text-xs font-bold tracking-tight text-foreground truncate">
                ?audit Visualizer · Audit 14/20 · Critique 17/32
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setShowPins((p) => !p)}
              className="min-h-[36px] sm:min-h-0 rounded border border-card-border bg-card-bg hover:border-card-hover px-2 py-1 font-mono text-[11px] text-foreground cursor-pointer transition-colors"
            >
              {showPins ? "Hide Pins" : "Show Pins"}
            </button>
            <button
              type="button"
              onClick={() => setIsMinimized((m) => !m)}
              className="min-h-[36px] sm:min-h-0 rounded border border-card-border bg-card-bg hover:border-card-hover px-2 py-1 font-mono text-[11px] text-foreground cursor-pointer transition-colors"
              aria-expanded={!isMinimized}
            >
              {isMinimized ? "Expand" : "Minimize"}
            </button>
            <button
              type="button"
              onClick={onExitAudit}
              className="min-h-[36px] sm:min-h-0 rounded border border-foreground bg-foreground text-background px-2 py-1 font-mono text-[11px] font-bold cursor-pointer hover:opacity-90 transition-opacity"
            >
              Exit
            </button>
          </div>
        </div>

        {!isMinimized && (
          <div className="flex flex-col max-h-[60vh] sm:max-h-[72vh]">
            {/* Severity Filter & Live Viewport Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-card-border px-3 py-2 bg-background/60">
              <div className="flex items-center gap-1">
                {(
                  [
                    { id: "ALL", label: `All (${AUDIT_FINDINGS.length})` },
                    { id: "P1", label: "P1 (5)" },
                    { id: "P2", label: "P2 (5)" },
                    { id: "P3", label: "P3 (1)" },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setSeverityFilter(tab.id);
                      const first =
                        tab.id === "ALL"
                          ? AUDIT_FINDINGS[0]
                          : AUDIT_FINDINGS.find((f) => f.severity === tab.id);
                      if (first) handleSelectFinding(first);
                    }}
                    className={`rounded px-2 py-1 font-mono text-[11px] font-medium cursor-pointer transition-colors ${
                      severityFilter === tab.id
                        ? "bg-foreground text-background font-bold"
                        : "border border-card-border bg-card-bg text-text-muted hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <span className="font-mono text-[11px] text-text-subtle tabular-nums">
                {carouselLiveInfo.viewportWidth > 0
                  ? `${carouselLiveInfo.viewportWidth}px viewport`
                  : ""}
              </span>
            </div>

            {/* Scrollable Issue Selector List */}
            <div className="max-h-36 overflow-y-auto divide-y divide-card-border border-b border-card-border">
              {filteredFindings.map((item) => {
                const isSelected = item.id === selectedId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectFinding(item)}
                    className={`w-full text-left px-3 py-2 flex items-start gap-2 transition-colors cursor-pointer ${
                      isSelected ? "bg-hover-surface" : "hover:bg-lift/60"
                    }`}
                  >
                    <span
                      style={{
                        backgroundColor: SEVERITY_COLORS[item.severity].bg,
                        color: "#ffffff",
                      }}
                      className="mt-0.5 shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px] font-bold"
                    >
                      {item.id}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-semibold text-foreground leading-snug truncate">
                          {item.title}
                        </p>
                        <span
                          className={`shrink-0 rounded px-1 py-0.5 font-mono text-[10px] font-bold uppercase ${
                            item.status === "fixed"
                              ? "text-[var(--signal-emerald)]"
                              : "text-[var(--signal-amber)]"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="font-mono text-[11px] text-text-subtle truncate">
                        {item.severity} · {item.category} · {item.command}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Finding Detail Pane */}
            <div className="overflow-y-auto p-3.5 space-y-2.5 bg-card-bg">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex flex-wrap items-center gap-1.5 mb-1">
                    <span
                      style={{
                        backgroundColor: SEVERITY_COLORS[selectedFinding.severity].bg,
                        color: "#ffffff",
                      }}
                      className="rounded px-1.5 py-0.5 font-mono text-[11px] font-bold"
                    >
                      {selectedFinding.id} · {selectedFinding.severity}
                    </span>
                    <span
                      className={`rounded border border-card-border bg-lift px-1.5 py-0.5 font-mono text-[11px] font-bold uppercase ${
                        selectedFinding.status === "fixed"
                          ? "text-[var(--signal-emerald)]"
                          : "text-[var(--signal-amber)]"
                      }`}
                    >
                      {selectedFinding.status === "fixed" ? "Fixed" : "Skipped"}
                    </span>
                    <span className="rounded border border-card-border bg-lift px-1.5 py-0.5 font-mono text-[11px] text-text-muted">
                      {selectedFinding.source}
                    </span>
                    <span className="rounded border border-card-border bg-lift px-1.5 py-0.5 font-mono text-[11px] text-foreground font-semibold">
                      {selectedFinding.command}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground leading-snug">
                    {selectedFinding.title}
                  </h3>
                </div>
              </div>

              <div className="rounded border border-card-border bg-lift/60 px-2.5 py-1.5 font-mono text-[11px] text-text-muted space-y-0.5">
                <div>
                  <strong className="text-foreground">Evidence:</strong> {selectedFinding.metrics}
                </div>
                <div>
                  <strong className="text-foreground">Source:</strong> {selectedFinding.location}
                </div>
                {selectedBox && (
                  <div>
                    <strong className="text-foreground">Live box:</strong> {selectedBox.liveDims}
                  </div>
                )}
              </div>

              <p className="text-xs text-text-muted leading-relaxed">
                <strong className="text-foreground">Impact:</strong> {selectedFinding.whyItMatters}
              </p>

              <p className="text-xs text-text-muted leading-relaxed">
                <strong className="text-foreground">Fix:</strong> {selectedFinding.fix}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleSelectFinding(selectedFinding)}
                  className="rounded border border-foreground bg-foreground text-background px-2.5 py-1 font-mono text-[11px] font-bold cursor-pointer hover:opacity-90"
                >
                  Jump &amp; Locate Target
                </button>
                {selectedFinding.id === "A-04" && (
                  <button
                    type="button"
                    onClick={() => {
                      onPrepareTarget("contact-validation");
                      const emailInput = document.getElementById(
                        "client-email"
                      ) as HTMLInputElement | null;
                      if (emailInput) {
                        emailInput.focus();
                      }
                    }}
                    className="rounded border border-card-border bg-lift px-2.5 py-1 font-mono text-[11px] text-foreground hover:border-card-hover cursor-pointer"
                  >
                    Reveal Other/Custom Fields
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
