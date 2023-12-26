"use client";

import { range } from "lodash";
import ContentsCardView from "@/view/ContentsCardView";

const MainContentsView = () => {
  return (
    <div className="mt-[10px] flex h-[70vh] w-full flex-wrap justify-between overflow-y-auto pr-[1%] tablet:h-[72vh]">
      {range(0, 15).map((item) => (
        <ContentsCardView isFull={false} />
      ))}
    </div>
  );
};

export default MainContentsView;
