"use client";

import React, { useRef } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { isNil, isString } from "lodash";
import { userState } from "@/store/user";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Urls } from "@/url/url.g";
import { ERR } from "@/lib/errorEx";
import { api } from "@/lib/axios";
import { isLockState } from "@/store/isLock";

const EditBlogButtonView = (props: { blogPk: number; userPk: number }) => {
  const router = useRouter();
  const user = userState((state) => state.user);
  const setIsLock = isLockState((state) => state.setIsLock);
  const ref = useRef<HTMLDivElement>(null);
  const { isOpen, setIsOpen } = useClickOutside(ref);

  if (props.userPk !== user?.pk) {
    return <></>;
  }

  const onEdit = () => {
    router.push(Urls.blog.edit.pk.page.urlPk({ pk: props.blogPk }));
  };

  const onDelete = async () => {
    if (isNil(user)) {
      return alert(ERR.NOT_SIGN_USER);
    }

    if (user.pk !== props.userPk) {
      return alert(ERR.UN_AUTHORIZED);
    }

    if (!confirm("블로그를 삭제 하시겠습니까?")) {
      return;
    }

    setIsLock(true);
    const res = await api.deleteBlog({
      pk: props.blogPk,
    });

    if (isString(res)) {
      return alert(res);
    }

    setIsLock(false);
    router.refresh();
  };

  return (
    <div ref={ref} className="relative ms-2">
      <button type="button" onClick={() => setIsOpen(!isOpen)}>
        <EllipsisVerticalIcon className="w-5" />
      </button>
      <div
        className={classNames("z-1 absolute -right-full top-full w-20 divide-y rounded-lg shadow", {
          hidden: !isOpen,
        })}
      >
        <ul className="rounded bg-cffffff py-2 text-sm">
          <li className="cursor-pointer py-1 text-center hover:opacity-70" onClick={() => onEdit()}>
            수정
          </li>
          <li
            className="cursor-pointer py-1 text-center hover:opacity-70"
            onClick={() => onDelete()}
          >
            삭제
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EditBlogButtonView;
