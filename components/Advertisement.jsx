import LazyLoadImage from "./LazyLoadImage";
import Link from "next/link";

const Advertisement = ({ photo, blurhash }) => {
  return (
    <div className="advertisement">
      <div className="advertisement__container">
        <figure
          className="advertisement__bg"
        >
          <Link href="/link" className="advertisement__link">
            <LazyLoadImage
              photo={photo} 
              blurhash={blurhash}
              alt="alt"
            />
          </Link>
        </figure>
      </div>
    </div>
  );
};

export default Advertisement;
