import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  debug: true,
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      id: "credentials",
      name: "credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "max.mustermann@server.de",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        console.log("credentials: ", credentials);
        try {
          const url = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/user/check-credentials`;
          const body = new URLSearchParams();
          body.append("email", credentials?.email || "");
          body.append("password", credentials?.password || "");

          const res = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              accept: "application/json",
            },
            body: body.toString(),
          });

          if (!res.ok) {
            const errBody = await res.json().catch(() => null);
            console.log("auth failed", res.status, errBody);
            return null;
          }

          const user = await res.json();
          if (user && !user.error) {
            console.log("user: ", user);
            return user;
          }
          console.log("no user", user);
          return null;
        } catch (err) {
          console.log("auth error: ", err);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    signOut: "/auth/signout",
  },
};

export default NextAuth(authOptions);
