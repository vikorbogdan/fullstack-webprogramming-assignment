import Image from "next/image";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

const ArticlePage = () => {
  const router = useRouter();
  const articleSlug = router.query.slug as string;
  const { data: articleData } =
    api.article.getArticleBySlug.useQuery(articleSlug);
  return (
    <div className="flex flex-col items-center gap-16 p-5">
      {/* Add header image */}
      <Image src={articleData?.image ?? ""} alt={""} width={500} height={300} />
      <h1 className="text-5xl">{articleData?.title}</h1>
      <h3 className="text-2xl">{articleData?.summary}</h3>
      <p className="text-lg">{articleData?.body}</p>
    </div>
  );
};

export default ArticlePage;
