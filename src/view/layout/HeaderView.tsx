"use client";

import { UrlObject } from "url";
import { useCallback } from "react";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { isNil } from "lodash";
import Image from "next/image";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { tokenSelector } from "@/store/token";
import { Urls } from "@/url/url.g";
import useDarkMode from "@/hooks/useDarkMode";

const HeaderView = () => {
  const router = useRouter();
  const { isDarkMode } = useDarkMode();
  const [token, setToken] = useRecoilState(tokenSelector);

  const onClickSignOut = useCallback(() => {
    setToken(null);
    router.replace(Urls.index.pathname);
  }, []);

  return (
    <header className="flex w-full items-center justify-between px-10 py-5">
      <HeaderLinkView label="BLUCK" url={Urls.index.url()} logo />
      <ul className="flex w-1/2 items-center justify-end">
        {isNil(token) ? (
          <>
            <li>
              <HeaderLinkView label="LOG_IN" url={Urls.index.url()} />
            </li>
            <li>
              <HeaderLinkView label="JOIN" url={Urls.index.url()} />
            </li>
          </>
        ) : (
          <>
            <li>
              <HeaderLinkView label="MY PAGE" url={Urls.index.url()} />
            </li>
            <li>
              <HeaderLinkView
                label="LOG_OUT"
                url={Urls.index.url()}
                onClick={() => onClickSignOut()}
              />
            </li>
          </>
        )}
        <li>
          <figure className="relative ml-10 h-[20px] w-[20px] cursor-pointer mobile:ml-5 mobile:h-[15px] mobile:w-[15px]">
            <Image
              fill
              src={isDarkMode ? "/assets/img/whiteBell.png" : "/assets/img/blackBell.png"}
              alt="알림"
            />
          </figure>
        </li>
      </ul>
    </header>
  );
};

const HeaderLinkView = (props: {
  label: string;
  logo?: boolean;
  url: UrlObject;
  onClick?: () => void;
}) => {
  return (
    <Link
      href={props.url}
      onClick={(e) => {
        if (isNil(props.onClick)) {
          return;
        }
        e.preventDefault();
        props.onClick();
      }}
    >
      <span
        className={classNames("cursor-pointer text-c1f295a dark:text-cffffff", {
          "text-3xl font-bold tablet:text-2xl mobile:text-xl": props.logo,
          "ml-10 text-lg tablet:text-lg mobile:ml-5 mobile:text-sm": !props.logo,
        })}
      >
        {props.label}
      </span>
    </Link>
  );
};

export default HeaderView;
