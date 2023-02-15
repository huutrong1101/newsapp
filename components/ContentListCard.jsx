import React from "react";
import Link from "next/link";
import LazyLoadImage from "./LazyLoadImage";
import { dayjsFormat } from "../utils/dayjsFormat";

const ContentListCard = ({ post }) => {
  return (
    <div className="contentList__card">
      <div className="contentList__cardWrapper">
        <Link href={`/post/${post.slug}`} className="contentList__image">
          <LazyLoadImage
            photo={post.photos[0]?.src}
            blurhash={post.photos[0]?.blurhash}
            alt="alt"
          />
        </Link>
        <div className="contentList__content">
          <div className="contentList__text">
            <Link href={`/post/${post.slug}`}>
              <h3 className="contentList__title transition-all duration-200 ease-in dark:hover:opacity-60 dark:text-blue-400">
                {post.title}
              </h3>
            </Link>
            <p
              className="contentList__description dark:text-slate-200"
              dangerouslySetInnerHTML={{
                __html: post.desc.replace(/<[^>]+>/g, ""),
              }}
            ></p>
            <p className="contentList__date dark:text-slate-200">
              {dayjsFormat(post.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentListCard;
