"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Project, ProjectFile } from "@/types";
import FileRow from "./FileRow";
import StatBadge from "./StatBadge";
import { IconBack, IconPlus } from "./Icons";

interface Props {
  initialProject: Project;
}

export default function ProjectDetailClient({ initialProject }: Props) {
  const router = useRouter();
  const [project, setProject] = useState<Project>(initialProject);
  const [filter, setFilter] = useState("");
  const [newPath, setNewPath] = useState("");
  const [adding, setAdding] = useState(false);

  const files = project.files ?? [];

  const filtered = useMemo(() => {
    if (!filter.trim()) return files;
    const q = filter.toLowerCase();
    return files.filter((f) => f.path.toLowerCase().includes(q));
  }, [files, filter]);

  const total = files.length;
  const tested = files.filter((f) => f.tested).length;
  const cleaned = files.filter((f) => f.cleaned).length;
  const reviewed = files.filter((f) => f.reviewed).length;

  async function handleAddFile() {
    const path = newPath.trim();
    if (!path || adding) return;
    setAdding(true);
    try {
      const res = await fetch(`/api/projects/${project.id}/files`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path }),
      });
      if (!res.ok) throw new Error("Failed to add file");
      const file: ProjectFile = await res.json();
      setProject((prev) => ({ ...prev, files: [...(prev.files ?? []), file] }));
      setNewPath("");
    } finally {
      setAdding(false);
    }
  }

  const handleUpdateFile = useCallback(
    async (id: string, patch: Partial<ProjectFile>) => {
      // Optimistic update
      setProject((prev) => ({
        ...prev,
        files: prev.files.map((f) => (f.id === id ? { ...f, ...patch } : f)),
      }));
      await fetch(`/api/files/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
    },
    []
  );

  async function handleDeleteFile(id: string) {
    setProject((prev) => ({
      ...prev,
      files: prev.files.filter((f) => f.id !== id),
    }));
    await fetch(`/api/files/${id}`, { method: "DELETE" });
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>

        {/* Header card */}
        <div
          style={{
            background: "white",
            border: "1px solid #E2E8F0",
            borderRadius: 16,
            padding: "24px 28px",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <button
                onClick={() => router.push("/")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#64748B",
                  fontSize: 13,
                  fontWeight: 500,
                  padding: 0,
                  marginBottom: 10,
                }}
              >
                <IconBack /> All projects
              </button>
              <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "#1E293B" }}>
                {project.name}{" "}
                <span style={{ fontSize: 16, color: "#94A3B8", fontWeight: 500 }}>
                  File Development Tracker
                </span>
              </h1>
              {project.description && (
                <p style={{ margin: "4px 0 0", fontSize: 14, color: "#94A3B8" }}>
                  {project.description}
                </p>
              )}
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <StatBadge label="Total" value={total} total={total} color="default" />
              <StatBadge label="Tested" value={tested} total={total} color="green" />
              <StatBadge label="Cleaned" value={cleaned} total={total} color="blue" />
              <StatBadge label="Reviewed" value={reviewed} total={total} color="purple" />
            </div>
          </div>
        </div>

        {/* Filter + Add row */}
        <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter by path or directory…"
            style={{
              flex: 1,
              minWidth: 200,
              padding: "10px 16px",
              borderRadius: 10,
              border: "1.5px solid #E2E8F0",
              fontSize: 14,
              color: "#1E293B",
              background: "white",
              outline: "none",
            }}
          />
          <input
            value={newPath}
            onChange={(e) => setNewPath(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddFile()}
            placeholder="e.g. app/components/new-widget.tsx"
            style={{
              flex: 2,
              minWidth: 260,
              padding: "10px 16px",
              borderRadius: 10,
              border: "1.5px solid #E2E8F0",
              fontSize: 14,
              color: "#1E293B",
              background: "white",
              outline: "none",
            }}
          />
          <button
            onClick={handleAddFile}
            disabled={!newPath.trim() || adding}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "10px 22px",
              borderRadius: 10,
              border: "none",
              background: newPath.trim() && !adding ? "#1E293B" : "#CBD5E1",
              color: "white",
              fontSize: 14,
              fontWeight: 600,
              whiteSpace: "nowrap",
              cursor: newPath.trim() && !adding ? "pointer" : "not-allowed",
            }}
          >
            <IconPlus /> Add File
          </button>
        </div>

        {/* Table */}
        <div
          style={{
            background: "white",
            border: "1px solid #E2E8F0",
            borderRadius: 14,
            overflow: "hidden",
          }}
        >
          {/* Table header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 90px 90px 100px 1fr 44px",
              padding: "12px 20px",
              borderBottom: "1px solid #F1F5F9",
              background: "#FAFBFC",
            }}
          >
            {["File Path", "Tested", "Cleaned", "Reviewed", "Notes", ""].map((h, i) => (
              <span
                key={i}
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#94A3B8",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  textAlign: i >= 1 && i <= 3 ? "center" : "left",
                }}
              >
                {h}
              </span>
            ))}
          </div>

          {filtered.length === 0 && (
            <div
              style={{
                padding: "48px 24px",
                textAlign: "center",
                color: "#94A3B8",
                fontSize: 14,
              }}
            >
              {files.length === 0
                ? "No files yet — add a file path above to start tracking."
                : "No files match your filter."}
            </div>
          )}

          {filtered.map((file, idx) => (
            <FileRow
              key={file.id}
              file={file}
              isLast={idx === filtered.length - 1}
              onUpdate={handleUpdateFile}
              onDelete={handleDeleteFile}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
