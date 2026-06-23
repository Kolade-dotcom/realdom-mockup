"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const savedProperties = [
  { id: "1", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80", title: "Modern 3-Bedroom Apartment", location: "Ikeja, Lagos", price: "₦2.4M" },
  { id: "3", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80", title: "Luxury 4-Bedroom Villa", location: "Victoria Island, Lagos", price: "₦5.2M" },
  { id: "5", image: "https://images.unsplash.com/photo-1600566753086-00f18f6c4f5a?w=400&q=80", title: "Spacious 3-Bedroom Terrace", location: "Surulere, Lagos", price: "₦1.5M" },
  { id: "6", image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=400&q=80", title: "5-Bedroom Executive Home", location: "Magodo, Lagos", price: "₦6.8M" },
  { id: "8", image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400&q=80", title: "3-Bedroom Bungalow", location: "Asokoro, Abuja", price: "₦3.1M" },
];

const activities = [
  { icon: "👁️", text: "Viewed Modern 3-Bedroom Apartment", sub: "Ikeja, Lagos", time: "2 hours ago", color: "var(--blue-050)", border: "var(--blue-100)" },
  { icon: "❤️", text: "Saved Luxury Villa", sub: "Victoria Island, Lagos", time: "Yesterday", color: "#fff1f2", border: "#fecdd3" },
  { icon: "💬", text: "Sent message to Chidi Okonkwo", sub: "Re: 3-Bedroom Apartment", time: "2 days ago", color: "var(--teal-050)", border: "var(--teal-200)" },
  { icon: "📅", text: "Booked inspection tour", sub: "5-Bedroom Executive Home, Magodo", time: "3 days ago", color: "#fffbeb", border: "#fde68a" },
  { icon: "📋", text: "Submitted rental application", sub: "Spacious Terrace, Surulere", time: "5 days ago", color: "#f0fdf4", border: "#bbf7d0" },
  { icon: "🔍", text: "Searched for 3-bedroom in Lekki", sub: "Found 24 results", time: "1 week ago", color: "var(--color-bg-subtle)", border: "var(--color-border-default)" },
];

const preferredLocations = ["Lekki", "Victoria Island", "Ikeja", "Ikoyi"];
const propertyTypes = ["Apartment", "Villa", "Duplex"];

export default function ProfilePage() {
  const [savedIds, setSavedIds] = useState(savedProperties.map((p) => p.id));
  const [activeTab, setActiveTab] = useState<"activity" | "preferences">("activity");

  const handleRemoveSaved = (id: string) => {
    setSavedIds((prev) => prev.filter((sid) => sid !== id));
  };

  const displayedSaved = savedProperties.filter((p) => savedIds.includes(p.id));

  return (
    <>
      <Header />
      <main style={{ minHeight: "100vh", background: "var(--color-bg-canvas)" }}>

        {/* ─── Profile Hero ─── */}
        <section style={ps.heroSection}>
          {/* Pattern overlay */}
          <div style={ps.heroPattern} aria-hidden />

          <div style={ps.heroInner}>
            {/* Avatar */}
            <div style={ps.avatarWrap} className="animate-profile-hero">
              <div style={ps.avatar}>AO</div>
              <div style={ps.avatarOnline} title="Online" />
            </div>

            {/* Info */}
            <div style={ps.heroInfo} className="animate-fade-in-up stagger-2">
              <h1 style={ps.heroName}>Adaeze Okafor</h1>
              <p style={ps.heroTagline}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                Lagos · Active renter since 2023
              </p>

              {/* Stats row */}
              <div style={ps.statsRow} className="animate-fade-in-up stagger-3">
                {[
                  { label: "Saved", value: displayedSaved.length.toString() },
                  { label: "Tours Booked", value: "3" },
                  { label: "Applications", value: "2" },
                ].map((stat) => (
                  <div key={stat.label} style={ps.statCard} className="profile-stat-card">
                    <span style={ps.statValue}>{stat.value}</span>
                    <span style={ps.statLabel}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Edit button */}
            <button style={ps.editBtn} className="interactive-btn animate-fade-in-up stagger-4">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit Profile
            </button>
          </div>
        </section>

        <div style={ps.contentLayout}>

          {/* ─── Saved Properties ─── */}
          <section style={ps.card} className="animate-fade-in-up stagger-1">
            <div style={ps.sectionHeader}>
              <div>
                <h2 style={ps.sectionTitle}>Saved Properties</h2>
                <p style={ps.sectionSub}>{displayedSaved.length} properties saved</p>
              </div>
              <Link href="/" style={ps.sectionLink}>Browse more →</Link>
            </div>

            {displayedSaved.length === 0 ? (
              <div style={ps.emptySaved}>
                <p style={{ fontSize: 14, color: "var(--color-text-muted)" }}>No saved properties. Browse and save your favourites!</p>
                <Link href="/" style={{ ...ps.sectionLink, fontSize: 13 }}>Browse listings →</Link>
              </div>
            ) : (
              <div style={ps.savedScroll} className="scroll-container">
                {displayedSaved.map((prop, i) => (
                  <div key={prop.id} style={ps.savedCard} className={`saved-card animate-fade-in-up stagger-${i + 1}`}>
                    <div style={ps.savedImgWrap}>
                      <img src={prop.image} alt={prop.title} style={ps.savedImg} />
                      {/* Remove btn */}
                      <button
                        style={ps.removeBtn}
                        onClick={() => handleRemoveSaved(prop.id)}
                        aria-label="Remove from saved"
                        className="interactive-btn"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                        </svg>
                      </button>
                    </div>
                    <div style={ps.savedBody}>
                      <Link href={`/listings/${prop.id}`} style={ps.savedTitle}>{prop.title}</Link>
                      <p style={ps.savedLoc}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2" style={{ display: "inline", marginRight: 3 }}>
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                        </svg>
                        {prop.location}
                      </p>
                      <p style={ps.savedPrice}>{prop.price}<span style={{ fontSize: 11, fontWeight: 400, color: "rgba(255,255,255,0.7)" }}>/yr</span></p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ─── Tabs: Activity / Preferences ─── */}
          <section style={ps.card} className="animate-fade-in-up stagger-2">
            <div style={ps.tabRow}>
              {(["activity", "preferences"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    ...ps.tabBtn,
                    background: activeTab === tab ? "var(--neutral-950)" : "transparent",
                    color: activeTab === tab ? "white" : "var(--color-text-muted)",
                    fontWeight: activeTab === tab ? 700 : 500,
                  }}
                  className="interactive-btn"
                >
                  {tab === "activity" ? "Recent Activity" : "My Preferences"}
                </button>
              ))}
            </div>

            {activeTab === "activity" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {activities.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      ...ps.activityItem,
                      borderBottom: i < activities.length - 1 ? "1px solid var(--color-border-default)" : "none",
                    }}
                    className={`activity-item animate-fade-in-up stagger-${Math.min(i + 1, 9)}`}
                  >
                    <div style={{ ...ps.activityIcon, background: item.color, border: `1.5px solid ${item.border}` }}>
                      <span style={{ fontSize: 16 }}>{item.icon}</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={ps.activityText}>{item.text}</p>
                      <p style={ps.activitySub}>{item.sub}</p>
                    </div>
                    <span style={ps.activityTime}>{item.time}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "preferences" && (
              <div style={ps.prefsLayout} className="animate-fade-in-up">
                {/* Budget */}
                <div style={ps.prefSection}>
                  <h3 style={ps.prefTitle}>Budget Range</h3>
                  <div style={ps.budgetPill}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--teal-700)" strokeWidth="2">
                      <rect x="2" y="3" width="20" height="18" rx="2" /><line x1="2" y1="9" x2="22" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
                    </svg>
                    ₦1M – ₦3M / year
                  </div>
                </div>

                {/* Preferred Locations */}
                <div style={ps.prefSection}>
                  <h3 style={ps.prefTitle}>Preferred Locations</h3>
                  <div style={ps.prefChips}>
                    {preferredLocations.map((loc) => (
                      <span key={loc} style={ps.prefChip} className={`animate-fade-in-up stagger-${preferredLocations.indexOf(loc) + 1}`}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                        </svg>
                        {loc}
                      </span>
                    ))}
                    <button style={ps.addChipBtn} className="interactive-btn">+ Add</button>
                  </div>
                </div>

                {/* Property Types */}
                <div style={ps.prefSection}>
                  <h3 style={ps.prefTitle}>Property Types</h3>
                  <div style={ps.prefChips}>
                    {propertyTypes.map((type) => (
                      <span key={type} style={ps.prefChipType} className={`animate-fade-in-up stagger-${propertyTypes.indexOf(type) + 2}`}>
                        {type}
                      </span>
                    ))}
                    <button style={ps.addChipBtn} className="interactive-btn">+ Add</button>
                  </div>
                </div>

                <button style={ps.savePrefsBtn} className="btn-primary interactive-btn">
                  Save Preferences
                </button>
              </div>
            )}
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}

const ps: Record<string, React.CSSProperties> = {
  heroSection: {
    background: "linear-gradient(135deg, var(--blue-950) 0%, var(--blue-800) 55%, var(--teal-900) 100%)",
    position: "relative",
    overflow: "hidden",
    paddingBottom: "var(--space-12)",
  },
  heroPattern: {
    position: "absolute",
    inset: 0,
    backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
    backgroundSize: "28px 28px",
    pointerEvents: "none",
  },
  heroInner: {
    maxWidth: "var(--content-max-width)",
    margin: "0 auto",
    padding: "var(--space-12) var(--space-6) 0",
    display: "flex",
    alignItems: "flex-start",
    gap: "var(--space-8)",
    flexWrap: "wrap" as const,
    position: "relative",
    zIndex: 1,
  },
  avatarWrap: {
    position: "relative",
    flexShrink: 0,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: "50%",
    background: "linear-gradient(135deg, var(--blue-400), var(--teal-400))",
    color: "white",
    fontSize: 32,
    fontWeight: 800,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    letterSpacing: "-1px",
    border: "4px solid rgba(255,255,255,0.25)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.4), var(--shadow-glow-teal)",
  },
  avatarOnline: {
    position: "absolute",
    bottom: 6,
    right: 6,
    width: 16,
    height: 16,
    borderRadius: "50%",
    background: "#22c55e",
    border: "3px solid var(--blue-950)",
    boxShadow: "0 0 8px rgba(34,197,94,0.5)",
  },
  heroInfo: {
    flex: 1,
    minWidth: 0,
  },
  heroName: {
    fontSize: 36,
    fontWeight: 800,
    color: "white",
    letterSpacing: "-0.8px",
    marginBottom: "var(--space-1)",
    lineHeight: 1.1,
  },
  heroTagline: {
    fontSize: 15,
    color: "rgba(255,255,255,0.65)",
    marginBottom: "var(--space-5)",
  },
  statsRow: {
    display: "flex",
    gap: "var(--space-3)",
    flexWrap: "wrap" as const,
  },
  statCard: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    padding: "var(--space-3) var(--space-5)",
    borderRadius: "var(--radius-lg)",
    background: "rgba(255,255,255,0.10)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.15)",
    minWidth: 80,
    cursor: "default",
    transition: "all 0.25s var(--motion-easing-emphasized)",
  },
  statValue: {
    fontSize: 24,
    fontWeight: 800,
    color: "white",
    letterSpacing: "-0.5px",
    lineHeight: 1.2,
  },
  statLabel: {
    fontSize: 11,
    color: "rgba(255,255,255,0.6)",
    fontWeight: 500,
    marginTop: 2,
    textAlign: "center" as const,
  },
  editBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--space-2)",
    padding: "10px 20px",
    borderRadius: "var(--radius-pill)",
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(8px)",
    border: "1.5px solid rgba(255,255,255,0.25)",
    color: "white",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
    flexShrink: 0,
    alignSelf: "flex-start",
    marginTop: 16,
    transition: "all 0.2s",
  },
  contentLayout: {
    maxWidth: "var(--content-max-width)",
    margin: "0 auto",
    padding: "var(--space-8) var(--space-6) var(--space-16)",
    display: "flex",
    flexDirection: "column" as const,
    gap: "var(--space-6)",
  },
  card: {
    background: "var(--color-surface-default)",
    borderRadius: "var(--radius-xl)",
    border: "1px solid var(--color-border-default)",
    boxShadow: "var(--shadow-sm)",
    overflow: "hidden",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "var(--space-6) var(--space-6) var(--space-4)",
    borderBottom: "1px solid var(--color-border-default)",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "var(--color-text-primary)",
    letterSpacing: "-0.2px",
    margin: 0,
  },
  sectionSub: {
    fontSize: 13,
    color: "var(--color-text-muted)",
    marginTop: 2,
    margin: "2px 0 0",
  },
  sectionLink: {
    fontSize: 13,
    fontWeight: 600,
    color: "var(--color-brand-primary)",
    textDecoration: "none",
    transition: "color 0.15s",
  },
  emptySaved: {
    padding: "var(--space-8) var(--space-6)",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "var(--space-3)",
    textAlign: "center" as const,
  },
  savedScroll: {
    display: "flex",
    gap: "var(--space-4)",
    padding: "var(--space-5) var(--space-6)",
    overflowX: "auto" as const,
  },
  savedCard: {
    width: 220,
    flexShrink: 0,
    borderRadius: "var(--radius-lg)",
    overflow: "hidden",
    border: "1px solid var(--color-border-default)",
    background: "var(--color-surface-default)",
    boxShadow: "var(--shadow-sm)",
    cursor: "pointer",
    transition: "all 0.3s var(--motion-easing-emphasized)",
  },
  savedImgWrap: {
    position: "relative",
    height: 130,
    overflow: "hidden",
  },
  savedImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    display: "block",
    transition: "transform 0.5s var(--motion-easing-emphasized)",
  },
  removeBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: "50%",
    background: "#EF4444",
    color: "white",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "var(--shadow-md)",
    transition: "transform 0.15s var(--motion-easing-spring)",
    fontFamily: "inherit",
  },
  savedBody: {
    padding: "var(--space-3) var(--space-3)",
    background: "linear-gradient(to top, var(--neutral-950), var(--blue-900))",
  },
  savedTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: "white",
    display: "block",
    marginBottom: 3,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
    textDecoration: "none",
    letterSpacing: "-0.1px",
  },
  savedLoc: {
    fontSize: 11,
    color: "rgba(255,255,255,0.55)",
    marginBottom: 4,
  },
  savedPrice: {
    fontSize: 16,
    fontWeight: 800,
    color: "var(--teal-300)",
    letterSpacing: "-0.3px",
    margin: 0,
  },
  tabRow: {
    display: "flex",
    gap: "var(--space-2)",
    padding: "var(--space-4) var(--space-6)",
    borderBottom: "1px solid var(--color-border-default)",
    background: "var(--color-bg-subtle)",
  },
  tabBtn: {
    padding: "8px 20px",
    borderRadius: "var(--radius-pill)",
    border: "none",
    cursor: "pointer",
    fontSize: 13,
    transition: "all 0.2s var(--motion-easing-spring)",
    fontFamily: "inherit",
  },
  activityItem: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-4)",
    padding: "var(--space-4) var(--space-6)",
    transition: "all 0.15s var(--motion-easing-standard)",
    cursor: "default",
  },
  activityIcon: {
    width: 42,
    height: 42,
    borderRadius: "var(--radius-md)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  activityText: {
    fontSize: 14,
    fontWeight: 600,
    color: "var(--color-text-primary)",
    margin: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
  },
  activitySub: {
    fontSize: 12,
    color: "var(--color-text-muted)",
    marginTop: 2,
    margin: "2px 0 0",
  },
  activityTime: {
    fontSize: 11,
    color: "var(--color-text-muted)",
    flexShrink: 0,
    fontWeight: 500,
  },
  prefsLayout: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "var(--space-6)",
    padding: "var(--space-6)",
  },
  prefSection: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "var(--space-3)",
  },
  prefTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: "var(--color-text-muted)",
    textTransform: "uppercase" as const,
    letterSpacing: "0.8px",
    margin: 0,
  },
  budgetPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--space-2)",
    padding: "10px 20px",
    borderRadius: "var(--radius-pill)",
    background: "var(--teal-050)",
    color: "var(--teal-800)",
    fontSize: 15,
    fontWeight: 700,
    border: "1.5px solid var(--teal-200)",
    letterSpacing: "-0.2px",
    alignSelf: "flex-start" as const,
  },
  prefChips: {
    display: "flex",
    gap: "var(--space-2)",
    flexWrap: "wrap" as const,
    alignItems: "center",
  },
  prefChip: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    padding: "7px 14px",
    borderRadius: "var(--radius-pill)",
    background: "var(--color-brand-primary)",
    color: "white",
    fontSize: 13,
    fontWeight: 600,
    boxShadow: "var(--shadow-sm)",
  },
  prefChipType: {
    display: "inline-flex",
    alignItems: "center",
    padding: "7px 14px",
    borderRadius: "var(--radius-pill)",
    background: "var(--blue-050)",
    color: "var(--blue-700)",
    fontSize: 13,
    fontWeight: 600,
    border: "1.5px solid var(--blue-100)",
  },
  addChipBtn: {
    padding: "7px 14px",
    borderRadius: "var(--radius-pill)",
    border: "1.5px dashed var(--color-border-strong)",
    background: "transparent",
    color: "var(--color-text-muted)",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.15s",
    fontFamily: "inherit",
  },
  savePrefsBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 32px",
    borderRadius: "var(--radius-pill)",
    background: "var(--color-brand-primary)",
    color: "white",
    fontSize: 14,
    fontWeight: 700,
    border: "none",
    cursor: "pointer",
    alignSelf: "flex-start" as const,
    boxShadow: "var(--shadow-md)",
    fontFamily: "inherit",
  },
};
