"use client";

import { useState, useRef } from "react";

const suggestions = [
  "3-bedroom near a school in Lekki",
  "Serviced apartment in Victoria Island under ₦3M",
  "Self-contain with parking in Yaba",
  "4-bedroom duplex in Magodo with generator",
];

export default function AISearch() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responded, setResponded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResponded(true);
    }, 1800);
  };

  const handleSuggestion = (s: string) => {
    setQuery(s);
    inputRef.current?.focus();
  };

  return (
    <section style={styles.section}>
      <div style={styles.inner}>
        {/* Section label */}
        <div style={styles.labelRow} className="animate-fade-in-up stagger-1">
          <div style={styles.aiIconWrap}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-secondary)" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <p style={styles.labelTitle}>AI-Powered Search</p>
            <p style={styles.labelSub}>Describe your ideal home in plain language</p>
          </div>
        </div>

        {/* Search card */}
        <form
          onSubmit={handleSubmit}
          style={{
            ...styles.card,
            borderColor: focused ? "var(--color-border-focus)" : "var(--color-border-default)",
            boxShadow: focused
              ? "0 0 0 3px var(--color-focus-ring), var(--shadow-lg)"
              : "var(--shadow-md)",
          }}
          className="animate-fade-in-up stagger-2"
        >
          <div style={styles.inputRow}>
            {/* Animated AI icon */}
            <div style={styles.aiInputIcon} className={loading ? "animate-pulse" : ""}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-secondary)" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>

            <input
              ref={inputRef}
              type="text"
              placeholder="e.g. Give me a 3-bedroom near a school in Lekki..."
              value={query}
              onChange={(e) => { setQuery(e.target.value); setResponded(false); }}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              style={styles.input}
            />

            {query && (
              <button
                type="button"
                onClick={() => { setQuery(""); setResponded(false); }}
                style={styles.clearBtn}
                aria-label="Clear"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>

          <div style={styles.cardDivider} />

          <button
            type="submit"
            style={{
              ...styles.aiBtn,
              opacity: loading ? 0.8 : 1,
              background: responded
                ? "var(--teal-700)"
                : "var(--color-brand-secondary)",
            }}
            disabled={loading}
            className="btn-secondary"
          >
            {loading ? (
              <>
                <span style={styles.loadingDots}>
                  <span style={{ ...styles.dot, animationDelay: "0s" }} />
                  <span style={{ ...styles.dot, animationDelay: "0.2s" }} />
                  <span style={{ ...styles.dot, animationDelay: "0.4s" }} />
                </span>
                Searching...
              </>
            ) : responded ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Showing results
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
                Search with AI
              </>
            )}
          </button>
        </form>

        {/* Quick suggestions */}
        <div style={styles.suggestionsRow} className="animate-fade-in-up stagger-3">
          <span style={styles.suggestLabel}>Try:</span>
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => handleSuggestion(s)}
              style={styles.suggestionChip}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    padding: "var(--space-16) var(--space-6) var(--space-20)",
    background:
      "linear-gradient(135deg, var(--blue-050) 0%, var(--teal-050) 100%)",
    borderTop: "1px solid var(--color-border-default)",
  },
  inner: {
    maxWidth: 740,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "var(--space-6)",
  },
  labelRow: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-4)",
    textAlign: "left",
  },
  aiIconWrap: {
    width: 52,
    height: 52,
    borderRadius: "var(--radius-lg)",
    background: "var(--teal-050)",
    border: "1.5px solid var(--teal-200)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxShadow: "var(--shadow-sm)",
  },
  labelTitle: {
    fontSize: 20,
    fontWeight: 800,
    color: "var(--color-text-primary)",
    letterSpacing: "-0.3px",
    margin: 0,
  },
  labelSub: {
    fontSize: 14,
    color: "var(--color-text-muted)",
    marginTop: 2,
    margin: 0,
  },
  card: {
    display: "flex",
    alignItems: "center",
    gap: 0,
    padding: "6px",
    borderRadius: "var(--radius-xl)",
    background: "var(--color-surface-default)",
    border: "2px solid",
    boxShadow: "var(--shadow-md)",
    width: "100%",
    transition: "border-color 0.15s, box-shadow 0.25s",
  },
  inputRow: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-3)",
    flex: 1,
    padding: "0 var(--space-4)",
    minWidth: 0,
  },
  aiInputIcon: {
    flexShrink: 0,
  },
  input: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: 15,
    color: "var(--color-text-primary)",
    background: "transparent",
    fontFamily: "inherit",
    padding: "12px 0",
    minWidth: 0,
  },
  clearBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 22,
    height: 22,
    borderRadius: "50%",
    background: "var(--color-border-default)",
    border: "none",
    cursor: "pointer",
    color: "var(--color-text-muted)",
    flexShrink: 0,
    padding: 0,
  },
  cardDivider: {
    width: 1,
    height: 32,
    background: "var(--color-border-default)",
    flexShrink: 0,
  },
  aiBtn: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-2)",
    padding: "14px 24px",
    borderRadius: "var(--radius-lg)",
    color: "white",
    fontSize: 14,
    fontWeight: 700,
    border: "none",
    cursor: "pointer",
    whiteSpace: "nowrap",
    flexShrink: 0,
    transition: "all 0.2s",
    letterSpacing: "0.1px",
  },
  loadingDots: {
    display: "inline-flex",
    alignItems: "center",
    gap: 3,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.8)",
    display: "inline-block",
    animation: "dotBlink 1.2s infinite",
  },
  suggestionsRow: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-2)",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  suggestLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: "var(--color-text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
  },
  suggestionChip: {
    padding: "6px 14px",
    borderRadius: "var(--radius-pill)",
    border: "1.5px solid var(--color-border-default)",
    background: "var(--color-surface-default)",
    color: "var(--color-text-secondary)",
    fontSize: 12,
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.15s",
    fontFamily: "inherit",
  },
};
