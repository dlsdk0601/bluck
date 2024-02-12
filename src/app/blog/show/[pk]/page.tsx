import Image from "next/image";
import { isNil } from "lodash";
import parse from "html-react-parser";
import Link from "next/link";
import BlogButtonBoxView from "@/view/blog/BlogButtonBoxView";
import { getBlogShowAction } from "@/server/blogActions";
import { isNotNil, validatePk } from "@/ex/utils";
import Replace from "@/view/layout/Replace";
import { Urls } from "@/url/url.g";
import { mf1 } from "@/ex/numberEx";
import BlogLikeButtonView from "@/view/blog/BlogLikeButtonView";

const BlogShowPage = async (props: { params: { pk: string } }) => {
  const pk = validatePk(props.params.pk);

  if (isNil(pk)) {
    return <Replace url={Urls.page.url()} />;
  }

  const res = await getBlogShowAction(pk);

  if (isNil(res.data) || isNotNil(res.error)) {
    return (
      <div className="mx-auto flex h-[75vh] w-3/5 items-center justify-center mobile:w-[95%]">
        <div>
          <p className="text-center">{res.error}</p>
          <Link className="mt-3 block text-center" href={Urls.page.url()}>
            Home 으로 가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto h-[75vh] w-3/5 overflow-auto mobile:w-[95%]">
      <div className="overflow-hidden rounded-t-3xl">
        {/* 이미지 */}
        <figure className="relative h-[300px] w-full mobile:h-[200px]">
          <Image fill src="/assets/img/dog.png" alt="blog-show-banner" sizes="100%" />
        </figure>
        {/* 작성자 */}
        <div className="mx-auto my-5 flex w-11/12 items-center justify-between">
          <div className="flex items-center justify-between">
            <figure className="relative h-[35px] w-[35px] mobile:h-[25px] mobile:w-[25px]">
              <Image fill src={res.data.user.profile.url} alt="profile" />
            </figure>
            <div className="ml-3">
              <p className="text-l font-bold mobile:text-sm">{res.data.user.name}</p>
              <p className="text-l bold mx-0 my-2 mobile:mb-0 mobile:mt-1 mobile:text-sm">
                {res.data.createAt}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center mobile:mr-2">
            <figure className="relative ml-3 h-[20px] w-[20px] cursor-pointer mobile:h-[15px] mobile:w-[15px]">
              <Image fill src="/assets/img/blackShare.png" alt="link" />
            </figure>
          </div>
        </div>

        {/* 태그 정보 */}
        <div className="my-7 flex w-11/12 flex-wrap items-center justify-start mobile:mx-auto mobile:my-3">
          {res.data.tags.map((tag) => (
            <p
              key={`blog-show-tag-${tag.pk}`}
              className="text-l mr-2 flex  items-center justify-center rounded-xl bg-c1f295a px-2 py-2 text-ccfd1dd opacity-80 mobile:h-[24px] mobile:rounded-l mobile:py-1 mobile:text-sm"
            >
              {tag.name}
            </p>
          ))}
        </div>

        {/* 본문 */}
        <div className="mx-auto h-full w-11/12">{parse(res.data.body)}</div>

        {/* 코멘트 */}
        <div className="my-16 mr-3 flex items-center justify-end mobile:ml-2 mobile:w-[60%]">
          <figure className="mx-[5px] flex items-center justify-between">
            <Image width={14} height={14} src="/assets/img/blackCommend.png" alt="commend" />
            <figcaption className="ml-[10px] text-[14px]  mobile:ml-[2px] mobile:text-[10px]">
              1000
            </figcaption>
          </figure>
          <figure className="mx-[5px] flex items-center justify-between">
            <Image width={14} height={14} src="/assets/img/blackFind.png" alt="blackFind" />
            <figcaption className="ml-[10px] text-[14px] mobile:ml-[2px] mobile:text-[10px]">
              {mf1(res.data.viewCount)}
            </figcaption>
          </figure>
          <BlogLikeButtonView pk={res.data.pk} likeCount={res.data.likeCount} />
        </div>

        {/* 버튼 박스 */}
        <BlogButtonBoxView
          nextBlogPk={res.data.recommendBlogs[0].pk}
          nextBlogTitle={res.data.recommendBlogs[0].title}
          prevBlogPk={res.data.recommendBlogs[1].pk}
          prevBlogTitle={res.data.recommendBlogs[1].title}
        />
      </div>
    </div>
  );
};

export default BlogShowPage;
