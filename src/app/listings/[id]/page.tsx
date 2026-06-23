"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import VerifiedBadge from "@/components/VerifiedBadge";
import Footer from "@/components/Footer";

const listing = {
  id: "1",
  title: "Modern 3-Bedroom Apartment",
  location: "14 Allen Avenue, Ikeja, Lagos",
  community: "Ikeja GRA Estate",
  price: "₦2,400,000",
  annualPrice: "₦2,400,000",
  monthlyPrice: "₦200,000",
  pricePerSqft: "₦2,000",
  priceDrop: "↓ ₦100K price drop",
  beds: 3,
  baths: 2,
  area: "1,200 sqft",
  yearBuilt: "2019",
  parking: "2 spaces",
  propertyType: "Apartment",
  description:
    "A beautifully finished 3-bedroom apartment in the heart of Ikeja. Features include ample parking, 24-hour security, backup generator, and modern kitchen fittings. Walking distance to shopping malls and major transport routes.",
  images: [
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80",
    "https://images.unsplash.com/photo-1600566753086-00f18f6c4f5a?w=900&q=80",
  ],
  amenities: ["Parking", "24/7 Security", "Generator", "CCTV", "Water Supply", "Waste Disposal"],
  landlord: { name: "Chidi Okonkwo", role: "Property Owner", verified: true, phone: "+234 800 000 0000", memberSince: "2024", properties: 4 },
};

const tourDates = ["Mon, Jan 27", "Wed, Jan 29", "Fri, Jan 31"];

