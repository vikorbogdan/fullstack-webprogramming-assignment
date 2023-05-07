import { createTRPCRouter } from "~/server/api/trpc";
import { articleRouter } from "./routers/article";
import { userRouter } from "./routers/user";
import { categoryRouter } from "./routers/category";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  article: articleRouter,
  user: userRouter,
  category: categoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
