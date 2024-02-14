import Link from "next/link";
import { isNil } from "lodash";
import BlogCardView from "@/view/blog/BlogCardView";
import { myPageInitAction } from "@/server/myPageAction";
import { isNotNil } from "@/ex/utils";
import { Urls } from "@/url/url.g";
import MyPageProfileView from "@/view/myPage/MyPageProfileView";
import MyPageTagsView from "@/view/myPage/MyPageTagsView";

const Page = async (props: { searchParams?: { tags?: number[] } }) => {
  console.log("props.searchParams?.tags");
  console.log(props.searchParams?.tags);
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
        <div className="h-full w-1/6">
          <p className="mb-2 h-11 w-full rounded-xl bg-c1f295a py-2 text-center text-lg text-cffffff opacity-90">
            태그
          </p>
          <MyPageTagsView tags={res.data.tags} />
        </div>
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
      </div>
    </>
  );
};

export default Page;
