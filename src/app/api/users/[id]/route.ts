import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(request: NextRequest, {params}: {params: {id: string}}) {
  const { id } = params;
  const { name } = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      {
        status: 404
      }
    );
  }

  await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
    },
  });

  return NextResponse.json({ message: 'Update user', });
}

export async function DELETE(request: NextRequest, {params}: {params: {id: string}}) {
  const { id } = params;

  const user = await prisma.user.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      {
        status: 404
      }
    );
  }

  await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      is_deleted: true,
    },
  });

  return NextResponse.json({ message: 'Delete user', });
}