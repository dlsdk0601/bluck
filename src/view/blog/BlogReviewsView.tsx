"use client";

import React, { memo, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { ReviewBlog } from "@/type/definitions";
import { d1 } from "@/ex/dateEx";
import { preventDefaulted } from "@/ex/utils";
import { userState } from "@/store/user";
import { useClickOutside } from "@/hooks/useClickOutside";
import { reviewModel } from "@/store/review";

const BlogReviewsView = (props: { blogPk: number; reviews: ReviewBlog[] }) => {
  const reviewsCount = reviewModel((state) => state.reviewsCount());
  const setReviews = reviewModel((state) => state.action.setReviews);
  const onSubmit = reviewModel((state) => state.fetch.newReview);

  useEffect(() => {
    setReviews([...props.reviews]);
  }, [props]);

  return (
    <div className="mx-auto w-11/12">
      <form onSubmit={preventDefaulted(() => onSubmit(props.blogPk))}>
        <p>{reviewsCount}개의 댓글</p>
        <BlogReviewTextAreaView />
        <div className="mt-2 flex justify-end">
          <button type="submit" className="rounded-xl bg-c1f295a px-2 py-1 text-xs text-cffffff">
            댓글 작성
          </button>
        </div>
      </form>

      <BlogReviewListView />
    </div>
  );
};

const BlogReviewTextAreaView = memo(() => {
  const review = reviewModel((state) => state.review);
  const setReview = reviewModel((state) => state.action.setReview);
  return (
    <textarea
      className="mt-2 h-[80px] w-full resize-none rounded border border-c4c547b p-1 focus:outline-none"
      value={review}
      onChange={(e) => setReview(e.target.value)}
    />
  );
});

const BlogReviewListView = memo(() => {
  const userPk = userState((state) => state.user?.pk);
  const reviews = reviewModel((state) => state.reviews);

  return (
    <ul className="mt-10">
      {reviews.map((review) => (
        <BlogReviewsItemView
          key={`blog-review-${review.pk}`}
          review={review}
          isEditable={userPk === review.user.pk}
        />
      ))}
    </ul>
  );
});

const BlogReviewsItemView = memo((props: { review: ReviewBlog; isEditable: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { isOpen, setIsOpen } = useClickOutside(ref);
  const setIsEdit = reviewModel((state) => state.action.setIsEdit);
  const onDelete = reviewModel((state) => state.fetch.deleteReview);

  const setEdit = () => {
    setIsEdit(props.review.pk);
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
                  onClick={() => onDelete(props.review.pk)}
                >
                  삭제
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      <BlogReviewEditView pk={props.review.pk} review={props.review.review} />
    </li>
  );
});

const BlogReviewEditView = memo((props: { pk: number; review: string }) => {
  const onEdit = reviewModel((state) => state.fetch.editReview);
  const isEdit = reviewModel((state) => state.isEdit(props.pk));
  const [editReview, setEditReview] = useState(props.review);

  if (!isEdit) {
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
          className="rounded-xl border px-2 py-1 text-xs"
          onClick={() => onEdit(editReview)}
        >
          수정
        </button>
      </div>
    </>
  );
});

export default memo(BlogReviewsView);
