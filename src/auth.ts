import { PrismaClient } from "@prisma/client"
import NextAuth, { User } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs' 

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/signin",
  },
  providers: [
    Google,
    Credentials({
      async authorize({ email, password, csrfToken }) {
        const user = await prisma.user.findFirst({
          where: {
            email: email as string,
            is_deleted: false,
          }
        });

        if (!user || !user.password) {
          return null;
        }

        const match = await bcrypt.compare(password as string, user.password);

        if (match) {
          return user as unknown as User;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user) {
        return false
      }

      const userExists = await prisma.user.findFirst({
        where: {
          email: user.email as string,
        }
      });

      if (userExists) {
        return true;
      }

      await prisma.user.create({
        data: {
          email: user.email as string,
          name: user.name as string,
        }
      });

      return true;
    },
  }
})