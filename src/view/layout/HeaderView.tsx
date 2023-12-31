"use client";

import { useCallback } from "react";
import Link from "next/link";
import { isNil } from "lodash";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { tokenState } from "@/store/token";
import { Urls } from "@/url/url.g";

const HeaderView = () => {
  const router = useRouter();
  const { token, setToken } = tokenState();

  const onClickSignOut = useCallback(() => {
    setToken(null);
    router.replace(Urls.page.url());
  }, []);

  return (
    <header className="flex w-full items-center justify-between px-10 pb-3 pt-5">
      <HeaderLinkView label="BLUCK" url={Urls.page.url()} logo />
      <ul className="flex w-1/2 items-center justify-end">
        {isNil(token) ? (
          <>
            <li>
              <HeaderLinkView label="LOG_IN" url={Urls["sign-in"].page.url()} />
            </li>
            <li>
              <HeaderLinkView label="JOIN" url={Urls["sign-up"].page.url()} />
            </li>
          </>
        ) : (
          <>
            <li>
              <HeaderLinkView label="MY PAGE" url={Urls.page.url()} />
            </li>
            <li>
              <HeaderLinkView
                label="LOG_OUT"
                url={Urls.page.url()}
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
