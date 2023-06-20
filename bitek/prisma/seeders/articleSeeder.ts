import { Language, PrismaClient } from "@prisma/client";

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

const imageArray = [
  "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
];

const bodyText =
  "A digitális korban az informatika alapvető fontosságúvá vált. Az IT szektor állandóan fejlődik, és új lehetőségeket kínál az üzleti világban. Az informatikai megoldások segítségével hatékonyabban tudjuk kezelni az adatokat, növelni a termelékenységet és optimalizálni a munkafolyamatokat. Az informatika terén a biztonság kiemelkedő jelentőséggel bír. A kiberbűnözők folyamatosan próbálkoznak behatolni a rendszerekbe és megszerezni az érzékeny információkat. Ezért elengedhetetlen, hogy megfelelő védelmi intézkedéseket alkalmazzunk, mint például erős jelszavak használata, rendszeres adatmentés, tűzfalak és vírusirtó programok telepítése. Az informatika területén a felhőalapú szolgáltatások egyre nagyobb népszerűségnek örvendenek. Az adatok és alkalmazások tárolása és kezelése felhőalapú rendszerekben lehetővé teszi a hozzáférés rugalmasságát és a távoli munkavégzést. A felhőalapú szolgáltatások lehetővé teszik az adatok egyszerű és biztonságos megosztását, valamint a számítási kapacitás rugalmas skálázását. Az IT-szakemberek nagy szerepet játszanak a vállalkozások hatékony működésében. Ők felelősek az informatikai rendszerek tervezéséért, telepítéséért és karbantartásáért. Emellett segítenek a felhasználóknak a számítógépek és szoftverek használatában, valamint problémák diagnosztizálásában és megoldásában. Az IT területén folyamatosan megjelennek új technológiák és trendek, mint például a mesterséges intelligencia, a gépi tanulás és a blokklánc technológia. Ezek az innovációk forradalmasítják az üzleti világot, lehetővé téve az automatizációt, a nagy adatok elemzését és a decentralizált tranzakciókat. Az IT-szakembereknek naprakészeknek kell lenniük ezekben a fejleményekben, hogy kihasználhassák az előnyöket és megoldásokat kínálhassanak a vállalkozásoknak.";

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
        image: imageArray[i % 3],
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
  }
};

export default articleSeeder;
