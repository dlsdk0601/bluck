"use server";

import { Prisma } from "@prisma/client";
import {
  GetBlogsActionResItem,
  getBlogsActionType,
  ok,
  SearchDataType,
  SearchType,
} from "@/type/definitions";
import { awsModel } from "@/lib/aws";
import { d1 } from "@/ex/dateEx";
import prisma from "@/lib/prisma";
import { PAGE_LIMIT, Pagination } from "@/ex/paginationEx";

export const getBlogsAction: getBlogsActionType = async (
  page,
  searchType = "LIKE",
  searchDateType = "WEEKLY",
) => {
  const [blogs, count] = await prisma.$transaction([
    prisma.blog.findMany({
      select: {
        pk: true,
        title: true,
        body: true,
        created_at: true,
        user: {
          select: {
            name: true,
            main_image: true,
          },
        },
        _count: {
          select: {
            blog_view: true,
            blog_like: true,
          },
        },
      },
      skip: (page - 1) * PAGE_LIMIT,
      take: PAGE_LIMIT,
      where: setBlogWhere(searchDateType),
      orderBy: setBlogOrderBy(searchType),
    }),
    prisma.blog.count({ where: setBlogWhere(searchDateType) }),
  ]);

  const pagination = new Pagination<GetBlogsActionResItem>(count, page);
  pagination.rows = blogs.map((blog) => ({
    pk: blog.pk,
    title: blog.title,
    body: blog.body,
    createAt: d1(blog.created_at),
    user: {
      profile: awsModel.toFileSet(blog.user.main_image),
      name: blog.user.name,
    },
    viewCount: blog._count.blog_view,
    likeCount: blog._count.blog_like,
  }));

  return ok({
    blogs: JSON.parse(JSON.stringify(pagination)),
  });
};

function setBlogOrderBy(searchType: SearchType): Prisma.blogOrderByWithRelationInput {
  switch (searchType) {
    case "LATEST":
      return { created_at: "desc" };
    case "VIEW":
      return {
        blog_view: {
          _count: "desc",
        },
      };
    case "LIKE":
    default:
      return {
        blog_like: {
          _count: "desc",
        },
      };
  }
}

function setBlogWhere(searchDateType: SearchDataType): Prisma.blogWhereInput {
  switch (searchDateType) {
    case "MONTHLY":
      return {};
    case "YEAR":
      return {};
    case "WEEKLY":
    default:
      return {};
  }
}
