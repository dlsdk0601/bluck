import { PrismaClient } from "@prisma/client";

const globalPrisma = global as typeof globalThis & { prisma: PrismaClient };

// dev 와 production 에서 다른 값을 전달하기 위해 let 으로 한다.
// eslint-disable-next-line import/no-mutable-exports
let prisma: PrismaClient;

// https://vercel.com/guides/nextjs-prisma-postgres
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!globalPrisma.prisma) {
    globalPrisma.prisma = new PrismaClient({ log: ["query"] });
  }
  prisma = globalPrisma.prisma;
}

export default prisma;
