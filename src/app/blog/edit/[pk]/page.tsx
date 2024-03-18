import React from "react";
import Link from "next/link";
import { isNil } from "lodash";
import BlogEditorView from "@/view/blog/BlogEditorView";
import { Urls } from "@/url/url.g";
import BlogBannerView from "@/view/blog/BlogBannerView";
import BlogTagSelectView from "@/view/blog/BlogTagSelectView";
import { isNotNil, validatePk } from "@/ex/utils";
import { getEditBlogShowAction } from "@/server/blogActions";
import BlogSubmitButtonView from "@/view/blog/BlogSubmitButtonView";

const BlogEditPage = async (props: { params?: { pk: string | "new" } }) => {
  const pk = validatePk(props.params?.pk);
  const res = await getEditBlogShowAction(pk);

  if (isNil(res.data) || isNotNil(res.error)) {
    return (
      <div className="mx-auto flex h-[75vh] w-3/5 items-center justify-center mobile:w-[95%]">
        <div>
          <p className="text-center">{res.error}</p>
          <Link
            href={Urls.page.url()}
            className="mt-3 block rounded border-[1px] border-solid border-c1f295a py-2 text-center dark:border-cffffff"
          >
            Home 으로 가기
          </Link>
        </div>
      </div>
    );
  }

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
        <BlogTagSelectView allTag={res.data.tags} defaultTags={res.data.blog?.tags} />
        <BlogEditorView />
        <BlogSubmitButtonView />
      </form>
    </div>
  );
};

export default BlogEditPage;
