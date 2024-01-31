-- CreateTable
CREATE TABLE "blog" (
    "pk" SERIAL NOT NULL,
    "title" VARCHAR(256) NOT NULL,
    "body" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "user_pk" INTEGER NOT NULL,

    CONSTRAINT "blog_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "blog_tag" (
    "tag_pk" INTEGER NOT NULL,
    "blog_pk" INTEGER NOT NULL,

    CONSTRAINT "blog_tag_pkey" PRIMARY KEY ("blog_pk","tag_pk")
);

-- AddForeignKey
ALTER TABLE "blog" ADD CONSTRAINT "blog_user_pk_fkey" FOREIGN KEY ("user_pk") REFERENCES "user"("pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_tag" ADD CONSTRAINT "blog_tag_tag_pk_fkey" FOREIGN KEY ("tag_pk") REFERENCES "tag"("pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_tag" ADD CONSTRAINT "blog_tag_blog_pk_fkey" FOREIGN KEY ("blog_pk") REFERENCES "blog"("pk") ON DELETE RESTRICT ON UPDATE CASCADE;
