import moment from "moment";
import NextAuth from "next-auth";
import { z } from "zod";
import { isNil } from "lodash";
import bcrypt from "bcrypt";
import Credentials from "@auth/core/providers/credentials";
import { User } from "@/type/definitions";
import { authConfig } from "@/app/api/auth/auth.config";

async function getUser(email: string): Promise<User | undefined> {
  try {
    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });

    return {
      email: "",
      name: "",
      birthday: moment().toDate(),
      phone: "",
      message: "",
      password: "",
    };
  } catch (e) {
    console.error("Failed to fetch user: ", e);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      // return 이 Promise<any> 인 이유는 Next-auth 팀이 strict mode 를 끄고 개발해서
      // 타입 버그인듯
      async authorize(credentials): Promise<any> {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string() })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);

          if (isNil(user)) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) {
            return user;
          }
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
