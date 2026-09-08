import { db } from "@/lib/db";
import { Project } from "@/types";
import ProjectsHomeClient from "@/components/ProjectsHomeClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const projects = await db.project.findMany({
    include: { files: true },
    orderBy: { createdAt: "desc" },
  });

  return <ProjectsHomeClient initialProjects={projects as unknown as Project[]} />;
}
