import React from "react";
import { isNil } from "lodash";
import Link from "next/link";
import BlogCardView from "@/view/blog/BlogCardView";
import { myPageBlogsAction } from "@/server/myPageAction";
import { isNotNil } from "@/ex/utils";
import { Urls } from "@/url/url.g";

const MyPageBlogsView = async (props: { tags?: string | string[] }) => {
  const tags = props.tags ?? [];
  const res = await myPageBlogsAction(tags);

  if (isNotNil(res.error) || isNil(res.data)) {
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
    <div className="w-4/5 pt-2">
      <p className="mb-5 border-b-[1px] border-solid border-c1f295a pb-1">
        내가 쓴 글 총 {res.data.blogs.length}개
      </p>
      <div className="flex h-[47vh] flex-wrap justify-between overflow-y-scroll">
        {res.data.blogs.map((blog) => (
          <BlogCardView key={`my-page-blog-${blog.pk}`} blog={blog} isFull />
        ))}
      </div>
    </div>
  );
};

export default MyPageBlogsView;