export default function ListingDetail() {
  const l = listing;
  const [activeImg, setActiveImg] = useState(0);
  const [slideDir, setSlideDir] = useState<"left" | "right" | null>(null);
  const [activeTab, setActiveTab] = useState<"rent" | "buy">("rent");
  const [mapOpen, setMapOpen] = useState(false);
  const [mapClosing, setMapClosing] = useState(false);

  const openMap = () => setMapOpen(true);
  const closeMap = () => {
    setMapClosing(true);
    setTimeout(() => { setMapOpen(false); setMapClosing(false); }, 260);
  };
  const [isSaved, setIsSaved] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [msgSent, setMsgSent] = useState(false);

  const navigate = (dir: "prev" | "next") => {
    setSlideDir(dir === "next" ? "left" : "right");
    setTimeout(() => {
      setActiveImg((prev) =>
        dir === "next" ? (prev + 1) % l.images.length : (prev - 1 + l.images.length) % l.images.length
      );
      setTimeout(() => setSlideDir(null), 400);
    }, 50);
  };

  return (
    <>
      <Header />
      <main style={{ background: "var(--color-bg-canvas)", minHeight: "100vh" }}>

        {/* Back breadcrumb */}
        <div style={d.breadcrumbBar}>
          <div style={d.breadcrumbInner}>
            <Link href="/" style={d.breadLink}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              Back to listings
            </Link>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            <span style={d.breadCurrent}>{l.title}</span>
          </div>
        </div>

        {/* Two-column layout */}
        <div style={d.twoCol}>

          {/* ─── LEFT: Gallery ─── */}
          <div style={d.galleryCol}>
            {/* Main image */}
            <div
              style={d.mainImgWrap}
              className="gallery-wrap"
              onMouseEnter={() => {}}
            >
              <img
                key={`${activeImg}-${slideDir}`}
                src={l.images[activeImg]}
                alt={l.title}
                style={d.mainImg}
                className={
                  slideDir === "left"
                    ? "animate-image-left"
                    : slideDir === "right"
                    ? "animate-image-right"
                    : "animate-fade-in-scale"
                }
              />

              {/* Gradient */}
              <div style={d.imgOverlay} />

              {/* Location pill overlay */}
              <div style={d.locationPill}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                {l.location}
              </div>

              {/* Save button */}
              <button
                style={{
                  ...d.imgSaveBtn,
                  background: isSaved ? "#EF4444" : "rgba(255,255,255,0.92)",
                  color: isSaved ? "white" : "#EF4444",
                }}
                onClick={() => setIsSaved((v) => !v)}
                className="interactive-btn"
                aria-label="Save"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </button>

              {/* Prev arrow */}
              <button
                onClick={() => navigate("prev")}
                style={{ ...d.arrowBtn, left: 16 }}
                className="gallery-arrow"
                aria-label="Previous image"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
              </button>

              {/* Next arrow */}
              <button
                onClick={() => navigate("next")}
                style={{ ...d.arrowBtn, right: 16 }}
                className="gallery-arrow"
                aria-label="Next image"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
              </button>

              {/* Photo counter */}
              <div style={d.photoCounter}>
                {activeImg + 1} / {l.images.length}
              </div>
            </div>

            {/* Thumbnails */}
            <div style={d.thumbRow}>
              {l.images.slice(0, 4).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  style={{
                    ...d.thumb,
                    borderColor: activeImg === i ? "var(--color-brand-primary)" : "transparent",
                    boxShadow: activeImg === i ? "var(--shadow-md)" : "none",
                    transform: activeImg === i ? "scale(1.05)" : "scale(1)",
                  }}
                  className="interactive-btn"
                  aria-label={`Photo ${i + 1}`}
                >
                  <img src={img} alt={`Photo ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  {i === 3 && l.images.length > 4 && (
                    <div style={d.viewAllOverlay}>
                      +{l.images.length - 4} more
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Description card */}
            <div style={d.descCard} className="animate-fade-in-up stagger-3">
              <h2 style={d.cardHeading}>About this property</h2>
              <p style={d.descText}>{l.description}</p>
            </div>

            {/* Amenities */}
            <div style={d.descCard} className="animate-fade-in-up stagger-4">
              <h2 style={d.cardHeading}>Amenities</h2>
              <div style={d.amenGrid}>
                {l.amenities.map((a) => (
                  <div key={a} style={d.amenChip}>
                    <div style={d.amenDot} />
                    {a}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ─── RIGHT: Details Panel ─── */}
          <div style={d.detailsCol}>

            {/* Buy / Rent tabs */}
            <div style={d.tabRow} className="animate-fade-in-up stagger-1">
              {(["rent", "buy"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    ...d.tabBtn,
                    background: activeTab === tab ? "var(--neutral-950)" : "transparent",
                    color: activeTab === tab ? "white" : "var(--color-text-muted)",
                    fontWeight: activeTab === tab ? 700 : 500,
                  }}
                  className="interactive-btn"
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Status */}
            <div style={d.statusRow} className="animate-fade-in-up stagger-2">
              <div style={d.statusDot} />
              <span style={d.statusText}>
                {activeTab === "rent" ? "Available for rent" : "House for sale"}
              </span>
            </div>

            {/* Price block */}
            <div style={d.priceBlock} className="animate-fade-in-up stagger-2">
              <div style={d.priceRow}>
                <span style={d.bigPrice}>{l.annualPrice}</span>
                <span style={d.priceDrop}>{l.priceDrop}</span>
              </div>
              <p style={d.priceMonthly}>~{l.monthlyPrice} / month</p>
            </div>

            {/* Specs chips */}
            <div style={d.specsRow} className="animate-fade-in-up stagger-3">
              {[
                { icon: "🛏", label: `${l.beds} Beds` },
                { icon: "🚿", label: `${l.baths} Baths` },
                { icon: "📐", label: l.area },
              ].map((spec) => (
                <div key={spec.label} style={d.specChip}>
                  <span style={{ fontSize: 16 }}>{spec.icon}</span>
                  <span style={d.specLabel}>{spec.label}</span>
                </div>
              ))}
            </div>

            {/* Address — clickable, opens map modal */}
            <button
              onClick={openMap}
              style={d.addressRow}
              className="interactive-btn address-btn"
              aria-label="View on map"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-primary)" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
              <span style={d.addressText}>{l.location}</span>
              <span style={d.addressMapHint}>
                View on map
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: 3 }}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </button>

            {/* Community */}
            <div style={d.communityRow} className="animate-fade-in-up stagger-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-secondary)" strokeWidth="2">
                <path d="M3 10.5L12 3L21 10.5V20C21 20.55 20.55 21 20 21H15V14H9V21H4C3.45 21 3 20.55 3 20V10.5Z" />
              </svg>
              <span style={d.communityText}>{l.community}</span>
            </div>

            {/* Details grid */}
            <div style={d.detailsGrid} className="animate-fade-in-up stagger-4">
              {[
                { label: "Property type", value: l.propertyType },
                { label: "Price / sqft", value: l.pricePerSqft },
                { label: "Year built", value: l.yearBuilt },
                { label: "Parking", value: l.parking },
              ].map((row) => (
                <div key={row.label} style={d.detailCell}>
                  <p style={d.detailCellLabel}>{row.label}</p>
                  <p style={d.detailCellValue}>{row.value}</p>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div style={d.ctaRow} className="animate-fade-in-up stagger-4">
              <button
                style={d.ctaPrimary}
                className="interactive-btn"
                onClick={() => setMsgSent(true)}
              >
                {msgSent ? (
                  <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg> Message sent!</>
                ) : (
                  <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg> Ask a question</>
                )}
              </button>
              <button style={d.ctaSecondary} className="interactive-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                Share this home
              </button>
            </div>

            {/* Verified owner */}
            <div style={d.ownerCard} className="animate-fade-in-up stagger-5">
              <div style={d.ownerAvatar}>{l.landlord.name.split(" ").map((n) => n[0]).join("")}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={d.ownerName}>{l.landlord.name}</span>
                  {l.landlord.verified && <VerifiedBadge status="verified" size="sm" />}
                </div>
                <p style={d.ownerRole}>{l.landlord.role} · Since {l.landlord.memberSince}</p>
              </div>
              <a href={`tel:${l.landlord.phone}`} style={d.callLink}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                Contact
              </a>
            </div>

            {/* Tour section */}
            <div style={d.tourCard} className="animate-fade-in-up stagger-5">
              <h3 style={d.tourTitle}>Request a tour</h3>
              <p style={d.tourSub}>Choose a convenient date for your inspection</p>
              <div style={d.tourDates}>
                {tourDates.map((date) => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    style={{
                      ...d.dateChip,
                      background: selectedDate === date ? "var(--neutral-950)" : "var(--color-bg-subtle)",
                      color: selectedDate === date ? "white" : "var(--color-text-primary)",
                      borderColor: selectedDate === date ? "var(--neutral-950)" : "var(--color-border-default)",
                    }}
                    className="interactive-btn"
                  >
                    {date}
                  </button>
                ))}
              </div>
              <button
                style={{
                  ...d.tourBtn,
                  opacity: selectedDate ? 1 : 0.6,
                  cursor: selectedDate ? "pointer" : "default",
                }}
                disabled={!selectedDate}
                className="interactive-btn"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {selectedDate ? `Book for ${selectedDate}` : "Select a date first"}
              </button>
            </div>

            {/* Safety note */}
            <div style={d.safetyNote} className="animate-fade-in-up stagger-6">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--warning-600)" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}>
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span>Stay safe. Never pay outside this platform. Report suspicious listings.</span>
            </div>

          </div>
        </div>
      </main>

      {/* ─── Map Modal ─── */}
      {mapOpen && (
        <div
          style={mapClosing ? { ...m.backdrop, opacity: 0, transition: "opacity 0.26s" } : m.backdrop}
          className={mapClosing ? "animate-fade-in" : "animate-backdrop-in"}
          onClick={closeMap}
          role="dialog"
          aria-modal="true"
          aria-label="Property location map"
        >
          <div
            style={m.panel}
            className={mapClosing ? "animate-modal-close" : "animate-modal-open"}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div style={m.header}>
              <div style={m.headerLeft}>
                <div style={m.headerIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-primary)" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p style={m.headerTitle}>Property Location</p>
                  <p style={m.headerAddr}>{l.location}</p>
                </div>
              </div>
              <button onClick={closeMap} style={m.closeBtn} className="interactive-btn" aria-label="Close map">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Map embed — OpenStreetMap iframe (no API key needed) */}
            <div style={m.mapWrap}>
              <iframe
                title="Property location map"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=3.3300%2C6.5900%2C3.3700%2C6.6100&layer=mapnik&marker=6.6000%2C3.3500`}
                style={m.iframe}
                loading="lazy"
                allowFullScreen
              />
              {/* Pin overlay */}
              <div style={m.pinOverlay} className="animate-bounce-in">
                <div style={m.pin}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="0">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div style={m.pinLabel}>{l.community}</div>
              </div>
            </div>

            {/* Footer actions */}
            <div style={m.footer}>
              <div style={m.footerAddr}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                {l.location}
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(l.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={m.gmapsBtn}
                className="interactive-btn"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

/* ══════════════════════════════════════════ */
/* STYLES                                     */
/* ══════════════════════════════════════════ */

const d: Record<string, React.CSSProperties> = {
  breadcrumbBar: {
    background: "var(--color-surface-default)",
    borderBottom: "1px solid var(--color-border-default)",
    padding: "var(--space-3) var(--space-6)",
  },
  breadcrumbInner: {
    maxWidth: "var(--content-max-width)",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    gap: "var(--space-2)",
  },
  breadLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    fontSize: 13,
    fontWeight: 600,
    color: "var(--color-text-link)",
    textDecoration: "none",
  },
  breadCurrent: {
    fontSize: 13,
    color: "var(--color-text-muted)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
    maxWidth: 300,
  },
  twoCol: {
    maxWidth: "var(--content-max-width)",
    margin: "0 auto",
    padding: "var(--space-8) var(--space-6) var(--space-16)",
    display: "grid",
    gridTemplateColumns: "1fr 420px",
    gap: "var(--space-8)",
    alignItems: "start",
  },
  galleryCol: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "var(--space-4)",
    minWidth: 0,
  },
  mainImgWrap: {
    position: "relative",
    height: 500,
    borderRadius: "var(--radius-xl)",
    overflow: "hidden",
    background: "var(--neutral-950)",
    boxShadow: "var(--shadow-lg)",
  },
  mainImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    display: "block",
  },
  imgOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to bottom, rgba(8,23,46,0.3) 0%, transparent 35%, transparent 60%, rgba(8,23,46,0.4) 100%)",
    pointerEvents: "none",
  },
  locationPill: {
    position: "absolute",
    top: 16,
    left: 16,
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "7px 14px",
    borderRadius: "var(--radius-pill)",
    background: "rgba(255,255,255,0.14)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "white",
    fontSize: 13,
    fontWeight: 600,
    boxShadow: "var(--shadow-sm)",
  },
  imgSaveBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 38,
    height: 38,
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "var(--shadow-md)",
    fontFamily: "inherit",
    transition: "all 0.2s",
  },
  arrowBtn: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: 48,
    height: 48,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.88)",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "var(--shadow-md)",
    color: "var(--neutral-950)",
    fontFamily: "inherit",
    zIndex: 5,
    transition: "all 0.2s var(--motion-easing-spring)",
  },
  photoCounter: {
    position: "absolute",
    bottom: 16,
    right: 16,
    padding: "5px 12px",
    borderRadius: "var(--radius-pill)",
    background: "rgba(0,0,0,0.55)",
    backdropFilter: "blur(8px)",
    color: "white",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.5px",
  },
  thumbRow: {
    display: "flex",
    gap: "var(--space-3)",
    overflowX: "auto" as const,
  },
  thumb: {
    width: 90,
    height: 64,
    flexShrink: 0,
    borderRadius: "var(--radius-md)",
    overflow: "hidden",
    cursor: "pointer",
    border: "2.5px solid",
    transition: "all 0.2s var(--motion-easing-spring)",
    padding: 0,
    background: "none",
    position: "relative" as const,
  },
  viewAllOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.55)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.3px",
  },
  descCard: {
    borderRadius: "var(--radius-xl)",
    border: "1px solid var(--color-border-default)",
    background: "var(--color-surface-default)",
    padding: "var(--space-6)",
    boxShadow: "var(--shadow-sm)",
  },
  cardHeading: {
    fontSize: 17,
    fontWeight: 700,
    color: "var(--color-text-primary)",
    letterSpacing: "-0.2px",
    marginBottom: "var(--space-4)",
  },
  descText: {
    fontSize: 15,
    lineHeight: "26px",
    color: "var(--color-text-secondary)",
    margin: 0,
  },
  amenGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "var(--space-3)",
  },
  amenChip: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 14px",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--color-border-default)",
    fontSize: 13,
    fontWeight: 600,
    color: "var(--color-text-primary)",
    background: "var(--color-bg-subtle)",
  },
  amenDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "var(--color-brand-secondary)",
    flexShrink: 0,
  },
  detailsCol: {
    position: "sticky",
    top: 80,
    display: "flex",
    flexDirection: "column" as const,
    gap: "var(--space-4)",
  },
  tabRow: {
    display: "flex",
    gap: "var(--space-1)",
    background: "var(--color-bg-subtle)",
    borderRadius: "var(--radius-pill)",
    padding: 4,
    border: "1px solid var(--color-border-default)",
    alignSelf: "flex-start" as const,
  },
  tabBtn: {
    padding: "8px 18px",
    borderRadius: "var(--radius-pill)",
    border: "none",
    cursor: "pointer",
    fontSize: 13,
    transition: "all 0.2s var(--motion-easing-spring)",
    fontFamily: "inherit",
  },
  statusRow: {
    display: "flex",
    alignItems: "center",
    gap: 7,
  },
  statusDot: {
    width: 9,
    height: 9,
    borderRadius: "50%",
    background: "var(--color-status-success)",
    boxShadow: "0 0 6px rgba(21,128,61,0.5)",
  },
  statusText: {
    fontSize: 13,
    fontWeight: 600,
    color: "var(--color-status-success)",
  },
  priceBlock: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 4,
  },
  priceRow: {
    display: "flex",
    alignItems: "baseline",
    gap: "var(--space-3)",
    flexWrap: "wrap" as const,
  },
  bigPrice: {
    fontSize: 36,
    fontWeight: 800,
    color: "var(--color-brand-secondary)",
    letterSpacing: "-0.8px",
    lineHeight: 1.1,
  },
  priceDrop: {
    display: "inline-flex",
    alignItems: "center",
    padding: "4px 10px",
    borderRadius: "var(--radius-pill)",
    background: "var(--teal-050)",
    color: "var(--teal-700)",
    fontSize: 12,
    fontWeight: 700,
    border: "1px solid var(--teal-200)",
  },
  priceMonthly: {
    fontSize: 14,
    color: "var(--color-text-muted)",
    margin: 0,
  },
  specsRow: {
    display: "flex",
    gap: "var(--space-2)",
    flexWrap: "wrap" as const,
  },
  specChip: {
    display: "flex",
    alignItems: "center",
    gap: 7,
    padding: "8px 14px",
    borderRadius: "var(--radius-pill)",
    background: "var(--color-bg-subtle)",
    border: "1px solid var(--color-border-default)",
    fontSize: 13,
    fontWeight: 600,
    color: "var(--color-text-primary)",
  },
  specLabel: { fontSize: 13, fontWeight: 600 },
  addressRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "10px 14px",
    borderRadius: "var(--radius-md)",
    background: "var(--color-bg-subtle)",
    border: "1.5px solid var(--color-border-default)",
    cursor: "pointer",
    width: "100%",
    fontFamily: "inherit",
    transition: "all 0.18s var(--motion-easing-spring)",
    textAlign: "left" as const,
  },
  addressText: { fontSize: 13, color: "var(--color-text-secondary)", fontWeight: 500, flex: 1 },
  addressMapHint: {
    display: "inline-flex",
    alignItems: "center",
    fontSize: 11,
    fontWeight: 700,
    color: "var(--color-brand-primary)",
    letterSpacing: "0.2px",
    whiteSpace: "nowrap" as const,
    opacity: 0.9,
  },
  communityRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    marginTop: -8,
  },
  communityText: { fontSize: 13, color: "var(--color-text-muted)", fontWeight: 500 },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "var(--space-3)",
  },
  detailCell: {
    padding: "var(--space-3) var(--space-4)",
    borderRadius: "var(--radius-md)",
    background: "var(--color-bg-subtle)",
    border: "1px solid var(--color-border-default)",
  },
  detailCellLabel: { fontSize: 11, color: "var(--color-text-muted)", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.5px", margin: "0 0 2px" },
  detailCellValue: { fontSize: 14, color: "var(--color-text-primary)", fontWeight: 700, margin: 0 },
  ctaRow: {
    display: "flex",
    gap: "var(--space-3)",
  },
  ctaPrimary: {
    flex: 1,
    padding: "13px 20px",
    borderRadius: "var(--radius-lg)",
    background: "var(--neutral-950)",
    color: "white",
    fontSize: 14,
    fontWeight: 700,
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--space-2)",
    fontFamily: "inherit",
    transition: "all 0.2s",
  },
  ctaSecondary: {
    flex: 1,
    padding: "12px 20px",
    borderRadius: "var(--radius-lg)",
    background: "transparent",
    color: "var(--color-text-primary)",
    fontSize: 14,
    fontWeight: 700,
    border: "2px solid var(--color-border-strong)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--space-2)",
    fontFamily: "inherit",
    transition: "all 0.2s",
  },
  ownerCard: {
    borderRadius: "var(--radius-xl)",
    border: "1px solid var(--color-border-default)",
    background: "var(--color-surface-default)",
    padding: "var(--space-4)",
    display: "flex",
    alignItems: "center",
    gap: "var(--space-3)",
    boxShadow: "var(--shadow-sm)",
  },
  ownerAvatar: {
    width: 48,
    height: 48,
    borderRadius: "50%",
    background: "linear-gradient(135deg, var(--blue-100), var(--teal-100))",
    color: "var(--color-brand-primary)",
    fontSize: 16,
    fontWeight: 800,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid var(--color-border-default)",
    flexShrink: 0,
    letterSpacing: "-0.3px",
  },
  ownerName: { fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)" },
  ownerRole: { fontSize: 12, color: "var(--color-text-muted)", margin: "2px 0 0" },
  callLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    padding: "7px 14px",
    borderRadius: "var(--radius-pill)",
    background: "var(--teal-050)",
    color: "var(--teal-800)",
    fontSize: 12,
    fontWeight: 700,
    border: "1.5px solid var(--teal-200)",
    textDecoration: "none",
    flexShrink: 0,
    transition: "all 0.15s",
  },
  tourCard: {
    borderRadius: "var(--radius-xl)",
    border: "1px solid var(--color-border-default)",
    background: "var(--color-surface-default)",
    padding: "var(--space-5)",
    boxShadow: "var(--shadow-sm)",
    display: "flex",
    flexDirection: "column" as const,
    gap: "var(--space-3)",
  },
  tourTitle: { fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)", margin: 0, letterSpacing: "-0.1px" },
  tourSub: { fontSize: 12, color: "var(--color-text-muted)", margin: "-4px 0 0" },
  tourDates: { display: "flex", gap: "var(--space-2)", flexWrap: "wrap" as const },
  dateChip: {
    padding: "8px 14px",
    borderRadius: "var(--radius-md)",
    border: "1.5px solid",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.15s var(--motion-easing-spring)",
    fontFamily: "inherit",
  },
  tourBtn: {
    width: "100%",
    padding: "12px",
    borderRadius: "var(--radius-lg)",
    background: "var(--neutral-950)",
    color: "white",
    fontSize: 14,
    fontWeight: 700,
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--space-2)",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.2s",
  },
  safetyNote: {
    display: "flex",
    gap: "var(--space-2)",
    alignItems: "flex-start",
    fontSize: 12,
    lineHeight: "18px",
    color: "var(--color-text-muted)",
    padding: "var(--space-4)",
    borderRadius: "var(--radius-lg)",
    background: "#FFFBEB",
    border: "1px solid #FDE68A",
  },
};

