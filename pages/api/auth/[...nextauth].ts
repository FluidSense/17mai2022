import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getUserData, registerUser } from "../../../api";
import { User } from "../../../models/user";

let memoryUsers: string[] = [];
let populatedUsers: Record<string, User> = {};

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
      }
      if (token.sub) {
        const userdataInMemory = Object.keys(populatedUsers).includes(
          token.sub
        );
        if (userdataInMemory) {
          session.user = populatedUsers[token.sub];
        } else {
          const userData = await getUserData(token.sub);
          session.user = { ...session.user, ...userData };
          if (!!userData) {
            populatedUsers[token.sub] = session.user;
          }
        }
      }
      return session;
    },
  },
});
