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
  icons: {
    icon: [
      { url: "/icon/android-icon-192x192.png", sizes: "192x192", rel: "icon" },
      { url: "/icon/android-icon-144x144.png", sizes: "144x144", rel: "icon" },
      { url: "/icon/android-icon-96x96.png", sizes: "96x96", rel: "icon" },
      { url: "/icon/android-icon-72x72.png", sizes: "72x72", rel: "icon" },
      { url: "/icon/android-icon-48x48.png", sizes: "48x48", rel: "icon" },
      { url: "/icon/android-icon-36x36.png", sizes: "36x36", rel: "icon" },
    ],
    apple: [
      { url: "/icon/apple-icon-57x57.png", sizes: "57x57", rel: "apple-touch-icon" },
      { url: "/icon/apple-icon-60x60.png", sizes: "60x60", rel: "apple-touch-icon" },
      { url: "/icon/apple-icon-72x72.png", sizes: "72x72", rel: "apple-touch-icon" },
      { url: "/icon/apple-icon-76x76.png", sizes: "76x76", rel: "apple-touch-icon" },
      { url: "/icon/apple-icon-114x114.png", sizes: "114x114", rel: "apple-touch-icon" },
      { url: "/icon/apple-icon-120x120.png", sizes: "120x120", rel: "apple-touch-icon" },
      { url: "/icon/apple-icon-144x144.png", sizes: "144x144", rel: "apple-touch-icon" },
      { url: "/icon/apple-icon-152x152.png", sizes: "152x152", rel: "apple-touch-icon" },
      { url: "/icon/apple-icon-180x180.png", sizes: "180x180", rel: "apple-touch-icon" },
    ],
  },
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
