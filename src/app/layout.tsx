import { ReactNode } from "react";
import "./globals.css";
import { Metadata } from "next";
import { config } from "@/config/config";
import { auth } from "@/server/auth/auth";
import { roboto } from "@/view/layout/fonts";
import HeaderView from "@/view/layout/HeaderView";
import FooterView from "@/view/layout/Footer";
import BlockView from "@/view/BlockView";
import SetUserStateView from "@/view/layout/SetUserStateView";

export const metadata: Metadata = {
  title: {
    template: "BLUCK | %s",
    default: "BLUCK",
  },
  description: "기술 블로그 BLCUK",
  metadataBase: new URL(config.baseUrl),
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${roboto.className} gmarket bg-ccfd1dd pt-7 text-c1f295a dark:bg-c000000 dark:text-cffffff`}
      >
        <div className="mx-auto my-0 h-[89vh] w-[96vw] overflow-hidden rounded-3xl bg-cffffff dark:bg-cFFFFFF4C">
          <HeaderView />
          <main className="h-screen w-full px-10">{children}</main>
        </div>
        <FooterView />
        <BlockView />
      </body>
      <SetUserStateView session={session} />
    </html>
  );
}
