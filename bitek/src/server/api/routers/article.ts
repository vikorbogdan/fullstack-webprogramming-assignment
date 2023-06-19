import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

// create a zod enum for to have an option to get the articles in descending or ascending order by date
const OrderEnum = z.enum(["asc", "desc"]);

export const articleRouter = createTRPCRouter({
  //TODO: Add limit on query for number of articles (pagination)

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.article.findMany();
  }),
  getAllByDate: publicProcedure.input(OrderEnum).query(({ ctx, input }) => {
    return ctx.prisma.article.findMany({
      orderBy: {
        createdAt: input,
      },
    });
  }),
  getFeatured: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.article.findFirst({
      where: {
        isFeatured: true,
      },
    });
  }),
});
