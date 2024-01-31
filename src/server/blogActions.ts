"use server";

import { Prisma } from "@prisma/client";
import { GetBlogsActionResItem, getBlogsActionType, ok } from "@/type/definitions";
import { awsModel } from "@/lib/aws";
import { d1 } from "@/ex/dateEx";
import prisma from "@/lib/prisma";
import { PAGE_LIMIT, Pagination } from "@/ex/paginationEx";

export const getBlogsAction: getBlogsActionType = async (page, searchType, searchDateType) => {
  // TODO :: 검색 조건
  const query: Prisma.blogFindManyArgs = {
    where: {},
  };

  const [blogs, count] = await prisma.$transaction([
    prisma.blog.findMany({
      select: {
        pk: true,
        title: true,
        created_at: true,
        user: {
          select: {
            name: true,
            main_image: true,
          },
        },
      },
      skip: (page - 1) * PAGE_LIMIT,
      take: PAGE_LIMIT,
      where: query.where,
    }),
    prisma.blog.count({ where: query.where }),
  ]);

  const pagination = new Pagination<GetBlogsActionResItem>(count, page);
  pagination.rows = blogs.map((blog) => ({
    pk: blog.pk,
    title: blog.title,
    createAt: d1(blog.created_at),
    user: {
      profile: awsModel.toFileSet(blog.user.main_image),
      name: blog.user.name,
    },
  }));

  return ok({
    blogs: pagination,
  });
};
