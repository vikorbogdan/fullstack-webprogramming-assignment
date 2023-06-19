import { type NextPage } from "next";
import Image from "next/image";
import { api } from "~/utils/api";
import PlaceholderImg from "~/assets/img/placeholder.png";
import Link from "next/link";
import moment from "moment";
import ArticleListItem from "~/components/article/articleListItem";
import FeaturedArticle from "~/components/article/FeaturedArticle";
import ArticleList from "~/components/article/ArticleList";

const Home: NextPage = () => {
  const { data: articlesData } = api.article.getAllByDate.useQuery("desc");
  const { data: featuredArticleData } = api.article.getFeatured.useQuery();
  if (!articlesData) return null;

  const featuredArticle = featuredArticleData;
  return (
    <div className="flex w-screen flex-col gap-5 p-5">
      {featuredArticle && <FeaturedArticle featuredArticle={featuredArticle} />}
      <ArticleList
        articlesData={articlesData}
        paginate={true}
        paginationItemCount={10}
      />
    </div>
  );
};

export default Home;
