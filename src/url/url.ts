import { ParsedUrlQueryInput } from "querystring";
import { head, isArray, isNil } from "lodash";
import { removeSuffix } from "@/ex/utils";

export class PageUrl {
  readonly pathname: string;

  constructor(pathname: string) {
    this.pathname = pathname;
  }

  url(query?: ParsedUrlQueryInput) {
    if (isNil(query)) {
      return this.pathname;
    }

    // OPT :: 확인 해보고 new URLSearchParams 로 수정
    const queryArr = Object.keys(query ?? {}).map((key) => {
      const value = this.codecQueryValue(query[key]);
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    });
    const queryString = queryArr.join("&");

    return `${this.pathname}?${queryString}`;
  }

  urlPk(query: { pk: number }) {
    const pureUrl = removeSuffix(this.pathname, "pk");

    return `${pureUrl}${query.pk}`;
  }

  codecQueryValue(
    value:
      | string
      | number
      | boolean
      | readonly string[]
      | readonly number[]
      | readonly boolean[]
      | null
      | undefined,
  ) {
    if (isNil(value)) {
      return "";
    }

    if (isArray(value)) {
      // 굳이 복사 하는 이유는 ts 가 타입 추적을 못함..
      const newValue: readonly string[] | readonly number[] | readonly boolean[] = [...value];
      const arr = newValue.map((item) => item.toString());
      return head(arr)?.toString() ?? "";
    }

    return value.toString();
  }
}
