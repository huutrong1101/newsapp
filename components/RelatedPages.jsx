import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SvgArrowRight } from "./svgs/SvgArrowRight";
import RelatedCardAlt from "./RelatedCardAlt";
import { publicRequest } from "../requestMethods";
import { useTheme } from "next-themes";

const RelatedPages = ({ postData }) => {
  const [posts, setPosts] = useState([]);
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const _ = require("lodash");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await publicRequest.get("/posts");
        setPosts(res.data.posts);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, []);

  let title = "";

  if (postData.categories == undefined) {
    title = "/articles";
  } else {
    title = "/articles/categories/" + postData.categories[0];
  }

  return (
    <section className="relatedPages">
      <div className="wrapper">
        <div className="relatedPages__heading dark:after:bg-blue-700">
          <h2 className="relatedPages__mainTitle dark:text-slate-200">
            Tin tức liên quan
          </h2>
          <div className="btnContainer">
            <Link href={title} className="cta cta01 m-01 dark:!text-slate-100">
              <span>Xem tất cả</span>{" "}
              <SvgArrowRight
                color={currentTheme === "dark" ? "#ffffff" : "#0f2f7f"}
              />
            </Link>
          </div>
        </div>
        <div className="relatedPages__container">
          {posts
            .filter((post) => !_.isEqual(post, postData))
            .filter((post) => _.isEqual(post.categories, postData.categories))
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map((post) => (
              <RelatedCardAlt key={post._id} post={post} />
            ))}
          <div className="btnContainer">
            <Link
              href="/articles"
              className="cta cta01 m-01 dark:!text-slate-100"
            >
              <span>Xem tất cả</span>{" "}
              <SvgArrowRight
                color={currentTheme === "dark" ? "#ffffff" : "#0f2f7f"}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedPages;
