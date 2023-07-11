import { Role } from "@prisma/client"
import bcrypt from "bcrypt"
import { CookieKeys } from "utils/enums"
import { z } from "zod"
import UserDto from "../dtos/user.dto"
import ApiError from "../exeptions/apiError.exeption"
import mailService from "../services/mail.service"
import tokenService from "../services/token.service"
import { authedProcedure, publicProcedure, router } from "../trpc"

export const userRouter = router({
  getCurrentUser: authedProcedure.query(({ ctx: { user } }) => {
    return { ...user }
  }),
  uploadAvatar: publicProcedure
    .input(
      z.object({
        base64: z.string(),
        name: z.string(),
      })
    )
    .mutation(async () => {
      // const authCookie = req.cookies[CookieKeys.AuthToken] as AuthCookie

      // const fileName = await uploadImage(input.base64, input.name)

      // try {
      //   await prisma.profile.update({
      //     where: {
      //       userId: authCookie.id
      //     },
      //     data: {
      //       photo: fileName
      //     }
      //   })
      // } catch {
      //   throw new Error("Ошибка базы данных!")
      // }

      // if (authCookie.profile?.photo) await deleteImage(authCookie.profile.photo)

      // res.cookie(CookieKeys.AuthToken, { ...authCookie, photo: fileName }, {
      //   maxAge: 1000 * 60 * 60 * 24 * 30 * 3
      // })

      return "Test"
    }),
  updateInfo: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        middleName: z.string().optional(),
        tel: z.string().optional(),
        email: z.string().optional(),
        oldPassword: z.string().optional(),
        newPassword: z.string().optional(),
      })
    )
    .mutation(async () => {
      // const input = { ...restInput, middleName, email, tel }

      // const authCookie = req.cookies[CookieKeys.AuthToken] as AuthCookie

      // let newUser

      // try {
      //   let newHashedPassword

      //   if (oldPassword && newPassword) {
      //     const userPassword = await prisma.user.findUnique({
      //       where: {
      //         id: authCookie.id,
      //       },
      //       select: {
      //         password: true,
      //       },
      //     })

      //     const isMatch = await bcrypt.compare(
      //       oldPassword,
      //       userPassword?.password!
      //     )

      //     if (!isMatch) throw ApiError.BadRequest("Введен неверный пароль!")

      //     newHashedPassword = await bcrypt.hash(newPassword, 10)
      //   }

      //   newUser = await prisma.user.update({
      //     where: {
      //       id: authCookie.id,
      //     },
      //     data: newHashedPassword
      //       ? { ...input, password: newHashedPassword }
      //       : input,
      //   })
      // } catch (error: unknown) {
      //   if (error instanceof ApiError)
      //     throw ApiError.BadRequest(error.message)

      //   throw ApiError.BadRequest("Неожиданная ошибка!")
      // }

      // res.cookie(
      //   CookieKeys.AuthToken,
      //   { ...newUser, token: authCookie.token },
      //   {
      //     maxAge: 1000 * 60 * 60 * 24 * 30 * 3,
      //   }
      // )

      return { message: "Данные успешно обновлены!" }
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
