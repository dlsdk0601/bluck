import { isEmpty, isNil } from "lodash";
import isEmail from "validator/lib/isEmail";
import isUrl from "validator/lib/isURL";

export const vEmail = (value: any): string | undefined => {
  if (typeof value !== "string") {
    return "문자로 입력해주세요.";
  }

  // 값이 없을 경우 무시
  if (isNil(value) || isEmpty(value)) {
    return "이메일은 필수 입력사항입니다.";
  }

  if (!isEmail(value)) {
    return "이메일 형식에 맞게 입력해주세요";
  }
};

export const vPhone = (value: string): string | undefined => {
  if (isNil(value) || isEmpty(value)) {
    return "핸드폰번호는 필수 입력사항입니다.";
  }

  const cleaned = value.replaceAll("-", "");
  const matcher: RegExp = /^(\d{3})(\d{4})(\d{4})$/;

  if (!cleaned.startsWith("01")) {
    return "핸드폰번호 형식이 잘 못 되었습니다.";
  }

  if (!cleaned.match(matcher)) {
    return "핸드폰번호 형식이 잘 못 되었습니다.";
  }
};

export const vUrl = (value: string): string | undefined => {
  if (isNil(value) || isEmpty(value)) {
    return "url은 필수 입력사항입니다.";
  }

  if (!isUrl(value)) {
    return "URL 형식에 맞게 입력해주세요";
  }
};

export const vPassword = (value: any): string | undefined => {
  if (typeof value !== "string") {
    return "문자로 입력해주세요.";
  }

  // 값이 없을 경우 무시
  if (isNil(value) || isEmpty(value)) {
    return "비밀번호는 필수 입력사항입니다.";
  }

  const reg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/;
  if (!value.match(reg)) {
    return "비밀번호는 8자 이상 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.";
  }
};
