import { remove } from "app/repository/user";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  await remove(parseInt(id));

  return NextResponse.json({ message: "Delete user" });
}
