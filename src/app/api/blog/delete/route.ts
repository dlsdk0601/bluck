import { NextRequest, NextResponse } from "next/server";
import { isNil } from "lodash";
import { ApiRes, ERR, notFoundException, unAuthorizedException } from "@/lib/errorEx";
import { auth } from "@/server/auth/auth";
import { NewBlogReviewReq } from "@/app/api/blog/review/new/route";
import prisma from "@/lib/prisma";

export interface DeleteBlogReq {
  pk: number;
}

export interface DeleteBlogRes {
  pk: number;
}

export async function POST(req: NextRequest): Promise<ApiRes<DeleteBlogRes>> {
  const session = await auth();

  if (isNil(session?.user)) {
    return unAuthorizedException(ERR.NOT_SIGN_USER);
  }

  const body: NewBlogReviewReq = await req.json();

  const blog = await prisma.blog.findUnique({
    where: {
      pk: body.pk,
      deleted_at: null,
    },
  });

  if (isNil(blog)) {
    return notFoundException(ERR.NOT_FOUND("블로그"));
  }

  if (blog.user_pk !== session.user.pk) {
    return unAuthorizedException(ERR.NOT_SIGN_USER);
  }

  const res = await prisma.blog.update({
    data: {
      deleted_at: {
        set: new Date(),
      },
    },
    where: {
      pk: body.pk,
    },
  });

  return NextResponse.json({
    pk: res.pk,
  });
}
