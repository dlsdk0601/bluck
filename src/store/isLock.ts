import { create } from "zustand";

interface IsLockState {
  isLock: boolean;
  setIsLock: (value: boolean) => void;
}

export const isLockState = create<IsLockState>((set) => ({
  isLock: false,
  setIsLock: (value) => set(() => ({ isLock: value })),
}));
