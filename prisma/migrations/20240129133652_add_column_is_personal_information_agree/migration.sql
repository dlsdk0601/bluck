/*
  Warnings:

  - Added the required column `is_personal_information_agree` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "is_personal_information_agree" BOOLEAN NOT NULL;
