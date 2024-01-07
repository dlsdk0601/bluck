import React from "react";
import { config } from "@/config/config";
import { Urls } from "@/url/url.g";
import Replace from "../view/layout/Replace";
import MainContentsSkeleton from "../view/skeleton/MainContentsSkeleton";

const Page = () => {
  if (!config.isDev) {
    return <Replace url={Urls.page.url()} />;
  }
  return <MainContentsSkeleton />;
};

export default Page;
