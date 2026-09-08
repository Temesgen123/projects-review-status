import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;
    const project = await db.project.findUnique({
      where: { id: projectId },
      include: { files: { orderBy: { createdAt: "asc" } } },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("GET /api/projects/[projectId] error:", error);
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;
    const body = await request.json();
    const { name, description } = body;

    const project = await db.project.update({
      where: { id: projectId },
      data: {
        ...(name !== undefined && { name: name.trim() }),
        ...(description !== undefined && { description: description?.trim() || null }),
      },
      include: { files: { orderBy: { createdAt: "asc" } } },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("PATCH /api/projects/[projectId] error:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;
    await db.project.delete({ where: { id: projectId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/projects/[projectId] error:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
