import Link from "next/link";
import { isNil } from "lodash";
import classNames from "classnames";
import { Urls } from "@/url/url.g";
import { auth, signOut } from "@/server/auth/auth";

const HeaderView = async () => {
  const session = await auth();
  return (
    <header className="flex w-full items-center justify-between px-10 pb-3 pt-5">
      <HeaderLinkView label="BLUCK" url={Urls.page.url()} logo />
      <ul className="flex w-1/2 items-center justify-end">
        {isNil(session?.user) ? (
          <>
            <li>
              {/* TODO :: returnTo 설정 */}
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
              <form
                action={async () => {
                  "use server";

                  await signOut();
                }}
              >
                <button
                  className="ml-10 inline cursor-pointer text-lg text-c1f295a dark:text-cffffff tablet:text-lg mobile:ml-5 mobile:text-sm"
                  type="submit"
                >
                  LOG_OUT
                </button>
              </form>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

const HeaderLinkView = (props: { label: string; logo?: boolean; url: string }) => {
  return (
    <Link href={props.url}>
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
