export default function TrustStrip() {
  const items = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--teal-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      ),
      label: "Verified Landlords",
      desc: "Every landlord is ID-verified before listing",
      count: "2,841",
      countLabel: "verified",
      accentBg: "var(--teal-050)",
      accentBorder: "var(--teal-200)",
      accentText: "var(--teal-700)",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--blue-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="18" rx="2" />
          <line x1="2" y1="9" x2="22" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      ),
      label: "Transparent Pricing",
      desc: "Full cost breakdown upfront, no surprises",
      count: "0",
      countLabel: "hidden fees",
      accentBg: "var(--blue-050)",
      accentBorder: "var(--blue-100)",
      accentText: "var(--blue-700)",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--teal-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
        </svg>
      ),
      label: "Direct Contact",
      desc: "No agents — talk directly with property owners",
      count: "15K+",
      countLabel: "happy renters",
      accentBg: "var(--teal-050)",
      accentBorder: "var(--teal-200)",
      accentText: "var(--teal-700)",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--blue-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
      ),
      label: "Secure Platform",
      desc: "Safe & moderated marketplace for all users",
      count: "98%",
      countLabel: "satisfaction",
      accentBg: "var(--blue-050)",
      accentBorder: "var(--blue-100)",
      accentText: "var(--blue-700)",
    },
  ];

  return (
    <section style={styles.section}>
      <div style={styles.inner}>
        <div style={styles.grid}>
          {items.map((item, i) => (
            <div
              key={item.label}
              className={`trust-item animate-fade-in-up stagger-${i + 1}`}
              style={styles.item}
            >
              <div
                style={{
                  ...styles.iconWrap,
                  background: item.accentBg,
                  border: `1.5px solid ${item.accentBorder}`,
                }}
              >
                {item.icon}
              </div>
              <div style={styles.textCol}>
                <div style={styles.topRow}>
                  <p style={styles.label}>{item.label}</p>
                  <span
                    style={{
                      ...styles.countBadge,
                      background: item.accentBg,
                      color: item.accentText,
                      borderColor: item.accentBorder,
                    }}
                  >
                    {item.count} {item.countLabel}
                  </span>
                </div>
                <p style={styles.desc}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    padding: "var(--space-8) var(--space-6)",
    background: "var(--color-surface-default)",
    borderTop: "1px solid var(--color-border-default)",
    borderBottom: "1px solid var(--color-border-default)",
  },
  inner: {
    maxWidth: "var(--content-max-width)",
    margin: "0 auto",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "var(--space-4)",
  },
  item: {
    display: "flex",
    alignItems: "flex-start",
    gap: "var(--space-4)",
    padding: "var(--space-5)",
    borderRadius: "var(--radius-xl)",
    border: "1px solid var(--color-border-default)",
    background: "var(--color-surface-default)",
    cursor: "default",
    boxShadow: "var(--shadow-xs)",
    transition: "all 0.25s var(--motion-easing-emphasized)",
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: "var(--radius-lg)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  textCol: {
    flex: 1,
    minWidth: 0,
  },
  topRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "var(--space-2)",
    marginBottom: 5,
    flexWrap: "wrap",
  },
  label: {
    fontSize: 15,
    fontWeight: 700,
    color: "var(--color-text-primary)",
    lineHeight: "22px",
    margin: 0,
  },
  countBadge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "2px 10px",
    borderRadius: "var(--radius-pill)",
    fontSize: 11,
    fontWeight: 700,
    border: "1px solid",
    whiteSpace: "nowrap",
  },
  desc: {
    fontSize: 13,
    color: "var(--color-text-secondary)",
    lineHeight: "20px",
    margin: 0,
  },
};
