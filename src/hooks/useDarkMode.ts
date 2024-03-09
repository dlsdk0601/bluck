import { useCallback, useEffect } from "react";
import { isDarkState } from "@/store/isDark";

const useDarkMode = (): {
  isDarkMode: boolean;
  onClickToggleButton: () => void;
} => {
  const { isDark: isDarkMode, setIsDark: setIsDarkMode } = isDarkState((state) => state);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
      return;
    }

    document.documentElement.classList.remove("dark");
    setIsDarkMode(false);
  }, []);

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
