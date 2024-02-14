"use client";

import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/navigation";
import parse from "html-react-parser";
import { useEffect, useState } from "react";

import {
  ChatBubbleBottomCenterTextIcon,
  EyeIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { Urls } from "@/url/url.g";
import { GetBlogsActionResItem } from "@/type/definitions";
import { mf1 } from "@/ex/numberEx";

const BlogCardView = (props: { blog: GetBlogsActionResItem; isFull?: boolean }) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // html parser 를 사용하게 되면 hydration 단계에서 에러가 난다.
    // 때문에 html parser 가 들어가는 부분은 hydration 에서 제외 될 수 있게 조건부 렌더링으로 처리
    // https://nextjs.org/docs/messages/react-hydration-error
    setIsClient(true);
  }, []);

  return (
    <div
      className={classNames(
        "mb-[20px] flex h-[185px] cursor-pointer items-center justify-center overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg tablet:h-[175px] tablet:w-[99%] mobile:mx-auto mobile:my-[10px] mobile:block mobile:h-[200px] mobile:w-[90%]",
        {
          "w-full": props.isFull,
          "w-[49%]": !props.isFull,
        },
      )}
      onClick={() => router.push(Urls.blog.show.pk.page.urlPk({ pk: props.blog.pk }))}
    >
      <figure
        className={classNames(
          "border-b-grey relative h-full overflow-hidden mobile:h-[40%] mobile:w-full",
          {
            "w-[20%]": props.isFull,
            "w-[30%]": !props.isFull,
          },
        )}
      >
        <Image fill src={props.blog.banner.url} alt="post-banner" />
      </figure>
      <div
        className={classNames(
          "h-full bg-cf9f9f9 pl-3 pr-2 dark:bg-c1f295a mobile:w-full mobile:pb-2",
          {
            "w-[80%]": props.isFull,
            "w-[70%]": !props.isFull,
          },
        )}
      >
        <div className="mt-[10px] flex items-center justify-start mobile:mt-0 mobile:pt-[10px]">
          <Image width={18} height={18} src={props.blog.user.profile.url} alt="profile" />
          <span className="ml-1 text-[12px]">{props.blog.user.name}</span>
        </div>
        <p className="mt-[25px] overflow-hidden overflow-ellipsis whitespace-nowrap font-medium dark:text-cffffff mobile:mt-[15px] mobile:text-[12px]">
          {props.blog.title}
        </p>
        <div className="mb-[35px] mt-[15px] h-[30px] w-[95%] overflow-hidden overflow-ellipsis whitespace-nowrap text-[14px] leading-4 dark:text-cffffff mobile:mb-[10px] mobile:mt-[10px] mobile:h-[23px] mobile:text-[10px] mobile:leading-5">
          {isClient && parse(props.blog.body)}
        </div>
        <div className="mt-[4%] flex items-center justify-between mobile:mt-0 ">
          <span className="text-[14px] mobile:text-[10px]">{props.blog.createAt}</span>
          <div className="flex items-center justify-end mobile:ml-2 mobile:w-[60%]">
            <figure className="mx-[5px] flex items-center justify-between">
              <ChatBubbleBottomCenterTextIcon className="w-5" />
              <figcaption className="ml-[10px] text-[14px]  mobile:ml-[2px] mobile:text-[10px]">
                1000
              </figcaption>
            </figure>
            <figure className="mx-[5px] flex items-center justify-between">
              <EyeIcon className="w-5" />
              <figcaption className="ml-[10px] text-[14px] mobile:ml-[2px] mobile:text-[10px]">
                {mf1(props.blog.viewCount)}
              </figcaption>
            </figure>
            <figure className="mx-[5px] flex items-center justify-between">
              <HandThumbUpIcon className="w-5" />
              <figcaption className="ml-[10px] text-[14px] mobile:ml-[2px] mobile:text-[10px]">
                {mf1(props.blog.likeCount)}
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCardView;
