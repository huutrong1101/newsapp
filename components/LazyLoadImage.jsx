import React from "react";
import { useState } from "react";
import LazyLoad from "react-lazy-load";
import { BlurhashCanvas } from "react-blurhash";
import Image from "next/image";
import cx from "classnames";

const LazyLoadImage = ({ photo, blurhash, alt, isPriority }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {blurhash && (
        <BlurhashCanvas
          className="absolute top-0 left-0 h-full w-full object-cover"
          hash={blurhash}
          width={32}
          height={32}
        />
      )}
      <LazyLoad
        className={cx(
          "absolute h-full w-full opacity-0 transition-opacity delay-300 duration-[350ms] ease-in before:absolute before:top-0 before:left-0 before:z-[4] before:h-full before:w-full before:transition-colors before:duration-200 before:ease-linear group-hover:before:bg-[#04102e]/40",
          { "opacity-100": loaded }
        )}
        threshold={0.2}
      >
        <Image
          onLoad={() => setLoaded(true)}
          src={photo}
          alt={alt}
          priority={isPriority}
          fill
          quality={100}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 80vw"
          style={{
            objectFit: "cover",
          }}
        />
      </LazyLoad>
    </>
  );
};

export default LazyLoadImage;
