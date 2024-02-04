import MainBlogView from "@/view/blog/MainBlogView";
import { MainSelectBoxView } from "@/view/SelectBoxView";
import SearchBox from "@/view/SearchBox";
import { SearchDataType, SearchType } from "@/type/definitions";
import { getBlogsAction } from "@/server/blogActions";
import { isNotNil } from "@/ex/utils";

export default async function Page(props: {
  searchParams?: { searchType?: SearchType; searchDateType?: SearchDataType };
}) {
  const res = await getBlogsAction(
    1,
    props.searchParams?.searchType,
    props.searchParams?.searchDateType,
  );

  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-between mobile:flex-wrap">
        {/*  menu */}
        <div className="flex items-center justify-between">
          <MainSelectBoxView<SearchType>
            queryKey="searchType"
            value={props.searchParams?.searchType ?? "LIKE"}
            options={[
              ["LIKE", "인기순"],
              ["LATEST", "최신순"],
              ["VIEW", "조회수"],
            ]}
          />
          <MainSelectBoxView<SearchDataType>
            queryKey="searchDateType"
            value={props.searchParams?.searchDateType ?? "WEEKLY"}
            options={[
              ["WEEKLY", "이번주"],
              ["MONTHLY", "이번달"],
              ["YEAR", "올해"],
            ]}
          />
          <SearchBox />
        </div>
        <button
          type="button"
          className="h-[30px] w-[85px] rounded-2xl border-2 border-c1f295a p-2 text-center text-[14px] text-c1f295a dark:border-cffffff dark:text-cffffff tablet:text-[12px] mobile:mx-auto mobile:mt-[20px] mobile:w-full mobile:text-[10px]"
        >
          글쓰기
        </button>
      </div>
      {isNotNil(res.data) && (
        <MainBlogView
          initBlogs={res.data.blogs}
          searchType={props.searchParams?.searchType}
          searchDateType={props.searchParams?.searchDateType}
        />
      )}
      {isNotNil(res.error) && <p>{res.error}</p>}
    </div>
  );
}
