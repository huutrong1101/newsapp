import React from "react";
import Link from "next/link";

const NextEvents = () => {
  return (
    <div className="nextEvents">
      <div className="nextEvents__wrapper">
        <div className="nextEvents__heading">
          <h3 className="nextEvents__mainTitle dark:after:bg-blue-600">
            Sự kiện tiếp theo
          </h3>
        </div>
        <div className="nextEvents__list">
          <div className="nextEvents__listItem dark:border-b dark:border-slate-600">
            <div className="nextEvents__content">
              <div className="nextEvents__info hover:text-blue-900 dark:hover:text-blue-400">
                <Link href="/slug">
                  <h3 className="nextEvents__title">
                    Khám phá các thiết kế slide bằng Figma
                  </h3>
                  <p className="nextEvents__description">
                    Far far away, behind the world mountains, far from the
                    countries
                  </p>
                </Link>
              </div>
              <p className="nextEvents__dateRange dark:text-blue-400">
                22 - 27 tháng 3
              </p>
            </div>
          </div>
          <div className="nextEvents__listItem dark:border-b dark:border-slate-600">
            <div className="nextEvents__content">
              <div className="nextEvents__info hover:text-blue-900 dark:hover:text-blue-400">
                <Link href="/slug">
                  <h3 className="nextEvents__title">
                    Tìm hiểu các mẫu thiết kế từ việc dùng thử ứng dụng
                  </h3>
                  <p className="nextEvents__description">
                    Far far away, behind the world mountains, far from the
                    countries
                  </p>
                </Link>
              </div>
              <p className="nextEvents__dateRange dark:text-blue-400">
                24 - 27 tháng 3
              </p>
            </div>
          </div>
          <div className="nextEvents__listItem dark:border-b dark:border-slate-600">
            <div className="nextEvents__content">
              <div className="nextEvents__info hover:text-blue-900 dark:hover:text-blue-400">
                <Link href="/slug">
                  <h3 className="nextEvents__title">
                    Cách học nhanh thiết kế trang đích
                  </h3>
                  <p className="nextEvents__description">
                    Far far away, behind the world mountains, far from the
                    countries
                  </p>
                </Link>
              </div>
              <p className="nextEvents__dateRange dark:text-blue-400">
                26 - 27 tháng 3
              </p>
            </div>
          </div>
          <div className="nextEvents__listItem dark:border-b dark:border-slate-600">
            <div className="nextEvents__content">
              <div className="nextEvents__info hover:text-blue-900 dark:hover:text-blue-400">
                <Link href="/slug">
                  <h3 className="nextEvents__title">
                    Các bước tạo Trang tổng quan đáp ứng
                  </h3>
                  <p className="nextEvents__description">
                    Far far away, behind the world mountains, far from the
                    countries
                  </p>
                </Link>
              </div>
              <p className="nextEvents__dateRange dark:text-blue-400">
                28 - 27 tháng 3
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextEvents;
