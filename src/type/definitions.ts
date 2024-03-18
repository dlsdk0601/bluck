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

export type BaseFormActionRes<T> = Res<T> | null;

export interface FormActionViewProps<T> {
  res: BaseFormActionRes<T>;
  dispatch: (payload: FormData) => void;
}

export type BaseFormActionFunction<T> = (
  prevState: BaseFormActionRes<T>,
  formData: FormData,
) => Promise<Res<T>>;

export interface SignInActionRes {
  result: boolean;
}

export type SignInActionType = BaseFormActionFunction<SignInActionRes>;

export interface FindIdActionRes {
  id: string;
}

export type FindIdActionType = BaseFormActionFunction<FindIdActionRes>;

export interface FindPasswordActionRes {
  result: string;
}

export type FindPasswordActionType = BaseFormActionFunction<FindPasswordActionRes>;

export interface SignUpActionRes {
  result: boolean;
}

export type SignUpActionType = BaseFormActionFunction<SignUpActionRes>;

export interface CheckPasswordActionRes {
  result: boolean;
}

export type CheckPasswordActionType = BaseFormActionFunction<CheckPasswordActionRes>;

export interface EditPasswordActionRes {
  result: boolean;
}

export type EditPasswordActionType = BaseFormActionFunction<EditPasswordActionRes>;

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

export interface BlogData {
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
  reviewCount: number;
}

export interface GetBlogsActionRes {
  blogs: PaginationType<BlogData>;
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

export interface ReviewBlog {
  pk: number;
  review: string;
  createAt: Date;
  user: {
    pk: number;
    name: string;
    mainImage: Fileset;
  };
}

export interface GetBlogShowActionRes {
  pk: number;
  banner: Fileset;
  title: string;
  body: string;
  createAt: string;
  user: {
    pk: number;
    profile: Fileset;
    name: string;
  };
  tags: Array<{ pk: number; name: string }>;
  viewCount: number;
  likeCount: number;
  hasLike: boolean;
  reviews: ReviewBlog[];
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

interface MyPageBlogsRes {
  blogs: BlogData[];
}

export type MyPageBlogsActionType = (tagPks: string | string[]) => Promise<Res<MyPageBlogsRes>>;

export type Option = { value: number; label: string };

interface GetEditBlog {
  pk: number;
  banner: Fileset;
  title: string;
  body: string;
  tags: Option[];
}

export interface GetEditBlogActionRes {
  blog: GetEditBlog | null;
  tags: Option[];
}

export type getEditBlogActionType = (pk: number | null) => Promise<Res<GetEditBlogActionRes>>;
