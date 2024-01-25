import { NextRequest, NextResponse } from "next/server";
import { isNil } from "lodash";
import { awsModel, Fileset } from "@/lib/aws";
import { ApiRes, badRequestException, internalServerException } from "@/lib/errorEx";
import { isBlank } from "@/ex/utils";

export interface NewAssetReq {
  base64: string;
  name: string;
}

export interface NewAssetRes {
  fileSet: Fileset;
}

export async function POST(req: NextRequest): Promise<ApiRes<NewAssetRes>> {
  const body: NewAssetReq = await req.json();

  if (isBlank(body.base64) || isBlank(body.name)) {
    return badRequestException("파일을 다시 업로드해주세요.");
  }

  const asset = await awsModel.getFileSet(body.name, body.base64);

  if (isNil(asset)) {
    return internalServerException("파일 업로드에 실패하였습니다.");
  }

  return NextResponse.json({
    fileSet: asset,
  });
}
