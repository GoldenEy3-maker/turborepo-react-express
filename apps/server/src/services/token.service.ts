import "dotenv/config"
import { Response } from "express"
import jwt from "jsonwebtoken"
import { CookieKeys } from "utils/enums"
import { UserModel } from "../dtos/user.dto"
import ApiError from "../exeptions/apiError.exeption"

export type AccessTokenPayload = {
  email: string
}

export type RefreshTokenPayload = {
  id: string
  tokenVersion: number
}

export type ActivateTokenPayload = UserModel

export default new (class TokenService {
  generateTokens(payload: AccessTokenPayload & RefreshTokenPayload) {
    if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET)
      throw ApiError.EnvNotFound()

    const accessToken = jwt.sign(
      { email: payload.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    )
    const refreshToken = jwt.sign(
      { id: payload.id, tokenVersion: payload.tokenVersion },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "30d" }
    )

    return { accessToken, refreshToken }
  }

  generateActivateToken(payload: ActivateTokenPayload) {
    if (!process.env.ACTIVATE_TOKEN_SECRET) throw ApiError.EnvNotFound()

    const activateToken = jwt.sign(payload, process.env.ACTIVATE_TOKEN_SECRET, {
      expiresIn: "24h",
    })

    return activateToken
  }

  verifyAccessToken(token: string): AccessTokenPayload | null {
    if (!process.env.ACCESS_TOKEN_SECRET) throw ApiError.EnvNotFound()

    let decodedValue = null

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return

      decodedValue = decoded as { email: string }
    })

    return decodedValue
  }

  verifyRefreshToken(token: string): RefreshTokenPayload | null {
    if (!process.env.REFRESH_TOKEN_SECRET) throw ApiError.EnvNotFound()

    let decodedValue = null

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return

      decodedValue = decoded as { id: string }
    })

    return decodedValue
  }

  verifyActivateToken(token: string): ActivateTokenPayload | null {
    if (!process.env.ACTIVATE_TOKEN_SECRET) throw ApiError.EnvNotFound()

    let decodedValue = null

    jwt.verify(token, process.env.ACTIVATE_TOKEN_SECRET, (err, decoded) => {
      if (err) return

      decodedValue = decoded as ActivateTokenPayload
    })

    return decodedValue
  }

  sendRefreshToken(res: Response, token: string) {
    res.cookie(CookieKeys.RefreshToken, token, {
      secure: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })
  }
})()
