import { isNil } from "lodash";
import { NextRequest, NextResponse } from "next/server";
import { ApiRes, badRequestException, ERR, unAuthorizedException } from "@/lib/errorEx";
import { auth } from "@/server/auth/auth";
import prisma from "@/lib/prisma";
import { isNotNil } from "@/ex/utils";

export interface NewTagReq {
  name: string;
}

export interface NewTagRes {
  pk: number;
}

export async function POST(req: NextRequest): Promise<ApiRes<NewTagRes>> {
  const session = await auth();

  if (isNil(session?.user)) {
    return unAuthorizedException(ERR.NOT_SIGN_USER);
  }

  const body: NewTagReq = await req.json();

  const tag = await prisma.tag.findFirst({
    where: {
      name: body.name,
    },
  });

  if (isNotNil(tag)) {
    return badRequestException(ERR.BAD_REQUEST);
  }

  const newTag = await prisma.tag.create({
    data: {
      name: body.name,
    },
  });

  return NextResponse.json({
    pk: newTag.pk,
  });
}
