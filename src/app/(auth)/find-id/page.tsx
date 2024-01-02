import Link from "next/link";
import { Metadata } from "next";
import { Urls } from "@/url/url.g";

export const metadata: Metadata = {
  title: "id",
};

const FindIdPage = () => {
  return (
    <section className="mx-auto flex h-4/5 w-2/5 flex-col items-center justify-center tablet:w-3/4 mobile:w-full">
      <form className="w-4/5 mobile:w-full">
        <div className="mt-3 flex items-center justify-center rounded-xl bg-ccfd1dd dark:bg-c000000">
          <label htmlFor="name" className="w-1/5 pl-2 text-sm mobile:pl-4 mobile:text-[10px]">
            이름
          </label>
          <input
            id="name"
            type="text"
            className="h-12 w-4/5 rounded-r-xl bg-ccfd1dd text-sm font-light focus:outline-none dark:bg-c000000 mobile:h-10"
            placeholder="이름을 입력해주세요."
          />
        </div>
        <p className="mt-2 text-xs text-cff4500 mobile:mt-1 mobile:text-[9px]">에러 메시지</p>
        <div className="mt-3 flex items-center justify-center rounded-xl bg-ccfd1dd dark:bg-c000000">
          <label htmlFor="tel" className="w-1/5 pl-2 text-sm mobile:pl-4 mobile:text-[10px]">
            휴대폰
          </label>
          <input
            id="tel"
            type="tel"
            className="h-12 w-4/5 rounded-r-xl bg-ccfd1dd text-sm font-light focus:outline-none dark:bg-c000000 mobile:h-10"
            placeholder="휴대 전화를 입력해주세요."
          />
        </div>
        <p className="mt-2 text-xs text-cff4500 mobile:mt-1 mobile:text-[9px]">에러 메시지</p>
        <button
          type="submit"
          className="mt-12 h-14 w-full cursor-pointer rounded-2xl border-2 border-solid border-c1f295a dark:border-cffffff mobile:mt-8 mobile:h-10 mobile:text-[12px]"
        >
          아이디 찾기
        </button>
      </form>
      <div className="mx-auto mt-8 flex w-4/5 items-center justify-around mobile:mt-5">
        <Link
          className="cursor-pointer text-xs font-medium tablet:text-[10px] mobile:text-[9px]"
          href={Urls["(auth)"]["sign-in"].page.url()}
        >
          로그인
        </Link>
        &#183;
        <Link
          className="cursor-pointer text-xs font-medium tablet:text-[10px] mobile:text-[9px]"
          href=""
        >
          비밀번호 찾기
        </Link>
        &#183;
        <Link
          className="cursor-pointer text-xs font-medium tablet:text-[10px] mobile:text-[9px]"
          href={Urls["(auth)"]["sign-up"].page.url()}
        >
          회원가입
        </Link>
      </div>
    </section>
  );
};

export default FindIdPage;
