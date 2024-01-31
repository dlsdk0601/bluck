import React, { forwardRef } from "react";

const MainContentsSkeleton = () => {
  return (
    <div className="mt-[10px] flex h-[70vh] w-full flex-wrap justify-between overflow-y-auto pr-[1%] tablet:h-[72vh]">
      <MainContentsCardSkeleton />
      <MainContentsCardSkeleton />
      <MainContentsCardSkeleton />
      <MainContentsCardSkeleton />
      <MainContentsCardSkeleton />
      <MainContentsCardSkeleton />
    </div>
  );
};

const loader =
  "before:absolute before:bg-bgLoader before:opacity-30 before:z-30 before:inset-0 before:-translate-x-full before:animate-[loader_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export const MainContentsCardSkeleton = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
      className={`${loader} relative mb-[20px] flex h-[185px] w-[49%] items-center justify-center overflow-hidden rounded-xl tablet:h-[175px] tablet:w-[99%] mobile:mx-auto mobile:my-[10px] mobile:block mobile:h-[200px] mobile:w-[90%] mobile:pb-4`}
    >
      <figure className="relative h-full w-[30%] mobile:h-[40%] mobile:w-full">
        <div className="h-full w-full bg-loader" />
      </figure>
      <div className="h-full w-[70%] bg-cf9f9f9 pl-3 pr-2 dark:bg-c1f295a mobile:w-full mobile:pb-2">
        <div className="mt-[10px] flex items-center justify-start mobile:mt-0 mobile:pt-[10px]">
          <div className="h-[18px] w-[18px] bg-loader" />
          <span className="ml-1 h-[18px] w-[100px] bg-loader" />
        </div>
        <p className="mt-[25px] h-[18px] w-full bg-loader mobile:mt-[15px]" />
        <p className="mb-[35px] mt-[15px] h-[30px] w-full bg-loader mobile:mb-[10px] mobile:mt-[10px] mobile:h-[23px]" />
        <div className="mt-[4%] flex items-center justify-between mobile:mt-0">
          <span className="h-[14px] w-[100px] bg-loader mobile:h-[10px]" />
          <div className="h-[14px] w-40 bg-loader mobile:ml-2 mobile:h-[10px] mobile:w-[60%]" />
        </div>
      </div>
    </div>
  );
});

export default MainContentsSkeleton;
