"use client";

import React, { useState } from "react";
import classNames from "classnames";
import { isNil } from "lodash";
import { Fileset } from "@/lib/aws";
import { isNotNil } from "@/ex/utils";
import { newFileSet } from "@/ex/base64Ex";

const BlogBannerView = (props: { fileSet?: Fileset }) => {
  const [fileSet, setFileSet] = useState<Fileset | null>(props.fileSet ?? null);

  return (
    <label
      htmlFor="profile"
      style={isNotNil(fileSet?.url) ? { backgroundImage: `url(${fileSet.url})` } : undefined}
      className={classNames(
        "mb-3 flex h-40 w-full cursor-pointer items-center justify-center rounded-lg border-none mobile:mx-auto mobile:my-3 mobile:h-full mobile:w-full",
        {
          "bg-ccfd1dd dark:bg-c000000": isNil(fileSet),
          "bg-cover bg-center bg-no-repeat": isNotNil(fileSet),
        },
      )}
    >
      {isNil(fileSet) ? "배너 \u002B" : ""}
      <input
        type="file"
        onChange={(e) => newFileSet(e, (fileSet) => setFileSet(fileSet))}
        accept="image/*"
        id="profile"
        name="profile"
        className="hidden"
      />
      <input type="hidden" name="uuid" value={fileSet?.uuid} />
    </label>
  );
};

export default BlogBannerView;
