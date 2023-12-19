"use client";

import { useCallback } from "react";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { isNil } from "lodash";
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
      <HeaderLinkView label="BLUCK" url={Urls.index.urlString()} logo />
      <ul className="flex w-1/2 items-center justify-end">
        {isNil(token) ? (
          <>
            <li>
              <HeaderLinkView label="LOG_IN" url={Urls["sign-in"].index.urlString()} />
            </li>
            <li>
              <HeaderLinkView label="JOIN" url={Urls["sign-up"].index.urlString()} />
            </li>
          </>
        ) : (
          <>
            <li>
              <HeaderLinkView label="MY PAGE" url={Urls.index.urlString()} />
            </li>
            <li>
              <HeaderLinkView
                label="LOG_OUT"
                url={Urls.index.urlString()}
                onClick={() => onClickSignOut()}
              />
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

const HeaderLinkView = (props: {
  label: string;
  logo?: boolean;
  url: string;
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
