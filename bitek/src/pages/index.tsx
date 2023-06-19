import { type NextPage } from "next";
import { api } from "~/utils/api";
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
