import { NextRequest, NextResponse } from "next/server";
import { isNil } from "lodash";
import { ApiRes, ERR, unAuthorizedException } from "@/lib/errorEx";
import { ReviewBlog, ReviewGetReq, ReviewGetRes } from "@/type/definitions";
import { auth } from "@/server/auth/auth";
import prisma from "@/lib/prisma";
import { awsModel } from "@/lib/aws";

export async function POST(req: NextRequest): Promise<ApiRes<ReviewGetRes>> {
  const session = await auth();

  if (isNil(session?.user)) {
    return unAuthorizedException(ERR.NOT_SIGN_USER);
  }

  const body: ReviewGetReq = await req.json();

  return NextResponse.json({
    reviews: await getReviews(body.pk),
  });
}

export async function getReviews(pk: number): Promise<ReviewBlog[]> {
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
      blog_pk: pk,
      deleted_at: null,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return reviews.map((rv) => ({
    pk: rv.pk,
    review: rv.review,
    createAt: rv.created_at,
    user: {
      pk: rv.user.pk,
      name: rv.user.name,
      mainImage: awsModel.toFileSet(rv.user.main_image),
    },
  }));
}