"use client";

import { useFormStatus } from "react-dom";
import { useEffect } from "react";
import { findPasswordAction } from "@/server/authActions";
import { isNotBlank, isNotNil } from "@/ex/utils";
import { isLockState } from "@/store/isLock";
import FormActionView from "@/view/FormActionView";
import { FindPasswordActionRes, FormActionViewProps } from "@/type/definitions";

const FindPasswordForm = (props: FormActionViewProps<FindPasswordActionRes>) => {
  const { pending } = useFormStatus();
  const setIsLock = isLockState((state) => state.setIsLoading);

  useEffect(() => {
    setIsLock(pending);
  }, [pending]);

  if (isNotNil(props.res?.data?.result)) {
    return <p>{props.res.data.result}</p>;
  }

  return (
    <form action={props.dispatch} className="w-4/5 mobile:w-full">
      <div className="mt-3 flex items-center justify-center rounded-xl bg-ccfd1dd dark:bg-c000000">
        <label htmlFor="name" className="w-1/5 pl-2 text-sm mobile:pl-4 mobile:text-[10px]">
          이름
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="h-12 w-4/5 rounded-r-xl bg-ccfd1dd text-sm font-light focus:outline-none dark:bg-c000000 mobile:h-10"
          placeholder="이름을 입력해주세요."
        />
      </div>
      <div className="mt-3 flex items-center justify-center rounded-xl bg-ccfd1dd dark:bg-c000000">
        <label htmlFor="email" className="w-1/5 pl-2 text-sm mobile:pl-4 mobile:text-[10px]">
          아이디
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="h-12 w-4/5 rounded-r-xl bg-ccfd1dd text-sm font-light focus:outline-none dark:bg-c000000 mobile:h-10"
          placeholder="아이디를 입력해주세요."
        />
      </div>
      {isNotBlank(props.res?.error) && (
        <p className="mt-2 text-xs text-cff4500 mobile:mt-1 mobile:text-[9px]">
          {props.res?.error}
        </p>
      )}
      <button
        type="submit"
        aria-disabled={pending}
        className="mt-12 h-14 w-full cursor-pointer rounded-2xl border-2 border-solid border-c1f295a dark:border-cffffff mobile:mt-8 mobile:h-10 mobile:text-[12px]"
      >
        비밀번호 찾기
      </button>
    </form>
  );
};

const FindPasswordFormView = FormActionView(findPasswordAction, FindPasswordForm);

export default FindPasswordFormView;
