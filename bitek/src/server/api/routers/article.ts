import { createTRPCRouter, publicProcedure } from "../trpc";

export const articleRouter = createTRPCRouter({
  //TODO: Add limit on query for number of articles (pagination)
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.article.findMany();
  }),
  getFeatured: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.article.findFirst({
      where: {
        isFeatured: true,
      },
    });
  }),
});
