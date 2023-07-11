import { initTRPC } from "@trpc/server"
import SuperJSON from "superjson"
import type { Context } from "./context"
import ApiError from "./exeptions/apiError.exeption"
import tokenService from "./services/token.service"

const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
})

export const router = t.router
export const publicProcedure = t.procedure
export const middleware = t.middleware

const isAuthed = middleware(async ({ next, ctx: { req, prisma } }) => {
  const accessToken = req.headers.authorization?.split(" ")[1]

  if (!accessToken) throw ApiError.Unauthorized()

  const accessTokenPayload = tokenService.verifyAccessToken(accessToken)

  if (!accessTokenPayload) throw ApiError.Unauthorized()

  const user = await prisma.user.findUnique({
    where: {
      email: accessTokenPayload.email,
    },
  })

  if (!user) throw ApiError.Unauthorized()

  return next({
    ctx: { user },
  })
})

export const authedProcedure = t.procedure.use(isAuthed)
