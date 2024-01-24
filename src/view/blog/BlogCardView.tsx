"use client";

import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Urls } from "@/url/url.g";

const BlogCardView = (props: { pk: number; isFull: boolean }) => {
  const router = useRouter();
  return (
    <div
      className={classNames(
        "mb-[20px] flex h-[185px] cursor-pointer items-center justify-center overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg tablet:h-[175px] tablet:w-[99%] mobile:mx-auto mobile:my-[10px] mobile:block mobile:h-[200px] mobile:w-[90%]",
        {
          "w-full": props.isFull,
          "w-[49%]": !props.isFull,
        },
      )}
      onClick={() => router.push(Urls.blog.show.pk.page.urlPk({ pk: props.pk }))}
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
        <Image fill src="/assets/img/dog.png" alt="post-banner" />
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
          <Image width={18} height={18} src="/assets/img/blackProfile.png" alt="profile" />
          <span className="ml-1 text-[12px]">작성자</span>
        </div>
        <p className="mt-[25px] font-medium dark:text-cffffff mobile:mt-[15px] mobile:text-[12px]">
          제목을 적어주세요
        </p>
        <p className="mb-[35px] mt-[15px] h-[30px] w-[95%] overflow-hidden overflow-ellipsis whitespace-normal text-[14px] leading-4 dark:text-cffffff mobile:mb-[10px] mobile:mt-[10px] mobile:h-[23px] mobile:text-[10px] mobile:leading-5">
          내용입니다.
          쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라
        </p>
        <div className="mt-[4%] flex items-center justify-between mobile:mt-0 ">
          <span className="text-[14px] mobile:text-[10px]">2023-12-31</span>
          <div className="flex items-center justify-end mobile:ml-2 mobile:w-[60%]">
            <figure className="mx-[5px] flex items-center justify-between">
              <Image width={14} height={14} src="/assets/img/blackCommend.png" alt="commend" />
              <figcaption className="ml-[10px] text-[14px]  mobile:ml-[2px] mobile:text-[10px]">
                1000
              </figcaption>
            </figure>
            <figure className="mx-[5px] flex items-center justify-between">
              <Image width={14} height={14} src="/assets/img/blackFind.png" alt="blackFind" />
              <figcaption className="ml-[10px] text-[14px] mobile:ml-[2px] mobile:text-[10px]">
                1000
              </figcaption>
            </figure>
            <figure className="mx-[5px] flex items-center justify-between">
              <Image width={14} height={14} src="/assets/img/blackLike.png" alt="blackLike" />
              <figcaption className="ml-[10px] text-[14px] mobile:ml-[2px] mobile:text-[10px]">
                1000
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCardView;
