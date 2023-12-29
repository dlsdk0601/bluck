import { PropsWithChildren } from "react";

const AuthLayout = (props: PropsWithChildren) => {
  return <div className="h-full w-full">{props.children}</div>;
};

export default AuthLayout;
