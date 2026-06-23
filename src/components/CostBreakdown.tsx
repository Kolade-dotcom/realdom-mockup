interface CostBreakdownProps {
  annualRent: string;
  legalFee: string;
  cautionFee: string;
  serviceFee: string;
  total: string;
}

export default function CostBreakdown({
  annualRent,
  legalFee,
  cautionFee,
  serviceFee,
  total,
}: CostBreakdownProps) {
  const rows = [
    { label: "Annual Rent", value: annualRent, icon: "🏠" },
    { label: "Legal Fee (10%)", value: legalFee, icon: "📋" },
    { label: "Caution Fee", value: cautionFee, icon: "🔒" },
    { label: "Service Fee", value: serviceFee, icon: "⚙️" },
  ];

  return (
    <div style={styles.wrap}>
      <div style={styles.header}>
        <div>
          <h3 style={styles.heading}>Move-in Cost Breakdown</h3>
          <p style={styles.subheading}>Complete transparent pricing — no hidden fees</p>
        </div>
        <div style={styles.headerIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-primary)" strokeWidth="2">
            <rect x="2" y="3" width="20" height="18" rx="2" />
            <line x1="2" y1="9" x2="22" y2="9" />
            <line x1="9" y1="21" x2="9" y2="9" />
          </svg>
        </div>
      </div>

      <div style={styles.table}>
        {rows.map((row, i) => (
          <div key={row.label} style={{ ...styles.row, ...(i === 0 ? styles.firstRow : {}) }}>
            <div style={styles.rowLeft}>
              <span style={styles.rowIcon}>{row.icon}</span>
              <span style={styles.label}>{row.label}</span>
            </div>
            <span style={styles.value}>{row.value}</span>
          </div>
        ))}
      </div>

      <div style={styles.totalRow}>
        <div style={styles.rowLeft}>
          <div style={styles.totalIcon}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-primary)" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span style={styles.totalLabel}>Total Move-in</span>
        </div>
        <span style={styles.totalValue}>{total}</span>
      </div>

      <div style={styles.noteWrap}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <p style={styles.note}>All fees are one-time except annual rent. Fees shown are estimates.</p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    borderRadius: "var(--radius-xl)",
    border: "1px solid var(--color-border-default)",
    padding: "var(--space-6)",
    background: "var(--color-surface-default)",
    boxShadow: "var(--shadow-sm)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "var(--space-5)",
  },
  heading: {
    fontSize: 18,
    fontWeight: 600,
    color: "var(--color-text-primary)",
    marginBottom: 2,
  },
  subheading: {
    fontSize: 13,
    color: "var(--color-text-muted)",
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: "var(--radius-md)",
    background: "var(--color-surface-brand-soft)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  table: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--color-border-default)",
    overflow: "hidden",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "var(--space-3) var(--space-4)",
    borderBottom: "1px solid var(--color-border-default)",
    background: "var(--color-surface-default)",
  },
  firstRow: {},
  rowLeft: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-3)",
  },
  rowIcon: {
    fontSize: 16,
    width: 28,
    height: 28,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "var(--radius-sm)",
    background: "var(--color-bg-subtle)",
  },
  label: {
    fontSize: 14,
    color: "var(--color-text-secondary)",
  },
  value: {
    fontSize: 14,
    fontWeight: 600,
    color: "var(--color-text-primary)",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "var(--space-4) var(--space-4)",
    marginTop: "var(--space-3)",
    borderRadius: "var(--radius-md)",
    background: "var(--color-surface-brand-soft)",
    border: "1px solid var(--blue-100)",
  },
  totalIcon: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    background: "var(--color-brand-primary)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: 700,
    color: "var(--color-text-primary)",
  },
  totalValue: {
    fontSize: 22,
    fontWeight: 700,
    color: "var(--color-brand-primary)",
    letterSpacing: "-0.3px",
  },
  noteWrap: {
    display: "flex",
    alignItems: "flex-start",
    gap: "var(--space-2)",
    marginTop: "var(--space-4)",
  },
  note: {
    fontSize: 12,
    color: "var(--color-text-muted)",
    lineHeight: "18px",
  },
};
