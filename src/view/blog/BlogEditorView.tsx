import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
  const [values, setValues] = useState("");

  return (
    <ReactQuill
      theme="snow"
      className="h-[45vh]"
      modules={modules}
      formats={formats}
      onChange={(value) => setValues(value)}
    />
  );
};

export default BlogEditorView;
