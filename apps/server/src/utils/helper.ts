import { UploadedFile } from "express-fileupload"

export const uploadFile = async (file: UploadedFile) => {
  try {
    const ext = file.name.split('.').reverse()[0]
    const filename = Date.now() + "-" + file.name.slice(0, file.name.lastIndexOf(".")) + "." + ext
    await file.mv("client/src/assets/images/" + filename)

    return filename
  } catch (error) {
    throw new Error("Неожиданная ошибка загрузки файла!")
  }
}