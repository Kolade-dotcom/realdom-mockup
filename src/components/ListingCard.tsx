"use client";

import Link from "next/link";
import { useState } from "react";

interface ListingCardProps {
  id: string;
  image: string;
  title: string;
  location: string;
  beds: number;
  baths: number;
  area: string;
  annualPrice: string;
  verified: boolean;
  tag?: string;
}

const tagConfig: Record<
  string,
  { bg: string; color: string; dot?: string }
> = {
  Featured: {
    bg: "var(--color-brand-primary)",
    color: "white",
  },
  Premium: {
    bg: "linear-gradient(135deg, var(--blue-800), var(--teal-700))",
    color: "white",
  },
  New: {
    bg: "var(--teal-600)",
    color: "white",
    dot: "var(--teal-200)",
  },
  Reduced: {
    bg: "var(--success-600)",
    color: "white",
    dot: "#86efac",
  },
};

export default function ListingCard({
  id,
  image,
  title,
  location,
  beds,
  baths,
  area,
  annualPrice,
  verified,
  tag,
}: ListingCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [heartAnim, setHeartAnim] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved((v) => !v);
    setHeartAnim(true);
    setTimeout(() => setHeartAnim(false), 500);
  };

  const tc = tag ? tagConfig[tag] : null;

  return (
    <Link
      href={`/listings/${id}`}
      className="listing-card gradient-border"
      style={styles.card}
    >
      {/* Image */}
      <div style={styles.imageWrap}>
        <div
          className="card-image"
          style={{
            ...styles.image,
            backgroundImage: `url(${image})`,
          }}
        />

        {/* Gradient overlay (visible on hover) */}
        <div className="card-overlay" style={styles.imgGradient} />

        {/* Price badge */}
        <div style={styles.priceBadge}>
          <span style={styles.priceText}>{annualPrice}</span>
          <span style={styles.priceYear}>/yr</span>
        </div>

        {/* Save / heart button */}
        <button
          className={`save-btn${isSaved ? " saved" : ""}${heartAnim ? " save-btn-heart-beat" : ""}`}
          style={{
            ...styles.heartBtn,
            background: isSaved
              ? "#EF4444"
              : "rgba(255,255,255,0.92)",
            color: isSaved ? "white" : "#EF4444",
          }}
          onClick={handleSave}
          aria-label={isSaved ? "Unsave listing" : "Save listing"}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={isSaved ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>

        {/* Tag */}
        {tag && tc && (
          <span
            style={{
              ...styles.tag,
              background: tc.bg,
              color: tc.color,
            }}
          >
            {tc.dot && (
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: tc.dot,
                  display: "inline-block",
                  marginRight: 5,
                  verticalAlign: "middle",
                }}
              />
            )}
            {tag}
          </span>
        )}

        {/* Verified badge */}
        {verified && (
          <div style={styles.verifiedDot} title="Verified property">
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        )}
      </div>

      {/* Body */}
      <div style={styles.body}>
        <h3 style={styles.title}>{title}</h3>

        <div style={styles.locationRow}>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-text-muted)"
            strokeWidth="2"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span style={styles.location}>{location}</span>
        </div>

        {/* Divider */}
        <div style={styles.divider} />

        <div style={styles.specsRow}>
          <SpecPill icon="bed" value={`${beds} Beds`} />
          <SpecPill icon="bath" value={`${baths} Baths`} />
          <SpecPill icon="area" value={area} />
        </div>

        {/* View details hint */}
        <div style={styles.viewHint}>
          <span style={styles.viewHintText}>View details</span>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-brand-primary)"
            strokeWidth="2.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

