import React from "react";
import MostRead from "./MostRead";
import Link from "next/link";
import { SvgArrowRight } from "./svgs/SvgArrowRight";
import RelatedCard from "./RelatedCard";

const VideoGrid = ({ posts, cat }) => {
  return (
    <section className="bg-[#02050c] pt-[30px] pb-8 lg:pb-14 lg:pt-[58px]">
      <div className="wrapper">
        <div className="relative mx-auto mb-6 flex w-full max-w-full items-center justify-between px-[15px] after:absolute after:bottom-0 after:h-[4px] after:bg-white after:[width:calc(100%-30px)] md:mb-8 md:max-w-[83.3333333333%] lg:max-w-full">
          <h2 className="pb-5 text-[28px] font-bold leading-8 text-white dark:text-slate-200 lg:pb-8 lg:text-[40px] lg:leading-10">
            Videos Logo.
          </h2>
          <div className="btnContainer !hidden -translate-y-1 !p-0 lg:!inline-flex">
            <Link href="/articles" className="cta cta01 dark:!text-slate-200">
              <span>Xem tất cả</span> <SvgArrowRight color="#fff" />
            </Link>
          </div>
        </div>
        <div className="relative flex flex-wrap">
          <div className="mx-auto flex-shrink-0 flex-grow-0 basis-full md:basis-5/6 lg:basis-2/3">
            {posts.slice(4, 5).map((post) => (
              <RelatedCard
                key={post._id}
                post={post}
                cat={cat}
                isVideo={true}
              />
            ))}
          </div>
          <div className="mx-auto flex-shrink-0 flex-grow-0 basis-full md:basis-5/6 lg:basis-1/3">
            {posts.length > 3 ? (
              posts
                .slice(5, 7)
                .map((post) => (
                  <RelatedCard
                    key={post._id}
                    post={post}
                    cat={cat}
                    isRight={true}
                    isVideo={true}
                  />
                ))
            ) : (
              <MostRead />
            )}
          </div>
          <div className="btnContainer mx-auto !mb-0 !mt-2 w-full md:max-w-[83.333333%] lg:hidden">
            <Link href="/articles" className="cta cta01">
              <span>Xem tất cả</span> <SvgArrowRight color="#fff" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoGrid;
