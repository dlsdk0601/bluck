"use client";

import { useInView } from "react-intersection-observer";
import { memo, useEffect, useState } from "react";
import { isNil } from "lodash";
import { getBlogListAction } from "@/server/blogActions";
import { ignorePromise, isNotBlank, isNotNil } from "@/ex/utils";
import { MainContentsCardSkeleton } from "@/view/skeleton/MainContentsSkeleton";
import {
  GetBlogsActionResItem,
  SearchDataType,
  SearchOrderByType,
  SearchType,
} from "@/type/definitions";
import { PaginationType } from "@/ex/paginationEx";
import BlogCardView from "./BlogCardView";

const MainBlogView = (props: {
  initBlogs: PaginationType<GetBlogsActionResItem>;
  search?: string;
  searchType?: SearchType;
  searchOrderByType?: SearchOrderByType;
  searchDateType?: SearchDataType;
}) => {
  const { ref, inView } = useInView();
  const [page, setPage] = useState(1);
  const [blogs, setBlogs] = useState<GetBlogsActionResItem[]>([]);
  const [hasNext, setHasNext] = useState(true);
  const [error, setError] = useState("");
  const onFetch = async () => {
    // 다음 페이지가 없으면 막는다.
    if (!hasNext) {
      return;
    }

    const res = await getBlogListAction(
      page + 1,
      props.search ?? "",
      props.searchType,
      props.searchOrderByType,
      props.searchDateType,
    );

    if (isNotNil(res.error)) {
      setError(res.error);
      return;
    }

    if (isNil(res.data?.blogs)) {
      return;
    }

    setBlogs([...blogs, ...res.data.blogs.rows]);
    setPage(res.data.blogs.page);
    setHasNext(res.data.blogs.hasNext);
  };

  useEffect(() => {
    setPage(props.initBlogs.page);
    setHasNext(props.initBlogs.hasNext);
    setBlogs([...props.initBlogs.rows]);
  }, [props]);

  useEffect(() => {
    if (inView) {
      ignorePromise(() => onFetch());
    }
  }, [inView]);

  return (
    <div className="mt-[10px] flex h-[70vh] w-full flex-wrap justify-between overflow-y-auto pr-[1%] tablet:h-[72vh]">
      {blogs.map((blog) => (
        <BlogCardView key={`blog-card-view-${blog.pk}`} blog={blog} />
      ))}
      {hasNext && (
        <>
          <MainContentsCardSkeleton ref={ref} />
          <MainContentsCardSkeleton />
        </>
      )}
      {isNotBlank(error) && <p>{error}</p>}
    </div>
  );
};

export default memo(MainBlogView);
