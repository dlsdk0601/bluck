import NextAuth from "next-auth";
import { z } from "zod";
import { isNil } from "lodash";
import Credentials from "next-auth/providers/credentials";
import { user } from "@prisma/client";
import { compare } from "@/ex/bcryptEx";
import prisma from "@/lib/prisma";
import { authConfig } from "./auth.config";

async function getUser(email: string): Promise<user | undefined> {
  try {
    const user = await prisma.user.findFirst({ where: { email } });

    if (isNil(user)) {
      return;
    }

    return user;
  } catch (e) {
    console.error("유저 조회 실패: ", e);
    throw new Error("유저 조회에 실패했습니다.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string() })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          console.error("Invalid credentials");
          return null;
        }

        const { email, password } = parsedCredentials.data;
        const user = await getUser(email);

        if (isNil(user)) {
          return null;
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
          return null;
        }

        // 여기서 next-auth 자체에서 정의한 User 의 타입을 return 해야한다.
        // export interface User {
        //   id: string
        //   name?: string | null
        //   email?: string | null
        //   image?: string | null
        // }
        return { id: user.pk.toString(), name: user.name, email: user.email };
      },
    }),
  ],
});
