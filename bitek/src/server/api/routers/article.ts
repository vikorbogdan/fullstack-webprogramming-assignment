import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

// Enum for ordering articles by date
const OrderEnum = z.enum(["asc", "desc"]);
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

export const articleRouter = createTRPCRouter({
  getArticleBySlug: publicProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      return ctx.prisma.article.findFirst({
        where: {
          slug: input,
        },
      });
    }),
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
  getArticlesByCategorySlug: publicProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      return ctx.prisma.article.findMany({
        where: {
          categories: {
            some: {
              slug: input,
            },
          },
        },
      });
    }),
  getArticlesByUserId: publicProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      return ctx.prisma.article.findMany({
        where: {
          authorId: input,
        },
      });
    }),
  deleteArticleById: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.article.delete({
        where: {
          id: input,
        },
      });
    }),
  createArticle: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        body: z.string(),
        summary: z.string(),
        categories: z.array(z.string()),
        image: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.session?.user?.id;
      const post = await ctx.prisma.article.create({
        data: {
          title: input.title,
          body: input.body,
          authorId: authorId,
          slug: slugify(input.title),
          image: input.image,
          summary: input.summary,
          categories: {
            connect: input.categories.map((category) => ({
              slug: category,
            })),
          },
        },
      });
      return post;
    }),
  updateArticle: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        body: z.string(),
        summary: z.string(),
        categories: z.array(z.string()),
        image: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.article.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          body: input.body,
          slug: slugify(input.title),
          image: input.image,
          summary: input.summary,
          categories: {
            connect: input.categories.map((category) => ({
              slug: category,
            })),
          },
        },
      });
      return post;
    }),
});
