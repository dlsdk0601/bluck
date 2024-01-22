import { NextResponse } from "next/server";

export const errorMessage = {
  nameRequired: "이름은 필수입니다.",
  phoneRequired: "휴대폰은 필수입니다.",
  phoneBadFormat: "휴대폰 형식이 잘못되었습니다.",
  userNotFound: "유저가 조회되지 않습니다.",
  signInFailed: "로그인이 실패하였습니다.\n 잠시 후 다시 시도 해주세요.",
};

export function notFoundException(message?: string) {
  return NextResponse.json(
    { message: message ?? "데이터가 조회되지 않습니다." },
    {
      status: 404,
    },
  );
}

export function badRequestException(message?: string) {
  return NextResponse.json(
    { message: message ?? "요청 데이터가 잘못되었습니다." },
    {
      status: 400,
    },
  );
}

export function internalServerException(message?: string) {
  return NextResponse.json(
    { message: message ?? "서버가 원활하지 않습니다. 잠시 후 다시 시도해주세요." },
    {
      status: 500,
    },
  );
}

export function unAuthorizedException(message?: string) {
  return NextResponse.json(
    { message: message ?? "해당 요청에 권한이 없습니다." },
    {
      status: 401,
    },
  );
}
