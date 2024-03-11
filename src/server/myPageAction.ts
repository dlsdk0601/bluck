import { isEmpty, isNil, isString } from "lodash";
import { auth } from "@/server/auth/auth";
import { err, MyPageBlogsActionType, MyPageInitActionType, ok } from "@/type/definitions";
import { ERR } from "@/lib/errorEx";
import prisma from "@/lib/prisma";
import { awsModel } from "@/lib/aws";
import { d1 } from "@/ex/dateEx";

export const myPageInitAction: MyPageInitActionType = async () => {
  try {
    const session = await auth();

    if (isNil(session?.user)) {
      return err(ERR.NOT_SIGN_USER);
    }

    const [user, tags] = await prisma.$transaction([
      prisma.user.findFirst({
        include: {
          main_image: true,
        },
        where: {
          pk: session.user.pk,
          email: session.user.email ?? undefined,
        },
      }),
      prisma.blog_tag.findMany({
        select: {
          tag: {
            select: {
              pk: true,
              name: true,
            },
          },
        },
        where: {
          blog: {
            user_pk: session.user.pk,
          },
        },
      }),
    ]);

    if (isNil(user)) {
      return err(ERR.NOT_FOUND("유저 정보"));
    }

    return ok({
      user: {
        profile: awsModel.toFileSet(user.main_image),
        name: user.name,
        email: user.email,
        message: user.message,
        introduce: user.introduce,
      },
      tags: tags.map((tag) => ({ pk: tag.tag.pk, name: tag.tag.name })),
    });
  } catch (e) {
    if (e instanceof Error) {
      return err(e.message);
    }

    console.error(e);
    return err(ERR.INTERNAL_SERVER);
  }
};

export const myPageBlogsAction: MyPageBlogsActionType = async (tagPks) => {
  try {
    let tags;
    const tagFilterPks = isString(tagPks) ? [Number(tagPks)] : tagPks.map((pk) => Number(pk));
    const session = await auth();

    if (isNil(session?.user)) {
      return err(ERR.NOT_SIGN_USER);
    }

    if (!isEmpty(tagFilterPks)) {
      tags = {
        some: {
          OR: tagFilterPks.map((pk) => ({ tag_pk: pk })),
        },
      };
    }

    const blogs = await prisma.blog.findMany({
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
          },
        },
      },
      where: {
        user_pk: session.user.pk,
        tags,
        deleted_at: null,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return ok({
      blogs: blogs.map((blog) => ({
        pk: blog.pk,
        banner: awsModel.toFileSet(blog.banner_image),
        title: blog.title,
        body: blog.body,
        user: { name: blog.user.name, profile: awsModel.toFileSet(blog.user.main_image) },
        createAt: d1(blog.created_at),
        viewCount: blog._count.blog_view,
        likeCount: blog._count.blog_like,
      })),
    });
  } catch (e) {
    if (e instanceof Error) {
      return err(e.message);
    }

    console.error(e);
    return err(ERR.INTERNAL_SERVER);
  }
};
