import bcrypt from 'bcrypt'
import { CookieKeys } from "utils/enums"
import { AuthCookie } from "utils/types"
import { z } from "zod"
import { publicProcedure, router } from "../trpc"
import { deleteImage, uploadImage } from "../utils/helper"
import { validateRequiredFields } from "../utils/validate"

export const userRouter = router({
  uploadAvatar: publicProcedure.input(z.object({
    base64: z.string(),
    name: z.string()
  })).mutation(async ({ input, ctx: { prisma, req, res } }) => {

    if (!validateRequiredFields(input)) throw new Error("Заполните все обязательные поля!")

    const authCookie = req.cookies[CookieKeys.AuthToken] as AuthCookie

    const fileName = await uploadImage(input.base64, input.name)

    try {
      await prisma.user.update({
        where: {
          id: authCookie.id
        },
        data: {
          photo: fileName
        }
      })
    } catch {
      if (authCookie.photo) await deleteImage(fileName)

      throw new Error("При попытке обновить ваш аватар не установлено подключение с базой данных!")
    }

    res.cookie(CookieKeys.AuthToken, { ...authCookie, photo: fileName }, {
      maxAge: 1000 * 60 * 60 * 24 * 30 * 3
    })

    if (authCookie.photo) await deleteImage(authCookie.photo)

    return { fileName }
  }),
  updateInfo: publicProcedure.input(z.object({
    firstName: z.string(),
    lastName: z.string(),
    middleName: z.string().optional(),
    tel: z.string().optional(),
    login: z.string(),
    email: z.string().optional(),
    oldPassword: z.string().optional(),
    newPassword: z.string().optional()
  })).mutation(async ({ input: { oldPassword, newPassword, tel, middleName, email, ...restInput }, ctx: { res, prisma, req } }) => {

    if (!validateRequiredFields(restInput)) throw new Error("Заполните все обязательные поля!")

    const input = { ...restInput, middleName, email, tel }

    const authCookie = req.cookies[CookieKeys.AuthToken] as AuthCookie

    let newUser

    try {
      let newHashedPassword

      if (oldPassword && newPassword) {
        const userPassword = await prisma.user.findUnique({
          where: {
            id: authCookie.id
          },
          select: {
            password: true
          }
        })

        const isMatch = await bcrypt.compare(oldPassword, userPassword?.password!)

        if (!isMatch) throw new Error('Введен неверный пароль!')

        newHashedPassword = await bcrypt.hash(newPassword, 10)
      }

      newUser = await prisma.user.update({
        where: {
          id: authCookie.id
        },
        data: newHashedPassword ? { ...input, password: newHashedPassword } : input
      })
    } catch (error: unknown) {
      if (error instanceof Error) throw new Error(error.message)

      throw new Error("Возникла ошибка с подключение к базе!")
    }

    res.cookie(CookieKeys.AuthToken, { ...newUser, token: authCookie.token }, {
      maxAge: 1000 * 60 * 60 * 24 * 30 * 3
    })

    return { message: "Данные успешно обновлены!" }
  })
})