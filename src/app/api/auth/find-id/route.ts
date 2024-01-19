import { NextRequest, NextResponse } from "next/server";
import { isNil } from "lodash";
import prisma from "@/lib/prisma";
import { isBlank } from "@/ex/utils";
import { vPhone } from "@/ex/validate";

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
    return new Error("이름 실패");
  }

  if (isBlank(body.phone)) {
    return new Error("휴대폰 실패");
  }

  if (vPhone(body.phone)) {
    return NextResponse.error();
  }

  const user = await prisma.user.findFirst({
    where: {
      name: body.name,
      phone: body.phone,
    },
  });

  if (isNil(user)) {
    return NextResponse.error();
  }

  return NextResponse.json({ id: user.email });
}
