/*
  Warnings:

  - Added the required column `banner_image_pk` to the `blog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "blog" ADD COLUMN     "banner_image_pk" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "blog" ADD CONSTRAINT "blog_banner_image_pk_fkey" FOREIGN KEY ("banner_image_pk") REFERENCES "asset"("pk") ON DELETE RESTRICT ON UPDATE CASCADE;
