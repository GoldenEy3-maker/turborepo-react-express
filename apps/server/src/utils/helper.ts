import fs from "fs/promises"
import path from "path"
import { DirectoryPaths } from "./enums"

export const uploadImage = async (base64: string, fileName: string) => {
  try {
    const buffer = Buffer.from(base64.replace(/^(data:image\/\w{3,4};base64,)/, ""), "base64")

    const fileExt = fileName.split(".").reverse()[0]
    const name = fileName.slice(0, fileName.lastIndexOf('.'))
    const hashedFileName =
      Date.now().toString() + "_" + name.replace(/\s/g, "-") + "." + fileExt

    await fs.writeFile(
      path.join(path.dirname(process.cwd()), DirectoryPaths.PublicClientImages, hashedFileName),
      buffer
    )

    return hashedFileName
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error("В ходе записи файла произошла ошибка: " + err.message)
    }

    throw new Error(
      "Неожиданная ошибка при попытке записать ваш файл! Поробуйте позже"
    )
  }
}

export const deleteImage = async (fileName: string) => {
  try {
    await fs.unlink(path.join(path.dirname(process.cwd()), DirectoryPaths.PublicClientImages, fileName))
  } catch (err: unknown) {
    if (err instanceof Error) throw new Error("Во время удаления файла произошла ошибка: " + err.message)

    throw new Error("Неожиданная ошибка при удалениии файла!")
  }
}