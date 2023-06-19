import { useRouter } from "next/router";
import React from "react";
import ArticleList from "~/components/article/ArticleList";
import { api } from "~/utils/api";

const CategoryPage = () => {
  const router = useRouter();
  const categorySlug = router.query.slug as string;
  const { data: categoryData } = api.category.getCategoryBySlug.useQuery({
    slug: categorySlug,
  });
  const { data: articlesData } =
    api.article.getArticlesByCategorySlug.useQuery(categorySlug);
  console.log(articlesData);
  if (!articlesData || articlesData.length === 0)
    return (
      <div className="cursor-default text-center">
        <h1 className="text-5xl font-medium transition-transform hover:scale-105">
          Üres kategória
        </h1>
        <h2>Ehhez a kategóriához még nem tartozik cikk.</h2>
      </div>
    );
  return (
    <div>
      <ArticleList
        articlesData={articlesData}
        paginate={true}
        paginationItemCount={10}
      />
    </div>
  );
};

export default CategoryPage;
