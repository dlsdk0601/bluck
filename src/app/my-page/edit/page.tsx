import { isNil } from "lodash";
import Link from "next/link";
import { showUserAction } from "@/server/authActions";
import SignUpFormView from "@/view/auth/SignUpFormView";
import { isNotNil } from "@/ex/utils";
import { Urls } from "@/url/url.g";

const Page = async () => {
  const res = await showUserAction();

  if (isNotNil(res.error) || isNil(res.data)) {
    return (
      <div className="mx-auto flex h-[75vh] w-3/5 items-center justify-center mobile:w-[95%]">
        <div>
          <p className="text-center">{res.error}</p>
          <Link
            href={Urls.page.url()}
            className="mt-3 block rounded border-[1px] border-solid border-c1f295a px-1 py-2 text-center dark:border-cffffff"
          >
            Home 으로 가기
          </Link>
        </div>
      </div>
    );
  }

  return <SignUpFormView data={res.data} />;
};

export default Page;
