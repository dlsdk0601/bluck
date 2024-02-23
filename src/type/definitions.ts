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

export type CheckPasswordActionType = BaseFormActionFunction<{ result: boolean }>;

export type EditPasswordActionType = BaseFormActionFunction<{ result: boolean }>;

// void 타입으로 반환할거라서 BaseFormAction 타입을 쓰지 않는다.
// undefined 를 안쓰고 싶지만, useFormState 의 타입에 맞추려면 어쩔수 없다.
export type EditPasswordSuccessActionType = (
  prevState: undefined,
  formData: FormData,
) => Promise<undefined>;

export interface ShowUserActionRes {
  profile: Fileset;
  email: string;
  name: string;
  birthday: string;
  phone: string;
  message: string;
  introduce: string;
}

export type ShowUserActionType = () => Promise<Res<ShowUserActionRes>>;

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

export interface MyPageUser {
  profile: Fileset;
  name: string;
  email: string;
  message: string;
  introduce: string;
}

export interface MyPageTag {
  pk: number;
  name: string;
}

interface MyPageInitRes {
  user: MyPageUser;
  tags: MyPageTag[];
}

export type MyPageInitActionType = () => Promise<Res<MyPageInitRes>>;

export interface MyPageBlog {
  pk: number;
  banner: Fileset;
  title: string;
  body: string;
  user: {
    profile: Fileset;
    name: string;
  };
  createAt: string;
  viewCount: number;
  likeCount: number;
}

interface MyPageBlogsRes {
  blogs: MyPageBlog[];
}

export type MyPageBlogsActionType = (tagPks: string | string[]) => Promise<Res<MyPageBlogsRes>>;
