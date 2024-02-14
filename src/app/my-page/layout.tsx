import { PropsWithChildren } from "react";

const Layout = (props: PropsWithChildren) => {
  return <div className="mx-auto mb-0 mt-7 h-[75vh] w-4/5 overflow-hidden">{props.children}</div>;
};

export default Layout;
