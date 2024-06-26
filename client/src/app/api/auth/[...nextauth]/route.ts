import NextAuth from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import User from "@/models/User";
import {connectDB} from "@/utils/db";
import Google from "next-auth/providers/google";
import { urPK } from "@mui/material/locale";
import { url } from "inspector";
import { redirect } from "next/dist/server/api-utils";

export const authOptions: any = {

  providers: [
    Google({
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),

    
   
  ],



  callbacks: {
    async signIn({ user, account}: { user: AuthUser; account: Account; }) {
    
      if (account?.provider == "google") {
        await connectDB();
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              email: user.email,
            });

            await newUser.save();

            
            return ('/employer/hiring/jobs');
            
          }
         
          return ('/employer/hiring/jobs');


        } catch (err) {
          console.log("Error saving user", err);
          return false;
        }
      }
    },
  },
};




export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
