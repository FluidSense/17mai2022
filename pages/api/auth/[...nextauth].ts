import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getUserData, registerUser } from "../../../api";

let memoryUsers: string[] = [];

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      if (token.sub && !memoryUsers.includes(token.sub)) {
        memoryUsers.push(token.sub);
        registerUser(token.sub);
        const userData = await getUserData(token.sub);
        session.user = { ...session.user, ...userData };
      }
      session.sub = token.sub;
      return session;
    },
  },
});
