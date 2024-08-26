import NextAuth, { User } from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs' 
import { create as createUser, get as getUser } from "app/repository/user"

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/signin",
  },
  providers: [
    Google,
    GitHub,
    Credentials({
      async authorize({ email, password, csrfToken }) {
        const user = await getUser({
          email: email as string,
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

      let userExists = null;

      try {
        userExists = await getUser({email: user.email as string});
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

      return true;
    },
  }
})