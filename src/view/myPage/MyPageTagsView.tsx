"use client";

import { useRouter, useSearchParams } from "next/navigation";
import classNames from "classnames";
import { pull } from "lodash";
import { MyPageTag } from "@/type/definitions";
import { Urls } from "@/url/url.g";

const MyPageTagsView = (props: { tags: MyPageTag[] }) => {
  const router = useRouter();
  const query = useSearchParams();
  const tags = query.getAll("tags");

  const onClickTag = (tag: MyPageTag) => {
    if (tags.includes(tag.pk.toString())) {
      pull(tags, tag.pk.toString());
    } else {
      tags.push(tag.pk.toString());
    }

    let queryString = "";

    // array 형으로 query 를 set 해주는 method 가 따로 없어서 string 으로 바로 처리 한다.
    for (let i = 0; i < tags.length; i++) {
      queryString += `tags=${tags[i]}${i === tags.length - 1 ? "" : "&"}`;
    }

    router.replace(`${Urls["my-page"].show.page.url()}?${queryString}`);
  };

  return (
    <div className="h-full w-1/6">
      <p className="mb-2 h-11 w-full rounded-xl bg-c1f295a py-2 text-center text-lg text-cffffff opacity-90">
        태그
      </p>
      <ul className="h-[47vh] w-full rounded-xl bg-ccfd1dd px-3 py-6">
        {props.tags.map((tag) => (
          <li
            key={`my-page-tag-${tag.pk}`}
            className={classNames("m-1 rounded bg-c1f295a px-2 py-1 text-center text-cffffff", {
              "opacity-50": !tags.includes(tag.pk.toString()),
            })}
          >
            <button type="button" onClick={() => onClickTag(tag)}>
              {tag.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyPageTagsView;
