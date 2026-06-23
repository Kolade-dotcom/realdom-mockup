interface VerifiedBadgeProps {
  status?: "verified" | "pending" | "rejected";
  size?: "sm" | "md";
}

export default function VerifiedBadge({ status = "verified", size = "sm" }: VerifiedBadgeProps) {
  const colors = {
    verified: { bg: "var(--color-status-verified-bg)", text: "var(--color-status-verified-text)", border: "var(--color-status-verified-border)" },
    pending: { bg: "var(--color-bg-subtle)", text: "var(--color-text-secondary)", border: "var(--color-border-default)" },
    rejected: { bg: "#FEF2F2", text: "var(--color-status-danger)", border: "#FECACA" },
  };

  const labels = { verified: "Verified", pending: "Pending", rejected: "Unverified" };
  const c = colors[status];
  const isSm = size === "sm";
  const iconSize = isSm ? 12 : 16;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: isSm ? 4 : 6,
        padding: isSm ? "3px 10px" : "5px 14px",
        borderRadius: "var(--radius-pill)",
        background: c.bg,
        color: c.text,
        border: `1px solid ${c.border}`,
        fontSize: isSm ? 11 : 13,
        fontWeight: 600,
        lineHeight: isSm ? "18px" : "22px",
        letterSpacing: "0.2px",
      }}
    >
      <svg width={iconSize} height={iconSize} viewBox="0 0 16 16" fill="none">
        {status === "verified" ? (
          <>
            <path d="M8 1L10.5 4.5L14.5 5.5L12 9L12.5 13L8 11.5L3.5 13L4 9L1.5 5.5L5.5 4.5L8 1Z" fill="currentColor" opacity="0.15" />
            <path d="M8 1L10.5 4.5L14.5 5.5L12 9L12.5 13L8 11.5L3.5 13L4 9L1.5 5.5L5.5 4.5L8 1Z" stroke="currentColor" strokeWidth="1" fill="none" />
            <polyline points="5.5 8 7 9.5 10.5 6" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </>
        ) : (
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
        )}
      </svg>
      {labels[status]}
    </span>
  );
}
