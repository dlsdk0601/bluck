import Link from "next/link";
import { Metadata } from "next";
import { Urls } from "@/url/url.g";
import SignInFormView from "@/view/auth/SignInFormView";
import { signIn } from "@/server/auth/auth";
import { config } from "@/config/config";

export const metadata: Metadata = {
  title: "sign-in",
};

const SignInPage = () => {
  return (
    <section className="mx-auto my-0 flex h-4/5 w-2/5 flex-col items-center justify-center tablet:w-[75%] mobile:w-full">
      {config.isDev && <TestSignInButtonView />}
      <SignInFormView />
      <div className="mx-auto mt-8 flex w-4/5 items-center justify-around mobile:mt-5">
        <Link
          className="cursor-pointer text-xs font-medium tablet:text-[10px] mobile:text-[9px]"
          href={Urls["find-password"].page.url()}
        >
          비밀번호 찾기
        </Link>
        &#183;
        <Link
          className="cursor-pointer text-xs font-medium tablet:text-[10px] mobile:text-[9px]"
          href={Urls["find-id"].page.url()}
        >
          아이디 찾기
        </Link>
        &#183;
        <Link
          className="cursor-pointer text-xs font-medium tablet:text-[10px] mobile:text-[9px]"
          href={Urls["sign-up"].page.url()}
        >
          회원가입
        </Link>
      </div>
    </section>
  );
};

const TestSignInButtonView = () => {
  return (
    <form
      action={async () => {
        "use server";

        const formData = new FormData();
        formData.set("email", "test@test.com");
        formData.set("password", "1234");

        await signIn("credentials", formData);
      }}
    >
      <button type="submit">test</button>
    </form>
  );
};

export default SignInPage;
