import { NextResponse } from "next/server";
import { list } from "app/repository/user";
import { auth } from "auth";

export const GET = auth(async (req) => {
  if (req.auth) {
    const users = await list();
    return NextResponse.json(users);
  }

  return Response.json({ message: "Not authenticated" }, { status: 401 });
});
