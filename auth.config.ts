import { NextAuthConfig } from "next-auth";
import { isNotNil } from "@/ex/utils";
import { Urls } from "@/url/url.g";

export const authConfig = {
  pages: {
    signIn: Urls["sign-in"].page.url(),
  },
  callbacks: {
    // false 를 return 하면 sign-in 으로 리다이렉트 된다.
    authorized({ auth, request: { nextUrl } }) {
      const user = auth?.user;
      console.log("여기는 찍히냐?");

      // my-page (아직 my-page 가 개발이 안되서 blog 로 테스트)
      if (nextUrl.pathname.startsWith("/blog")) {
        return isNotNil(user);
      }

      if (nextUrl.pathname === Urls["sign-in"].page.url() && isNotNil(user)) {
        return Response.redirect(new URL("/", nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
