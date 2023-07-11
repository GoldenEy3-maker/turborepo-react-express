import { useAuthStore } from "@/store/auth"
import { cls } from "@/utils/helpers.ts"
import type { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import styles from "./styles.module.scss"

type UserProfileProps = {
  image?: string
  name?: string
  isExtraSizeName?: boolean
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const UserProfile: FC<UserProfileProps> = ({
  image,
  name,
  isExtraSizeName,
  className,
  ...props
}) => {
  const user = useAuthStore((state) => state.user)

  return (
    <div
      className={cls([className, styles.userProfile], {
        [styles._extraSizeName]: !!isExtraSizeName,
      })}
      {...props}
    >
      <div className={styles.img}>
        <img
          src={`/images/${image ?? "avatar-placeholder.png"}`}
          alt="Фото профиля"
        />
      </div>
      <span>{name ?? user?.firstName}</span>
    </div>
  )
}
export default UserProfile
