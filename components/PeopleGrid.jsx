import React from "react";
import LazyLoadImage from "./LazyLoadImage";

const PeopleGrid = () => {
  return (
    <section className="peopleGrid neu-01 line" data-items="3">
      <div className="wrapper">
        <div className="peopleGrid__heading">
          <h2 className="peopleGrid__title dark:text-slate-200">
            <span>Giới thiệu trang web</span>
          </h2>
        </div>
        <div>
          <p style={{ textIndent: "25px", marginTop: "20px" }}>
            Chào mừng đến với trang web tin tức của chúng tôi! Đây là nơi cung
            cấp cho bạn những tin tức mới nhất về các lĩnh vực như xã hội, kinh
            tế, thế giới, giải trí, và nhiều hơn thế nữa. Chúng tôi biết rằng
            việc cập nhật thông tin mới nhất là quan trọng đối với bạn, vì vậy
            chúng tôi cam kết cung cấp cho bạn những tin tức đáng tin cậy và
            chính xác nhất.
          </p>
          <p style={{ textIndent: "25px", marginTop: "20px" }}>
            Trang web của chúng tôi được cập nhật hàng ngày với những tin tức
            mới nhất từ các nguồn tin uy tín. Chúng tôi cũng cung cấp cho bạn
            những bài viết chuyên sâu về các chủ đề nổi bật, giúp bạn hiểu rõ
            hơn về các vấn đề đang xảy ra trên thế giới.
          </p>
          <p style={{ textIndent: "25px", marginTop: "20px" }}>
            Hãy theo dõi trang web của chúng tôi để cập nhật những tin tức mới
            nhất mỗi ngày và giữ cho bản thân mình luôn được cập nhật về những
            xảy ra trên thế giới. Chúng tôi hy vọng trang web của chúng tôi sẽ
            trở thành nơi thường xuyên bạn truy cập để cập nhật những tin tứ
          </p>
        </div>
      </div>
    </section>
  );
};

export default PeopleGrid;
