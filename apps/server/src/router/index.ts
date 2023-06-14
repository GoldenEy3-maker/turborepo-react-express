import { publicProcedure, router } from "../trpc"
import { authRouter } from "./auth"
import { userRouter } from "./user"

export const appRouter = router({
  test: publicProcedure.query(() => {
    return "API is working fine!"
  }),
  auth: authRouter,
  user: userRouter
})

export type AppRouter = typeof appRouter