/* ══════════════════════════════════════════ */
/* MAP MODAL STYLES                           */
/* ══════════════════════════════════════════ */

const m: Record<string, React.CSSProperties> = {
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(15,23,36,0.65)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    zIndex: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "var(--space-6)",
  },
  panel: {
    width: "100%",
    maxWidth: 680,
    background: "var(--color-surface-default)",
    borderRadius: "var(--radius-2xl)",
    boxShadow: "var(--shadow-xl)",
    overflow: "hidden",
    border: "1px solid var(--color-border-default)",
    display: "flex",
    flexDirection: "column" as const,
    maxHeight: "calc(100vh - 80px)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "var(--space-4) var(--space-5)",
    borderBottom: "1px solid var(--color-border-default)",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-3)",
  },
  headerIcon: {
    width: 36,
    height: 36,
    borderRadius: "var(--radius-md)",
    background: "var(--color-surface-brand-soft)",
    border: "1px solid var(--blue-100)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: "var(--color-text-primary)",
    margin: 0,
    letterSpacing: "-0.1px",
  },
  headerAddr: {
    fontSize: 12,
    color: "var(--color-text-muted)",
    margin: "2px 0 0",
  },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    background: "var(--color-bg-subtle)",
    border: "1.5px solid var(--color-border-default)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--color-text-secondary)",
    flexShrink: 0,
    fontFamily: "inherit",
    transition: "all 0.15s",
  },
  mapWrap: {
    position: "relative",
    flex: 1,
    minHeight: 360,
    background: "var(--color-bg-subtle)",
    overflow: "hidden",
  },
  iframe: {
    width: "100%",
    height: "100%",
    minHeight: 360,
    border: "none",
    display: "block",
    filter: "saturate(0.9) brightness(1.02)",
  },
  pinOverlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -100%)",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: 4,
    pointerEvents: "none",
    zIndex: 2,
  },
  pin: {
    width: 42,
    height: 42,
    borderRadius: "50% 50% 50% 0",
    background: "var(--color-brand-primary)",
    transform: "rotate(-45deg)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 16px rgba(33,98,163,0.45)",
    border: "3px solid white",
  },
  pinLabel: {
    padding: "5px 12px",
    borderRadius: "var(--radius-pill)",
    background: "var(--neutral-950)",
    color: "white",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.3px",
    boxShadow: "var(--shadow-md)",
    whiteSpace: "nowrap" as const,
    marginTop: 6,
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "var(--space-3) var(--space-5)",
    borderTop: "1px solid var(--color-border-default)",
    background: "var(--color-bg-subtle)",
    gap: "var(--space-3)",
    flexWrap: "wrap" as const,
  },
  footerAddr: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    fontSize: 13,
    color: "var(--color-text-secondary)",
    fontWeight: 500,
    flex: 1,
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
  },
  gmapsBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "9px 18px",
    borderRadius: "var(--radius-pill)",
    background: "var(--color-brand-primary)",
    color: "white",
    fontSize: 13,
    fontWeight: 700,
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    flexShrink: 0,
    transition: "all 0.15s",
    boxShadow: "var(--shadow-sm)",
  },
};
