"use client";

import { useFormStatus } from "react-dom";
import { memo, useEffect } from "react";
import { signInAction } from "@/server/authActions";
import { isNotNil } from "@/ex/utils";
import FormActionView from "@/view/FormActionView";
import { FormActionViewProps, SignInActionRes } from "@/type/definitions";
import { isLockState } from "@/store/isLock";

const SignInForm = (props: FormActionViewProps<SignInActionRes>) => {
  return (
    <form action={props.dispatch} className="w-4/5 mobile:w-full">
      <div className="mt-5 flex items-center justify-center overflow-hidden rounded-xl bg-cedeff6">
        <label
          htmlFor="email"
          className="bold w-1/5 pl-2 text-[14px] mobile:pl-3 mobile:text-[10px]"
        >
          아이디
        </label>
        <input
          id="email"
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
          minLength={8}
        />
      </div>
      {isNotNil(props.res?.error) && (
        <p className="mt-2 text-[10px] text-cff4500 mobile:text-[8px]">{props.res?.error}</p>
      )}
      <SignInButtonView />
    </form>
  );
};

const SignInButtonView = memo(() => {
  const { pending } = useFormStatus();
  const setIsLock = isLockState((state) => state.setIsLoading);

  useEffect(() => {
    setIsLock(pending);
  }, [pending]);

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="mt-10 h-14 w-full rounded-xl border-2 border-solid border-c1f295a bg-none font-medium mobile:mt-8 mobile:h-8 mobile:text-lg"
    >
      로그인
    </button>
  );
});

const SignFormView = FormActionView(signInAction, SignInForm);

export default SignFormView;
