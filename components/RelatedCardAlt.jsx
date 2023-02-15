import React from "react";
import Link from "next/link";
import Image from "next/image";
import IconPhotoGallery from "../assets/icons-base/icon-photo-gallery.png";
import LazyLoadImage from "./LazyLoadImage";
import cx from "classnames";
import { dayjsFormat } from "../utils/dayjsFormat";
import TagCardAlt from "./TagCardAlt";

const RelatedCardAlt = ({ post, isRelatedArticles }) => {
  return (
    <article
      className={cx(
        "group relative mb-6 w-full flex-shrink-0 flex-grow-0 basis-full xs:px-[15px] lg:basis-1/3",
        { "mb-4 xs:mb-[30px] lg:basis-1/2": isRelatedArticles }
      )}
    >
      <div
        className="relative h-0 overflow-hidden rounded-none pb-[62.8571%] shadow-sm shadow-black/30 xs:rounded-sm"
        style={{ backgroundColor: `${post.photos[0]?.color}` }}
      >
        <Link
          className="absolute top-0 left-0 h-full w-full"
          href={`/post/${post.slug}`}
        >
          <LazyLoadImage
            photo={post.photos[0]?.src}
            blurhash={post.photos[0]?.blurhash}
            alt={post.title}
          />
        </Link>
        {post.photos.length > 1 && (
          <div
            className="absolute top-2 right-2 z-[4] h-7 w-7 cursor-pointer"
            title="Bộ sưu tập"
          >
            <Image
              src={IconPhotoGallery}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
      </div>
      <div className="flex flex-col px-[15px] xs:px-0">
        <div className="mt-[11px] flex h-[22px] items-center justify-between">
          <TagCardAlt post={post} />
          <small className="text-lg font-light leading-5 text-slate-900 dark:text-slate-200">
            {dayjsFormat(post.createdAt)}
          </small>
        </div>
        <Link href={`/post/${post.slug}`}>
          <h3 className="mt-[6px] pt-[2px] text-2xl font-bold leading-7 text-slate-900 transition-colors duration-200 ease-in line-clamp-2 hover:text-blue-900 dark:text-slate-200 dark:hover:text-blue-400">
            {post.title}
          </h3>
        </Link>
        {isRelatedArticles && (
          <p
            className="mt-[2px] text-base leading-[26px] line-clamp-3 dark:text-slate-200"
            dangerouslySetInnerHTML={{
              __html: post.desc.replace(/<[^>]+>/g, ""),
            }}
          ></p>
        )}
      </div>
    </article>
  );
};

export default RelatedCardAlt;
