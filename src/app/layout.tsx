import { ReactNode } from "react";
import "./globals.css";
import { Metadata } from "next";
import ClientLayout from "@/view/layout/ClientLayout";
import { config } from "@/config/config";

export const metadata: Metadata = {
  title: {
    template: "BLUCK | %s",
    default: "BLUCK",
  },
  description: "기술 블로그 BLCUK",
  metadataBase: new URL(config.baseUrl),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <ClientLayout>{children}</ClientLayout>
    </html>
  );
}
