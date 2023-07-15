import { supabase } from "../../supabase"
import ApiError from "../exeptions/apiError.exeption"

export default new (class ImageService {
  async uploadAvatar({
    base64,
    fileName,
    userId,
  }: {
    base64: string
    fileName: string
    userId: string
  }) {
    try {
      const buffer = Buffer.from(
        base64.replace(/^(data:image\/\w{3,4};base64,)/, ""),
        "base64"
      )

      const fileExt = fileName.split(".").reverse()[0]
      const name = fileName.slice(0, fileName.lastIndexOf("."))
      const hashedFileName =
        Date.now().toString() + "_" + name.replace(/\s/g, "-") + "." + fileExt

      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(userId + "/" + hashedFileName, buffer)

      if (error) throw ApiError.BadRequest(error.message)

      return data
    } catch (e: unknown) {
      if (e instanceof ApiError) throw new ApiError(e.code, e.message)

      throw ApiError.BadRequest("Неожиданная ошибка!")
    }
  }

  async deleteAvatar(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .remove([path])

      if (error) throw ApiError.BadRequest(error.message)

      return data
    } catch (e: unknown) {
      if (e instanceof ApiError) throw new ApiError(e.code, e.message)

      throw ApiError.BadRequest("Неожиданная ошибка!")
    }
  }
})()
