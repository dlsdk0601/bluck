import { create } from "zustand";

interface IsLockState {
  counter: number;
  isLock: () => boolean;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  increase: () => Promise<void>;
  decrease: () => Promise<void>;
}

export const isLockState = create<IsLockState>((set, get) => ({
  counter: 0,
  isLoading: false,
  setIsLoading: (value) => set({ isLoading: value }),
  isLock: () => get().counter > 0 || get().isLoading,
  increase: async () => set((state) => ({ counter: state.counter + 1 })),
  decrease: async () => set((state) => ({ counter: state.counter + -1 })),
}));
