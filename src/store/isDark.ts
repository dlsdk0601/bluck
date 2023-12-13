import { atom } from "recoil";

export const isDark = atom<boolean>({
  key: "IS_DARK",
  default: false,
});
