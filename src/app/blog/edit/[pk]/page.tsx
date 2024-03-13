import React from "react";
import Link from "next/link";
import BlogEditorView from "@/view/blog/BlogEditorView";
import { Urls } from "@/url/url.g";
import BlogBannerView from "@/view/blog/BlogBannerView";
import BlogTagSelectView from "@/view/blog/BlogTagSelectView";

const BlogEditPage = () => {
  return (
    <div className="mx-auto my-0 flex w-4/5 flex-col items-center justify-center overflow-y-auto tablet:w-[75%] mobile:w-full">
      <form className="h-[75vh] w-full">
        <BlogBannerView />
        <div className="mb-3 flex w-full items-center justify-start overflow-hidden rounded-xl mobile:mb-1">
          <label
            htmlFor="title"
            className="flex h-10 w-1/6 items-center bg-ccfd1dd pl-2 text-sm font-medium leading-3 dark:bg-c000000 mobile:pl-4 mobile:text-[10px]"
          >
            title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            className="h-10 w-5/6 rounded-r-xl border-none bg-ccfd1dd focus:outline-none dark:bg-c000000"
            placeholder="제목을 입력해주세요."
          />
        </div>
        <BlogTagSelectView />
        <BlogEditorView />
        <div className="mt-10 flex h-20 w-full items-center justify-between mobile:mt-5">
          <Link
            className="flex h-10 w-[40%] items-center justify-center rounded-2xl border-2 border-solid border-c1f295a dark:border-cffffff mobile:h-8 mobile:text-[10px]"
            href={Urls.page.url()}
          >
            취소
          </Link>
          <button
            type="submit"
            className="h-10 w-[40%] rounded-2xl border-2 border-solid border-c1f295a dark:border-cffffff mobile:h-8 mobile:text-[10px]"
          >
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogEditPage;
