import axios, { AxiosRequestConfig } from "axios";
import { sleep } from "sleepjs";
import { config } from "@/config/config";
import { NewAssetReq, NewAssetRes } from "@/app/api/asset/new/route";
import { NewBlogReviewReq, NewBlogReviewRes } from "@/app/api/blog/review/new/route";
import { EditBlogReviewReq, EditBlogReviewRes } from "@/app/api/blog/review/edit/route";
import { DeleteBlogReviewReq, DeleteBlogReviewRes } from "@/app/api/blog/review/delete/route";
import { DeleteBlogReq, DeleteBlogRes } from "@/app/api/blog/delete/route";
import { NewTagReq, NewTagRes } from "@/app/api/blog/tag/new/route";
import { isLockState } from "@/store/isLock";

export const axiosInstance = axios.create({
  baseURL: `${config.baseUrl}/api`,
  withCredentials: true,
});

// jwt 방식이 아니라서 API interceptors 에 굳이 별다른 설정을 하지 않는다.
axiosInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

axiosInstance.interceptors.response.use(
  async (res) => {
    return res;
  },
  (err) => {
    return Promise.reject(err);
  },
);

class ApiBase {
  private counter = 0;

  get isBlock() {
    return this.counter > 0;
  }

  get = async (url: string, axiosRequestConfig?: AxiosRequestConfig<any>) => {
    return this.with(async () => {
      try {
        if (config.apiDelay) {
          await sleep(config.apiDelay);
        }

        const res = await axiosInstance.get(url, axiosRequestConfig);
        return res.data;
      } catch (e) {
        return this.errorHandle(e);
      }
    });
  };

  post = async <T>(
    url: string,
    data?: any,
    axiosRequestConfig?: AxiosRequestConfig<any>,
  ): Promise<T | string> => {
    return this.with(async () => {
      try {
        if (config.apiDelay) {
          await sleep(config.apiDelay);
        }

        const res = await axiosInstance.post(url, data, axiosRequestConfig);
        return res.data;
      } catch (e) {
        return this.errorHandle(e);
      }
    });
  };

  put = async (
    url: string,
    data: Record<string, string>,
    axiosRequestConfig?: AxiosRequestConfig<any>,
  ) => {
    return this.with(async () => {
      if (config.apiDelay) {
        await sleep(config.apiDelay);
      }

      const res = await axiosInstance.put(url, data, axiosRequestConfig);

      return res.data;
    });
  };

  delete = async <T>(
    url: string,
    req: { pk: number },
    axiosRequestConfig?: AxiosRequestConfig<any>,
  ): Promise<T | string> => {
    return this.with(async () => {
      try {
        if (config.apiDelay) {
          await sleep(config.apiDelay);
        }

        // path variable 로 pk 말고는 딱히 붙을게 없다. 있다면 params 로 붙인다.
        const pathUrl = url.replace("pk", req.pk.toString());

        const res = await axiosInstance.delete(pathUrl, axiosRequestConfig);

        return res.data;
      } catch (e) {
        return this.errorHandle(e);
      }
    });
  };

  with = async <T>(block: () => Promise<T>) => {
    // TODO :: await 를 사용하면 뭔가 꼬인다.
    return this.increaseCounter()
      .then(() => block())
      .finally(() => this.decreaseCounter());
  };

  errorHandle(err: unknown): string {
    if (axios.isAxiosError(err)) {
      // 디자인에 에러 메세지가 존재하기 때문에 alert 은 일단 주석 처리
      // alert(message);
      // throw new Error(message);
      return err.response?.data.message ?? err.message;
    }

    return "서버 통신이 원활하지 않습니다. 잠시후 다시 이용해주세요";
  }

  private increaseCounter = async () => {
    await isLockState.getState().increase();
    this.counter++;
  };

  private decreaseCounter = async () => {
    await isLockState.getState().decrease();
    this.counter--;
  };
}

class Api extends ApiBase {
  newAsset = (req: NewAssetReq) => this.post<NewAssetRes>("/asset/new", req);
  newBlogReview = (req: NewBlogReviewReq) => this.post<NewBlogReviewRes>("/blog/review/new", req);
  editBlogReview = (req: EditBlogReviewReq) =>
    this.post<EditBlogReviewRes>("/blog/review/edit", req);
  deleteBlogReview = (req: DeleteBlogReviewReq) =>
    this.post<DeleteBlogReviewRes>("/blog/review/delete", req);
  deleteBlog = (req: DeleteBlogReq) => this.post<DeleteBlogRes>("/blog/delete", req);
  newTag = (req: NewTagReq) => this.post<NewTagRes>("blog/tag/new", req);
}

export const api = new Api();
