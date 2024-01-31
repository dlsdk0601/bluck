import { Fileset } from "@/lib/aws";
import { PaginationType } from "@/ex/paginationEx";

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

type BaseFormActionFunction<T> = (prevState: Res<T> | null, formData: FormData) => Promise<Res<T>>;

export type SignInActionType = BaseFormActionFunction<{ result: boolean }>;

export type FindIdActionType = BaseFormActionFunction<{ id: string }>;

export type FindPasswordActionType = BaseFormActionFunction<{ result: string }>;

export type SignUpActionType = BaseFormActionFunction<{ result: boolean }>;

export interface GetBlogsActionResItem {
  pk: number;
  title: string;
  createAt: string;
  user: {
    profile: Fileset;
    name: string;
  };
}

export interface GetBlogsActionRes {
  blogs: PaginationType<GetBlogsActionResItem>;
}

export type getBlogsActionType = (
  page: number,
  searchType: string | undefined,
  searchDateType: string | undefined,
) => Promise<Res<GetBlogsActionRes>>;
