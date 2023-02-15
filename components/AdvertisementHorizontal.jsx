import Link from "next/link";
import LazyLoadImage from "./LazyLoadImage";

const AdvertisementHorizontal = ({ photo, blurhash, alt }) => {
  return (
    <div className="pt-4 pb-8 md:pt-8 md:pb-16 lg:pt-0">
      <div className="wrapper mx-auto [max-width:calc(288px+30px)] xs:max-w-full md:max-w-[83.3333333333%] lg:max-w-[960px] xl:max-w-[1440px]">
        <div className="px-[15px]">
          <figure className="group relative h-0 overflow-hidden rounded-sm pb-[calc(69.4444%+0.01px)] shadow-sm shadow-black/30 xs:pb-[calc(21.6216%+0.01px)]">
            <Link href="/link">
              <LazyLoadImage photo={photo} blurhash={blurhash} alt={alt} />
            </Link>
          </figure>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementHorizontal;
