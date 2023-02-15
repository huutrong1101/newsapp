import React from "react";

export const SvgArrowLeft = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        fill={`${color}`}
        d="M5.5 3.397a.97.97 0 01.72.31.996.996 0 01-.04 1.41L4 7.197h10.5c.55 0 1 .45 1 1s-.45 1-1 1H4l2.19 2.08a.997.997 0 11-1.37 1.45l-4-3.8a.985.985 0 01-.32-.73c0-.27.11-.54.31-.72l4-3.8c.19-.19.44-.28.69-.28z"
      ></path>
    </svg>
  );
};
