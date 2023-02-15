import React from "react";

export const SvgPlay = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="70"
      height="72"
      fill="none"
      viewBox="0 0 70 72"
    >
      <g filter="url(#filter0_d_1035_12)">
        <path
          fill="#fff"
          d="M35 4c17.12 0 31 13.879 31 31 0 17.12-13.878 31-31 31C17.88 66 4 52.12 4 35 4 17.879 17.878 4 35 4zm-5.034 21.312a.872.872 0 00-.87.868v17.64a.866.866 0 001.309.75l15.12-8.82a.868.868 0 000-1.5l-15.12-8.818a.871.871 0 00-.44-.119l.001-.001z"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_d_1035_12"
          width="70"
          height="70"
          x="0"
          y="2"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dy="2"></feOffset>
          <feGaussianBlur stdDeviation="2"></feGaussianBlur>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1035_12"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_1035_12"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
};
