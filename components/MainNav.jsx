import React, { useState } from "react";
import Link from "next/link";
import { SvgSearch } from "./svgs/SvgSearch";
import { SvgLogo } from "./svgs/SvgLogo";
import { SvgMenu } from "./svgs/SvgMenu";
import ImgDefault from "../assets/images/img_default.jpg";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import Image from "next/image";
import ActiveLink from "./ActiveLink";
import ThemeToggler from "./ThemeToggler";

const MainNav = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const [keyword, setKeyword] = useState();
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(
      `/search?q=${keyword.trim().toLowerCase().replace(/\s/g, "+")}`
    );
  };

  return (
    <nav className="pb-[89px] md:pb-[106px]">
      <div className="fixed top-0 left-0 z-50 w-full">
        {/* Top Bar */}
        <section className="bg-blue-900 dark:bg-gray-900/75 dark:backdrop-blur-md">
          <div className="mx-auto flex h-[47px] max-w-[90rem] items-center justify-between px-4 pt-4 pb-[7px] md:h-16 md:px-8 md:pt-[15px] md:pb-[14px]">
            <div className="flex items-center text-white">
              <Link
                href="/"
                scroll={false}
                className="md:mr-9 md:px-[6px] md:py-[5px]"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <SvgLogo className="w-16 sm:w-[72px]" />
              </Link>
              <ActiveLink activeClassName="opacity-[0.65]" href="/">
                <a className="mr-[7px] hidden cursor-pointer px-2 pt-[10px] pb-[6px] text-center text-base font-[500] text-white transition-opacity duration-200 ease-linear last:mr-0 hover:opacity-[0.65] dark:text-slate-200 lg:mr-[14px] lg:flex">
                  Trang chủ
                </a>
              </ActiveLink>
              <ActiveLink activeClassName="opacity-[0.65]" href="/intro">
                <a className="mr-[7px] hidden cursor-pointer px-2 pt-[10px] pb-[6px] text-center text-base font-[500] text-white transition-opacity duration-200 ease-linear last:mr-0 hover:opacity-[0.65] dark:text-slate-200 lg:mr-[14px] lg:flex">
                  Giới thiệu
                </a>
              </ActiveLink>
              <ActiveLink activeClassName="opacity-[0.65]" href="/contacts">
                <a className="mr-[7px] hidden cursor-pointer px-2 pt-[10px] pb-[6px] text-center text-base font-[500] text-white transition-opacity duration-200 ease-linear last:mr-0 hover:opacity-[0.65] dark:text-slate-200 lg:mr-[14px] lg:flex">
                  Liên hệ
                </a>
              </ActiveLink>
              <ActiveLink activeClassName="opacity-[0.65]" href="/write">
                <a className="mr-[7px] hidden cursor-pointer px-2 pt-[10px] pb-[6px] text-center text-base font-[500] text-white transition-opacity duration-200 ease-linear last:mr-0 hover:opacity-[0.65] dark:text-slate-200 lg:mr-[14px] lg:flex">
                  Viết bài
                </a>
              </ActiveLink>
              {currentUser && (
                <div
                  className="mr-[7px] hidden cursor-pointer px-2 pt-[10px] pb-[6px] text-center text-base font-[500] text-white transition-opacity duration-200 ease-linear last:mr-0 hover:opacity-[0.65] dark:text-slate-200 lg:mr-[14px] lg:flex"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </div>
              )}
            </div>
            <div className="flex items-center">
              <form onSubmit={handleSubmit}>
                <div className="relative mr-6 hidden w-[224px] items-center sm:flex xl:w-[288px]">
                  <span className="absolute left-2 h-6 w-6">
                    <SvgSearch />
                  </span>
                  <input
                    type="search"
                    className="h-8 w-full rounded-sm border border-transparent bg-white/20 py-[7px] pr-2 pl-10 text-white placeholder:text-white/60 focus:border-white"
                    placeholder="Tìm kiếm"
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </div>
              </form>
              <ThemeToggler />
              {currentUser ? (
                <Link
                  href="/settings"
                  className="relative mx-2 h-8 w-8 overflow-hidden rounded-full transition-opacity duration-200 ease-linear hover:opacity-60 sm:ml-4"
                >
                  <Image
                    className="h-full w-full object-cover"
                    src={
                      currentUser.profilePic
                        ? currentUser.profilePic
                        : ImgDefault
                    }
                    alt=""
                    width={32}
                    height={32}
                  />
                </Link>
              ) : (
                <div className="flex items-center text-white">
                  <Link
                    href="/login"
                    className="flex cursor-pointer px-2 pt-[10px] pb-[6px] text-center text-base font-[500] transition-opacity duration-200 ease-linear hover:opacity-[0.65] md:pl-5"
                  >
                    Đăng nhập
                  </Link>
                  <span className="pt-1">/</span>
                  <Link
                    href="/register"
                    className="flex cursor-pointer px-2 pt-[10px] pb-[6px] text-center text-base font-[500] transition-opacity duration-200 ease-linear hover:opacity-[0.65]"
                  >
                    Đăng ký
                  </Link>
                </div>
              )}
              <div className="-mr-1 ml-[6px] flex h-6 w-6 lg:hidden">
                <SvgMenu />
              </div>
            </div>
          </div>
          {/* Top BarMobile */}
          <div className="flex lg:hidden">
            <div className="flex h-[42px] w-full justify-between px-[15px] pt-[7px] pb-[11px] sm:justify-center">
              {!currentUser && (
                <ActiveLink activeClassName="opacity-[0.65]" href="/">
                  <a className="mr-0 flex cursor-pointer items-center text-center text-sm font-bold text-white transition-opacity duration-200 ease-linear last:mr-0 hover:opacity-[0.65] sm:mr-7">
                    Trang chủ
                  </a>
                </ActiveLink>
              )}
              <ActiveLink activeClassName="opacity-[0.65]" href="/intro">
                <a className="mr-0 flex cursor-pointer items-center text-center text-sm font-bold text-white transition-opacity duration-200 ease-linear last:mr-0 hover:opacity-[0.65] sm:mr-7">
                  Giới thiệu
                </a>
              </ActiveLink>
              <ActiveLink activeClassName="opacity-[0.65]" href="/contacts">
                <a className="mr-0 flex cursor-pointer items-center text-center text-sm font-bold text-white transition-opacity duration-200 ease-linear last:mr-0 hover:opacity-[0.65] sm:mr-7">
                  Liên hệ
                </a>
              </ActiveLink>
              <ActiveLink activeClassName="opacity-[0.65]" href="/write">
                <a className="mr-0 flex cursor-pointer items-center text-center text-sm font-bold text-white transition-opacity duration-200 ease-linear last:mr-0 hover:opacity-[0.65] sm:mr-7">
                  Viết bài
                </a>
              </ActiveLink>
              {currentUser && (
                <div
                  className="mr-0 flex cursor-pointer items-center text-center text-sm font-bold text-white transition-opacity duration-200 ease-linear last:mr-0 hover:opacity-[0.65] sm:mr-7"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </div>
              )}
            </div>
          </div>
        </section>
        {/* Menu Bar */}
        <section>
          <ul className="hidden w-full items-center justify-center border-b border-black/[0.16] bg-[#eceff5] shadow-[0px_2px_8px_0px] shadow-black/[0.04] dark:border-t dark:border-slate-200/10 dark:bg-gray-900/75 dark:backdrop-blur-md lg:flex">
            <li className="group relative mr-2 last:mr-0 lg:mr-4">
              <ActiveLink
                activeClassName="before:!opacity-100"
                href="/articles/category/economy"
              >
                <a
                  className={
                    router.asPath === "/articles/category/economy/innovation" ||
                    router.asPath === "/articles/category/economy/tourism"
                      ? "relative inline-block px-2 pt-4 pb-[11px] text-sm font-extrabold uppercase leading-none text-blue-900 before:pointer-events-none before:absolute before:left-1/2 before:bottom-0 before:h-1 before:w-[calc(100%-16px)] before:-translate-x-1/2 before:bg-blue-900 before:opacity-100 before:transition-opacity before:duration-200 before:ease-linear dark:text-blue-500 dark:before:bg-blue-500"
                      : "relative inline-block px-2 pt-4 pb-[11px] text-sm font-extrabold uppercase leading-none text-blue-900 before:pointer-events-none before:absolute before:left-1/2 before:bottom-0 before:h-1 before:w-[calc(100%-16px)] before:-translate-x-1/2 before:bg-blue-900 before:opacity-0 before:transition-opacity before:duration-200 before:ease-linear group-hover:before:opacity-100 dark:text-blue-500 dark:before:bg-blue-500"
                  }
                >
                  Kinh tế
                </a>
              </ActiveLink>
              <div className="invisible absolute top-[calc(100%+1px)] left-[7px] z-10 m-0 flex min-w-[180px] flex-col rounded bg-white py-[18px] px-0 opacity-0 shadow-[0px_5px_8px_0px] shadow-black/[0.08] transition-opacity duration-200 ease-linear group-hover:visible group-hover:opacity-100">
                <ActiveLink
                  activeClassName="bg-[#eceff5] text-blue-900"
                  href="/articles/category/economy/innovation"
                >
                  <a className="block px-[25px] pt-[9px] pb-[5px] text-base font-bold text-black transition-colors duration-200 ease-linear hover:bg-[#eceff5] hover:text-blue-900">
                    Sự đổi mới
                  </a>
                </ActiveLink>
                <ActiveLink
                  activeClassName="bg-[#eceff5] text-blue-900"
                  href="/articles/category/economy/tourism"
                >
                  <a className="block px-[25px] pt-[9px] pb-[5px] text-base font-bold text-black transition-colors duration-200 ease-linear hover:bg-[#eceff5] hover:text-blue-900">
                    Du lịch
                  </a>
                </ActiveLink>
              </div>
            </li>
            <li className="group relative mr-2 last:mr-0 lg:mr-4">
              <ActiveLink
                activeClassName="before:!opacity-100"
                href="/articles/category/culture"
              >
                <a className="relative inline-block px-2 pt-4 pb-[11px] text-sm font-extrabold uppercase leading-none text-blue-900 before:pointer-events-none before:absolute before:left-1/2 before:bottom-0 before:h-1 before:w-[calc(100%-16px)] before:-translate-x-1/2 before:bg-blue-900 before:opacity-0 before:transition-opacity before:duration-200 before:ease-linear group-hover:before:opacity-100 dark:text-blue-500 dark:before:bg-blue-500">
                  Văn hoá
                </a>
              </ActiveLink>
            </li>
            <li className="group relative mr-2 last:mr-0 lg:mr-4">
              <ActiveLink
                activeClassName="before:!opacity-100"
                href="/articles/category/politics"
              >
                <a className="relative inline-block px-2 pt-4 pb-[11px] text-sm font-extrabold uppercase leading-none text-blue-900 before:pointer-events-none before:absolute before:left-1/2 before:bottom-0 before:h-1 before:w-[calc(100%-16px)] before:-translate-x-1/2 before:bg-blue-900 before:opacity-0 before:transition-opacity before:duration-200 before:ease-linear group-hover:before:opacity-100 dark:text-blue-500 dark:before:bg-blue-500">
                  Chính trị
                </a>
              </ActiveLink>
            </li>
            <li className="group relative mr-2 last:mr-0 lg:mr-4">
              <ActiveLink
                activeClassName="before:!opacity-100"
                href="/articles/category/society"
              >
                <a
                  className={
                    router.asPath ===
                      "/articles/category/society/civil-protection" ||
                    router.asPath === "/articles/category/society/education" ||
                    router.asPath === "/articles/category/society/housing" ||
                    router.asPath ===
                      "/articles/category/society/urban-planning"
                      ? "relative inline-block px-2 pt-4 pb-[11px] text-sm font-extrabold uppercase leading-none text-blue-900 before:pointer-events-none before:absolute before:left-1/2 before:bottom-0 before:h-1 before:w-[calc(100%-16px)] before:-translate-x-1/2 before:bg-blue-900 before:opacity-100 before:transition-opacity before:duration-200 before:ease-linear dark:text-blue-500 dark:before:bg-blue-500"
                      : "relative inline-block px-2 pt-4 pb-[11px] text-sm font-extrabold uppercase leading-none text-blue-900 before:pointer-events-none before:absolute before:left-1/2 before:bottom-0 before:h-1 before:w-[calc(100%-16px)] before:-translate-x-1/2 before:bg-blue-900 before:opacity-0 before:transition-opacity before:duration-200 before:ease-linear group-hover:before:opacity-100 dark:text-blue-500 dark:before:bg-blue-500"
                  }
                >
                  Xã hội
                </a>
              </ActiveLink>
              <div className="invisible absolute top-[calc(100%+1px)] left-[7px] z-10 m-0 flex min-w-[180px] flex-col rounded bg-white py-[18px] px-0 opacity-0 shadow-[0px_5px_8px_0px] shadow-black/[0.08] transition-opacity duration-200 ease-linear group-hover:visible group-hover:opacity-100">
                <ActiveLink
                  activeClassName="bg-[#eceff5] text-blue-900"
                  href="/articles/category/society/civil-protection"
                >
                  <a className="block px-[25px] pt-[9px] pb-[5px] text-base font-bold text-black transition-colors duration-200 ease-linear hover:bg-[#eceff5] hover:text-blue-900">
                    Bảo vệ công dân
                  </a>
                </ActiveLink>
                <ActiveLink
                  activeClassName="bg-[#eceff5] text-blue-900"
                  href="/articles/category/society/education"
                >
                  <a className="block px-[25px] pt-[9px] pb-[5px] text-base font-bold text-black transition-colors duration-200 ease-linear hover:bg-[#eceff5] hover:text-blue-900">
                    Giáo dục
                  </a>
                </ActiveLink>
                <ActiveLink
                  activeClassName="bg-[#eceff5] text-blue-900"
                  href="/articles/category/society/housing"
                >
                  <a className="block px-[25px] pt-[9px] pb-[5px] text-base font-bold text-black transition-colors duration-200 ease-linear hover:bg-[#eceff5] hover:text-blue-900">
                    Nhà ở
                  </a>
                </ActiveLink>
                <ActiveLink
                  activeClassName="bg-[#eceff5] text-blue-900"
                  href="/articles/category/society/urban-planning"
                >
                  <a className="block px-[25px] pt-[9px] pb-[5px] text-base font-bold text-black transition-colors duration-200 ease-linear hover:bg-[#eceff5] hover:text-blue-900">
                    Quy hoạch đô thị
                  </a>
                </ActiveLink>
              </div>
            </li>
            <li className="group relative mr-2 last:mr-0 lg:mr-4">
              <ActiveLink
                activeClassName="before:!opacity-100"
                href="/articles/category/mobility"
              >
                <a className="relative inline-block px-2 pt-4 pb-[11px] text-sm font-extrabold uppercase leading-none text-blue-900 before:pointer-events-none before:absolute before:left-1/2 before:bottom-0 before:h-1 before:w-[calc(100%-16px)] before:-translate-x-1/2 before:bg-blue-900 before:opacity-0 before:transition-opacity before:duration-200 before:ease-linear group-hover:before:opacity-100 dark:text-blue-500 dark:before:bg-blue-500">
                  Tính di động
                </a>
              </ActiveLink>
            </li>
            <li className="group relative mr-2 last:mr-0 lg:mr-4">
              <ActiveLink
                activeClassName="before:!opacity-100"
                href="/articles/category/environment"
              >
                <a className="relative inline-block px-2 pt-4 pb-[11px] text-sm font-extrabold uppercase leading-none text-blue-900 before:pointer-events-none before:absolute before:left-1/2 before:bottom-0 before:h-1 before:w-[calc(100%-16px)] before:-translate-x-1/2 before:bg-blue-900 before:opacity-0 before:transition-opacity before:duration-200 before:ease-linear group-hover:before:opacity-100 dark:text-blue-500 dark:before:bg-blue-500">
                  Môi trường
                </a>
              </ActiveLink>
            </li>
            <li className="group relative mr-2 last:mr-0 lg:mr-4">
              <ActiveLink
                activeClassName="before:!opacity-100"
                href="/articles/category/sports"
              >
                <a className="relative inline-block px-2 pt-4 pb-[11px] text-sm font-extrabold uppercase leading-none text-blue-900 before:pointer-events-none before:absolute before:left-1/2 before:bottom-0 before:h-1 before:w-[calc(100%-16px)] before:-translate-x-1/2 before:bg-blue-900 before:opacity-0 before:transition-opacity before:duration-200 before:ease-linear group-hover:before:opacity-100 dark:text-blue-500 dark:before:bg-blue-500">
                  Thể thao
                </a>
              </ActiveLink>
            </li>
          </ul>
        </section>
      </div>
    </nav>
  );
};

export default MainNav;
