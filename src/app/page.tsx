"use client";

import { useState, useRef, useCallback } from "react";
import Header from "@/components/Header";
import ListingCard from "@/components/ListingCard";
import Footer from "@/components/Footer";

const ALL_LISTINGS = [
  { id: "1", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80", title: "Modern 3-Bedroom Apartment", location: "Ikeja, Lagos", beds: 3, baths: 2, area: "1,200 sqft", annualPrice: "₦2.4M", verified: true, tag: "Featured" as const, type: "Apartments" },
  { id: "2", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", title: "Cozy 2-Bedroom Duplex", location: "Lekki Phase 1, Lagos", beds: 2, baths: 2, area: "980 sqft", annualPrice: "₦1.8M", verified: true, tag: "New" as const, type: "Duplexes" },
  { id: "3", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", title: "Luxury 4-Bedroom Villa", location: "Victoria Island, Lagos", beds: 4, baths: 3, area: "2,400 sqft", annualPrice: "₦5.2M", verified: true, tag: "Premium" as const, type: "Villas" },
  { id: "4", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", title: "Studio Apartment in Yaba", location: "Yaba, Lagos", beds: 1, baths: 1, area: "450 sqft", annualPrice: "₦720K", verified: false, tag: undefined, type: "Studios" },
  { id: "5", image: "https://images.unsplash.com/photo-1600566753086-00f18f6c4f5a?w=600&q=80", title: "Spacious 3-Bedroom Terrace", location: "Surulere, Lagos", beds: 3, baths: 2, area: "1,100 sqft", annualPrice: "₦1.5M", verified: true, tag: "Reduced" as const, type: "Houses" },
  { id: "6", image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600&q=80", title: "5-Bedroom Executive Home", location: "Magodo, Lagos", beds: 5, baths: 4, area: "3,200 sqft", annualPrice: "₦6.8M", verified: true, tag: "Featured" as const, type: "Houses" },
  { id: "7", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80", title: "2-Bedroom Flat", location: "GRA, Port Harcourt", beds: 2, baths: 2, area: "850 sqft", annualPrice: "₦1.2M", verified: true, tag: undefined, type: "Apartments" },
  { id: "8", image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&q=80", title: "3-Bedroom Bungalow", location: "Asokoro, Abuja", beds: 3, baths: 2, area: "1,500 sqft", annualPrice: "₦3.1M", verified: true, tag: "New" as const, type: "Houses" },
  { id: "9", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", title: "1-Bedroom Studio Flat", location: "Ibadan, Oyo", beds: 1, baths: 1, area: "500 sqft", annualPrice: "₦450K", verified: false, tag: undefined, type: "Studios" },
  { id: "10", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80", title: "4-Bedroom Penthouse", location: "Banana Island, Lagos", beds: 4, baths: 4, area: "3,800 sqft", annualPrice: "₦12M", verified: true, tag: "Premium" as const, type: "Villas" },
  { id: "11", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", title: "Semi-Detached Duplex", location: "Lekki Phase 2, Lagos", beds: 3, baths: 3, area: "1,600 sqft", annualPrice: "₦3.5M", verified: true, tag: "Featured" as const, type: "Duplexes" },
  { id: "12", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", title: "Furnished Studio", location: "Victoria Island, Lagos", beds: 1, baths: 1, area: "380 sqft", annualPrice: "₦900K", verified: true, tag: "New" as const, type: "Studios" },
];

const PAGE_SIZE = 8;
const CATEGORIES = ["All", "Apartments", "Duplexes", "Houses", "Villas", "Studios"];
const SORT_OPTIONS = [
  { label: "Most Recent", value: "recent" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Most Relevant", value: "relevant" },
];

function parsePriceNum(price: string): number {
  const cleaned = price.replace(/[₦,KMk]/g, "");
  const num = parseFloat(cleaned);
  if (price.includes("M")) return num * 1_000_000;
  if (price.toUpperCase().includes("K")) return num * 1_000;
  return num;
}

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("recent");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loadingMore, setLoadingMore] = useState(false);

  const filtered = ALL_LISTINGS.filter(
    (l) => activeCategory === "All" || l.type === activeCategory
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price_asc") return parsePriceNum(a.annualPrice) - parsePriceNum(b.annualPrice);
    if (sortBy === "price_desc") return parsePriceNum(b.annualPrice) - parsePriceNum(a.annualPrice);
    return 0;
  });

  const visible = sorted.slice(0, visibleCount);
  const hasMore = visibleCount < sorted.length;

  const handleLoadMore = useCallback(() => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((v) => v + PAGE_SIZE);
      setLoadingMore(false);
    }, 900);
  }, []);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <>
      <Header />
      <main style={{ minHeight: "100vh", background: "var(--color-bg-canvas)" }}>

        {/* ─── Sticky Filter Bar ─── */}
        <div className="browse-filter-bar">
          <div style={s.filterBarInner}>
            {/* Category chips */}
            <div style={s.categoryChips}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  style={{
                    ...s.catChip,
                    background: activeCategory === cat ? "var(--neutral-950)" : "var(--color-surface-default)",
                    color: activeCategory === cat ? "white" : "var(--color-text-secondary)",
                    borderColor: activeCategory === cat ? "var(--neutral-950)" : "var(--color-border-default)",
                    fontWeight: activeCategory === cat ? 700 : 500,
                    boxShadow: activeCategory === cat ? "var(--shadow-md)" : "none",
                  }}
                  className="category-chip interactive-btn"
                >
                  {cat}
                </button>
              ))}
            </div>

            <div style={s.filterRight}>
              {/* Results count */}
              <span style={s.resultPill}>
                <strong style={{ color: "var(--color-text-primary)" }}>{filtered.length}</strong>
                <span style={{ color: "var(--color-text-muted)" }}> properties</span>
              </span>

              {/* Sort dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={s.sortSelect}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>

              {/* View toggle */}
              <div style={s.viewToggle}>
                <button
                  onClick={() => setViewMode("grid")}
                  style={{
                    ...s.viewBtn,
                    background: viewMode === "grid" ? "var(--neutral-950)" : "transparent",
                    color: viewMode === "grid" ? "white" : "var(--color-text-muted)",
                  }}
                  aria-label="Grid view"
                  title="Grid view"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="3" y="3" width="8" height="8" rx="1.5" />
                    <rect x="13" y="3" width="8" height="8" rx="1.5" />
                    <rect x="3" y="13" width="8" height="8" rx="1.5" />
                    <rect x="13" y="13" width="8" height="8" rx="1.5" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  style={{
                    ...s.viewBtn,
                    background: viewMode === "list" ? "var(--neutral-950)" : "transparent",
                    color: viewMode === "list" ? "white" : "var(--color-text-muted)",
                  }}
                  aria-label="List view"
                  title="List view"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Listings Section ─── */}
        <section style={s.listingsSection}>
          <div style={s.sectionHeader} className="animate-fade-in-up">
            <div>
              <p style={s.eyebrow}>Browse Properties</p>
              <h1 style={s.pageTitle}>
                {activeCategory === "All" ? "All Properties" : activeCategory}
              </h1>
            </div>
          </div>

          {viewMode === "grid" ? (
            <div style={s.grid} className="listing-grid-4">
              {visible.map((listing, i) => (
                <div
                  key={listing.id}
                  className={`animate-fade-in-up stagger-${(i % 9) + 1}`}
                >
                  <ListingCard {...listing} />
                </div>
              ))}
            </div>
          ) : (
            <div style={s.listView}>
              {visible.map((listing, i) => (
                <div
                  key={listing.id}
                  className={`animate-fade-in-up stagger-${(i % 9) + 1}`}
                >
                  <ListViewCard {...listing} />
                </div>
              ))}
            </div>
          )}

          {/* Load More */}
          {hasMore && (
            <div style={s.loadMoreRow}>
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                style={{
                  ...s.loadMoreBtn,
                  opacity: loadingMore ? 0.85 : 1,
                  cursor: loadingMore ? "default" : "pointer",
                }}
                className="load-more-btn interactive-btn"
              >
                {loadingMore ? (
                  <>
                    <svg
                      className="animate-spin"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                    Loading...
                  </>
                ) : (
                  <>
                    Load more properties
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                  </>
                )}
              </button>
              <p style={s.loadMoreHint}>
                Showing {visible.length} of {sorted.length} properties
              </p>
            </div>
          )}

          {!hasMore && sorted.length > 0 && (
            <p style={s.endOfResults}>
              ✓ All {sorted.length} properties shown
            </p>
          )}

          {sorted.length === 0 && (
            <div style={s.emptyState}>
              <div style={s.emptyIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-border-strong)" strokeWidth="1.5">
                  <path d="M3 10.5L12 3L21 10.5V20C21 20.55 20.55 21 20 21H15V14H9V21H4C3.45 21 3 20.55 3 20V10.5Z" />
                </svg>
              </div>
              <p style={s.emptyText}>No properties in this category yet</p>
              <button
                onClick={() => handleCategoryChange("All")}
                style={s.emptyBtn}
                className="btn-primary"
              >
                View all properties
              </button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

/* ─── Compact List-View Card ─── */
function ListViewCard(props: {
  id: string; image: string; title: string; location: string;
  beds: number; baths: number; area: string; annualPrice: string; verified: boolean; tag?: string;
}) {
  return (
    <a href={`/listings/${props.id}`} style={lvc.card} className="listing-card">
      <div style={lvc.imgWrap}>
        <div style={{ ...lvc.img, backgroundImage: `url(${props.image})` }} className="card-image" />
        {props.tag && <span style={lvc.tag}>{props.tag}</span>}
      </div>
      <div style={lvc.body}>
        <div style={lvc.bodyTop}>
          <div>
            <h3 style={lvc.title}>{props.title}</h3>
            <div style={lvc.locRow}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
              <span style={lvc.location}>{props.location}</span>
              {props.verified && (
                <span style={lvc.verifiedChip}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  Verified
                </span>
              )}
            </div>
          </div>
          <div style={lvc.priceBlock}>
            <p style={lvc.price}>{props.annualPrice}</p>
            <p style={lvc.priceSub}>per year</p>
          </div>
        </div>
        <div style={lvc.specs}>
          {[`${props.beds} Beds`, `${props.baths} Baths`, props.area].map((s) => (
            <span key={s} style={lvc.spec}>{s}</span>
          ))}
        </div>
      </div>
    </a>
  );
}

const lvc: Record<string, React.CSSProperties> = {
  card: {
    display: "flex",
    gap: "var(--space-5)",
    borderRadius: "var(--radius-xl)",
    border: "1px solid var(--color-border-default)",
    background: "var(--color-surface-default)",
    overflow: "hidden",
    boxShadow: "var(--shadow-sm)",
    textDecoration: "none",
    color: "inherit",
  },
  imgWrap: {
    position: "relative",
    width: 220,
    flexShrink: 0,
    overflow: "hidden",
  },
  img: {
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: 140,
  },
  tag: {
    position: "absolute",
    top: 10,
    left: 10,
    padding: "3px 10px",
    borderRadius: "var(--radius-pill)",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.4px",
    textTransform: "uppercase" as const,
    background: "var(--color-brand-primary)",
    color: "white",
  },
  body: {
    flex: 1,
    padding: "var(--space-5) var(--space-5) var(--space-5) 0",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "space-between",
    gap: "var(--space-3)",
  },
  bodyTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "var(--space-4)",
  },
  title: { fontSize: 16, fontWeight: 700, color: "var(--color-text-primary)", marginBottom: 4, letterSpacing: "-0.2px" },
  locRow: { display: "flex", alignItems: "center", gap: 5 },
  location: { fontSize: 13, color: "var(--color-text-muted)" },
  verifiedChip: {
    display: "inline-flex",
    alignItems: "center",
    gap: 3,
    padding: "2px 8px",
    borderRadius: "var(--radius-pill)",
    background: "var(--teal-050)",
    color: "var(--teal-800)",
    fontSize: 11,
    fontWeight: 600,
    border: "1px solid var(--teal-200)",
  },
  priceBlock: { textAlign: "right" as const, flexShrink: 0 },
  price: { fontSize: 20, fontWeight: 800, color: "var(--color-brand-secondary)", letterSpacing: "-0.4px", margin: 0 },
  priceSub: { fontSize: 12, color: "var(--color-text-muted)", marginTop: 2 },
  specs: { display: "flex", gap: "var(--space-2)", flexWrap: "wrap" as const },
  spec: {
    padding: "4px 12px",
    borderRadius: "var(--radius-pill)",
    background: "var(--color-bg-subtle)",
    fontSize: 12,
    fontWeight: 500,
    color: "var(--color-text-secondary)",
  },
};

const s: Record<string, React.CSSProperties> = {
  filterBarInner: {
    maxWidth: "var(--content-max-width)",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "var(--space-3) var(--space-6)",
    gap: "var(--space-4)",
    flexWrap: "wrap" as const,
  },
  categoryChips: {
    display: "flex",
    gap: "var(--space-2)",
    flexWrap: "wrap" as const,
  },
  catChip: {
    padding: "7px 18px",
    borderRadius: "var(--radius-pill)",
    border: "1.5px solid",
    fontSize: 13,
    cursor: "pointer",
    transition: "all 0.18s var(--motion-easing-spring)",
    letterSpacing: "0.1px",
    fontFamily: "inherit",
  },
  filterRight: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-3)",
  },
  resultPill: {
    padding: "7px 14px",
    borderRadius: "var(--radius-pill)",
    background: "var(--color-bg-subtle)",
    fontSize: 13,
    border: "1px solid var(--color-border-default)",
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  sortSelect: {
    padding: "8px 14px",
    borderRadius: "var(--radius-pill)",
    border: "1.5px solid var(--color-border-default)",
    fontSize: 13,
    fontWeight: 500,
    color: "var(--color-text-primary)",
    background: "var(--color-surface-default)",
    cursor: "pointer",
    outline: "none",
    fontFamily: "inherit",
  },
  viewToggle: {
    display: "flex",
    borderRadius: "var(--radius-md)",
    border: "1.5px solid var(--color-border-default)",
    overflow: "hidden",
    flexShrink: 0,
  },
  viewBtn: {
    padding: "8px 12px",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.15s",
    fontFamily: "inherit",
  },
  listingsSection: {
    maxWidth: "var(--content-max-width)",
    margin: "0 auto",
    padding: "var(--space-8) var(--space-6) var(--space-16)",
  },
  sectionHeader: {
    marginBottom: "var(--space-6)",
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: "1.2px",
    color: "var(--color-brand-secondary)",
    marginBottom: "var(--space-1)",
    margin: 0,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 800,
    color: "var(--color-text-primary)",
    letterSpacing: "-0.6px",
    lineHeight: "1.2",
    marginTop: 4,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "var(--space-6)",
  },
  listView: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "var(--space-4)",
  },
  loadMoreRow: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "var(--space-3)",
    marginTop: "var(--space-12)",
  },
  loadMoreBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--space-2)",
    padding: "14px 36px",
    borderRadius: "var(--radius-pill)",
    background: "var(--color-brand-primary)",
    color: "white",
    fontSize: 15,
    fontWeight: 700,
    border: "none",
    letterSpacing: "0.1px",
    transition: "all 0.2s",
    fontFamily: "inherit",
  },
  loadMoreHint: {
    fontSize: 13,
    color: "var(--color-text-muted)",
    margin: 0,
  },
  endOfResults: {
    textAlign: "center" as const,
    marginTop: "var(--space-12)",
    fontSize: 13,
    color: "var(--color-text-muted)",
    fontWeight: 500,
  },
  emptyState: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "var(--space-4)",
    padding: "var(--space-20) 0",
    textAlign: "center" as const,
  },
  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: "50%",
    background: "var(--color-bg-subtle)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1.5px solid var(--color-border-default)",
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 600,
    color: "var(--color-text-secondary)",
    margin: 0,
  },
  emptyBtn: {
    display: "inline-flex",
    alignItems: "center",
    padding: "12px 28px",
    borderRadius: "var(--radius-pill)",
    background: "var(--color-brand-primary)",
    color: "white",
    fontSize: 14,
    fontWeight: 700,
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    fontFamily: "inherit",
  },
};
