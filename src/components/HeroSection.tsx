"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const floatingCards = [
  {
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&q=80",
    title: "Serenity Villa",
    price: "$440K",
    badge: "Featured",
    top: "12%",
    right: "2%",
    animDelay: "0s",
  },
  {
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&q=80",
    title: "Autumn Retreat",
    price: "$360K",
    badge: "New",
    top: "55%",
    right: "1%",
    animDelay: "1.2s",
  },
];

const stats = [
  { value: "10,356", label: "Properties" },
  { value: "2,841", label: "Verified landlords" },
  { value: "98%", label: "Trust score" },
  { value: "15K+", label: "Happy renters" },
];

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/search");
  };

  return (
    <section style={styles.hero} className="hero-gradient">
      {/* Dot grid pattern */}
      <div style={styles.pattern} className="hero-pattern" />

      {/* Radial glow blobs */}
      <div style={styles.blobLeft} />
      <div style={styles.blobRight} />

      <div style={styles.heroInner}>
        {/* Left: copy + search */}
        <div style={styles.leftCol}>
          {/* Eyebrow badge */}
          <div className="animate-fade-in-up stagger-1" style={styles.eyebrowBadge}>
            <span style={styles.eyebrowDot} />
            <span style={styles.eyebrowText}>Nigeria&apos;s #1 Verified Rental Marketplace</span>
          </div>

          {/* Headline */}
          <h1 style={styles.headline} className="animate-fade-in-up stagger-2">
            Find your perfect{" "}
            <span className="hero-shimmer-text">home</span>
            <br />
            without the{" "}
            <span style={styles.headlineAccent}>stress.</span>
          </h1>

          {/* Subheadline */}
          <p style={styles.subheadline} className="animate-fade-in-up stagger-3">
            Browse thousands of verified rental properties. Direct contact with
            landlords — no agents, no hidden fees, no surprises.
          </p>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            style={styles.searchCard}
            className="animate-fade-in-up stagger-4"
          >
            <div style={styles.searchInputWrap}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="2"
                style={styles.searchIcon}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search by location, address, or landmark..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={styles.searchInput}
                className="hero-search-input"
              />
            </div>

            <div style={styles.searchDivider} />

            <select style={styles.searchSelect} defaultValue="">
              <option value="" disabled>
                Budget
              </option>
              <option>Under ₦500K/yr</option>
              <option>₦500K–₦1M/yr</option>
              <option>₦1M–₦3M/yr</option>
              <option>₦3M–₦5M/yr</option>
              <option>₦5M+/yr</option>
            </select>

            <div style={styles.searchDivider} />

            <select style={styles.searchSelect} defaultValue="">
              <option value="" disabled>
                Beds
              </option>
              <option>Studio</option>
              <option>1 Bed</option>
              <option>2 Beds</option>
              <option>3 Beds</option>
              <option>4+ Beds</option>
            </select>

            <button type="submit" style={styles.searchBtn} className="btn-secondary">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              Search
            </button>
          </form>

          {/* Popular searches */}
          <div style={styles.popularRow} className="animate-fade-in-up stagger-5">
            <span style={styles.popularLabel}>Popular:</span>
            {["Lekki", "Victoria Island", "Ikeja", "Abuja"].map((loc) => (
              <button
                key={loc}
                onClick={() => router.push("/search")}
                style={styles.popularChip}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        {/* Right: floating property cards */}
        <div style={styles.rightCol} className="animate-fade-in-up stagger-3">
          {/* Big featured image */}
          <div style={styles.heroImageWrap} className="animate-float-slow">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=520&q=80"
              alt="Featured property"
              style={styles.heroImage}
            />
            <div style={styles.heroImageOverlay} />
            {/* Price badge on the big image */}
            <div style={styles.bigImageBadge} className="glass-card">
              <p style={styles.bigImagePrice}>₦5.2M<span style={styles.bigImagePriceYear}>/yr</span></p>
              <p style={styles.bigImageTitle}>Urban Oasis House</p>
              <div style={styles.bigImageLocation}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Victoria Island, Lagos</span>
              </div>
            </div>
          </div>

          {/* Small floating cards */}
          {floatingCards.map((card) => (
            <div
              key={card.title}
              style={{
                ...styles.floatingCard,
                top: card.top,
                right: card.right,
                animationDelay: card.animDelay,
              }}
              className="glass-card-light animate-float"
            >
              <img
                src={card.image}
                alt={card.title}
                style={styles.floatingCardImg}
              />
              <div style={styles.floatingCardBody}>
                <p style={styles.floatingCardTitle}>{card.title}</p>
                <p style={styles.floatingCardPrice}>{card.price}<span style={styles.floatingCardYear}>/yr</span></p>
                <span style={styles.floatingCardBadge}>{card.badge}</span>
              </div>
            </div>
          ))}

          {/* Verified count badge */}
          <div style={styles.verifiedBadgeFloat} className="glass-card animate-bounce-in">
            <div style={styles.verifiedBadgeIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--teal-300)" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </div>
            <div>
              <p style={styles.verifiedBadgeNumber}>2,841</p>
              <p style={styles.verifiedBadgeLabel}>Verified Landlords</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={styles.statsBar} className="animate-fade-in stagger-6">
        <div style={styles.statsBarInner}>
          {stats.map((s, i) => (
            <div key={s.label} style={styles.statItem}>
              <p style={{ ...styles.statValue, animationDelay: `${i * 0.1}s` }} className="animate-count-up">
                {s.value}
              </p>
              <p style={styles.statLabel}>{s.label}</p>
              {i < stats.length - 1 && <div style={styles.statDivider} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  hero: {
    position: "relative",
    overflow: "hidden",
    paddingTop: "var(--space-20)",
    paddingBottom: 0,
  },
  pattern: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
    pointerEvents: "none",
  },
  blobLeft: {
    position: "absolute",
    width: 480,
    height: 480,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(31,161,150,0.18) 0%, transparent 70%)",
    left: "-80px",
    bottom: "60px",
    zIndex: 0,
    pointerEvents: "none",
  },
  blobRight: {
    position: "absolute",
    width: 400,
    height: 400,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(44,126,204,0.22) 0%, transparent 70%)",
    right: "80px",
    top: "-40px",
    zIndex: 0,
    pointerEvents: "none",
  },
  heroInner: {
    position: "relative",
    zIndex: 1,
    maxWidth: "var(--content-max-width)",
    margin: "0 auto",
    padding: "0 var(--space-6) var(--space-20)",
    display: "flex",
    alignItems: "center",
    gap: "var(--space-16)",
  },
  leftCol: {
    flex: "1 1 0%",
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-6)",
    paddingBottom: "var(--space-8)",
  },
  rightCol: {
    flexShrink: 0,
    width: 420,
    position: "relative",
    height: 520,
  },
  eyebrowBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    borderRadius: "var(--radius-pill)",
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(255,255,255,0.18)",
    width: "fit-content",
    backdropFilter: "blur(8px)",
  },
  eyebrowDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "var(--teal-400)",
    boxShadow: "0 0 8px var(--teal-400)",
    animation: "pulse 2s infinite",
    display: "inline-block",
  },
  eyebrowText: {
    fontSize: 13,
    fontWeight: 600,
    color: "rgba(255,255,255,0.90)",
    letterSpacing: "0.2px",
  },
  headline: {
    fontSize: "clamp(40px, 5vw, 62px)",
    fontWeight: 900,
    lineHeight: 1.08,
    color: "rgba(255,255,255,0.97)",
    letterSpacing: "-1.5px",
    margin: 0,
  },
  headlineAccent: {
    color: "var(--teal-300)",
    fontStyle: "italic",
  },
  subheadline: {
    fontSize: 17,
    lineHeight: 1.65,
    color: "rgba(255,255,255,0.68)",
    maxWidth: 500,
    margin: 0,
  },
  searchCard: {
    display: "flex",
    alignItems: "center",
    background: "rgba(255,255,255,0.10)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: "var(--radius-xl)",
    padding: "6px",
    gap: 0,
    boxShadow: "0 8px 32px rgba(0,0,0,0.28)",
    maxWidth: 600,
  },
  searchInputWrap: {
    position: "relative",
    flex: 1,
    minWidth: 0,
  },
  searchIcon: {
    position: "absolute",
    left: 14,
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
  },
  searchInput: {
    width: "100%",
    padding: "14px 14px 14px 46px",
    border: "none",
    background: "transparent",
    color: "rgba(255,255,255,0.95)",
    fontSize: 14,
    outline: "none",
    fontFamily: "inherit",
  },
  searchDivider: {
    width: 1,
    height: 28,
    background: "rgba(255,255,255,0.18)",
    flexShrink: 0,
  },
  searchSelect: {
    padding: "14px 12px",
    border: "none",
    background: "transparent",
    color: "rgba(255,255,255,0.80)",
    fontSize: 13,
    fontWeight: 500,
    outline: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    minWidth: 100,
  },
  searchBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 24px",
    borderRadius: "var(--radius-lg)",
    background: "var(--color-brand-secondary)",
    color: "var(--color-text-inverse)",
    fontSize: 14,
    fontWeight: 700,
    border: "none",
    cursor: "pointer",
    whiteSpace: "nowrap",
    flexShrink: 0,
    letterSpacing: "0.1px",
  },
  popularRow: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-2)",
    flexWrap: "wrap",
  },
  popularLabel: {
    fontSize: 13,
    color: "rgba(255,255,255,0.55)",
    fontWeight: 500,
    marginRight: 2,
  },
  popularChip: {
    padding: "5px 14px",
    borderRadius: "var(--radius-pill)",
    border: "1px solid rgba(255,255,255,0.22)",
    background: "rgba(255,255,255,0.08)",
    color: "rgba(255,255,255,0.80)",
    fontSize: 12,
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.15s",
    backdropFilter: "blur(6px)",
  },
  heroImageWrap: {
    position: "absolute",
    inset: 0,
    borderRadius: "var(--radius-2xl)",
    overflow: "hidden",
    boxShadow: "0 32px 64px rgba(0,0,0,0.50)",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  heroImageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "55%",
    background:
      "linear-gradient(to top, rgba(8,23,46,0.85) 0%, transparent 100%)",
    pointerEvents: "none",
  },
  bigImageBadge: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    padding: "14px 18px",
    borderRadius: "var(--radius-lg)",
  },
  bigImagePrice: {
    fontSize: 22,
    fontWeight: 800,
    color: "white",
    letterSpacing: "-0.4px",
    marginBottom: 2,
  },
  bigImagePriceYear: {
    fontSize: 14,
    fontWeight: 400,
    opacity: 0.75,
  },
  bigImageTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: "rgba(255,255,255,0.90)",
    marginBottom: 4,
  },
  bigImageLocation: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: 12,
    color: "rgba(255,255,255,0.65)",
  },
  floatingCard: {
    position: "absolute",
    borderRadius: "var(--radius-xl)",
    padding: "10px",
    boxShadow: "0 16px 40px rgba(0,0,0,0.30)",
    display: "flex",
    gap: "var(--space-3)",
    alignItems: "center",
    width: 200,
    zIndex: 2,
  },
  floatingCardImg: {
    width: 52,
    height: 52,
    borderRadius: "var(--radius-md)",
    objectFit: "cover",
    flexShrink: 0,
  },
  floatingCardBody: {
    flex: 1,
    minWidth: 0,
  },
  floatingCardTitle: {
    fontSize: 12,
    fontWeight: 600,
    color: "var(--color-text-primary)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  floatingCardPrice: {
    fontSize: 14,
    fontWeight: 800,
    color: "var(--color-brand-primary)",
    letterSpacing: "-0.3px",
  },
  floatingCardYear: {
    fontSize: 10,
    fontWeight: 400,
    color: "var(--color-text-muted)",
  },
  floatingCardBadge: {
    display: "inline-block",
    padding: "2px 8px",
    borderRadius: "var(--radius-pill)",
    background: "var(--teal-100)",
    color: "var(--teal-800)",
    fontSize: 10,
    fontWeight: 700,
    marginTop: 3,
  },
  verifiedBadgeFloat: {
    position: "absolute",
    bottom: "8%",
    left: "-12%",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 16px",
    borderRadius: "var(--radius-xl)",
    boxShadow: "0 12px 32px rgba(0,0,0,0.28)",
    zIndex: 2,
    animationDelay: "0.6s",
  },
  verifiedBadgeIcon: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "rgba(31,161,150,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  verifiedBadgeNumber: {
    fontSize: 18,
    fontWeight: 800,
    color: "rgba(255,255,255,0.97)",
    lineHeight: 1.1,
    letterSpacing: "-0.3px",
  },
  verifiedBadgeLabel: {
    fontSize: 11,
    color: "rgba(255,255,255,0.60)",
    marginTop: 1,
  },
  statsBar: {
    position: "relative",
    zIndex: 1,
    borderTop: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(12px)",
  },
  statsBarInner: {
    maxWidth: "var(--content-max-width)",
    margin: "0 auto",
    padding: "var(--space-5) var(--space-6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 0,
  },
  statItem: {
    position: "relative",
    flex: 1,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  statValue: {
    fontSize: 26,
    fontWeight: 800,
    color: "rgba(255,255,255,0.97)",
    letterSpacing: "-0.5px",
    lineHeight: 1,
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.55)",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.8px",
  },
  statDivider: {
    position: "absolute",
    right: 0,
    top: "50%",
    transform: "translateY(-50%)",
    width: 1,
    height: 36,
    background: "rgba(255,255,255,0.12)",
  },
};
