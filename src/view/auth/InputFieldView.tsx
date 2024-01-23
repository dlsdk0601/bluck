import { memo } from "react";

const InputFieldView = (props: {
  value: string;
  onChange: (value: string) => void;
  id: string;
  label: string;
  type?: "text" | "password" | "tel" | "email";
  placeholder?: string;
}) => {
  return (
    <>
      <label htmlFor={props.id} className="w-1/5 pl-2 text-sm mobile:pl-4 mobile:text-[10px]">
        {props.label}
      </label>
      <input
        id={props.id}
        name={props.id}
        type={props.type ?? "text"}
        className="h-12 w-4/5 rounded-r-xl bg-ccfd1dd text-sm font-light focus:outline-none dark:bg-c000000 mobile:h-10"
        placeholder={props.placeholder ?? "데이터를 입력해주세요."}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </>
  );
};

export default memo(InputFieldView);
