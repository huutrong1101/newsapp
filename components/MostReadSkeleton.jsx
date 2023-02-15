import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MostReadSkeleton = () => {
  return (
    <li className="border-b border-slate-300 pt-[15px] pb-[14px] last:border-none dark:border-slate-600">
      <Skeleton width={80} />
      <Skeleton />
      <Skeleton width={120} />
    </li>
  );
};

export default MostReadSkeleton;
