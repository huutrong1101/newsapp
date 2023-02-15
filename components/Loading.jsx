import React from "react";
import { SvgLoading } from "./svgs/SvgLoading";

const Loading = () => {
  return (
    <div className="z-40 loader dark:bg-gray-900">
      <SvgLoading />
    </div>
  );
};

export default Loading;
