import fs from "fs/promises"
import path from "path"
import ApiError from "../exeptions/apiError.exeption"
import { DirectoryPaths } from "../utils/enums"

export default new (class ImageService {
  async upload(base64: string, fileName: string) {
    try {
      const buffer = Buffer.from(
        base64.replace(/^(data:image\/\w{3,4};base64,)/, ""),
        "base64"
      )

      const fileExt = fileName.split(".").reverse()[0]
      const name = fileName.slice(0, fileName.lastIndexOf("."))
      const hashedFileName =
        Date.now().toString() + "_" + name.replace(/\s/g, "-") + "." + fileExt

      await fs.writeFile(
        path.join(
          path.dirname(process.cwd()),
          DirectoryPaths.PublicClientImages,
          hashedFileName
        ),
        buffer
      )

      return hashedFileName
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        throw ApiError.BadRequest(err.message)
      }

      throw ApiError.BadRequest("Неожиданная ошибка! Попробуйте позже")
    }
  }

  async delete(fileName: string) {
    try {
      await fs.unlink(
        path.join(
          path.dirname(process.cwd()),
          DirectoryPaths.PublicClientImages,
          fileName
        )
      )
    } catch (err: unknown) {
      if (err instanceof ApiError) throw ApiError.BadRequest(err.message)

      throw ApiError.BadRequest("Неожиданная ошибка! Попробуйте позже")
    }
  }
})()
