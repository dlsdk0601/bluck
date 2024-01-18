import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { asset, Prisma } from "@prisma/client";
import { isNil } from "lodash";
import { config } from "@/config/config";
import prisma from "@/lib/prisma";

export interface Fileset {
  url: string;
  downloadUrl: string;
  uuid: string;
  name: string;
  contentType: string;
}

class AwsModel {
  readonly s3: S3Client;
  readonly S3_BUCKET_NAME: string;

  constructor() {
    this.s3 = new S3Client({
      credentials: {
        accessKeyId: config.awsAccessKey,
        secretAccessKey: config.awsSecretKey,
      },
      region: config.awsRegion,
    });
    this.S3_BUCKET_NAME = config.awsBucketName;
  }

  async upload(
    type: string,
    fileName: string,
    base64: string,
  ): Promise<Prisma.assetCreateInput | null> {
    const command = new PutObjectCommand({
      Bucket: this.S3_BUCKET_NAME,
      Key: fileName,
      Body: this.base64ToBuffer(base64),
      ContentType: "application/octet-stream",
    });

    try {
      await this.s3.send(command);

      return {
        uuid: uuidv4.toString(),
        content_type: type,
        name: fileName,
        url: this.awsDownloadUrl(fileName),
        download_url: this.awsDownloadUrl(fileName),
      };
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  awsDownloadUrl(fileName: string) {
    return `https://${this.S3_BUCKET_NAME}.s3.${config.awsRegion}.amazonaws.com/${fileName}`;
  }

  base64ToBuffer(base64: string) {
    return Buffer.from(base64, "base64");
  }

  async assetFromUuid(uuid: string): Promise<asset | null> {
    return prisma.asset.findFirst({ where: { uuid } });
  }

  async newAsset(type: string, fileName: string, base64: string): Promise<asset | null> {
    const awsAsset = await this.upload(type, fileName, base64);

    if (isNil(awsAsset)) {
      return null;
    }

    try {
      return prisma.asset.create({ data: awsAsset });
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}

export const awsModel = new AwsModel();
