"use client";

import Link from "next/link";
import { Urls } from "@/url/url.g";
import useDarkMode from "@/hook/useDarkMode";

export default function Home() {
  const { onClickToggleButton } = useDarkMode();

  return (
    <main className="">
      <p className="text-[100px] font-light">지마켓</p>
      <button type="button" onClick={() => onClickToggleButton()}>
        toggle
      </button>
      <Link href={Urls.about.index.url()}>about</Link>
    </main>
  );
}
