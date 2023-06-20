import { useState } from "react";
import { api } from "~/utils/api";

const NewArticlePage = () => {
  const { data: categories } = api.category.getAllCategories.useQuery();
  const { mutate: createArticle } = api.article.createArticle.useMutation();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("kod");
  const [image, setImage] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createArticle(
      {
        title,
        categories: [category],
        image,
        summary,
        body: content,
      },
      {
        onSuccess: () => {
          setTitle("");
          setCategory("kod");
          setImage("");
          setSummary("");
          setContent("");
        },
      }
    );
  };

  if (!categories) return null;
  return (
    <div className="mt-5 flex flex-col items-center gap-5">
      <h1 className="text-5xl font-light">Új cikk</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <label className="flex flex-col gap-1">
          <span className="text-2xl font-light">Cím</span>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="border-[1px] border-black p-2"
            type="text"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-2xl font-light">Kategória</span>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="border-[1px] border-black p-2"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-2xl font-light">Kép URL</span>
          <input
            onChange={(e) => setImage(e.target.value)}
            value={image}
            className="border-[1px] border-black p-2"
            type="text"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-2xl font-light">Összefoglaló</span>
          <textarea
            onChange={(e) => setSummary(e.target.value)}
            value={summary}
            className="border-[1px] border-black p-2"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-2xl font-light">Cikk</span>
          <textarea
            onChange={(e) => setContent(e.target.value)}
            value={content}
            className="border-[1px] border-black p-2"
          />
        </label>
        <button className="block w-56 cursor-pointer items-center justify-center border-[1px] border-black bg-lime-500 px-3 text-center text-2xl font-light transition hover:shadow-nav">
          Cikk beküldése
        </button>
      </form>
    </div>
  );
};

export default NewArticlePage;
