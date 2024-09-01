import { create } from "app/repository/user";
import { sendWelcomeEmail } from "app/service/email/welcome";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, password, passwordConfirm } = await req.json();

  await create({
    name,
    email,
    password,
    passwordConfirm,
  });

  sendWelcomeEmail(name, email);

  return NextResponse.json({ message: "Create user" });
}
