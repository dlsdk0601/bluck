import { PropsWithChildren } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "user",
};

const Layout = (props: PropsWithChildren) => {
  return <div className="h-full w-full">{props.children}</div>;
};

export default Layout;
