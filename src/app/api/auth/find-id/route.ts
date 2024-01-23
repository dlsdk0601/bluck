import { NextRequest, NextResponse } from "next/server";
import { isNil } from "lodash";
import prisma from "@/lib/prisma";
import { isBlank } from "@/ex/utils";
import { vPhone } from "@/ex/validate";
import { badRequestException, errorMessage, notFoundException } from "@/lib/errorEx";

export interface FindIdReq {
  name: string;
  phone: string;
}

export interface FindIdRes {
  id: string;
}

export async function POST(req: NextRequest) {
  const body: FindIdReq = await req.json();

  if (isBlank(body.name)) {
    return badRequestException(errorMessage.REQUIRED("이름"));
  }

  if (isBlank(body.phone)) {
    return badRequestException(errorMessage.REQUIRED("휴대폰"));
  }

  if (vPhone(body.phone)) {
    return badRequestException(errorMessage.BAD_FORMAT("휴대폰"));
  }

  const user = await prisma.user.findFirst({
    where: {
      name: body.name,
      phone: body.phone,
    },
  });

  if (isNil(user)) {
    return notFoundException(errorMessage.NOT_FOUND("유저"));
  }

  return NextResponse.json({ id: user.email });
}
