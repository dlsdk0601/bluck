import { NextAuthConfig } from "next-auth";
import { Urls } from "@/url/url.g";
import { isNotNil } from "@/ex/utils";

export const authConfig = {
  pages: {
    signIn: Urls["sign-in"].page.url(),
  },
  callbacks: {
    // false 를 return 하면 signIn 으로 리다이렉트 된다.
    authorized({ auth, request: { nextUrl } }) {
      const user = auth?.user;

      // my-page (아직 my-page 가 개발이 안되서 blog 로 테스트)
      if (nextUrl.pathname.startsWith("/blog")) {
        return isNotNil(user);
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
