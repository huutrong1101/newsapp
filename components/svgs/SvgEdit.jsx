import React from "react";

export const SvgEdit = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path stroke="none" d="M0 0h24v24H0z"></path>
      <path d="M4 20h4L18.5 9.5a1.5 1.5 0 00-4-4L4 16v4"></path>
      <path d="M13.5 6.5L17.5 10.5"></path>
    </svg>
  );
};
