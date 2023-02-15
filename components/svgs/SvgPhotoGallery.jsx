import React from "react";

export const SvgPhotoGallery = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      fill="none"
      viewBox="0 0 28 28"
    >
      <g filter="url(#filter0_d_612_2)">
        <path
          fill="#fff"
          d="M21.857 18h3.541c.333 0 .602-.283.602-.631V4.63c0-.347-.27-.63-.602-.63H8.602C8.269 4 8 4.283 8 4.631v3.702h12.504c.746 0 1.353.636 1.353 1.42V18z"
        ></path>
      </g>
      <g filter="url(#filter1_d_612_2)">
        <path
          fill="#fff"
          d="M2 10.406v12.783c0 .38.308.687.687.687h16.907c.38 0 .687-.308.687-.687V10.406a.687.687 0 00-.687-.688H2.687a.687.687 0 00-.687.688z"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_d_612_2"
          width="22"
          height="18"
          x="6"
          y="4"
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
          <feGaussianBlur stdDeviation="1"></feGaussianBlur>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_612_2"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_612_2"
            result="shape"
          ></feBlend>
        </filter>
        <filter
          id="filter1_d_612_2"
          width="22.281"
          height="18.158"
          x="0"
          y="9.718"
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
          <feGaussianBlur stdDeviation="1"></feGaussianBlur>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_612_2"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_612_2"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
};
