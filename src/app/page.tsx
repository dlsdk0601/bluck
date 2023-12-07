"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Urls } from "@/url/url.g";

export default function Home() {
  const localStorageCheker = (): boolean => {
    if (!localStorage.theme) return false;
    return localStorage.theme === "dark";
  };
  const [dark, setDark] = useState(localStorageCheker());
  const darkSetButton = () => {
    setDark((state) => {
      const update = !state;
      if (update) {
        localStorage.theme = "dark";
      } else {
        localStorage.theme = "light";
      }
      return update;
    });
  };

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <main className="">
      <p className="text-[100px] font-light">지마켓</p>
      <button type="button" onClick={() => darkSetButton()}>
        toggle
      </button>
      <Link href={Urls.about.index.url()}>about</Link>
    </main>
  );
}
