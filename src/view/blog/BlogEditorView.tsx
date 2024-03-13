"use client";

import React, { useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { isNil, isString } from "lodash";
import { blobToBase64String } from "blob-util";
// @ts-ignore
import ImageResize from "quill-image-resize-module-react";
import { vFileExtension } from "@/ex/validate";
import { isNotNil } from "@/ex/utils";
import { api } from "@/lib/axios";

Quill.register("modules/imageResize", ImageResize);

// image 참고
// https://mingeesuh.tistory.com/entry/Quill-React-%EC%97%90%EB%94%94%ED%84%B0-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EA%B8%B0-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C-%EB%B0%8F-%EC%82%AC%EC%9D%B4%EC%A6%88-%EC%A1%B0%EC%A0%88

const formats = [
  "font",
  "header",
  "bold",
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
      ["link", "image"],
    ],
  },
  imageResize: {
    parchment: Quill.import("parchment"),
    modules: ["Resize", "DisplaySize", "Toolbar"],
  },
};

const BlogEditorView = (props: { title?: string; values?: string }) => {
  const ref = useRef<ReactQuill>(null);
  const [values, setValues] = useState(props.values ?? "");

  useEffect(() => {
    if (isNil(ref.current)) {
      return;
    }

    const editor = ref.current.getEditor();

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

        try {
          const base64 = await blobToBase64String(file);

          const res = await api.newAsset({ base64, name: file.name });

          if (isNil(res)) {
            return;
          }

          if (isString(res)) {
            return alert(res);
          }

          const range = editor.getSelection(true);
          editor.insertEmbed(range.index, "image", res.fileSet.url);
          editor.setSelection({ index: range.index + 1, length: 1 });
        } catch (e) {
          console.error(e);
        }
      };
    };

    editor.getModule("toolbar").handlers.image = handleImage;
  }, [ref]);

  return (
    <>
      <ReactQuill
        ref={ref}
        theme="snow"
        className="h-[50vh] w-full"
        modules={modules}
        formats={formats}
        onChange={(value) => setValues(value)}
      />
      <input type="hidden" name="body" value={values} />
    </>
  );
};

export default BlogEditorView;
