"use client";

import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { isLockState } from "@/store/isLock";
import { checkPasswordAction, editPasswordAction } from "@/server/authActions";
import { isNotNil } from "@/ex/utils";
import MyPageEditPasswordSuccessView from "@/view/myPage/MyPageEditPasswordSuccessView";

const MyPageEditPasswordView = () => {
  const router = useRouter();
  const { pending } = useFormStatus();
  const setIsLock = isLockState((state) => state.setIsLoading);

  const [res, dispatch] = useFormState(checkPasswordAction, null);

  useEffect(() => {
    setIsLock(pending);
  }, [pending]);

  if (isNotNil(res?.data?.result) && res?.data?.result) {
    return <EditPasswordView />;
  }

  return (
    <form
      action={dispatch}
      className="mx-auto flex h-4/6 max-w-4xl items-center justify-center overflow-y-auto overflow-x-hidden mobile:block"
    >
      <div className="mx-5 flex w-8/12 flex-wrap items-center justify-between mobile:mx-auto mobile:w-5/6">
        <div className="mb-3 flex w-full items-center justify-start overflow-hidden rounded-xl mobile:mb-1">
          <label
            htmlFor="password"
            className="flex h-10 w-1/5 items-center bg-ccfd1dd pl-2 text-sm font-medium leading-3 dark:bg-c000000 mobile:pl-4 mobile:text-[10px]"
          >
            비밀번호
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="h-10 w-4/5 rounded-r-xl border-none bg-ccfd1dd focus:outline-none dark:bg-c000000"
            placeholder="비밀번호를 입력해주세요."
          />
        </div>

        {isNotNil(res?.error) && (
          <span className="mb-3 pl-2 text-[10px] text-cff4500 mobile:mb-2">{res?.error}</span>
        )}
        <div className="mt-10 flex w-full items-center justify-between mobile:mt-5">
          <button
            type="button"
            className="h-10 w-72 rounded-2xl border-2 border-solid border-c1f295a dark:border-cffffff mobile:h-8 mobile:text-[10px]"
            onClick={() => router.back()}
          >
            취소
          </button>
          <button
            type="submit"
            aria-disabled={pending}
            className="h-10 w-72 rounded-2xl border-2 border-solid border-c1f295a dark:border-cffffff mobile:h-8 mobile:text-[10px]"
          >
            확인
          </button>
        </div>
      </div>
    </form>
  );
};

const EditPasswordView = () => {
  const router = useRouter();
  const { pending } = useFormStatus();
  const setIsLock = isLockState((state) => state.setIsLoading);

  const [res, dispatch] = useFormState(editPasswordAction, null);

  useEffect(() => {
    setIsLock(pending);
  }, [pending]);

  if (isNotNil(res?.data?.result) && res?.data?.result) {
    return <MyPageEditPasswordSuccessView />;
  }

  return (
    <form
      action={dispatch}
      className="mx-auto flex h-4/6 max-w-4xl items-center justify-center overflow-y-auto overflow-x-hidden mobile:block"
    >
      <div className="mx-5 flex w-8/12 flex-wrap items-center justify-between mobile:mx-auto mobile:w-5/6">
        <div className="mb-3 flex w-full items-center justify-start overflow-hidden rounded-xl mobile:mb-1">
          <label
            htmlFor="new-password"
            className="flex h-10 w-1/5 items-center bg-ccfd1dd pl-2 text-sm font-medium leading-3 dark:bg-c000000 mobile:pl-4 mobile:text-[10px]"
          >
            비밀번호
          </label>
          <input
            id="new-password"
            name="new-password"
            type="password"
            className="h-10 w-4/5 rounded-r-xl border-none bg-ccfd1dd focus:outline-none dark:bg-c000000"
            placeholder="비밀번호를 입력해주세요."
          />
        </div>
        <div className="mb-3 flex w-full items-center justify-start overflow-hidden rounded-xl mobile:mb-1">
          <label
            htmlFor="confirm-password"
            className="flex h-10 w-1/5 items-center bg-ccfd1dd pl-2 text-sm font-medium leading-3 dark:bg-c000000 mobile:pl-4 mobile:text-[10px]"
          >
            재확인
          </label>
          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            className="h-10 w-4/5 rounded-r-xl border-none bg-ccfd1dd focus:outline-none dark:bg-c000000"
            placeholder="비밀번호를 다시 입력해주세요."
          />
        </div>

        {isNotNil(res?.error) && (
          <span className="mb-3 pl-2 text-[10px] text-cff4500 mobile:mb-2">{res?.error}</span>
        )}
        <div className="mt-10 flex w-full items-center justify-between mobile:mt-5">
          <button
            type="button"
            className="h-10 w-72 rounded-2xl border-2 border-solid border-c1f295a dark:border-cffffff mobile:h-8 mobile:text-[10px]"
            onClick={() => router.back()}
          >
            취소
          </button>
          <button
            type="submit"
            aria-disabled={pending}
            className="h-10 w-72 rounded-2xl border-2 border-solid border-c1f295a dark:border-cffffff mobile:h-8 mobile:text-[10px]"
          >
            수정
          </button>
        </div>
      </div>
    </form>
  );
};

export default MyPageEditPasswordView;
