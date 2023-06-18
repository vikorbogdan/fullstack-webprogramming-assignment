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
  title:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod lorem in magna euismod dictum.",
  language: Language.HU,
  body: "Morbi ultricies mauris ornare tortor semper sagittis. Duis placerat dolor quis lorem tincidunt posuere. Aenean sagittis nibh et nunc facilisis, quis accumsan lacus semper. Nunc iaculis ante justo, eu hendrerit turpis tincidunt at. Pellentesque eu maximus dui, sed vulputate purus. Nulla a odio ut nulla posuere malesuada. Cras volutpat ante justo, ac tempor purus interdum quis. Etiam lobortis enim elit, ut porta odio bibendum in. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque facilisis diam tincidunt semper tincidunt.",
};
const articleSeeder = async (prisma: PrismaClient) => {
  const article = await prisma.article.upsert({
    update: {},
    where: {
      slug: slugify(articleData.title),
    },
    create: {
      slug: slugify(articleData.title),
      title: articleData.title,
      language: articleData.language,
      body: articleData.body,
      authorId: "clhd1bjt20000ox11strp81em",
      createdAt: new Date(),
      updatedAt: new Date(),
      summary:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod lorem in magna euismod dictum.",
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
