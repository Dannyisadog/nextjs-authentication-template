import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const saltRounds = 10;

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const { name, email, password} = await req.json();

  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, async function(err, hash) {
      console.log({hash});
      await prisma.user.create({
        data: {
          name,
          email,
          password: hash,
        },
    });
  });
});

  return NextResponse.json({ message: 'Create user', });
}
