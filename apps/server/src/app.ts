import { createExpressMiddleware } from "@trpc/server/adapters/express"
import cookieParser from "cookie-parser"
import cors from "cors"
import "dotenv/config"
import express from "express"
import fileUpload from "express-fileupload"
import { CookieKeys } from "utils/enums"
import { prisma } from "../prisma"
import { createContext } from "./context"
import ApiError from "./exeptions/apiError.exeption"
import { appRouter } from "./router"
import tokenService from "./services/token.service"

const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN_URL,
    credentials: true,
  })
)
app.use(express.json({ limit: "50mb" }))
app.use(cookieParser())
app.use(fileUpload())

app.post("/refresh_token", async (req, res) => {
  try {
    const refresh_token = req.cookies[CookieKeys.RefreshToken]

    if (!refresh_token) throw ApiError.Unauthorized("Refresh token not found!")

    const refreshTokenPayload = tokenService.verifyRefreshToken(refresh_token)

    if (!refreshTokenPayload)
      throw ApiError.Unauthorized("Refresh token is not valid!")

    const user = await prisma.user.findUnique({
      where: {
        id: refreshTokenPayload.id,
      },
    })

    if (!user) throw ApiError.Unauthorized("User in refresh token not found!")

    if (user.tokenVersion !== refreshTokenPayload.tokenVersion)
      throw ApiError.Unauthorized("Token versions are not matched!")

    const { accessToken, refreshToken } = tokenService.generateTokens(user)

    tokenService.sendRefreshToken(res, refreshToken)

    return res.send({ accessToken })
  } catch (e: unknown) {
    if (e instanceof ApiError)
      return res.status(401).send({ message: e.message })

    return res.status(400).send({ message: "Неожиданная ошибка!" })
  }
})

app.use(
  "/api",
  createExpressMiddleware({
    router: appRouter,
    createContext,
    batching: {
      enabled: true,
    },
  })
)

export default app
