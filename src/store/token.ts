import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// TODO :: NEXT-AUTH 사용 하면 불필요
interface TokenState {
  token: string | null;
  setToken: (value: string | null) => void;
}

export const tokenState = create<TokenState>()(
  persist(
    (set, get) => ({
      token: null,
      setToken: (value) => set({ token: value }),
    }),
    {
      name: "X-ACCESS-TOKEN-ADMIN",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
