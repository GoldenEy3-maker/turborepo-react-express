import { CookieKeys } from "utils/enums"
import { AuthCookie } from "utils/types"
import { z } from "zod"
import { publicProcedure, router } from "../trpc"
import { deleteImage, uploadImage } from "../utils/helper"

export const userRouter = router({
  uploadAvatar: publicProcedure.input(z.object({
    base64: z.string(),
    name: z.string()
  })).mutation(async ({ input: { base64, name }, ctx: { prisma, req, res } }) => {

    const authCookie = req.cookies[CookieKeys.AuthToken] as AuthCookie

    const fileName = await uploadImage(base64, name)

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
  })
})