import Link from "next/link";
import { Metadata } from "next";
import { Urls } from "@/url/url.g";
import FindIdFormView from "@/view/auth/FindIdFormView";

export const metadata: Metadata = {
  title: "id",
};

const FindIdPage = () => {
  return (
    <section className="mx-auto flex h-4/5 w-2/5 flex-col items-center justify-center tablet:w-3/4 mobile:w-full">
      <FindIdFormView />
      <div className="mx-auto mt-8 flex w-4/5 items-center justify-around mobile:mt-5">
        <Link
          className="cursor-pointer text-xs font-medium tablet:text-[10px] mobile:text-[9px]"
          href={Urls["sign-in"].page.url()}
        >
          로그인
        </Link>
        &#183;
        <Link
          className="cursor-pointer text-xs font-medium tablet:text-[10px] mobile:text-[9px]"
          href={Urls["find-password"].page.url()}
        >
          비밀번호 찾기
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

export default FindIdPage;
