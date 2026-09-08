"use client";

import { useRouter } from "next/navigation";
import { Project } from "@/types";
import { IconFolder, IconTrash } from "./Icons";

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
}

export default function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const router = useRouter();
  const files = project.files ?? [];
  const total = files.length;
  const tested = files.filter((f) => f.tested).length;
  const cleaned = files.filter((f) => f.cleaned).length;
  const reviewed = files.filter((f) => f.reviewed).length;
  const pct = total === 0 ? 0 : Math.round(((tested + cleaned + reviewed) / (total * 3)) * 100);

  return (
    <div
      style={{
        background: "white",
        border: "1px solid #E2E8F0",
        borderRadius: 14,
        padding: "22px 24px",
        cursor: "pointer",
        transition: "box-shadow 0.15s, transform 0.15s",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(59,111,232,0.10)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
      onClick={() => router.push(`/projects/${project.id}`)}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(project.id);
        }}
        style={{
          position: "absolute",
          top: 14,
          right: 14,
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#94A3B8",
          padding: 4,
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "color 0.15s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#EF4444")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#94A3B8")}
        title="Delete project"
      >
        <IconTrash />
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: "#EEF2FF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#3B6FE8",
          }}
        >
          <IconFolder />
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16, color: "#1E293B" }}>{project.name}</div>
          {project.description && (
            <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 1 }}>{project.description}</div>
          )}
        </div>
      </div>

      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
          <span style={{ fontSize: 12, color: "#64748B" }}>Overall progress</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#3B6FE8" }}>{pct}%</span>
        </div>
        <div style={{ height: 6, borderRadius: 99, background: "#EEF2FF" }}>
          <div
            style={{
              height: "100%",
              borderRadius: 99,
              width: `${pct}%`,
              background: "linear-gradient(90deg, #3B6FE8, #6B8FF5)",
              transition: "width 0.4s ease",
            }}
          />
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[
          { label: `${total} file${total !== 1 ? "s" : ""}`, bg: "#F1F5F9", color: "#475569" },
          { label: `${tested} tested`, bg: "#F0FDF4", color: "#16A34A" },
          { label: `${cleaned} cleaned`, bg: "#EFF6FF", color: "#2563EB" },
          { label: `${reviewed} reviewed`, bg: "#FAF5FF", color: "#7C3AED" },
        ].map((chip) => (
          <span
            key={chip.label}
            style={{
              fontSize: 12,
              background: chip.bg,
              borderRadius: 6,
              padding: "3px 10px",
              color: chip.color,
            }}
          >
            {chip.label}
          </span>
        ))}
      </div>
    </div>
  );
}
