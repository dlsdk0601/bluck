"use client";

import React from "react";
import { useFormState } from "react-dom";
import BlogBannerView from "@/view/blog/BlogBannerView";
import BlogTagSelectView from "@/view/blog/BlogTagSelectView";
import BlogEditorView from "@/view/blog/BlogEditorView";
import BlogSubmitButtonView from "@/view/blog/BlogSubmitButtonView";
import { GetEditBlogActionRes } from "@/type/definitions";
import { editBlogAction } from "@/server/blogActions";
import { isNotNil } from "@/ex/utils";
import Replace from "@/view/layout/Replace";
import { Urls } from "@/url/url.g";
import { isLockState } from "@/store/isLock";

const BlogEditFormView = (props: { res: GetEditBlogActionRes }) => {
  const setIsLock = isLockState((state) => state.setIsLock);
  const [res, dispatch] = useFormState(editBlogAction, null);

  if (isNotNil(res?.data?.pk)) {
    setIsLock(false);
    return <Replace url={Urls.blog.show.pk.page.urlPk({ pk: res.data.pk })} />;
  }

  return (
    <>
      <form action={dispatch} className="h-[75vh] w-full">
        <BlogBannerView fileSet={props.res.blog?.banner} />
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
            defaultValue={props.res.blog?.title ?? ""}
            className="h-10 w-5/6 rounded-r-xl border-none bg-ccfd1dd focus:outline-none dark:bg-c000000"
            placeholder="제목을 입력해주세요."
          />
        </div>
        <BlogTagSelectView allTag={props.res.tags} defaultTags={props.res.blog?.tags} />
        <BlogEditorView values={props.res.blog?.body} />
        <BlogSubmitButtonView error={res?.error} />
      </form>
    </>
  );
};

export default BlogEditFormView;
