"use client";

import React from "react";
import { reviewCountSate } from "@/store/reviewCount";
import { mf1 } from "@/ex/numberEx";

const BlogReviewCountView = () => {
  const reviewCount = reviewCountSate((state) => state.reviewCount);
  return (
    <figcaption className="ml-[10px] text-[14px]  mobile:ml-[2px] mobile:text-[10px]">
      {mf1(reviewCount ?? 0)}
    </figcaption>
  );
};

export default BlogReviewCountView;
