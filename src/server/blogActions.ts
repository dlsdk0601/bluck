"use server";

import { Prisma } from "@prisma/client";
import moment from "moment";
import { isNil } from "lodash";
import {
  err,
  getBlogListActionType,
  GetBlogsActionResItem,
  getBlogShowActionType,
  ok,
  SearchDataType,
  SearchOrderByType,
  SearchType,
} from "@/type/definitions";
import { awsModel } from "@/lib/aws";
import { d1 } from "@/ex/dateEx";
import prisma from "@/lib/prisma";
import { PAGE_LIMIT, Pagination } from "@/ex/paginationEx";
import { ERR } from "@/lib/errorEx";

export const getBlogListAction: getBlogListActionType = async (
  page,
  search,
  searchType,
  searchOrderByType = "LIKE",
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
      where: setBlogWhere(search, searchType, searchDateType),
      orderBy: setBlogOrderBy(searchOrderByType),
    }),
    prisma.blog.count({ where: setBlogWhere(search, searchType, searchDateType) }),
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

function setBlogOrderBy(searchOrderByType: SearchOrderByType): Prisma.blogOrderByWithRelationInput {
  switch (searchOrderByType) {
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

function setBlogWhere(
  search: string,
  searchType: SearchType | undefined,
  searchDateType: SearchDataType,
): Prisma.blogWhereInput {
  const where: Prisma.blogWhereInput = {};

  switch (searchType) {
    case "AUTHOR": {
      where.user = {
        name: {
          contains: search,
        },
      };
      break;
    }
    case "TITLE": {
      where.title = {
        contains: search,
      };
      break;
    }
    default: {
      where.OR = [
        { title: { contains: search } },
        {
          user: {
            name: {
              contains: search,
            },
          },
        },
      ];
    }
  }

  switch (searchDateType) {
    case "MONTHLY": {
      where.OR = [
        ...(where.OR ?? []),
        {
          created_at: { lte: moment().startOf("month").toDate() },
        },
        { created_at: { gte: moment().endOf("month").toDate() } },
      ];
      break;
    }
    case "YEAR": {
      where.OR = [
        ...(where.OR ?? []),
        {
          created_at: { lte: moment().startOf("year").toDate() },
        },
        { created_at: { gte: moment().endOf("year").toDate() } },
      ];
      break;
    }
    case "WEEKLY":
    default: {
      where.OR = [
        ...(where.OR ?? []),
        {
          created_at: { lte: moment().startOf("week").toDate() },
        },
        { created_at: { gte: moment().endOf("week").toDate() } },
      ];
      break;
    }
  }

  return where;
}

export const getBlogShowAction: getBlogShowActionType = async (pk) => {
  const blog = await prisma.blog.findUnique({
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
    where: {
      pk,
    },
  });

  if (isNil(blog)) {
    return err(ERR.NOT_FOUND("블로그 글"));
  }

  return ok({
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
  });
};
