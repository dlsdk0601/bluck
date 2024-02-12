import { User } from "next-auth";
import { create } from "zustand";
import { isNotNil } from "@/ex/utils";

interface UserState {
  user: User | null;
  isSign: boolean;
  setUser: (value: User | null) => void;
}

export const userState = create<UserState>((set) => ({
  user: null,
  isSign: false,
  setUser: (value) => set(() => ({ user: value, isSign: isNotNil(value) })),
}));
