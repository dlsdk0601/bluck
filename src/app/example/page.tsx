"use client";

import { config } from "@/config/config";
import { Urls } from "@/url/url.g";
import Replace from "@/view/layout/Replace";

const Page = () => {
  if (!config.isDev) {
    return <Replace url={Urls.page.url()} />;
  }

  return (
    <form>
      <input type="text" name="name" className="bg-c000000 text-cffffff" />
      <ButtonView />
    </form>
  );
};

const ButtonView = () => {
  return <button type="submit">button</button>;
};

export default Page;
