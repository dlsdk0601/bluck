import { ChangeEvent } from "react";
import { isNil, isString } from "lodash";
import { blobToBase64String } from "blob-util";
import { Fileset } from "@/lib/aws";
import { vFileExtension } from "@/ex/validate";
import { isNotNil } from "@/ex/utils";
import { api } from "@/lib/api.g";

export type ImageType = {
  id?: number;
  type: string;
  fileName: string;
  fileBase64: string;
};

export const _blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const { result } = reader;
      if (typeof result === "string") {
        res(result);
      } else {
        rej(new Error("readAsDataURL 결과값이 string이 아님"));
      }
    };
    reader.readAsDataURL(blob);
  });
};

export const fileToBase64 = async (
  file: File,
): Promise<{ type: string; fileName: string; fileBase64: string }> => {
  const dataUri = await _blobToBase64(file);
  return {
    type: file.type,
    fileName: file.name,
    fileBase64: dataUri.split(",")[1] ?? "",
  };
};

export const newFileSet = async (
  e: ChangeEvent<HTMLInputElement>,
  callBack: (fileSet: Fileset) => void,
) => {
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

  const res = await api.assetNew({ base64, name: file.name });

  if (isNil(res)) {
    return;
  }

  if (isString(res)) {
    return alert(res);
  }

  callBack(res.fileSet);
};
