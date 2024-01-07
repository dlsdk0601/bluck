"use client";

import React from "react";

const ButtonView = () => {
  const onclick = async () => {
    const res = await fetch("/api/test", {
      method: "post",
      body: JSON.stringify({ a: "1", b: 3 }),
    }).then((res) => res.json());

    console.log(res);
  };
  return (
    <button type="button" onClick={() => onclick()}>
      test button
    </button>
  );
};

export default ButtonView;
