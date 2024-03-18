import React, { useEffect } from "react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { Urls } from "@/url/url.g";
import { isLockState } from "@/store/isLock";
import { isNotBlank } from "@/ex/utils";

const BlogSubmitButtonView = (props: { error?: string | null }) => {
  const { pending } = useFormStatus();
  const setIsLock = isLockState((state) => state.setIsLock);

  useEffect(() => {
    setIsLock(pending);
  }, [pending]);

  return (
    <div className="mt-12">
      {isNotBlank(props?.error) && (
        <p className="mt-2 text-xs text-cff4500 mobile:mt-1 mobile:text-[9px]">{props?.error}</p>
      )}
      <div className="flex h-20 w-full items-center justify-between mobile:mt-5">
        <Link
          className="flex h-10 w-[40%] items-center justify-center rounded-2xl border-2 border-solid border-c1f295a dark:border-cffffff mobile:h-8 mobile:text-[10px]"
          href={Urls.page.url()}
        >
          취소
        </Link>
        <button
          type="submit"
          aria-disabled={pending}
          className="h-10 w-[40%] rounded-2xl border-2 border-solid border-c1f295a dark:border-cffffff mobile:h-8 mobile:text-[10px]"
        >
          등록
        </button>
      </div>
    </div>
  );
};

export default BlogSubmitButtonView;
