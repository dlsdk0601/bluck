class Config {
  // BASIC
  readonly baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  readonly apiDelay = Number(process.env.NEXT_PUBLIC_API_DELAY ?? 0);
  readonly isDev = process.env.NEXT_PUBLIC_IS_DEV === "true";

  // AWS
  readonly awsAccessKey = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY ?? "";
  readonly awsSecretKey = process.env.NEXT_PUBLIC_AWS_SECRET_KEY ?? "";
  readonly awsBucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME ?? "";
  readonly awsRegion = process.env.NEXT_PUBLIC_AWS_REGION ?? "";

  // NODE MAILER
  readonly mailer_service = process.env.NEXT_PUBLIC_NODE_MAILER_SERVICE ?? "";
  readonly mailer_auth_user = process.env.NEXT_PUBLIC_NODE_MAILER_AUTH_USER ?? "";
  readonly mailer_auth_pass = process.env.NEXT_PUBLIC_NODE_MAILER_AUTH_PASS ?? "";
}

export const config = new Config();
