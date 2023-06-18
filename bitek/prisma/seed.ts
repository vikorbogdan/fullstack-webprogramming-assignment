import { PrismaClient } from "@prisma/client";
import categorySeeder from "./seeders/categorySeeder";
import articleSeeder from "./seeders/articleSeeder";
const prisma = new PrismaClient();

async function main() {
  // await categorySeeder(prisma);
  await articleSeeder(prisma);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
