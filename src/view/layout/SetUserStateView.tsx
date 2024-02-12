"use client";

import { Session } from "next-auth";
import { useEffect } from "react";
import { userState } from "@/store/user";

// auth 함수가 client side 에서는 동작 하지 않아서 일단 원인을 해결하기 전에는
// 해당 컴포넌트로 글로벌 변수를 지정한다.
const SetUserStateView = (props: { session: Session | null }) => {
  const setUser = userState((state) => state.setUser);

  useEffect(() => {
    setUser(props.session?.user ?? null);
  }, []);

  return <></>;
};

export default SetUserStateView;
