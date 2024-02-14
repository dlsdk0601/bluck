"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import classNames from "classnames";
import { MyPageTag } from "@/type/definitions";
import { Urls } from "@/url/url.g";

const MyPageTagsView = (props: { tags: MyPageTag[] }) => {
  const query = useSearchParams();

  return (
    <ul className="h-[47vh] w-full rounded-xl bg-ccfd1dd px-3 py-6">
      {props.tags.map((tag) => (
        <li
          key={`my-page-tag-${tag.pk}`}
          className={classNames("m-1 rounded bg-c1f295a px-2 py-1 text-center text-cffffff", {
            "opacity-50": !query.getAll("tags").includes(tag.pk.toString()),
          })}
        >
          <Link href={Urls["my-page"].page.setQuery(query, { tags: tag.pk.toString() })}>
            {tag.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MyPageTagsView;
