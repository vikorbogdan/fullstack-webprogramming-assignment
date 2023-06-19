import { Article } from "@prisma/client";
import ArticleListItem from "./articleListItem";
import { useState } from "react";
import Paginate from "./Paginate";

type ArticleListProps =
  | {
      articlesData: Article[];
      paginate: true;
      paginationItemCount: number;
    }
  | {
      articlesData: Article[];
      paginate: false;
      paginationItemCount?: never;
    };
const ArticleList: React.FC<ArticleListProps> = ({
  articlesData,
  paginate,
  paginationItemCount,
}) => {
  if (paginate) {
    return (
      <Paginate
        className="flex w-full flex-wrap gap-5"
        itemsPerPage={paginationItemCount}
      >
        {articlesData?.map((article) => (
          <ArticleListItem key={article.id} article={article} />
        ))}
      </Paginate>
    );
  } else {
    return (
      <div className="flex w-full flex-wrap gap-5">
        {articlesData?.map((article) => (
          <ArticleListItem key={article.id} article={article} />
        ))}
      </div>
    );
  }
};

export default ArticleList;