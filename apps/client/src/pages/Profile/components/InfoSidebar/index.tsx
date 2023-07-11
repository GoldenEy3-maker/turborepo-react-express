import ImageUploader from "@/components/ImageUploader"
import { useFileReader } from "@/hooks/fileReader.hook"
import { useAuthStore } from "@/store/auth"
import { trpc } from "@/utils/trpc"
import type { Role } from "@prisma/client"
import { toast } from "react-toastify"
import styles from "./styles.module.scss"

const InfoSidebar = () => {
  const user = useAuthStore((state) => state.user)

  const { isLoading, previews, readFiles, reset } = useFileReader()

  const uploadAvatarMut = trpc.user.uploadAvatar.useMutation({
    onSuccess() {
      toast("Ваш аватар успешно обновлен!", {
        type: "success",
      })

      reset()
    },
    onError(error) {
      toast(error.message, {
        type: "error",
      })
    },
  })

  const traslateRole = (role: Role) => {
    switch (role) {
      case "ADMIN":
        return "Админ"
      case "EMPLOYER":
        return "Работодатель"
      case "PERFORMER":
        return "Исполнитель"
      case "MODER":
        return "Модератор"
    }
  }

  return (
    <>
      <aside className={styles.sidebar}>
        <ImageUploader
          className={styles.uploader}
          previews={previews}
          disabled={isLoading || uploadAvatarMut.isLoading}
          reset={reset}
          onSubmit={() => {
            toast.dismiss()

            if (previews && previews[0])
              uploadAvatarMut.mutate({
                base64: previews[0].base64,
                name: previews[0].name,
              })
          }}
          currentImage={undefined}
          id="file"
          name="file"
          onChange={async (event) => {
            if (event.target.files?.length) {
              await readFiles(event.target.files)
            } else {
              reset()
            }
          }}
        />
        <div className={styles.info}>
          {user ? (
            <span className={styles.role}>{traslateRole(user.role)}</span>
          ) : null}
          {user ? (
            <p className={styles.bio}>
              {user.lastName} {user.firstName} {user.middleName}
            </p>
          ) : null}
        </div>

        <div className={styles.stats}>
          <hr />
          <ul className={styles.list}>
            <li className={styles.success}>
              Выполненные заказы <span>21</span>
            </li>
            <li>
              Текущие заказы <span>3</span>
            </li>
            <li className={styles.danger}>
              Отмененные заказы <span>1</span>
            </li>
          </ul>
        </div>
      </aside>
    </>
  )
}

export default InfoSidebar
