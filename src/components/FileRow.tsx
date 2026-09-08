"use client";

import { useState, useCallback } from "react";
import { ProjectFile } from "@/types";
import Checkbox from "./Checkbox";
import { IconX } from "./Icons";

interface FileRowProps {
  file: ProjectFile;
  isLast: boolean;
  onUpdate: (id: string, patch: Partial<ProjectFile>) => void;
  onDelete: (id: string) => void;
}

function renderPath(path: string) {
  const idx = path.lastIndexOf("/");
  if (idx === -1) {
    return (
      <span style={{ fontWeight: 700, color: "#1E293B", fontFamily: "ui-monospace, monospace" }}>
        {path}
      </span>
    );
  }
  return (
    <>
      <span style={{ color: "#64748B", fontFamily: "ui-monospace, monospace" }}>
        {path.slice(0, idx + 1)}
      </span>
      <span style={{ fontWeight: 700, color: "#1E293B", fontFamily: "ui-monospace, monospace" }}>
        {path.slice(idx + 1)}
      </span>
    </>
  );
}

export default function FileRow({ file, isLast, onUpdate, onDelete }: FileRowProps) {
  const [notes, setNotes] = useState(file.notes);
  const [savingNotes, setSavingNotes] = useState(false);

  const handleCheckbox = useCallback(
    (field: "tested" | "cleaned" | "reviewed") => {
      onUpdate(file.id, { [field]: !file[field] });
    },
    [file, onUpdate]
  );

  async function handleNotesBlur() {
    if (notes === file.notes) return;
    setSavingNotes(true);
    await fetch(`/api/files/${file.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes }),
    });
    setSavingNotes(false);
    onUpdate(file.id, { notes });
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 90px 90px 100px 1fr 44px",
        padding: "14px 20px",
        alignItems: "center",
        borderBottom: isLast ? "none" : "1px solid #F1F5F9",
        background: "white",
        transition: "background 0.1s",
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.background = "#FAFBFC")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.background = "white")}
    >
      <div style={{ fontSize: 13 }}>{renderPath(file.path)}</div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Checkbox checked={file.tested} onChange={() => handleCheckbox("tested")} />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Checkbox checked={file.cleaned} onChange={() => handleCheckbox("cleaned")} />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Checkbox checked={file.reviewed} onChange={() => handleCheckbox("reviewed")} />
      </div>

      <div style={{ position: "relative" }}>
        <input
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onBlur={handleNotesBlur}
          placeholder="Add notes…"
          style={{
            width: "100%",
            padding: "7px 12px",
            borderRadius: 7,
            border: "1.5px solid #E2E8F0",
            fontSize: 13,
            color: "#475569",
            background: "#FAFBFC",
            outline: "none",
          }}
          onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "#3B6FE8")}
          onBlurCapture={(e) => ((e.target as HTMLInputElement).style.borderColor = "#E2E8F0")}
        />
        {savingNotes && (
          <span
            style={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: 10,
              color: "#94A3B8",
            }}
          >
            saving…
          </span>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={() => onDelete(file.id)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#CBD5E1",
            padding: 6,
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#EF4444")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#CBD5E1")}
        >
          <IconX />
        </button>
      </div>
    </div>
  );
}
