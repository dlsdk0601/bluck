import { NextRequest, NextResponse } from "next/server";
import { isNil } from "lodash";
import { ApiRes, ERR, notFoundException, unAuthorizedException } from "@/lib/errorEx";
import { auth } from "@/server/auth/auth";
import prisma from "@/lib/prisma";
import { ReviewNewReq, ReviewNewRes } from "@/type/definitions";

export async function POST(req: NextRequest): Promise<ApiRes<ReviewNewRes>> {
  const session = await auth();

  if (isNil(session?.user)) {
    return unAuthorizedException(ERR.NOT_SIGN_USER);
  }

  const body: ReviewNewReq = await req.json();

  const blog = await prisma.blog.findUnique({ where: { pk: body.pk, deleted_at: null } });

  if (isNil(blog)) {
    return notFoundException(ERR.NOT_FOUND("블로그"));
  }

  const res = await prisma.blog_review.create({
    data: {
      blog_pk: blog.pk,
      user_pk: session.user.pk,
      review: body.review,
    },
  });

  return NextResponse.json({
    pk: res.pk,
  });
}
