import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import Loading from "../../components/Loading";
import GridNews from "../../components/GridNews";
import ContentList from "../../components/ContentList";
import AdvertisementHorizontal from "../../components/AdvertisementHorizontal";
import EmptyResults from "../../components/EmptyResults";
import { domainApi } from "../../requestMethods";

const Articles = () => {
  const { query } = useRouter();
  const cat = query.slug && query.slug[1];
  const subCat = query.slug && query.slug[2];
  const page = query.page || 1;
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    subCat
      ? `${domainApi}/posts?cat=${subCat}&page=${page}&num_results_on_page=10`
      : cat
      ? `${domainApi}/posts?cat=${cat}&page=${page}&num_results_on_page=10`
      : query.q
      ? `${domainApi}/posts/?q=${query.q}&page=${page}&num_results_on_page=10`
      : `${domainApi}/posts?page=${page}&num_results_on_page=10`,
    fetcher
  );
  if (error) return <div className="error">Failed to load</div>;
  if (!data) return <Loading />;

  console.log(data.posts.reverse());

  return (
    <>
      <Head>
        <title>
          {[
            cat === "economy"
              ? "Kinh tế"
              : cat === "innovation"
              ? "Sự đổi mới"
              : cat === "tourism"
              ? "Du lịch"
              : cat === "culture"
              ? "Văn hoá"
              : cat === "politics"
              ? "Chính trị"
              : cat === "society"
              ? "Xã hội"
              : cat === "civil-protection"
              ? "Bảo vệ công dân"
              : cat === "education"
              ? "Giáo dục"
              : cat === "housing"
              ? "Nhà ở"
              : cat === "urban-planning"
              ? "Quy hoạch đô thị"
              : cat === "mobility"
              ? "Tính di động"
              : cat === "environment"
              ? "Môi trường"
              : cat === "sports"
              ? "Thể thao"
              : null,
          ]}{" "}
          {subCat &&
            `/ ${[
              subCat === "innovation"
                ? "Sự đổi mới"
                : subCat === "tourism"
                ? "Du lịch"
                : subCat === "civil-protection"
                ? "Bảo vệ công dân"
                : subCat === "education"
                ? "Giáo dục"
                : subCat === "housing"
                ? "Nhà ở"
                : subCat === "urban-planning"
                ? "Quy hoạch đô thị"
                : null,
            ]}`}{" "}
          | Nguyễn Hữu Trọng
        </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {data.posts.length > 0 ? (
        <>
          <GridNews
            posts={data.posts}
            cat={cat}
            subCat={subCat}
            articles={true}
            page={data.page}
          />
          <ContentList
            posts={data.posts}
            totalPages={data.total_pages}
            page={data.page}
          />
          <AdvertisementHorizontal
            photo="https://res.cloudinary.com/tachibao/image/upload/v1666541043/posts/52432241465_5c8ed1ad36_k_gha4mz_aq2csh.jpg"
            blurhash="LWF~:ss:?bbaWCj[aya{~pWBM{jZ"
            alt="alt"
          />
        </>
      ) : (
        <EmptyResults />
      )}
    </>
  );
};

export default Articles;