-- CreateTable
CREATE TABLE "User" (
    "pk" SERIAL NOT NULL,
    "email" VARCHAR(256) NOT NULL,
    "passowrd" VARCHAR(256) NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "birthday" DATE NOT NULL,
    "phone" VARCHAR(32) NOT NULL,
    "message" VARCHAR(256) NOT NULL,
    "introduce" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("pk")
);
