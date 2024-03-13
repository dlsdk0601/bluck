import { create } from "zustand";

interface ReviewCountState {
  reviewCount: number | null;
  setReviewCount: (value: number) => void;
}

export const reviewCountSate = create<ReviewCountState>((set) => ({
  reviewCount: null,
  setReviewCount: (value) => set(() => ({ reviewCount: value })),
}));