function SpecPill({ icon, value }: { icon: string; value: string }) {
  const paths: Record<string, React.ReactNode> = {
    bed: (
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-brand-secondary)"
        strokeWidth="1.8"
      >
        <path d="M3 7v11a2 2 0 002 2h14a2 2 0 002-2V7" />
        <path d="M21 10H3" />
        <rect x="6" y="4" width="4" height="6" rx="1" />
      </svg>
    ),
    bath: (
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-brand-secondary)"
        strokeWidth="1.8"
      >
        <path d="M4 12h16a1 1 0 011 1v3a4 4 0 01-4 4H7a4 4 0 01-4-4v-3a1 1 0 011-1z" />
        <path d="M6 12V5a2 2 0 012-2h3v2.25A1.75 1.75 0 0012.75 7h1.5A1.75 1.75 0 0016 5.25V3h0a2 2 0 012 2v7" />
      </svg>
    ),
    area: (
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-brand-secondary)"
        strokeWidth="1.8"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 3v18" />
      </svg>
    ),
  };

  return (
    <div style={specStyles.pill}>
      {paths[icon]}
      <span>{value}</span>
    </div>
  );
}

const specStyles: Record<string, React.CSSProperties> = {
  pill: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: "4px 10px",
    borderRadius: "var(--radius-pill)",
    background: "var(--color-bg-subtle)",
    fontSize: 12,
    fontWeight: 500,
    color: "var(--color-text-secondary)",
  },
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "var(--radius-xl)",
    background: "var(--color-surface-default)",
    border: "1px solid var(--color-border-default)",
    overflow: "hidden",
    cursor: "pointer",
    boxShadow: "var(--shadow-sm)",
    textDecoration: "none",
    color: "inherit",
  },
  imageWrap: {
    position: "relative",
    aspectRatio: "16/11",
    overflow: "hidden",
    background: "var(--color-bg-subtle)",
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  imgGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    background:
      "linear-gradient(to top, rgba(8,23,46,0.55) 0%, transparent 100%)",
    pointerEvents: "none",
  },
  priceBadge: {
    position: "absolute",
    bottom: 12,
    left: 12,
    padding: "6px 14px",
    borderRadius: "var(--radius-pill)",
    background: "var(--color-brand-secondary)",
    boxShadow: "0 4px 12px rgba(22,135,126,0.45)",
    display: "flex",
    alignItems: "baseline",
    gap: 2,
  },
  priceText: {
    fontSize: 14,
    fontWeight: 800,
    color: "white",
    letterSpacing: "-0.2px",
  },
  priceYear: {
    fontSize: 11,
    fontWeight: 400,
    color: "rgba(255,255,255,0.75)",
  },
  heartBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 34,
    height: 34,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    boxShadow: "var(--shadow-md)",
    zIndex: 2,
  },
  tag: {
    position: "absolute",
    top: 12,
    left: 12,
    padding: "4px 10px",
    borderRadius: "var(--radius-pill)",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    boxShadow: "var(--shadow-sm)",
  },
  verifiedDot: {
    position: "absolute",
    bottom: 12,
    right: 12,
    width: 22,
    height: 22,
    borderRadius: "50%",
    background: "var(--teal-600)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 8px rgba(22,135,126,0.5)",
    border: "2px solid rgba(255,255,255,0.8)",
  },
  body: {
    padding: "var(--space-4) var(--space-4) var(--space-4)",
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-2)",
  },
  title: {
    fontSize: 14,
    fontWeight: 700,
    lineHeight: "20px",
    color: "var(--color-text-primary)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    letterSpacing: "-0.2px",
  },
  locationRow: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  location: {
    fontSize: 12,
    color: "var(--color-text-muted)",
    lineHeight: "18px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  divider: {
    height: 1,
    background: "var(--color-border-default)",
    margin: "var(--space-1) 0",
  },
  specsRow: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-2)",
    flexWrap: "wrap",
  },
  viewHint: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "4px",
    marginTop: "var(--space-1)",
  },
  viewHintText: {
    fontSize: 11,
    fontWeight: 600,
    color: "var(--color-brand-primary)",
    letterSpacing: "0.2px",
  },
};
