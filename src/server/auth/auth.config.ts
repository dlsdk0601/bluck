import { NextAuthConfig } from "next-auth";
import { Urls } from "@/url/url.g";
import { isNotNil } from "@/ex/utils";

export const authConfig = {
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = auth?.user;

      if (isNotNil(isLoggedIn)) {
        return Response.redirect(Urls.page.url());
      }

      return isLoggedIn;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
