interface R<T> {
  error: string | null;
  data: T;
}

export type Res<T> = R<T | null>;

export function ok<T>(res: T): Res<T> {
  return { error: null, data: res };
}

export function err(error: string): Res<null> {
  return { error, data: null };
}

type BaseActionFunction<T> = (prevState: Res<T> | null, formData: FormData) => Promise<Res<T>>;

export type SignInActionType = BaseActionFunction<{ result: boolean }>;

export type FindIdActionType = BaseActionFunction<{ id: string }>;

export type FindPasswordType = BaseActionFunction<{ result: string }>;
