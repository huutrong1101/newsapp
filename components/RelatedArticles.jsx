import React from "react";
import Link from "next/link";
import MostRead from "./MostRead";
import NextEvents from "./NextEvents";
import Advertisement from "./Advertisement";
import { SvgArrowRight } from "./svgs/SvgArrowRight";
import RelatedCardAlt from "./RelatedCardAlt";
import { useTheme } from "next-themes";

const RelatedArticles = ({ posts }) => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <section className="pb-0 lg:pb-14">
      <div className="wrapper">
        <div className="relative flex flex-wrap">
          <div className="mx-auto flex h-full flex-shrink-0 flex-grow-0 basis-full flex-wrap md:basis-5/6 lg:basis-2/3">
            {posts.slice(3, 11).map((post) => (
              <RelatedCardAlt
                key={post._id}
                post={post}
                isRelatedArticles={true}
              />
            ))}
            <div className="btnContainer w-full">
              <Link
                href="/articles?page=2"
                className="cta cta01 m-01 dark:!text-blue-500"
              >
                <span>Thêm tin tức</span>{" "}
                <SvgArrowRight
                  color={currentTheme === "dark" ? "#3B82F6" : "#1e3a8a"}
                />
              </Link>
            </div>
          </div>
          {posts.length > 3 && (
            <div className="mx-auto basis-full md:basis-5/6 lg:basis-1/3">
              <MostRead />
              <Advertisement
                photo="https://res.cloudinary.com/dxkosumln/image/upload/v1675996204/profiles/kmums74agdt1t4uzxo3w.jpg"
                blurhash="LCGIWP~WS%JA_4IoX9Rj0K-=kDoM"
              />
              <NextEvents />
              <div className="btnContainer w-full">
                <Link
                  href="/link"
                  className="cta cta01 m-01 dark:!text-blue-500"
                >
                  <span>Xem tất cả</span>{" "}
                  <SvgArrowRight
                    color={currentTheme === "dark" ? "#3B82F6" : "#1e3a8a"}
                  />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RelatedArticles;
