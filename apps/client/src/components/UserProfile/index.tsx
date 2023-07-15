import { cls } from "@/utils/helpers.ts"
import type { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import styles from "./styles.module.scss"

type UserProfileProps = {
  image?: string
  name: string
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const UserProfile: FC<UserProfileProps> = ({
  image,
  name,
  className,
  ...props
}) => {
  return (
    <div className={cls([className, styles.userProfile])} {...props}>
      <div className={styles.img}>
        <img
          src={image ?? "/images/avatar-placeholder.png"}
          alt="Фото профиля"
        />
      </div>
      <span>{name}</span>
    </div>
  )
}
export default UserProfile
