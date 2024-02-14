import Image from "next/image";
import Link from "next/link";
import { MyPageUser } from "@/type/definitions";

const MyPageProfileView = (props: { user: MyPageUser }) => {
  return (
    <div className="flex items-start justify-start bg-cedeff6 px-7 py-5">
      <figure className="relative h-24 w-24">
        <Image src={props.user.profile.url} fill alt="porfile" />
      </figure>
      <div className="ml-4 flex w-4/5 flex-col items-start justify-between">
        <div>
          <span className="text-xl">{props.user.name}</span> |{" "}
          <span className="text-sm">{props.user.email}</span>
        </div>
        <div>
          <h3 className="mt-1 text-sm">{props.user.message}</h3>
          <p className="mb-2 mt-1 text-xs opacity-70">{props.user.introduce}</p>
        </div>
        <Link href="/" className="text- text-sm mobile:text-xs">
          회원 정보 변경
        </Link>
      </div>
    </div>
  );
};

export default MyPageProfileView;
