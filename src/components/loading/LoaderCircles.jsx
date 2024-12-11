import React from "react";
import { Circles } from "react-loader-spinner";

const DEFAULT_SPINNER_SIZE = 50;

/**
 * Used to display the loading state.
 * @returns {JSX.Element}
 * @constructor
 */
export default function LoaderCircles({ spinnerSize = DEFAULT_SPINNER_SIZE }) {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", padding: "10px 0" }}
    >
      <div
        style={{
          display: "flex",
          height: "8rem",
          twBgOpacity: 1,
          backgroundColor: "rgba(229, 231, 235, var(--tw-bg-opacity))",
        }}
      />
      <Circles
        visible={true}
        height={spinnerSize}
        width={spinnerSize}
        ariaLabel="comment-loading"
        wrapperStyle={{}}
        wrapperClass="comment-wrapper"
        color="gray"
      />
    </div>
  );
}
