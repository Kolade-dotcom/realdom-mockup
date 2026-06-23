"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import SearchModal from "./SearchModal";

const locations = [
  { id: "lagos", label: "Lagos" },
  { id: "abuja", label: "Abuja" },
  { id: "ph", label: "Port Harcourt" },
  { id: "ibadan", label: "Ibadan" },
  { id: "enugu", label: "Enugu" },
];

export default function Header() {
  const [activeLocation, setActiveLocation] = useState("lagos");
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ⌘K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <header
        style={{
          ...styles.header,
          boxShadow: scrolled ? "0 4px 20px rgba(15,23,36,0.10)" : "none",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          background: scrolled
            ? "rgba(255,255,255,0.95)"
            : "var(--color-surface-default)",
          transition: "box-shadow 0.25s ease, backdrop-filter 0.25s ease, background 0.25s ease",
        }}
      >
        <div style={styles.inner} className="header-inner">
          {/* Logo */}
          <Link href="/" style={styles.logoWrap}>
            <div style={styles.logoIcon} className="header-logo-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 10.5L12 3L21 10.5V20C21 20.55 20.55 21 20 21H15V14H9V21H4C3.45 21 3 20.55 3 20V10.5Z"
                  fill="var(--color-brand-secondary)"
                />
                <path
                  d="M12 3L21 10.5V20C21 20.55 20.55 21 20 21H15V14H12V3Z"
                  fill="var(--teal-700)"
                  opacity="0.7"
                />
              </svg>
            </div>
            <span style={styles.logoText} className="header-logo-text">RealDom.</span>
          </Link>

          {/* City tabs */}
          <nav style={styles.locationTabs} className="header-location-tabs" aria-label="City selection">
            {locations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setActiveLocation(loc.id)}
                style={{
                  ...styles.locationTab,
                  ...(activeLocation === loc.id ? styles.locationTabActive : {}),
                }}
                aria-pressed={activeLocation === loc.id}
              >
                {loc.label}
              </button>
            ))}
          </nav>

          {/* Right section */}
          <div style={styles.rightSection}>
            {/* Search trigger pill */}
            <button
              style={styles.searchTrigger}
              className="header-search-trigger"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              <span style={styles.searchPlaceholder}>Search properties...</span>
              <span style={styles.kbdBadge} className="header-kbd-badge">⌘K</span>
            </button>

            {/* List Property CTA */}
            <Link href="#" style={styles.listPropertyBtn} className="btn-primary interactive-btn">
              <span className="header-list-cta-text">List Property</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: "none" }} className="header-list-cta-icon">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </Link>

            {/* Profile link */}
            <Link href="/profile" style={styles.avatarBtn} aria-label="Profile">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-text-secondary)"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    position: "sticky",
    top: 0,
    zIndex: 200,
    borderBottom: "1px solid var(--color-border-default)",
  },
  inner: {
    maxWidth: "var(--content-max-width)",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px var(--space-6)",
    gap: "var(--space-5)",
  } as React.CSSProperties,
  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-2)",
    flexShrink: 0,
    textDecoration: "none",
  },
  logoIcon: {
    width: 38,
    height: 38,
    borderRadius: "var(--radius-md)",
    background: "var(--teal-050)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "var(--shadow-sm)",
    transition: "transform 0.2s ease",
  },
  logoText: {
    fontSize: "21px",
    fontWeight: 800,
    color: "var(--color-text-primary)",
    letterSpacing: "-0.7px",
  },
  locationTabs: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-1)",
    background: "var(--color-bg-subtle)",
    borderRadius: "var(--radius-pill)",
    padding: "4px",
    flexShrink: 0,
  },
  locationTab: {
    padding: "7px 15px",
    borderRadius: "var(--radius-pill)",
    fontSize: "13px",
    fontWeight: 500,
    color: "var(--color-text-secondary)",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s var(--motion-easing-spring)",
    whiteSpace: "nowrap",
  },
  locationTabActive: {
    background: "var(--color-brand-secondary)",
    color: "var(--color-text-inverse)",
    boxShadow: "var(--shadow-md)",
    transform: "scale(1.02)",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-3)",
    flexShrink: 0,
  },
  searchTrigger: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-2)",
    padding: "9px 14px",
    borderRadius: "var(--radius-pill)",
    border: "1.5px solid var(--color-border-default)",
    background: "var(--color-bg-subtle)",
    cursor: "pointer",
    minWidth: 200,
    transition: "all 0.15s",
    fontFamily: "inherit",
  },
  searchPlaceholder: {
    fontSize: "13px",
    color: "var(--color-text-muted)",
    flex: 1,
    textAlign: "left",
  },
  kbdBadge: {
    fontSize: "11px",
    fontWeight: 600,
    color: "var(--color-text-muted)",
    padding: "2px 7px",
    borderRadius: "var(--radius-xs)",
    background: "var(--color-surface-default)",
    border: "1px solid var(--color-border-strong)",
    fontFamily: "monospace",
    letterSpacing: "0.2px",
    flexShrink: 0,
  },
  listPropertyBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "9px 18px",
    borderRadius: "var(--radius-pill)",
    background: "var(--color-brand-primary)",
    color: "var(--color-text-inverse)",
    fontSize: "13px",
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
    whiteSpace: "nowrap",
    letterSpacing: "0.1px",
    boxShadow: "var(--shadow-sm)",
    textDecoration: "none",
  },
  avatarBtn: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: "var(--color-bg-subtle)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid var(--color-border-default)",
    cursor: "pointer",
    transition: "border-color 0.15s, box-shadow 0.15s, background 0.15s",
    flexShrink: 0,
    textDecoration: "none",
  },
};
