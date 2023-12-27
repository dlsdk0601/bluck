import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/view/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      tablet: { max: "1024px" },
      mobile: { max: "768px" },
    },
    fontFamily: {
      gmarket: ["var(--font-gmarket)", "sans-serif"],
    },
    extend: {
      animation: {
        loader: "loader 1s ease-in infinite",
      },
      keyframes: {
        loader: {
          "0%": {
            transform: "scale(0)",
            opacity: "1",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "0",
          },
        },
      },
    },
    colors: {
      c1f295a: "#1f295a", // navText
      ccfd1dd: "#cfd1dd", // navBgColor
      cffffff: "#ffffff", // noticeColor
      cf9f9f9: "#f9f9f9", // ctBgColor
      c4c547b: "#4c547b", // menuBgColor
      cedeff6: "#edeff6", // input
      cFFFFFF4C: "#FFFFFF4C", // dark_noticeColor
      c000000: "#000000", // dark_bgColor
      c000000CC: "#000000CC", // dark_ctBgColor
      cff4500: "#FF4500",
      // c1f295a: "#1f295a", // mainText
      // ccfd1dd: "#cfd1dd", // bgColor
      // cffffff: "#ffffff", // dark_navText
      // c1f295a: "#1f295a", // dark_navBgColor
      // cffffff: "#ffffff", // dark_mainText
      // c4c547b: "#4c547b", // dark_menuBgColor
      // cedeff6: "#edeff6", // dark_input
    },
  },
  plugins: [],
};
export default config;
