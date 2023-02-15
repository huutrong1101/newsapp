import React from "react";
import Link from "next/link";
import { SvgLogo } from "./svgs/SvgLogo";
import { SvgFaceBook } from "./svgs/SvgFaceBook";
import { SvgYoutube } from "./svgs/SvgYoutube";
import { SvgInstagram } from "./svgs/SvgInstagram";

const Footer = () => {
  return (
    <footer className="footer dark:border-t dark:border-slate-200/10 dark:bg-gray-900 dark:before:bg-none dark:after:bg-none">
      <div className="wrapper">
        <div className="footer__top">
          <div className="footer__links anime">
            <div className="footer__logo">
              <SvgLogo />
            </div>
            <div className="footer__icons anime">
              <Link
                href="https://www.facebook.com/huutrong1101/"
                target="_blank"
                className="footer__icon"
              >
                <SvgFaceBook />
              </Link>
              <Link
                href="https://www.youtube.com/channel/UCogdXndjKGUCSi7hvJhKg6A"
                target="_blank"
                className="footer__icon"
              >
                <SvgYoutube />
              </Link>
              <Link
                href="https://www.instagram.com/huutrong__11/"
                target="_blank"
                className="footer__icon"
              >
                <SvgInstagram />
              </Link>
            </div>
          </div>
          <div className="footer__links anime">
            <p className="footer__desc anime">Name: Nguyễn Hữu Trọng</p>
            <p className="footer__desc anime">Email: huutrong1101@gmail.com</p>
            <p className="footer__desc anime">Hotline: 0773696410</p>
          </div>
          <div className="footer__links anime">
            <Link href="/" className="footer__link anime">
              Câu hỏi thường gặp
            </Link>
            <Link href="/" className="footer__link anime">
              Tin tức
            </Link>
            <Link href="/" className="footer__link anime">
              Chính sách & bảo mật
            </Link>
          </div>
        </div>
        <div className="footer__bottom border-t border-slate-200/10 pt-6">
          <p className="footer__text">© Logo. Đã đăng ký Bản quyền</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
