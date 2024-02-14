import React from "react";
import { MainContentsCardSkeleton } from "./MainContentsSkeleton";

const loader =
  "before:absolute before:bg-cffffff before:opacity-30 before:z-30 before:inset-0 before:-translate-x-full before:animate-[loader_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

const MyPageSkeleton = () => {
  return (
    <div className={`${loader} relative`}>
      <div className="flex items-start justify-start bg-cedeff6 px-7 py-5">
        <figure className="relative h-24 w-24">
          <div className="h-full w-full bg-loader" />
        </figure>
        <div className="ml-4 flex w-4/5 flex-col items-start justify-between">
          <div>
            <span className="inline-block h-[10px] w-[50px] bg-loader text-xl" /> |{" "}
            <span className="inline-block h-[10px] w-[50px] bg-loader text-sm" />
          </div>
          <div className="w-full">
            <p className="mt-10 h-2 w-full bg-loader text-sm" />
            <p className="mb-2 mt-1 h-1 w-full bg-loader text-xs opacity-70" />
          </div>
        </div>
      </div>

      <div className="mt-5 flex h-2/3 items-start justify-between">
        {/*  태그 */}
        <div className="h-full w-1/6">
          <p className="mb-2 h-11 w-full rounded-xl bg-c1f295a py-2 text-center text-lg text-cffffff opacity-90">
            태그
          </p>
          <ul className="h-[47vh] w-full rounded-xl bg-ccfd1dd px-3 py-6">
            <li className="m-1 inline rounded bg-loader px-2 py-1 text-cffffff opacity-50" />
            <li className="m-1 inline rounded bg-loader px-2 py-1 text-cffffff opacity-50" />
            <li className="m-1 inline rounded bg-loader px-2 py-1 text-cffffff opacity-50" />
            <li className="m-1 inline rounded bg-loader px-2 py-1 text-cffffff opacity-50" />
          </ul>
        </div>
        <div className="w-4/5 pt-2">
          <p className="mb-5 h-3 border-b-[1px] border-solid border-c1f295a bg-loader pb-1" />
          <div className="flex h-[47vh] flex-wrap justify-between overflow-y-scroll">
            <MainContentsCardSkeleton isFull />
            <MainContentsCardSkeleton isFull />
            <MainContentsCardSkeleton isFull />
            <MainContentsCardSkeleton isFull />
            <MainContentsCardSkeleton isFull />
            <MainContentsCardSkeleton isFull />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageSkeleton;
