"use client";

import React, { useState } from "react";
import Select, { SingleValue } from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const BlogTagSelectView = () => {
  const [selectedOption, setSelectedOption] =
    useState<SingleValue<{ value: string; label: string } | null>>(null);

  // TODO :: use-debounce 추가
  // TODO :: 새로운 태그 등록
  return (
    <Select
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderColor: state.isFocused ? "none" : "none",
          marginBottom: "0.75rem",
        }),
      }}
      onInputChange={(value) => {
        console.log(value);
      }}
      defaultValue={selectedOption}
      onChange={(newValue) => setSelectedOption(newValue)}
      options={options}
      placeholder="태그를 선택해주세요."
      noOptionsMessage={NoOptionView}
    />
  );
};

const NoOptionView = (value: { inputValue: string }) => {
  return (
    <button type="button" className="text-c1f295a">
      {value.inputValue} 생성하기
    </button>
  );
};

export default BlogTagSelectView;
