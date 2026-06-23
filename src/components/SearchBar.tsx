interface SearchBarProps {
  variant?: "hero" | "inline";
}

export default function SearchBar({ variant = "inline" }: SearchBarProps) {
  const isHero = variant === "hero";

  if (isHero) {
    return (
      <div style={styles.heroWrap}>
        <div style={styles.heroCard}>
          <div style={styles.heroInputWrap}>
            <svg style={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              className="search-input"
              type="text"
              placeholder="Search by location, address, or landmark..."
              style={styles.heroInput}
            />
          </div>
          <div style={styles.heroDivider} />
          <div style={styles.heroSelects}>
            <select className="search-select" style={styles.heroSelect} defaultValue="">
              <option value="" disabled>Budget</option>
              <option>Under N500K/year</option>
              <option>N500K–N1M/year</option>
              <option>N1M–N3M/year</option>
              <option>N3M–N5M/year</option>
              <option>N5M+/year</option>
            </select>
            <div style={styles.selectDivider} />
            <select className="search-select" style={styles.heroSelect} defaultValue="">
              <option value="" disabled>Beds</option>
              <option>Studio</option>
              <option>1 Bed</option>
              <option>2 Beds</option>
              <option>3 Beds</option>
              <option>4+ Beds</option>
            </select>
          </div>
          <button className="btn-primary" style={styles.heroBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.inlineWrap}>
      <div style={styles.inlineInputWrap}>
        <svg style={styles.searchIconSm} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          className="search-input"
          type="text"
          placeholder="Search by location, address, or landmark..."
          style={styles.inlineInput}
        />
      </div>
      <div style={styles.inlineSelects}>
        <select className="search-select" style={styles.inlineSelect} defaultValue="">
          <option value="" disabled>Budget</option>
          <option>Under N500K/year</option>
          <option>N500K–N1M/year</option>
          <option>N1M–N3M/year</option>
          <option>N3M–N5M/year</option>
          <option>N5M+/year</option>
        </select>
        <select className="search-select" style={styles.inlineSelect} defaultValue="">
          <option value="" disabled>Beds</option>
          <option>Studio</option>
          <option>1 Bed</option>
          <option>2 Beds</option>
          <option>3 Beds</option>
          <option>4+ Beds</option>
        </select>
      </div>
      <button className="btn-primary" style={styles.inlineBtn}>
        Search
      </button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  // Hero variant
  heroWrap: {
    width: "100%",
    maxWidth: 720,
    margin: "0 auto",
  },
  heroCard: {
    display: "flex",
    alignItems: "center",
    background: "var(--color-surface-default)",
    borderRadius: "var(--radius-xl)",
    boxShadow: "var(--shadow-lg)",
    overflow: "hidden",
    padding: "6px",
    gap: "0px",
  },
  heroInputWrap: {
    position: "relative",
    flex: 1,
    minWidth: 0,
  },
  searchIcon: {
    position: "absolute",
    left: 16,
    top: "50%",
    transform: "translateY(-50%)",
    color: "var(--color-text-muted)",
  },
  heroInput: {
    width: "100%",
    padding: "16px 16px 16px 48px",
    border: "none",
    fontSize: 16,
    lineHeight: "24px",
    color: "var(--color-text-primary)",
    background: "transparent",
    outline: "none",
    borderRadius: "var(--radius-lg)",
  },
  heroDivider: {
    width: 1,
    height: 32,
    background: "var(--color-border-default)",
    flexShrink: 0,
  },
  heroSelects: {
    display: "flex",
    alignItems: "center",
  },
  selectDivider: {
    width: 1,
    height: 24,
    background: "var(--color-border-default)",
  },
  heroSelect: {
    padding: "16px 14px",
    border: "none",
    fontSize: 14,
    fontWeight: 500,
    color: "var(--color-text-primary)",
    background: "transparent",
    cursor: "pointer",
    outline: "none",
    minWidth: 110,
    appearance: "auto",
  },
  heroBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "14px 28px",
    borderRadius: "var(--radius-lg)",
    background: "var(--color-brand-primary)",
    color: "var(--color-text-inverse)",
    fontSize: 15,
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },

  // Inline variant
  inlineWrap: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-2)",
    width: "100%",
  },
  inlineInputWrap: {
    position: "relative",
    flex: 1,
    minWidth: 0,
  },
  searchIconSm: {
    position: "absolute",
    left: 14,
    top: "50%",
    transform: "translateY(-50%)",
    color: "var(--color-text-muted)",
  },
  inlineInput: {
    width: "100%",
    padding: "11px 14px 11px 42px",
    borderRadius: "var(--radius-sm)",
    border: "1px solid var(--color-border-default)",
    fontSize: 14,
    lineHeight: "22px",
    color: "var(--color-text-primary)",
    background: "var(--color-surface-default)",
    outline: "none",
  },
  inlineSelects: {
    display: "flex",
    gap: "var(--space-2)",
  },
  inlineSelect: {
    padding: "11px 14px",
    borderRadius: "var(--radius-sm)",
    border: "1px solid var(--color-border-default)",
    fontSize: 14,
    fontWeight: 500,
    color: "var(--color-text-primary)",
    background: "var(--color-surface-default)",
    cursor: "pointer",
    outline: "none",
    minWidth: 120,
  },
  inlineBtn: {
    padding: "11px 24px",
    borderRadius: "var(--radius-sm)",
    background: "var(--color-brand-primary)",
    color: "var(--color-text-inverse)",
    fontSize: 14,
    fontWeight: 600,
    whiteSpace: "nowrap",
    border: "none",
    cursor: "pointer",
  },
};
