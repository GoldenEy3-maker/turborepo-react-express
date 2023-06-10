import { publicProcedure, router } from "../trpc"
import { authRouter } from "./auth"

export const appRouter = router({
  test: publicProcedure.query(() => {
    return "API is working fine!"
  }),
  auth: authRouter
})

export type AppRouter = typeof appRouter