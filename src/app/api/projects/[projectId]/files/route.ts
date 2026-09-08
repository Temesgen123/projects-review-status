import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const body = await request.json();
    const { path } = body;

    if (!path || typeof path !== "string" || !path.trim()) {
      return NextResponse.json({ error: "File path is required" }, { status: 400 });
    }

    const file = await db.file.create({
      data: {
        path: path.trim(),
        projectId: params.projectId,
      },
    });

    return NextResponse.json(file, { status: 201 });
  } catch (error) {
    console.error("POST /api/projects/[projectId]/files error:", error);
    return NextResponse.json({ error: "Failed to create file" }, { status: 500 });
  }
}
