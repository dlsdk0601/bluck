"use client";

import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { isLockState } from "@/store/isLock";
import { isNotNil } from "@/ex/utils";
import { ShowUserActionRes } from "@/type/definitions";
import { signUpAction } from "@/server/authActions";
import FileUploadView from "@/view/FileUploadView";

const MyPageEditUserDataView = (props: { data: ShowUserActionRes }) => {
  const router = useRouter();
  const { pending } = useFormStatus();
  const setIsLock = isLockState((state) => state.setIsLock);
  const [res, dispatch] = useFormState(signUpAction, null);

  useEffect(() => {
    setIsLock(pending);
  }, [pending]);

  if (isNotNil(res?.data?.result) && res?.data?.result) {
    return (
      <div className="mx-auto flex h-4/5 w-2/5 flex-col items-center justify-center tablet:w-3/4 mobile:w-full">
        <p>정보가 정상적으로 수정되었습니다.</p>
      </div>
    );
  }

  return (
    <form
      action={dispatch}
      className="mx-auto mt-16 flex h-4/6 max-w-4xl items-start justify-center overflow-y-auto overflow-x-hidden mobile:block"
    >
      <FileUploadView profile={props.data.profile} />
      <div className="mx-5 flex w-8/12 flex-wrap items-center justify-between mobile:mx-auto mobile:w-5/6">
        <div className="mb-3 flex w-full items-center justify-start overflow-hidden rounded-xl mobile:mb-1">
          <label
            htmlFor="email"
            className="flex h-10 w-1/5 items-center bg-ccfd1dd pl-2 text-sm font-medium leading-3 dark:bg-c000000 mobile:pl-4 mobile:text-[10px]"
          >
            이메일
          </label>
          <input
            id="email"
            type="email"
            name="email"
            defaultValue={props.data.email}
            className="h-10 w-4/5 rounded-r-xl border-none bg-ccfd1dd focus:outline-none dark:bg-c000000"
            placeholder="이메일을 입력해주세요."
            disabled
          />
        </div>
        <div className="mb-3 flex w-full items-center justify-start overflow-hidden rounded-xl mobile:mb-1">
          <label
            htmlFor="name"
            className="flex h-10 w-1/5 items-center bg-ccfd1dd pl-2 text-sm font-medium leading-3 dark:bg-c000000 mobile:pl-4 mobile:text-[10px]"
          >
            이름
          </label>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={props.data.name}
            className="h-10 w-4/5 rounded-r-xl border-none bg-ccfd1dd focus:outline-none dark:bg-c000000"
            placeholder="이름을 입력해주세요."
          />
        </div>
        <div className="mb-3 flex w-full items-center justify-start overflow-hidden rounded-xl mobile:mb-1">
          <label
            htmlFor="birthday"
            className="flex h-10 w-1/5 items-center bg-ccfd1dd pl-2 text-sm font-medium leading-3 dark:bg-c000000 mobile:pl-4 mobile:text-[10px]"
          >
            생년월일
          </label>
          <input
            id="text"
            name="birthday"
            type="text"
            defaultValue={props.data.birthday}
            className="h-10 w-4/5 rounded-r-xl border-none bg-ccfd1dd focus:outline-none dark:bg-c000000"
            placeholder="생년월일 6자리 입력해주세요."
          />
        </div>
        <div className="mb-3 flex w-full items-center justify-start overflow-hidden rounded-xl mobile:mb-1">
          <label
            htmlFor="tel"
            className="flex h-10 w-1/5 items-center bg-ccfd1dd pl-2 text-sm font-medium leading-3 dark:bg-c000000 mobile:pl-4 mobile:text-[10px]"
          >
            휴대전화
          </label>
          <input
            id="tel"
            name="phone"
            type="tel"
            defaultValue={props.data.phone}
            className="h-10 w-4/5 rounded-r-xl border-none bg-ccfd1dd focus:outline-none dark:bg-c000000"
            placeholder="- 없이 입력해주세요."
          />
        </div>
        <div className="mb-3 flex w-full items-center justify-start overflow-hidden rounded-xl mobile:mb-1">
          <label
            htmlFor="message"
            className="flex h-10 w-1/5 items-center bg-ccfd1dd pl-2 text-sm font-medium leading-3 dark:bg-c000000 mobile:pl-4 mobile:text-[10px]"
          >
            상태메시지
          </label>
          <input
            id="message"
            name="message"
            type="text"
            defaultValue={props.data.message}
            className="h-10 w-4/5 rounded-r-xl border-none bg-ccfd1dd focus:outline-none dark:bg-c000000"
            placeholder="상태메시지를 입력해주세요."
          />
        </div>
        <div className="mb-5 flex h-28 w-full items-center justify-center overflow-hidden rounded-xl bg-ccfd1dd dark:bg-c000000">
          <label
            htmlFor="introduce"
            className="flex h-10 w-1/6 items-center bg-ccfd1dd pl-2 text-sm font-medium leading-3 dark:bg-c000000 mobile:pl-4 mobile:text-[10px]"
          >
            자기소개
          </label>
          <textarea
            id="introduce"
            name="introduce"
            defaultValue={props.data.introduce}
            className="h-5/6 w-4/5 rounded-xl p-2 focus:outline-none"
            placeholder="자기소개를 입력해주세요."
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

export default MyPageEditUserDataView;
