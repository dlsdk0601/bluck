import { atom, selector } from "recoil";
import { isNil } from "lodash";

export const token = atom<string | null>({
  key: "TOKEN",
  default: null,
});

export const tokenSelector = selector<string | null>({
  key: "TOKEN_SELECTOR",
  get: ({ get }) => {
    return get(token);
  },
  set: ({ set }, newValue) => {
    if (typeof newValue === "string") {
      set(token, newValue);
      sessionStorage.setItem("X-ACCESS-TOKEN-ADMIN", newValue);
      return;
    }

    if (isNil(newValue)) {
      set(token, newValue);
      sessionStorage.removeItem("X-ACCESS-TOKEN-ADMIN");
    }
  },
});
