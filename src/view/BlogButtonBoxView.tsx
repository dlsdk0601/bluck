"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import useDarkMode from "@/hooks/useDarkMode";
import { Urls } from "@/url/url.g";

const BlogButtonBoxView = (props: {
  nextBlogPk: number;
  nextBlogTitle: string;
  prevBlogPk: number;
  prevBlogTitle: string;
}) => {
  const router = useRouter();
  const { isDarkMode } = useDarkMode();

  return (
    <div className="flex items-center justify-around border-t-2 border-solid border-ccfd1dd px-0 py-10">
      <button
        type="button"
        className="flex h-20 w-1/3 items-center justify-start rounded-xl bg-c1f295a text-cffffff dark:bg-cffffff dark:text-c1f295a tablet:h-14 tablet:w-[45%]"
        onClick={() => router.push(Urls.blog.show.pk.page.urlPk({ pk: props.nextBlogPk }))}
      >
        <figure className="relative h-[50px] w-[50px] tablet:h-[40px] tablet:w-[40px]">
          <Image
            fill
            src={isDarkMode ? "/assets/img/BlackLeftArrow.png" : "/assets/img/whiteLeftArrow.png"}
            sizes="100%"
            alt="left-arrow"
          />
        </figure>
        <div>
          <p className="text-l w-[180px] text-left text-cffffff dark:text-c1f295a tablet:w-[90px] tablet:text-[12px]">
            이전 포스트
          </p>
          <p className="mt-3 w-[180px] overflow-hidden overflow-ellipsis whitespace-nowrap text-left text-[12px] text-cffffff dark:text-c1f295a tablet:w-[90px] tablet:text-[10px]">
            {props.prevBlogTitle}
          </p>
        </div>
      </button>
      <button
        type="button"
        className="flex h-20 w-1/3 items-center justify-end rounded-xl bg-c1f295a text-cffffff dark:bg-cffffff dark:text-c1f295a tablet:h-14 tablet:w-[45%]"
        onClick={() => router.push(Urls.blog.show.pk.page.urlPk({ pk: props.prevBlogPk }))}
      >
        <div>
          <p className="text-l w-[180px] text-right text-cffffff dark:text-c1f295a tablet:w-[90px] tablet:text-[12px]">
            다음 포스트
          </p>
          <p className="mt-3 w-[180px] overflow-hidden overflow-ellipsis whitespace-nowrap text-right text-[12px] text-cffffff dark:text-c1f295a tablet:w-[90px] tablet:text-[10px]">
            {props.nextBlogTitle}
          </p>
        </div>
        <figure className="relative h-[50px] w-[50px] tablet:h-[40px] tablet:w-[40px]">
          <Image
            fill
            src={isDarkMode ? "/assets/img/blackRightArrow.png" : "/assets/img/whiteRightArrow.png"}
            sizes="100%"
            alt="left-arrow"
          />
        </figure>
      </button>
    </div>
  );
};

export default BlogButtonBoxView;
