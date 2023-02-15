import React from "react";
import MostRead from "./MostRead";
import RelatedCard from "./RelatedCard";

const GridNews = ({ posts, cat, subCat, articles, page }) => {
  return (
    <section>
      <div className="mx-auto w-full max-w-[960px] px-0 xs:px-6 md:px-[5%] xl:max-w-[90rem]">
        <div className="mx-auto px-[15px] md:w-5/6 lg:w-full">
          {
            // Chỉ dành cho mainTitle
            // Mặc định nếu không chọn menu thể loại thì đường dẫn cat, subCat = undefined
            cat !== undefined && subCat !== undefined ? ( // đã chọn menu thể loại và danh mục phụ
              <h1 className="px-0 pt-[16px] pb-[14px] text-[28px] font-normal leading-8 dark:text-slate-200 lg:pt-[29px] lg:pb-[20px] lg:text-[40px] lg:leading-[56px]">
                {[
                  cat === "economy"
                    ? "Kinh tế"
                    : cat === "culture"
                    ? "Văn hoá"
                    : cat === "politics"
                    ? "Chính trị"
                    : cat === "society"
                    ? "Xã hội"
                    : cat === "mobility"
                    ? "Tính di động"
                    : cat === "environment"
                    ? "Môi trường"
                    : cat === "sports"
                    ? "Thể thao"
                    : "",
                ]}
                <b>
                  {[
                    subCat === "innovation"
                      ? " / Sự đổi mới"
                      : subCat === "tourism"
                      ? " / Du lịch"
                      : subCat === "civil-protection"
                      ? " / Bảo vệ công dân"
                      : subCat === "education"
                      ? " / Giáo dục"
                      : subCat === "housing"
                      ? " / Nhà ở"
                      : subCat === "urban-planning"
                      ? " / Quy hoạch đô thị"
                      : "",
                  ]}
                </b>
              </h1>
            ) : cat !== undefined ? ( // đã chọn menu thể loại
              <h1 className="px-0 pt-[16px] pb-[14px] text-[28px] font-normal leading-8 dark:text-slate-200 lg:pt-[29px] lg:pb-[20px] lg:text-[40px] lg:leading-[56px]">
                <b>
                  {[
                    cat === "economy"
                      ? "Kinh tế"
                      : cat === "culture"
                      ? "Văn hoá"
                      : cat === "politics"
                      ? "Chính trị"
                      : cat === "society"
                      ? "Xã hội"
                      : cat === "mobility"
                      ? "Tính di động"
                      : cat === "environment"
                      ? "Môi trường"
                      : cat === "sports"
                      ? "Thể thao"
                      : "",
                  ]}
                </b>
              </h1>
            ) : articles ? (
              <h1 className="px-0 pt-[16px] pb-[14px] text-[28px] font-normal leading-8 dark:text-slate-200 lg:pt-[29px] lg:pb-[20px] lg:text-[40px] lg:leading-[56px]">
                <b>Tin Tức Logo.</b>
              </h1>
            ) : (
              <h1 className="px-0 pt-[16px] pb-[14px] text-[28px] font-normal leading-8 dark:text-slate-200 lg:pt-[29px] lg:pb-[20px] lg:text-[40px] lg:leading-[56px]">
                Cổng thông <b>tin Logo.</b>
              </h1>
            )
          }
        </div>
        {page === 1 && (
          <div className="relative flex flex-wrap">
            <div className="mx-auto flex-shrink-0 flex-grow-0 basis-full md:basis-5/6 lg:basis-2/3">
              {posts.slice(0, 1).map((post) => (
                <RelatedCard
                  key={post._id}
                  post={post}
                  cat={cat}
                  isPriority={true}
                />
              ))}
            </div>
            <div className="mx-auto flex-shrink-0 flex-grow-0 basis-full md:basis-5/6 lg:basis-1/3">
              {posts.length > 3 ? (
                posts
                  .slice(1, 3)
                  .map((post) => (
                    <RelatedCard
                      key={post._id}
                      post={post}
                      cat={cat}
                      isRight={true}
                      isPriority={true}
                    />
                  ))
              ) : (
                <MostRead />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GridNews;
