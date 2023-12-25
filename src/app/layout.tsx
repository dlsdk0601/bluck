"use client";

import { PropsWithChildren, ReactNode } from "react";
import { RecoilRoot } from "recoil";
import HeaderView from "@/view/layout/HeaderView";
import { roboto } from "@/view/layout/fonts";
import "./globals.css";
import FooterView from "@/view/layout/Footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <RecoilRoot>
        <ClientLayout>{children}</ClientLayout>
      </RecoilRoot>
    </html>
  );
}

const ClientLayout = (props: PropsWithChildren) => {
  return (
    <body className={`${roboto.className} gmarket bg-ccfd1dd pt-7 dark:bg-c000000`}>
      <div className="mx-auto my-0 h-[89vh] w-[96vw] overflow-hidden rounded-3xl bg-cffffff dark:bg-cFFFFFF4C">
        <HeaderView />
        <main className="h-[100vh] w-full px-10">{props.children}</main>
      </div>
      <FooterView />
    </body>
  );
};
