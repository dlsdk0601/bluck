"use server";

import { Prisma } from "@prisma/client";
import moment from "moment";
import { isNil } from "lodash";
import {
  BlogLikeActionType,
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
import { auth } from "@/server/auth/auth";
import { isNotNil } from "@/ex/utils";

export const getBlogListAction: getBlogListActionType = async (
  page,
  search,
  searchType,
  searchOrderByType = "LIKE",
  searchDateType = "WEEKLY",
) => {
  try {
    const [blogs, count] = await prisma.$transaction([
      prisma.blog.findMany({
        select: {
          pk: true,
          title: true,
          body: true,
          created_at: true,
          banner_image: true,
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
              blog_review: true,
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
      banner: awsModel.toFileSet(blog.banner_image),
      viewCount: blog._count.blog_view,
      likeCount: blog._count.blog_like,
      reviewCount: blog._count.blog_review,
    }));

    return ok({
      blogs: JSON.parse(JSON.stringify(pagination)),
    });
  } catch (e) {
    if (e instanceof Error) {
      return err(e.message);
    }

    console.error(e);
    return err(ERR.INTERNAL_SERVER);
  }
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
  where.deleted_at = null;

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
  try {
    const session = await auth();
    if (isNotNil(session?.user)) {
      // where 가 있으면 update / 없으면 create
      await prisma.blog_view.upsert({
        where: {
          blog_pk_user_pk: {
            blog_pk: pk,
            user_pk: session.user.pk,
          },
        },
        update: {},
        create: {
          user_pk: session.user.pk,
          blog_pk: pk,
        },
      });
    }

    const blog = await prisma.blog.findUnique({
      select: {
        pk: true,
        title: true,
        body: true,
        created_at: true,
        banner_image: true,
        user: {
          select: {
            pk: true,
            name: true,
            main_image: true,
          },
        },
        blog_review: {
          select: {
            pk: true,
            review: true,
            created_at: true,
            user: {
              select: {
                pk: true,
                name: true,
                main_image: true,
              },
            },
          },
          where: {
            deleted_at: null,
          },
          orderBy: {
            created_at: "desc",
          },
        },
        blog_like: true,
        tags: { select: { tag: true } },
        _count: {
          select: {
            blog_view: true,
            blog_like: true,
          },
        },
      },
      where: {
        pk,
        deleted_at: null,
      },
    });

    if (isNil(blog)) {
      return err(ERR.NOT_FOUND("블로그 글"));
    }

    const tags = blog.tags.map((item) => item.tag);
    const recommendBlogs = await getRecommendBlogs(blog.pk, tags);

    const reviews = blog.blog_review.map((rv) => ({
      pk: rv.pk,
      review: rv.review,
      createAt: rv.created_at,
      user: {
        pk: rv.user.pk,
        name: rv.user.name,
        mainImage: awsModel.toFileSet(rv.user.main_image),
      },
    }));

    return ok({
      pk: blog.pk,
      title: blog.title,
      body: blog.body,
      banner: awsModel.toFileSet(blog.banner_image),
      createAt: d1(blog.created_at),
      user: {
        pk: blog.user.pk,
        profile: awsModel.toFileSet(blog.user.main_image),
        name: blog.user.name,
      },
      reviews,
      tags,
      viewCount: blog._count.blog_view,
      likeCount: blog._count.blog_like,
      hasLike: blog.blog_like.some((item) => item.user_pk === session?.user?.pk),
      recommendBlogs,
    });
  } catch (e) {
    if (e instanceof Error) {
      return err(e.message);
    }

    console.error(e);
    return err(ERR.INTERNAL_SERVER);
  }
};

const getRecommendBlogs = async (pk: number, tags: { pk: number; name: string }[]) => {
  // 같은 태그를 가지고 있는 블로그 두개를 추천
  const recommendBlobs = await prisma.blog.findMany({
    take: 2,
    select: {
      pk: true,
      title: true,
    },
    where: {
      deleted_at: null,
      NOT: {
        pk,
      },
      tags: {
        some: {
          OR: tags.map((tag) => ({ tag_pk: tag.pk })),
        },
      },
    },
  });

  // 갯수가 충족되지 않으면 그냥 최신순으로 추천 해준다.
  if (recommendBlobs.length !== 2) {
    return prisma.blog.findMany({
      take: 2,
      select: {
        pk: true,
        title: true,
      },
      where: {
        deleted_at: null,
      },
      orderBy: {
        created_at: "desc",
      },
    });
  }

  return recommendBlobs;
};

export const blogLikeActionType: BlogLikeActionType = async (pk: number) => {
  let hasLike = false;
  const session = await auth();

  if (isNil(session)) {
    return err(ERR.NOT_SIGN_USER);
  }

  const user = await prisma.user.findUnique({ where: { email: session.user?.email ?? undefined } });

  if (isNil(user)) {
    return err(ERR.NOT_SIGN_USER);
  }

  const blog = await prisma.blog.findUnique({ where: { pk, deleted_at: null } });

  if (isNil(blog)) {
    return err(ERR.NOT_FOUND("블로그"));
  }

  try {
    const res = await prisma.blog_like.findUnique({
      where: {
        blog_pk_user_pk: {
          blog_pk: blog.pk,
          user_pk: user.pk,
        },
      },
    });

    if (isNil(res)) {
      await prisma.blog_like.create({
        data: {
          blog_pk: blog.pk,
          user_pk: user.pk,
        },
      });

      hasLike = true;
    } else {
      await prisma.blog_like.delete({
        where: {
          blog_pk_user_pk: {
            blog_pk: blog.pk,
            user_pk: user.pk,
          },
        },
      });
    }

    const count = await prisma.blog_like.count({
      where: {
        blog_pk: blog.pk,
      },
    });

    return ok({ pk: blog.pk, count, hasLike });
  } catch (e) {
    if (e instanceof Error) {
      return err(e.message);
    }

    console.error(e);
    return err(ERR.INTERNAL_SERVER);
  }
};
