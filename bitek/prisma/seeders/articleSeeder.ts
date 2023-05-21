import { Language, PrismaClient, Category } from "@prisma/client";

const slugify = (text: string): string =>
  text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");

const articleData = {
  title: "Markdown teszt",
  language: Language.HU,
  body: "## Ez egy teszt\n\nEz egy teszt markdown szöveg.",
  slug: "markdown-teszt",
};
const articleSeeder = async (prisma: PrismaClient) => {
  const article = await prisma.article.upsert({
    update: {},
    where: {
      slug: slugify(articleData.slug),
    },
    create: {
      slug: slugify(articleData.slug),
      title: articleData.title,
      language: articleData.language,
      body: articleData.body,
      authorId: "clhd1bjt20000ox11strp81em",
      createdAt: new Date(),
      updatedAt: new Date(),
      summary: "Ez egy másik teszt markdown szöveg.",
      categories: {
        connect: [
          {
            slug: "kod",
          },
        ],
      },
    },
  });
  console.log(article);
};
export default articleSeeder;
