"use client";

import React, { memo, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { isNil, isString } from "lodash";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { ReviewBlog } from "@/type/definitions";
import { d1 } from "@/ex/dateEx";
import { api } from "@/lib/axios";
import { preventDefaulted } from "@/ex/utils";
import { isLockState } from "@/store/isLock";
import { userState } from "@/store/user";
import { ERR } from "@/lib/errorEx";
import { useClickOutside } from "@/hooks/useClickOutside";
import { reviewCountSate } from "@/store/reviewCount";

const BlogReviewsView = (props: { blogPk: number; reviews: ReviewBlog[] }) => {
  const setIsLock = isLockState((state) => state.setIsLock);
  const user = userState((state) => state.user);
  const setReviewCount = reviewCountSate((state) => state.setReviewCount);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState<ReviewBlog[]>([]);

  useEffect(() => {
    setReviews([...props.reviews]);
    setReviewCount(props.reviews.length);
  }, [props]);

  const onSubmit = async () => {
    if (isNil(user)) {
      return alert(ERR.NOT_SIGN_USER);
    }

    setIsLock(true);
    const res = await api.newBlogReview({ pk: props.blogPk, review });

    if (isString(res)) {
      return alert(res);
    }

    setReviews([...res.reviews]);
    setReview("");
    setReviewCount(res.reviews.length);
    setIsLock(false);
  };

  const onDelete = async (pk: number) => {
    if (isNil(user)) {
      return alert(ERR.NOT_SIGN_USER);
    }

    if (!confirm("댓글을 삭제 하시겠습니까?")) {
      return;
    }

    setIsLock(true);
    const res = await api.deleteBlogReview({
      pk,
    });

    if (isString(res)) {
      return alert(res);
    }

    setReviews([...res.reviews]);
    setReviewCount(res.reviews.length);
    setIsLock(false);
  };

  return (
    <div className="mx-auto w-11/12">
      <form onSubmit={preventDefaulted(() => onSubmit())}>
        <p>{reviews.length}개의 댓글</p>
        <textarea
          className="mt-2 h-[80px] w-full resize-none rounded border border-c4c547b p-1 focus:outline-none"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <div className="mt-2 flex justify-end">
          <button type="submit" className="rounded-xl bg-c1f295a px-2 py-1 text-xs text-cffffff">
            댓글 작성
          </button>
        </div>
      </form>

      <ul className="mt-10">
        {reviews.map((review) => (
          <BlogReviewsItemView
            key={`blog-review-${review.pk}`}
            review={review}
            isEditable={user?.pk === review.user.pk}
            onDelete={() => onDelete(review.pk)}
          />
        ))}
      </ul>
    </div>
  );
};

const BlogReviewsItemView = memo(
  (props: { review: ReviewBlog; isEditable: boolean; onDelete: () => void }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { isOpen, setIsOpen } = useClickOutside(ref);
    const [isEdit, setIsEdit] = useState(false);

    const setEdit = () => {
      setIsEdit(true);
      setIsOpen(false);
    };

    return (
      <li key={`blog-review-${props.review.pk}`} className="mb-5 rounded-xl bg-cf9f9f9 p-5 shadow">
        <div className="flex items-center justify-start">
          <figure className="relative h-[50px] w-[50px] overflow-hidden rounded-[50px]">
            <Image
              fill
              sizes="100%"
              src={props.review.user.mainImage.url}
              alt="profile-thumbnail"
              className="w-full"
            />
          </figure>
          <div className="ms-3">
            <p>{props.review.user.name}</p>
            <p className="mt-2 text-xs">{d1(props.review.createAt)}</p>
          </div>
          {props.isEditable && (
            <div ref={ref} className="relative ms-auto">
              <button type="button" onClick={() => setIsOpen(!isOpen)}>
                <EllipsisVerticalIcon className="w-5" />
              </button>
              <div
                className={classNames(
                  "z-1 absolute -top-1/2 right-full w-20 divide-y rounded-lg shadow",
                  {
                    hidden: !isOpen,
                  },
                )}
              >
                <ul className="rounded bg-cffffff py-2 text-sm">
                  <li
                    className="cursor-pointer py-1 text-center hover:opacity-70"
                    onClick={() => setEdit()}
                  >
                    수정
                  </li>
                  <li
                    className="cursor-pointer py-1 text-center hover:opacity-70"
                    onClick={() => props.onDelete()}
                  >
                    삭제
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
        <BlogReviewEditView
          pk={props.review.pk}
          isEdit={isEdit}
          review={props.review.review}
          callBack={() => setIsEdit(false)}
        />
      </li>
    );
  },
);

const BlogReviewEditView = memo(
  (props: { pk: number; isEdit: boolean; review: string; callBack: () => void }) => {
    const setIsLock = isLockState((state) => state.setIsLock);
    const [editReview, setEditReview] = useState(props.review);

    const onEdit = async () => {
      setIsLock(true);

      const res = await api.editBlogReview({
        pk: props.pk,
        review: editReview,
      });

      if (isString(res)) {
        return alert(res);
      }

      setIsLock(false);
      props.callBack();
    };

    if (!props.isEdit) {
      return <p className="mt-5 whitespace-pre-wrap">{editReview}</p>;
    }

    return (
      <>
        <textarea
          className="mt-5 h-[80px] w-full resize-none rounded border border-c4c547b p-1 focus:outline-none"
          value={editReview}
          onChange={(e) => setEditReview(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            type="button"
            className=" rounded-xl border px-2 py-1 text-xs"
            onClick={() => onEdit()}
          >
            수정
          </button>
        </div>
      </>
    );
  },
);

export default memo(BlogReviewsView);
