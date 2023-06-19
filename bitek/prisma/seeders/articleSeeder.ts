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

const titleArray = [
  "A blokklánc technológia hatása",
  "Az AI a játékfejlesztésben",
  "Az 5G kapcsolat és az IoT",
  "Kiberbiztonság 2023-ban",
  "A felhőszámítás előnyei",
  "A következő generációs processzorok",
  "Adatvédelem és adatbiztonság",
  "A mélytanulás és a nagy adatok",
  "A mesterséges intelligencia fejlődése",
  "A legújabb IT hírek",
];

const summaryArray = [
  "Ez a cikk bemutatja, hogy a blokklánc technológia hogyan változtatja meg az IT ipart.",
  "Ebben a cikkben azt vizsgáljuk, hogy az AI hogyan határozhatja meg a játékfejlesztés jövőjét.",
  "Az 5G hálózatok és az IoT együttes fejlődése új lehetőségeket teremthet.",
  "Kiberbiztonsági kihívások és megoldások 2023-ban.",
  "A felhőszámítás előnyei és a jövőbeli trendek.",
  "Bemutatjuk a következő generációs processzorok legújabb fejlesztéseit.",
  "A cikk bemutatja az adatvédelem és az adatbiztonság fontosságát.",
  "A mélytanulás és a nagy adatok új lehetőségeket teremthetnek az AI fejlődésében.",
  "A mesterséges intelligencia legújabb fejlesztései és trendjei.",
  "A legfrissebb hírek és trendek az IT világából.",
];

const bodyText = "Morbi ultricies mauris ornare tortor semper sagittis...";

const articleSeeder = async (prisma: PrismaClient) => {
  for (let i = 0; i < 10; i++) {
    const articleData = {
      title: titleArray[i],
      language: Language.HU,
      body: bodyText,
      summary: summaryArray[i],
    };

    const article = await prisma.article.upsert({
      update: {},
      where: {
        slug: slugify(articleData.title ?? ""),
      },
      create: {
        slug: slugify(articleData.title ?? ""),
        title: articleData.title ?? "",
        language: articleData.language,
        body: articleData.body,
        authorId: "clhd1bjt20000ox11strp81em",
        createdAt: new Date(),
        updatedAt: new Date(),
        summary: articleData.summary,
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
  }
};

export default articleSeeder;
