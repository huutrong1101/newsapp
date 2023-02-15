import React from "react";
import Link from "next/link";

const TagCardAlt = ({ post }) => {
  return (
    <div>
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
              className="inline-flex items-center uppercase tracking-[0.1px] text-blue-900 transition-opacity duration-200 ease-in hover:opacity-60 dark:text-blue-400 [&:nth-last-child(2)]:hidden"
            >
              <span className="pt-[3px] text-sm font-bold leading-none">
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
              className="inline-flex items-center uppercase tracking-[0.1px] text-blue-900 transition-opacity duration-200 ease-in hover:opacity-60 dark:text-blue-400 [&:nth-last-child(2)]:hidden"
            >
              <span className="pt-[3px] text-sm font-bold leading-none">
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
  );
};

export default TagCardAlt;
