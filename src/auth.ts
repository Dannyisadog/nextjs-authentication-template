import NextAuth, {
  NextAuthConfig,
  Session,
  User as NextAuthUser,
} from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Faacebook from "next-auth/providers/facebook";
import Line from "next-auth/providers/line";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { create as createUser, get as getUser } from "app/repository/user";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient, User as PrismaUser } from "@prisma/client";
import { sendWelcomeEmail } from "app/service/email/welcome";
import { sendVerificationEmail } from "app/service/email/verify";

const prisma = new PrismaClient();

export type CustomSession = {
  authUser: PrismaUser;
} & Session;

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/signin",
  },
  providers: [
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
    GitHub({
      allowDangerousEmailAccountLinking: true,
    }),
    Faacebook({
      allowDangerousEmailAccountLinking: true,
    }),
    Line({
      allowDangerousEmailAccountLinking: true,
      checks: ["state"],
    }),
    Credentials({
      async authorize({ email, password }) {
        const user = await getUser({
          email: email as string,
        });

        if (!user || !user.password) {
          return null;
        }

        const match = await bcrypt.compare(password as string, user.password);

        if (match) {
          return user as unknown as NextAuthUser;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const dbUser = await getUser({ email: session.user.email as string });

      const newSession = session as unknown as CustomSession;
      newSession.authUser = dbUser;

      return session;
    },
    async signIn({ user }) {
      if (!user) {
        return false;
      }

      let userExists = null;

      try {
        userExists = await getUser({ email: user.email as string });
      } catch (e) {
        console.error(e);
      }

      if (userExists) {
        return true;
      }

      await createUser({
        email: user.email as string,
        name: user.name as string,
        image: user.image as string,
      });

      sendWelcomeEmail(user.name as string, user.email as string);
      sendVerificationEmail(user.name as string, user.email as string);

      return true;
    },
  },
} satisfies NextAuthConfig);
