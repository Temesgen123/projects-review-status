"use client";

import { useState } from "react";
import { Project } from "@/types";
import ProjectCard from "./ProjectCard";
import NewProjectModal from "./NewProjectModal";
import { IconPlus } from "./Icons";

interface Props {
  initialProjects: Project[];
}

export default function ProjectsHomeClient({ initialProjects }: Props) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [showModal, setShowModal] = useState(false);

  async function handleCreate(name: string, description: string) {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });
    if (!res.ok) throw new Error("Failed to create project");
    const project: Project = await res.json();
    setProjects((prev) => [project, ...prev]);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project and all its files?")) return;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (!res.ok) return;
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  const totalFiles = projects.reduce((s, p) => s + (p.files?.length ?? 0), 0);

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 24px" }}>

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 32,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 30,
                fontWeight: 800,
                color: "#1E293B",
                letterSpacing: "-0.5px",
              }}
            >
              Review Tracker
            </h1>
            <p style={{ margin: "6px 0 0", fontSize: 15, color: "#94A3B8" }}>
              Monitor file-level test, clean, and review status across all your projects.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "11px 22px",
              borderRadius: 10,
              border: "none",
              background: "#1E293B",
              color: "white",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            <IconPlus /> New project
          </button>
        </div>

        {/* Summary */}
        {projects.length > 0 && (
          <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
            {[
              { label: "Projects", val: projects.length },
              { label: "Total files", val: totalFiles },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  padding: "8px 18px",
                  borderRadius: 8,
                  background: "#F1F5F9",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#1E293B",
                }}
              >
                {s.val}{" "}
                <span style={{ fontWeight: 400, color: "#94A3B8" }}>{s.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Grid or empty state */}
        {projects.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 24px",
              background: "white",
              borderRadius: 16,
              border: "1.5px dashed #E2E8F0",
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 16 }}>📁</div>
            <h2 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 700, color: "#1E293B" }}>
              No projects yet
            </h2>
            <p style={{ margin: "0 0 24px", color: "#94A3B8", fontSize: 15 }}>
              Create your first project to start tracking file review progress.
            </p>
            <button
              onClick={() => setShowModal(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "11px 24px",
                borderRadius: 10,
                border: "none",
                background: "#3B6FE8",
                color: "white",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              <IconPlus /> Create a project
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 16,
            }}
          >
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <NewProjectModal onClose={() => setShowModal(false)} onCreate={handleCreate} />
      )}
    </div>
  );
}
