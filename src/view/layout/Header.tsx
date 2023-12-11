"use client";

import { useCallback } from "react";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { isNil } from "lodash";
import { tokenSelector } from "@/store/token";
import { Urls } from "@/url/url.g";

const Header = () => {
  const [token, setToken] = useRecoilState(tokenSelector);

  const onClickSignOut = useCallback(() => {
    setToken(null);
  }, []);

  return (
    <header className="mt-1 flex w-full items-center justify-between pt-1 md:mt-2">
      <Link href={Urls.index.url()}>
        <span className="cursor-pointer text-[30px] font-bold text-[#1f295a] dark:text-white">
          BLUCK
        </span>
      </Link>
      <div>
        {isNil(token) ? (
          <>
            <Link href={Urls.index.url()}>
              <span className="cursor-pointer text-[30px] font-bold text-[#1f295a] dark:text-white">
                LOG_IN
              </span>
            </Link>
            <Link href={Urls.index.url()}>
              <span className="cursor-pointer text-[30px] font-bold text-[#1f295a] dark:text-white">
                JOIN
              </span>
            </Link>
          </>
        ) : (
          <>
            <Link href={Urls.index.url()}>
              <span className="cursor-pointer text-[30px] font-bold text-[#1f295a] dark:text-white">
                MY PAGE
              </span>
            </Link>
            <Link href={Urls.index.url()}>
              <span className="cursor-pointer text-[30px] font-bold text-[#1f295a] dark:text-white">
                LOG-OUT
              </span>
            </Link>
          </>
        )}
        <figure>{/* <img src="" alt=""/> */}</figure>
      </div>
    </header>
  );
};

export default Header;
