import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <>
      {/* 프로필 */}
      <div className="flex items-start justify-start bg-cedeff6 px-7 py-5">
        <figure className="relative h-24 w-24">
          <Image src="/assets/img/dog.png" layout="fill" alt="porfile" />
        </figure>
        <div className="ml-4 flex w-4/5 flex-col items-start justify-between">
          <div>
            <span className="text-xl">이름</span> | <span className="text-sm">별명</span>
          </div>
          <div>
            <h3 className="mt-1 text-sm">상태 메세지</h3>
            <p className="mb-2 mt-1 text-xs opacity-70">
              자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개
              자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개자기소개
            </p>
          </div>
          <Link href="/" className="text- text-sm mobile:text-xs">
            회원 정보 변경
          </Link>
        </div>
      </div>

      {/*  하단 */}
      <div className="mt-5 flex h-2/3 items-start justify-between">
        {/*  태그 */}
        <div className="h-full w-1/6">
          <p className="mb-2 h-11 w-full rounded-xl bg-c1f295a py-2 text-center text-lg text-cffffff opacity-90">
            태그
          </p>
          <ul className="h-[40vh] w-full rounded-xl bg-ccfd1dd px-3 py-6">
            <li className="text-cffffff">태그</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Page;
