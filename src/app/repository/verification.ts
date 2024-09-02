import { VerifyToken, verifyToken } from "app/service/verification";
import { NextResponse } from "next/server";
import { get, update } from "./user";

export const verifyEmailToken = async (token: string) => {
  if (!token) {
    return NextResponse.json(
      { message: "Token is required" },
      {
        status: 400,
      }
    );
  }

  const { data } = verifyToken(token) as VerifyToken;
  const { email } = data;

  const user = await get({ email });

  if (!user) {
    return NextResponse.json(
      { message: "User not found" },
      {
        status: 404,
      }
    );
  }

  await update({
    id: user.id,
    emailVerified: new Date(),
  });
};
