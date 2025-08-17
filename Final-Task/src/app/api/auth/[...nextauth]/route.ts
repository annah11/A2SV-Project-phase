import NextAuth from "next-auth";
import { authOptions } from "./option";

const handler = NextAuth({
  ...authOptions,
  callbacks: {
    async jwt({ token, account, user }) {
      // OAuth (Google, etc.)
      if (account?.access_token) token.accessToken = account.access_token;
      else if (account?.accessToken) token.accessToken = (account as any).accessToken;
      // Credentials / custom authorize can return accessToken on user object
      else if (user && (user as any).accessToken) token.accessToken = (user as any).accessToken;
      // Keep existing if already set
      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.log("JWT callback token.accessToken:", (token as any).accessToken);
      }
      return token;
    },
    async session({ session, token }) {
      if ((token as any).accessToken) (session as any).accessToken = (token as any).accessToken;
      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.log("Session callback accessToken:", (session as any).accessToken);
      }
      return session;
    }
  }
});

export { handler as GET, handler as POST };