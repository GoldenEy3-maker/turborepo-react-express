import { publicProcedure, router } from "../trpc"
import { userRouter } from "./user"

export const appRouter = router({
  test: publicProcedure.query(() => {
    return "API is working fine!"
  }),
  user: userRouter,
})

export type AppRouter = typeof appRouter