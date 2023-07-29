import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],

  callbacks: {
    async session({ session, user, token }) {
      if (
        session.user &&
        session.user.email === "abujaformdsaleh.2020@gmail.com"
      ) {
        session.user.isAdmin = true;
      } else if (session.user) {
        session.user.isAdmin = false;
      }
      return session;
    }
  }
});

export { handler as GET, handler as POST };
