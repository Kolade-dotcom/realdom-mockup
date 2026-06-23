"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

const allListings = [
  { id: "1", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=200&q=70", title: "Modern 3-Bedroom Apartment", location: "Ikeja, Lagos", price: "₦2.4M", type: "Apartments" },
  { id: "2", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&q=70", title: "Cozy 2-Bedroom Duplex", location: "Lekki Phase 1, Lagos", price: "₦1.8M", type: "Duplexes" },
  { id: "3", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&q=70", title: "Luxury 4-Bedroom Villa", location: "Victoria Island, Lagos", price: "₦5.2M", type: "Villas" },
  { id: "4", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&q=70", title: "Studio Apartment", location: "Yaba, Lagos", price: "₦720K", type: "Studios" },
  { id: "5", image: "https://images.unsplash.com/photo-1600566753086-00f18f6c4f5a?w=200&q=70", title: "Spacious 3-Bedroom Terrace", location: "Surulere, Lagos", price: "₦1.5M", type: "Houses" },
  { id: "6", image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=200&q=70", title: "5-Bedroom Executive Home", location: "Magodo, Lagos", price: "₦6.8M", type: "Houses" },
  { id: "7", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=200&q=70", title: "2-Bedroom Flat", location: "GRA, Port Harcourt", price: "₦1.2M", type: "Apartments" },
  { id: "8", image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=200&q=70", title: "3-Bedroom Bungalow", location: "Asokoro, Abuja", price: "₦3.1M", type: "Houses" },
];

const recentSearches = [
  "3 bedroom in Lekki",
  "Affordable studio Yaba",
  "Villa Victoria Island",
  "Duplex with parking Ikeja",
];

const categories = ["All", "Apartments", "Duplexes", "Houses", "Villas", "Studios"];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isClosing, setIsClosing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setQuery("");
      setActiveCategory("All");
      onClose();
    }, 250);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, handleClose]);

  const filtered = allListings.filter((l) => {
    const matchesCat = activeCategory === "All" || l.type === activeCategory;
    const matchesQuery =
      !query ||
      l.title.toLowerCase().includes(query.toLowerCase()) ||
      l.location.toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesQuery;
  });

  if (!isOpen && !isClosing) return null;

  return (
    <div
      className={`search-modal-backdrop ${isClosing ? "animate-fade-in" : "animate-backdrop-in"}`}
      style={{ opacity: isClosing ? 0 : undefined, transition: isClosing ? "opacity 0.25s" : undefined }}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search properties"
    >
      <div
        className={isClosing ? "animate-modal-close" : "animate-modal-open"}
        style={panelStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div style={s.searchRow}>
          <div style={s.searchInputWrap}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2" style={{ flexShrink: 0 }}>
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search properties, locations, landmarks..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={s.searchInput}
              autoComplete="off"
            />
            {query && (
              <button style={s.clearBtn} onClick={() => setQuery("")} aria-label="Clear">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
          <button style={s.escBtn} onClick={handleClose} aria-label="Close modal">
            <span style={s.escKey}>ESC</span>
          </button>
        </div>

        {/* Category chips */}
        <div style={s.chipsRow}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                ...s.chip,
                background: activeCategory === cat ? "var(--neutral-950)" : "var(--color-bg-subtle)",
                color: activeCategory === cat ? "white" : "var(--color-text-secondary)",
                borderColor: activeCategory === cat ? "var(--neutral-950)" : "var(--color-border-default)",
                fontWeight: activeCategory === cat ? 700 : 500,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div style={s.divider} />

        {/* Scrollable results */}
        <div style={s.resultsWrap}>
          {query || activeCategory !== "All" ? (
            <>
              <div style={s.resultsMeta}>
                <span style={s.resultsCount}>
                  <strong style={{ color: "var(--color-text-primary)" }}>{filtered.length}</strong> properties found
                </span>
              </div>
              {filtered.length === 0 ? (
                <div style={s.emptyState}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-border-strong)" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                  </svg>
                  <p style={s.emptyText}>No properties match your search</p>
                  <p style={s.emptySubtext}>Try adjusting your filters or search term</p>
                </div>
              ) : (
                <div style={s.resultsList}>
                  {filtered.map((l, i) => (
                    <button
                      key={l.id}
                      style={s.resultItem}
                      className={`animate-fade-in-up stagger-${Math.min(i + 1, 9)}`}
                      onClick={() => { router.push(`/listings/${l.id}`); handleClose(); }}
                    >
                      <div style={s.resultImg} aria-hidden>
                        <img src={l.image} alt={l.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div style={s.resultBody}>
                        <p style={s.resultTitle}>{l.title}</p>
                        <div style={s.resultMeta}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                          </svg>
                          <span style={s.resultLocation}>{l.location}</span>
                          <span style={s.resultTypePill}>{l.type}</span>
                        </div>
                      </div>
                      <div style={s.resultPrice}>{l.price}<span style={s.priceYear}>/yr</span></div>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2" style={{ flexShrink: 0 }}>
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <p style={s.sectionLabel}>Recent searches</p>
              <div style={s.recentList}>
                {recentSearches.map((r, i) => (
                  <button
                    key={r}
                    style={s.recentItem}
                    className={`animate-fade-in-up stagger-${i + 1}`}
                    onClick={() => setQuery(r)}
                  >
                    <div style={s.recentIcon}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2">
                        <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" />
                      </svg>
                    </div>
                    <span style={s.recentText}>{r}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2" style={{ marginLeft: "auto", opacity: 0.5 }}>
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer hint */}
        <div style={s.modalFooter}>
          <span style={s.footerHint}>
            <span style={s.kbdKey}>↑</span><span style={s.kbdKey}>↓</span> Navigate
          </span>
          <span style={s.footerHint}>
            <span style={s.kbdKey}>↵</span> Select
          </span>
          <span style={s.footerHint}>
            <span style={s.kbdKey}>ESC</span> Close
          </span>
        </div>
      </div>
    </div>
  );
}

const panelStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 680,
  background: "var(--color-surface-default)",
  borderRadius: "var(--radius-2xl)",
  boxShadow: "var(--shadow-xl)",
  overflow: "hidden",
  border: "1px solid var(--color-border-default)",
  maxHeight: "calc(100vh - 120px)",
  display: "flex",
  flexDirection: "column",
};

const s: Record<string, React.CSSProperties> = {
  searchRow: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-3)",
    padding: "var(--space-4) var(--space-5)",
    borderBottom: "1px solid var(--color-border-default)",
  },
  searchInputWrap: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-3)",
    flex: 1,
    minWidth: 0,
  },
  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: 16,
    fontWeight: 500,
    color: "var(--color-text-primary)",
    background: "transparent",
    fontFamily: "inherit",
    minWidth: 0,
  },
  clearBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 22,
    height: 22,
    borderRadius: "50%",
    background: "var(--color-border-strong)",
    border: "none",
    cursor: "pointer",
    color: "var(--color-text-muted)",
    flexShrink: 0,
    padding: 0,
    transition: "background 0.15s",
  },
  escBtn: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: "6px 10px",
    borderRadius: "var(--radius-sm)",
    border: "1.5px solid var(--color-border-default)",
    background: "var(--color-bg-subtle)",
    cursor: "pointer",
    flexShrink: 0,
  },
  escKey: {
    fontSize: 11,
    fontWeight: 700,
    color: "var(--color-text-muted)",
    letterSpacing: "0.5px",
  },
  chipsRow: {
    display: "flex",
    gap: "var(--space-2)",
    padding: "var(--space-3) var(--space-5)",
    overflowX: "auto",
    scrollbarWidth: "none",
    flexWrap: "wrap",
  },
  chip: {
    padding: "6px 14px",
    borderRadius: "var(--radius-pill)",
    border: "1.5px solid",
    fontSize: 13,
    cursor: "pointer",
    transition: "all 0.15s",
    whiteSpace: "nowrap",
    fontFamily: "inherit",
  },
  divider: {
    height: 1,
    background: "var(--color-border-default)",
  },
  resultsWrap: {
    overflowY: "auto",
    flex: 1,
    padding: "var(--space-3) 0",
  },
  resultsMeta: {
    padding: "var(--space-2) var(--space-5)",
    marginBottom: "var(--space-1)",
  },
  resultsCount: {
    fontSize: 12,
    color: "var(--color-text-muted)",
    fontWeight: 500,
  },
  resultsList: {
    display: "flex",
    flexDirection: "column",
  },
  resultItem: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-3)",
    padding: "var(--space-3) var(--space-5)",
    width: "100%",
    textAlign: "left",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    transition: "background 0.12s",
    fontFamily: "inherit",
  },
  resultImg: {
    width: 52,
    height: 40,
    borderRadius: "var(--radius-sm)",
    overflow: "hidden",
    flexShrink: 0,
    background: "var(--color-bg-subtle)",
  },
  resultBody: {
    flex: 1,
    minWidth: 0,
  },
  resultTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: "var(--color-text-primary)",
    margin: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  resultMeta: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    marginTop: 2,
  },
  resultLocation: {
    fontSize: 12,
    color: "var(--color-text-muted)",
  },
  resultTypePill: {
    padding: "2px 8px",
    borderRadius: "var(--radius-pill)",
    background: "var(--color-bg-subtle)",
    fontSize: 11,
    fontWeight: 600,
    color: "var(--color-text-muted)",
    marginLeft: 4,
  },
  resultPrice: {
    fontSize: 14,
    fontWeight: 800,
    color: "var(--color-brand-secondary)",
    letterSpacing: "-0.2px",
    flexShrink: 0,
  },
  priceYear: {
    fontSize: 11,
    fontWeight: 400,
    color: "var(--color-text-muted)",
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "var(--space-2)",
    padding: "var(--space-12) var(--space-6)",
    textAlign: "center",
  },
  emptyText: {
    fontSize: 15,
    fontWeight: 600,
    color: "var(--color-text-primary)",
    margin: 0,
  },
  emptySubtext: {
    fontSize: 13,
    color: "var(--color-text-muted)",
    margin: 0,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "var(--color-text-muted)",
    padding: "var(--space-2) var(--space-5)",
    margin: 0,
  },
  recentList: {
    display: "flex",
    flexDirection: "column",
  },
  recentItem: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-3)",
    padding: "var(--space-3) var(--space-5)",
    width: "100%",
    textAlign: "left",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    transition: "background 0.12s",
    fontFamily: "inherit",
  },
  recentIcon: {
    width: 28,
    height: 28,
    borderRadius: "var(--radius-sm)",
    background: "var(--color-bg-subtle)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    border: "1px solid var(--color-border-default)",
  },
  recentText: {
    fontSize: 14,
    color: "var(--color-text-secondary)",
    fontWeight: 500,
  },
  modalFooter: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-5)",
    padding: "var(--space-3) var(--space-5)",
    borderTop: "1px solid var(--color-border-default)",
    background: "var(--color-bg-subtle)",
  },
  footerHint: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-1)",
    fontSize: 11,
    color: "var(--color-text-muted)",
  },
  kbdKey: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2px 5px",
    borderRadius: "3px",
    background: "var(--color-surface-default)",
    border: "1px solid var(--color-border-strong)",
    fontSize: 10,
    fontWeight: 700,
    color: "var(--color-text-secondary)",
    fontFamily: "monospace",
  },
};
