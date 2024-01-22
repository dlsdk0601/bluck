"use client";

import { FormEvent, useCallback, useState } from "react";
import { isString } from "lodash";
import { isBlank, isNotBlank, isNotNil } from "@/ex/utils";
import { api } from "@/lib/axios";
import InputFieldView from "@/view/auth/InputFieldView";
import { errorMessage } from "@/lib/errorEx";
import { vPhone } from "@/ex/validate";

const FindIdFormView = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [id, setId] = useState("");

  const onClick = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (isBlank(name)) {
        setError(errorMessage.nameRequired);
        return;
      }

      if (isBlank(phone)) {
        setError(errorMessage.phoneRequired);
        return;
      }

      const validPhone = vPhone(phone);
      if (isNotNil(validPhone)) {
        setError(errorMessage.phoneBadFormat);
        return;
      }

      try {
        const res = await api.findId({ name, phone });

        if (isString(res)) {
          setError(res);
          return;
        }

        setId(res.id);
      } catch (e) {
        console.error(e);
        setError("서버가 원활하지 않습니다.");
      }
    },
    [name, phone],
  );

  return (
    <form onSubmit={(e) => onClick(e)} className="w-4/5 mobile:w-full">
      {isNotBlank(id) ? (
        <p>
          회원님의 아이디는 <br /> {id}입니다.
        </p>
      ) : (
        <>
          <div className="mt-3 flex items-center justify-center rounded-xl bg-ccfd1dd dark:bg-c000000">
            <InputFieldView
              id="name"
              value={name}
              label="이름"
              onChange={(value) => setName(value)}
              placeholder="이름을 입력해주세요."
            />
          </div>
          <div className="mt-3 flex items-center justify-center rounded-xl bg-ccfd1dd dark:bg-c000000">
            <InputFieldView
              id="tel"
              type="tel"
              label="휴대폰"
              value={phone}
              onChange={(value) => setPhone(value)}
              placeholder="휴대 전화를 입력해주세요."
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
