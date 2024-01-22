"use server";

import { AuthError } from "next-auth";
import { vEmail, vPassword } from "@/ex/validate";
import { isNotNil } from "@/ex/utils";
import { errorMessage } from "@/lib/errorEx";
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
          return errorMessage.userNotFound;
        default:
          return errorMessage.signInFailed;
      }
    }

    throw e;
  }
}
