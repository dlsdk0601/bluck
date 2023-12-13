import { useCallback, useEffect } from "react";
import { isNil } from "lodash";
import { useRecoilState } from "recoil";
import { isDark } from "@/store/isDark";

const useDarkMode = (): {
  isDarkMode: boolean;
  onClickToggleButton: () => void;
} => {
  const [isDarkMode, setIsDarkMode] = useRecoilState(isDark);

  useEffect(() => {
    if (isNil(localStorage.theme)) {
      setIsDarkMode(false);
      return;
    }

    setIsDarkMode(localStorage.theme === "dark");
  }, []);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const onClickToggleButton = useCallback(() => {
    const updateMode = !isDarkMode;

    if (updateMode) {
      localStorage.theme = "dark";
    } else {
      localStorage.theme = "light";
    }

    setIsDarkMode(updateMode);
  }, [isDarkMode]);

  return { isDarkMode, onClickToggleButton };
};

export default useDarkMode;
