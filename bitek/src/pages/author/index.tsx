import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import RemoveArticleDialog from "~/components/dialog/RemoveArticleDialog";
import { useSelf } from "~/hooks/useSelf";
import { api } from "~/utils/api";

const EditorHomePage = () => {
  const self = useSelf();

  const { data: articlesData } = api.article.getArticlesByUserId.useQuery(
    self.data?.id ?? ""
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [articleId, setArticleId] = useState<string | null>(null);

  const sessionData = useSession();
  const handleDelete = (id: string) => {
    setDeleteDialogOpen(true);
    setArticleId(id);
  };
  if (!sessionData || self.accountType !== "editor") return null;
  return (
    <>
      <RemoveArticleDialog
        setArticleId={setArticleId}
        articleId={articleId}
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
      />
      <div className="mt-5 flex w-screen flex-col items-center gap-5 px-10">
        <div className="flex w-full flex-row items-center justify-between">
          <h1 className="text-5xl font-light">
            Üdvözöllek, {self.data?.name}!
          </h1>
          <Link
            href={"author/new"}
            className="block w-56 cursor-pointer items-center justify-center border-[1px] border-black bg-lime-500 px-3 text-center text-2xl font-light transition hover:shadow-nav"
          >
            Új cikk írása
          </Link>
        </div>
        <h2 className=" text-3xl font-light">Saját cikkeid:</h2>
        <div className={``}>
          {articlesData?.map((article) => (
            <div
              key={article.id}
              className="flex flex-row justify-between p-5 odd:bg-lime-100"
            >
              <Link
                className="w-1/3 text-2xl font-light"
                href={`/article/${article.slug}`}
              >
                {article.title}
              </Link>
              <div className="flex flex-row items-center gap-2 text-2xl font-light">
                <Link
                  className="transition-transform hover:scale-90"
                  href={`/author/edit/${article.slug}`}
                >
                  📝
                </Link>
                <button
                  className="transition-transform hover:scale-90"
                  onClick={() => handleDelete(article.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EditorHomePage;
