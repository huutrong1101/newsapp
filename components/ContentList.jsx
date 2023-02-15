import React, { useLayoutEffect, useState } from "react";
import ContentTabs from "./Tabs";
import Pagination from "./Pagination";
import Advertisement from "./Advertisement";
import ContentListCard from "./ContentListCard";

const ContentList = ({ posts, totalPages, page }) => {
  const [size, setSize] = useState(1440);
  useLayoutEffect(() => {
    const resizeWindow = () => {
      setSize(window.innerWidth);
    };
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  console.log(posts);

  return (
    <section className="contentList">
      <div className="wrapper">
        <div className="contentList__container">
          <div className="contentList__left">
            <div className="contentList__cards">
              {page === 1
                ? posts
                    .slice(3, 10)
                    .map((post) => (
                      <ContentListCard post={post} key={post._id} />
                    ))
                : posts.map((post) => (
                    <ContentListCard post={post} key={post._id} />
                  ))}
            </div>
            {totalPages > 0 && (
              <Pagination total_pages={totalPages} page={page} />
            )}
          </div>
          {posts.length > 3 && (
            <div className="contentList__right">
              {size < 992 && (
                <Advertisement
                  photo="https://res.cloudinary.com/dxkosumln/image/upload/v1675996204/profiles/kmums74agdt1t4uzxo3w.jpg"
                  blurhash="LCGIWP~WS%JA_4IoX9Rj0K-=kDoM"
                />
              )}
              <ContentTabs />
              {size > 992 && (
                <Advertisement
                  photo="https://res.cloudinary.com/dxkosumln/image/upload/v1675996204/profiles/kmums74agdt1t4uzxo3w.jpg"
                  blurhash="LCGIWP~WS%JA_4IoX9Rj0K-=kDoM"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContentList;
