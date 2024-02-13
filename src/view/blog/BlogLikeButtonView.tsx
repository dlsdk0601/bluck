"use client";

import { memo, useState } from "react";
import { isNil } from "lodash";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { HandThumbUpIcon as HandThumbUpSolidIcon } from "@heroicons/react/24/solid";
import { blogLikeActionType } from "@/server/blogActions";
import { isLockState } from "@/store/isLock";
import { isNotNil } from "@/ex/utils";
import { mf1 } from "@/ex/numberEx";

const BlogLikeButtonView = (props: { pk: number; likeCount: number; hasLike: boolean }) => {
  const setIsLock = isLockState((state) => state.setIsLock);
  const [count, setCount] = useState(props.likeCount);
  const [hasLike, setHasLike] = useState(props.hasLike);

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
      setHasLike(res.data.hasLike);
    } catch (e) {
      console.error(e);
      alert("잠시 후 다시 시도해주세요.");
    } finally {
      setIsLock(false);
    }
  };

  return (
    <figure
      className="mx-[5px] flex cursor-pointer items-center justify-between"
      onClick={() => onClickLikeButton()}
    >
      {hasLike ? <HandThumbUpSolidIcon className="w-5" /> : <HandThumbUpIcon className="w-5" />}
      <figcaption className="ml-[10px] text-[14px] mobile:ml-[2px] mobile:text-[10px]">
        {mf1(count)}
      </figcaption>
    </figure>
  );
};

export default memo(BlogLikeButtonView);
