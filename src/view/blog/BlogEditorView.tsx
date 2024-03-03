"use client";

import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { isNil, isString } from "lodash";
import { blobToBase64String } from "blob-util";
import { RangeStatic } from "quill";
import classNames from "classnames";
import { vFileExtension } from "@/ex/validate";
import { isNotNil } from "@/ex/utils";
import { api } from "@/lib/axios";
import { newFileSet } from "@/ex/base64Ex";
import { Fileset } from "@/lib/aws";

// image 참고
// https://mingeesuh.tistory.com/entry/Quill-React-%EC%97%90%EB%94%94%ED%84%B0-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EA%B8%B0-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C-%EB%B0%8F-%EC%82%AC%EC%9D%B4%EC%A6%88-%EC%A1%B0%EC%A0%88

const formats = [
  "font",
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "align",
  "color",
  "background",
  "size",
  "h1",
  "link",
  "image",
];

const modules = {
  toolbar: {
    container: [
      [{ size: ["small", false, "large", "huge"] }],
      [{ align: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [
        {
          color: [],
        },
        { background: [] },
      ],
      ["link", "image", "video"],
    ],
  },
};

const BlogEditorView = () => {
  const ref = useRef<ReactQuill>(null);
  const [values, setValues] = useState("");

  useEffect(() => {
    if (isNil(ref.current)) {
      return;
    }

    const toolbar = ref.current.getEditor().getModule("toolbar");
    console.log(toolbar.quill.selection.savedRange);

    const handleImage = () => {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();
      input.onchange = async () => {
        if (isNil(input.files)) {
          return;
        }

        const file = input.files[0];
        const validFileExtension = vFileExtension(file.type, ["IMAGE"]);
        if (isNotNil(validFileExtension)) {
          alert(validFileExtension);
          return;
        }

        // 현재 커서 위치 저장
        // TODO :: console 에 찍히는 값과 ts 정의가 다르다 확인
        console.log(ref.current);
        // const range = getEditor().getSelection(true);
        const { getEditor } = toolbar.quill;
        const range: RangeStatic = toolbar.quill.selection.savedRange;

        // 서버에 올려질때까지 표시할 로딩 placeholder 삽입
        getEditor().insertEmbed(range.index, "image", "/images/loading.gif");

        try {
          const base64 = await blobToBase64String(file);

          const res = await api.newAsset({ base64, name: file.name });

          if (isNil(res)) {
            return;
          }

          if (isString(res)) {
            return alert(res);
          }

          // 정상적으로 업로드 됐다면 로딩 placeholder 삭제
          getEditor().deleteText(range.index, 1);
          // 받아온 url을 이미지 태그에 삽입
          getEditor().insertEmbed(range.index, "image", res.fileSet.url);

          // 사용자 편의를 위해 커서 이미지 오른쪽으로 이동
          getEditor().setSelection({ index: range.index, length: range.index + 1 });
        } catch (e) {
          getEditor().deleteText(range.index, 1);
        }
      };
    };

    toolbar.addHandler("image", handleImage);
  }, [ref]);

  // TODO :: 이미지 처리
  return (
    <>
      <BlogBannerView onChange={(fileSet) => {}} />
      <ReactQuill
        ref={ref}
        theme="snow"
        className="h-[45vh] w-full"
        modules={modules}
        formats={formats}
        onChange={(value) => setValues(value)}
      />
    </>
  );
};

const BlogBannerView = (props: { onChange: (fileSet: Fileset) => void }) => {
  const [fileSet, setFileSet] = useState<Fileset | null>(null);
  const onChange = (fileSet: Fileset) => {
    setFileSet(fileSet);
    props.onChange(fileSet);
  };

  return (
    <label
      htmlFor="profile"
      style={isNotNil(fileSet?.url) ? { backgroundImage: `url(${fileSet.url})` } : undefined}
      className={classNames(
        "mb-3 flex h-48 w-full cursor-pointer items-center justify-center rounded-lg border-none mobile:mx-auto mobile:my-3 mobile:h-full mobile:w-full",
        {
          "bg-ccfd1dd dark:bg-c000000": isNil(fileSet),
          "bg-cover bg-center bg-no-repeat": isNotNil(fileSet),
        },
      )}
    >
      {isNil(fileSet) ? "\u002B" : ""}
      <input
        type="file"
        onChange={(e) => newFileSet(e, onChange)}
        accept="image/*"
        id="profile"
        name="profile"
        className="hidden"
      />
    </label>
  );
};

export default BlogEditorView;
