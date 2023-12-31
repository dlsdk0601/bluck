"use client";

import Image from "next/image";
import useDarkMode from "@/hooks/useDarkMode";
import { SelectBoxView } from "./SelectBoxView";

const SearchBox = () => {
  const { isDarkMode } = useDarkMode();
  return (
    <form className="flex h-[20px] w-56 items-center justify-start rounded-xl bg-ccfd1dd dark:bg-c000000 tablet:w-60 mobile:w-40">
      <SelectBoxView
        value="H"
        options={[
          ["H", "작성자"],
          ["I", "제목"],
        ]}
        onChange={() => {}}
        className="ml-1 mr-0 mobile:mr-0"
      />
      <input
        type="text"
        className="h-full w-[50%] border-none bg-ccfd1dd text-[12px] text-c1f295a focus:outline-none dark:bg-c000000 dark:text-cffffff mobile:w-[55%] mobile:text-[8px]"
      />
      <div className="ml-1 h-[15px] w-[15px] cursor-pointer mobile:top-1/3 mobile:ml-0 mobile:h-[10px] mobile:w-[10px]">
        <Image
          src={isDarkMode ? "/assets/img/whiteLenz.png" : "/assets/img/blackLenz.png"}
          alt="lenz"
          width={15}
          height={15}
        />
      </div>
    </form>
  );
};

export default SearchBox;
