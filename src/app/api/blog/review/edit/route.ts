import { NextRequest, NextResponse } from "next/server";
import { isNil } from "lodash";
import { ApiRes, ERR, notFoundException, unAuthorizedException } from "@/lib/errorEx";
import { auth } from "@/server/auth/auth";
import prisma from "@/lib/prisma";

export interface EditBlogReviewReq {
  pk: number;
  review: string;
}

export interface EditBlogReviewRes {
  pk: number;
}

export async function POST(req: NextRequest): Promise<ApiRes<EditBlogReviewRes>> {
  const session = await auth();

  if (isNil(session?.user)) {
    return unAuthorizedException(ERR.NOT_SIGN_USER);
  }

  const body: EditBlogReviewReq = await req.json();

  const blogReview = await prisma.blog_review.findUnique({ where: { pk: body.pk } });

  if (isNil(blogReview)) {
    return notFoundException(ERR.NOT_FOUND("블로그 댓글"));
  }

  const res = await prisma.blog_review.update({
    data: {
      review: body.review,
    },
    where: {
      pk: body.pk,
    },
  });

  return NextResponse.json({
    pk: res.pk,
  });
}
