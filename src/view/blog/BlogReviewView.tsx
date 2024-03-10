"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { isNil, isString } from "lodash";
import { ReviewBlog } from "@/type/definitions";
import { d1 } from "@/ex/dateEx";
import { api } from "@/lib/axios";
import { preventDefaulted } from "@/ex/utils";
import { isLockState } from "@/store/isLock";
import { userState } from "@/store/user";
import { ERR } from "@/lib/errorEx";

const BlogReviewView = (props: { blogPk: number; reviews: ReviewBlog[] }) => {
  const setIsLock = isLockState((state) => state.setIsLock);
  const user = userState((state) => state.user);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState<ReviewBlog[]>([]);

  useEffect(() => {
    setReviews([...props.reviews]);
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
    setIsLock(false);
  };

  // TODO :: 삭제 수정 버튼 및 로직 추가
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
          <li key={`blog-review-${review.pk}`} className="mb-5 rounded-xl bg-cf9f9f9 p-5 shadow">
            <div className="flex items-center justify-start">
              <figure className="relative h-[50px] w-[50px] overflow-hidden rounded-[50px]">
                <Image
                  fill
                  sizes="100%"
                  src={review.user.mainImage.url}
                  alt="profile-thumbnail"
                  className="w-full"
                />
              </figure>
              <div className="ms-3">
                <p>{review.user.name}</p>
                <p className="mt-2 text-xs">{d1(review.createAt)}</p>
              </div>
            </div>
            <p className="mt-5 whitespace-pre-wrap">{review.review}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogReviewView;
