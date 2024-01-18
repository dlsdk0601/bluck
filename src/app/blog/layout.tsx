import { PropsWithChildren } from "react";

const Layout = (props: PropsWithChildren) => {
  return <div className="h-full w-full">{props.children}</div>;
};

export default Layout;
