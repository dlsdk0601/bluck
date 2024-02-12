"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { isNotBlank, isNotNil } from "@/ex/utils";
import { findIdAction } from "@/server/authActions";
import { isLockState } from "@/store/isLock";

const FindIdFormView = () => {
  const [res, dispatch] = useFormState(findIdAction, null);

  if (isNotNil(res?.data?.id)) {
    return (
      <p>
        회원님의 아이디는 <br /> {res.data.id}입니다.
      </p>
    );
  }

  return (
    <form action={dispatch} className="w-4/5 mobile:w-full">
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
        <label htmlFor="phone" className="w-1/5 pl-2 text-sm mobile:pl-4 mobile:text-[10px]">
          휴대폰
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="h-12 w-4/5 rounded-r-xl bg-ccfd1dd text-sm font-light focus:outline-none dark:bg-c000000 mobile:h-10"
          placeholder="휴대 전화를 입력해주세요."
        />
      </div>
      {isNotBlank(res?.error) && (
        <p className="mt-2 text-xs text-cff4500 mobile:mt-1 mobile:text-[9px]">{res?.error}</p>
      )}
      <FindIdButtonView />
    </form>
  );
};

const FindIdButtonView = () => {
  const { pending } = useFormStatus();
  const setIsLock = isLockState((state) => state.setIsLock);

  useEffect(() => {
    setIsLock(pending);
  }, [pending]);

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="mt-12 h-14 w-full cursor-pointer rounded-2xl border-2 border-solid border-c1f295a dark:border-cffffff mobile:mt-8 mobile:h-10 mobile:text-[12px]"
    >
      아이디 찾기
    </button>
  );
};

export default FindIdFormView;
