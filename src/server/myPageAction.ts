import { isNil } from "lodash";
import { auth } from "@/server/auth/auth";
import { err, MyPageInitActionType, MyPageTag, ok } from "@/type/definitions";
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

    const [user, blogs] = await prisma.$transaction([
      prisma.user.findFirst({
        include: {
          main_image: true,
        },
        where: {
          pk: session.user.pk,
          email: session.user.email ?? undefined,
        },
      }),
      prisma.blog.findMany({
        select: {
          pk: true,
          title: true,
          body: true,
          created_at: true,
          banner_image: true,
          _count: {
            select: {
              blog_view: true,
              blog_like: true,
            },
          },
          tags: {
            select: {
              tag: true,
            },
          },
        },
        where: {
          user_pk: session.user.pk,
        },
      }),
    ]);

    if (isNil(user)) {
      return err(ERR.NOT_FOUND("유저 정보"));
    }

    const tags: MyPageTag[] = blogs.flatMap((blog) =>
      blog.tags.map((tag) => ({ pk: tag.tag.pk, name: tag.tag.name })),
    );

    return ok({
      user: {
        profile: awsModel.toFileSet(user.main_image),
        name: user.name,
        email: user.email,
        message: user.message,
        introduce: user.introduce,
      },
      tags,
      blogs: blogs.map((blog) => ({
        pk: blog.pk,
        banner: awsModel.toFileSet(blog.banner_image),
        title: blog.title,
        body: blog.body,
        createAt: d1(blog.created_at),
        user: {
          profile: awsModel.toFileSet(user.main_image),
          name: user.name,
        },
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
