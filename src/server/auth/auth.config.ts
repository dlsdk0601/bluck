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
      const isSign = isNotNil(user);

      const signOutExceptions = [Urls["my-page"].show.page.url(), Urls["my-page"].edit.page.url()];

      // 비로그인 유저 접근 제한
      if (signOutExceptions.includes(nextUrl.pathname) && !isSign) {
        return isNotNil(user);
      }

      const signInExceptions = [
        Urls["sign-in"].page.url(),
        Urls["sign-up"].page.url(),
        Urls["find-id"].page.url(),
        Urls["find-password"].page.url(),
      ];

      // 로그인 유저 접근 제한
      if (signInExceptions.includes(nextUrl.pathname) && isSign) {
        return NextResponse.redirect(Urls.page.fullUrl);
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
