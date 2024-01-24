import { fetchMainContents } from "@/server/blogActions";
import BlogCardView from "./BlogCardView";

const MainBlogView = async (props: { searchType?: string; searchDateType?: string }) => {
  const contents = await fetchMainContents(props.searchType, props.searchDateType);

  return (
    <div className="mt-[10px] flex h-[70vh] w-full flex-wrap justify-between overflow-y-auto pr-[1%] tablet:h-[72vh]">
      {contents.map((item) => (
        <BlogCardView key={`contents-${item}`} pk={item} isFull={false} />
      ))}
    </div>
  );
};

export default MainBlogView;
