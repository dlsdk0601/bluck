"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ReviewBlog } from "@/type/definitions";
import { d1 } from "@/ex/dateEx";

const BlogReviewView = (props: { reviews: ReviewBlog[] }) => {
  const [reviews, setReviews] = useState<ReviewBlog[]>([]);

  useEffect(() => {
    setReviews([...props.reviews]);
  }, [props]);

  return (
    <div className="mx-auto w-11/12">
      <form>
        <p>{reviews.length}개의 댓글</p>
        <textarea className="mt-2 h-[80px] w-full resize-none rounded border border-c4c547b p-1 focus:outline-none" />
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
            <p className="mt-5">{review.review}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogReviewView;
