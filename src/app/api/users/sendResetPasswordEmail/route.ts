import { sendResetPasswordEmail } from "app/service/email/resetPassword";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email } = await req.json();

  await sendResetPasswordEmail(email);

  return NextResponse.json({ message: "Email sent" });
};
