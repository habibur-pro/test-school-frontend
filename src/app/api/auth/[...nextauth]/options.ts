/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOption: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("http://localhost:4000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });
        const data = await res.json();
        if (res.ok && data.accessToken) {
          return data;
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.user = user.user;
        token.accessTokenExpires = Date.now() + 15 * 60 * 1000;
      }
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
  session: { strategy: "jwt" },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const res = await fetch("http://localhost:4000/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: token.refreshToken }),
    });

    const refreshed = await res.json();
    if (!res.ok) throw refreshed;

    return {
      ...token,
      accessToken: refreshed.accessToken,
      accessTokenExpires: Date.now() + 15 * 60 * 1000,
    };
  } catch (err) {
    console.error("Error refreshing token", err);
    return { ...token, error: "RefreshTokenError" };
  }
}
