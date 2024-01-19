"use client";

import { FormEvent, useState } from "react";
import { isString } from "lodash";
import Button from "@/view/Button";
import { isNotBlank } from "@/ex/utils";
import { api } from "@/lib/axios";

const FindIdFormView = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isFindId, setIsFindId] = useState(false);
  const [id, setId] = useState("");

  const onClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await api.findId({ name, phone });
      console.log(res);

      if (isString(res)) {
        setError(res);
        return;
      }

      setId(res.id);
      setIsFindId(true);
    } catch (e) {
      console.error(e);
      setError("실패");
    }
  };

  return (
    <form onSubmit={(e) => onClick(e)} className="w-4/5 mobile:w-full">
      {isFindId ? (
        <p>
          회원님의 아이디는 <br /> {id}입니다.
        </p>
      ) : (
        <>
          <Button />
          <div className="mt-3 flex items-center justify-center rounded-xl bg-ccfd1dd dark:bg-c000000">
            <label htmlFor="name" className="w-1/5 pl-2 text-sm mobile:pl-4 mobile:text-[10px]">
              이름
            </label>
            <input
              id="name"
              type="text"
              className="h-12 w-4/5 rounded-r-xl bg-ccfd1dd text-sm font-light focus:outline-none dark:bg-c000000 mobile:h-10"
              placeholder="이름을 입력해주세요."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-3 flex items-center justify-center rounded-xl bg-ccfd1dd dark:bg-c000000">
            <label htmlFor="tel" className="w-1/5 pl-2 text-sm mobile:pl-4 mobile:text-[10px]">
              휴대폰
            </label>
            <input
              id="tel"
              type="tel"
              className="h-12 w-4/5 rounded-r-xl bg-ccfd1dd text-sm font-light focus:outline-none dark:bg-c000000 mobile:h-10"
              placeholder="휴대 전화를 입력해주세요."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          {isNotBlank(error) && (
            <p className="mt-2 text-xs text-cff4500 mobile:mt-1 mobile:text-[9px]">{error}</p>
          )}
          <button
            type="submit"
            className="mt-12 h-14 w-full cursor-pointer rounded-2xl border-2 border-solid border-c1f295a dark:border-cffffff mobile:mt-8 mobile:h-10 mobile:text-[12px]"
          >
            아이디 찾기
          </button>
        </>
      )}
    </form>
  );
};
export default FindIdFormView;
