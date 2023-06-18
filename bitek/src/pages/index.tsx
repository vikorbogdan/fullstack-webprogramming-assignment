import { type NextPage } from "next";
import Image from "next/image";
import { api } from "~/utils/api";
import PlaceholderImg from "~/assets/img/placeholder.png";
import Link from "next/link";

const Home: NextPage = () => {
  const { data: articlesData } = api.article.getAll.useQuery();
  const { data: featuredArticleData } = api.article.getFeatured.useQuery();
  if (!articlesData) return null;

  const featuredArticle = featuredArticleData;
  return (
    <div className="w-screen p-5">
      <div className="flex w-full flex-row gap-5">
        <div className="relative aspect-video w-1/2">
          <Image
            fill
            style={{ objectFit: "cover" }}
            className="block w-full border-[1px] border-black"
            alt="placeholder"
            src={featuredArticle?.image ?? PlaceholderImg}
          />
        </div>
        <div className="w-1/2">
          <div className="text-3xl font-bold">{featuredArticle?.title}</div>
          <Link
            href={`articles/${featuredArticle?.slug ?? ""}`}
            className="text-xl"
          >
            {featuredArticle?.summary}
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {articlesData?.map((article) => (
          <div key={article.id}>
            <h1>{article.title}</h1>
            <p>{article.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
