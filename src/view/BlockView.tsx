import { ClipLoader } from "react-spinners";

const BlockView = (props: { isLocked: boolean }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        pointerEvents: props.isLocked ? "auto" : "none",
        opacity: props.isLocked ? 1 : 0,
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
