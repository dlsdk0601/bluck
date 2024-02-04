"use client";

import { head, isNil } from "lodash";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Urls } from "@/url/url.g";

export function SelectBoxView<T>(props: {
  value: T;
  options: [T, string][];
  onChange: (value: T) => void;
  disabled?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { isOpen, setIsOpen } = useClickOutside(ref);
  const [label, setLabel] = useState("");

  const onClickBox = useCallback(() => {
    if (props.disabled) {
      return;
    }

    setIsOpen((prev) => !prev);
  }, [props]);

  useEffect(() => {
    const options = [...props.options];
    const value = options.find((item) => item[0] === props.value);

    if (isNil(value)) {
      const firstItem = head(options);
      setLabel(isNil(firstItem) ? "" : firstItem[1]);
      return;
    }

    setLabel(value[1]);
  }, [props]);

  return (
    <div
      ref={ref}
      className={classNames(
        "bold relative mr-[20px] flex w-[60px] cursor-pointer items-center justify-center text-[12px] dark:text-cffffff mobile:w-[45px] mobile:text-[8px]",
        props.className,
      )}
      onClick={() => onClickBox()}
    >
      {label}{" "}
      <div className="ml-1 h-[15px] w-[15px] mobile:h-[10px] mobile:w-[10px]">
        <Image
          className="inline-block"
          height={15}
          width={15}
          src="/assets/img/aroow.png"
          alt="search-arrow"
        />
      </div>
      <ul
        className={classNames(
          "absolute left-0 top-[150%] z-10 w-full rounded-xl bg-c1f295a opacity-80",
          {
            block: isOpen,
            hidden: !isOpen,
          },
        )}
      >
        {props.options.map((item) => (
          <li
            key={`select-box-${item[1]}-${Date.now()}`}
            className="my-[10px] text-center text-[10px] text-cffffff mobile:text-[8px]"
            onClick={() => props.onChange(item[0])}
          >
            {item[1]}
          </li>
        ))}
      </ul>
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
  className?: string;
  queryKey: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onChange = (value: T) => {
    router.replace(Urls.page.setQuery(searchParams, { [props.queryKey]: stringify(value) }));
  };

  return (
    <SelectBoxView
      value={props.value}
      options={props.options}
      onChange={(value) => onChange(value)}
      className={props.className}
    />
  );
}
