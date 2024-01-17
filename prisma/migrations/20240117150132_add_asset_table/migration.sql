-- CreateTable
CREATE TABLE "asset" (
    "pk" SERIAL NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "content_type" VARCHAR(64) NOT NULL,
    "uuid" UUID NOT NULL,
    "url" VARCHAR(256) NOT NULL,
    "download_url" VARCHAR(256) NOT NULL,

    CONSTRAINT "asset_pkey" PRIMARY KEY ("pk")
);
