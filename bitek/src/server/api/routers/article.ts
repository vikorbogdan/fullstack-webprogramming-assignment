import { createTRPCRouter, publicProcedure } from "../trpc";

export const articleRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.article.findMany();
  }),
});
