import React from "react";
import Image from "next/image";
import Link from "next/link";
import IconPhotoGallery from "../assets/icons-base/icon-photo-gallery.png";
import IconPlay from "../assets/icons-base/icon-play.png";
import LazyLoadImage from "./LazyLoadImage";
import cx from "classnames";
import { dayjsFormat } from "../utils/dayjsFormat";
import TagCard from "./TagCard";

const RelatedCard = ({ post, cat, isRight, isVideo, isPriority }) => {
  return (
    <article className="group mb-4 px-0 xs:px-[15px] lg:mb-[30px]">
      <div
        className={cx(
          "relative h-0 overflow-hidden rounded-none pb-[64.3836%] shadow-sm shadow-black/30 xs:rounded-sm",
          { "pb-[62.8571%]": isRight }
        )}
        style={{ backgroundColor: `${post.photos[0]?.color}` }}
      >
        <Link
          href={`/post/${post.slug}`}
          className="absolute top-0 left-0 bottom-0 h-full w-full"
        >
          <LazyLoadImage
            photo={post.photos[0]?.src}
            blurhash={post.photos[0]?.blurhash}
            alt={post.title}
            isPriority={isPriority}
          />
        </Link>
        <div className="absolute top-0 flex h-14 w-full items-center justify-between py-2 pl-5 pr-3">
          <TagCard post={post} cat={cat} />
          {!isVideo && (
            <>
              {post.photos?.length > 1 && (
                <div
                  className="relative z-40 h-7 w-7 -translate-y-1 cursor-pointer"
                  title="Bộ sưu tập"
                >
                  <Image
                    src={IconPhotoGallery}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
            </>
          )}
        </div>
        {isVideo && (
          <div
            className={cx(
              "absolute top-2 right-2 z-40 h-8 w-8 cursor-pointer",
              {
                "lg:top-1/2 lg:left-1/2 lg:h-[72px] lg:w-[72px] lg:-translate-x-1/2 lg:-translate-y-1/2":
                  !isRight,
              }
            )}
            title="video"
          >
            <Image
              src={IconPlay}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div
          className={cx(
            "absolute left-0 bottom-0 flex h-full max-h-[90%] w-full flex-col justify-end py-[18px] px-5 text-white xs:rounded-bl-[2px] xs:rounded-br-[2px] xl:max-h-[65%]",
            {
              "xl:max-h-[90%]": isRight,
              "[background-image:linear-gradient(rgba(0,_0,_0,_0)_36%,_rgba(0,_0,_0,_0.85)_82%)]":
                isVideo,
              "[background-image:linear-gradient(rgba(0,_0,_0,_0)_36%,_rgba(4,_16,_46,_0.85)_82%)]":
                !isVideo,
            }
          )}
        >
          <Link className="z-40" href={`/post/${post.slug}`}>
            <h3
              className={cx(
                "mb-[5px] overflow-hidden pt-[2px] text-2xl font-bold leading-[28px] line-clamp-3 dark:text-slate-200 md:pt-0 lg:line-clamp-2",
                { "lg:text-[34px] lg:leading-[42px] lg:line-clamp-3": !isRight }
              )}
            >
              {post.title}
            </h3>
          </Link>
          <small
            className={cx("z-40 text-sm leading-[18px] dark:text-slate-200", {
              "lg:text-lg lg:leading-6": !isRight,
            })}
          >
            {dayjsFormat(post.createdAt)}
          </small>
        </div>
      </div>
    </article>
  );
};

export default RelatedCard;
