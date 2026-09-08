import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Project } from "@/types";
import ProjectDetailClient from "@/components/ProjectDetailClient";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ projectId: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { projectId } = await params;
  const project = await db.project.findUnique({
    where: { id: projectId },
  });
  return {
    title: project ? `${project.name} — Projects Review Status` : "Project Not Found",
  };
}

export default async function ProjectPage({ params }: Props) {
  const { projectId } = await params;
  const project = await db.project.findUnique({
    where: { id: projectId },
    include: { files: { orderBy: { createdAt: "asc" } } },
  });

  if (!project) notFound();

  return <ProjectDetailClient initialProject={project as unknown as Project} />;
}
