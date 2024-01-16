"use client";

import Image from "next/image";
import { useFormState, useFormStatus } from "react-dom";
import { signInAction } from "@/server/authActions";
import { isNotNil } from "@/ex/utils";

const SignInFormView = () => {
  const [error, dispatch] = useFormState(signInAction, undefined);

  return (
    <form action={dispatch} className="w-4/5 mobile:w-full">
      <div className="mt-5 flex items-center justify-center overflow-hidden rounded-xl bg-cedeff6">
        <label htmlFor="id" className="bold w-1/5 pl-2 text-[14px] mobile:pl-3 mobile:text-[10px]">
          아이디
        </label>
        <input
          id="id"
          name="email"
          className="h-12 w-4/5 bg-cedeff6 text-sm font-light focus:bg-none focus:outline-none mobile:h-10 "
          type="email"
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
          name="password"
          className="h-12 w-4/5 bg-cedeff6 text-sm font-light focus:bg-none focus:outline-none mobile:h-10 mobile:text-[11px]"
          type="password"
        />
      </div>
      {isNotNil(error) && (
        <p className="mt-2 text-[10px] text-cff4500 mobile:text-[8px]">{error}</p>
      )}
      <div className="mt-2 flex cursor-pointer items-center justify-start tablet:w-3/5">
        <figure className="relative h-5 w-5 mobile:h-4 mobile:w-4">
          <Image fill src="/assets/img/check.png" alt="check" />
        </figure>
        <label htmlFor="login-check" className="ml-2 cursor-pointer mobile:text-[10px]">
          로그인 상태 유지
        </label>
        <input id="login-check" type="checkbox" className="hidden opacity-0" />
      </div>
      <SignInButtonView />
    </form>
  );
};

const SignInButtonView = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="mt-10 h-14 w-full rounded-xl border-2 border-solid border-c1f295a bg-none font-medium mobile:mt-8 mobile:h-8 mobile:text-lg"
    >
      로그인
    </button>
  );
};

export default SignInFormView;
