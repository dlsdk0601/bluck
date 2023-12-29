"use clinet";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Replace = (props: { url: string }) => {
  const router = useRouter();

  useEffect(() => {
    router.replace(props.url);
  }, [props.url]);

  return <></>;
};

export default Replace;
