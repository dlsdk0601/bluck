import { NextRequest, NextResponse } from "next/server";
import { ApiRes } from "@/lib/errorEx";
import { ReviewGetReq, ReviewGetRes } from "@/type/definitions";
import prisma from "@/lib/prisma";
import { awsModel } from "@/lib/aws";

export async function POST(req: NextRequest): Promise<ApiRes<ReviewGetRes>> {
  const body: ReviewGetReq = await req.json();

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
      blog_pk: body.pk,
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
