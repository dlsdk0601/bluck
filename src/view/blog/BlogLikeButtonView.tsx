"use client";

import Image from "next/image";
import { memo, useState } from "react";
import { isNil } from "lodash";
import { mf1 } from "@/ex/numberEx";
import { blogLikeActionType } from "@/server/blogActions";
import { isLockState } from "@/store/isLock";
import { isNotNil } from "@/ex/utils";

const BlogLikeButtonView = (props: { pk: number; likeCount: number }) => {
  const setIsLock = isLockState((state) => state.setIsLock);
  const [count, setCount] = useState(props.likeCount);

  const onClickLikeButton = async () => {
    setIsLock(true);
    try {
      const res = await blogLikeActionType(props.pk);

      if (isNotNil(res.error)) {
        return alert(res.error);
      }

      if (isNil(res.data)) {
        return;
      }

      setCount(res.data.count);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLock(false);
    }
  };

  return (
    <figure
      className="mx-[5px] flex cursor-pointer items-center justify-between"
      onClick={() => onClickLikeButton()}
    >
      <Image width={14} height={14} src="/assets/img/blackLike.png" alt="blackLike" />
      <figcaption className="ml-[10px] text-[14px] mobile:ml-[2px] mobile:text-[10px]">
        {mf1(count)}
      </figcaption>
    </figure>
  );
};

export default memo(BlogLikeButtonView);
