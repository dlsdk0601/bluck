"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import useDarkMode from "@/hooks/useDarkMode";
import { Urls } from "@/url/url.g";
import { SearchType } from "@/type/definitions";
import { preventDefaulted } from "@/ex/utils";
import { SelectBoxView } from "./SelectBoxView";

const SearchBox = (props: { search?: string; searchType?: SearchType }) => {
  const { isDarkMode } = useDarkMode();
  const router = useRouter();
  const searchParams = useSearchParams();

  const onChangeInput = useDebouncedCallback((search: string) => {
    router.replace(Urls.page.setQuery(searchParams, { search }));
  }, 300);

  const onChangeSelectBox = (searchType: SearchType | null) => {
    router.replace(Urls.page.setQuery(searchParams, { searchType }));
  };

  return (
    <form
      onSubmit={preventDefaulted(() => {})}
      className="flex h-[20px] w-56 items-center justify-start rounded-xl bg-ccfd1dd dark:bg-c000000 tablet:w-60 mobile:w-40"
    >
      <SelectBoxView<SearchType | null>
        value={props.searchType ?? null}
        options={[
          [null, "전체"],
          ["AUTHOR", "작성자"],
          ["TITLE", "제목"],
        ]}
        onChange={(value) => onChangeSelectBox(value)}
        className="ml-1 mr-0 mobile:mr-0"
      />
      <input
        type="text"
        className="h-full w-[50%] border-none bg-ccfd1dd text-[12px] text-c1f295a focus:outline-none dark:bg-c000000 dark:text-cffffff mobile:w-[55%] mobile:text-[8px]"
        onChange={(e) => onChangeInput(e.target.value)}
        defaultValue={props.search ?? ""}
      />
      <div className="ml-1 h-[15px] w-[15px] cursor-pointer mobile:top-1/3 mobile:ml-0 mobile:h-[10px] mobile:w-[10px]">
        <MagnifyingGlassIcon className="w-full" />
      </div>
    </form>
  );
};

export default SearchBox;
