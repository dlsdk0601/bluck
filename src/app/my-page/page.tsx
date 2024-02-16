import Link from "next/link";
import { isNil } from "lodash";
import { Suspense } from "react";
import { myPageInitAction } from "@/server/myPageAction";
import { isNotNil } from "@/ex/utils";
import { Urls } from "@/url/url.g";
import MyPageProfileView from "@/view/myPage/MyPageProfileView";
import MyPageTagsView from "@/view/myPage/MyPageTagsView";
import { BlogSkeleton, TagSkeleton } from "@/view/skeleton/MyPageSkeleton";
import MyPageBlogsView from "@/view/myPage/MyPageBlogsView";

const Page = async (props: { searchParams?: { tags: string[] } }) => {
  console.log(props.searchParams);
  const res = await myPageInitAction();

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
    <>
      {/* 프로필 */}
      <MyPageProfileView user={res.data.user} />

      {/*  하단 */}
      <div className="mt-5 flex h-2/3 items-start justify-between">
        {/*  태그 */}
        <Suspense fallback={<TagSkeleton />}>
          <MyPageTagsView tags={res.data.tags} />
        </Suspense>

        <Suspense fallback={<BlogSkeleton />}>
          <MyPageBlogsView tags={props.searchParams?.tags} />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
