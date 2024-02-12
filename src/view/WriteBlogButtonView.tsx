"use client";

import { useRouter } from "next/navigation";
import { userState } from "@/store/user";
import { Urls } from "@/url/url.g";

const WriteBlogButtonView = () => {
  const router = useRouter();
  const isSign = userState((state) => state.isSign);

  return (
    <button
      type="button"
      className="h-[30px] w-[85px] rounded-2xl border-2 border-c1f295a p-2 text-center text-[14px] text-c1f295a dark:border-cffffff dark:text-cffffff tablet:text-[12px] mobile:mx-auto mobile:mt-[20px] mobile:w-full mobile:text-[10px]"
      onClick={() => {
        if (isSign) {
          router.push(Urls.blog.edit.pk.page.urlPk({ pk: "new" }));
          return;
        }

        alert("로그인 후 작성 할 수 있습니다.");
        router.push(Urls["sign-in"].page.url());
      }}
    >
      글쓰기
    </button>
  );
};

export default WriteBlogButtonView;
