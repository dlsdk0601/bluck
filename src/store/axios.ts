import { create } from "zustand";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { sleep } from "sleepjs";
import { NewBlogReviewReq, NewBlogReviewRes } from "@/app/api/blog/review/new/route";
import { axiosInstance } from "../lib/axios";
import { config } from "../config/config";

interface ApiState {
  axios: AxiosInstance;
  counter: number;
  isBlock: () => boolean;
  increase: () => void;
  decrease: () => void;
  with: <T>(block: () => Promise<T>) => Promise<T>;
  errorHandle: (err: unknown) => string;
  post: <T>(
    url: string,
    data?: any,
    axiosRequestConfig?: AxiosRequestConfig<any>,
  ) => Promise<T | string>;
  newTag: (req: NewBlogReviewReq) => Promise<NewBlogReviewRes | string>;
}

export const apiTest = create<ApiState>((set, get) => ({
  axios: axiosInstance,
  counter: 0,
  isBlock: () => get().counter > 0,
  increase: () => set((state) => ({ counter: state.counter + 1 })),
  decrease: () => set((state) => ({ counter: state.counter - 1 })),
  with: (block) => {
    get().increase();
    try {
      return block();
    } finally {
      get().decrease();
    }
  },
  errorHandle: (err) => {
    if (axios.isAxiosError(err)) {
      return err.response?.data.message ?? err.message;
    }

    return "서버 통신이 원활하지 않습니다. 잠시후 다시 이용해주세요";
  },
  post: (url, data, axiosRequestConfig) => {
    return get().with(async () => {
      try {
        if (config.apiDelay) {
          await sleep(config.apiDelay);
        }

        const res = await get().axios.post(url, data, axiosRequestConfig);

        return res.data;
      } catch (e) {
        return get().errorHandle(e);
      }
    });
  },
  newTag: (req: NewBlogReviewReq) => get().post<NewBlogReviewRes>("/blog/review/new", req),
}));
