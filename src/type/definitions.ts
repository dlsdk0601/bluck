import { Fileset } from "@/lib/aws";
import { PaginationType } from "@/ex/paginationEx";

declare module "next-auth" {
  interface User {
    pk: number;
  }
}

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
  body: string;
  createAt: string;
  user: {
    profile: Fileset;
    name: string;
  };
  viewCount: number;
  likeCount: number;
  banner: Fileset;
}

export interface GetBlogsActionRes {
  blogs: PaginationType<GetBlogsActionResItem>;
}

export type SearchOrderByType = "LIKE" | "LATEST" | "VIEW";

export type SearchDataType = "WEEKLY" | "MONTHLY" | "YEAR";

export type SearchType = "AUTHOR" | "TITLE";

export type getBlogListActionType = (
  page: number,
  search: string,
  searchType: SearchType | undefined,
  searchOrderByType: SearchOrderByType | undefined,
  searchDateType: SearchDataType | undefined,
) => Promise<Res<GetBlogsActionRes>>;

export interface RecommendBlog {
  pk: number;
  title: string;
}

export interface GetBlogShowActionRes {
  pk: number;
  banner: Fileset;
  title: string;
  body: string;
  createAt: string;
  user: {
    profile: Fileset;
    name: string;
  };
  tags: Array<{ pk: number; name: string }>;
  viewCount: number;
  likeCount: number;
  hasLike: boolean;
  recommendBlogs: RecommendBlog[];
}

export type getBlogShowActionType = (pk: number) => Promise<Res<GetBlogShowActionRes>>;

export interface BlogLikeActionRes {
  pk: number;
  count: number;
  hasLike: boolean;
}

export type BlogLikeActionType = (pk: number) => Promise<Res<BlogLikeActionRes>>;
