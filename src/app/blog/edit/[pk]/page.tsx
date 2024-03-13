import React from "react";
import Link from "next/link";
import BlogEditorView from "@/view/blog/BlogEditorView";
import { Urls } from "@/url/url.g";
import BlogBannerView from "@/view/blog/BlogBannerView";

const BlogEditPage = () => {
  return (
    <div className="mx-auto my-0 flex w-4/5 flex-col items-center justify-center overflow-y-auto tablet:w-[75%] mobile:w-full">
      <form className="h-[75vh] w-full">
        <BlogBannerView />
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
