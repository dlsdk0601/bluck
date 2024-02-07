import { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";
import { isNotNil } from "@/ex/utils";
import { Urls } from "@/url/url.g";

// middleware 는 next 가 알아서 찾아서 적용 한다.
// cna 를 할때 src 폴더를 할꺼냐 말꺼냐로 middleware 파일 위치가 다르다
// src => src 폴더 안
// src (x) => root 폴더

export const authConfig = {
  pages: {
    signIn: Urls["sign-in"].page.url(),
  },
  callbacks: {
    // false 를 return 하면 sign-in 으로 리다이렉트 된다.
    authorized({ auth, request: { nextUrl } }) {
      const user = auth?.user;

      // my-page 는 login 한 유저만 적용
      if (nextUrl.pathname.startsWith(Urls["my-page"].page.pathname)) {
        return isNotNil(user);
      }

      const signInExceptions = [
        Urls["sign-in"].page.url(),
        Urls["sign-up"].page.url(),
        Urls["find-id"].page.url(),
        Urls["find-password"].page.url(),
      ];

      if (signInExceptions.includes(nextUrl.pathname) && isNotNil(user)) {
        return NextResponse.redirect(Urls.page.url());
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
