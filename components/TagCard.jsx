import Link from "next/link";
import React from "react";

const TagCard = ({ cat, post }) => {
  return (
    <>
      {cat !== undefined ? (
        <div></div>
      ) : (
        <div className="z-40">
          {/* Xác định đường dẫn nếu có subCategory, dùng css để ẩn 1 item c */}
          {post.categories.map((c, index) => {
            let cat;
            if (c === "innovation" || c === "tourism") {
              cat = "economy";
            } else if (
              c === "civil-protection" ||
              c === "education" ||
              c === "housing" ||
              c === "urban-planning"
            ) {
              cat = "society";
            } else {
              cat = null;
            }
            if (cat) {
              return (
                <Link
                  key={index}
                  href={`/articles/category/${cat}/${c}`}
                  className="inline-flex h-[22px] items-center rounded-sm bg-blue-900 py-[3px] px-2 uppercase text-white shadow-sm shadow-black/10 transition-colors duration-200 ease-linear hover:bg-blue-600 [&:nth-last-child(2)]:hidden"
                >
                  <span className="pt-[2px] text-[13px] font-bold">
                    {[
                      c === "economy"
                        ? "Kinh tế"
                        : c === "innovation"
                        ? "Sự đổi mới"
                        : c === "tourism"
                        ? "Du lịch"
                        : c === "culture"
                        ? "Văn hoá"
                        : c === "politics"
                        ? "Chính trị"
                        : c === "society"
                        ? "Xã hội"
                        : c === "civil-protection"
                        ? "Bảo vệ công dân"
                        : c === "education"
                        ? "Giáo dục"
                        : c === "housing"
                        ? "Nhà ở"
                        : c === "urban-planning"
                        ? "Quy hoạch đô thị"
                        : c === "mobility"
                        ? "Tính di động"
                        : c === "environment"
                        ? "Môi trường"
                        : c === "sports"
                        ? "Thể thao"
                        : null,
                    ]}
                  </span>
                </Link>
              );
            } else {
              return (
                <Link
                  key={index}
                  href={`/articles/category/${c}`}
                  className="inline-flex h-[22px] items-center rounded-sm bg-blue-900 py-[3px] px-2 uppercase text-white shadow-sm shadow-black/10 transition-colors duration-200 ease-linear hover:bg-blue-600 [&:nth-last-child(2)]:hidden"
                >
                  <span className="pt-[2px] text-[13px] font-bold">
                    {[
                      c === "economy"
                        ? "Kinh tế"
                        : c === "culture"
                        ? "Văn hoá"
                        : c === "politics"
                        ? "Chính trị"
                        : c === "society"
                        ? "Xã hội"
                        : c === "mobility"
                        ? "Tính di động"
                        : c === "environment"
                        ? "Môi trường"
                        : c === "sports"
                        ? "Thể thao"
                        : null,
                    ]}
                  </span>
                </Link>
              );
            }
          })}
        </div>
      )}
    </>
  );
};

export default TagCard;
