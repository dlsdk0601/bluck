import { MainSelectBoxView } from "@/view/SelectBoxView";
import SearchBox from "@/view/SearchBox";

export default function Home() {
  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-between mobile:flex-wrap">
        {/*  menu */}
        <div className="flex items-center justify-between">
          <MainSelectBoxView
            value="A"
            options={[
              ["A", "인기순"],
              ["B", "최신순"],
              ["C", "조회수"],
            ]}
          />
          <MainSelectBoxView
            value="D"
            options={[
              ["D", "오늘"],
              ["E", "이번주"],
              ["F", "이번달"],
              ["G", "올해"],
            ]}
          />
          <SearchBox />
        </div>
      </div>
      <div className="height-[67vh] mt-[10px] flex w-full flex-wrap justify-between overflow-y-auto pr-[1%] tablet:h-[72vh]">
        {/*  content */}
      </div>
    </div>
  );
}
