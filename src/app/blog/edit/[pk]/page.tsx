import React from "react";
import Link from "next/link";
import { isNil } from "lodash";
import { Urls } from "@/url/url.g";
import { isNotNil, validatePk } from "@/ex/utils";
import { getEditBlogShowAction } from "@/server/blogActions";
import BlogEditFormView from "@/view/blog/BlogEditFormView";

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
      <BlogEditFormView res={res.data} />
    </div>
  );
};

export default BlogEditPage;
