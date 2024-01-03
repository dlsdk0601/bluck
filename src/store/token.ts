import { isNil } from "lodash";
import { create } from "zustand";

// TODO :: NEXT-AUTH 사용 하면 불필요
interface TokenState {
  token: string | null;
  setToken: (value: string | null) => void;
}

export const tokenState = create<TokenState>((set) => ({
  token: null,
  setToken: (value) => {
    if (typeof value === "string") {
      sessionStorage.setItem("X-ACCESS-TOKEN-ADMIN", value);
    }

    if (isNil(value)) {
      sessionStorage.removeItem("X-ACCESS-TOKEN-ADMIN");
    }

    return set({ token: value });
  },
}));
