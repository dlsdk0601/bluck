import { ChangeEvent, useState } from "react";
import { isNil, isString } from "lodash";
import { blobToBase64String } from "blob-util";
import classNames from "classnames";
import { Fileset } from "@/lib/aws";
import { vFileExtension } from "@/ex/validate";
import { isNotNil } from "@/ex/utils";
import { api } from "@/lib/axios";

const FileUploadView = (props: { profile?: Fileset; onChange: (fileSet: Fileset) => void }) => {
  const [fileSet, setFileSet] = useState<Fileset | null>(props.profile ?? null);

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (isNil(files)) {
      return;
    }

    const file = files[0];
    const validFileExtension = vFileExtension(file.type, ["IMAGE"]);
    if (isNotNil(validFileExtension)) {
      alert(validFileExtension);
      return;
    }

    const base64 = await blobToBase64String(file);

    const res = await api.newAsset({ base64, name: file.name });

    if (isNil(res)) {
      return;
    }

    if (isString(res)) {
      return alert(res);
    }

    setFileSet(res.fileSet);
    props.onChange(res.fileSet);
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
        onChange={(e) => onChange(e)}
        accept="image/*"
        id="profile"
        name="profile"
        className="hidden"
      />
    </label>
  );
};

export default FileUploadView;
