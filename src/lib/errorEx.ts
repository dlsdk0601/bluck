import { NextResponse } from "next/server";
import { k } from "@/ex/korean-postposition";

export const ERR = {
  ONLY_STRING: (label: string) => k(`${label}(은|는) 문자여야 합니다.`),
  REQUIRED: (label: string) => k(`${label}(은|는) 필수입니다.`),
  BAD_FORMAT: (label: string) => k(`${label} 형식이 잘못되었습니다.`),
  NOT_FOUND: (label: string) => k(`${label}(이|가) 조회되지 않습니다.`),
  SIGN_ING_FAILED: "로그인이 실패하였습니다.\n 잠시 후 다시 시도 해주세요.",
  BAD_REQUEST: "요청 데이터가 잘못되었습니다.",
  INTERNAL_SERVER: "서버가 원활하지 않습니다. 잠시 후 다시 시도해주세요.",
  UN_AUTHORIZED: "해당 요청에 권한이 없습니다.",
  PASSWORD_NOT_MATCH: "비밀번호가 서로 다릅니다.",
  PERSONAL_INFORMATION_AGREE: "개인정보 수집에 동의 하셔야 합니다.",
  EMAIL_DUPLICATE: "이메일이 중복입니다.",
};

export type ApiRes<T> = NextResponse<T> | NextResponse<{ message: string }>;

export function notFoundException(message?: string) {
  return NextResponse.json(
    { message: message ?? ERR.NOT_FOUND("데이터") },
    {
      status: 404,
    },
  );
}

export function badRequestException(message?: string) {
  return NextResponse.json(
    { message: message ?? ERR.BAD_REQUEST },
    {
      status: 400,
    },
  );
}

export function internalServerException(message?: string) {
  return NextResponse.json(
    { message: message ?? ERR.INTERNAL_SERVER },
    {
      status: 500,
    },
  );
}

export function unAuthorizedException(message?: string) {
  return NextResponse.json(
    { message: message ?? ERR.UN_AUTHORIZED },
    {
      status: 401,
    },
  );
}
