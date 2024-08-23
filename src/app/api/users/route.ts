import { NextRequest, NextResponse } from "next/server";
import { create, list } from "app/repository/user";

export async function GET() {
  const users = await list();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const { name, email } = await req.json();

  await create({
    name,
    email,
  });

  return NextResponse.json({ message: "Create user" });
}
