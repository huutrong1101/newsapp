import React from "react";

export const SvgArrowRight = ({ color }) => {
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
        d="M10.5 12.603a.97.97 0 01-.72-.31.996.996 0 01.04-1.41L12 8.803H1.5c-.55 0-1-.45-1-1s.45-1 1-1H12l-2.19-2.08a.997.997 0 111.37-1.45l4 3.8c.21.19.32.46.32.73 0 .27-.11.54-.31.72l-4 3.8c-.19.19-.44.28-.69.28z"
      ></path>
    </svg>
  );
};
