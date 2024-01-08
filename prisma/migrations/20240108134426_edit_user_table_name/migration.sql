/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "pk" SERIAL NOT NULL,
    "email" VARCHAR(256) NOT NULL,
    "password" VARCHAR(256) NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "birthday" DATE NOT NULL,
    "phone" VARCHAR(32) NOT NULL,
    "message" VARCHAR(256) NOT NULL,
    "introduce" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("pk")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
