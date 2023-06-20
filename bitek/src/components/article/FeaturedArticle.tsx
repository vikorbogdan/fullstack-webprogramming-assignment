import type { Article } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import PlaceholderImg from "~/assets/img/placeholder.png";

type FeaturedArticleProps = {
  featuredArticle: Article;
};

const FeaturedArticle: React.FC<FeaturedArticleProps> = ({
  featuredArticle,
}) => {
  if (featuredArticle === null) return null;
  return (
    <div className="flex w-full flex-row gap-5">
      <div className="relative aspect-video w-1/2">
        <Image
          fill
          style={{ objectFit: "cover" }}
          className="block w-full border-[1px] border-black"
          alt="placeholder"
          src={featuredArticle.image ?? PlaceholderImg}
        />
      </div>
      <div className="w-1/2">
        <div className="text-3xl font-bold">{featuredArticle?.title}</div>
        <Link href={`article/${featuredArticle.slug}`} className="text-xl">
          {featuredArticle?.summary}
        </Link>
      </div>
    </div>
  );
};

export default FeaturedArticle;
