import Link from "next/link";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.inner}>
        <div style={styles.top} className="footer-top-grid">
          {/* Brand column */}
          <div style={styles.brandCol}>
            <Link href="/" style={styles.brandRow}>
              <div style={styles.logoIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 10.5L12 3L21 10.5V20C21 20.55 20.55 21 20 21H15V14H9V21H4C3.45 21 3 20.55 3 20V10.5Z"
                    fill="var(--color-brand-secondary)"
                  />
                </svg>
              </div>
              <span style={styles.brand}>RealDom.</span>
            </Link>
            <p style={styles.tagline}>
              Nigeria&apos;s verified rental marketplace — connecting renters
              directly with trusted landlords.
            </p>

            {/* Newsletter */}
            <div style={styles.newsletterWrap}>
              <p style={styles.newsletterLabel}>Get rental alerts</p>
              <div style={styles.newsletterRow} className="footer-newsletter-row">
                <input
                  type="email"
                  placeholder="your@email.com"
                  style={styles.newsletterInput}
                  className="footer-newsletter-input"
                />
                <button style={styles.newsletterBtn} className="footer-newsletter-btn">Subscribe</button>
              </div>
            </div>

            <div style={styles.socialRow}>
              {[
                {
                  label: "X / Twitter",
                  path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                  fill: true,
                },
                {
                  label: "Instagram",
                  svg: (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="5" />
                      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                    </svg>
                  ),
                },
                {
                  label: "LinkedIn",
                  path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                  fill: true,
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  style={styles.socialIcon}
                  aria-label={s.label}
                  className="social-icon"
                >
                  {s.svg ?? (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path d={s.path!} />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div style={styles.linksCol}>
            <h4 style={styles.colTitle}>For Renters</h4>
            <Link href="/" className="footer-link" style={styles.link}>Browse Listings</Link>
            <Link href="/profile" className="footer-link" style={styles.link}>Saved Properties</Link>
            <Link href="#" className="footer-link" style={styles.link}>How It Works</Link>
            <Link href="#" className="footer-link" style={styles.link}>Renter Guide</Link>
            <Link href="#" className="footer-link" style={styles.link}>Cost Calculator</Link>
          </div>

          <div style={styles.linksCol}>
            <h4 style={styles.colTitle}>For Landlords</h4>
            <Link href="#" className="footer-link" style={styles.link}>List Property</Link>
            <Link href="#" className="footer-link" style={styles.link}>Landlord Dashboard</Link>
            <Link href="#" className="footer-link" style={styles.link}>Verification Process</Link>
            <Link href="#" className="footer-link" style={styles.link}>Pricing Plans</Link>
            <Link href="#" className="footer-link" style={styles.link}>Landlord Guide</Link>
          </div>

          <div style={styles.linksCol}>
            <h4 style={styles.colTitle}>Company</h4>
            <Link href="#" className="footer-link" style={styles.link}>About Us</Link>
            <Link href="#" className="footer-link" style={styles.link}>Blog</Link>
            <Link href="#" className="footer-link" style={styles.link}>Contact</Link>
            <Link href="#" className="footer-link" style={styles.link}>Privacy Policy</Link>
            <Link href="#" className="footer-link" style={styles.link}>Terms of Service</Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={styles.bottom} className="footer-bottom">
          <div style={styles.bottomLeft} className="footer-bottom-left">
            <p style={styles.copy}>&copy; {new Date().getFullYear()} RealDom. All rights reserved.</p>
            <span style={styles.dotSep}>·</span>
            <p style={styles.copy}>Built with trust &amp; transparency.</p>
          </div>
          <div style={styles.bottomBadges} className="footer-bottom-badges">
            <span style={styles.securityBadge}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              SSL Secured
            </span>
            <span style={styles.securityBadge}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Verified Platform
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

const styles: Record<string, React.CSSProperties> = {
  footer: {
    borderTop: "1px solid var(--color-border-default)",
    background: "var(--color-surface-default)",
    marginTop: "auto",
  },
  inner: {
    maxWidth: "var(--content-max-width)",
    margin: "0 auto",
    padding: "var(--space-16) var(--space-6) var(--space-8)",
  },
  top: {
    display: "grid",
    gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
    gap: "var(--space-10)",
    marginBottom: "var(--space-12)",
  },
  brandCol: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-5)",
  },
  brandRow: {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--space-2)",
    textDecoration: "none",
  },
  logoIcon: {
    width: 34,
    height: 34,
    borderRadius: "var(--radius-md)",
    background: "var(--teal-050)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid var(--teal-200)",
  },
  brand: {
    fontSize: 19,
    fontWeight: 800,
    color: "var(--color-text-primary)",
    letterSpacing: "-0.4px",
  },
  tagline: {
    fontSize: 14,
    color: "var(--color-text-secondary)",
    lineHeight: "22px",
    maxWidth: 290,
    margin: 0,
  },
  newsletterWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-2)",
  },
  newsletterLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: "var(--color-text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    margin: 0,
  },
  newsletterRow: {
    display: "flex",
    gap: "var(--space-2)",
  },
  newsletterInput: {
    flex: 1,
    padding: "9px 14px",
    borderRadius: "var(--radius-md)",
    border: "1.5px solid var(--color-border-default)",
    fontSize: 13,
    fontFamily: "inherit",
    outline: "none",
    color: "var(--color-text-primary)",
    background: "var(--color-bg-subtle)",
    minWidth: 0,
  },
  newsletterBtn: {
    padding: "9px 16px",
    borderRadius: "var(--radius-md)",
    background: "var(--color-brand-secondary)",
    color: "white",
    fontSize: 13,
    fontWeight: 700,
    border: "none",
    cursor: "pointer",
    whiteSpace: "nowrap",
    flexShrink: 0,
    transition: "background 0.15s",
    fontFamily: "inherit",
  },
  socialRow: {
    display: "flex",
    gap: "var(--space-2)",
  },
  socialIcon: {
    width: 36,
    height: 36,
    borderRadius: "var(--radius-md)",
    background: "var(--color-bg-subtle)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--color-text-muted)",
    border: "1px solid var(--color-border-default)",
  },
  linksCol: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-3)",
  },
  colTitle: {
    fontSize: 12,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "var(--color-text-muted)",
    marginBottom: "var(--space-1)",
  },
  link: {
    fontSize: 14,
    color: "var(--color-text-secondary)",
    lineHeight: "22px",
    textDecoration: "none",
    display: "block",
    transition: "color 0.12s, transform 0.12s",
  },
  bottom: {
    borderTop: "1px solid var(--color-border-default)",
    paddingTop: "var(--space-6)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "var(--space-3)",
  },
  bottomLeft: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-2)",
    flexWrap: "wrap",
  },
  dotSep: {
    color: "var(--color-border-strong)",
    fontSize: 14,
  },
  copy: {
    fontSize: 13,
    color: "var(--color-text-muted)",
    margin: 0,
  },
  bottomBadges: {
    display: "flex",
    gap: "var(--space-2)",
  },
  securityBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    padding: "4px 12px",
    borderRadius: "var(--radius-pill)",
    fontSize: 11,
    fontWeight: 600,
    color: "var(--color-text-muted)",
    background: "var(--color-bg-subtle)",
    border: "1px solid var(--color-border-default)",
  },
};
