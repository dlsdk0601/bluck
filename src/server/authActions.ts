"use server";

import { AuthError } from "next-auth";
import { isNil, isString } from "lodash";
import { vEmail, vPassword, vPhone } from "@/ex/validate";
import { isBlank, isNotNil } from "@/ex/utils";
import { errorMessage } from "@/lib/errorEx";
import prisma from "@/lib/prisma";
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
          return errorMessage.USER_NOT_FOUND;
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
      return { error: errorMessage.NAME_REQUIRED, data: null };
    }

    if (isNil(phone) || isBlank(phone)) {
      return { error: errorMessage.PHONE_REQUIRED, data: null };
    }

    if (!isString(name)) {
      return { error: errorMessage.ONLY_STRING("이름"), data: null };
    }

    if (!isString(phone)) {
      return { error: errorMessage.ONLY_STRING("휴대폰"), data: null };
    }

    if (vPhone(phone)) {
      return { error: errorMessage.PHONE_BAD_FORMAT, data: null };
    }

    const user = await prisma.user.findFirst({
      where: { name, phone },
    });

    if (isNil(user)) {
      return { error: errorMessage.USER_NOT_FOUND, data: null };
    }

    return { error: null, data: { id: user.email } };
  } catch (e) {
    if (e instanceof Error) {
      return { error: e.message, data: null };
    }

    throw e;
  }
}
