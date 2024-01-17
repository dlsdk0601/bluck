class Config {
  // BASIC
  readonly baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  readonly isDev = process.env.NEXT_PUBLIC_IS_DEV === "true";

  // AWS
  readonly awsAccessKey = process.env.AWS_ACCESS_KEY ?? "";
  readonly awsSecretKey = process.env.AWS_SECRET_KEY ?? "";
  readonly awsBucketName = process.env.AWS_BUCKET_NAME ?? "";
  readonly awsRegion = process.env.AWS_REGION ?? "";
}

export const config = new Config();
