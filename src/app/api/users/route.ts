import { NextRequest, NextResponse } from "next/server";
import { create, list } from "app/repository/user";

export async function GET() {
  const users = await list();
  return NextResponse.json(users);
}
