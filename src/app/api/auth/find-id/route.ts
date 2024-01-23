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
    return badRequestException(errorMessage.NAME_REQUIRED);
  }

  if (isBlank(body.phone)) {
    return badRequestException(errorMessage.PHONE_REQUIRED);
  }

  if (vPhone(body.phone)) {
    return badRequestException(errorMessage.PHONE_BAD_FORMAT);
  }

  const user = await prisma.user.findFirst({
    where: {
      name: body.name,
      phone: body.phone,
    },
  });

  if (isNil(user)) {
    return notFoundException(errorMessage.USER_NOT_FOUND);
  }

  return NextResponse.json({ id: user.email });
}
