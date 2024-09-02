import { create } from "app/repository/user";
import { sendVerificationEmail } from "app/service/email/verify";
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
  sendVerificationEmail(name, email);

  return NextResponse.json({ message: "Create user" });
}
