import { create } from "zustand";
import { isNil, isString } from "lodash";
import { ReviewBlog } from "@/type/definitions";
import { api } from "@/lib/api.g";
import { userState } from "@/store/user";
import { ERR } from "@/lib/errorEx";

interface ReviewState {
  review: string;
  reviews: ReviewBlog[];
  reviewsCount: () => number;
  isEdit: (pk: number) => boolean;
  editReviewPk: number | null;
  action: {
    setReview: (review: string) => void;
    setReviews: (reviews: ReviewBlog[]) => void;
    setIsEdit: (editReviewPk: number) => void;
  };
  fetch: {
    newReview: (blogPk: number) => Promise<void>;
    deleteReview: (pk: number) => Promise<void>;
    editReview: (review: string) => Promise<void>;
  };
}

export const reviewState = create<ReviewState>((set, get) => ({
  review: "",
  reviews: [],
  reviewsCount: () => get().reviews.length,
  isEdit: (pk) => get().editReviewPk === pk,
  editReviewPk: null,
  action: {
    setReview: (review) => set({ review }),
    setReviews: (reviews) => set({ reviews }),
    setIsEdit: (editReviewPk) => set({ editReviewPk }),
  },
  fetch: {
    newReview: async (blogPk) => {
      const user = userState.getState().user;

      if (isNil(user)) {
        alert(ERR.NOT_SIGN_USER);
        return;
      }

      const res = await api.reviewNew({ pk: blogPk, review: get().review });

      if (isString(res)) {
        alert(res);
        return;
      }

      set({ reviews: res.reviews, review: "" });
    },
    deleteReview: async (pk) => {
      const user = userState.getState().user;

      if (isNil(user)) {
        alert(ERR.NOT_SIGN_USER);
        return;
      }

      if (!confirm("댓글을 삭제 하시겠습니까?")) {
        return;
      }

      const res = await api.reviewDelete({
        pk,
      });

      if (isString(res)) {
        return alert(res);
      }

      set({ reviews: res.reviews });
    },
    editReview: async (review) => {
      const pk = get().editReviewPk;
      if (isNil(pk)) {
        return;
      }

      const res = await api.reviewEdit({
        pk,
        review,
      });

      if (isString(res)) {
        alert(res);
        return;
      }

      set({ editReviewPk: null });
    },
  },
}));
