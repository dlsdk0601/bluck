"use server";

import { AuthError } from "next-auth";
import { isNil, isString } from "lodash";
import { faker } from "@faker-js/faker/locale/ko";
import { vEmail, vPassword, vPhone } from "@/ex/validate";
import { isBlank, isNotNil } from "@/ex/utils";
import { ERR } from "@/lib/errorEx";
import prisma from "@/lib/prisma";
import { getHash } from "@/ex/bcryptEx";
import { taskMailer } from "@/lib/taskMailer";
import {
  err,
  FindIdActionType,
  FindPasswordActionType,
  ok,
  SignInActionType,
  SignUpActionType,
} from "@/type/definitions";
import { signIn } from "./auth/auth";

export const signInAction: SignInActionType = async (prevState, formData) => {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    // email, password validation
    const validEmail = vEmail(email);
    if (isNotNil(validEmail)) {
      return err(validEmail);
    }

    const validPassword = vPassword(password);
    if (isNotNil(validPassword)) {
      return err(validPassword);
    }

    await signIn("credentials", formData);

    return ok({ result: true });
  } catch (e) {
    if (e instanceof AuthError) {
      switch (e.type) {
        case "CredentialsSignin":
          return err(ERR.NOT_FOUND("유저"));
        default:
          return err(ERR.SIGN_ING_FAILED);
      }
    }

    throw e;
  }
};

export const findIdAction: FindIdActionType = async (prevState, formData) => {
  try {
    const name = formData.get("name");
    const phone = formData.get("phone");

    if (isNil(name) || isBlank(name)) {
      return err(ERR.REQUIRED("이름"));
    }

    if (isNil(phone) || isBlank(phone)) {
      return err(ERR.REQUIRED("휴대폰"));
    }

    if (!isString(name)) {
      return err(ERR.ONLY_STRING("이름"));
    }

    if (!isString(phone)) {
      return err(ERR.ONLY_STRING("휴대폰"));
    }

    if (vPhone(phone)) {
      return err(ERR.BAD_FORMAT("휴대폰"));
    }

    const user = await prisma.user.findFirst({
      where: { name, phone },
    });

    if (isNil(user)) {
      return err(ERR.NOT_FOUND("유저"));
    }

    return ok({ id: user.email });
  } catch (e) {
    if (e instanceof Error) {
      return err(e.message);
    }

    throw e;
  }
};

export const findPasswordAction: FindPasswordActionType = async (prevState, formData) => {
  try {
    const name = formData.get("name");
    const email = formData.get("email");

    if (isNil(name) || isBlank(name)) {
      return err(ERR.REQUIRED("이름"));
    }

    if (isNil(email) || isBlank(email)) {
      return err(ERR.REQUIRED("이메일"));
    }

    if (!isString(name)) {
      return err(ERR.ONLY_STRING("이름"));
    }

    if (!isString(email)) {
      return err(ERR.ONLY_STRING("이메일"));
    }

    if (vEmail(email)) {
      return err(ERR.BAD_FORMAT("이메일"));
    }

    const user = await prisma.user.findUnique({
      where: {
        name,
        email,
      },
    });

    if (isNil(user)) {
      return err(ERR.NOT_FOUND("유저"));
    }

    // 비밀번호 갱신
    const purePassword = faker.internet.password({
      prefix: "!",
    });
    const newPassword = await getHash(purePassword);
    await prisma.user.update({
      where: user,
      data: {
        password: newPassword,
      },
    });

    // 새 비밀번호 mail 로 전송
    const res = await taskMailer.sendPassword(email, purePassword);

    return ok({ result: res });
  } catch (e) {
    if (e instanceof Error) {
      return err(e.message);
    }
    throw e;
  }
};

export const signUpAction: SignUpActionType = async (prevState, formData) => {
  const profile = formData.get("profile");
  const uuid = formData.get("uuid");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm-password");
  const name = formData.get("name");
  const birthday = formData.get("birthday");
  const phone = formData.get("phone");
  const message = formData.get("message");
  const introduce = formData.get("introduce");
  const isPersonalInfoConsentGiven = formData.get("isPersonalInfoConsentGiven");

  console.log("uuid");
  console.log(uuid);
  console.log(typeof uuid);

  return ok({ result: true });
};
