import ContentsCardView from "@/view/ContentsCardView";
import { fetchMainContents } from "@/server/data";

const MainContentsView = async (props: { searchType?: string; searchDateType?: string }) => {
  const contents = await fetchMainContents(props.searchType, props.searchDateType);

  return (
    <div className="mt-[10px] flex h-[70vh] w-full flex-wrap justify-between overflow-y-auto pr-[1%] tablet:h-[72vh]">
      {contents.map((item) => (
        <ContentsCardView key={`contents-${item}`} isFull={false} />
      ))}
    </div>
  );
};

export default MainContentsView;
