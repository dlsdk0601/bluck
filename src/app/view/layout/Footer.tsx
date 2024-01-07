import Image from "next/image";
import useDarkMode from "@/hooks/useDarkMode";

const FooterView = () => {
  return (
    <footer className="mx-auto mt-2 flex h-[5vh] w-[96vw] items-center justify-between">
      <DarkModeButtonView />
      <div>
        <p className="text-right text-[12px] font-medium leading-normal text-c1f295a dark:text-cffffff mobile:text-[10px]">
          Made by 정인아 / Design by 이지현
        </p>
        <p className="text-right text-[12px] font-medium leading-normal text-c1f295a dark:text-cffffff mobile:text-[8px]">
          Copyright © 2022 bluck. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

const DarkModeButtonView = () => {
  const { isDarkMode, onClickToggleButton } = useDarkMode();
  return (
    <button
      type="button"
      className="flex h-full w-[130px] items-center justify-around rounded-2xl border-[2px] border-c1f295a bg-none text-lg font-medium text-c1f295a dark:border-cffffff dark:text-cffffff tablet:h-[80%] tablet:text-sm mobile:h-[90%]"
      onClick={() => onClickToggleButton()}
    >
      <figure className="relative h-[20px] w-[20px] mobile:h-[15px] mobile:w-[15px]">
        <Image
          fill
          sizes="100vw"
          src={isDarkMode ? "/assets/img/sun.png" : "/assets/img/moon.png"}
          alt=""
        />
      </figure>
      {isDarkMode ? "라이트모드" : "다크모드"}
    </button>
  );
};

export default FooterView;
