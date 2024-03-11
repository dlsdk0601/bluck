import { NextRequest, NextResponse } from "next/server";
import { isNil } from "lodash";
import { ReviewBlog } from "@/type/definitions";
import { ApiRes, ERR, notFoundException, unAuthorizedException } from "@/lib/errorEx";
import { auth } from "@/server/auth/auth";
import { NewBlogReviewReq } from "@/app/api/blog/review/new/route";
import prisma from "@/lib/prisma";
import { awsModel } from "@/lib/aws";

export interface DeleteBlogReviewReq {
  pk: number;
}

export interface DeleteBlogReviewRes {
  reviews: ReviewBlog[];
}

export async function POST(req: NextRequest): Promise<ApiRes<DeleteBlogReviewRes>> {
  const session = await auth();

  if (isNil(session?.user)) {
    return unAuthorizedException(ERR.NOT_SIGN_USER);
  }

  const body: NewBlogReviewReq = await req.json();

  const blogReview = await prisma.blog_review.findUnique({ where: { pk: body.pk } });

  if (isNil(blogReview)) {
    return notFoundException(ERR.NOT_FOUND("블로그 댓글"));
  }

  await prisma.blog_review.update({
    data: {
      deleted_at: {
        set: new Date(),
      },
    },
    where: {
      pk: body.pk,
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
      blog_pk: blogReview.blog_pk,
      deleted_at: null,
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
