"use client";

import React from "react";
import { ShareIcon } from "@heroicons/react/24/solid";

const ShareButtonView = () => {
  const onClickShare = async () => {
    try {
      if (typeof window === "undefined") {
        return alert("잠시후 다시 시도해주세요");
      }

      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      return alert("복사에 성공했습니다.");
    } catch (e) {
      console.error(e);
      return alert("복사에 실패하였습니다.");
    }
  };

  return (
    <figure
      onClick={() => onClickShare()}
      className="relative ml-3 h-[20px] w-[20px] cursor-pointer mobile:h-[15px] mobile:w-[15px]"
    >
      <ShareIcon className="w-full" />
    </figure>
  );
};

export default ShareButtonView;
