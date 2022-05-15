import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getUserData, registerUser } from "../../../api";

let memoryUsers: string[] = [];
let populatedUsers: string[] = [];

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
        registerUser(token.sub, token.email || "");
        const userData = await getUserData(token.sub);
        session.user = { ...session.user, ...userData };
      }
      if (token.sub && !populatedUsers.includes(token.sub)) {
        const userData = await getUserData(token.sub);
        session.user = { ...session.user, ...userData };
        if (!!userData) {
          populatedUsers.push(token.sub);
        }
      }
      session.sub = token.sub;
      console.log("Session: ", session);
      return session;
    },
  },
});
