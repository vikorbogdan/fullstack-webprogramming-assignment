import type { Article } from "@prisma/client";
import moment from "moment";
import Image from "next/image";
import PlaceholderImg from "~/assets/img/placeholder.png";
type ArticleListItemProps = {
  article: Article;
};

const ArticleListItem: React.FC<ArticleListItemProps> = ({ article }) => {
  return (
    //TODO: add link to article
    <div className="h-56 w-1/6" key={article.id}>
      <div className="relative aspect-video h-1/2 w-full">
        <Image
          fill
          style={{ objectFit: "cover" }}
          className="block w-full border-[1px] border-black"
          alt="placeholder"
          src={article.image ?? PlaceholderImg}
        />
      </div>
      <h1 className="truncate text-xl font-medium">{article.title}</h1>
      <h2 className="text-sm font-light">
        {/* use moment js to display user friendly date */}
        {moment(article.createdAt).fromNow()}
      </h2>
      <p className="h-full truncate">{article.summary}</p>
    </div>
  );
};

export default ArticleListItem;
