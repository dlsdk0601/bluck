/*
  Warnings:

  - The primary key for the `blog_like` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `pk` on the `blog_like` table. All the data in the column will be lost.
  - The primary key for the `blog_view` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `pk` on the `blog_view` table. All the data in the column will be lost.
  - Added the required column `blog_pk` to the `blog_like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blog_pk` to the `blog_view` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "blog_like" DROP CONSTRAINT "blog_like_pkey",
DROP COLUMN "pk",
ADD COLUMN     "blog_pk" INTEGER NOT NULL,
ADD CONSTRAINT "blog_like_pkey" PRIMARY KEY ("blog_pk", "user_pk");

-- AlterTable
ALTER TABLE "blog_view" DROP CONSTRAINT "blog_view_pkey",
DROP COLUMN "pk",
ADD COLUMN     "blog_pk" INTEGER NOT NULL,
ADD CONSTRAINT "blog_view_pkey" PRIMARY KEY ("blog_pk", "user_pk");

-- AddForeignKey
ALTER TABLE "blog_view" ADD CONSTRAINT "blog_view_blog_pk_fkey" FOREIGN KEY ("blog_pk") REFERENCES "blog"("pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_like" ADD CONSTRAINT "blog_like_blog_pk_fkey" FOREIGN KEY ("blog_pk") REFERENCES "blog"("pk") ON DELETE RESTRICT ON UPDATE CASCADE;
