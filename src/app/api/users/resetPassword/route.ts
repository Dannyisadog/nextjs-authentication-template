import { resetPassword } from "app/repository/user";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { token, password, passwordConfirm } = await req.json();

  try {
    await resetPassword({
      token,
      password,
      passwordConfirm,
    });

    return NextResponse.json({ message: "Password reset" });
  } catch (e) {
    return NextResponse.json(
      { message: (e as Error).message },
      { status: 400 }
    );
  }
};
