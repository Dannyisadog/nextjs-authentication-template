import { verifyEmailToken } from "app/repository/verification";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { token } = await req.json();

  try {
    await verifyEmailToken(token);

    return NextResponse.json({ message: "Verified user" });
  } catch (e) {
    return NextResponse.json(
      { message: (e as Error).message },
      { status: 400 }
    );
  }
};
