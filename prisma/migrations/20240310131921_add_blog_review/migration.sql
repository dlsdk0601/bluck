-- CreateTable
CREATE TABLE "blog_review" (
    "pk" SERIAL NOT NULL,
    "review" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "blog_pk" INTEGER NOT NULL,
    "user_pk" INTEGER NOT NULL,

    CONSTRAINT "blog_review_pkey" PRIMARY KEY ("pk")
);

-- AddForeignKey
ALTER TABLE "blog_review" ADD CONSTRAINT "blog_review_blog_pk_fkey" FOREIGN KEY ("blog_pk") REFERENCES "blog"("pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_review" ADD CONSTRAINT "blog_review_user_pk_fkey" FOREIGN KEY ("user_pk") REFERENCES "user"("pk") ON DELETE RESTRICT ON UPDATE CASCADE;
