"use client";

import { PropsWithChildren } from "react";
import { roboto } from "@/view/layout/fonts";
import HeaderView from "@/view/layout/HeaderView";
import FooterView from "@/view/layout/Footer";

const ClientLayout = (props: PropsWithChildren) => {
  return (
    <body
      className={`${roboto.className} gmarket bg-ccfd1dd pt-7 text-c1f295a dark:bg-c000000 dark:text-cffffff`}
    >
      <div className="mx-auto my-0 h-[89vh] w-[96vw] overflow-hidden rounded-3xl bg-cffffff dark:bg-cFFFFFF4C">
        <HeaderView />
        <main className="h-screen w-full px-10">{props.children}</main>
      </div>
      <FooterView />
    </body>
  );
};

export default ClientLayout;
