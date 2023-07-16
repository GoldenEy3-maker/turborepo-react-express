import { Role } from "@prisma/client"
import bcrypt from "bcrypt"
import { CookieKeys } from "utils/enums"
import { z } from "zod"
import UserDto from "../dtos/user.dto"
import ApiError from "../exeptions/apiError.exeption"
import imageService from "../services/image.service"
import mailService from "../services/mail.service"
import tokenService from "../services/token.service"
import { authedProcedure, publicProcedure, router } from "../trpc"

export const userRouter = router({
  getCurrent: authedProcedure.query(({ ctx: { user } }) => {
    return { ...user }
  }),
  uploadAvatar: authedProcedure
    .input(
      z.object({
        base64: z.string(),
        fileName: z.string(),
      })
    )
    .mutation(async ({ input, ctx: { user, prisma } }) => {
      const uploadedPath = await imageService.uploadAvatar({
        base64: input.base64,
        fileName: input.fileName,
        userId: user.id,
      })

      if (user.avatar) await imageService.deleteAvatar(user.avatar)

      const updatedUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          avatar: uploadedPath.path,
        },
      })

      return updatedUser
    }),
  signUp: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
        fullName: z.string(),
        birthDate: z.string(),
        role: z.nativeEnum(Role),
      })
    )
    .mutation(async ({ input, ctx: { prisma } }) => {
      const { fullName, ...restInput } = input

      await prisma.user.deleteMany()

      const alreadyExistUser = await prisma.user.findUnique({
        where: {
          email: input.email,
        },
      })

      if (alreadyExistUser)
        throw ApiError.BadRequest("Такой пользователь уже существует!")

      const hashedPassword = await bcrypt.hash(input.password, 10)

      const [lastName, firstName, middleName] = fullName.split(" ")

      const activateToken = tokenService.generateActivateToken({
        ...restInput,
        lastName,
        middleName,
        firstName,
        birthDate: new Date(input.birthDate),
        password: hashedPassword,
        tel: null,
        avatar: null,
      })

      await mailService.sendMail(
        input.email,
        `${process.env.CLIENT_ORIGIN_URL}/activate?token=${activateToken}`
      )

      return activateToken
    }),
  signIn: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input, ctx: { prisma, res } }) => {
      const user = await prisma.user.findUnique({
        where: {
          email: input.email,
        },
      })

      if (!user) throw ApiError.BadRequest("Неверный логин или пароль!")

      const isPwdMatched = await bcrypt.compare(input.password, user.password)

      if (!isPwdMatched) throw ApiError.BadRequest("Неверный логин или пароль!")

      const { accessToken, refreshToken } = tokenService.generateTokens(user)

      tokenService.sendRefreshToken(res, refreshToken)

      return accessToken
    }),
  signOut: publicProcedure.mutation(async ({ ctx: { res } }) => {
    res.clearCookie(CookieKeys.RefreshToken)
  }),
  activate: publicProcedure
    .input(z.string())
    .mutation(async ({ input, ctx: { prisma } }) => {
      const activateTokenPayload = tokenService.verifyActivateToken(input)

      if (!activateTokenPayload)
        throw ApiError.BadRequest("Невалидный токен активации аккаунта!")

      const userDto = new UserDto(activateTokenPayload)

      const alreadyExistUser = await prisma.user.findUnique({
        where: {
          email: userDto.email,
        },
      })

      if (alreadyExistUser)
        throw ApiError.BadRequest("Такой пользователь уже активирован!")

      const newUser = await prisma.user.create({
        data: userDto,
      })

      return { ...newUser }
    }),
})
