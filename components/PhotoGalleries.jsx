import React from "react";
import Link from "next/link";
import RelatedCardAlt from "./RelatedCardAlt";
import MostRead from "./MostRead";
import { SvgArrowRight } from "./svgs/SvgArrowRight";
import RelatedCard from "./RelatedCard";
import { useTheme } from "next-themes";

const PhotoGalleries = ({ posts, cat }) => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <section className="pt-[30px] pb-4 lg:pb-14 lg:pt-[58px]">
      <div className="wrapper">
        <div className="relative mx-auto mb-6 flex w-full max-w-full items-center justify-between px-[15px] after:absolute after:bottom-0 after:h-[4px] after:bg-blue-900 after:[width:calc(100%-30px)] dark:after:bg-blue-500 md:mb-8 md:max-w-[83.3333333333%] lg:max-w-full">
          <h2 className="pb-5 text-[28px] font-bold leading-8 text-slate-900 dark:text-slate-200 lg:pb-8 lg:text-[40px] lg:leading-10">
            Phòng trưng bày ảnh Logo.
          </h2>
          <div className="btnContainer !hidden -translate-y-1 !p-0 lg:!inline-flex">
            <Link
              href="/articles"
              className="cta cta01 m-01 dark:!text-slate-200"
            >
              <span>Xem thư viện ảnh</span>{" "}
              <SvgArrowRight
                color={currentTheme === "dark" ? "#ffffff" : "#1e3a8a"}
              />
            </Link>
          </div>
        </div>
        <div className="relative flex flex-wrap">
          <article className="mx-auto flex-shrink-0 flex-grow-0 basis-full md:basis-5/6 lg:basis-2/3">
            {posts.slice(7, 8).map((post) => (
              <RelatedCard key={post._id} post={post} cat={cat} />
            ))}
          </article>
          <article className="mx-auto flex-shrink-0 flex-grow-0 basis-full md:basis-10/12 lg:basis-1/3">
            {posts.length > 3 ? (
              posts
                .slice(8, 10)
                .map((post) => (
                  <RelatedCard
                    key={post._id}
                    post={post}
                    cat={cat}
                    isRight={true}
                  />
                ))
            ) : (
              <MostRead />
            )}
          </article>
        </div>
        <div className="mx-auto flex max-w-full flex-wrap md:max-w-[83.3333333333%] lg:max-w-full">
          {posts.slice(0, 3).map((post) => (
            <RelatedCardAlt key={post._id} post={post} cat={cat} />
          ))}
          <div className="btnContainer !mb-2 inline-flex w-full lg:hidden">
            <Link
              href="/articles"
              className="cta cta01 m-01 dark:!text-slate-100"
            >
              <span>Xem thư viện ảnh</span>{" "}
              <SvgArrowRight
                color={currentTheme === "dark" ? "#ffffff" : "#1e3a8a"}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoGalleries;
