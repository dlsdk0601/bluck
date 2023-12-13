import Image from "next/image";
import useDarkMode from "@/hooks/useDarkMode";

const FooterView = () => {
  return (
    <footer className="mx-auto mt-2 flex h-[5vh] w-[96vw] items-center justify-between">
      <DarkModeButtonView />
      <div>
        <p className="text-c1f295a dark:text-cffffff mobile:text-[10px] text-right text-[12px] font-medium leading-normal">
          Made by 정인아 / Design by 이지현
        </p>
        <p className="text-c1f295a dark:text-cffffff mobile:text-[10px] text-right text-[12px] font-medium leading-normal">
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
      className="tablet:text-sm text-c1f295a dark:text-cffffff mobile:h-[90%] tablet:h-[80%] border-c1f295a dark:border-cffffff flex h-full w-[130px] items-center justify-around rounded-2xl border-[2px] bg-none text-lg font-medium"
      onClick={() => onClickToggleButton()}
    >
      <figure className="mobile:w-[15px] mobile:h-[15px] relative h-[20px] w-[20px]">
        <Image fill src={isDarkMode ? "/assets/img/sun.png" : "/assets/img/moon.png"} alt="" />
      </figure>
      {isDarkMode ? "라이트모드" : "다크모드"}
    </button>
  );
};

export default FooterView;
