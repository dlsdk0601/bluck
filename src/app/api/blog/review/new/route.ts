import { NextRequest, NextResponse } from "next/server";
import { isNil } from "lodash";
import { ApiRes, ERR, notFoundException, unAuthorizedException } from "@/lib/errorEx";
import { auth } from "@/server/auth/auth";
import prisma from "@/lib/prisma";
import { ReviewBlog } from "@/type/definitions";
import { awsModel } from "@/lib/aws";

export interface NewBlogReviewReq {
  pk: number;
  review: string;
}

export interface NewBlogReviewRes {
  reviews: ReviewBlog[];
}

export async function POST(req: NextRequest): Promise<ApiRes<NewBlogReviewRes>> {
  const session = await auth();

  if (isNil(session?.user)) {
    return unAuthorizedException(ERR.NOT_SIGN_USER);
  }

  const body: NewBlogReviewReq = await req.json();

  const blog = await prisma.blog.findUnique({ where: { pk: body.pk, deleted_at: null } });

  if (isNil(blog)) {
    return notFoundException(ERR.NOT_FOUND("블로그"));
  }

  await prisma.blog_review.create({
    data: {
      blog_pk: blog.pk,
      user_pk: session.user.pk,
      review: body.review,
    },
  });

  const reviews = await prisma.blog_review.findMany({
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
      blog_pk: blog.pk,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return NextResponse.json({
    reviews: reviews.map((rv) => ({
      pk: rv.pk,
      review: rv.review,
      createAt: rv.created_at,
      user: {
        pk: rv.user.pk,
        name: rv.user.name,
        mainImage: awsModel.toFileSet(rv.user.main_image),
      },
    })),
  });
}
