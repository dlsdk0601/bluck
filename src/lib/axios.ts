import axios, { AxiosRequestConfig } from "axios";
import { sleep } from "sleepjs";
import { config } from "@/config/config";
import { FindIdReq, FindIdRes } from "@/app/api/auth/find-id/route";

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

  delete = async (url: string, axiosRequestConfig?: AxiosRequestConfig<any>) => {
    return this.with(async () => {
      if (config.apiDelay) {
        await sleep(config.apiDelay);
      }

      const res = await axiosInstance.delete(url, axiosRequestConfig);

      return res.data;
    });
  };

  with = <T>(block: () => Promise<T>) => {
    this.increaseCounter();
    try {
      return block();
    } finally {
      this.decreaseCounter();
    }
  };

  errorHandle(err: unknown): string {
    if (axios.isAxiosError(err)) {
      const message = err.response?.data.message ?? err.message;
      // 디자인에 에러 메세지가 존재하기 때문에 alert 은 일단 주석 처리
      // alert(message);
      // throw new Error(message);
      return message;
    }

    return "서버 통신이 원활하지 않습니다. 잠시후 다시 이용해주세요";
  }

  private increaseCounter = () => {
    this.counter++;
  };

  private decreaseCounter = () => {
    this.counter--;
  };
}

class Api extends ApiBase {
  findId = (req: FindIdReq) => this.post<FindIdRes>("/auth/find-id", req);
}

export const api = new Api();