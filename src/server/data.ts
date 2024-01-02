import { range } from "lodash";

export async function fetchMainContents(searchType?: string, searchDateType?: string) {
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });

  return range(0, 15);
}
