import { Environments, Pages, Routes } from "@/constants/enums";
import { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/prisma";
import { Login } from "./_action/auth";
import { Locale } from "@/i18n.config";

export const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === Environments.DEV,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      authorize: async (credential, req) => {
        const currentURl = req?.headers?.referer;
        const locale = currentURl?.split("/")[3] as Locale;
        const res = await Login(credential, locale);
        if (res?.status === 200 && res?.userData) return res.userData;
        else {
          console.log(res.message);
          throw new Error(
            JSON.stringify({
              validationError: res.error,
              responseError: res.message,
            })
          );
        }
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  pages: {
    signIn: `${Routes.AUTH}/${Pages.LOGIN}`,
  },
};
