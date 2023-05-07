import type { PrismaClient } from "@prisma/client";

const categories = [
  { hungarian: "Kód", english: "Code" },
  { hungarian: "Kampusz", english: "Campus" },
  { hungarian: "Kutatás", english: "Research" },
  { hungarian: "Ipar", english: "Industry" },
  { hungarian: "Startupok", english: "Startups" },
  { hungarian: "Hangok", english: "Voices" },
  { hungarian: "Nézőpontok", english: "Perspectives" },
  { hungarian: "Események", english: "Events" },
  { hungarian: "Karrier", english: "Careers" },
  { hungarian: "Tech", english: "Tech" },
];

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

const categorySeeder = async (prisma: PrismaClient) => {
  for (const categoryData of categories) {
    const category = await prisma.category.upsert({
      update: {},
      where: {
        slug: slugify(categoryData.hungarian),
      },
      create: {
        slug: slugify(categoryData.hungarian),
        name: categoryData.hungarian,
        name_en: categoryData.english,
      },
    });
    console.log(category);
  }
};
export default categorySeeder;
