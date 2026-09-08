"use client";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}

export default function Checkbox({ checked, onChange, disabled }: CheckboxProps) {
  return (
    <div
      onClick={disabled ? undefined : onChange}
      style={{
        width: 20,
        height: 20,
        border: checked ? "none" : "2px solid #CBD5E1",
        borderRadius: 4,
        background: checked ? "#3B6FE8" : "white",
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        transition: "all 0.15s",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {checked && (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M2 6l3 3 5-5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}
