"use server";

import { AuthError } from "next-auth";
import { isNil, isString } from "lodash";
import { faker } from "@faker-js/faker/locale/ko";
import { vEmail, vPassword, vPhone } from "@/ex/validate";
import { isBlank, isNotNil } from "@/ex/utils";
import { errorMessage } from "@/lib/errorEx";
import prisma from "@/lib/prisma";
import { getHash } from "@/ex/bcryptEx";
import { taskMailer } from "@/lib/taskMailer";
import { signIn } from "./auth/auth";

export async function signInAction(prevState: string | undefined, formData: FormData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    // email, password validation
    const validEmail = vEmail(email);
    if (isNotNil(validEmail)) {
      return validEmail;
    }

    const validPassword = vPassword(password);
    if (isNotNil(validPassword)) {
      return validPassword;
    }

    await signIn("credentials", formData);
  } catch (e) {
    if (e instanceof AuthError) {
      switch (e.type) {
        case "CredentialsSignin":
          return errorMessage.NOT_FOUND("유저");
        default:
          return errorMessage.SIGN_ING_FAILED;
      }
    }

    throw e;
  }
}

interface FindIdActionRes {
  error: string | null;
  data: null | { id: string };
}

export async function findIdAction(
  prevState: FindIdActionRes | undefined,
  formData: FormData,
): Promise<FindIdActionRes> {
  try {
    const name = formData.get("name");
    const phone = formData.get("phone");

    if (isNil(name) || isBlank(name)) {
      return { error: errorMessage.REQUIRED("이름"), data: null };
    }

    if (isNil(phone) || isBlank(phone)) {
      return { error: errorMessage.REQUIRED("휴대폰"), data: null };
    }

    if (!isString(name)) {
      return { error: errorMessage.ONLY_STRING("이름"), data: null };
    }

    if (!isString(phone)) {
      return { error: errorMessage.ONLY_STRING("휴대폰"), data: null };
    }

    if (vPhone(phone)) {
      return { error: errorMessage.BAD_FORMAT("휴대폰"), data: null };
    }

    const user = await prisma.user.findFirst({
      where: { name, phone },
    });

    if (isNil(user)) {
      return { error: errorMessage.NOT_FOUND("유저"), data: null };
    }

    return { error: null, data: { id: user.email } };
  } catch (e) {
    if (e instanceof Error) {
      return { error: e.message, data: null };
    }

    throw e;
  }
}

interface FindPasswordRes {
  error: string | null;
  data: null | { result: string };
}

export async function findPasswordAction(
  prevState: FindPasswordRes | undefined,
  formData: FormData,
): Promise<FindPasswordRes> {
  try {
    const name = formData.get("name");
    const email = formData.get("email");

    if (isNil(name) || isBlank(name)) {
      return { error: errorMessage.REQUIRED("이름"), data: null };
    }

    if (isNil(email) || isBlank(email)) {
      return { error: errorMessage.REQUIRED("이메일"), data: null };
    }

    if (!isString(name)) {
      return { error: errorMessage.ONLY_STRING("이름"), data: null };
    }

    if (!isString(email)) {
      return { error: errorMessage.ONLY_STRING("이메일"), data: null };
    }

    if (vEmail(email)) {
      return { error: errorMessage.BAD_FORMAT("이메일"), data: null };
    }

    const user = await prisma.user.findUnique({
      where: {
        name,
        email,
      },
    });

    if (isNil(user)) {
      return { error: errorMessage.NOT_FOUND("유저"), data: null };
    }

    // 비밀번호 갱신
    const purePassword = faker.internet.password();
    const newPassword = await getHash(purePassword);
    await prisma.user.update({
      where: user,
      data: {
        password: newPassword,
      },
    });

    // 새 비밀번호 mail 로 전송
    const res = await taskMailer.sendPassword(email, purePassword);

    return { error: null, data: { result: res } };
  } catch (e) {
    if (e instanceof Error) {
      return { error: e.message, data: null };
    }
    throw e;
  }
}
