"use client";

import React from "react";
import { mf1 } from "@/ex/numberEx";
import { reviewModel } from "@/store/review";

const BlogReviewCountView = () => {
  const reviewCount = reviewModel((state) => state.reviewsCount());
  return (
    <figcaption className="ml-[10px] text-[14px]  mobile:ml-[2px] mobile:text-[10px]">
      {mf1(reviewCount ?? 0)}
    </figcaption>
  );
};

export default BlogReviewCountView;
