class Config {
  readonly baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  readonly isDev = process.env.NEXT_PUBLIC_IS_DEV === "true";
}

export const config = new Config();
