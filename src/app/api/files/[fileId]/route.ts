import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ fileId: string }> }
) {
  try {
    const { fileId } = await params;
    const body = await request.json();
    const { tested, cleaned, reviewed, notes } = body;

    const file = await db.file.update({
      where: { id: fileId },
      data: {
        ...(tested !== undefined && { tested }),
        ...(cleaned !== undefined && { cleaned }),
        ...(reviewed !== undefined && { reviewed }),
        ...(notes !== undefined && { notes }),
      },
    });

    return NextResponse.json(file);
  } catch (error) {
    console.error("PATCH /api/files/[fileId] error:", error);
    return NextResponse.json({ error: "Failed to update file" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ fileId: string }> }
) {
  try {
    const { fileId } = await params;
    await db.file.delete({ where: { id: fileId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/files/[fileId] error:", error);
    return NextResponse.json({ error: "Failed to delete file" }, { status: 500 });
  }
}
