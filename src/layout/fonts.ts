import localFont from "next/font/local";

export const roboto = localFont({
  src: [
    {
      path: "./fonts/GmarketSansLight.otf",
      weight: "300",
      style: "light",
    },
    {
      path: "./fonts/GmarketSansMedium.otf",
      weight: "500",
      style: "medium",
    },
    {
      path: "./fonts/GmarketSansBold.otf",
      weight: "700",
      style: "bold",
    },
  ],
  display: "swap", // 폰트가 로드 되기 전후를 감지하여 로컬 폰트를 자동으로 로드 시키는 속성
  variable: "--font-gmarket", // tailwind 에서의 사용을 위해 변수화 한다.
});
