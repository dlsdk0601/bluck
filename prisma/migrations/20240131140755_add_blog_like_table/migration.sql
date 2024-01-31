-- CreateTable
CREATE TABLE "blog_like" (
    "pk" SERIAL NOT NULL,
    "user_pk" INTEGER NOT NULL,

    CONSTRAINT "blog_like_pkey" PRIMARY KEY ("pk")
);

-- AddForeignKey
ALTER TABLE "blog_like" ADD CONSTRAINT "blog_like_user_pk_fkey" FOREIGN KEY ("user_pk") REFERENCES "user"("pk") ON DELETE RESTRICT ON UPDATE CASCADE;
