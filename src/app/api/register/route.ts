import { create } from "app/repository/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, password, passwordConfirm } = await req.json();

  await create({
    name,
    email,
    password,
    passwordConfirm,
  });

  return NextResponse.json({ message: "Create user" });
}
