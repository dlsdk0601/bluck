"use server";

import { AuthError } from "next-auth";
import { vEmail, vPassword } from "@/ex/validate";
import { isNotNil } from "@/ex/utils";
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
          return "일치하는 회원이 존재하지 않습니다.";
        default:
          return "로그인이 실패하였습니다.\n 잠시 후 다시 시도 해주세요.";
      }
    }

    throw e;
  }
}
