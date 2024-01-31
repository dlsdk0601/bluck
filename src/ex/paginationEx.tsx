export const PAGE_LIMIT = 10;

export interface PaginationType<T> {
  page: number;
  nextPage: number;
  prevPage: number;
  hasNext: boolean;
  hasPrev: boolean;
  total: number;
  pages: number[];
  first: number;
  last: number;
  rows: T[];
}

// TODO :: Only plain objects, and a few built-ins, can be passed to Client Components from Server Components. Classes or null prototypes are not supported.
// class 형으로 client 에 보내는걸 지원 해주지 않는거 같다...
export class Pagination<T> implements PaginationType<T> {
  page: number;
  nextPage: number;
  prevPage: number;
  hasNext: boolean;
  hasPrev: boolean;
  total: number;
  pages: number[];
  first: number;
  last: number;
  rows: T[] = [];

  constructor(count: number, page: number) {
    const last = Math.ceil(count / PAGE_LIMIT);
    this.page = page;
    this.nextPage = last > page ? page + 1 : last;
    this.prevPage = page > 1 ? page - 1 : page;
    this.hasNext = last > page;
    this.hasPrev = page > 1;
    this.total = count;
    this.first = 1;
    this.last = last;
    this.pages = this.getPagesArray(last, page);
  }

  set setRows(data: T[]) {
    this.rows = data;
  }

  private getPagesArray = (last: number, page: number): number[] => {
    const pages: number[] = [];

    // 마지막 페이지가 5 보다 작을 때
    // [1, 2, 3, 4]
    if (last < 5) {
      for (let i = 0; i < last; i++) {
        pages.push(i + 1);
      }

      return pages;
    }

    // 마지막 페이지가 5보다 클때
    // [1, 2, 3, 4, 5]
    if (page < 3) {
      for (let i = 0; i < 5; i++) {
        pages.push(i + 1);
      }

      return pages;
    }

    // [3, 4, 5, 6, 7] => 뒤에 더 존재
    if (page < last - 2) {
      for (let i = 0; i < 5; i++) {
        pages.push(page - 2 + i);
      }

      return pages;
    }

    // [5, 6, 7, 8, 9] 9가 마지막 페이지
    for (let i = 0; i < 5; i++) {
      pages.push(last - 4 + i);
    }

    return pages;
  };
}
