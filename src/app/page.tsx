import MainBlogView from "@/view/blog/MainBlogView";
import { MainSelectBoxView } from "@/view/SelectBoxView";
import SearchBox from "@/view/SearchBox";
import { SearchDataType, SearchOrderByType, SearchType } from "@/type/definitions";
import { getBlogListAction } from "@/server/blogActions";
import { isNotNil } from "@/ex/utils";
import WriteBlogButtonView from "@/view/WriteBlogButtonView";

export default async function Page(props: {
  searchParams?: {
    search?: string;
    searchType?: SearchType;
    searchOrderByType?: SearchOrderByType;
    searchDateType?: SearchDataType;
  };
}) {
  const res = await getBlogListAction(
    1,
    props.searchParams?.search ?? "",
    props.searchParams?.searchType,
    props.searchParams?.searchOrderByType,
    props.searchParams?.searchDateType,
  );

  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-between mobile:flex-wrap">
        {/*  menu */}
        <div className="flex items-center justify-between">
          <MainSelectBoxView<SearchOrderByType>
            queryKey="searchOrderByType"
            value={props.searchParams?.searchOrderByType ?? "LIKE"}
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
          <SearchBox
            search={props.searchParams?.search}
            searchType={props.searchParams?.searchType}
          />
        </div>
        <WriteBlogButtonView />
      </div>
      {isNotNil(res.data) && (
        <MainBlogView
          initBlogs={res.data.blogs}
          search={props.searchParams?.search}
          searchType={props.searchParams?.searchType}
          searchOrderByType={props.searchParams?.searchOrderByType}
          searchDateType={props.searchParams?.searchDateType}
        />
      )}
      {isNotNil(res.error) && <p>{res.error}</p>}
    </div>
  );
}
