import { Role } from '@prisma/client'
import bcrypt from 'bcrypt'
import 'dotenv/config'
import jwt from "jsonwebtoken"
import { CookieKeys } from 'utils/enums'
import { z } from "zod"
import { publicProcedure, router } from "../trpc"
import { validateRequiredFields } from "../utils/validate"

export const authRouter = router({
  signOut: publicProcedure.mutation(({ ctx: { res } }) => {
    res.cookie(CookieKeys.AuthToken, "", {
      maxAge: -1
    })
  }),
  signIn: publicProcedure.input(z.object({
    login: z.string(),
    password: z.string()
  })).mutation(async ({ input, ctx: { prisma, res } }) => {

    if (!validateRequiredFields(input)) throw new Error("Заполните все обязательные поля!")

    const user = await prisma.user.findUnique({
      where: {
        login: input.login
      }
    })

    if (!user) throw new Error("Указан неверный логин или пароль!")

    if (!process.env.JWT_KEY) throw new Error("В данный момент сервер нестабилен. Отсутствуют важные системные переменные! Повторите попытку позже.")

    const token = jwt.sign(user.id, process.env.JWT_KEY)

    res.cookie(CookieKeys.AuthToken, { token, ...user }, {
      maxAge: 1000 * 60 * 60 * 24 * 30 * 3
    })

    return { user }
  }),
  signUp: publicProcedure.input(z.object({
    login: z.string(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    middleName: z.string().optional(),
    birthDate: z.string(),
    role: z.nativeEnum(Role)
  })).mutation(async ({ input, ctx: { prisma } }) => {
    const { middleName, role, ...requiredFields } = input

    if (!validateRequiredFields(requiredFields)) throw new Error("Заполните все обязательные поля!")

    const existUser = await prisma.user.findUnique({
      where: {
        login: input.login
      }
    })

    if (existUser) throw new Error("Такой пользователь уже существует!")

    const hashedPassword = await bcrypt.hash(input.password, 10)

    const newUser = await prisma.user.create({
      data: { ...input, password: hashedPassword, birthDate: new Date(input.birthDate), photo: "test.png" }
    })

    return { message: "Регистрация прошла успешно!", newUser }
  })
})
