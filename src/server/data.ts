import { range } from "lodash";

export async function fetchMainContents() {
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });

  return range(0, 15);
}
