"use client";

import { ClipLoader } from "react-spinners";
import { isLockState } from "@/store/isLock";

const BlockView = () => {
  const isLock = isLockState((state) => state.isLock());
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        pointerEvents: isLock ? "auto" : "none",
        opacity: isLock ? 1 : 0,
        transition: "opacity .3s .1s",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0, 0, 0, 0.2)",
      }}
    >
      <ClipLoader />
    </div>
  );
};

export default BlockView;
