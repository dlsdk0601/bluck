import React from "react";
import MainContentsSkeleton from "@/view/skeleton/MainContentsSkeleton";
import { config } from "@/config/config";
import Replace from "@/view/layout/Replace";
import { Urls } from "@/url/url.g";

const Page = () => {
  if (!config.isDev) {
    return <Replace url={Urls.index.urlString()} />;
  }
  return <MainContentsSkeleton />;
};

export default Page;
