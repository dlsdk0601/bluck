import Link from "next/link";
import Image from "next/image";
import { Urls } from "@/url/url.g";

const SignInPage = () => {
  return (
    <div className="h-full w-full">
      <section className="mx-auto my-0 flex h-4/5 w-2/5 flex-col items-center justify-center tablet:w-[75%] mobile:w-full">
        <form className="w-4/5 mobile:w-full">
          <div className="mt-5 flex items-center justify-center overflow-hidden rounded-xl bg-cedeff6">
            <label
              htmlFor="id"
              className="bold w-1/5 pl-2 text-[14px] mobile:pl-3 mobile:text-[10px]"
            >
              아이디
            </label>
            <input
              id="id"
              className="h-12 w-4/5 bg-cedeff6 text-sm font-light focus:bg-none focus:outline-none mobile:h-10 "
              type="text"
            />
          </div>
          <div className="mt-5 flex items-center justify-center overflow-hidden rounded-xl bg-cedeff6">
            <label
              htmlFor="password"
              className="bold w-1/5 pl-2 text-[14px] mobile:pl-3 mobile:text-[10px]"
            >
              비밀번호
            </label>
            <input
              id="password"
              className="h-12 w-4/5 bg-cedeff6 text-sm font-light focus:bg-none focus:outline-none mobile:h-10 mobile:text-[11px]"
              type="password"
            />
          </div>
          <p className="text-cff4500 mt-2 text-[10px] mobile:text-[8px]">에러 텍스트</p>
          <div className="mt-2 flex cursor-pointer items-center justify-start tablet:w-3/5">
            <figure className="relative h-5 w-5 mobile:h-4 mobile:w-4">
              <Image fill src="/assets/img/check.png" alt="check" />
            </figure>
            <label htmlFor="login-check" className="ml-2 cursor-pointer mobile:text-[10px]">
              로그인 상태 유지
            </label>
            <input id="login-check" type="checkbox" className="hidden opacity-0" />
          </div>
          <button
            type="submit"
            className="mt-10 h-14 w-full rounded-xl border-2 border-solid border-c1f295a bg-none font-medium mobile:mt-8 mobile:h-8 mobile:text-lg"
          >
            로그인
          </button>
        </form>
        <div className="mx-auto mt-8 flex w-4/5 items-center justify-around mobile:mt-5">
          <Link
            className="cursor-pointer text-xs font-medium tablet:text-[10px] mobile:text-[9px]"
            href={Urls["find-password"].index.urlString()}
          >
            비밀번호 찾기
          </Link>
          &#183;
          <Link
            className="cursor-pointer text-xs font-medium tablet:text-[10px] mobile:text-[9px]"
            href={Urls["find-id"].index.urlString()}
          >
            아이디 찾기
          </Link>
          &#183;
          <Link
            className="cursor-pointer text-xs font-medium tablet:text-[10px] mobile:text-[9px]"
            href={Urls["sign-up"].index.urlString()}
          >
            회원가입
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SignInPage;
