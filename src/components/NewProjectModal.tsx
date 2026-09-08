"use client";

import { useState } from "react";

interface NewProjectModalProps {
  onClose: () => void;
  onCreate: (name: string, description: string) => Promise<void>;
}

export default function NewProjectModal({ onClose, onCreate }: NewProjectModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    if (!name.trim() || loading) return;
    setLoading(true);
    try {
      await onCreate(name.trim(), description.trim());
      onClose();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        backdropFilter: "blur(2px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "white",
          borderRadius: 16,
          padding: 32,
          width: 440,
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 700, color: "#1E293B" }}>
          New project
        </h2>
        <p style={{ margin: "0 0 24px", fontSize: 14, color: "#64748B" }}>
          Create a project to start tracking file review status.
        </p>

        <label style={{ display: "block", marginBottom: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>
            Project name *
          </span>
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            placeholder="e.g. NextShop, Admin Dashboard…"
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: 8,
              border: "1.5px solid #E2E8F0",
              fontSize: 14,
              color: "#1E293B",
              outline: "none",
            }}
          />
        </label>

        <label style={{ display: "block", marginBottom: 28 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>
            Description (optional)
          </span>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description of the project"
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: 8,
              border: "1.5px solid #E2E8F0",
              fontSize: 14,
              color: "#1E293B",
              outline: "none",
            }}
          />
        </label>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            style={{
              padding: "9px 20px",
              borderRadius: 8,
              border: "1.5px solid #E2E8F0",
              background: "white",
              fontSize: 14,
              fontWeight: 500,
              color: "#475569",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!name.trim() || loading}
            style={{
              padding: "9px 22px",
              borderRadius: 8,
              border: "none",
              background: name.trim() && !loading ? "#3B6FE8" : "#CBD5E1",
              color: "white",
              cursor: name.trim() && !loading ? "pointer" : "not-allowed",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            {loading ? "Creating…" : "Create project"}
          </button>
        </div>
      </div>
    </div>
  );
}
