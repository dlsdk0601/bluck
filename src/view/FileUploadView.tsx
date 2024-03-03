import { useState } from "react";
import { isNil } from "lodash";
import classNames from "classnames";
import { Fileset } from "@/lib/aws";
import { isNotNil } from "@/ex/utils";
import { newFileSet } from "@/ex/base64Ex";

const FileUploadView = (props: { profile?: Fileset; onChange: (fileSet: Fileset) => void }) => {
  const [fileSet, setFileSet] = useState<Fileset | null>(props.profile ?? null);

  const onChange = (fileSet: Fileset) => {
    setFileSet(fileSet);
    props.onChange(fileSet);
  };

  return (
    <label
      htmlFor="profile"
      style={isNotNil(fileSet?.url) ? { backgroundImage: `url(${fileSet.url})` } : undefined}
      className={classNames(
        "flex h-48 w-48 cursor-pointer items-center justify-center rounded-lg border-none mobile:mx-auto mobile:my-3 mobile:h-full mobile:w-full",
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

export default FileUploadView;
