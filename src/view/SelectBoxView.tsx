"use client";

import { isNil } from "lodash";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { isBlank } from "@/ex/utils";

export function SelectBoxView<T>(props: {
  label?: string;
  value: T;
  options: [T, string][];
  onChange: (value: T) => void;
  disabled?: boolean;
  className?: string;
  error?: string;
}) {
  return (
    <div className="bold mt-[20px] w-[60px] cursor-pointer text-[12px] mobile:text-[8px]">
      {props.label && (
        <label>
          {props.label} <Image width={10} height={10} src="/assets/img/aroow.png" alt="arrow" />
        </label>
      )}
      <select
        value={stringify(props.value)}
        onChange={(event) => {
          // eslint-disable-next-line no-restricted-syntax
          for (const [value, _] of props.options) {
            if (stringify(value) === event.target.value) {
              props.onChange(value);
              return;
            }
          }
        }}
        disabled={props.disabled ?? false}
      >
        {props.options.map(([value, label]) => {
          return (
            <option
              className="w-full bg-c1f295a opacity-80"
              key={`select-box-${label}`}
              value={stringify(value)}
            >
              {label}
            </option>
          );
        })}
      </select>
      {!isBlank(props.error) && <p className="text-red-500 mt-1 text-xs">{props.error}</p>}
    </div>
  );
}

function stringify(value: any): string {
  if (isNil(value)) {
    return "";
  }

  return value.toString();
}

export function MainSelectBoxView<T>(props: {
  value: T;
  options: Array<[value: T, label: string]>;
}) {
  // TODO :: query 제너레이트 추가
  const router = useRouter();
  return (
    <SelectBoxView
      value={props.value}
      options={props.options}
      onChange={(value) => router.push("/?a=TODAY")}
    />
  );
}
