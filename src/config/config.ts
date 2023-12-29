class Config {
  readonly baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
}

export const config = new Config();
