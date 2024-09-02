import { verifyEmailToken } from "app/repository/verification";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { token } = await req.json();

  await verifyEmailToken(token);

  return NextResponse.json({ message: "Verified user" });
};
