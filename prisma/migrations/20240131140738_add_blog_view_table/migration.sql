-- CreateTable
CREATE TABLE "blog_view" (
    "pk" SERIAL NOT NULL,
    "user_pk" INTEGER NOT NULL,

    CONSTRAINT "blog_view_pkey" PRIMARY KEY ("pk")
);

-- AddForeignKey
ALTER TABLE "blog_view" ADD CONSTRAINT "blog_view_user_pk_fkey" FOREIGN KEY ("user_pk") REFERENCES "user"("pk") ON DELETE RESTRICT ON UPDATE CASCADE;
