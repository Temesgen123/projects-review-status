type Color = "default" | "green" | "blue" | "purple";

interface StatBadgeProps {
  label: string;
  value: number;
  total: number;
  color?: Color;
}

const colorMap: Record<Color, { bg: string; text: string; label: string }> = {
  default: { bg: "#F1F5F9", text: "#475569", label: "#64748B" },
  green:   { bg: "#F0FDF4", text: "#16A34A", label: "#16A34A" },
  blue:    { bg: "#EFF6FF", text: "#2563EB", label: "#2563EB" },
  purple:  { bg: "#FAF5FF", text: "#7C3AED", label: "#7C3AED" },
};

export default function StatBadge({ label, value, total, color = "default" }: StatBadgeProps) {
  const c = colorMap[color];
  return (
    <div
      style={{
        padding: "6px 16px",
        borderRadius: 8,
        background: c.bg,
        display: "flex",
        alignItems: "center",
        gap: 6,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ fontSize: 13, color: c.label, fontWeight: 500 }}>{label}:</span>
      <span style={{ fontSize: 13, color: c.text, fontWeight: 700 }}>
        {value}/{total}
      </span>
    </div>
  );
}
