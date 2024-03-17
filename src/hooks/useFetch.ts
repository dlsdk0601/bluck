import { isLockState } from "@/store/isLock";

type ApiParameter<T, U> = (req: T) => Promise<U | string>;

const useFetch = <T, U>(api: ApiParameter<T, U>) => {
  const setIsLock = isLockState((s) => s.setIsLock);

  const onFetch = async (req: T) => {
    try {
      setIsLock(true);
      const res = await api(req);
      return res;
    } finally {
      setIsLock(false);
    }
  };

  return onFetch;
};
