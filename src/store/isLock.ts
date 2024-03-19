import { create } from "zustand";

interface IsLockState {
  counter: number;
  isLock: () => boolean;
  increase: () => Promise<void>;
  decrease: () => Promise<void>;
}

export const isLockState = create<IsLockState>((set, get) => ({
  counter: 0,
  isLock: () => get().counter > 0,
  increase: async () => set((state) => ({ counter: state.counter + 1 })),
  decrease: async () => set((state) => ({ counter: state.counter + -1 })),
}));
