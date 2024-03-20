"use client";

import React, { useState } from "react";
import { ActionMeta, MultiValue } from "react-select";
import makeAnimated from "react-select/animated";
import CreatableSelect from "react-select/creatable";
import { isNil, isString, last } from "lodash";
import { Option } from "@/type/definitions";
import { api } from "@/lib/api.g";

const animatedComponents = makeAnimated();

const BlogTagSelectView = (props: { allTag: Option[]; defaultTags?: Option[] }) => {
  const [tags, setTags] = useState<Option[]>(props.defaultTags ?? []);

  const onChange = async (newValue: MultiValue<Option>, actionMeta: ActionMeta<Option>) => {
    switch (actionMeta.action) {
      case "select-option":
      case "remove-value":
        setTags([...newValue]);
        break;
      case "create-option": {
        const newTag = last(newValue);
        if (isNil(newTag)) {
          return;
        }

        const res = await api.tagNew({ name: newTag.label });

        if (isString(res)) {
          return alert(res);
        }

        setTags([...tags, { label: newTag.label, value: res.pk }]);
        break;
      }
      default:
        break;
    }
  };

  return (
    <>
      <CreatableSelect
        isMulti
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            borderColor: "none",
            marginBottom: "0.75rem",
          }),
        }}
        components={animatedComponents}
        value={tags}
        onChange={onChange}
        options={props.allTag}
        placeholder="태그를 선택해주세요."
      />
      {tags.map((tag) => (
        <input type="hidden" value={tag.value} name="tags" />
      ))}
    </>
  );
};

export default BlogTagSelectView;
