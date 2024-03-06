import { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";
import { config } from "@/config/config";

// middleware 는 next 가 알아서 찾아서 적용 한다.
// cna 를 할때 src 폴더를 할꺼냐 말꺼냐로 middleware 파일 위치가 다르다
// src => src 폴더 안
// src (x) => root 폴더
// build 시 edge function 에서 lodash 지원을 하지 않는다. Urls 는 lodash 천국이기에 하드 코딩으로 간다

export const authConfig = {
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    // false 를 return 하면 sign-in 으로 리다이렉트 된다.
    authorized({ auth, request: { nextUrl } }) {
      const user = auth?.user;
      const isSign = !!user;

      const signOutExceptions = ["/my-page/show", "/my-page/user/edit", "my-page/password/edit"];

      // 비로그인 유저 접근 제한
      if (signOutExceptions.includes(nextUrl.pathname) && !isSign) {
        return isSign;
      }

      const signInExceptions = ["/sign-in", "/sign-up", "/find-id", "/find-password"];

      // 로그인 유저 접근 제한
      if (signInExceptions.includes(nextUrl.pathname) && isSign) {
        return NextResponse.redirect(`${config.baseUrl}/`);
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
