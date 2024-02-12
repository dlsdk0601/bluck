"use client";

import { useFormState, useFormStatus } from "react-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { isNil, isString } from "lodash";
import { blobToBase64String } from "blob-util";
import classNames from "classnames";
import { CheckCircleIcon as OutlineCheckCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { signUpAction } from "@/server/authActions";
import { vFileExtension } from "@/ex/validate";
import { isNotNil } from "@/ex/utils";
import { api } from "@/lib/axios";
import { Fileset } from "@/lib/aws";
import { Urls } from "@/url/url.g";
import { isLockState } from "@/store/isLock";

const SignUpFormView = () => {
  const [res, dispatch] = useFormState(signUpAction, null);

  if (isNotNil(res?.data?.result) && res?.data?.result) {
    return (
      <div className="mx-auto flex h-4/5 w-2/5 flex-col items-center justify-center tablet:w-3/4 mobile:w-full">
        <p>회원가입이 정상적으로 처리되었습니다.</p>
        <Link
          className="mt-5 cursor-pointer text-xs font-medium tablet:text-[10px] mobile:text-[9px]"
          href={Urls["sign-in"].page.url()}
        >
          로그인
        </Link>
      </div>
    );
  }

  return (
    <form
      action={dispatch}
      className="mx-auto flex h-4/6 max-w-4xl items-start justify-center overflow-y-auto overflow-x-hidden mobile:block"
    >
      <FileUploadView />
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
            className="h-10 w-4/5 rounded-r-xl border-none bg-ccfd1dd focus:outline-none dark:bg-c000000"
            placeholder="이메일을 입력해주세요."
          />
        </div>
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
            className="h-5/6 w-4/5 rounded-xl p-2 focus:outline-none"
            placeholder="자기소개를 입력해주세요."
          />
        </div>
        <SignUpPersonalInformationRadioBoxView />

        {isNotNil(res?.error) && (
          <span className="mb-3 pl-2 text-[10px] text-cff4500 mobile:mb-2">{res?.error}</span>
        )}
        <div className="mt-10 flex w-full items-center justify-between mobile:mt-5">
          <button
            type="button"
            className="h-10 w-72 rounded-2xl border-2 border-solid border-c1f295a dark:border-cffffff mobile:h-8 mobile:text-[10px]"
          >
            취소
          </button>
          <SignUpButtonView />
        </div>
      </div>
    </form>
  );
};

const SignUpPersonalInformationRadioBoxView = () => {
  const [isCheck, setIsCheck] = useState(false);
  return (
    <div className="my-3 flex w-full cursor-pointer items-center justify-start mobile:my-3">
      <figure className=" h-5 w-5 mobile:h-2 mobile:w-2">
        {isCheck ? <CheckCircleIcon /> : <OutlineCheckCircleIcon />}
      </figure>
      <label htmlFor="check" className="ml-1 cursor-pointer text-sm">
        개인정보 수집 이용에 대한 동의
      </label>
      <input
        id="check"
        type="checkbox"
        name="isPersonalInfoConsentGiven"
        className="hidden opacity-0"
        onChange={() => setIsCheck(!isCheck)}
      />
    </div>
  );
};

const SignUpButtonView = () => {
  const { pending } = useFormStatus();
  const setIsLock = isLockState((state) => state.setIsLock);

  useEffect(() => {
    setIsLock(pending);
  }, [pending]);

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="h-10 w-72 rounded-2xl border-2 border-solid border-c1f295a dark:border-cffffff mobile:h-8 mobile:text-[10px]"
    >
      회원가입
    </button>
  );
};

const FileUploadView = () => {
  const [fileSet, setFileSet] = useState<Fileset | null>(null);

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (isNil(files)) {
      return;
    }

    const file = files[0];
    const validFileExtension = vFileExtension(file.type, ["IMAGE"]);
    if (isNotNil(validFileExtension)) {
      alert(validFileExtension);
      return;
    }

    const base64 = await blobToBase64String(file);

    const res = await api.newAsset({ base64, name: file.name });

    if (isNil(res)) {
      return;
    }

    if (isString(res)) {
      return alert(res);
    }

    setFileSet(res.fileSet);
  };

  return (
    <>
      <label
        htmlFor="profile"
        style={{ backgroundImage: isNotNil(fileSet?.url) ? `url(${fileSet.url})` : undefined }}
        className={classNames(
          "flex h-48 w-48 cursor-pointer items-center justify-center rounded-lg border-none mobile:mx-auto mobile:my-3 mobile:h-full mobile:w-full",
          {
            "bg-ccfd1dd dark:bg-c000000": isNil(fileSet),
            "bg-cover bg-center bg-no-repeat": isNotNil(fileSet),
          },
        )}
      >
        {isNil(fileSet) ? "\u002B" : ""}
        <input
          type="file"
          onChange={(e) => onChange(e)}
          accept="image/*"
          id="profile"
          name="profile"
          className="hidden"
        />
      </label>
      <input type="text" value={fileSet?.uuid} name="uuid" className="hidden opacity-0" readOnly />
    </>
  );
};

export default SignUpFormView;
