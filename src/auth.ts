import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth";
import prisma from "@/utils/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
});
