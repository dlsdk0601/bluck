/*
  Warnings:

  - Added the required column `assetPk` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `main_image_pk` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "assetPk" INTEGER NOT NULL,
ADD COLUMN     "main_image_pk" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_main_image_pk_fkey" FOREIGN KEY ("main_image_pk") REFERENCES "asset"("pk") ON DELETE RESTRICT ON UPDATE CASCADE;
